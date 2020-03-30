import { isDefined } from 'tns-core-modules/utils/types';
import * as Https from './https.common';

interface Ipeer {
  enabled: boolean;
  allowInvalidCertificates: boolean;
  validatesDomainName: boolean;
  host?: string;
  commonName?: string;
  certificate?: string;
  x509Certificate?: java.security.cert.Certificate;
}

let peer: Ipeer = {
  enabled: false,
  allowInvalidCertificates: false,
  validatesDomainName: true
};

let cache:okhttp3.Cache;

export function setCache(options?: Https.CacheOptions) {
  if (options) {
    cache = new okhttp3.Cache(new java.io.File(options.diskLocation), options.diskSize);
  } else {
    cache = null
  }
  if (Client) {
    getClient(true);
  }
}
export function clearCache() {
  if (cache) {
    cache.evictAll();
  }
}

let _timeout = 10;

class Callback extends com.nativescript.https.OkhttpCallback{
  resolve
  reject
  onStringResponse (content, statusCode, heads) {
    let headers = {};
          // let heads: okhttp3.Headers = resp.headers();
          let i: number, len: number = heads.size();
          for (i = 0; i < len; i++) {
            let key = heads.name(i);
            headers[key] = heads.value(i);
          } 
          this.resolve({content, statusCode, headers});
  }
  onFailure (task, error) {
    this.reject(error);
  }
}

