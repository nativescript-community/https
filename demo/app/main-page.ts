
import * as fs from 'file-system'
import * as Https from 'nativescript-https'



export function getRequest() {
	Https.request({
		url: 'https://httpbin.org/get',
		method: 'GET',
		headers: {
			'x-version': '4.2.0',
			'x-env': 'DEVELOPMENT',
		},
	}).then(function(response) {
		console.log('Https.request response', response)
	}).catch(function(error) {
		console.error('Https.request error', error)
	})
}

export function enableSSL() {
	let dir = fs.knownFolders.currentApp().getFolder('assets')
	let certificate = dir.getFile('www.nativescript.org.cer').path
	Https.enableSSLPinning({ host: 'www.nativescript.org', certificate })
}

export function disableSSL() {
	Https.disableSSLPinning()
}


