import { File, ImageSource, Utils } from '@nativescript/core';
import { CacheOptions, HttpsFormDataParam, HttpsRequest, HttpsRequestOptions, HttpsResponse, HttpsSSLPinningOptions, HttpsResponseLegacy as IHttpsResponseLegacy } from '.';
import { getFilenameFromUrl, interceptors, networkInterceptors, parseJSON } from './request.common';
export { addInterceptor, addNetworkInterceptor } from './request.common';

// Error keys used by the Swift wrapper to maintain compatibility with AFNetworking
const AFNetworkingOperationFailingURLResponseErrorKey = 'AFNetworkingOperationFailingURLResponseErrorKey';
const AFNetworkingOperationFailingURLResponseDataErrorKey = 'AFNetworkingOperationFailingURLResponseDataErrorKey';

let cache: NSURLCache;

export function setCache(options?: CacheOptions) {
    if (options) {
        cache = NSURLCache.alloc().initWithMemoryCapacityDiskCapacityDiskPath(options.memorySize, options.diskSize, options.diskLocation);
    } else {
        cache = null;
    }
    NSURLCache.sharedURLCache = cache;
}

export function clearCache() {
    NSURLCache.sharedURLCache.removeAllCachedResponses();
}

export function removeCachedResponse(url: string) {
    NSURLCache.sharedURLCache.removeCachedResponseForRequest(createNSRequest(url));
}

interface Ipolicies {
    def: SecurityPolicyWrapper;
    secured: boolean;
    secure?: SecurityPolicyWrapper;
}

const policies: Ipolicies = {
    def: SecurityPolicyWrapper.defaultPolicy(),
    secured: false
};

policies.def.allowInvalidCertificates = true;
policies.def.validatesDomainName = false;

const configuration = NSURLSessionConfiguration.defaultSessionConfiguration;
let manager = AlamofireWrapper.alloc().initWithConfiguration(configuration);

// Note: iOS interceptors must be native Alamofire RequestInterceptor or EventMonitor objects
// They cannot be JavaScript functions like Android OkHttp interceptors
// To use interceptors on iOS, you need to create native Swift wrapper classes

// Apply interceptors from common if they are Alamofire-compatible objects
function applyInterceptors() {
    interceptors.forEach((interceptor) => {
        if (interceptor && typeof interceptor === 'object' && 'adapt' in interceptor) {
            manager.addInterceptor(interceptor);
        }
    });
    networkInterceptors.forEach((monitor) => {
        if (monitor && typeof monitor === 'object') {
            manager.addEventMonitor(monitor);
        }
    });
}

// Apply any pre-existing interceptors
applyInterceptors();

export function enableSSLPinning(options: HttpsSSLPinningOptions) {
    const url = NSURL.URLWithString(options.host);
    manager = AlamofireWrapper.alloc().initWithConfigurationBaseURL(configuration, url);
    if (!policies.secure) {
        policies.secure = SecurityPolicyWrapper.policyWithPinningMode(AFSSLPinningMode.PublicKey);
        policies.secure.allowInvalidCertificates = Utils.isDefined(options.allowInvalidCertificates) ? options.allowInvalidCertificates : false;
        policies.secure.validatesDomainName = Utils.isDefined(options.validatesDomainName) ? options.validatesDomainName : true;
        const data = NSData.dataWithContentsOfFile(options.certificate);
        policies.secure.pinnedCertificates = NSSet.setWithObject(data);
    }
    policies.secured = true;
}

export function disableSSLPinning() {
    policies.secured = false;
}

function nativeToObj(data, encoding?) {
    let content: any;
    if (data instanceof NSDictionary) {
        content = {};
        data.enumerateKeysAndObjectsUsingBlock((key, value, stop) => {
            content[key] = nativeToObj(value, encoding);
        });
        return content;
    } else if (data instanceof NSArray) {
        content = [];
        data.enumerateObjectsUsingBlock((value, index, stop) => {
            content[index] = nativeToObj(value, encoding);
        });
        return content;
    } else if (data instanceof NSData) {
        return NSString.alloc()
            .initWithDataEncoding(data, encoding === 'ascii' ? NSASCIIStringEncoding : NSUTF8StringEncoding)
            .toString();
    } else {
        return data;
    }
}

