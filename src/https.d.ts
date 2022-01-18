import * as Https from './https.common';

export function enableSSLPinning(options: Https.HttpsSSLPinningOptions);

export function disableSSLPinning();

export function request<U extends boolean, T = any>(options: Https.HttpsRequestOptions, useLegacy?: U): U extends true ? Promise<Https.HttpsResponseLegacy<T>> : Promise<Https.HttpsResponse<T>>;
export function setCache(options?: Https.CacheOptions);
export function clearCache();
export function createRequest(opts: Https.HttpsRequestOptions): Https.HttpsRequest;
export function cancelRequest(tag: string);
export function addNetworkInterceptor(interceptor);
export * from './https.common';
