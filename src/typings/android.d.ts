declare namespace com {
    export namespace nativescript {
        export namespace https {
            export class QuotePreservingCookieJar extends okhttp3.CookieJar {
                constructor(manager: java.net.CookieManager);
            }
            export class OkHttpResponse {
                progressCallback: OkHttpResponse.OkHttpResponseProgressCallback;
                closeCallback: OkHttpResponse.OkHttpResponseCloseCallback;
                constructor(body: okhttp3.ResponseBody);
                contentLength(): number;
                cancel();
                toByteArray();
                toByteArrayAsync(callback: OkHttpResponse.OkHttpResponseAsyncCallback);
                asString();
                asStringAsync(callback: OkHttpResponse.OkHttpResponseAsyncCallback);
                toBitmap();
                toBitmapAsync(callback: OkHttpResponse.OkHttpResponseAsyncCallback);
                toFile();
                toFileAsync(filePath: string, callback: OkHttpResponse.OkHttpResponseAsyncCallback);
            }
            export namespace OkHttpResponse {
                export class OkHttpResponseProgressCallback {
                    constructor(impl: { onProgress(current: number, total: number) });
                    onProgress(current: number, total: number);
                }
                export class OkHttpResponseCloseCallback {
                    constructor(impl: { onClose() });
                    onClose();
                }
                export class OkHttpResponseAsyncCallback {
                    constructor(impl: { onBitmap(res); onString(res); onByteArray(res); onFile(res); onException(err) });
                    onBitmap(res);
                    onString(res);
                    onByteArray(res);
                    onFile(res);
                    onException(err);
                }
            }
        }
    }
}
