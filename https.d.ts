// 

import { HttpRequestOptions, Headers, HttpResponse } from 'http'
import * as Https from './https.common'



export declare function enableSSLPinning(options: Https.HttpsSSLPinningOptions);
export declare function disableSSLPinning();
export declare function request(options: Https.HttpsRequestOptions): Promise<Https.HttpsResponse>;



export * from './https.common'
