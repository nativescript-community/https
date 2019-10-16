import { isDefined, isNullOrUndefined, isObject } from 'tns-core-modules/utils/types';
import * as Https from './https.common';

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
  // console.log('options', options)
  if (!policies.secure) {
    policies.secure = AFSecurityPolicy.policyWithPinningMode(AFSSLPinningMode.PublicKey);
    policies.secure.allowInvalidCertificates = (isDefined(options.allowInvalidCertificates)) ? options.allowInvalidCertificates : false;
    policies.secure.validatesDomainName = (isDefined(options.validatesDomainName)) ? options.validatesDomainName : true;
    let data = NSData.dataWithContentsOfFile(options.certificate);
    // console.log('data.description', data.description)
    // console.log('data.bytes', data.bytes)
    // console.log('data.base64Encoding()', data.base64Encoding())
    // console.log('data.length', data.length)
    policies.secure.pinnedCertificates = NSSet.setWithObject(data);
  }
  policies.secured = true;
  console.log('nativescript-https > Enabled SSL pinning');
}

export function disableSSLPinning() {
  policies.secured = false;
  console.log('nativescript-https > Disabled SSL pinning');
}

console.info('nativescript-https > Disabled SSL pinning by default');

function AFSuccess(resolve, task: NSURLSessionDataTask, data: NSDictionary<string, any> & NSData & NSArray<any>) {
  // console.log('AFSuccess')
  let content: any;
  if (data && data.class) {
    // console.log('data.class().name', data.class().name)
    if (data.enumerateKeysAndObjectsUsingBlock || data.class().name === 'NSArray') {
      // content = {}
      // data.enumerateKeysAndObjectsUsingBlock(function(k, v) {
      // 	console.log('v.description', v.description)
      // 	content[k] = v
      // })
      let serial = NSJSONSerialization.dataWithJSONObjectOptionsError(data, NSJSONWritingOptions.PrettyPrinted);
      content = NSString.alloc().initWithDataEncoding(serial, NSUTF8StringEncoding).toString();
      // console.log('content', content)
    } else if (data.class().name === 'NSData') {
      content = NSString.alloc().initWithDataEncoding(data, NSASCIIStringEncoding).toString();
      // } else if (data.class().name == 'NSArray') {
      // 	content = []
      // 	let i: number, len: number = data.count
      // 	for (i = 0; i < len; i++) {
      // 		let item
      // 		let result: NSDictionary<string, any> = data[i]
      // 		if (result.enumerateKeysAndObjectsUsingBlock) {
      // 			item = {}
      // 			result.enumerateKeysAndObjectsUsingBlock(function(k, v) {
      // 				item[k] = v
      // 			})
      // 		} else {
      // 			item = data[i]
      // 		}
      // 		content.push(item)
      // 	}
    } else {
      content = data;
    }

    try {
      content = JSON.parse(content);
    } catch (e) {
    }

  } else {
    content = data;
  }

  resolve({task, content});
}

function AFFailure(resolve, reject, task: NSURLSessionDataTask, error: NSError) {
  // console.error('AFFailure')
  // console.log('error.description', error.description)
  // console.log('error.userInfo.description', error.userInfo.description)
  // console.log('error.localizedDescription', error.localizedDescription)
  let data: NSData = error.userInfo.valueForKey(AFNetworkingOperationFailingURLResponseDataErrorKey);
  let body = NSString.alloc().initWithDataEncoding(data, NSUTF8StringEncoding).toString();
  try {
    body = JSON.parse(body);
  } catch (e) {
  }
  let content: any = {
    body,
    description: error.description,
    reason: error.localizedDescription,
    url: error.userInfo.objectForKey('NSErrorFailingURLKey').description
  };
  // console.log('content.url', content.url)
  // try {
  // 	content.body = JSON.parse(body.description)
  // } catch (e) {
  if (policies.secured === true) {
    // console.log('error.description', error.description)
    // console.log('error.userInfo.description', error.userInfo.description)
    content.description = 'nativescript-https > Invalid SSL certificate! ' + content.description;
    // return reject(content)
  }
  // }
  // console.log('error.description', error.description)
  // console.keys('error', error)
  // console.keys('error.userInfo', error.userInfo)
  // error.userInfo.enumerateKeysAndObjectsUsingBlock(function(k, v) {
  // 	console.log('k', k)
  // 	console.log('v.description', v.description)
  // })
  // let keys = error.userInfo.allKeysForObject(error.userInfo)
  // console.log('keys.description', keys.description)
  // let url = error.valueForKey('URL')
  // console.error('url', url)
  // if (!isNullOrUndefined(task.response)) {
  // 	content.URL = task.response.URL
  // }
  let reason = error.localizedDescription;
  resolve({task, content, reason});
}

