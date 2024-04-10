import { File, HttpResponseEncoding, ImageSource, Utils } from '@nativescript/core';
import { CacheOptions, HttpsFormDataParam, HttpsRequest, HttpsRequestOptions, HttpsSSLPinningOptions, HttpsResponseLegacy as IHttpsResponseLegacy } from '.';

import { getFilenameFromUrl, interceptors, networkInterceptors, parseJSON } from './request.common';
export { addNetworkInterceptor, addInterceptor } from './request.common';

interface Ipeer {
    enabled: boolean;
    allowInvalidCertificates: boolean;
    validatesDomainName: boolean;
    host?: string;
    commonName?: string;
    certificate?: string;
    x509Certificate?: java.security.cert.Certificate;
}
function wrapJavaException(ex) {
    if (ex instanceof java.lang.Exception) {
        const err = new Error(ex.toString());
        err['nativeException'] = ex;
        //@ts-ignore
        err['stackTrace'] = com.tns.NativeScriptException.getStackTraceAsString(ex);
        return err;
    }
    return ex;
}
const peer: Ipeer = {
    enabled: false,
    allowInvalidCertificates: false,
    validatesDomainName: true
};

let cache: okhttp3.Cache;
let forceCache = false;

export function setCache(options?: CacheOptions) {
    if (options) {
        forceCache = options.forceCache === true;
        cache = new okhttp3.Cache(new java.io.File(options.diskLocation), options.diskSize);
    } else {
        cache = null;
    }
    if (Client) {
        //we need to force a new client for the builder to use cache
        getClient(undefined, true);
    }
}

export function clearCache() {
    if (cache) {
        cache.evictAll();
    }
}

// TODO: rewrite this to not have to handle
// every single property
let _timeout = 10;
let _cookiesEnabled = true;

class HttpsResponseLegacy implements IHttpsResponseLegacy {
    private callback?: com.nativescript.https.OkHttpResponse.OkHttpResponseAsyncCallback;
    constructor(
        private response: com.nativescript.https.OkHttpResponse,
        private tag: string,
        private url: string
    ) {}

    get contentLength() {
        return this.response.contentLength();
    }
    getOrCreateCloseCallback() {
        if (!notClosedResponses[this.tag]) {
            // we need to store handling request to be able to cancel them
            notClosedResponses[this.tag] = this.response;
            this.response.closeCallback = new OkHttpResponse.OkHttpResponseCloseCallback({
                onClose() {
                    delete notClosedResponses[this.tag];
                }
            });
        }
    }
    getCallback(resolve, reject) {
        return new com.nativescript.https.OkHttpResponse.OkHttpResponseAsyncCallback({
            onBitmap(res) {
                resolve(new ImageSource(res));
            },
            onString(res) {
                resolve(res);
            },
            onByteArray(res) {
                resolve((ArrayBuffer as any).from(res));
            },
            onFile(res) {
                resolve(res);
            },
            onException(err) {
                reject(err);
            }
        });
    }

    // cache it because asking it again wont work as the socket is closed
    arrayBuffer: ArrayBuffer;
    toArrayBuffer() {
        try {
            this.arrayBuffer = this.arrayBuffer || (ArrayBuffer as any).from(this.response.toByteArray());
            return this.arrayBuffer;
        } catch {
            return null;
        }
    }
    async toArrayBufferAsync() {
        if (this.arrayBuffer) {
            return Promise.resolve(this.arrayBuffer);
        }
        const r = await new Promise<ArrayBuffer>((resolve, reject) => {
            this.getOrCreateCloseCallback();
            this.response.toByteArrayAsync(this.getCallback(resolve, reject));
        });
        this.arrayBuffer = r;
        return r;
    }

