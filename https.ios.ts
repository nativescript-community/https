// 

import * as application from 'application'
import { HttpRequestOptions, Headers, HttpResponse } from 'http'
import { isDefined, isNullOrUndefined } from 'utils/types'
import * as Https from './https.common'



interface Ipolicies {
	def: AFSecurityPolicy
	secured: boolean
	secure?: AFSecurityPolicy
}
let policies: Ipolicies = {
	def: AFSecurityPolicy.defaultPolicy(),
	secured: false,
}
policies.def.allowInvalidCertificates = true
policies.def.validatesDomainName = false

export function enableSSLPinning(options: Https.HttpsSSLPinningOptions) {
	// console.log('options', options)
	if (!policies.secure) {
		policies.secure = AFSecurityPolicy.policyWithPinningMode(AFSSLPinningMode.PublicKey)
		let allowInvalidCertificates = (isDefined(options.allowInvalidCertificates)) ? options.allowInvalidCertificates : false
		policies.secure.allowInvalidCertificates = allowInvalidCertificates
		let validatesDomainName = (isDefined(options.validatesDomainName)) ? options.validatesDomainName : true
		policies.secure.validatesDomainName = validatesDomainName
		let data = NSData.dataWithContentsOfFile(options.certificate)
		// console.log('data.description', data.description)
		// console.log('data.bytes', data.bytes)
		// console.log('data.base64Encoding()', data.base64Encoding())
		// console.log('data.length', data.length)
		policies.secure.pinnedCertificates = NSSet.setWithObject(data)
	}
	policies.secured = true
	console.log('nativescript-https > Enabled SSL pinning')
}
export function disableSSLPinning() {
	policies.secured = false
	console.log('nativescript-https > Disabled SSL pinning')
}
console.info('nativescript-https > Disabled SSL pinning by default')



function AFSuccess(resolve, task: NSURLSessionDataTask, dict: NSDictionary<string, any>) {
	let content = {}
	dict.enumerateKeysAndObjectsUsingBlock(function(k, v) {
		content[k] = v
	})
	resolve({ task, content })
}

function AFFailure(resolve, reject, task: NSURLSessionDataTask, error: NSError) {
	let data: NSData = error.userInfo.valueForKey(AFNetworkingOperationFailingURLResponseDataErrorKey)
	let body = NSString.alloc().initWithDataEncoding(data, NSUTF8StringEncoding)
	let content = {}
	try {
		content = JSON.parse(body.description)
	} catch (e) {
		content = error.description
		if (policies.secured == true) {
			// console.log('error.description', error.description)
			// console.log('error.userInfo.description', error.userInfo.description)
			content = 'nativescript-https > Invalid SSL certificate! ' + content
			return reject(content)
		}
	}
	resolve({ task, content })
}

export function request(opts: Https.HttpsRequestOptions): Promise<HttpResponse> {
	return new Promise(function(resolve, reject) {
		try {

			let manager = AFHTTPSessionManager.manager()
			manager.requestSerializer = AFJSONRequestSerializer.serializer()
			manager.requestSerializer.allowsCellularAccess = true
			manager.securityPolicy = (policies.secured == true) ? policies.secure : policies.def

			let heads = opts.headers
			Object.keys(heads).forEach(function(key) {
				manager.requestSerializer.setValueForHTTPHeaderField(heads[key] as any, key)
			})

			if (opts.method == 'GET') {
				manager.GETParametersSuccessFailure(opts.url, null, function success(task: NSURLSessionDataTask, dict: NSDictionary<string, any>) {
					AFSuccess(resolve, task, dict)
				}, function failure(task, error) {
					AFFailure(resolve, reject, task, error)
				})
			} else if (opts.method == 'POST') {
				let cont = JSON.parse(opts.content as any)
				let dict = NSMutableDictionary.new()
				Object.keys(cont).forEach(function(key) {
					dict.setValueForKey(cont[key] as any, key)
				})
				manager.POSTParametersSuccessFailure(opts.url, dict, function success(task: NSURLSessionDataTask, dict: NSDictionary<string, any>) {
					AFSuccess(resolve, task, dict)
				}, function failure(task, error) {
					AFFailure(resolve, reject, task, error)
				})
			}

		} catch (error) {
			reject(error)
		}

	}).then(function(AFResponse: {
		task: NSURLSessionDataTask
		content: any
	}) {

		let response = AFResponse.task.response as NSHTTPURLResponse
		if (isNullOrUndefined(response)) {
			return Promise.reject(AFResponse.content)
		}
		let content = AFResponse.content
		let statusCode = response.statusCode
		let headers = {}
		let dict = response.allHeaderFields
		dict.enumerateKeysAndObjectsUsingBlock(function(k, v) {
			headers[k] = v
		})

		return Promise.resolve({ content, statusCode, headers })

	})

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



export * from './https.common'












