# NativeScript-HTTPS

[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][npm-url]
[![TotalDownloads][total-downloads-image]][npm-url]
[![Twitter Follow][twitter-image]][twitter-url]

[build-status]:https://travis-ci.org/EddyVerbruggen/nativescript-https.svg?branch=master
[build-url]:https://travis-ci.org/EddyVerbruggen/nativescript-https
[npm-image]:http://img.shields.io/npm/v/nativescript-https.svg
[npm-url]:https://npmjs.org/package/nativescript-https
[downloads-image]:http://img.shields.io/npm/dm/nativescript-https.svg
[total-downloads-image]:http://img.shields.io/npm/dt/nativescript-https.svg?label=total%20downloads
[twitter-image]:https://img.shields.io/twitter/follow/eddyverbruggen.svg?style=social&label=Follow%20me
[twitter-url]:https://twitter.com/eddyverbruggen

### The definitive way to hit HTTP based APIs in Nativescript.
Easily integrate the most reliable native networking libraries with the latest and greatest HTTPS security features.

> Plugin version 2.0.0 bumps `AFNetworking` on iOS to [4.0.0](https://github.com/AFNetworking/AFNetworking/releases/tag/4.0.0) which no longer relies on `UIWebView`. Make sure to run `pod repo update` to get the latest `AFNetworking` pod on your development machine.

#### A drop-in replacement for the [default http module](https://docs.nativescript.org/cookbook/http#get-response-status-code).

## Features
- Modern TLS & SSL security features
- Shared connection pooling reduces request latency
- Silently recovers from common connection problems
- Everything runs on a native background thread
- Transparent GZIP
- HTTP/2 support
- Multiform part
- Cache
- Basic Cookie support

## FAQ
> What the flip is SSL pinning and all this security mumbo jumbo?

[How to make your apps more secure with SSL pinning](https://infinum.co/the-capsized-eight/how-to-make-your-ios-apps-more-secure-with-ssl-pinning).

> Do I have to use SSL pinning?

**No.** This plugin works out of the box without any security configurations needed. Either way you'll still benefit from all the features listed above.

## Demo
```shell
git clone https://github.com/EddyVerbruggen/nativescript-https
cd nativescript-https/src
npm run demo.ios
npm run demo.android
```

## Installation
#### Add `tns-platform-declarations` for Android and iOS to your `references.d.ts`!
```typescript
/// <reference path="./node_modules/tns-platform-declarations/android.d.ts" />
/// <reference path="./node_modules/tns-platform-declarations/ios.d.ts" />
```
We also recommend adding `"skipLibCheck": true,` to your `tsconfig.json`.
More information on that can be found [here](https://github.com/NativeScript/NativeScript/tree/master/tns-platform-declarations).

Install the plugin:
```bash
tns plugin add nativescript-https
```

## Examples
### Hitting an API using `GET` method
```typescript
import * as Https from 'nativescript-https'
Https.request({
	url: 'https://httpbin.org/get',
	method: 'GET',
	timeout: 30 // seconds (default 10)
}).then(function(response) {
	console.log('Https.request response', response)
}).catch(function(error) {
	console.error('Https.request error', error)
})
```

## Configuration
### Installing your SSL certificate
Create a folder called `assets` in your projects `app` folder like so `<project>/app/assets`. Using chrome, go to the URL where the SSL certificate resides. View the details then drag and drop the certificate image into the `assets` folder.

![Installing your SSL certificate](http://i.imgur.com/hn4duT3.gif)

#### Enabling SSL pinning
```typescript
import { knownFolders } from 'file-system'
import * as Https from 'nativescript-https'
let dir = knownFolders.currentApp().getFolder('assets')
let certificate = dir.getFile('httpbin.org.cer').path
Https.enableSSLPinning({ host: 'httpbin.org', certificate })
```
Once you've enabled SSL pinning you **CAN NOT** re-enable with a different `host` or `certificate` file.

#### Disabling SSL pinning
```typescript
import * as Https from 'nativescript-https'
Https.disableSSLPinning()
```
All requests after calling this method will no longer utilize SSL pinning until it is re-enabled once again.


### Cookie

By default basic Cookie support is enabled to work like in {N} `http` module.
In the future more options will be added

### Enabling Cache

```typescript
import { knownFolders, path } from '@nativescript/core/file-system';
import * as Https from 'nativescript-https'
Https.setCache({
    diskLocation: path.join(knownFolders.documents().path, 'httpcache'),
    diskSize: 10 * 1024 * 1024 // 10 MiB
});

/// later on when calling your request you can use the cachePolicy option
```

### Multipart form data

If you set the `Content-Type` header to `"multipart/form-data"` the request body will be evaluated as a multipart form data. Each body parameter is expected to be in this format:
```typescript
{
	data: any
    parameterName: string,
    fileName?: string
    contentType?: string
}

```
if `fileName` and `contentType` are set then data is expected to be either a `NSData` on iOS or a `native.Array<number>` on Android.

### Options
```typescript
export interface HttpsSSLPinningOptions {
	host: string
	certificate: string
	allowInvalidCertificates?: boolean
	validatesDomainName?: boolean
	commonName?: string
}
import { HttpRequestOptions } from 'tns-core-modules/http';
export interface HttpsRequestOptions extends HTTPOptions{
	useLegacy?: boolean
	cachePolicy?: 'noCache' | 'onlyCache' | 'ignoreCache'
	onProgress?: (current: number, total: number) => void
}
```
SSLPinning Option | Description
------------ | -------------
`host: string` | This must be the request domain name eg `sales.company.org`.
`commonName?: string` | Default: options.host, set if certificate CN is different from the host eg `*.company.org` (Android specific)
`certificate: string` | The uri path to your `.cer` certificate file.
`allowInvalidCertificates?: boolean` | Default: `false`. This should **always** be `false` if you are using SSL pinning. Set this to `true` if you're using a self-signed certificate.
`validatesDomainName?: boolean` | Default: `true`. Determines if the domain name should be validated with your pinned certificate.

Requests Option | Description
------------ | -------------
`useLegacy?: boolean` | Default: `false`. [IOS only] set to true in order to get the response data (when status >= 300)in the `content` directly instead of `response.body.content`.
`cachePolicy?: 'noCache' | 'onlyCache' | 'ignoreCache'` | Set the cache policy to use with that request. This only works with GET requests for now.
`onProgress?: (current: number, total: number) => void` | [IOS only] Set the progress callback.

## Webpack / bundling
Since you're probably shipping a certificate with your app (like [our demo does](https://github.com/EddyVerbruggen/nativescript-https/tree/master/demo/app/assets)),
make sure it's bundled by Webpack as well. You can do this by [adding the certificate(s) with the `CopyWebpackPlugin`](https://github.com/EddyVerbruggen/nativescript-https/blob/a5c841c0af7ff6d9994fa23f7fba0df0514c58f1/demo/webpack.config.js#L240).

## `iOS` Troubleshooting
> ### Please educate yourself on iOS's [App Transport Security](https://github.com/codepath/ios_guides/wiki/App-Transport-Security) before starting beef!

If you try and hit an `https` route without adding it to App Transport Security's whitelist it will not work!
You can bypass this behavior by adding the following to your projects `Info.plist`:
```xml
<key>NSAppTransportSecurity</key>
<dict>
    <key>NSAllowsArbitraryLoads</key>
    <true/>
</dict>
```
> This plugin **does not** add `NSAllowsArbitraryLoads` to your projects `Info.plist` for you.

## `Android` troubleshooting
If you app crashes with a message that it's doing too much networkin on the main thread,
then pass the option `allowLargeResponse` with value `true` to the `request` function.

# Thanks
Who | Why
------------ | -------------
[Robert Laverty](https://github.com/roblav96) | For creating and maintaining this plugin for a long time, before transfering it to me, with the help of Jeff Whelpley of [GetHuman](https://github.com/gethuman).
[AFNetworking](https://github.com/AFNetworking) | [AFNetworking](https://github.com/AFNetworking/AFNetworking) A delightful networking framework for iOS, OS X, watchOS, and tvOS.
[Square](http://square.github.io/) | [okhttp](https://github.com/square/okhttp) An HTTP+HTTP/2 client for Android and Java applications.