function getData(data, encoding?) {
    let content: any;
    if (data && data.class) {
        const nEncoding = encoding === 'ascii' ? NSASCIIStringEncoding : NSUTF8StringEncoding;
        if (data.enumerateKeysAndObjectsUsingBlock || data instanceof NSArray) {
            const serial = NSJSONSerialization.dataWithJSONObjectOptionsError(data, NSJSONWritingOptions.PrettyPrinted);
            content = NSString.alloc().initWithDataEncoding(serial, nEncoding)?.toString();
        } else if (data instanceof NSData) {
            content = NSString.alloc().initWithDataEncoding(data, nEncoding)?.toString();
        } else {
            content = data;
        }

        try {
            content = JSON.parse(content);
        } catch (ignore) {}
    } else if (typeof data === 'object') {
        content = JSON.stringify(data);
    } else {
        content = data;
    }
    return content;
}

function createNSRequest(url: string): NSMutableURLRequest {
    return NSMutableURLRequest.alloc().initWithURL(NSURL.URLWithString(url));
}

class HttpsResponseLegacy implements IHttpsResponseLegacy {
    //     private callback?: com.nativescript.https.OkhttpResponse.OkHttpResponseAsyncCallback;
    private tempFilePath?: string;
    private downloadCompletionPromise?: Promise<void>;
    private downloadCompleted: boolean = false;

    constructor(
        private data: NSDictionary<string, any> & NSData & NSArray<any>,
        public contentLength,
        private url: string,
        tempFilePath?: string,
        downloadCompletionPromise?: Promise<void>
    ) {
        this.tempFilePath = tempFilePath;
        this.downloadCompletionPromise = downloadCompletionPromise;
        // If no download promise provided, download is already complete
        if (!downloadCompletionPromise) {
            this.downloadCompleted = true;
        }
    }

    // Wait for download to complete if needed
    private async waitForDownloadCompletion(): Promise<void> {
        if (this.downloadCompleted) {
            return;
        }
        if (this.downloadCompletionPromise) {
            await this.downloadCompletionPromise;
            this.downloadCompleted = true;
        }
    }

    // Helper to ensure data is loaded from temp file if needed
    private async ensureDataLoaded(): Promise<boolean> {
        // Wait for download to complete first
        await this.waitForDownloadCompletion();

        // If we have data already, we're good
        if (this.data) {
            return true;
        }

        // If we have a temp file, load it into memory
        if (this.tempFilePath) {
            try {
                this.data = NSData.dataWithContentsOfFile(this.tempFilePath) as any;
                return this.data != null;
            } catch (e) {
                console.error('Failed to load data from temp file:', e);
                return false;
            }
        }

        return false;
    }

    // Synchronous version for backward compatibility
    private ensureDataLoadedSync(): boolean {
        // If we have data already, we're good
        if (this.data) {
            return true;
        }

        // If we have a temp file, load it into memory
        if (this.tempFilePath) {
            try {
                this.data = NSData.dataWithContentsOfFile(this.tempFilePath) as any;
                return this.data != null;
            } catch (e) {
                console.error('Failed to load data from temp file:', e);
                return false;
            }
        }

        return false;
    }

    // Helper to get temp file path or create from data
    private async getTempFilePath(): Promise<string | null> {
        // Wait for download to complete first
        await this.waitForDownloadCompletion();

        if (this.tempFilePath) {
            return this.tempFilePath;
        }

        // If we have data but no temp file, create a temp file
        if (this.data && this.data instanceof NSData) {
            const tempDir = NSTemporaryDirectory();
            const tempFileName = NSUUID.UUID().UUIDString;
            const tempPath = tempDir + tempFileName;
            const success = this.data.writeToFileAtomically(tempPath, true);
            if (success) {
                this.tempFilePath = tempPath;
                return tempPath;
            }
        }

        return null;
    }