    // cache it because asking it again wont work as the socket is closed
    stringResponse: string;
    toString() {
        // TODO: handle arraybuffer already stored
        this.stringResponse = this.stringResponse || this.response.asString();
        return this.stringResponse;
    }
    async toStringAsync(): Promise<string> {
        if (this.stringResponse) {
            return this.stringResponse;
        }
        // TODO: handle arraybuffer already stored
        this.stringResponse = await new Promise<string>((resolve, reject) => {
            this.getOrCreateCloseCallback();
            this.response.asStringAsync(this.getCallback(resolve, reject));
        });
        return this.stringResponse;
    }

    // cache it because asking it again wont work as the socket is closed
    jsonResponse: any;
    toJSON(encoding?: HttpResponseEncoding) {
        if (this.jsonResponse !== undefined) {
            return this.jsonResponse;
        }
        // TODO: handle arraybuffer already stored
        this.stringResponse = this.stringResponse || this.response.asString();
        this.jsonResponse = this.stringResponse ? parseJSON(this.stringResponse) : null;
        return this.jsonResponse;
    }

    async toJSONAsync<T>() {
        if (this.jsonResponse !== undefined) {
            return this.jsonResponse;
        }
        if (this.stringResponse !== undefined) {
            this.jsonResponse = this.stringResponse ? parseJSON(this.stringResponse) : null;
            return this.jsonResponse;
        }
        // TODO: handle arraybuffer already stored
        const r = await this.toStringAsync();
        this.jsonResponse = r ? parseJSON(r) : null;
        return this.jsonResponse as T;
    }

    // cache it because asking it again wont work as the socket is closed
    imageSource: ImageSource;
    async toImage(): Promise<ImageSource> {
        if (this.imageSource) {
            return this.imageSource;
        }
        const r = await new Promise<ImageSource>((resolve, reject) => {
            this.getOrCreateCloseCallback();
            this.response.toImageAsync(this.getCallback(resolve, reject));
        });
        this.imageSource = r;
        return r;
    }
    // toFile(destinationFilePath: string): File {
    //     if (!destinationFilePath) {
    //         destinationFilePath = getFilenameFromUrl(this.url);
    //     }
    //     const file = this.response.toFile(destinationFilePath);
    //     return File.fromPath(destinationFilePath);
    // }
    // cache it because asking it again wont work as the socket is closed
    file: File;
    toFile(destinationFilePath: string): Promise<File> {
        if (this.file) {
            return Promise.resolve(this.file);
        }
        if (!destinationFilePath) {
            destinationFilePath = getFilenameFromUrl(this.url);
        }
        return new Promise((resolve, reject) => {
            this.getOrCreateCloseCallback();
            this.response.toFileAsync(destinationFilePath, this.getCallback(resolve, reject));
        }).then(() => {
            this.file = File.fromPath(destinationFilePath);
            return this.file;
        });
    }
}

export function enableSSLPinning(options: HttpsSSLPinningOptions) {
    if (!peer.host && !peer.certificate) {
        let certificate: string;
        let inputStream: java.io.FileInputStream;
        try {
            const file = new java.io.File(options.certificate);
            inputStream = new java.io.FileInputStream(file);
            const x509Certificate = java.security.cert.CertificateFactory.getInstance('X509').generateCertificate(inputStream);
            peer.x509Certificate = x509Certificate;
            certificate = okhttp3.CertificatePinner.pin(x509Certificate);
            inputStream.close();
        } catch (error) {
            try {
                if (inputStream) {
                    inputStream.close();
                }
            } catch (e) {}
            console.error('@nativescript-community/https > enableSSLPinning error', error);
            return;
        }
        peer.host = options.host;
        peer.commonName = options.commonName || options.host;
        peer.certificate = certificate;
        if (options.allowInvalidCertificates === true) {
            peer.allowInvalidCertificates = true;
        }
        if (options.validatesDomainName === false) {
            peer.validatesDomainName = false;
        }
    }
    peer.enabled = true;
    getClient(undefined, true);
}

