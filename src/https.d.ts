import * as Https from './https.common';

export function enableSSLPinning(options: Https.HttpsSSLPinningOptions);

export function disableSSLPinning();

export function request<T = any>(options: Https.HttpsRequestOptions): Promise<Https.HttpsResponse<T>>;
export function setCache(options?: Https.CacheOptions);
export function clearCache();
export function createRequest(opts: Https.HttpsRequestOptions): Https.HttpsRequest;
export function cancelRequest(tag: string);
export function addNetworkInterceptor(interceptor);
export * from './https.common';