export function request(opts: Https.HttpsRequestOptions): Promise<Https.HttpsResponse> {
  return new Promise((resolve, reject) => {
    try {

      const manager = AFHTTPSessionManager.alloc().initWithBaseURL(NSURL.URLWithString(opts.url));

      if (opts.headers && opts.headers['Content-Type'] === 'application/json') {
        manager.requestSerializer = AFJSONRequestSerializer.serializer();
        manager.responseSerializer = AFJSONResponseSerializer.serializerWithReadingOptions(NSJSONReadingOptions.AllowFragments);
      } else {
        manager.requestSerializer = AFHTTPRequestSerializer.serializer();
        // manager.responseSerializer = AFXMLParserResponseSerializer.serializer()
        manager.responseSerializer = AFHTTPResponseSerializer.serializer();
        // manager.responseSerializer.acceptableContentTypes = NSSet.setWithObject('text/html')
        // manager.responseSerializer.acceptableContentTypes = NSSet.setWithObject('application/json')
      }
      manager.requestSerializer.allowsCellularAccess = true;
      manager.securityPolicy = (policies.secured === true) ? policies.secure : policies.def;

      let heads = opts.headers;
      if (heads) {
        Object.keys(heads).forEach(key => manager.requestSerializer.setValueForHTTPHeaderField(heads[key] as any, key));
      }

      let dict = null;
      if (opts.body) {
        let cont = opts.body;
        if (Array.isArray(cont)) {
          dict = NSMutableArray.new();
          cont.forEach(function (item, idx) {
            dict.addObject(item);
          });
        } else if (isObject(cont)) {
          dict = NSMutableDictionary.new<string, any>();
          Object.keys(cont).forEach(key => dict.setValueForKey(cont[key] as any, key));
        }
      }

      manager.requestSerializer.timeoutInterval = opts.timeout ? opts.timeout : 10;

      let methods = {
        'GET': 'GETParametersSuccessFailure',
        'POST': 'POSTParametersSuccessFailure',
        'PUT': 'PUTParametersSuccessFailure',
        'DELETE': 'DELETEParametersSuccessFailure',
        'PATCH': 'PATCHParametersSuccessFailure',
        'HEAD': 'HEADParametersSuccessFailure',
      };
      manager[methods[opts.method]](opts.url, dict, function success(task: NSURLSessionDataTask, data: any) {
        AFSuccess(resolve, task, data);
      }, function failure(task, error) {
        AFFailure(resolve, reject, task, error);
      });

      // if (opts.method == 'GET') {
      // 	manager.GETParametersSuccessFailure(opts.url, dict, function success(task: NSURLSessionDataTask, data: any) {
      // 		AFSuccess(resolve, task, data)
      // 	}, function failure(task, error) {
      // 		AFFailure(resolve, reject, task, error)
      // 	})
      // } else if (opts.method == 'POST') {
      // 	manager.POSTParametersSuccessFailure(opts.url, dict, function success(task: NSURLSessionDataTask, data: any) {
      // 		AFSuccess(resolve, task, data)
      // 	}, function failure(task, error) {
      // 		AFFailure(resolve, reject, task, error)
      // 	})
      // }

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

  // {
  //     "content": {
  //         "code": "PreconditionFailed",
  //         "message": "!x-uuid"
  //     },
  //     "statusCode": 412,
  //     "headers": {
  //         "Content-Length": "49",
  //         "Server": "nginx/1.10.1",
  //         "Content-Type": "application/json",
  //         "Connection": "keep-alive",
  //         "Date": "Mon, 26 Dec 2016 03:31:42 GMT"
  //     }
  // }

}
