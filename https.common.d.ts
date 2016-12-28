import { HttpRequestOptions, Headers } from 'http';
export interface HttpsSSLPinningOptions {
    host: string;
    certificate: string;
    allowInvalidCertificates?: boolean;
    validatesDomainName?: boolean;
}
export interface HttpsRequestOptions extends HttpRequestOptions {
    method: 'GET' | 'POST';
    headers?: Headers;
    content?: string;
}