    toArrayBufferAsync(): Promise<ArrayBuffer> {
        throw new Error('Method not implemented.');
    }

    arrayBuffer: ArrayBuffer;
    toArrayBuffer() {
        if (!this.ensureDataLoadedSync()) {
            return null;
        }
        if (this.arrayBuffer) {
            return this.arrayBuffer;
        }
        if (this.data instanceof NSData) {
            this.arrayBuffer = interop.bufferFromData(this.data);
        } else {
            this.arrayBuffer = interop.bufferFromData(NSKeyedArchiver.archivedDataWithRootObject(this.data));
        }
        return this.arrayBuffer;
    }
    stringResponse: string;
    toString(encoding?: any) {
        if (!this.ensureDataLoadedSync()) {
            return null;
        }
        if (this.stringResponse) {
            return this.stringResponse;
        }
        if (this.jsonResponse) {
            this.stringResponse = JSON.stringify(this.jsonResponse);
            return this.stringResponse;
        }
        if (typeof this.data === 'string') {
            this.stringResponse = this.data;
            return this.data;
        } else {
            const data = nativeToObj(this.data, encoding);
            if (typeof data === 'string') {
                this.stringResponse = data;
            } else {
                this.jsonResponse = data;
                this.stringResponse = JSON.stringify(data);
            }
            return this.stringResponse;
        }
    }
    toStringAsync(encoding?: any) {
        return this.ensureDataLoaded().then(() => this.toString(encoding));
    }
    jsonResponse: any;
    toJSON<T>(encoding?: any) {
        if (!this.ensureDataLoadedSync()) {
            return null;
        }
        if (this.jsonResponse) {
            return this.jsonResponse;
        }
        if (this.stringResponse) {
            this.jsonResponse = parseJSON(this.stringResponse);
            return this.jsonResponse;
        }
        const data = nativeToObj(this.data, encoding);
        if (typeof data === 'object') {
            this.jsonResponse = data;
            return data;
        }
        this.stringResponse = data;
        this.jsonResponse = data ? parseJSON(data) : null;
        return this.jsonResponse as T;
    }
    toJSONAsync<T>() {
        return this.ensureDataLoaded().then(() => this.toJSON<T>());
    }
    imageSource: ImageSource;
    async toImage(): Promise<ImageSource> {
        if (!(await this.ensureDataLoaded())) {
            return Promise.resolve(null);
        }
        if (this.imageSource) {
            return Promise.resolve(this.imageSource);
        }
        const r = await new Promise<ImageSource>((resolve, reject) => {
            (UIImage as any).tns_decodeImageWithDataCompletion(this.data, (image) => {
                if (image) {
                    resolve(new ImageSource(image));
                } else {
                    reject(new Error('Response content may not be converted to an Image'));
                }
            });
        });
        this.imageSource = r;
        return r;
    }
    file: File;
    async toFile(destinationFilePath?: string): Promise<File> {
        // Wait for download to complete before proceeding
        await this.waitForDownloadCompletion();

        if (this.file) {
            return Promise.resolve(this.file);
        }

        const r = await new Promise<File>((resolve, reject) => {
            if (!destinationFilePath) {
                destinationFilePath = getFilenameFromUrl(this.url);
            }

            // If we have a temp file, move it to destination (efficient, no memory copy)
            if (this.tempFilePath) {
                try {
                    const fileManager = NSFileManager.defaultManager;
                    const destURL = NSURL.fileURLWithPath(destinationFilePath);
                    const tempURL = NSURL.fileURLWithPath(this.tempFilePath);

                    // Create parent directory if needed
                    const parentDir = destURL.URLByDeletingLastPathComponent;
                    fileManager.createDirectoryAtURLWithIntermediateDirectoriesAttributesError(parentDir, true, null);

                    // Remove destination if it exists
                    if (fileManager.fileExistsAtPath(destinationFilePath)) {
                        fileManager.removeItemAtPathError(destinationFilePath);
                    }

                    // Move temp file to destination
                    const success = fileManager.moveItemAtURLToURLError(tempURL, destURL);
                    if (success) {
                        // Clear temp path since file has been moved
                        this.tempFilePath = null;
                        resolve(File.fromPath(destinationFilePath));
                    } else {
                        reject(new Error(`Failed to move temp file to: ${destinationFilePath}`));
                    }
                } catch (e) {
                    reject(new Error(`Cannot save file with path: ${destinationFilePath}. ${e}`));
                }
            }
            // Fallback: if we have data in memory, write it
            else if (this.ensureDataLoadedSync() && this.data instanceof NSData) {
                const file = File.fromPath(destinationFilePath);
                const result = this.data.writeToFileAtomically(destinationFilePath, true);
                if (result) {
                    resolve(file);
                } else {
                    reject(new Error(`Cannot save file with path: ${destinationFilePath}.`));
                }
            } else {
                reject(new Error(`No data available to save to file: ${destinationFilePath}.`));
            }
        });

        this.file = r;
        return r;
    }
}

