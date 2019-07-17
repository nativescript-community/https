# NativeScript-HTTPS
### The definitive way to hit HTTP based APIs in Nativescript.
Easily integrate the most reliable native networking libraries with the latest and greatest HTTPS security features.
#### A drop-in replacement for the [default http module](https://docs.nativescript.org/cookbook/http#get-response-status-code).

## Features
- Modern TLS & SSL security features
- Shared connection pooling reduces request latency
- Silently recovers from common connection problems
- Everything runs on a native background thread
- Transparent GZIP
- HTTP/2 support

## Libraries
iOS |  Android
-------- | ---------
[AFNetworking](https://github.com/AFNetworking/AFNetworking) | [okhttp3](https://github.com/square/okhttp)

## FAQ
> What the flip is SSL pinning and all this security mumbo jumbo?

[How to make your apps more secure with SSL pinning](https://infinum.co/the-capsized-eight/how-to-make-your-ios-apps-more-secure-with-ssl-pinning).

> Do I have to use SSL pinning?

**No.** This plugin works out of the box without any security configurations needed. Either way you'll still benefit from all the features listed above.

## Demo
```shell
git clone https://github.com/gethuman/nativescript-https
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

### Options
```typescript
export interface HttpsSSLPinningOptions {
	host: string
	certificate: string
	allowInvalidCertificates?: boolean
	validatesDomainName?: boolean
}
```
Option | Description
------------ | -------------
`host: string` | This must be the top level domain name eg `httpbin.org`.
`certificate: string` | The uri path to your `.cer` certificate file.
`allowInvalidCertificates?: boolean` | Default: `false`. This should **always** be `false` if you are using SSL pinning. Set this to `true` if you're using a self-signed certificate.
`validatesDomainName?: boolean` | Default: `true`. Determines if the domain name should be validated with your pinned certificate.

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
