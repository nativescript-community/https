<!-- ⚠️ This README has been generated from the file(s) "blueprint.md" ⚠️--><!-- ⚠️ This README has been generated from the file(s) "blueprint.md" ⚠️-->
<!--  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      DO NOT EDIT THIS READEME DIRECTLY! Edit "bluesprint.md" instead.
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! -->
<h1 align="center">@nativescript-community/https</h1>
<p align="center">
		<a href="https://npmcharts.com/compare/@nativescript-community/https?minimal=true"><img alt="Downloads per month" src="https://img.shields.io/npm/dm/@nativescript-community/https.svg" height="20"/></a>
<a href="https://www.npmjs.com/package/@nativescript-community/https"><img alt="NPM Version" src="https://img.shields.io/npm/v/@nativescript-community/https.svg" height="20"/></a>
	</p>

<p align="center">
  <b>Nativescript plugin for https requests</b></br>
  <sub><sub>
</p>

<br />



[](#table-of-contents)


[](#table-of-contents)

## Table of Contents

	* [Installation](#installation)
			* [A drop-in replacement for the [default http module](https://docs.nativescript.org/cookbook/http).](#a-drop-in-replacement-for-the-default-http-modulehttpsdocsnativescriptorgcookbookhttp)
	* [Features](#features)
	* [FAQ](#faq)
	* [Installation](#installation-1)
	* [Examples](#examples)
		* [Hitting an API using `GET` method](#hitting-an-api-using-get-method)
	* [Configuration](#configuration)
		* [Installing your SSL certificate](#installing-your-ssl-certificate)
			* [Enabling SSL pinning](#enabling-ssl-pinning)
			* [Disabling SSL pinning](#disabling-ssl-pinning)
		* [useLegacy](#uselegacy)
		* [Cookie](#cookie)
		* [Enabling Cache](#enabling-cache)
		* [Multipart form data](#multipart-form-data)
		* [Options](#options)
	* [Webpack / bundling](#webpack--bundling)
	* [`iOS` Troubleshooting](#ios-troubleshooting)
	* [`Android` troubleshooting](#android-troubleshooting)
* [Thanks](#thanks)
		* [Examples:](#examples-1)
	* [Demos and Development](#demos-and-development)
		* [Repo Setup](#repo-setup)
		* [Build](#build)
		* [Demos](#demos)
	* [Contributing](#contributing)
		* [Update repo ](#update-repo-)
		* [Update readme ](#update-readme-)
		* [Update doc ](#update-doc-)
		* [Publish](#publish)
		* [modifying submodules](#modifying-submodules)
	* [Questions](#questions)


[](#installation)


[](#installation)

## Installation
Run the following command from the root of your project:

`ns plugin add @nativescript-community/https`

Easily integrate the most reliable native networking libraries with the latest and greatest HTTPS security features.

> Android: version 4.x using okhttp 4.x changing minSDKVersion to 21! If lower needed stick to 3.x

> Plugin version 2.0.0 bumps `AFNetworking` on iOS to [4.0.0](https://github.com/AFNetworking/AFNetworking/releases/tag/4.0.0) which no longer relies on `UIWebView`. Make sure to run `pod repo update` to get the latest `AFNetworking` pod on your development machine.

#### A drop-in replacement for the [default http module](https://docs.nativescript.org/cookbook/http).


[](#features)


[](#features)

## Features

-   Modern TLS & SSL security features
-   Shared connection pooling reduces request latency
-   Silently recovers from common connection problems
-   Everything runs on a native background thread
-   Transparent GZIP
-   HTTP/2 support
-   Multiform part
-   Cache
-   Basic Cookie support


[](#faq)


[](#faq)

## FAQ

> What the flip is SSL pinning and all this security mumbo jumbo?

[How to make your apps more secure with SSL pinning](https://infinum.co/the-capsized-eight/how-to-make-your-ios-apps-more-secure-with-ssl-pinning).

> Do I have to use SSL pinning?

**No.** This plugin works out of the box without any security configurations needed. Either way you'll still benefit from all the features listed above.



[](#installation)


[](#installation)

## Installation

```bash
tns plugin add @nativescript-community/https
```


[](#examples)


[](#examples)

## Examples

### Hitting an API using `GET` method

```typescript
import * as Https from '@nativescript-community/https';
Https.request({
    url: 'https://httpbin.org/get',
    method: 'GET',
    timeout: 30, // seconds (default 10)
})
    .then(function (response) {
        console.log('Https.request response', response);
    })
    .catch(function (error) {
        console.error('Https.request error', error);
    });
```


[](#configuration)


[](#configuration)

## Configuration

### Installing your SSL certificate

Create a folder called `assets` in your projects `app` folder like so `<project>/app/assets`. Using chrome, go to the URL where the SSL certificate resides. View the details then drag and drop the certificate image into the `assets` folder.

![Installing your SSL certificate](http://i.imgur.com/hn4duT3.gif)

#### Enabling SSL pinning

```typescript
import { knownFolders } from 'file-system';
import * as Https from '@nativescript-community/https';
let dir = knownFolders.currentApp().getFolder('assets');
let certificate = dir.getFile('httpbin.org.cer').path;
Https.enableSSLPinning({ host: 'httpbin.org', certificate });
```

Once you've enabled SSL pinning you **CAN NOT** re-enable with a different `host` or `certificate` file.

#### Disabling SSL pinning

```typescript
import * as Https from '@nativescript-community/https';
Https.disableSSLPinning();
```

All requests after calling this method will no longer utilize SSL pinning until it is re-enabled once again.

### useLegacy

There is a new option called `useLegacy`. You can set of every request options.
When using that option the request will behave more like {N} http module.

-   the `content` returned by a request is not the resulting string but an object. It follows [HTTPContent](https://docs.nativescript.org/api-reference/interfaces/_http_.httpcontent) format for the most part. You can call `toJSON` or `toFile`. The only difference is that `toFile` returns a `Promise<File>` which means that it is async and run in a background thread!
-   an error return a `content` too allowing you to read its content.

### Cookie

By default basic Cookie support is enabled to work like in {N} `http` module.
In the future more options will be added

### Enabling Cache

```typescript
import { knownFolders, path } from '@nativescript/core/file-system';
import * as Https from '@nativescript-community/https';
Https.setCache({
    diskLocation: path.join(knownFolders.documents().path, 'httpcache'),
    diskSize: 10 * 1024 * 1024, // 10 MiB
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
    host: string;
    certificate: string;
    allowInvalidCertificates?: boolean;
    validatesDomainName?: boolean;
    commonName?: string;
}
import { HttpRequestOptions } from 'tns-core-modules/http';
export interface HttpsRequestOptions extends HTTPOptions {
    useLegacy?: boolean;
    cachePolicy?: 'noCache' | 'onlyCache' | 'ignoreCache';
    onProgress?: (current: number, total: number) => void;
}
```

| SSLPinning Option                    | Description                                                                                                                                     |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `host: string`                       | This must be the request domain name eg `sales.company.org`.                                                                                    |
| `commonName?: string`                | Default: options.host, set if certificate CN is different from the host eg `*.company.org` (Android specific)                                   |
| `certificate: string`                | The uri path to your `.cer` certificate file.                                                                                                   |
| `allowInvalidCertificates?: boolean` | Default: `false`. This should **always** be `false` if you are using SSL pinning. Set this to `true` if you're using a self-signed certificate. |
| `validatesDomainName?: boolean`      | Default: `true`. Determines if the domain name should be validated with your pinned certificate.                                                |

| Requests Option                                         | Description                                                                                                                                                  |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `useLegacy?: boolean`                                   | Default: `false`. [IOS only] set to true in order to get the response data (when status >= 300)in the `content` directly instead of `response.body.content`. |
| `cachePolicy?: 'noCache'                                | 'onlyCache'                                                                                                                                                  | 'ignoreCache'` | Set the cache policy to use with that request. This only works with GET requests for now. |
| `onProgress?: (current: number, total: number) => void` | [IOS only] Set the progress callback.                                                                                                                        |


[](#webpack--bundling)


[](#webpack--bundling)

## Webpack / bundling

Since you're probably shipping a certificate with your app (like [our demo does](https://github.com/nativescript-community/https/tree/master/demo/app/assets)),
make sure it's bundled by Webpack as well. You can do this by [adding the certificate(s) with the `CopyWebpackPlugin`](https://github.com/nativescript-community/https/blob/a5c841c0af7ff6d9994fa23f7fba0df0514c58f1/demo/webpack.config.js#L240).


[](#ios-troubleshooting)


[](#ios-troubleshooting)

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


[](#android-troubleshooting)


[](#android-troubleshooting)

## `Android` troubleshooting

If you app crashes with a message that it's doing too much networking on the main thread,
then pass the option `allowLargeResponse` with value `true` to the `request` function.


[](#thanks)


[](#thanks)

# Thanks

| Who                                             | Why                                                                                                                                                               |
| ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Robert Laverty](https://github.com/roblav96)   | For creating and maintaining this plugin for a long time |
| [Jeff Whelple](https://github.com/gethuman)   | For contributing |
| [Eddy Verbruggen](https://github.com/EddyVerbruggen)   | For maintaining this before it got transferred |
| [AFNetworking](https://github.com/AFNetworking) | [AFNetworking](https://github.com/AFNetworking/AFNetworking) A delightful networking framework for iOS, OS X, watchOS, and tvOS.                                  |
| [Square](http://square.github.io/)              | [okhttp](https://github.com/square/okhttp) An HTTP+HTTP/2 client for Android and Java applications.                                                               |

### Examples:

- [Basic](demo-snippets/vue/Basic.vue)
  - A basic example


[](#demos-and-development)


[](#demos-and-development)

## Demos and Development


### Repo Setup

The repo uses submodules. If you did not clone with ` --recursive` then you need to call
```
git submodule update --init
```

The package manager used to install and link dependencies must be `pnpm` or `yarn`. `npm` wont work.

To develop and test:
if you use `yarn` then run `yarn`
if you use `pnpm` then run `pnpm i`

**Interactive Menu:**

To start the interactive menu, run `npm start` (or `yarn start` or `pnpm start`). This will list all of the commonly used scripts.

### Build

```bash
npm run build.all
```
WARNING: it seems `yarn build.all` wont always work (not finding binaries in `node_modules/.bin`) which is why the doc explicitly uses `npm run`

### Demos

```bash
npm run demo.[ng|react|svelte|vue].[ios|android]

npm run demo.svelte.ios # Example
```

Demo setup is a bit special in the sense that if you want to modify/add demos you dont work directly in `demo-[ng|react|svelte|vue]`
Instead you work in `demo-snippets/[ng|react|svelte|vue]`
You can start from the `install.ts` of each flavor to see how to register new demos 


[](#contributing)


[](#contributing)

## Contributing

### Update repo 

You can update the repo files quite easily

First update the submodules

```bash
npm run update
```

Then commit the changes
Then update common files

```bash
npm run sync
```
Then you can run `yarn|pnpm`, commit changed files if any

### Update readme 
```bash
npm run readme
```

### Update doc 
```bash
npm run doc
```

### Publish

The publishing is completely handled by `lerna` (you can add `-- --bump major` to force a major release)
Simply run 
```shell
npm run publish
```

### modifying submodules

The repo uses https:// for submodules which means you won't be able to push directly into the submodules.
One easy solution is t modify `~/.gitconfig` and add
```
[url "ssh://git@github.com/"]
	pushInsteadOf = https://github.com/
```


[](#questions)


[](#questions)

## Questions

If you have any questions/issues/comments please feel free to create an issue or start a conversation in the [NativeScript Community Discord](https://nativescript.org/discord).

[](#demos-and-development)

## Demos and Development


### Repo Setup

The repo uses submodules. If you did not clone with ` --recursive` then you need to call
```
git submodule update --init
```

The package manager used to install and link dependencies must be `pnpm` or `yarn`. `npm` wont work.

To develop and test:
if you use `yarn` then run `yarn`
if you use `pnpm` then run `pnpm i`

**Interactive Menu:**

To start the interactive menu, run `npm start` (or `yarn start` or `pnpm start`). This will list all of the commonly used scripts.

### Build

```bash
npm run build.all
```
WARNING: it seems `yarn build.all` wont always work (not finding binaries in `node_modules/.bin`) which is why the doc explicitly uses `npm run`

### Demos

```bash
npm run demo.[ng|react|svelte|vue].[ios|android]

npm run demo.svelte.ios # Example
```

Demo setup is a bit special in the sense that if you want to modify/add demos you dont work directly in `demo-[ng|react|svelte|vue]`
Instead you work in `demo-snippets/[ng|react|svelte|vue]`
You can start from the `install.ts` of each flavor to see how to register new demos 


[](#contributing)

## Contributing

### Update repo 

You can update the repo files quite easily

First update the submodules

```bash
npm run update
```

Then commit the changes
Then update common files

```bash
npm run sync
```
Then you can run `yarn|pnpm`, commit changed files if any

### Update readme 
```bash
npm run readme
```

### Update doc 
```bash
npm run doc
```

### Publish

The publishing is completely handled by `lerna` (you can add `-- --bump major` to force a major release)
Simply run 
```shell
npm run publish
```

### modifying submodules

The repo uses https:// for submodules which means you won't be able to push directly into the submodules.
One easy solution is t modify `~/.gitconfig` and add
```
[url "ssh://git@github.com/"]
	pushInsteadOf = https://github.com/
```

[](#questions)

## Questions

If you have any questions/issues/comments please feel free to create an issue or start a conversation in the [NativeScript Community Discord](https://nativescript.org/discord).