export function disableSSLPinning() {
    peer.enabled = false;
    getClient(undefined, true);
}
const SDKVersion = android.os.Build.VERSION.SDK_INT;

let Client: okhttp3.OkHttpClient;
let cookieJar: com.nativescript.https.QuotePreservingCookieJar;
let cookieManager: java.net.CookieManager;
export function getClient(opts: Partial<HttpsRequestOptions> = {}, reload: boolean = false): okhttp3.OkHttpClient {
    if (!Client) {
        // ssl error fix on KitKat. Only need to be done once.
        // client will be null only onced so will run only once
        if (SDKVersion >= 16 && SDKVersion < 22 && (org as any).conscrypt) {
            java.security.Security.insertProviderAt((org as any).conscrypt.Conscrypt.newProvider(), 1);
        }
    }
    // if (!Client) {
    // 	Client = new okhttp3.OkHttpClient()
    // }
    // if (Client) {
    // 	Client.connectionPool().evictAll()
    // 	Client = null
    // }
    const timeout = opts.timeout ?? 10;
    const cookiesEnabled = opts.cookiesEnabled ?? true;
    if (Client && reload === false) {
        const needTimeoutChange = timeout === _timeout;
        const needCookiesChange = cookiesEnabled === _cookiesEnabled;
        if (!needTimeoutChange && !needCookiesChange) {
            return Client;
        } else {
            const builder = Client.newBuilder();
            if (needTimeoutChange) {
                builder
                    .connectTimeout(timeout, java.util.concurrent.TimeUnit.SECONDS)
                    .writeTimeout(timeout, java.util.concurrent.TimeUnit.SECONDS)
                    .readTimeout(timeout, java.util.concurrent.TimeUnit.SECONDS);
            }
            if (needCookiesChange) {
                if (cookiesEnabled) {
                    if (!cookieJar) {
                        cookieManager = new java.net.CookieManager();
                        cookieManager.setCookiePolicy(java.net.CookiePolicy.ACCEPT_ALL);
                        cookieJar = new com.nativescript.https.QuotePreservingCookieJar(cookieManager);
                    }
                    builder.cookieJar(cookieJar);
                } else {
                    // builder.cookieJar(null);
                }
            }
            return builder.build();
        }
    }
    const builder = new okhttp3.OkHttpClient.Builder();

    _cookiesEnabled = cookiesEnabled;
    if (cookiesEnabled) {
        if (!cookieJar) {
            cookieManager = new java.net.CookieManager();
            cookieManager.setCookiePolicy(java.net.CookiePolicy.ACCEPT_ALL);
            cookieJar = new com.nativescript.https.QuotePreservingCookieJar(cookieManager);
        }
        builder.cookieJar(cookieJar);
    }

    interceptors.forEach((interceptor) => builder.addInterceptor(interceptor));
    networkInterceptors.forEach((interceptor) => builder.addNetworkInterceptor(interceptor));
    if (peer.enabled === true) {
        if (peer.host || peer.certificate) {
            // const spec = okhttp3.ConnectionSpec.MODERN_TLS;
            // builder.connectionSpecs(java.util.Collections.singletonList(spec));

            const pinner = new okhttp3.CertificatePinner.Builder();
            pinner.add(peer.host, [peer.certificate]);
            builder.certificatePinner(pinner.build());

            if (peer.allowInvalidCertificates === false) {
                try {
                    const x509Certificate = peer.x509Certificate;
                    const keyStore = java.security.KeyStore.getInstance(java.security.KeyStore.getDefaultType());
                    keyStore.load(null, null);
                    // keyStore.setCertificateEntry(peer.host, x509Certificate)
                    keyStore.setCertificateEntry('CA', x509Certificate);

                    // let keyManagerFactory = javax.net.ssl.KeyManagerFactory.getInstance(
                    // 	javax.net.ssl.KeyManagerFactory.getDefaultAlgorithm()
                    // )
                    const keyManagerFactory = javax.net.ssl.KeyManagerFactory.getInstance('X509');
                    keyManagerFactory.init(keyStore, null);
                    const keyManagers = keyManagerFactory.getKeyManagers();

                    const trustManagerFactory = javax.net.ssl.TrustManagerFactory.getInstance(javax.net.ssl.TrustManagerFactory.getDefaultAlgorithm());
                    trustManagerFactory.init(keyStore);

                    const sslContext = javax.net.ssl.SSLContext.getInstance('TLS');
                    const trustManagers = trustManagerFactory.getTrustManagers();
                    if (trustManagers.length !== 1 || !(trustManagers[0] instanceof javax.net.ssl.X509TrustManager)) {
                        throw new Error('Unexpected default trust managers:' + trustManagers);
                    }
                    sslContext.init(keyManagers, trustManagers, null);
                    builder.sslSocketFactory(sslContext.getSocketFactory(), trustManagers[0]);
                } catch (error) {
                    console.error('@nativescript-community/https > client.allowInvalidCertificates error', error);
                }
            }

            if (peer.validatesDomainName === true) {
                try {
                    builder.hostnameVerifier(
                        new javax.net.ssl.HostnameVerifier({
                            verify: (hostname: string, session: javax.net.ssl.SSLSession): boolean => {
                                const pp = session.getPeerPrincipal().getName();
                                const hv = javax.net.ssl.HttpsURLConnection.getDefaultHostnameVerifier();
                                if (peer.commonName && peer.commonName[0] === '*') {
                                    return hv.verify(peer.host, session) && hostname.indexOf(peer.host) > -1 && hostname.indexOf(session.getPeerHost()) > -1 && pp.indexOf(peer.commonName) !== -1;
                                } else {
                                    return hv.verify(peer.host, session) && peer.host === hostname && peer.host === session.getPeerHost() && pp.indexOf(peer.host) !== -1;
                                }
                            }
                        })
                    );
                } catch (error) {
                    console.error('@nativescript-community/https > client.validatesDomainName error', error);
                }
            }
        } else {
            console.warn('@nativescript-community/https > Undefined host or certificate. SSL pinning NOT working!!!');
        }
    }

    _timeout = timeout;
    builder.connectTimeout(timeout, java.util.concurrent.TimeUnit.SECONDS).writeTimeout(timeout, java.util.concurrent.TimeUnit.SECONDS).readTimeout(timeout, java.util.concurrent.TimeUnit.SECONDS);

    if (cache) {
        builder.cache(cache);
        if (forceCache) {
            builder.addInterceptor(com.nativescript.https.CacheInterceptor.INTERCEPTOR);
        }
    }

    Client = builder.build();
    return Client;
}

