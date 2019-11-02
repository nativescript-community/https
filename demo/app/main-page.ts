import * as Https from 'nativescript-https';
import * as Observable from 'tns-core-modules/data/observable';
import * as fs from 'tns-core-modules/file-system';
import * as dialogs from 'tns-core-modules/ui/dialogs';
import * as Page from 'tns-core-modules/ui/page';

export function onNavigatingTo(args: Page.NavigatedData) {
  let page = args.object as Page.Page;
  page.bindingContext = Observable.fromObject({enabled: false});
}

function getRequest(url: string, allowLargeResponse = false) {
  Https.request(
      {
        url,
        method: 'GET',
        timeout: 1,
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
  Https.enableSSLPinning({host: 'httpbin.org', commonName: "httpbin.org", certificate});
  console.log('enabled');
}

export function enableSSLPinningExpired(args: Observable.EventData) {
  let dir = fs.knownFolders.currentApp().getFolder('assets');
  let certificate = dir.getFile('httpbin.org.expired.cer').path;
  Https.enableSSLPinning({host: 'httpbin.org', certificate});
  console.log('enabled');
}

export function disableSSLPinning(args: Observable.EventData) {
  Https.disableSSLPinning();
  console.log('disabled');
}


