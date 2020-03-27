import { isDefined, isNullOrUndefined, isObject } from 'tns-core-modules/utils/types';
import * as Https from './https.common';

let useLegacy: boolean = false;

let cache: NSURLCache;

export function setCache(options?: Https.CacheOptions) {
    if (options) {
        cache = NSURLCache.alloc().initWithMemoryCapacityDiskCapacityDirectoryURL(
            options.memorySize,
            options.diskSize,
            NSURL.URLWithString(options.diskLocation)
        );
    } else {
        cache = null;
    }
    NSURLCache.sharedURLCache = cache;
}
export function clearCache() {
    if (cache) {
        cache.removeAllCachedResponses();
    }
}

interface Ipolicies {
    def: AFSecurityPolicy;
    secured: boolean;
    secure?: AFSecurityPolicy;
}

let policies: Ipolicies = {
    def: AFSecurityPolicy.defaultPolicy(),
    secured: false,
};

policies.def.allowInvalidCertificates = true;
policies.def.validatesDomainName = false;

export function enableSSLPinning(options: Https.HttpsSSLPinningOptions) {
    if (!policies.secure) {
    policies.secure = AFSecurityPolicy.policyWithPinningMode(AFSSLPinningMode.PublicKey);
    policies.secure.allowInvalidCertificates = (isDefined(options.allowInvalidCertificates)) ? options.allowInvalidCertificates : false;
    policies.secure.validatesDomainName = (isDefined(options.validatesDomainName)) ? options.validatesDomainName : true;
        let data = NSData.dataWithContentsOfFile(options.certificate);
        policies.secure.pinnedCertificates = NSSet.setWithObject(data);
    }
  useLegacy = (isDefined(options.useLegacy)) ? options.useLegacy : false;
    policies.secured = true;
  console.log('nativescript-https > Enabled SSL pinning');
}

export function disableSSLPinning() {
    policies.secured = false;
  console.log('nativescript-https > Disabled SSL pinning');
    }

console.info('nativescript-https > Disabled SSL pinning by default');

function AFSuccess(resolve, task: NSURLSessionDataTask, data?: NSDictionary<string, any> & NSData & NSArray<any>) {
  let content = getData(data);
    resolve({ task, content });
}

function AFFailure(resolve, reject, task: NSURLSessionDataTask, error: NSError) {
  let data: NSDictionary<string, any> & NSData & NSArray<any> = error.userInfo.valueForKey(AFNetworkingOperationFailingURLResponseDataErrorKey);
  let parsedData = getData(data);
  if (useLegacy) {
    let failure: any = {
      body: parsedData,
      description: error.description,
      reason: error.localizedDescription,
      url: error.userInfo.objectForKey('NSErrorFailingURLKey').description
    };
    if (policies.secured === true) {
      failure.description = 'nativescript-https > Invalid SSL certificate! ' + error.description;
    }
    let reason = error.localizedDescription;
    resolve({task: task, content: parsedData, reason: reason, failure: failure});
  } else {
    let content: any = {
      body: parsedData,
        description: error.description,
        reason: error.localizedDescription,
      url: error.userInfo.objectForKey('NSErrorFailingURLKey').description
    };

    if (policies.secured === true) {
      content.description = 'nativescript-https > Invalid SSL certificate! ' + content.description;
    }

    let reason = error.localizedDescription;
    resolve({ task, content, reason });
}
}

function bodyToNative(cont) {
  let dict;
  if (Array.isArray(cont)) {
      dict = NSArray.arrayWithArray(cont.map(item=>bodyToNative(item)));
      // cont.forEach(function(item, idx) {
      //     dict.addObject(bodyToNative(item));
      // });
  } else if (isObject(cont)) {
      dict = NSMutableDictionary.new<string, any>();
      Object.keys(cont).forEach(key =>
          dict.setValueForKey(bodyToNative(cont[key]), key)
      );
  } else {
    dict = cont;
  }
  return dict;
}

