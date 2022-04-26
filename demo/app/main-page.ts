import * as Https from '@nativescript-community/https';
import * as Observable from '@nativescript/core/data/observable';
import * as fs from '@nativescript/core/file-system';
import * as dialogs from '@nativescript/core/ui/dialogs';
import * as Page from '@nativescript/core/ui/page';

const folder = fs.knownFolders.temp().getFolder('cache');
const diskLocation = folder.path;
const cacheSize = 10 * 1024 * 1024;
Https.setCache({
    // forceCache: true,
    diskLocation,
    diskSize: cacheSize,
    memorySize: cacheSize
});

let page;
let viewModel;
export function pageLoaded(args: Page.NavigatedData) {
    page = args.object as Page.Page;
    viewModel = Observable.fromObject({
        enabled: false,
        progress: 0,
        currentRequest: null,
    });
    page.bindingContext = viewModel;
}

function createRequest(url: string, options?: Partial<Https.HttpsRequestOptions>) {
    return Https.createRequest({
        url,
        method: 'GET',
        timeout: 1,
        ...options,
    });
}

function onError(error) {
    console.error('Https.request error', error, error.stack);
    dialogs.alert(error.toString());
    page.bindingContext.currentRequest = null;
    page.bindingContext.progress = 0;
    return Promise.reject(error);
}
function getRequest(url: string, options?: Partial<Https.HttpsRequestOptions>) {
    return Https.request({
        url,
        method: 'GET',
        timeout: 1,
        ...options,
    })
        .then((response) => {
            page.bindingContext.currentRequest = null;
            page.bindingContext.progress = 0;
            console.log('Https.request response', response, response.content.toString());
            return response;
        })
        .catch(onError);
}

function postRequest(url: string, options?: Partial<Https.HttpsRequestOptions>) {
    return Https.request({
        url,
        method: 'POST',
        ...options,
    })
        .then((response) => console.log('Https.request response', response))
        .catch((error) => {
            console.error('Https.request error', error);
            dialogs.alert(error);
        });
}

export function postHttpbin() {
    postRequest('https://httpbin.org/post', {
        body: { foo: 'bar', baz: undefined, plaz: null },
    });
}

export function postHttpbinWithUTF8() {
    Https.request({
        url: 'https://httpbin.org/post',
        method: 'POST',
        body: { foo: 'bar', baz: undefined, plaz: null },
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'X-testing': 'ok',
        },
    }).catch((error) => {
        console.error('Https.request error', error);
        dialogs.alert(error);
    });
}

export function getHttpbin() {
    getRequest('https://httpbin.org/get', {
        headers: {
            // 'Cache-Control': 'public, only-if-cached, max-stale=' +(60 * 60 * 24 * 7),
            'Cache-Control': 'max-age=50000',
        }
    });
}

export function cancelCurrentRequest() {
    if (page.bindingContext.currentRequest) {
        page.bindingContext.currentRequest.cancel();
    }
}
export function getBigFile() {
    const request = createRequest('http://ipv4.download.thinkbroadband.com/200MB.zip', {
        onProgress: (current, total) => {
            page.bindingContext.progress = (current / total) * 100;
        },
    });
    page.bindingContext.currentRequest = request;

    return new Promise<any>((resolve, reject) => {
        request.run(resolve, reject);
    })
        .then((response) => {
            console.log('did get response');
            const dir = fs.knownFolders.temp().getFile('200MB.zip');
            return (response.content as Https.HttpsResponseLegacy).toFile(dir.path);
            // console.log("did get response done");
        })
        .then(() => {
            page.bindingContext.currentPromise = null;
            console.log('did get response done');
        })
        .catch(onError);
}

export function getHttpbinLargeResponse() {
    getRequest('https://httpbin.org/bytes/100000');
}

export function getMockbin() {
    getRequest('https://mockbin.com/request');
}

export function get404() {
    getRequest('https://mockbin.com/reque2st');
}

export function enableSSLPinning(args: Observable.EventData) {
    const dir = fs.knownFolders.currentApp().getFolder('assets');
    const certificate = dir.getFile('httpbin.org.cer').path;
    Https.enableSSLPinning({
        host: 'httpbin.org',
        commonName: 'httpbin.org',
        certificate,
    });
    console.log('enabled');
}

export function enableSSLPinningExpired(args: Observable.EventData) {
    const dir = fs.knownFolders.currentApp().getFolder('assets');
    const certificate = dir.getFile('httpbin.org.expired.cer').path;
    Https.enableSSLPinning({ host: 'httpbin.org', certificate });
    console.log('enabled');
}

export function disableSSLPinning(args: Observable.EventData) {
    Https.disableSSLPinning();
    console.log('disabled');
}
