// 


import * as application from 'application'
import { HttpRequestOptions, Headers, HttpResponse } from 'http'
import { isDefined, isNullOrUndefined } from 'utils/types'
import * as Https from './https.common'



// declare var java: any
// declare var javax: any
// java.security.cert.Certificate as any
// declare module java {
// 	export module security {
// 		export module cert {
// 			export interface Certificate { }
// 		}
// 	}
// 	export module io {
// 		export interface FileInputStream { }
// 	}
// }



interface Ipeer {
	enabled: boolean
	allowInvalidCertificates: boolean
	validatesDomainName: boolean
	host?: string
	certificate?: string
	x509Certificate?: java.security.cert.Certificate
}
let peer: Ipeer = {
	enabled: false,
	allowInvalidCertificates: false,
	validatesDomainName: true,
}

export function enableSSLPinning(options: Https.HttpsSSLPinningOptions) {
	// console.log('options', options)
	if (!peer.host && !peer.certificate) {
		let certificate: string
		let inputStream: java.io.FileInputStream
		try {
			let file = new java.io.File(options.certificate)
			inputStream = new java.io.FileInputStream(file)
			let x509Certificate = java.security.cert.CertificateFactory.getInstance('X509').generateCertificate(inputStream)
			peer.x509Certificate = x509Certificate
			certificate = okhttp3.CertificatePinner.pin(x509Certificate)
			inputStream.close()
		} catch (error) {
			try {
				if (inputStream) {
					inputStream.close()
				}
			} catch (e) { }
			console.error('nativescript-https > enableSSLPinning error', error)
			return
		}
		peer.host = options.host
		peer.certificate = certificate
		if (options.allowInvalidCertificates == true) {
			peer.allowInvalidCertificates = true
		}
		if (options.validatesDomainName == false) {
			peer.validatesDomainName = false
		}
	}
	peer.enabled = true
	getClient(true)
	console.log('nativescript-https > Enabled SSL pinning')
}
export function disableSSLPinning() {
	peer.enabled = false
	getClient(true)
	console.log('nativescript-https > Disabled SSL pinning')
}
console.info('nativescript-https > Disabled SSL pinning by default')



let Client: okhttp3.OkHttpClient
function getClient(reload: boolean = false): okhttp3.OkHttpClient {
	// if (!Client) {
	// 	Client = new okhttp3.OkHttpClient()
	// }
	// if (Client) {
	// 	Client.connectionPool().evictAll()
	// 	Client = null
	// }
	if (Client && reload == false) {
		return Client
	}

	let client = new okhttp3.OkHttpClient.Builder()
	if (peer.enabled == true) {
		// console.log('peer', peer)
		if (peer.host || peer.certificate) {
			let spec = okhttp3.ConnectionSpec.MODERN_TLS
			client.connectionSpecs(java.util.Collections.singletonList(spec))

			let pinner = new okhttp3.CertificatePinner.Builder()
			pinner.add(peer.host, [peer.certificate])
			client.certificatePinner(pinner.build())

			if (peer.allowInvalidCertificates == false) {
				try {
					let x509Certificate = peer.x509Certificate
					let keyStore = java.security.KeyStore.getInstance(
						java.security.KeyStore.getDefaultType()
					)
					keyStore.load(null, null)
					// keyStore.setCertificateEntry(peer.host, x509Certificate)
					keyStore.setCertificateEntry('CA', x509Certificate)

					// let keyManagerFactory = javax.net.ssl.KeyManagerFactory.getInstance(
					// 	javax.net.ssl.KeyManagerFactory.getDefaultAlgorithm()
					// )
					let keyManagerFactory = javax.net.ssl.KeyManagerFactory.getInstance('X509')
					keyManagerFactory.init(keyStore, null)
					let keyManagers = keyManagerFactory.getKeyManagers()

					let trustManagerFactory = javax.net.ssl.TrustManagerFactory.getInstance(
						javax.net.ssl.TrustManagerFactory.getDefaultAlgorithm()
					)
					trustManagerFactory.init(keyStore)

					let sslContext = javax.net.ssl.SSLContext.getInstance('TLS')
					sslContext.init(keyManagers, trustManagerFactory.getTrustManagers(), new java.security.SecureRandom())
					client.sslSocketFactory(sslContext.getSocketFactory())

				} catch (error) {
					console.error('nativescript-https > client.allowInvalidCertificates error', error)
				}
			}

			if (peer.validatesDomainName == true) {
				try {
					client.hostnameVerifier(new javax.net.ssl.HostnameVerifier({
						verify: function(hostname: string, session: javax.net.ssl.ISSLSession): boolean {
							let pp = session.getPeerPrincipal().getName()
							let hv = javax.net.ssl.HttpsURLConnection.getDefaultHostnameVerifier()
							return (
								hv.verify(peer.host, session) &&
								peer.host == hostname &&
								peer.host == session.getPeerHost() &&
								pp.indexOf(peer.host) != -1
							)
						},
					}))
				} catch (error) {
					console.error('nativescript-https > client.validatesDomainName error', error)
				}
			}

		} else {
			console.warn('nativescript-https > Undefined host or certificate. SSL pinning NOT working!!!')
		}
	}
	Client = client.build()
	return Client
}