export function request(opts: Https.HttpsRequestOptions): Promise<Https.HttpsResponse> {
    return new Promise((resolve, reject) => {
        try {
      const manager = AFHTTPSessionManager.alloc().initWithBaseURL(NSURL.URLWithString(opts.url));
      if (opts.headers && (<any>opts.headers['Content-Type']).substring(0, 16) === 'application/json') {
                manager.requestSerializer = AFJSONRequestSerializer.serializer();
        manager.responseSerializer = AFJSONResponseSerializer.serializerWithReadingOptions(NSJSONReadingOptions.AllowFragments);
            } else {
                manager.requestSerializer = AFHTTPRequestSerializer.serializer();
                manager.responseSerializer = AFHTTPResponseSerializer.serializer();
            }
            manager.requestSerializer.allowsCellularAccess = true;
      manager.securityPolicy = (policies.secured === true) ? policies.secure : policies.def;

            if (opts.cachePolicy) {
                let cacheControlBuilder = new okhttp3.CacheControl.Builder();
                switch (opts.cachePolicy) {
                    case "noCache":
                        manager.setDataTaskWillCacheResponseBlock((session, task, cacheResponse) => {
                          return null;
                        });
                        break;
                    case "onlyCache":
                        manager.requestSerializer.cachePolicy =
                            NSURLRequestCachePolicy.ReturnCacheDataDontLoad;
                        break;
                    case "ignoreCache":
                        manager.requestSerializer.cachePolicy =
                            NSURLRequestCachePolicy.ReloadIgnoringLocalCacheData;
                        break;
                }
            }
            let heads = opts.headers;
            if (heads) {
        Object.keys(heads).forEach(key => manager.requestSerializer.setValueForHTTPHeaderField(heads[key] as any, key));
            }

            let dict = null;
            if (opts.body) {
              dict = bodyToNative(opts.body);
            } else if (opts.content) {
              dict = opts.content;
            }

      manager.requestSerializer.timeoutInterval = opts.timeout ? opts.timeout : 10;

            let methods = {
                GET: "GETParametersSuccessFailure",
                POST: "POSTParametersSuccessFailure",
                PUT: "PUTParametersSuccessFailure",
                DELETE: "DELETEParametersSuccessFailure",
                PATCH: "PATCHParametersSuccessFailure",
                HEAD: "HEADParametersSuccessFailure",
            };
            manager[methods[opts.method]](
                opts.url,
                dict,
                function success(task: NSURLSessionDataTask, data: any) {
                    AFSuccess(resolve, task, data);
      };

      const failure = (task, error) => {
                    AFFailure(resolve, reject, task, error);
      };

      const progress = (progress: NSProgress) => {
        // console.log("Finished?: " + progress.finished);
      };

      if (opts.method === "GET") {
        manager.GETParametersHeadersProgressSuccessFailure(opts.url, dict, headers, progress, success, failure);
      } else if (opts.method === "POST") {
        manager.POSTParametersHeadersProgressSuccessFailure(opts.url, dict, headers, progress, success, failure);
      } else if (opts.method === "PUT") {
        manager.PUTParametersHeadersSuccessFailure(opts.url, dict, headers, success, failure);
      } else if (opts.method === "DELETE") {
        manager.DELETEParametersHeadersSuccessFailure(opts.url, dict, headers, success, failure);
      } else if (opts.method === "PATCH") {
        manager.PATCHParametersHeadersSuccessFailure(opts.url, dict, headers, success, failure);
      } else if (opts.method === "HEAD") {
        manager.HEADParametersHeadersSuccessFailure(opts.url, dict, headers, success, failure);
                }


        } catch (error) {
            reject(error);
        }

  }).then((AFResponse: {
    task: NSURLSessionDataTask
    content: any
    reason?: string
        }) => {
            let sendi: Https.HttpsResponse = {
                content: AFResponse.content,
                headers: {},
            };

            let response = AFResponse.task.response as NSHTTPURLResponse;
            if (!isNullOrUndefined(response)) {
                sendi.statusCode = response.statusCode;
                let dict = response.allHeaderFields;
      dict.enumerateKeysAndObjectsUsingBlock((k, v) => sendi.headers[k] = v);
            }

            if (AFResponse.reason) {
                sendi.reason = AFResponse.reason;
            }

            return Promise.resolve(sendi);
  });
}

function getData(data) {
  let content: any;
  if (data && data.class) {
    if (data.enumerateKeysAndObjectsUsingBlock || (<any>data) instanceof NSArray) {
      let serial = NSJSONSerialization.dataWithJSONObjectOptionsError(data, NSJSONWritingOptions.PrettyPrinted);
      content = NSString.alloc().initWithDataEncoding(serial, NSUTF8StringEncoding).toString();
    } else if ((<any>data) instanceof NSData) {
      content = NSString.alloc().initWithDataEncoding(data, NSASCIIStringEncoding).toString();
    } else {
      content = data;
    }

    try {
      content = JSON.parse(content);
    } catch (ignore) {
    }
  } else {
    content = data;
  }
  return content;
}
