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
                onStringResponse(
                    responseString: string,
                    statusCode: number,
                    headers: okhttp3.Headers
                );
            }
            class OkHttpResponse {
                public constructor(body: okhttp3.ResponseBody);
                cancel();
                asString(): string;
                asStringAsync(callback: OkHttpResponseAsyncCallback);
                toBitmap(): globalAndroid.graphics.Bitmap;
                toBitmapAsync(callback: OkHttpResponseAsyncCallback);
                toFile(filePath: string): java.io.File;
                toFileAsync(
                    filePath: string,
                    callback: OkHttpResponseAsyncCallback
                );
                toByteArray(): java.nio.ByteBuffer;
                toByteArrayAsync(callback: OkHttpResponseAsyncCallback);
                progressCallback?: OkHttpResponseProgressCallback;
                closeCallback?: OkHttpResponseCloseCallback;
            }
            namespace OkHttpResponse {
                class OkHttpResponseAsyncCallback {
                    public constructor(implementation: {
                        onException(exc: java.io.Exception);
                        onFile(file: java.io.File);
                        onBitmap(bitmap: globalAndroid.graphics.Bitmap);
                        onByteArray(buffer: java.nio.ByteBuffer);
                        onString(result: string);
                    });
                    public constructor();
                    onException(exc: java.io.Exception);
                    onFile(file: java.io.File);
                    onBitmap(bitmap: globalAndroid.graphics.Bitmap);
                    onByteArray(buffer: java.nio.ByteBuffer);
                    onString(result: string);
                }
                class OkHttpResponseProgressCallback {
                    public constructor(implementation: {
                        onProgress(current: number, total: number);
                    });
                    public constructor();
                    onProgress(current: number, total: number);
                }
                class OkHttpResponseCloseCallback {
                    public constructor(implementation: { onClose() });
                    public constructor();
                    onClose();
                }
            }
            class QuotePreservingCookieJar extends okhttp3.CookieJar {
                constructor(cookieHandler: java.net.CookieHandler);
            }
        }
    }
}