function AFFailure(resolve, reject, httpResponse: NSHTTPURLResponse, error: NSError, useLegacy: boolean, url) {
    if (error.code === -999) {
        return reject(error);
    }
    let getHeaders = () => ({});
    const sendi = {
        httpResponse,
        contentLength: httpResponse?.expectedContentLength ?? 0,
        reason: error.localizedDescription,
        get headers() {
            return getHeaders();
        }
    } as any as HttpsResponse;
    
    // Try to get response from error or use the one passed in
    const response = httpResponse || (error.userInfo.valueForKey(AFNetworkingOperationFailingURLResponseErrorKey) as NSHTTPURLResponse);
    if (!Utils.isNullOrUndefined(response)) {
        sendi.statusCode = response.statusCode;
        getHeaders = function () {
            const dict = response.allHeaderFields;
            if (dict) {
                const headers = {};
                dict.enumerateKeysAndObjectsUsingBlock((k, v) => (headers[k] = v));
                return headers;
            }
            return null;
        };
    }

    const data: NSDictionary<string, any> & NSData & NSArray<any> = error.userInfo.valueForKey(AFNetworkingOperationFailingURLResponseDataErrorKey);
    const parsedData = getData(data);
    const failingURL = error.userInfo.objectForKey('NSErrorFailingURLKey');
    if (useLegacy) {
        if (!sendi.statusCode) {
            return reject(error);
        }
        const failure: any = {
            error,
            description: error.description,
            reason: error.localizedDescription,
            url: failingURL ? failingURL.description : url
        };
        if (policies.secured === true) {
            failure.description = '@nativescript-community/https > Invalid SSL certificate! ' + error.description;
        }
        sendi.failure = failure;
        sendi.content = new HttpsResponseLegacy(data, sendi.contentLength, url);
        resolve(sendi);
    } else {
        const response: any = {
            error,
            body: parsedData,
            contentLength: sendi.contentLength,
            description: error.description,
            reason: error.localizedDescription,
            url: failingURL ? failingURL.description : url
        };

        if (policies.secured === true) {
            response.description = '@nativescript-community/https > Invalid SSL certificate! ' + response.description;
        }
        sendi.content = parsedData;
        sendi.response = response;

        resolve(sendi);
    }
}

function bodyToNative(cont) {
    let dict;
    if (Array.isArray(cont)) {
        dict = NSArray.arrayWithArray(cont.map((item) => bodyToNative(item)));
    } else if (Utils.isObject(cont)) {
        dict = NSMutableDictionary.new<string, any>();
        Object.keys(cont).forEach((key) => dict.setValueForKey(bodyToNative(cont[key]), key));
    } else {
        dict = cont;
    }
    return dict;
}

