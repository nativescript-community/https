# NativeScript-HTTPS
### The definitive way to hit HTTP based APIs in Nativescript.
Easily integrate the most reliable native networking libraries with the latest and greatest HTTPS security features.
#### A drop-in replacement for the [default http module](https://docs.nativescript.org/cookbook/http#get-response-status-code).

## Features
- Modern TLS security features
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
cd nativescript-https
npm run setup
npm run demo.ios
npm run demo.android
```

## Installation
#### Add `tns-platform-declarations` for Android and iOS to your `reference.d.ts`!
```typescript
/// <reference path="./node_modules/tns-platform-declarations/android.d.ts" />
/// <reference path="./node_modules/tns-platform-declarations/ios.d.ts" />
```
We also recommend adding `"skipLibCheck": true,` to your `tsconfig.json`.
More information on that can be found [here](https://github.com/NativeScript/NativeScript/tree/master/tns-platform-declarations).

```bash
tns plugin add nativescript-https
```

## Examples
### Hitting an API using `GET` method
```typescript
import * as Https from 'nativescript-https'
Https.request({
	url: 'https://wegossipapp.com/api/newuser',
	method: 'GET',
	headers: {
		'Authorization': 'Basic ZWx1c3VhcmlvOnlsYWNsYXZl',
		'x-uuid': 'aHR0cHdhdGNoOmY',
		'x-version': '4.2.0',
		'x-env': 'DEVELOPMENT',
	},
}).then(function(response) {
	console.log('Https.request response', response)
}).catch(function(error) {
	console.error('Https.request error', error)
})
```
### Hitting an API using `POST` method with body
```typescript
import * as Https from 'nativescript-https'
Https.request({
	url: 'https://wegossipapp.com/api/newuser',
	method: 'POST',
	headers: {
		'Authorization': 'Basic ZWx1c3VhcmlvOnlsYWNsYXZl',
		'x-uuid': 'aHR0cHdhdGNoOmY',
		'x-version': '4.2.0',
		'x-env': 'DEVELOPMENT',
	},
	content: JSON.stringify({
		'username': 'roblav96',
		'password': 'password',
	})
}).then(function(response) {
	console.log('Https.request response', response)
}).catch(function(error) {
	console.error('Https.request error', error)
})
```


















