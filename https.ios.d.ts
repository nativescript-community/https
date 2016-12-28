import { HttpResponse } from 'http';
import * as Https from './https.common';
export declare function enableSSLPinning(options: Https.HttpsSSLPinningOptions): void;
export declare function disableSSLPinning(): void;
export declare function request(opts: Https.HttpsRequestOptions): Promise<HttpResponse>;
export * from './https.common';