export function cancelRequest(tag: string, client: okhttp3.OkHttpClient = runningClients[tag]) {
    if (notClosedResponses[tag]) {
        notClosedResponses[tag].cancel();
        return;
    }
    if (!client) {
        return;
    }
    const dispatcher = client.dispatcher();
    //When you want to cancel:
    //A) go through the queued calls and cancel if the tag matches:
    if (dispatcher.queuedCallsCount() > 0) {
        const queuedCalls = dispatcher.queuedCalls();
        for (let index = 0; index < queuedCalls.size(); index++) {
            const call = queuedCalls.get(index);
            if (call.request().tag() === tag) {
                call.cancel();
                return;
            }
        }
    }

    //B) go through the running calls and cancel if the tag matches:
    if (dispatcher.runningCallsCount() > 0) {
        const runningCalls = dispatcher.runningCalls();
        for (let index = 0; index < runningCalls.size(); index++) {
            const call = runningCalls.get(index);
            if (call.request().tag() === tag) {
                call.cancel();
                return;
            }
        }
    }
}

export function cancelAllRequests() {
    Object.values(notClosedResponses).forEach((req) => req.cancel());

    Object.values(runningClients).forEach((client) => {
        const dispatcher = client.dispatcher();
        //When you want to cancel:
        //A) go through the queued calls and cancel if the tag matches:
        if (dispatcher.queuedCallsCount() > 0) {
            const queuedCalls = dispatcher.queuedCalls();
            for (let index = 0; index < queuedCalls.size(); index++) {
                const call = queuedCalls.get(index);
                call.cancel();
            }
        }

        //B) go through the running calls and cancel if the tag matches:
        if (dispatcher.runningCallsCount() > 0) {
            const runningCalls = dispatcher.runningCalls();
            for (let index = 0; index < runningCalls.size(); index++) {
                const call = runningCalls.get(index);
                call.cancel();
            }
        }
    });
}