export function enableSSLPinning(options: Https.HttpsSSLPinningOptions) {
  // console.log('options', options)
  if (!peer.host && !peer.certificate) {
    let certificate: string;
    let inputStream: java.io.FileInputStream;
    try {
      let file = new java.io.File(options.certificate);
      inputStream = new java.io.FileInputStream(file);
      let x509Certificate = java.security.cert.CertificateFactory.getInstance('X509').generateCertificate(inputStream);
      peer.x509Certificate = x509Certificate;
      certificate = okhttp3.CertificatePinner.pin(x509Certificate);
      inputStream.close();
    } catch (error) {
      try {
        if (inputStream) {
          inputStream.close();
        }
      } catch (e) {
      }
      console.error('nativescript-https > enableSSLPinning error', error);
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
  getClient(true);
  console.log('nativescript-https > Enabled SSL pinning');
}

export function disableSSLPinning() {
  peer.enabled = false;
  getClient(true);
  console.log('nativescript-https > Disabled SSL pinning');
}

console.info('nativescript-https > Disabled SSL pinning by default');

let Client: okhttp3.OkHttpClient;

function getClient(reload: boolean = false, timeout: number = 10): okhttp3.OkHttpClient {
  // if (!Client) {
  // 	Client = new okhttp3.OkHttpClient()
  // }
  // if (Client) {
  // 	Client.connectionPool().evictAll()
  // 	Client = null
  // }
  if (Client && reload === false && _timeout === timeout) {
    return Client;
  }

  _timeout = timeout;

  let client = new okhttp3.OkHttpClient.Builder();
  if (peer.enabled === true) {
    // console.log('peer', peer)
    if (peer.host || peer.certificate) {
      let spec = okhttp3.ConnectionSpec.MODERN_TLS;
      client.connectionSpecs(java.util.Collections.singletonList(spec));

      let pinner = new okhttp3.CertificatePinner.Builder();
      pinner.add(peer.host, [peer.certificate]);
      client.certificatePinner(pinner.build());

      if (peer.allowInvalidCertificates === false) {
        try {
          let x509Certificate = peer.x509Certificate;
          let keyStore = java.security.KeyStore.getInstance(
              java.security.KeyStore.getDefaultType()
          );
          keyStore.load(null, null);
          // keyStore.setCertificateEntry(peer.host, x509Certificate)
          keyStore.setCertificateEntry('CA', x509Certificate);

          // let keyManagerFactory = javax.net.ssl.KeyManagerFactory.getInstance(
          // 	javax.net.ssl.KeyManagerFactory.getDefaultAlgorithm()
          // )
          let keyManagerFactory = javax.net.ssl.KeyManagerFactory.getInstance('X509');
          keyManagerFactory.init(keyStore, null);
          let keyManagers = keyManagerFactory.getKeyManagers();

          let trustManagerFactory = javax.net.ssl.TrustManagerFactory.getInstance(
              javax.net.ssl.TrustManagerFactory.getDefaultAlgorithm()
          );
          trustManagerFactory.init(keyStore);

          let sslContext = javax.net.ssl.SSLContext.getInstance('TLS');
          sslContext.init(keyManagers, trustManagerFactory.getTrustManagers(), new java.security.SecureRandom());
          client.sslSocketFactory(sslContext.getSocketFactory());

        } catch (error) {
          console.error('nativescript-https > client.allowInvalidCertificates error', error);
        }
      }

      if (peer.validatesDomainName === true) {
        try {
          client.hostnameVerifier(new javax.net.ssl.HostnameVerifier({
            verify: (hostname: string, session: javax.net.ssl.SSLSession): boolean => {
              let pp = session.getPeerPrincipal().getName();
              let hv = javax.net.ssl.HttpsURLConnection.getDefaultHostnameVerifier();
              if (peer.commonName && peer.commonName[0] === "*") {
                return (hv.verify(peer.host, session) &&
                    hostname.indexOf(peer.host) > -1 &&
                    hostname.indexOf(session.getPeerHost()) > -1 &&
                    pp.indexOf(peer.commonName) !== -1);
                }
                else {
                    return (hv.verify(peer.host, session) &&
                        peer.host === hostname &&
                        peer.host === session.getPeerHost() &&
                        pp.indexOf(peer.host) !== -1);
                }
            },
          }));
        } catch (error) {
          console.error('nativescript-https > client.validatesDomainName error', error);
        }
      }

    } else {
      console.warn('nativescript-https > Undefined host or certificate. SSL pinning NOT working!!!');
    }
  }

  if (cache) {
    client.cache(cache);
  }

  // set connection timeout to override okhttp3 default
  if (timeout) {
    client
        .connectTimeout(timeout, java.util.concurrent.TimeUnit.SECONDS)
        .writeTimeout(timeout, java.util.concurrent.TimeUnit.SECONDS)
        .readTimeout(timeout, java.util.concurrent.TimeUnit.SECONDS);
  }

  Client = client.build();
  return Client;
}
export function request(opts: Https.HttpsRequestOptions): Promise<Https.HttpsResponse> {
  return new Promise((resolve, reject) => {
    try {
      let client = getClient(false, opts.timeout);
      let request = new okhttp3.Request.Builder();
      request.url(opts.url);

      if (opts.headers) {
        // console.log('adding request header', opts.headers)
        Object.keys(opts.headers).forEach(key => request.addHeader(key, opts.headers[key] as any));
      }

      if (opts.cachePolicy) {
        let cacheControlBuilder = new okhttp3.CacheControl.Builder();
        switch (opts.cachePolicy) {
            case "noCache":
                cacheControlBuilder = cacheControlBuilder.noStore();
                break;
            case "onlyCache":
                cacheControlBuilder = cacheControlBuilder.onlyIfCached();
                break;
            case "ignoreCache":
                cacheControlBuilder = cacheControlBuilder.noCache();
                break;
        }
        request.cacheControl(cacheControlBuilder.build());
      }

      const methods = {
        'GET': 'get',
        'HEAD': 'head',
        'DELETE': 'delete',
        'POST': 'post',
        'PUT': 'put',
        'PATCH': 'patch'
      };
      let type
      if ((['GET', 'HEAD'].indexOf(opts.method) !== -1) || (opts.method === 'DELETE' && !isDefined(opts.body) && !isDefined(opts.content))) {
        request[methods[opts.method]]();
      } else {
        type = opts.headers && opts.headers['Content-Type'] ? <string>opts.headers['Content-Type'] : 'application/json';
        const MEDIA_TYPE = okhttp3.MediaType.parse(type);
        let okHttpBody: okhttp3.RequestBody;
        if (type === 'multipart/form-data')  {
          let builder = new okhttp3.MultipartBody.Builder();
          builder.setType(MEDIA_TYPE);

          (opts.body as Https.HttpsFormDataParam[]).forEach(param=>{
            // const param  =opts.body[k] as Https.HttpsFormDataParam;
            // console.log('handling multipart2', param.parameterName, param.data,param.fileName, param.contentType)
            if (param.fileName && param.contentType) {
              const MEDIA_TYPE = okhttp3.MediaType.parse(param.contentType);
              builder.addFormDataPart(param.parameterName, param.fileName, okhttp3.RequestBody.create(MEDIA_TYPE, param.data));
          } else {
              builder.addFormDataPart(param.parameterName, param.data);
          }
          })
          okHttpBody = builder.build();
        } else {
          let body;
          if (opts.body) {
            try {
              body = JSON.stringify(opts.body);
            } catch (ignore) {
            }
          } else if (opts.content) {
            body = opts.content
          }
          okHttpBody = okhttp3.RequestBody.create(
            okhttp3.MediaType.parse(type),
            body
          )
        }
        request[methods[opts.method]](okHttpBody);
        
      }

      // We have to allow networking on the main thread because larger responses will crash the app with an NetworkOnMainThreadException.
      // Note that it would probably be better to offload it to a Worker or (natively running) AsyncTask.
      // Also note that once set, this policy remains active until the app is killed.
      if (opts.allowLargeResponse) {
        android.os.StrictMode.setThreadPolicy(android.os.StrictMode.ThreadPolicy.LAX);
      }
      const callback = new Callback();
      callback.resolve = resolve;
      callback.reject = reject;
      client.newCall(request.build()).enqueue(callback);
    } catch (error) {
      reject(error);
    }
  });

}
