# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [4.1.18](https://github.com/nativescript-community/https/compare/v4.1.17...v4.1.18) (2024-09-26)

### Bug Fixes

* **ios:** prevent error ([67d096c](https://github.com/nativescript-community/https/commit/67d096cc30585b997423e52c32e52fdd93e37190))

## [4.1.17](https://github.com/nativescript-community/https/compare/v4.1.16...v4.1.17) (2024-09-25)

### Bug Fixes

* **ios:** encoding fix for toString ([0a1221a](https://github.com/nativescript-community/https/commit/0a1221a3b5a3ecb6b736855eb242d7a5311918e2))
* **ios:** Unexpected end of JSON input ([949fcfb](https://github.com/nativescript-community/https/commit/949fcfb9d154f0687ae76714ed12c091ed4dcf23))

## [4.1.16](https://github.com/nativescript-community/https/compare/v4.1.15...v4.1.16) (2024-07-17)

### Bug Fixes

* new `responseOnMainThread` option which allows running requests from worker ([71885b3](https://github.com/nativescript-community/https/commit/71885b30f26e5e70f6cdfdb61597cd7ff87d499c))

## [4.1.15](https://github.com/nativescript-community/https/compare/v4.1.14...v4.1.15) (2024-07-16)

### Features

* Added support for removing cached responses using url ([9866da9](https://github.com/nativescript-community/https/commit/9866da95aaa4afdbf758967ca943e71b3c22ffcd))

### Bug Fixes

* Compiler warnings ([87a9631](https://github.com/nativescript-community/https/commit/87a9631143f5394f298047ef02308579bb8075bb))

## [4.1.14](https://github.com/nativescript-community/https/compare/v4.1.13...v4.1.14) (2024-07-10)

### Bug Fixes

* android timeout ([d648278](https://github.com/nativescript-community/https/commit/d6482785485f60655227491b81f8c070889cb4e5))

## [4.1.13](https://github.com/nativescript-community/https/compare/v4.1.12...v4.1.13) (2024-05-24)

### Bug Fixes

* **android:** getImage fix ([dae5f65](https://github.com/nativescript-community/https/commit/dae5f6541a8ffe4ba561021b0bd4267aaeb8a92c))

## [4.1.12](https://github.com/nativescript-community/https/compare/v4.1.11...v4.1.12) (2024-04-10)

### Bug Fixes

* **android:** prevent null exception ([73817e3](https://github.com/nativescript-community/https/commit/73817e3f706dc77b8ed78fc406bfe7eea1330839))

## [4.1.11](https://github.com/nativescript-community/https/compare/v4.1.10...v4.1.11) (2024-04-09)

### Bug Fixes

* **android:** revert wraping native error so that app ([b23b7ca](https://github.com/nativescript-community/https/commit/b23b7ca73525a5c2e0176771d5a84a7be2d7a17b))

## [4.1.10](https://github.com/nativescript-community/https/compare/v4.1.9...v4.1.10) (2024-03-29)

### Bug Fixes

* **android:** `forceCache` fix ([b3319ea](https://github.com/nativescript-community/https/commit/b3319ead68353f19e07a0eade5367ba7428e72fd))

## [4.1.9](https://github.com/nativescript-community/https/compare/v4.1.8...v4.1.9) (2024-02-28)

### Bug Fixes

* **android:** wrap native errors in js Error ([c6f11c5](https://github.com/nativescript-community/https/commit/c6f11c5132116560d98901246f69d6ec52911917))

## [4.1.8](https://github.com/nativescript-community/https/compare/v4.1.7...v4.1.8) (2023-11-21)

### Bug Fixes

* **ios:** ensure progress is run on main thread(for now) ([60a4453](https://github.com/nativescript-community/https/commit/60a44530f2371996a952c8566f2d9fded26d5b1e))

## [4.1.7](https://github.com/nativescript-community/https/compare/v4.1.6...v4.1.7) (2023-11-21)

## [4.1.5](https://github.com/nativescript-community/https/compare/v4.1.4...v4.1.5) (2023-11-02)

### Bug Fixes

* **ios:** rewrote to support all HTTP methods. ([4a25a73](https://github.com/nativescript-community/https/commit/4a25a73dc672e051370591e11e2dfe98127a60a5))

## [4.1.6](https://github.com/nativescript-community/https/compare/v4.1.4...v4.1.6) (2023-11-13)

### Bug Fixes

* **android:** prevent error with GET and onProgress ([ae50812](https://github.com/nativescript-community/https/commit/ae508120411543c5a6822196dd890b29890a0804))
* refactor to allow all HTTP methods. better support for uploading files ([b7ad6b9](https://github.com/nativescript-community/https/commit/b7ad6b99c7d8952249215e7170dcd4ca51070ddd))

## [4.1.4](https://github.com/nativescript-community/https/compare/v4.1.3...v4.1.4) (2023-10-25)

### Bug Fixes

* **angular:** xhr factory import ([71a3609](https://github.com/nativescript-community/https/commit/71a3609abd8a0180f1519b051b02e633605bdfe1))

## [4.1.3](https://github.com/nativescript-community/https/compare/v4.1.2...v4.1.3) (2023-10-19)

### Features

* **angular:** handle params ([eff8222](https://github.com/nativescript-community/https/commit/eff82226bf4727b73d8484014245956248931d70))

## [4.1.2](https://github.com/nativescript-community/https/compare/v4.1.1...v4.1.2) (2023-08-30)

### Bug Fixes

* **android:** toBitmapAsync is not a function error fix ([63b19f0](https://github.com/nativescript-community/https/commit/63b19f03334d8ae742dddc47d48db530d88db63f))
* **ios:** base URL for AFHTTPSessionManager ([0ee4640](https://github.com/nativescript-community/https/commit/0ee46405eed8fe2902b01ddb1f871f604424bf51))
* **ios:** non legacy report format fix ([1cec77e](https://github.com/nativescript-community/https/commit/1cec77ef3144c4840fb205142aa4d7e761262196))

## [4.1.1](https://github.com/nativescript-community/https/compare/v4.1.0...v4.1.1) (2023-07-03)

### Bug Fixes

* angular build ([0290951](https://github.com/nativescript-community/https/commit/0290951a20d41a9158e406f6120ea9f2a1459219))
* angular code formatting & error handling ([e1893e4](https://github.com/nativescript-community/https/commit/e1893e4481793abecf32bb44ef6185c498935d2d))
* call async methods to prevent android.os.NetworkOnMainThreadException errors ([ec82cef](https://github.com/nativescript-community/https/commit/ec82cef78897de459f879b42f3a83eb7504d5fec))

# [4.1.0](https://github.com/nativescript-community/https/compare/v4.0.17...v4.1.0) (2023-04-30)

### Features

* angular module ([dc3761a](https://github.com/nativescript-community/https/commit/dc3761ac33d99ddaa35d47e56c3275774af647f1))
* angular support ([ff92deb](https://github.com/nativescript-community/https/commit/ff92deb51bc95605c02eafe9ae4f066434fe8dcd))

## [4.0.17](https://github.com/nativescript-community/https/compare/v4.0.16...v4.0.17) (2023-03-20)

### Bug Fixes

* **android:** support native data for form data parameters ([47e9002](https://github.com/nativescript-community/https/commit/47e9002ddd4c1ec8acf106035e36c6649829ae85))

## [4.0.16](https://github.com/nativescript-community/https/compare/v4.0.15...v4.0.16) (2023-03-14)

### Features

* `cancelAllRequests` ([3a014bc](https://github.com/nativescript-community/https/commit/3a014bc9fe797d9b1405b9ed75348fba776d6eb2))

## [4.0.15](https://github.com/nativescript-community/https/compare/v4.0.14...v4.0.15) (2023-03-06)

### Bug Fixes

* **android:** update to latest okhttp lib ([c4b7870](https://github.com/nativescript-community/https/commit/c4b78703637e21bbfa84647d7f8a6f07348c9f44))

### Features

* **android:** support passing custom RequestBody as `content` parameter ([4e5b513](https://github.com/nativescript-community/https/commit/4e5b5136f19487a87911638ef4b9fc7a174dd619))

## [4.0.14](https://github.com/nativescript-community/https/compare/v4.0.13...v4.0.14) (2023-02-15)

### Bug Fixes

* **android:** cookiesEnabled: false fixed ([94f6bb1](https://github.com/nativescript-community/https/commit/94f6bb18c546ef1e427730d45cc71a4726f9ab39))

## [4.0.13](https://github.com/nativescript-community/https/compare/v4.0.12...v4.0.13) (2023-01-24)

### Bug Fixes

* **android:** native-api-usage fix ([0f5ca06](https://github.com/nativescript-community/https/commit/0f5ca062c06c0f2c31677be8c528c1b072070e50))

## [4.0.12](https://github.com/nativescript-community/https/compare/v4.0.11...v4.0.12) (2023-01-23)

### Bug Fixes

* **android:** improved native-api-usage ([5e32bb0](https://github.com/nativescript-community/https/commit/5e32bb08e3f95c75e0ec05d0594294911eda72af))

## [4.0.11](https://github.com/nativescript-community/https/compare/v4.0.10...v4.0.11) (2022-12-05)

### Features

* clearCookies method ([5410f6e](https://github.com/nativescript-community/https/commit/5410f6e86202ca74b31fea0f94fda95467c13e38))

## [4.0.10](https://github.com/nativescript-community/https/compare/v4.0.9...v4.0.10) (2022-11-02)

### Bug Fixes

* **ios:** correctly send JSON body with null values ([8ba7085](https://github.com/nativescript-community/https/commit/8ba70858927adef23b2a0eeea32827bff975457b))

## [4.0.9](https://github.com/nativescript-community/https/compare/v4.0.8...v4.0.9) (2022-11-02)

### Bug Fixes

* **ios:** prevent crash on request failure ([c9485e5](https://github.com/nativescript-community/https/commit/c9485e57833946c858682899b09d2c504d445fbc))

## [4.0.8](https://github.com/nativescript-community/https/compare/v4.0.7...v4.0.8) (2022-09-17)

### Features

* export getClient for use with ui-image plugin ([50a5f4a](https://github.com/nativescript-community/https/commit/50a5f4a6657c93a441df7f55f6a0b392f3c2b251))

## [4.0.7](https://github.com/nativescript-community/https/compare/v4.0.6...v4.0.7) (2022-09-17)

### Features

* added `cookiesEnabled` property (`true` by default) ([19aeb27](https://github.com/nativescript-community/https/commit/19aeb27f469e989c8d71b48aa32139c8faa66cd2))

## [4.0.6](https://github.com/nativescript-community/https/compare/v4.0.5...v4.0.6) (2022-05-18)

### Bug Fixes

* **android:** cancelling of long process requests fix ([e46b698](https://github.com/nativescript-community/https/commit/e46b698d106ccf3239ecbee5f7ea3a39192a50f5))

## [4.0.5](https://github.com/nativescript-community/https/compare/v4.0.4...v4.0.5) (2022-04-28)

### Bug Fixes

* **android:** trying to fix kotlin crashes ([9c75476](https://github.com/nativescript-community/https/commit/9c7547690b72163c325e0137ad386cf51ab33db6))

## [4.0.4](https://github.com/nativescript-community/https/compare/v4.0.3...v4.0.4) (2022-04-26)

### Bug Fixes

* **android:** should work now ([7368616](https://github.com/nativescript-community/https/commit/7368616735cdb4d3110c04a5fc19800327b5e3ed))

## [4.0.3](https://github.com/nativescript-community/https/compare/v4.0.2...v4.0.3) (2022-04-26)

### Bug Fixes

* **android:** another fix... ([8cd3c92](https://github.com/nativescript-community/https/commit/8cd3c92980faeb6b87dfe6799b56b3b0a9375e60))

## [4.0.2](https://github.com/nativescript-community/https/compare/v4.0.1...v4.0.2) (2022-04-26)

### Bug Fixes

* **android:** broken headers in response ([81d8479](https://github.com/nativescript-community/https/commit/81d8479a5dd44fb1e51212b8842c3409b7c23ed3))

## [4.0.1](https://github.com/nativescript-community/https/compare/v4.0.0...v4.0.1) (2022-04-25)

### Bug Fixes

* **android:** crash on response headers ([b09da7f](https://github.com/nativescript-community/https/commit/b09da7f3e357e5b3047b73227f7c29d2efb93ced))

# [4.0.0](https://github.com/nativescript-community/https/compare/v3.4.4...v4.0.0) (2022-04-25)

### Features

* **android:** upgrade okhttp to  4.x. WARNING: minSDKVersion bumped to 21!

## [3.4.4](https://github.com/nativescript-community/https/compare/v3.4.3...v3.4.4) (2022-04-25)

### Bug Fixes

* **android:** dont try/catch sync methods to prevent missed errors ([cb830a8](https://github.com/nativescript-community/https/commit/cb830a8cad414133bcdff4a14c986cb8899984e6))
* **android:** upgrade okhttp to max 3.x ([eb0b61e](https://github.com/nativescript-community/https/commit/eb0b61ea8ba53055538d5460abf0474a22ba3282))

## [3.4.3](https://github.com/nativescript-community/https/compare/v3.4.2...v3.4.3) (2022-04-25)

### Bug Fixes

* **android:** native-api-usage fix ([bc3c7d2](https://github.com/nativescript-community/https/commit/bc3c7d24160038f48e487918ee8abcf5d24f0322))

### Features

* contentLength ([a2e1017](https://github.com/nativescript-community/https/commit/a2e10170145a8e94e10f407e5fe772cb0d40e12c))

## [3.4.2](https://github.com/nativescript-community/https/compare/v3.4.1...v3.4.2) (2022-02-26)

### Bug Fixes

* completely broken release … ([b35209e](https://github.com/nativescript-community/https/commit/b35209e98ebd87a196512a84b68b67c79ffb1341))

## [3.4.1](https://github.com/nativescript-community/https/compare/v3.4.0...v3.4.1) (2022-02-26)

### Bug Fixes

* **android:** fixed broken build ([532ae49](https://github.com/nativescript-community/https/commit/532ae49a0dbe6c9dc4742400051d5ea86646ebbc))

# [3.4.0](https://github.com/nativescript-community/https/compare/v3.3.13...v3.4.0) (2022-02-25)

### Features

* refactoring to allow N alias to replace core impl ([22ac92f](https://github.com/nativescript-community/https/commit/22ac92f572c9b2739c40f5a39f47ac67d28a78ee))

## [3.3.13](https://github.com/nativescript-community/https/compare/v3.3.12...v3.3.13) (2022-02-08)

### Bug Fixes

* **ios:** fix form data passed as a string ([d234842](https://github.com/nativescript-community/https/commit/d234842c5a29b8a360aae6c91dce80821630eea1))

## [3.3.12](https://github.com/nativescript-community/https/compare/v3.3.11...v3.3.12) (2022-01-20)

### Bug Fixes

* **android:** progress support for uploading ([67817ac](https://github.com/nativescript-community/https/commit/67817ac284f8da424829b0c400b5c2c788ccf9dc))

## [3.3.11](https://github.com/nativescript-community/https/compare/v3.3.10...v3.3.11) (2022-01-20)

### Bug Fixes

* **android:** native-api-usage fix ([06dc376](https://github.com/nativescript-community/https/commit/06dc376b01683675ef2a90135396ec5a9f1cf60a))

## [3.3.10](https://github.com/nativescript-community/https/compare/v3.3.9...v3.3.10) (2022-01-19)

### Bug Fixes

* typings fix ([3490469](https://github.com/nativescript-community/https/commit/3490469cdc019265ec321ff9db37b94100f94b49))

## [3.3.9](https://github.com/nativescript-community/https/compare/v3.3.8...v3.3.9) (2022-01-18)

**Note:** Version bump only for package @nativescript-community/https

## [3.3.8](https://github.com/farfromrefug/nativescript-https/compare/v3.3.7...v3.3.8) (2022-01-18)

### Bug Fixes

* **android:** `cancelRequest` fix ([c7b8c93](https://github.com/farfromrefug/nativescript-https/commit/c7b8c935a6b02dc4f9e5c20c6911b2e59db8fa64))

## [3.3.7](https://github.com/farfromrefug/nativescript-https/compare/v3.3.6...v3.3.7) (2022-01-15)

### Bug Fixes

* **android:** `cancelRequest` not exported ([9727802](https://github.com/farfromrefug/nativescript-https/commit/972780279a291d3f95636601450198a78d935696))

## [3.3.6](https://github.com/farfromrefug/nativescript-https/compare/v3.3.5...v3.3.6) (2022-01-15)

### Features

* added method `cancelRequest`. You need to set the `tag` in request options first ([bace983](https://github.com/farfromrefug/nativescript-https/commit/bace9832d9ab07b158068eca3104a24f4c494851))

## [3.3.5](https://github.com/farfromrefug/nativescript-https/compare/v3.3.4...v3.3.5) (2022-01-14)

**Note:** Version bump only for package @nativescript-community/https

## [3.3.4](https://github.com/farfromrefug/nativescript-https/compare/v3.3.3...v3.3.4) (2022-01-14)

### Bug Fixes

* **android:** missing native-api-usage ([0d6d67b](https://github.com/farfromrefug/nativescript-https/commit/0d6d67b223e52d5e3d80b4513f2ee6d591495e4f))
* missing export of `addNetworkInterceptor`, `addInterceptor` ([2b503c4](https://github.com/farfromrefug/nativescript-https/commit/2b503c42d43cde3f82d994346948e20bbf91fc57))

## [3.3.3](https://github.com/farfromrefug/nativescript-https/compare/v3.3.2...v3.3.3) (2021-12-23)

### Bug Fixes

* android allow interceptors ([49073c5](https://github.com/farfromrefug/nativescript-https/commit/49073c5c4e1ab1370da4260ebc833705eaabb2b3))

## [3.3.2](https://github.com/farfromrefug/nativescript-https/compare/v3.3.1...v3.3.2) (2021-10-21)

### Bug Fixes

* **android:** native-api-usage fix ([6f8748d](https://github.com/farfromrefug/nativescript-https/commit/6f8748da0323eb2520dbb5024301deb136bd5baa))

## [3.3.1](https://github.com/farfromrefug/nativescript-https/compare/v3.3.0...v3.3.1) (2021-10-18)

### Bug Fixes

* **android:** native-api-usage fix ([e18a203](https://github.com/farfromrefug/nativescript-https/commit/e18a2039464d488f3e370dd7feaf6ed61e4938e6))

# [3.3.0](https://github.com/farfromrefug/nativescript-https/compare/v3.2.2...v3.3.0) (2021-10-17)

### Bug Fixes

* **android:** Conscrypt not included by default anymore. You need to add it in your app ([c16f34d](https://github.com/farfromrefug/nativescript-https/commit/c16f34d1b2f3fa226760ab00b17e56f6996dff96))

### Features

* **android:** native-api-usage ([9415f38](https://github.com/farfromrefug/nativescript-https/commit/9415f387b929b01c7fe385ff5d42e1bbd15ae2e4))

## [3.2.2](https://github.com/farfromrefug/nativescript-https/compare/v3.2.1...v3.2.2) (2021-07-21)

### Bug Fixes

* **android:** prevent error when no cache-control ([e3d781e](https://github.com/farfromrefug/nativescript-https/commit/e3d781ed3a2d7364d3179d6a5acc39b5b9b65e29))

## [3.2.1](https://github.com/farfromrefug/nativescript-https/compare/v3.2.0...v3.2.1) (2021-07-01)

### Bug Fixes

* **android:** support for application/x-www-form-urlencoded ([fb8db51](https://github.com/farfromrefug/nativescript-https/commit/fb8db514916dd1c29baa40016fc5302c64a79a41))

# [3.2.0](https://github.com/farfromrefug/nativescript-https/compare/v3.1.3...v3.2.0) (2021-03-14)

### Features

* **android:** forceCache option ([cc225be](https://github.com/farfromrefug/nativescript-https/commit/cc225bea37e0035288533106e48a469e11d15d01))

## [3.1.3](https://github.com/farfromrefug/nativescript-https/compare/v3.1.2...v3.1.3) (2021-03-12)

### Bug Fixes

* **android:** correctly use timeout option ([9a1e5be](https://github.com/farfromrefug/nativescript-https/commit/9a1e5be39f70453653d8cbc38c66ddf6843754ce))

## [3.1.2](https://github.com/farfromrefug/nativescript-https/compare/v3.1.1...v3.1.2) (2020-12-09)

### Bug Fixes

* ios crash with cache on < 13 ([e021b8d](https://github.com/farfromrefug/nativescript-https/commit/e021b8d9c847f5ba545cc6fc52e6271780dd4e7f))

## [3.1.1](https://github.com/farfromrefug/nativescript-https/compare/v3.1.0...v3.1.1) (2020-11-26)

### Bug Fixes

* correctly handle null responses from requests ([6b70be6](https://github.com/farfromrefug/nativescript-https/commit/6b70be64eb44a7e3da1705f025128bd9fabe6d2a))

# 3.1.0 (2020-10-29)

### Bug Fixes

* ios throw error like android (useLegacy) ([ff86cdc](https://github.com/farfromrefug/nativescript-https/commit/ff86cdc7060e9f692ce515362327adbbbf424d15))
* **android:** now java files are included ([495c0c7](https://github.com/farfromrefug/nativescript-https/commit/495c0c7d9effd5db859968bf3907df9ba4b5d939))
* **android:** packaging of java fies ([c467fe1](https://github.com/farfromrefug/nativescript-https/commit/c467fe1e13e825aed37f7acaf26b37a488760860))
* **ios:** crash when error.userInfo.objectForKey("NSErrorFailingURLKey") is null ([dc96a48](https://github.com/farfromrefug/nativescript-https/commit/dc96a48988200f826c5b93ea0c6e0a20d2b64f04))
* better test for application/json ([0d06254](https://github.com/farfromrefug/nativescript-https/commit/0d062547380147971b5e5d46ec5383afe849adf5))
* bring back allowLargeResponse when not using useLegacy ([604637a](https://github.com/farfromrefug/nativescript-https/commit/604637ad1adb36c5947e4742463b95cc3d0112ef))
* kitkat fix (ssl errors) ([be05b83](https://github.com/farfromrefug/nativescript-https/commit/be05b8355823d85c10a57739250bdc37dbf7c087))
* merge from origin ([ed0edbe](https://github.com/farfromrefug/nativescript-https/commit/ed0edbe305f9a64ac4936486994ae819e3cd6b93))
* some multi part fixes ([3fdbd94](https://github.com/farfromrefug/nativescript-https/commit/3fdbd9441296be609a82a208e6099670ca7dbc05))
* **android:** allow overriding version ([57eea0c](https://github.com/farfromrefug/nativescript-https/commit/57eea0c8b0a46b8b899a4b88844f7716f03917b5))
* **android:** only create OkHttpResponseCloseCallback when necessary ([1fb44fd](https://github.com/farfromrefug/nativescript-https/commit/1fb44fd01514246aab40c1067157a5e7f6b5bdd7))
* **android:** removed logs ([22605de](https://github.com/farfromrefug/nativescript-https/commit/22605de5153a00ade7dcd4e78c13c04736534c07))
* **android:** toJSONAsync fix ([ea415cd](https://github.com/farfromrefug/nativescript-https/commit/ea415cd842da0fd6364837a0afe0bebf834c4083))
* **ios:** alloc clear cache on ios even if set cache done done ([374cd92](https://github.com/farfromrefug/nativescript-https/commit/374cd92c7bc375725ec16997cf7ea694cffb204a))
* **ios:** toStringAsync &&  toJSONAsync ([20a74b6](https://github.com/farfromrefug/nativescript-https/commit/20a74b66a6d8a118ffe59f4bf440909de37d5c78))
* multipart fixes ([097676f](https://github.com/farfromrefug/nativescript-https/commit/097676f1e404e2edb67fb1877941fa3e4bf05e0b))
* typings ([8b5d82b](https://github.com/farfromrefug/nativescript-https/commit/8b5d82b71c2143a310222936fd0328b03958dc6a))
* useLegacy should be a request option ([74f1afa](https://github.com/farfromrefug/nativescript-https/commit/74f1afabfeb051c08b89050b17771356381bd03c))
* **ios:** multipart fix ([0d9d331](https://github.com/farfromrefug/nativescript-https/commit/0d9d331ff49cedd06ed0d07cd25a4b50181a23a5))

### Features

* basick cookie support ([91fe3c7](https://github.com/farfromrefug/nativescript-https/commit/91fe3c7d6b8fd7f4198845bd9f88324ccb384704))
* cachePolicy support ([2355eb0](https://github.com/farfromrefug/nativescript-https/commit/2355eb0207c58c3a161769de2b111dae268b5a42))
* in useLegacy bring the full power of async with progress and cancelation ([91b1772](https://github.com/farfromrefug/nativescript-https/commit/91b1772bd99887c8b9cbd7d523e77c363ecafee9))
* move to @nativescript-community/https ([5c8d5c8](https://github.com/farfromrefug/nativescript-https/commit/5c8d5c8c4e5e7d50a0312cf978638b6068398025))
* multi formdata support ([c1dff6d](https://github.com/farfromrefug/nativescript-https/commit/c1dff6d27bcad54fb4f7aa03180a73696fc17ce2))

# 2.1.0 (2020-04-07)

# 2.0.0 (2020-03-30)

# 1.3.0 (2020-02-13)

## 1.2.2 (2019-10-16)

# 1.2.0 (2019-10-06)