const runningRequests: { [k: string]: string } = {};  // Maps tag to request ID

export function cancelRequest(tag: string) {
    const requestId = runningRequests[tag];
    if (requestId) {
        manager.cancelRequest(requestId);
    }
}

export function cancelAllRequests() {
    Object.values(runningRequests).forEach((requestId) => {
        manager.cancelRequest(requestId);
    });
}

export function clearCookies() {
    const storage = NSHTTPCookieStorage.sharedHTTPCookieStorage;
    const cookies = storage.cookies;
    cookies.enumerateObjectsUsingBlock((cookie) => {
        storage.deleteCookie(cookie);
    });
}
export function createRequest(opts: HttpsRequestOptions, useLegacy: boolean = true): HttpsRequest {
    const type = opts.headers?.['Content-Type'] ?? 'application/json';
    if (type.startsWith('application/json')) {
        manager.requestSerializerWrapper.httpShouldHandleCookies = opts.cookiesEnabled !== false;
        manager.responseSerializerWrapper.acceptsJSON = true;
        manager.responseSerializerWrapper.readingOptions = NSJSONReadingOptions.AllowFragments;
    } else {
        manager.requestSerializerWrapper.httpShouldHandleCookies = opts.cookiesEnabled !== false;
        manager.responseSerializerWrapper.acceptsJSON = false;
    }
    manager.requestSerializerWrapper.allowsCellularAccess = true;
    manager.securityPolicyWrapper = policies.secured === true ? policies.secure : policies.def;

    if (opts.cachePolicy) {
        switch (opts.cachePolicy) {
            case 'noCache':
                manager.setDataTaskWillCacheResponseBlock((session, task, cacheResponse) => null);
                break;
            case 'onlyCache':
                manager.requestSerializerWrapper.cachePolicy = NSURLRequestCachePolicy.ReturnCacheDataDontLoad;
                break;
            case 'ignoreCache':
                manager.requestSerializerWrapper.cachePolicy = NSURLRequestCachePolicy.ReloadIgnoringLocalCacheData;
                break;
        }
    } else {
        manager.requestSerializerWrapper.cachePolicy = NSURLRequestCachePolicy.UseProtocolCachePolicy;
    }
    const heads = opts.headers;
    let headers: NSMutableDictionary<string, any> = null;
    if (heads) {
        headers = NSMutableDictionary.dictionary();
        Object.keys(heads).forEach(
            (key) => {
                if (heads[key]) {
                    headers.setValueForKey(heads[key], key);
                }
            }
            // manager.requestSerializer.setValueForHTTPHeaderField(
            //     heads[key] as any,
            //     key
            // )
        );
    }

    manager.requestSerializerWrapper.timeoutInterval = opts.timeout ? opts.timeout : 10;

    const progress = opts.onProgress
        ? (progress: NSProgress) => {
              if (opts.progressOnMainThread === false || (opts.progressOnMainThread === undefined && opts.responseOnMainThread === false)) {
                  opts.onProgress(progress.completedUnitCount, progress.totalUnitCount);
              } else {
                  Utils.dispatchToMainThread(() => {
                      opts.onProgress(progress.completedUnitCount, progress.totalUnitCount);
                  });
              }
          }
        : null;
    const tag = opts.tag;
    // Generate request ID for tracking
    const requestId = tag || `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    function clearRunningRequest() {
        if (tag) {
            delete runningRequests[tag];
        }
    }
    return {
        get nativeRequest() {
            return null;  // We no longer expose the task
        },
        cancel: () => {
            const rid = runningRequests[tag];
            if (rid) {
                manager.cancelRequest(rid);
            }
        },
        run(resolve, reject) {
            const success = function (response: NSHTTPURLResponse, data?: any) {
                clearRunningRequest();
                const contentLength = response?.expectedContentLength ?? 0;
                console.log('run done', contentLength);
                const content = useLegacy ? new HttpsResponseLegacy(data, contentLength, opts.url) : getData(data);
                let getHeaders = () => ({});
                const sendi = {
                    content,
                    contentLength,
                    get headers() {
                        return getHeaders();
                    }
                } as any as HttpsResponse;

                if (!Utils.isNullOrUndefined(response)) {
                    sendi.statusCode = response.statusCode;
                    getHeaders = function () {
                        const dict = response.allHeaderFields;
                        if (dict) {
                            const headers = {};
                            dict.enumerateKeysAndObjectsUsingBlock((k, v) => (headers[k] = v));
                            return headers;
                        }
                        return null;
                    };
                }
                resolve(sendi);

                // if (AFResponse.reason) {
                //     sendi.reason = AFResponse.reason;
                // }
            };
            const failure = function (response: NSHTTPURLResponse, error: any) {
                clearRunningRequest();
                AFFailure(resolve, reject, response, error, useLegacy, opts.url);
            };
            if (type.startsWith('multipart/form-data')) {
                switch (opts.method) {
                    case 'POST':
                        // we need to remove the Content-Type or the boundary wont be set correctly
                        headers.removeObjectForKey('Content-Type');
                        if (tag) {
                            runningRequests[tag] = requestId;
                        }
                        manager.uploadMultipart(
                            opts.url,
                            headers,
                            requestId,
                            (formData) => {
                                (opts.body as HttpsFormDataParam[]).forEach((param) => {
                                    if (param.fileName && param.contentType) {
                                        if (param.data instanceof NSURL) {
                                            formData.appendPartWithFileURLNameFileNameMimeTypeError(param.data, param.parameterName, param.fileName, param.contentType);
                                        } else if (param.data instanceof File) {
                                            formData.appendPartWithFileURLNameFileNameMimeTypeError(NSURL.fileURLWithPath(param.data.path), param.parameterName, param.fileName, param.contentType);
                                        } else {
                                            let data = param.data;
                                            if (typeof data === 'string') {
                                                data = NSString.stringWithString(data).dataUsingEncoding(NSUTF8StringEncoding);
                                            } else if (data instanceof ArrayBuffer) {
                                                const buffer = new Uint8Array(data);
                                                data = NSData.dataWithData(buffer as any);
                                            } else if (data instanceof Blob) {
                                                // Stolen from core xhr, not sure if we should use InternalAccessor, but it provides fast access.
                                                // @ts-ignore
                                                const buffer = new Uint8Array(Blob.InternalAccessor.getBuffer(data).buffer.slice(0) as ArrayBuffer);
                                                data = NSData.dataWithData(buffer as any);
                                            }

                                            formData.appendPartWithFileDataNameFileNameMimeType(data, param.parameterName, param.fileName, param.contentType);
                                        }
                                    } else {
                                        formData.appendPartWithFormDataName(NSString.stringWithString(param.data).dataUsingEncoding(NSUTF8StringEncoding), param.parameterName);
                                    }
                                });
                            },
                            progress,
                            success,
                            failure
                        );
                        break;
                    default:
                        throw new Error('method_not_supported_multipart');
                }
            } else if (opts.method === 'PUT') {
                if (opts.body instanceof File) {
                    const request = createNSRequest(opts.url);
                    request.HTTPMethod = opts.method;
                    Object.keys(heads).forEach((k) => {
                        request.setValueForHTTPHeaderField(heads[k], k);
                    });
                    task = manager.uploadFile(request, NSURL.fileURLWithPath(opts.body.path), progress, (response: NSURLResponse, responseObject: any, error: NSError) => {
                        if (error) {
                            failure(task, error);
                        } else {
                            success(task, responseObject);
                        }
                    });
                    task.resume();
                } else {
                    let data: NSData;
                    // TODO: add support for Buffers
                    if (opts.content instanceof NSData) {
                        data = opts.content;
                    } else if (typeof opts.body === 'string') {
                        data = NSString.stringWithString(opts.body).dataUsingEncoding(NSUTF8StringEncoding);
                    } else {
                        data = NSString.stringWithString(JSON.stringify(opts.body)).dataUsingEncoding(NSUTF8StringEncoding);
                    }
                    const request = createNSRequest(opts.url);
                    request.HTTPMethod = opts.method;
                    Object.keys(heads).forEach((k) => {
                        request.setValueForHTTPHeaderField(heads[k], k);
                    });
                    task = manager.uploadData(request, data, progress, (response: NSURLResponse, responseObject: any, error: NSError) => {
                        if (error) {
                            failure(task, error);
                        } else {
                            success(task, responseObject);
                        }
                    });
                    task.resume();
                }
            } else {
                let dict = null;
                if (opts.body) {
                    if (typeof opts.body === 'string') {
                        dict = NSJSONSerialization.JSONObjectWithDataOptionsError(NSString.stringWithString(opts.body).dataUsingEncoding(NSUTF8StringEncoding), 0 as any);
                    } else {
                        dict = NSJSONSerialization.JSONObjectWithDataOptionsError(NSString.stringWithString(JSON.stringify(opts.body)).dataUsingEncoding(NSUTF8StringEncoding), 0 as any);
                    }
                } else if (typeof opts.content === 'string') {
                    dict = NSJSONSerialization.JSONObjectWithDataOptionsError(NSString.stringWithString(opts.content).dataUsingEncoding(NSUTF8StringEncoding), 0 as any);
                }

                // For GET requests, decide between memory and file download
                if (opts.method === 'GET') {
                    // Check if early resolution is requested
                    const earlyResolve = opts.earlyResolve === true;
                    const sizeThreshold = opts.downloadSizeThreshold !== undefined ? opts.downloadSizeThreshold : 1024 * 1024 * 10; // Default: always use file download

                    // Check if conditional download is requested (threshold set and not using early resolve)
                    const useConditionalDownload = sizeThreshold >= 0 && !earlyResolve;

                    if (useConditionalDownload) {
                        // Use conditional download: check size and decide memory vs file
                        if (tag) {
                            runningRequests[tag] = requestId;
                        }
                        manager.requestWithConditionalDownload(
                            opts.method,
                            opts.url,
                            dict,
                            headers,
                            requestId,
                            sizeThreshold,
                            progress,
                            (httpResponse: NSHTTPURLResponse, responseData: any, tempFilePath: string) => {
                                clearRunningRequest();

                                const contentLength = httpResponse?.expectedContentLength || 0;

                                // If we got a temp file path, response was saved to file (large)
                                // If we got responseData, response is in memory (small)
                                const content = useLegacy
                                    ? tempFilePath
                                        ? new HttpsResponseLegacy(null, contentLength, opts.url, tempFilePath)
                                        : new HttpsResponseLegacy(responseData, contentLength, opts.url)
                                    : tempFilePath || responseData;

                                let getHeaders = () => ({});
                                const sendi = {
                                    content,
                                    contentLength,
                                    get headers() {
                                        return getHeaders();
                                    }
                                } as any as HttpsResponse;

                                if (!Utils.isNullOrUndefined(httpResponse)) {
                                    sendi.statusCode = httpResponse.statusCode;
                                    getHeaders = function () {
                                        const dict = httpResponse.allHeaderFields;
                                        if (dict) {
                                            const headers = {};
                                            dict.enumerateKeysAndObjectsUsingBlock((k, v) => (headers[k] = v));
                                            return headers;
                                        }
                                        return null;
                                    };
                                }
                                resolve(sendi);
                            },
                            (httpResponse: NSHTTPURLResponse, error: NSError) => {
                                clearRunningRequest();
                                failure(httpResponse, error);
                            }
                        );
                    } else if (earlyResolve) {
                        // Use early resolution: resolve when headers arrive, continue download in background
                        let downloadCompletionResolve: () => void;
                        let downloadCompletionReject: (error: Error) => void;
                        const downloadCompletionPromise = new Promise<void>((res, rej) => {
                            downloadCompletionResolve = res;
                            downloadCompletionReject = rej;
                        });

                        // Track the content object so we can update it when download completes
                        let responseContent: HttpsResponseLegacy | undefined;

                        const downloadTask = manager.downloadToTempWithEarlyHeaders(
                            opts.method,
                            opts.url,
                            dict,
                            headers,
                            sizeThreshold,
                            progress,
                            (response: NSURLResponse, contentLength: number) => {
                                // Headers callback - resolve request early
                                clearRunningRequest();

                                const httpResponse = response as NSHTTPURLResponse;

                                // Create response WITHOUT temp file path (download still in progress)
                                if (useLegacy) {
                                    responseContent = new HttpsResponseLegacy(null, contentLength, opts.url, undefined, downloadCompletionPromise);
                                }
                                const content = useLegacy ? responseContent : undefined;

                                let getHeaders = () => ({});
                                const sendi = {
                                    content,
                                    contentLength,
                                    get headers() {
                                        return getHeaders();
                                    }
                                } as any as HttpsResponse;

                                if (!Utils.isNullOrUndefined(httpResponse)) {
                                    sendi.statusCode = httpResponse.statusCode;
                                    getHeaders = function () {
                                        const dict = httpResponse.allHeaderFields;
                                        if (dict) {
                                            const headers = {};
                                            dict.enumerateKeysAndObjectsUsingBlock((k, v) => (headers[k] = v));
                                            return headers;
                                        }
                                        return null;
                                    };
                                }

                                // Resolve immediately with headers
                                resolve(sendi);
                            },
                            (response: NSURLResponse, tempFilePath: string, error: NSError) => {
                                // Download completion callback
                                if (error) {
                                    downloadCompletionReject(new Error(error.localizedDescription));
                                } else {
                                    // Update the response content with temp file path
                                    if (responseContent) {
                                        (responseContent as any).tempFilePath = tempFilePath;
                                    }
                                    downloadCompletionResolve();
                                }
                            }
                        );

                        task = downloadTask as any;
                    } else {
                        // Standard download: wait for full download before resolving
                        const downloadTask = manager.downloadToTemp(opts.method, opts.url, dict, headers, progress, (response: NSURLResponse, tempFilePath: string, error: NSError) => {
                            clearRunningRequest();
                            if (error) {
                                // Convert download task to data task for failure handling
                                const dataTask = task as any as NSURLSessionTask;
                                failure(dataTask, error);
                                return;
                            }

                            const httpResponse = response as NSHTTPURLResponse;
                            const contentLength = httpResponse?.expectedContentLength || 0;

                            // Create response with temp file path (no data loaded in memory yet)
                            const content = useLegacy ? new HttpsResponseLegacy(null, contentLength, opts.url, tempFilePath) : tempFilePath;

                            let getHeaders = () => ({});
                            const sendi = {
                                content,
                                contentLength,
                                get headers() {
                                    return getHeaders();
                                }
                            } as any as HttpsResponse;

                            if (!Utils.isNullOrUndefined(httpResponse)) {
                                sendi.statusCode = httpResponse.statusCode;
                                getHeaders = function () {
                                    const dict = httpResponse.allHeaderFields;
                                    if (dict) {
                                        const headers = {};
                                        dict.enumerateKeysAndObjectsUsingBlock((k, v) => (headers[k] = v));
                                        return headers;
                                    }
                                    return null;
                                };
                            }
                            resolve(sendi);
                        });

                        task = downloadTask as any;
                    }
                } else {
                    // For non-GET requests, use regular request (loads into memory)
                    if (tag) {
                        runningRequests[tag] = requestId;
                    }
                    manager.request(opts.method, opts.url, dict, headers, requestId, progress, progress, success, failure);
                }
            }
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

// Android only
export function getClient(opts: Partial<HttpsRequestOptions>) {
    return undefined;
}