// We have to allow networking on the main thread because larger responses will crash the app with an NetworkOnMainThreadException.
// Note that it would be better to offload it to an AsyncTask but that has to run natively to work properly.
// No time for that now, and actually it only concerns the '.string()' call of response.body().string() below.
const strictModeThreadPolicyPermitAll = new android.os.StrictMode.ThreadPolicy.Builder().permitAll().build()

export function request(opts: Https.HttpsRequestOptions): Promise<Https.HttpsResponse> {
	return new Promise(function(resolve, reject) {
		try {
			let client = getClient()

			let request = new okhttp3.Request.Builder()
			request.url(opts.url)

			if (opts.headers) {
				Object.keys(opts.headers).forEach(function(key) {
					request.addHeader(key, opts.headers[key] as any)
				})
			}

			let methods = {
				'GET': 'get',
				'HEAD': 'head',

				'DELETE': 'delete',

				'POST': 'post',
				'PUT': 'put',
				'PATCH': 'patch',
			}
			if (
				(['GET', 'HEAD'].indexOf(opts.method) != -1)
				||
				(opts.method == 'DELETE' && !isDefined(opts.body))
			) {
				request[methods[opts.method]]()
			} else {
				let type = <string>opts.headers['Content-Type'] || 'application/json'
				let body = <any>opts.body || {}
				try {
					body = JSON.stringify(body)
				} catch (e) { }
				request[methods[opts.method]](okhttp3.RequestBody.create(
					okhttp3.MediaType.parse(type),
					body
				))
			}

			// enable our policy
			android.os.StrictMode.setThreadPolicy(strictModeThreadPolicyPermitAll)

			client.newCall(request.build()).enqueue(new okhttp3.Callback({
				onResponse: function(task, response) {
					// console.log('onResponse')
					// console.keys('response', response)
					// console.log('onResponse > response.isSuccessful()', response.isSuccessful())

					// let body = response.body()//.bytes()
					// console.keys('body', body)
					// console.log('body.contentType()', body.contentType())
					// console.log('body.contentType().toString()', body.contentType().toString())
					// console.log('body.bytes()', body.bytes())
					// console.dump('wtf', wtf)
					// console.log('opts.url', opts.url)
					// console.log('body.string()', body.string())

					// let content: any = response.body().string()
					// console.log('content', content)
					// try {
					// 	content = JSON.parse(response.body().string())
					// } catch (error) {
					// 	return reject(error)
					// }

					let content = response.body().string()
					try {
						content = JSON.parse(content)
					} catch (e) { }

					let statusCode = response.code()

					let headers = {}
					let heads: okhttp3.Headers = response.headers()
					let i: number, len: number = heads.size()
					for (i = 0; i < len; i++) {
						let key = heads.name(i)
						let value = heads.value(i)
						headers[key] = value
					}

					resolve({ content, statusCode, headers })

				},
				onFailure: function(task, error) {
					reject(error)
				},
			}))

		} catch (error) {
			reject(error)
		}

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












