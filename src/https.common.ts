import { Headers } from 'tns-core-modules/http';

export interface HttpsSSLPinningOptions {
  host: string;
  certificate: string;
  allowInvalidCertificates?: boolean;
  validatesDomainName?: boolean;
  commonName?: string;
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
  /**
   * On Android large responses may crash the app (fi. https://httpbin.org/bytes/10000).
   * By setting this to true we allow large responses on the main thread (which this plugin currently does).
   * Note that once set to true, this policy remains active until the app is killed.
   */
  allowLargeResponse?: boolean;
  /**
   * Default 10 (seconds).
   */
  timeout?: number;
}

export interface HttpsResponse {
  headers?: Headers;
  statusCode?: number;
  content?: any;
  reason?: string;
  reject?: boolean;
}
