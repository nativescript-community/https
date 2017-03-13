"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("utils/types");
var policies = {
    def: AFSecurityPolicy.defaultPolicy(),
    secured: false,
};
policies.def.allowInvalidCertificates = true;
policies.def.validatesDomainName = false;
function enableSSLPinning(options) {
    if (!policies.secure) {
        policies.secure = AFSecurityPolicy.policyWithPinningMode(1);
        var allowInvalidCertificates = (types_1.isDefined(options.allowInvalidCertificates)) ? options.allowInvalidCertificates : false;
        policies.secure.allowInvalidCertificates = allowInvalidCertificates;
        var validatesDomainName = (types_1.isDefined(options.validatesDomainName)) ? options.validatesDomainName : true;
        policies.secure.validatesDomainName = validatesDomainName;
        var data = NSData.dataWithContentsOfFile(options.certificate);
        policies.secure.pinnedCertificates = NSSet.setWithObject(data);
    }
    policies.secured = true;
    console.log('nativescript-https > Enabled SSL pinning');
}
exports.enableSSLPinning = enableSSLPinning;
function disableSSLPinning() {
    policies.secured = false;
    console.log('nativescript-https > Disabled SSL pinning');
}
exports.disableSSLPinning = disableSSLPinning;
console.info('nativescript-https > Disabled SSL pinning by default');
function AFSuccess(resolve, task, data) {
    var content;
    if (data && data.class) {
        if (data.enumerateKeysAndObjectsUsingBlock || data.class().name == 'NSArray') {
            var serial = NSJSONSerialization.dataWithJSONObjectOptionsError(data, 1);
            content = NSString.alloc().initWithDataEncoding(serial, NSUTF8StringEncoding).toString();
        }
        else if (data.class().name == 'NSData') {
            content = NSString.alloc().initWithDataEncoding(data, NSASCIIStringEncoding).toString();
        }
        else {
            content = data;
        }
        try {
            content = JSON.parse(content);
        }
        catch (e) { }
    }
    else {
        content = data;
    }
    resolve({ task: task, content: content });
}
function AFFailure(resolve, reject, task, error) {
    var data = error.userInfo.valueForKey(AFNetworkingOperationFailingURLResponseDataErrorKey);
    var body = NSString.alloc().initWithDataEncoding(data, NSUTF8StringEncoding).toString();
    try {
        body = JSON.parse(body);
    }
    catch (e) { }
    var content = {
        body: body,
        description: error.description,
        reason: error.localizedDescription,
        url: error.userInfo.objectForKey('NSErrorFailingURLKey').description
    };
    if (policies.secured == true) {
        content.description = 'nativescript-https > Invalid SSL certificate! ' + content.description;
    }
    var reason = error.localizedDescription;
    resolve({ task: task, content: content, reason: reason });
}
function request(opts) {
    return new Promise(function (resolve, reject) {
        try {
            var manager_1 = AFHTTPSessionManager.manager();
            if (opts.headers && opts.headers['Content-Type'] == 'application/json') {
                manager_1.requestSerializer = AFJSONRequestSerializer.serializer();
                manager_1.responseSerializer = AFJSONResponseSerializer.serializerWithReadingOptions(4);
            }
            else {
                manager_1.requestSerializer = AFHTTPRequestSerializer.serializer();
                manager_1.responseSerializer = AFHTTPResponseSerializer.serializer();
            }
            manager_1.requestSerializer.allowsCellularAccess = true;
            manager_1.securityPolicy = (policies.secured == true) ? policies.secure : policies.def;
            manager_1.requestSerializer.timeoutInterval = 10;
            var heads_1 = opts.headers;
            if (heads_1) {
                Object.keys(heads_1).forEach(function (key) {
                    manager_1.requestSerializer.setValueForHTTPHeaderField(heads_1[key], key);
                });
            }
            var dict_1 = null;
            if (opts.body) {
                var cont_1 = opts.body;
                if (types_1.isObject(cont_1)) {
                    dict_1 = NSMutableDictionary.new();
                    Object.keys(cont_1).forEach(function (key) {
                        dict_1.setValueForKey(cont_1[key], key);
                    });
                }
            }
            var methods = {
                'GET': 'GETParametersSuccessFailure',
                'POST': 'POSTParametersSuccessFailure',
                'PUT': 'PUTParametersSuccessFailure',
                'DELETE': 'DELETEParametersSuccessFailure',
                'PATCH': 'PATCHParametersSuccessFailure',
                'HEAD': 'HEADParametersSuccessFailure',
            };
            manager_1[methods[opts.method]](opts.url, dict_1, function success(task, data) {
                AFSuccess(resolve, task, data);
            }, function failure(task, error) {
                AFFailure(resolve, reject, task, error);
            });
        }
        catch (error) {
            reject(error);
        }
    }).then(function (AFResponse) {
        var sendi = {
            content: AFResponse.content,
            headers: {},
        };
        var response = AFResponse.task.response;
        if (!types_1.isNullOrUndefined(response)) {
            sendi.statusCode = response.statusCode;
            var dict = response.allHeaderFields;
            dict.enumerateKeysAndObjectsUsingBlock(function (k, v) {
                sendi.headers[k] = v;
            });
        }
        if (AFResponse.reason) {
            sendi.reason = AFResponse.reason;
        }
        return Promise.resolve(sendi);
    });
}
exports.request = request;
//# sourceMappingURL=https.ios.js.map