declare namespace com {
    export namespace nativescript {
        export namespace https {
            export class QuotePreservingCookieJar extends okhttp3.CookieJar {
                constructor(manager: java.net.CookieManager);
            }
            export class CacheInterceptor {
                public static INTERCEPTOR: okhttp3.Interceptor;
            }
            export class CacheUtils {
                static removeCachedResponse(url: string, cache: okhttp3.Cache): void;
            }
            export class OkHttpResponse {
                progressCallback: OkHttpResponse.OkHttpResponseProgressCallback;
                closeCallback: OkHttpResponse.OkHttpResponseCloseCallback;
                runOnMainThread: boolean;
                runProgressOnMainThread: boolean;
                constructor(body: okhttp3.ResponseBody);
                contentLength(): number;
                cancel();
                toByteArray();
                toByteArrayAsync(callback: OkHttpResponse.OkHttpResponseAsyncCallback);
                asString();
                asStringAsync(callback: OkHttpResponse.OkHttpResponseAsyncCallback);
                toImage();
                toImageAsync(callback: OkHttpResponse.OkHttpResponseAsyncCallback);
                toFile();
                toFileAsync(filePath: string, callback: OkHttpResponse.OkHttpResponseAsyncCallback);

                static getBody(response: okhttp3.Response): okhttp3.ResponseBody;
                static getStatusCode(response: okhttp3.Response): number;
                static getMessage(response: okhttp3.Response): string;
                static getHeaders(response: okhttp3.Response): string;
            }
            export class ProgressRequestWrapper extends okhttp3.RequestBody {
                constructor(body: okhttp3.RequestBody, listener: ProgressRequestWrapper.ProgressListener);
            }
            export namespace ProgressRequestWrapper {
                export class ProgressListener {
                    constructor(impl: { onRequestProgress(current: number, total: number) });
                    onRequestProgress(current: number, total: number);
                }
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
