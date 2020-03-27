/// <reference path="./node_modules/tns-platform-declarations/ios.d.ts" />
/// <reference path="./node_modules/tns-platform-declarations/android.d.ts" />

/// <reference path="./platforms/android/typings/okio.d.ts" />
/// <reference path="./platforms/android/typings/okhttp3.d.ts" />
/// <reference path="./platforms/ios/typings/objc!AFNetworking.d.ts" />



declare namespace com {
    export namespace nativescript {
        export namespace https {
            class OkhttpCallback extends okhttp3.Callback {
                public constructor();
                onStringResponse( responseString:string,  statusCode: number,  headers: okhttp3.Headers)
            }
        }
    }
}
