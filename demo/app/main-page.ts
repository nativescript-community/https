import * as Observable from 'tns-core-modules/data/observable';
import * as Page from 'tns-core-modules/ui/page';
import * as fs from 'tns-core-modules/file-system';
import * as dialogs from 'tns-core-modules/ui/dialogs';
import * as Https from 'nativescript-https';

export function onNavigatingTo(args: Page.NavigatedData) {
  let page = args.object as Page.Page;
  page.bindingContext = Observable.fromObject({enabled: false});
}

function getRequest(url: string, allowLargeResponse = false) {
  Https.request(
      {
        url,
        method: 'GET',
        allowLargeResponse
      })
      .then(response => console.log('Https.request response', response))
      .catch(error => {
        console.error('Https.request error', error);
        dialogs.alert(error);
      });
}

function postRequest(url: string, body: any) {
  Https.request(
      {
        url,
        method: 'POST',
        body
      })
      .then(response => console.log('Https.request response', response))
      .catch(error => {
        console.error('Https.request error', error);
        dialogs.alert(error);
      });
}

export function postHttpbin() {
  postRequest('https://httpbin.org/post', {"foo": "bar", "baz": undefined, "plaz": null});
}

export function getHttpbin() {
  getRequest('https://httpbin.org/get');
}

export function getHttpbinLargeResponse() {
  getRequest('https://httpbin.org/bytes/100000', true);
}

export function getMockbin() {
  getRequest('https://mockbin.com/request');
}

export function enableSSLPinning(args: Observable.EventData) {
  let dir = fs.knownFolders.currentApp().getFolder('assets');
  let certificate = dir.getFile('httpbin.org.cer').path;
  Https.enableSSLPinning({host: 'httpbin.org', certificate});
  let context = (args.object as Page.View).bindingContext as Observable.Observable;
  context.set('enabled', true);
}

export function disableSSLPinning(args: Observable.EventData) {
  Https.disableSSLPinning();
  let context = (args.object as Page.View).bindingContext as Observable.Observable;
  context.set('enabled', false);
}


