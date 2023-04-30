import { NgModule, ModuleWithProviders, Optional, Inject, InjectionToken } from '@angular/core';
import { HttpBackend } from '@angular/common/http';
import { NativeScriptHttpClientModule } from '@nativescript/angular';
import { HttpsSSLPinningOptions, enableSSLPinning } from '../request';
import {
  HTTPS_REQUEST_DEFAULT_OPTIONS,
  NativeScriptHttpXhrBackend,
  HttpsRequestDefaultOptions
} from './ns-http-xhr-backend';
import { ExcludedService } from './excluded.service';

/** Page size injection token. */
export const HTTPS_SSL_PINNING_OPTIONS
  = new InjectionToken<HttpsSSLPinningOptions>('HTTPS_SSL_PINNING_OPTIONS');

@NgModule({
  providers: [
    ExcludedService,
    NativeScriptHttpXhrBackend,
    { provide: HttpBackend, useExisting: NativeScriptHttpXhrBackend },
    { provide: HTTPS_REQUEST_DEFAULT_OPTIONS, useValue: { } },
    { provide: HTTPS_SSL_PINNING_OPTIONS, useValue: { host: '', certificate: '' } }
  ],
  imports: [
    NativeScriptHttpClientModule
  ],
  exports: [
    NativeScriptHttpClientModule
  ]
})
export class NativeScriptHttpsModule {
  constructor(
    @Optional()
    @Inject(HTTPS_SSL_PINNING_OPTIONS)
    defaults?: HttpsSSLPinningOptions
  ) {
    enableSSLPinning(defaults ?? { host: '', certificate: '' });
  }
  /**
   * Creates and configures a module.
   * @param defaults Https request default options.
   * @returns A wrapper around an NgModule that associates it with the providers.
   */
  static forRoot(
    defaults: HttpsRequestDefaultOptions & HttpsSSLPinningOptions = { host: '', certificate: '' }
  ): ModuleWithProviders<NativeScriptHttpsModule> {
    return {
      ngModule: NativeScriptHttpsModule,
      providers: [
        { provide: HTTPS_REQUEST_DEFAULT_OPTIONS, useValue: defaults },
        { provide: HTTPS_SSL_PINNING_OPTIONS, useValue: defaults }
      ]
    };
  }
}
