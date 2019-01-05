
import * as application from 'application'
import { Observable, EventData } from 'data/observable'
import { Page, NavigatedData } from 'ui/page'
import { View } from 'ui/core/view'
import { File, Folder, knownFolders, path } from 'file-system'
import * as Https from 'nativescript-https'



export function onLoaded(args: EventData) {
	let page: Page = <Page>args.object
	page.bindingContext = new MainPage()
}

export function onUnloaded(args: EventData) {
	let page: Page = <Page>args.object
}

class MainPage extends Observable {

	constructor() {
		super()
	}

}

export function testit(args: EventData) {
	let view = args.object as View
	let page = view.page as Page
	let context = page.bindingContext as MainPage

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

export function enableSSL(args: EventData) {
	let dir = knownFolders.currentApp().getFolder('assets')
	let certificate = dir.getFile('www.nativescript.org.cer').path
	Https.enableSSLPinning({ host: 'www.nativescript.org', certificate })
}

export function disableSSL(args: EventData) {
	Https.disableSSLPinning()
}


