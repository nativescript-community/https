import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { XhrFactory } from '@angular/common';
import { HttpErrorResponse, HttpEvent, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, from, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { NSFileSystem, NsHttpBackEnd } from '@nativescript/angular';
import { Headers, HttpsRequestObject, HttpsRequestOptions, HttpsResponse, request as httpsRequest } from '@nativescript-community/https';
import { ExcludedService } from './excluded.service';

/** Https request default options. */
export type HttpsRequestDefaultOptions = Pick<HttpsRequestOptions, 'timeout' | 'allowLargeResponse' | 'cachePolicy' | 'cookiesEnabled'> & { useLegacy?: boolean };

/** Page size injection token. */
export const HTTPS_REQUEST_DEFAULT_OPTIONS = new InjectionToken<HttpsRequestDefaultOptions>('HTTPS_REQUEST_DEFAULT_OPTIONS');

@Injectable()
export class NativeScriptHttpXhrBackend extends NsHttpBackEnd {
    constructor(
        xhrFactory: XhrFactory,
        nsFileSystem: NSFileSystem,
        private readonly _excludedService: ExcludedService,
        @Optional()
        @Inject(HTTPS_REQUEST_DEFAULT_OPTIONS)
        private readonly _defaults?: HttpsRequestDefaultOptions
    ) {
        super(xhrFactory, nsFileSystem);
    }

    public handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
        let result: Observable<HttpEvent<any>>;
        if (this._isLocalRequest(req.url) || this._excludedService.skipSslPinning(req)) {
            result = super.handle(req);
        } else {
            result = this._request(req).pipe(
                map((response: HttpsResponse) => {
                    if (response.statusCode < 200 || response.statusCode > 299) {
                        throw this._mapHttpErrorResponse(response, req);
                    }
                    return new HttpResponse({
                        body: response.content,
                        headers: new HttpHeaders(response.headers),
                        status: response.statusCode,
                        statusText: response.reason,
                        url: req.url
                    });
                }),
                catchError((error) => throwError(() => error))
            );
        }

        return result;
    }

    private _isLocalRequest(url: string): boolean {
        return url.indexOf('~') === 0 || url.indexOf('/') === 0;
    }

    private _request(request: HttpRequest<any>) {
        const method = request.method as 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD';
        let url = request.url;
        if (request.params) {
            const params = request.params.toString();
            if (params.length) {
                const qIdx = url.indexOf('?');
                const sep = qIdx === -1 ? '?' : (qIdx < url.length - 1 ? '&' : '');
                url += sep + params;
            }
        }
        return from(
            httpsRequest(
                {
                    url,
                    method,
                    headers: this._mapHeaders(request),
                    params: this._mapParams(request),
                    body: request.body,
                    timeout: this._defaults?.timeout ?? 3 * 60,
                    allowLargeResponse: this._defaults?.allowLargeResponse ?? true,
                    cachePolicy: this._defaults?.cachePolicy ?? 'noCache',
                    cookiesEnabled: this._defaults?.cookiesEnabled ?? false
                },
                this._defaults?.useLegacy ?? true
            )
        );
    }

    private _mapHeaders(request: HttpRequest<any>): Headers {
        const headerKeys = request.headers.keys();
        const headers = headerKeys.reduce<Headers>((accumulator, key) => {
            const values = request.headers.getAll(key);
            if (values !== null && values !== undefined) {
                accumulator[key] = values.length > 1 ? values.join(' ') : values[0];
            }
            return accumulator;
        }, {});

        if (Object.keys(headers).length) {
            return headers;
        }

        return {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        };
    }

    private _mapParams(request: HttpRequest<any>): HttpsRequestObject {
        const paramKeys = request.params.keys();
        const params = paramKeys.reduce<HttpsRequestObject>((accumulator, key) => {
            const values = request.params.getAll(key);
            if (values !== null && values !== undefined) {
                accumulator[key] = values.length > 1 ? values : values[0];
            }
            return accumulator;
        }, {});
        return params;
    }

    private _mapHttpErrorResponse(error: HttpsResponse, request: HttpRequest<any>): HttpErrorResponse {
        return new HttpErrorResponse({
            error: error.content,
            status: error.statusCode,
            headers: new HttpHeaders(error.headers),
            statusText: error.reason || (typeof error.content === 'string' && error.content) || String(error.statusCode),
            url: request.url
        });
    }
}