export function clearCookies() {
    if (cookieJar) {
        cookieJar = null;
        cookieManager = null;
    }
}

let CALL_ID = 0;
const notClosedResponses: {
    [k: string]: com.nativescript.https.OkHttpResponse;
} = {};

const runningClients: { [k: string]: okhttp3.OkHttpClient } = {};

let OkHttpResponse: typeof com.nativescript.https.OkHttpResponse;
export function createRequest(opts: HttpsRequestOptions, useLegacy: boolean = true): HttpsRequest {
    const client = getClient(opts, false);

    const request = new okhttp3.Request.Builder();
    request.url(opts.url);

    if (opts.headers) {
        Object.keys(opts.headers).forEach((key) => request.addHeader(key, opts.headers[key] as any));
    }

    if (opts.cachePolicy) {
        let cacheControlBuilder = new okhttp3.CacheControl.Builder();
        switch (opts.cachePolicy) {
            case 'noCache':
                cacheControlBuilder = cacheControlBuilder.noStore();
                break;
            case 'onlyCache':
                cacheControlBuilder = cacheControlBuilder.onlyIfCached();
                break;
            case 'ignoreCache':
                cacheControlBuilder = cacheControlBuilder.noCache();
                break;
        }
        request.cacheControl(cacheControlBuilder.build());
    }

    // const methods = {
    //     GET: 'get',
    //     HEAD: 'head',
    //     DELETE: 'delete',
    //     POST: 'post',
    //     PUT: 'put',
    //     PATCH: 'patch'
    // };
    // let type;
    // if (['GET', 'HEAD'].indexOf(opts.method) !== -1 || (opts.method === 'DELETE' && !Utils.isDefined(opts.body) && !Utils.isDefined(opts.content))) {
    //     request[methods[opts.method]]();
    // } else {
    const type = opts.headers && opts.headers['Content-Type'] ? opts.headers['Content-Type'] : 'application/json';
    const MEDIA_TYPE = okhttp3.MediaType.parse(type);
    let okHttpBody: okhttp3.RequestBody;
    if (type.startsWith('multipart/form-data')) {
        const builder = new okhttp3.MultipartBody.Builder();
        builder.setType(MEDIA_TYPE);

        (opts.body as HttpsFormDataParam[]).forEach((param) => {
            if (param.fileName && param.contentType) {
                if (param.data instanceof okhttp3.RequestBody) {
                    builder.addFormDataPart(param.parameterName, param.fileName, param.data);
                } else {
                    builder.addFormDataPart(param.parameterName, param.fileName, okhttp3.RequestBody.create(param.data, okhttp3.MediaType.parse(param.contentType)));
                }
            } else {
                if (typeof param.data === 'string') {
                    builder.addFormDataPart(param.parameterName, param.data);
                } else {
                    builder.addFormDataPart(param.parameterName, param.data + '');
                }
            }
        });
        okHttpBody = builder.build();
    } else if (type === 'application/x-www-form-urlencoded') {
        const builder = new okhttp3.FormBody.Builder();
        Object.keys(opts.body).forEach((key) => {
            builder.add(key, opts.body[key]);
        });
        okHttpBody = builder.build();
    } else {
        let body;
        if (opts.body) {
            // TODO: add support for Buffers
            if (opts.body instanceof File) {
                okHttpBody = okhttp3.RequestBody.create(new java.io.File(opts.body.path), okhttp3.MediaType.parse(type));
            } else if (typeof opts.body === 'string') {
                body = opts.body;
            } else {
                try {
                    body = JSON.stringify(opts.body);
                } catch (ignore) {}
            }
        } else if (opts.content) {
            body = opts.content;
        }
        if (body instanceof okhttp3.RequestBody) {
            okHttpBody = body;
        } else if (body) {
            okHttpBody = okhttp3.RequestBody.create(body, okhttp3.MediaType.parse(type));
        }
    }

    if (okHttpBody && opts.onProgress) {
        okHttpBody = new com.nativescript.https.ProgressRequestWrapper(
            okHttpBody,
            new com.nativescript.https.ProgressRequestWrapper.ProgressListener({
                onRequestProgress(bytesWritten: number, contentLength: number) {
                    opts.onProgress(bytesWritten, contentLength);
                }
            })
        );
    }
    request.method(opts.method, okHttpBody);
    // request[methods[opts.method]](okHttpBody);
    // }
    const tag = opts.tag || `okhttp_request_${CALL_ID++}`;
    const call = client.newCall(request.tag(tag).build());
    runningClients[tag] = client;
    // We have to allow networking on the main thread because larger responses will crash the app with an NetworkOnMainThreadException.
    // Note that it would probably be better to offload it to a Worker or (natively running) AsyncTask.
    // Also note that once set, this policy remains active until the app is killed.
    if (useLegacy === false && opts.allowLargeResponse) {
        android.os.StrictMode.setThreadPolicy(android.os.StrictMode.ThreadPolicy.LAX);
    }
    return {
        nativeRequest: call,
        cancel: () => cancelRequest(tag, client),
        run(resolve, reject) {
            call.enqueue(
                new okhttp3.Callback({
                    onResponse(call, response) {
                        delete runningClients[tag];
                        if (!OkHttpResponse) {
                            OkHttpResponse = com.nativescript.https.OkHttpResponse;
                        }
                        try {
                            const responseBody = OkHttpResponse.getBody(response);
                            const message = OkHttpResponse.getMessage(response);
                            const statusCode = OkHttpResponse.getStatusCode(response);
                            const getHeaders = function () {
                                if (response) {
                                    const heads = OkHttpResponse.getHeaders(response);
                                    return JSON.parse(heads);
                                }
                            };
                            if (useLegacy) {
                                const nResponse = new OkHttpResponse(responseBody);
                                if (opts.onProgress) {
                                    nResponse.progressCallback = new OkHttpResponse.OkHttpResponseProgressCallback({
                                        onProgress: opts.onProgress
                                    });
                                }

                                resolve({
                                    response,
                                    content: new HttpsResponseLegacy(nResponse, tag, opts.url),
                                    contentLength: nResponse.contentLength(),
                                    statusCode,
                                    reason: message,
                                    get headers() {
                                        return getHeaders();
                                    }
                                });
                            } else {
                                resolve({
                                    response,
                                    content: responseBody.string(),
                                    contentLength: responseBody.contentLength(),
                                    reason: message,
                                    statusCode,
                                    get headers() {
                                        return getHeaders();
                                    }
                                });
                            }
                        } catch (error) {
                            delete runningClients[tag];
                            reject(error);
                        }
                    },
                    onFailure(task, error) {
                        delete runningClients[tag];
                        reject(error);
                    }
                })
            );
        }
    };
}

export function request(opts: HttpsRequestOptions, useLegacy: boolean = true) {
    return new Promise((resolve, reject) => {
        try {
            createRequest(opts, useLegacy).run(resolve, reject);
        } catch (error) {
            reject(error);
        }
    });
}
