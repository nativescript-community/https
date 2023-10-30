import { File, HttpRequestOptions, ImageSource } from '@nativescript/core';
import * as Https from './request.common';

export interface HttpsSSLPinningOptions {
    host: string;
    certificate: string;
    allowInvalidCertificates?: boolean;
    validatesDomainName?: boolean;
    commonName?: string;
}
export interface CacheOptions {
    diskLocation: string;
    diskSize: number;
    memorySize?: number;
    forceCache?: boolean;
}

export interface HttpsFormDataParam {
    data: any;
    parameterName: string;
    fileName?: string;
    contentType?: string;
}

export interface HttpsRequestObject {
    [key: string]: string | number | boolean | HttpsRequestObject | any[] | HttpsFormDataParam;
}

export interface Headers {
    [k: string]: string;
}

export type CachePolicy = 'noCache' | 'onlyCache' | 'ignoreCache';
export interface HttpsRequestOptions extends HttpRequestOptions {
    url: string;
    tag?: string; // optional request tag to allow to cancel it
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD';
    headers?: Headers;
    params?: HttpsRequestObject;
    body?: HttpsRequestObject | HttpsFormDataParam[] | File;
    /**
     * content can be used to pass native custom okhttp3.RequestBody
     */
    content?: string | any;
    /**
     * Default 10 (seconds).
     */
    timeout?: number;

    /**
     * On Android large responses may crash the app (fi. https://httpbin.org/bytes/10000).
     * By setting this to true and when not using useLegacy, we allow large responses on the main thread (which this plugin currently does).
     * Note that once set to true, this policy remains active until the app is killed.
     */
    allowLargeResponse?: boolean;

    /**
     * iOS for now
     */
    onProgress?: (current: number, total: number) => void;

    cachePolicy?: CachePolicy;

    /**
     * default to true. Android and iOS only store cookies in memory! it will be cleared after an app restart
     */
    cookiesEnabled?: boolean;
}

export interface HttpsResponse<T = any> {
    headers?: Headers;
    statusCode?: number;
    contentLength: number;
    content?: T;
    response?: string;
    reason?: string;
    description?: string;
    url?: string;
    failure?: any;
}

export interface HttpsRequest {
    nativeRequest;
    cancel();
    run(success, failure);
}

export interface HttpsResponseLegacy<T = any> {
    contentLength: number;
    toArrayBuffer(): ArrayBuffer;
    toArrayBufferAsync(): Promise<ArrayBuffer>;

    toString(): string;
    toStringAsync(): Promise<string>;
    toJSON(): T;
    toJSONAsync(): Promise<T>;
    toImage(): Promise<ImageSource>;
    // toImageAsync(): Promise<ImageSource>;
    toFile(destinationFilePath: string): Promise<File>;
    // toFileAsync(destinationFilePath: string): Promise<File>;
}

export function enableSSLPinning(options: HttpsSSLPinningOptions);

export function disableSSLPinning();

// export declare function request<T = any>(options: HttpsRequestOptions): Promise<HttpsResponse<HttpsResponseLegacy<T>>>;
export declare function request<T = any, U extends boolean = true>(
    options: HttpsRequestOptions,
    useLegacy?: U
): U extends true ? Promise<HttpsResponse<HttpsResponseLegacy<T>>> : Promise<HttpsResponse<T>>;
export function setCache(options?: CacheOptions);
export function clearCache();
export function createRequest(opts: HttpsRequestOptions): HttpsRequest;
export function cancelRequest(tag: string);
export function cancelAllRequests();
export function clearCookies();
export function addNetworkInterceptor(interceptor);

export function getClient(opts: Partial<HttpsRequestOptions>);
export * from './request.common';
