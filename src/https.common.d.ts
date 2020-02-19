import { Headers } from 'tns-core-modules/http';
export interface HttpsSSLPinningOptions {
    host: string;
    certificate: string;
    allowInvalidCertificates?: boolean;
    validatesDomainName?: boolean;
    commonName?: string;
    useLegacy?: boolean;
}
export interface HttpsRequestObject {
    [key: string]: string | number;
}
export interface HttpsRequestOptions {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD';
    headers?: Headers;
    params?: HttpsRequestObject;
    body?: HttpsRequestObject;
    allowLargeResponse?: boolean;
    timeout?: number;
}
export interface HttpsResponse {
    headers?: Headers;
    statusCode?: number;
    content?: any;
    reason?: string;
    reject?: boolean;
    failure?: any;
}
