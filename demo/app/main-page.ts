
import * as Observable from 'tns-core-modules/data/observable'
import * as Page from 'tns-core-modules/ui/page'
import * as fs from 'tns-core-modules/file-system'
import * as dialogs from 'tns-core-modules/ui/dialogs'
import * as Https from 'nativescript-https'



export function onNavigatingTo(args: Page.NavigatedData) {
	let page = args.object as Page.Page
	page.bindingContext = Observable.fromObject({ enabled: false })
}

function getRequest(url: string) {
	Https.request({
		url, method: 'GET',
	}).then(function(response) {
		console.log('Https.request response', response)
	}).catch(function(error) {
		console.error('Https.request error', error)
		dialogs.alert(error)
	})
}

export function getHttpbin() { getRequest('https://httpbin.org/get') }
export function getMockbin() { getRequest('https://mockbin.com/request') }

export function enableSSLPinning(args: Observable.EventData) {
	let dir = fs.knownFolders.currentApp().getFolder('assets')
	let certificate = dir.getFile('httpbin.org.cer').path
	Https.enableSSLPinning({ host: 'httpbin.org', certificate })
	let context = (args.object as Page.View).bindingContext as Observable.Observable
	context.set('enabled', true)
}

export function disableSSLPinning(args: Observable.EventData) {
	Https.disableSSLPinning()
	let context = (args.object as Page.View).bindingContext as Observable.Observable
	context.set('enabled', false)
}


