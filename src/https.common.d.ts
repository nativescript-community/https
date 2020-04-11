import { Headers } from 'tns-core-modules/http';
export interface HttpsSSLPinningOptions {
    host: string;
    certificate: string;
    allowInvalidCertificates?: boolean;
    validatesDomainName?: boolean;
    commonName?: string;
    useLegacy?: boolean;
}
export interface CacheOptions {
    diskLocation: string;
    diskSize: number;
    memorySize?: number;
}
export interface HttpsFormDataParam {
    data: any;
    parameterName: string;
    fileName?: string;
    contentType?: string;
}
export interface HttpsRequestObject {
    [key: string]: string | number | boolean | HttpsRequestObject | Array<any> | HttpsFormDataParam;
}
export declare type CachePolicy = 'noCache' | 'onlyCache' | 'ignoreCache';
export interface HttpsRequestOptions {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD';
    headers?: Headers;
    params?: HttpsRequestObject;
    body?: HttpsRequestObject | HttpsFormDataParam[];
    content?: string;
    allowLargeResponse?: boolean;
    timeout?: number;
    onProgress?: (current: number, total: number) => void;
    cachePolicy?: CachePolicy;
}
export interface HttpsResponse {
    headers?: Headers;
    statusCode?: number;
    content?: any;
    reason?: string;
    description?: string;
    url?: string;
    reject?: boolean;
    failure?: any;
}
