# NativeScript-HTTPS
### The definitive way to hit HTTP based APIs in Nativescript.
Easily integrate the most reliable native networking libraries with the latest and greatest HTTPS security features.
#### A drop-in replacement for the default [http module](https://docs.nativescript.org/cookbook/http#get-response-status-code).

## Features
- Modern TLS security features (SNI, ALPN)
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
> Do I have to use SSL pinning and all this security mumbo jumbo?
**No.** This plugin

