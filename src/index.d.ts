import * as Https from './https.common';

export function enableSSLPinning(options: Https.HttpsSSLPinningOptions);

export function disableSSLPinning();

export function request(options: Https.HttpsRequestOptions): Promise<Https.HttpsResponse>;
export function setCache(options?: Https.CacheOptions)

export * from './https.common';
