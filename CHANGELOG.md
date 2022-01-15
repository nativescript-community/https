# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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
