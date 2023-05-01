import { Injectable } from '@angular/core';
import { HttpRequest } from '@angular/common/http';

@Injectable()
export class ExcludedService {
  private readonly _urlList: Array<string> = [ ];

  public static isMultipartFormRequest(request: HttpRequest<any>): boolean {
    const headers = request.headers.get('Content-Type');
    return headers ? headers.includes('application/x-www-form-urlencoded') : false;
  }

  public addUrl(domain: string): void {
    this._urlList.push(domain);
  }

  public contains(needle: string): boolean {
    return Boolean(this._urlList.filter((url) => url === needle).length);
  }

  public skipSslPinning(request: HttpRequest<any>): boolean {
    return this.contains(request.url);
  }
}
