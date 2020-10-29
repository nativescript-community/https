/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable no-redeclare */
/* eslint-disable @typescript-eslint/unified-signatures */
declare namespace okhttp3 {
    export class Address {
        public static class: java.lang.Class<Address>;
        public proxy(): java.net.Proxy;
        public equals(param0: any): boolean;
        public constructor(
            param0: string,
            param1: number,
            param2: Dns,
            param3: javax.net.SocketFactory,
            param4: javax.net.ssl.SSLSocketFactory,
            param5: javax.net.ssl.HostnameVerifier,
            param6: CertificatePinner,
            param7: Authenticator,
            param8: java.net.Proxy,
            param9: java.util.List<Protocol>,
            param10: java.util.List<ConnectionSpec>,
            param11: java.net.ProxySelector
        );
        public proxySelector(): java.net.ProxySelector;
        public sslSocketFactory(): javax.net.ssl.SSLSocketFactory;
        public url(): HttpUrl;
        public certificatePinner(): CertificatePinner;
        public toString(): string;
        public protocols(): java.util.List<Protocol>;
        public socketFactory(): javax.net.SocketFactory;
        public dns(): Dns;
        public proxyAuthenticator(): Authenticator;
        public hostnameVerifier(): javax.net.ssl.HostnameVerifier;
        public hashCode(): number;
        public connectionSpecs(): java.util.List<ConnectionSpec>;
    }
}

declare namespace okhttp3 {
    export class Authenticator {
        public static class: java.lang.Class<Authenticator>;
        /**
         * Constructs a new instance of the okhttp3.Authenticator interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
         */
        public constructor(implementation: { authenticate(param0: Route, param1: Response): Request; <clinit>(): void });
        public constructor();
        public static NONE: Authenticator;
        public authenticate(param0: Route, param1: Response): Request;
    }
}

declare namespace okhttp3 {
    export class Cache {
        public static class: java.lang.Class<Cache>;
        public close(): void;
        public directory(): java.io.File;
        public constructor(param0: java.io.File, param1: number);
        public static key(param0: HttpUrl): string;
        public writeAbortCount(): number;
        public evictAll(): void;
        public delete(): void;
        public isClosed(): boolean;
        public networkCount(): number;
        public requestCount(): number;
        public flush(): void;
        public initialize(): void;
        public size(): number;
        public writeSuccessCount(): number;
        public hitCount(): number;
        public urls(): java.util.Iterator<string>;
        public maxSize(): number;
    }
    export namespace Cache {
        export class CacheRequestImpl extends internal.cache.CacheRequest {
            public static class: java.lang.Class<CacheRequestImpl>;
            public body(): okio.Sink;
            public abort(): void;
        }
        export class CacheResponseBody extends ResponseBody {
            public static class: java.lang.Class<CacheResponseBody>;
            public contentLength(): number;
            public source(): okio.BufferedSource;
            public contentType(): MediaType;
        }
        export class Entry {
            public static class: java.lang.Class<Entry>;
            public matches(param0: Request, param1: Response): boolean;
            public response(param0: internal.cache.DiskLruCache.Snapshot): Response;
            public writeTo(param0: internal.cache.DiskLruCache.Editor): void;
        }
    }
}

declare namespace okhttp3 {
    export class CacheControl {
        public static class: java.lang.Class<CacheControl>;
        public static FORCE_NETWORK: CacheControl;
        public static FORCE_CACHE: CacheControl;
        public maxStaleSeconds(): number;
        public mustRevalidate(): boolean;
        public static parse(param0: Headers): CacheControl;
        public toString(): string;
        public minFreshSeconds(): number;
        public onlyIfCached(): boolean;
        public noCache(): boolean;
        public noTransform(): boolean;
        public isPrivate(): boolean;
        public immutable(): boolean;
        public sMaxAgeSeconds(): number;
        public noStore(): boolean;
        public maxAgeSeconds(): number;
        public isPublic(): boolean;
    }
    export namespace CacheControl {
        export class Builder {
            public static class: java.lang.Class<Builder>;
            public noCache(): Builder;
            public maxStale(param0: number, param1: java.util.concurrent.TimeUnit): Builder;
            public immutable(): Builder;
            public onlyIfCached(): Builder;
            public minFresh(param0: number, param1: java.util.concurrent.TimeUnit): Builder;
            public maxAge(param0: number, param1: java.util.concurrent.TimeUnit): Builder;
            public constructor();
            public build(): CacheControl;
            public noStore(): Builder;
            public noTransform(): Builder;
        }
    }
}

declare namespace okhttp3 {
    export class Call {
        public static class: java.lang.Class<Call>;
        /**
         * Constructs a new instance of the okhttp3.Call interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
         */
        public constructor(implementation: {
            request(): Request;
            execute(): Response;
            enqueue(param0: Callback): void;
            cancel(): void;
            isExecuted(): boolean;
            isCanceled(): boolean;
            timeout(): okio.Timeout;
            clone(): Call;
        });
        public constructor();
        public isExecuted(): boolean;
        public clone(): Call;
        public request(): Request;
        public execute(): Response;
        public isCanceled(): boolean;
        public enqueue(param0: Callback): void;
        public cancel(): void;
        public timeout(): okio.Timeout;
    }
    export namespace Call {
        export class Factory {
            public static class: java.lang.Class<Factory>;
            /**
             * Constructs a new instance of the okhttp3.Call$Factory interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
             */
            public constructor(implementation: { newCall(param0: Request): Call });
            public constructor();
            public newCall(param0: Request): Call;
        }
    }
}

declare namespace okhttp3 {
    export class Callback {
        public static class: java.lang.Class<Callback>;
        /**
         * Constructs a new instance of the okhttp3.Callback interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
         */
        public constructor(implementation: { onFailure(param0: Call, param1: java.io.IOException): void; onResponse(param0: Call, param1: Response): void });
        public constructor();
        public onResponse(param0: Call, param1: Response): void;
        public onFailure(param0: Call, param1: java.io.IOException): void;
    }
}

declare namespace okhttp3 {
    export class CertificatePinner {
        public static class: java.lang.Class<CertificatePinner>;
        public static DEFAULT: CertificatePinner;
        public equals(param0: any): boolean;
        public static pin(param0: java.security.cert.Certificate): string;
        public check(param0: string, param1: native.Array<java.security.cert.Certificate>): void;
        public hashCode(): number;
        public check(param0: string, param1: java.util.List<java.security.cert.Certificate>): void;
    }
    export namespace CertificatePinner {
        export class Builder {
            public static class: java.lang.Class<Builder>;
            public build(): CertificatePinner;
            public add(param0: string, param1: native.Array<string>): Builder;
            public constructor();
        }
        export class Pin {
            public static class: java.lang.Class<Pin>;
            public equals(param0: any): boolean;
            public toString(): string;
            public hashCode(): number;
        }
    }
}

declare namespace okhttp3 {
    export class Challenge {
        public static class: java.lang.Class<Challenge>;
        public authParams(): java.util.Map<string, string>;
        public charset(): java.nio.charset.Charset;
        public equals(param0: any): boolean;
        public scheme(): string;
        public hashCode(): number;
        public toString(): string;
        public constructor(param0: string, param1: java.util.Map<string, string>);
        public withCharset(param0: java.nio.charset.Charset): Challenge;
        public constructor(param0: string, param1: string);
        public realm(): string;
    }
}

declare namespace okhttp3 {
    export class CipherSuite {
        public static class: java.lang.Class<CipherSuite>;
        public static TLS_RSA_WITH_NULL_MD5: CipherSuite;
        public static TLS_RSA_WITH_NULL_SHA: CipherSuite;
        public static TLS_RSA_EXPORT_WITH_RC4_40_MD5: CipherSuite;
        public static TLS_RSA_WITH_RC4_128_MD5: CipherSuite;
        public static TLS_RSA_WITH_RC4_128_SHA: CipherSuite;
        public static TLS_RSA_EXPORT_WITH_DES40_CBC_SHA: CipherSuite;
        public static TLS_RSA_WITH_DES_CBC_SHA: CipherSuite;
        public static TLS_RSA_WITH_3DES_EDE_CBC_SHA: CipherSuite;
        public static TLS_DHE_DSS_EXPORT_WITH_DES40_CBC_SHA: CipherSuite;
        public static TLS_DHE_DSS_WITH_DES_CBC_SHA: CipherSuite;
        public static TLS_DHE_DSS_WITH_3DES_EDE_CBC_SHA: CipherSuite;
        public static TLS_DHE_RSA_EXPORT_WITH_DES40_CBC_SHA: CipherSuite;
        public static TLS_DHE_RSA_WITH_DES_CBC_SHA: CipherSuite;
        public static TLS_DHE_RSA_WITH_3DES_EDE_CBC_SHA: CipherSuite;
        public static TLS_DH_anon_EXPORT_WITH_RC4_40_MD5: CipherSuite;
        public static TLS_DH_anon_WITH_RC4_128_MD5: CipherSuite;
        public static TLS_DH_anon_EXPORT_WITH_DES40_CBC_SHA: CipherSuite;
        public static TLS_DH_anon_WITH_DES_CBC_SHA: CipherSuite;
        public static TLS_DH_anon_WITH_3DES_EDE_CBC_SHA: CipherSuite;
        public static TLS_KRB5_WITH_DES_CBC_SHA: CipherSuite;
        public static TLS_KRB5_WITH_3DES_EDE_CBC_SHA: CipherSuite;
        public static TLS_KRB5_WITH_RC4_128_SHA: CipherSuite;
        public static TLS_KRB5_WITH_DES_CBC_MD5: CipherSuite;
        public static TLS_KRB5_WITH_3DES_EDE_CBC_MD5: CipherSuite;
        public static TLS_KRB5_WITH_RC4_128_MD5: CipherSuite;
        public static TLS_KRB5_EXPORT_WITH_DES_CBC_40_SHA: CipherSuite;
        public static TLS_KRB5_EXPORT_WITH_RC4_40_SHA: CipherSuite;
        public static TLS_KRB5_EXPORT_WITH_DES_CBC_40_MD5: CipherSuite;
        public static TLS_KRB5_EXPORT_WITH_RC4_40_MD5: CipherSuite;
        public static TLS_RSA_WITH_AES_128_CBC_SHA: CipherSuite;
        public static TLS_DHE_DSS_WITH_AES_128_CBC_SHA: CipherSuite;
        public static TLS_DHE_RSA_WITH_AES_128_CBC_SHA: CipherSuite;
        public static TLS_DH_anon_WITH_AES_128_CBC_SHA: CipherSuite;
        public static TLS_RSA_WITH_AES_256_CBC_SHA: CipherSuite;
        public static TLS_DHE_DSS_WITH_AES_256_CBC_SHA: CipherSuite;
        public static TLS_DHE_RSA_WITH_AES_256_CBC_SHA: CipherSuite;
        public static TLS_DH_anon_WITH_AES_256_CBC_SHA: CipherSuite;
        public static TLS_RSA_WITH_NULL_SHA256: CipherSuite;
        public static TLS_RSA_WITH_AES_128_CBC_SHA256: CipherSuite;
        public static TLS_RSA_WITH_AES_256_CBC_SHA256: CipherSuite;
        public static TLS_DHE_DSS_WITH_AES_128_CBC_SHA256: CipherSuite;
        public static TLS_RSA_WITH_CAMELLIA_128_CBC_SHA: CipherSuite;
        public static TLS_DHE_DSS_WITH_CAMELLIA_128_CBC_SHA: CipherSuite;
        public static TLS_DHE_RSA_WITH_CAMELLIA_128_CBC_SHA: CipherSuite;
        public static TLS_DHE_RSA_WITH_AES_128_CBC_SHA256: CipherSuite;
        public static TLS_DHE_DSS_WITH_AES_256_CBC_SHA256: CipherSuite;
        public static TLS_DHE_RSA_WITH_AES_256_CBC_SHA256: CipherSuite;
        public static TLS_DH_anon_WITH_AES_128_CBC_SHA256: CipherSuite;
        public static TLS_DH_anon_WITH_AES_256_CBC_SHA256: CipherSuite;
        public static TLS_RSA_WITH_CAMELLIA_256_CBC_SHA: CipherSuite;
        public static TLS_DHE_DSS_WITH_CAMELLIA_256_CBC_SHA: CipherSuite;
        public static TLS_DHE_RSA_WITH_CAMELLIA_256_CBC_SHA: CipherSuite;
        public static TLS_PSK_WITH_RC4_128_SHA: CipherSuite;
        public static TLS_PSK_WITH_3DES_EDE_CBC_SHA: CipherSuite;
        public static TLS_PSK_WITH_AES_128_CBC_SHA: CipherSuite;
        public static TLS_PSK_WITH_AES_256_CBC_SHA: CipherSuite;
        public static TLS_RSA_WITH_SEED_CBC_SHA: CipherSuite;
        public static TLS_RSA_WITH_AES_128_GCM_SHA256: CipherSuite;
        public static TLS_RSA_WITH_AES_256_GCM_SHA384: CipherSuite;
        public static TLS_DHE_RSA_WITH_AES_128_GCM_SHA256: CipherSuite;
        public static TLS_DHE_RSA_WITH_AES_256_GCM_SHA384: CipherSuite;
        public static TLS_DHE_DSS_WITH_AES_128_GCM_SHA256: CipherSuite;
        public static TLS_DHE_DSS_WITH_AES_256_GCM_SHA384: CipherSuite;
        public static TLS_DH_anon_WITH_AES_128_GCM_SHA256: CipherSuite;
        public static TLS_DH_anon_WITH_AES_256_GCM_SHA384: CipherSuite;
        public static TLS_EMPTY_RENEGOTIATION_INFO_SCSV: CipherSuite;
        public static TLS_FALLBACK_SCSV: CipherSuite;
        public static TLS_ECDH_ECDSA_WITH_NULL_SHA: CipherSuite;
        public static TLS_ECDH_ECDSA_WITH_RC4_128_SHA: CipherSuite;
        public static TLS_ECDH_ECDSA_WITH_3DES_EDE_CBC_SHA: CipherSuite;
        public static TLS_ECDH_ECDSA_WITH_AES_128_CBC_SHA: CipherSuite;
        public static TLS_ECDH_ECDSA_WITH_AES_256_CBC_SHA: CipherSuite;
        public static TLS_ECDHE_ECDSA_WITH_NULL_SHA: CipherSuite;
        public static TLS_ECDHE_ECDSA_WITH_RC4_128_SHA: CipherSuite;
        public static TLS_ECDHE_ECDSA_WITH_3DES_EDE_CBC_SHA: CipherSuite;
        public static TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA: CipherSuite;
        public static TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA: CipherSuite;
        public static TLS_ECDH_RSA_WITH_NULL_SHA: CipherSuite;
        public static TLS_ECDH_RSA_WITH_RC4_128_SHA: CipherSuite;
        public static TLS_ECDH_RSA_WITH_3DES_EDE_CBC_SHA: CipherSuite;
        public static TLS_ECDH_RSA_WITH_AES_128_CBC_SHA: CipherSuite;
        public static TLS_ECDH_RSA_WITH_AES_256_CBC_SHA: CipherSuite;
        public static TLS_ECDHE_RSA_WITH_NULL_SHA: CipherSuite;
        public static TLS_ECDHE_RSA_WITH_RC4_128_SHA: CipherSuite;
        public static TLS_ECDHE_RSA_WITH_3DES_EDE_CBC_SHA: CipherSuite;
        public static TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA: CipherSuite;
        public static TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA: CipherSuite;
        public static TLS_ECDH_anon_WITH_NULL_SHA: CipherSuite;
        public static TLS_ECDH_anon_WITH_RC4_128_SHA: CipherSuite;
        public static TLS_ECDH_anon_WITH_3DES_EDE_CBC_SHA: CipherSuite;
        public static TLS_ECDH_anon_WITH_AES_128_CBC_SHA: CipherSuite;
        public static TLS_ECDH_anon_WITH_AES_256_CBC_SHA: CipherSuite;
        public static TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256: CipherSuite;
        public static TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA384: CipherSuite;
        public static TLS_ECDH_ECDSA_WITH_AES_128_CBC_SHA256: CipherSuite;
        public static TLS_ECDH_ECDSA_WITH_AES_256_CBC_SHA384: CipherSuite;
        public static TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256: CipherSuite;
        public static TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA384: CipherSuite;
        public static TLS_ECDH_RSA_WITH_AES_128_CBC_SHA256: CipherSuite;
        public static TLS_ECDH_RSA_WITH_AES_256_CBC_SHA384: CipherSuite;
        public static TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256: CipherSuite;
        public static TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384: CipherSuite;
        public static TLS_ECDH_ECDSA_WITH_AES_128_GCM_SHA256: CipherSuite;
        public static TLS_ECDH_ECDSA_WITH_AES_256_GCM_SHA384: CipherSuite;
        public static TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256: CipherSuite;
        public static TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384: CipherSuite;
        public static TLS_ECDH_RSA_WITH_AES_128_GCM_SHA256: CipherSuite;
        public static TLS_ECDH_RSA_WITH_AES_256_GCM_SHA384: CipherSuite;
        public static TLS_ECDHE_PSK_WITH_AES_128_CBC_SHA: CipherSuite;
        public static TLS_ECDHE_PSK_WITH_AES_256_CBC_SHA: CipherSuite;
        public static TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256: CipherSuite;
        public static TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256: CipherSuite;
        public static TLS_DHE_RSA_WITH_CHACHA20_POLY1305_SHA256: CipherSuite;
        public static TLS_ECDHE_PSK_WITH_CHACHA20_POLY1305_SHA256: CipherSuite;
        public static TLS_AES_128_GCM_SHA256: CipherSuite;
        public static TLS_AES_256_GCM_SHA384: CipherSuite;
        public static TLS_CHACHA20_POLY1305_SHA256: CipherSuite;
        public static TLS_AES_128_CCM_SHA256: CipherSuite;
        public static TLS_AES_256_CCM_8_SHA256: CipherSuite;
        public javaName(): string;
        public static forJavaName(param0: string): CipherSuite;
        public toString(): string;
    }
}

declare namespace okhttp3 {
    export class Connection {
        public static class: java.lang.Class<Connection>;
        /**
         * Constructs a new instance of the okhttp3.Connection interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
         */
        public constructor(implementation: { route(): Route; socket(): java.net.Socket; handshake(): Handshake; protocol(): Protocol });
        public constructor();
        public route(): Route;
        public protocol(): Protocol;
        public handshake(): Handshake;
        public socket(): java.net.Socket;
    }
}

declare namespace okhttp3 {
    export class ConnectionPool {
        public static class: java.lang.Class<ConnectionPool>;
        public constructor();
        public connectionCount(): number;
        public evictAll(): void;
        public idleConnectionCount(): number;
        public constructor(param0: number, param1: number, param2: java.util.concurrent.TimeUnit);
    }
}

declare namespace okhttp3 {
    export class ConnectionSpec {
        public static class: java.lang.Class<ConnectionSpec>;
        public static RESTRICTED_TLS: ConnectionSpec;
        public static MODERN_TLS: ConnectionSpec;
        public static COMPATIBLE_TLS: ConnectionSpec;
        public static CLEARTEXT: ConnectionSpec;
        public cipherSuites(): java.util.List<CipherSuite>;
        public equals(param0: any): boolean;
        public tlsVersions(): java.util.List<TlsVersion>;
        public supportsTlsExtensions(): boolean;
        public hashCode(): number;
        public isCompatible(param0: javax.net.ssl.SSLSocket): boolean;
        public isTls(): boolean;
        public toString(): string;
    }
    export namespace ConnectionSpec {
        export class Builder {
            public static class: java.lang.Class<Builder>;
            public tlsVersions(param0: native.Array<string>): Builder;
            public cipherSuites(param0: native.Array<string>): Builder;
            public build(): ConnectionSpec;
            public constructor(param0: ConnectionSpec);
            public cipherSuites(param0: native.Array<CipherSuite>): Builder;
            public supportsTlsExtensions(param0: boolean): Builder;
            public allEnabledCipherSuites(): Builder;
            public tlsVersions(param0: native.Array<TlsVersion>): Builder;
            public allEnabledTlsVersions(): Builder;
        }
    }
}

declare namespace okhttp3 {
    export class Cookie {
        public static class: java.lang.Class<Cookie>;
        public domain(): string;
        public equals(param0: any): boolean;
        public matches(param0: HttpUrl): boolean;
        public static parseAll(param0: HttpUrl, param1: Headers): java.util.List<Cookie>;
        public toString(): string;
        public persistent(): boolean;
        public httpOnly(): boolean;
        public static parse(param0: HttpUrl, param1: string): Cookie;
        public hostOnly(): boolean;
        public expiresAt(): number;
        public hashCode(): number;
        public name(): string;
        public path(): string;
        public secure(): boolean;
        public value(): string;
    }
    export namespace Cookie {
        export class Builder {
            public static class: java.lang.Class<Builder>;
            public domain(param0: string): Builder;
            public hostOnlyDomain(param0: string): Builder;
            public value(param0: string): Builder;
            public httpOnly(): Builder;
            public secure(): Builder;
            public expiresAt(param0: number): Builder;
            public build(): Cookie;
            public name(param0: string): Builder;
            public constructor();
            public path(param0: string): Builder;
        }
    }
}

declare namespace okhttp3 {
    export class CookieJar {
        public static class: java.lang.Class<CookieJar>;
        /**
         * Constructs a new instance of the okhttp3.CookieJar interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
         */
        public constructor(implementation: { saveFromResponse(param0: HttpUrl, param1: java.util.List<Cookie>): void; loadForRequest(param0: HttpUrl): java.util.List<Cookie>; <clinit>(): void });
        public constructor();
        public static NO_COOKIES: CookieJar;
        public loadForRequest(param0: HttpUrl): java.util.List<Cookie>;
        public saveFromResponse(param0: HttpUrl, param1: java.util.List<Cookie>): void;
    }
}

declare namespace okhttp3 {
    export class Credentials {
        public static class: java.lang.Class<Credentials>;
        public static basic(param0: string, param1: string, param2: java.nio.charset.Charset): string;
        public static basic(param0: string, param1: string): string;
    }
}

declare namespace okhttp3 {
    export class Dispatcher {
        public static class: java.lang.Class<Dispatcher>;
        public constructor();
        public setMaxRequestsPerHost(param0: number): void;
        public constructor(param0: java.util.concurrent.ExecutorService);
        public queuedCallsCount(): number;
        public runningCallsCount(): number;
        public runningCalls(): java.util.List<Call>;
        public cancelAll(): void;
        public queuedCalls(): java.util.List<Call>;
        public setMaxRequests(param0: number): void;
        public getMaxRequestsPerHost(): number;
        public executorService(): java.util.concurrent.ExecutorService;
        public setIdleCallback(param0: java.lang.Runnable): void;
        public getMaxRequests(): number;
    }
}

declare namespace okhttp3 {
    export class Dns {
        public static class: java.lang.Class<Dns>;
        /**
         * Constructs a new instance of the okhttp3.Dns interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
         */
        public constructor(implementation: { lookup(param0: string): java.util.List<java.net.InetAddress>; <clinit>(): void });
        public constructor();
        public static SYSTEM: Dns;
        public lookup(param0: string): java.util.List<java.net.InetAddress>;
    }
}

declare namespace okhttp3 {
    export abstract class EventListener {
        public static class: java.lang.Class<EventListener>;
        public static NONE: EventListener;
        public constructor();
        public connectFailed(param0: Call, param1: java.net.InetSocketAddress, param2: java.net.Proxy, param3: Protocol, param4: java.io.IOException): void;
        public callStart(param0: Call): void;
        public connectionReleased(param0: Call, param1: Connection): void;
        public dnsEnd(param0: Call, param1: string, param2: java.util.List<java.net.InetAddress>): void;
        public responseBodyEnd(param0: Call, param1: number): void;
        public callEnd(param0: Call): void;
        public secureConnectStart(param0: Call): void;
        public responseHeadersEnd(param0: Call, param1: Response): void;
        public secureConnectEnd(param0: Call, param1: Handshake): void;
        public dnsStart(param0: Call, param1: string): void;
        public connectionAcquired(param0: Call, param1: Connection): void;
        public connectEnd(param0: Call, param1: java.net.InetSocketAddress, param2: java.net.Proxy, param3: Protocol): void;
        public requestHeadersEnd(param0: Call, param1: Request): void;
        public responseBodyStart(param0: Call): void;
        public connectStart(param0: Call, param1: java.net.InetSocketAddress, param2: java.net.Proxy): void;
        public requestBodyEnd(param0: Call, param1: number): void;
        public callFailed(param0: Call, param1: java.io.IOException): void;
        public requestHeadersStart(param0: Call): void;
        public requestBodyStart(param0: Call): void;
        public responseHeadersStart(param0: Call): void;
    }
    export namespace EventListener {
        export class Factory {
            public static class: java.lang.Class<Factory>;
            /**
             * Constructs a new instance of the okhttp3.EventListener$Factory interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
             */
            public constructor(implementation: { create(param0: Call): EventListener });
            public constructor();
            public create(param0: Call): EventListener;
        }
    }
}

declare namespace okhttp3 {
    export class FormBody extends RequestBody {
        public static class: java.lang.Class<FormBody>;
        public value(param0: number): string;
        public encodedValue(param0: number): string;
        public name(param0: number): string;
        public size(): number;
        public encodedName(param0: number): string;
        public contentType(): MediaType;
        public writeTo(param0: okio.BufferedSink): void;
        public contentLength(): number;
    }
    export namespace FormBody {
        export class Builder {
            public static class: java.lang.Class<Builder>;
            public constructor(param0: java.nio.charset.Charset);
            public addEncoded(param0: string, param1: string): Builder;
            public constructor();
            public add(param0: string, param1: string): Builder;
            public build(): FormBody;
        }
    }
}

declare namespace okhttp3 {
    export class Handshake {
        public static class: java.lang.Class<Handshake>;
        public equals(param0: any): boolean;
        public static get(param0: javax.net.ssl.SSLSession): Handshake;
        public static get(param0: TlsVersion, param1: CipherSuite, param2: java.util.List<java.security.cert.Certificate>, param3: java.util.List<java.security.cert.Certificate>): Handshake;
        public hashCode(): number;
        public localCertificates(): java.util.List<java.security.cert.Certificate>;
        public localPrincipal(): java.security.Principal;
        public tlsVersion(): TlsVersion;
        public peerCertificates(): java.util.List<java.security.cert.Certificate>;
        public peerPrincipal(): java.security.Principal;
        public cipherSuite(): CipherSuite;
    }
}

declare namespace okhttp3 {
    export class Headers {
        public static class: java.lang.Class<Headers>;
        public value(param0: number): string;
        public equals(param0: any): boolean;
        public newBuilder(): Headers.Builder;
        public toString(): string;
        public get(param0: string): string;
        public values(param0: string): java.util.List<string>;
        public names(): java.util.Set<string>;
        public static of(param0: java.util.Map<string, string>): Headers;
        public name(param0: number): string;
        public size(): number;
        public hashCode(): number;
        public toMultimap(): java.util.Map<string, java.util.List<string>>;
        public getDate(param0: string): java.util.Date;
        public byteCount(): number;
        public static of(param0: native.Array<string>): Headers;
    }
    export namespace Headers {
        export class Builder {
            public static class: java.lang.Class<Builder>;
            public get(param0: string): string;
            public build(): Headers;
            public add(param0: string, param1: string): Builder;
            public removeAll(param0: string): Builder;
            public set(param0: string, param1: string): Builder;
            public set(param0: string, param1: java.util.Date): Builder;
            public constructor();
            public addAll(param0: Headers): Builder;
            public add(param0: string): Builder;
            public addUnsafeNonAscii(param0: string, param1: string): Builder;
            public add(param0: string, param1: java.util.Date): Builder;
        }
    }
}

declare namespace okhttp3 {
    export class HttpUrl {
        public static class: java.lang.Class<HttpUrl>;
        public static get(param0: java.net.URI): HttpUrl;
        public equals(param0: any): boolean;
        public topPrivateDomain(): string;
        public queryParameterName(param0: number): string;
        public static defaultPort(param0: string): number;
        public scheme(): string;
        public queryParameterNames(): java.util.Set<string>;
        public encodedPassword(): string;
        public queryParameter(param0: string): string;
        public query(): string;
        public password(): string;
        public hashCode(): number;
        public static get(param0: string): HttpUrl;
        public resolve(param0: string): HttpUrl;
        public pathSize(): number;
        public isHttps(): boolean;
        public encodedPathSegments(): java.util.List<string>;
        public newBuilder(): HttpUrl.Builder;
        public port(): number;
        public encodedQuery(): string;
        public encodedPath(): string;
        public encodedFragment(): string;
        public redact(): string;
        public fragment(): string;
        public toString(): string;
        public uri(): java.net.URI;
        public queryParameterValue(param0: number): string;
        public encodedUsername(): string;
        public queryParameterValues(param0: string): java.util.List<string>;
        public newBuilder(param0: string): HttpUrl.Builder;
        public host(): string;
        public static get(param0: java.net.URL): HttpUrl;
        public pathSegments(): java.util.List<string>;
        public static parse(param0: string): HttpUrl;
        public url(): java.net.URL;
        public querySize(): number;
        public username(): string;
    }
    export namespace HttpUrl {
        export class Builder {
            public static class: java.lang.Class<Builder>;
            public addPathSegment(param0: string): Builder;
            public addEncodedPathSegment(param0: string): Builder;
            public setEncodedQueryParameter(param0: string, param1: string): Builder;
            public setQueryParameter(param0: string, param1: string): Builder;
            public encodedFragment(param0: string): Builder;
            public username(param0: string): Builder;
            public addPathSegments(param0: string): Builder;
            public encodedPath(param0: string): Builder;
            public encodedPassword(param0: string): Builder;
            public addEncodedPathSegments(param0: string): Builder;
            public encodedQuery(param0: string): Builder;
            public host(param0: string): Builder;
            public removeAllEncodedQueryParameters(param0: string): Builder;
            public setEncodedPathSegment(param0: number, param1: string): Builder;
            public constructor();
            public encodedUsername(param0: string): Builder;
            public password(param0: string): Builder;
            public port(param0: number): Builder;
            public toString(): string;
            public addQueryParameter(param0: string, param1: string): Builder;
            public addEncodedQueryParameter(param0: string, param1: string): Builder;
            public query(param0: string): Builder;
            public setPathSegment(param0: number, param1: string): Builder;
            public removeAllQueryParameters(param0: string): Builder;
            public scheme(param0: string): Builder;
            public removePathSegment(param0: number): Builder;
            public fragment(param0: string): Builder;
            public build(): HttpUrl;
        }
    }
}

declare namespace okhttp3 {
    export class Interceptor {
        public static class: java.lang.Class<Interceptor>;
        /**
         * Constructs a new instance of the okhttp3.Interceptor interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
         */
        public constructor(implementation: { intercept(param0: Interceptor.Chain): Response });
        public constructor();
        public intercept(param0: Interceptor.Chain): Response;
    }
    export namespace Interceptor {
        export class Chain {
            public static class: java.lang.Class<Chain>;
            /**
             * Constructs a new instance of the okhttp3.Interceptor$Chain interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
             */
            public constructor(implementation: {
                request(): Request;
                proceed(param0: Request): Response;
                connection(): Connection;
                call(): Call;
                connectTimeoutMillis(): number;
                withConnectTimeout(param0: number, param1: java.util.concurrent.TimeUnit): Chain;
                readTimeoutMillis(): number;
                withReadTimeout(param0: number, param1: java.util.concurrent.TimeUnit): Chain;
                writeTimeoutMillis(): number;
                withWriteTimeout(param0: number, param1: java.util.concurrent.TimeUnit): Chain;
            });
            public constructor();
            public request(): Request;
            public withConnectTimeout(param0: number, param1: java.util.concurrent.TimeUnit): Chain;
            public call(): Call;
            public withWriteTimeout(param0: number, param1: java.util.concurrent.TimeUnit): Chain;
            public readTimeoutMillis(): number;
            public withReadTimeout(param0: number, param1: java.util.concurrent.TimeUnit): Chain;
            public proceed(param0: Request): Response;
            public connection(): Connection;
            public connectTimeoutMillis(): number;
            public writeTimeoutMillis(): number;
        }
    }
}

declare namespace okhttp3 {
    export class MediaType {
        public static class: java.lang.Class<MediaType>;
        public type(): string;
        public charset(): java.nio.charset.Charset;
        public equals(param0: any): boolean;
        public subtype(): string;
        public static get(param0: string): MediaType;
        public charset(param0: java.nio.charset.Charset): java.nio.charset.Charset;
        public hashCode(): number;
        public static parse(param0: string): MediaType;
        public toString(): string;
    }
}

declare namespace okhttp3 {
    export class MultipartBody extends RequestBody {
        public static class: java.lang.Class<MultipartBody>;
        public static MIXED: MediaType;
        public static ALTERNATIVE: MediaType;
        public static DIGEST: MediaType;
        public static PARALLEL: MediaType;
        public static FORM: MediaType;
        public boundary(): string;
        public size(): number;
        public parts(): java.util.List<MultipartBody.Part>;
        public type(): MediaType;
        public contentType(): MediaType;
        public writeTo(param0: okio.BufferedSink): void;
        public part(param0: number): MultipartBody.Part;
        public contentLength(): number;
    }
    export namespace MultipartBody {
        export class Builder {
            public static class: java.lang.Class<Builder>;
            public setType(param0: MediaType): Builder;
            public addPart(param0: Part): Builder;
            public build(): MultipartBody;
            public addPart(param0: Headers, param1: RequestBody): Builder;
            public addPart(param0: RequestBody): Builder;
            public constructor();
            public addFormDataPart(param0: string, param1: string): Builder;
            public addFormDataPart(param0: string, param1: string, param2: RequestBody): Builder;
            public constructor(param0: string);
        }
        export class Part {
            public static class: java.lang.Class<Part>;
            public headers(): Headers;
            public static create(param0: Headers, param1: RequestBody): Part;
            public static createFormData(param0: string, param1: string, param2: RequestBody): Part;
            public static create(param0: RequestBody): Part;
            public static createFormData(param0: string, param1: string): Part;
            public body(): RequestBody;
        }
    }
}

declare namespace okhttp3 {
    export class OkHttpClient implements Call.Factory, WebSocket.Factory {
        public static class: java.lang.Class<OkHttpClient>;
        public proxy(): java.net.Proxy;
        public sslSocketFactory(): javax.net.ssl.SSLSocketFactory;
        public connectionPool(): ConnectionPool;
        public cache(): Cache;
        public certificatePinner(): CertificatePinner;
        public dispatcher(): Dispatcher;
        public protocols(): java.util.List<Protocol>;
        public dns(): Dns;
        public proxyAuthenticator(): Authenticator;
        public callTimeoutMillis(): number;
        public hostnameVerifier(): javax.net.ssl.HostnameVerifier;
        public connectTimeoutMillis(): number;
        public pingIntervalMillis(): number;
        public cookieJar(): CookieJar;
        public connectionSpecs(): java.util.List<ConnectionSpec>;
        public newBuilder(): OkHttpClient.Builder;
        public constructor();
        public proxySelector(): java.net.ProxySelector;
        public readTimeoutMillis(): number;
        public authenticator(): Authenticator;
        public followRedirects(): boolean;
        public interceptors(): java.util.List<Interceptor>;
        public writeTimeoutMillis(): number;
        public newWebSocket(param0: Request, param1: WebSocketListener): WebSocket;
        public followSslRedirects(): boolean;
        public socketFactory(): javax.net.SocketFactory;
        public retryOnConnectionFailure(): boolean;
        public networkInterceptors(): java.util.List<Interceptor>;
        public eventListenerFactory(): EventListener.Factory;
        public newCall(param0: Request): Call;
    }
    export namespace OkHttpClient {
        export class Builder {
            public static class: java.lang.Class<Builder>;
            public protocols(param0: java.util.List<Protocol>): Builder;
            public addInterceptor(param0: Interceptor): Builder;
            public connectionPool(param0: ConnectionPool): Builder;
            public interceptors(): java.util.List<Interceptor>;
            public readTimeout(param0: number, param1: java.util.concurrent.TimeUnit): Builder;
            public callTimeout(param0: number, param1: java.util.concurrent.TimeUnit): Builder;
            public dns(param0: Dns): Builder;
            public writeTimeout(param0: java.time.Duration): Builder;
            public readTimeout(param0: java.time.Duration): Builder;
            public pingInterval(param0: number, param1: java.util.concurrent.TimeUnit): Builder;
            public eventListenerFactory(param0: EventListener.Factory): Builder;
            public connectionSpecs(param0: java.util.List<ConnectionSpec>): Builder;
            public build(): OkHttpClient;
            public sslSocketFactory(param0: javax.net.ssl.SSLSocketFactory): Builder;
            public eventListener(param0: EventListener): Builder;
            public proxyAuthenticator(param0: Authenticator): Builder;
            public followRedirects(param0: boolean): Builder;
            public networkInterceptors(): java.util.List<Interceptor>;
            public cache(param0: Cache): Builder;
            public sslSocketFactory(param0: javax.net.ssl.SSLSocketFactory, param1: javax.net.ssl.X509TrustManager): Builder;
            public callTimeout(param0: java.time.Duration): Builder;
            public cookieJar(param0: CookieJar): Builder;
            public connectTimeout(param0: number, param1: java.util.concurrent.TimeUnit): Builder;
            public pingInterval(param0: java.time.Duration): Builder;
            public followSslRedirects(param0: boolean): Builder;
            public constructor();
            public connectTimeout(param0: java.time.Duration): Builder;
            public dispatcher(param0: Dispatcher): Builder;
            public proxySelector(param0: java.net.ProxySelector): Builder;
            public socketFactory(param0: javax.net.SocketFactory): Builder;
            public retryOnConnectionFailure(param0: boolean): Builder;
            public writeTimeout(param0: number, param1: java.util.concurrent.TimeUnit): Builder;
            public addNetworkInterceptor(param0: Interceptor): Builder;
            public hostnameVerifier(param0: javax.net.ssl.HostnameVerifier): Builder;
            public authenticator(param0: Authenticator): Builder;
            public proxy(param0: java.net.Proxy): Builder;
            public certificatePinner(param0: CertificatePinner): Builder;
        }
    }
}

declare namespace okhttp3 {
    export class Protocol {
        public static class: java.lang.Class<Protocol>;
        public static HTTP_1_0: Protocol;
        public static HTTP_1_1: Protocol;
        public static SPDY_3: Protocol;
        public static HTTP_2: Protocol;
        public static H2_PRIOR_KNOWLEDGE: Protocol;
        public static QUIC: Protocol;
        public static valueOf(param0: string): Protocol;
        public static get(param0: string): Protocol;
        public static values(): native.Array<Protocol>;
        public toString(): string;
    }
}

declare namespace okhttp3 {
    export class RealCall extends Call {
        public static class: java.lang.Class<RealCall>;
        public clone(): RealCall;
        public isExecuted(): boolean;
        public clone(): Call;
        public request(): Request;
        public execute(): Response;
        public isCanceled(): boolean;
        public enqueue(param0: Callback): void;
        public cancel(): void;
        public timeout(): okio.Timeout;
    }
    export namespace RealCall {
        export class AsyncCall extends internal.NamedRunnable {
            public static class: java.lang.Class<AsyncCall>;
            public execute(): void;
        }
    }
}

declare namespace okhttp3 {
    export class Request {
        public static class: java.lang.Class<Request>;
        public header(param0: string): string;
        public headers(): Headers;
        public tag(): any;
        public newBuilder(): Request.Builder;
        public headers(param0: string): java.util.List<string>;
        public url(): HttpUrl;
        public tag(param0: java.lang.Class): any;
        public cacheControl(): CacheControl;
        public method(): string;
        public toString(): string;
        public body(): RequestBody;
        public isHttps(): boolean;
    }
    export namespace Request {
        export class Builder {
            public static class: java.lang.Class<Builder>;
            public tag(param0: java.lang.Class, param1: any): Builder;
            public url(param0: HttpUrl): Builder;
            public tag(param0: any): Builder;
            public url(param0: java.net.URL): Builder;
            public header(param0: string, param1: string): Builder;
            public headers(param0: Headers): Builder;
            public put(param0: RequestBody): Builder;
            public delete(): Builder;
            public get(): Builder;
            public constructor();
            public addHeader(param0: string, param1: string): Builder;
            public post(param0: RequestBody): Builder;
            public delete(param0: RequestBody): Builder;
            public patch(param0: RequestBody): Builder;
            public build(): Request;
            public method(param0: string, param1: RequestBody): Builder;
            public url(param0: string): Builder;
            public removeHeader(param0: string): Builder;
            public cacheControl(param0: CacheControl): Builder;
            public head(): Builder;
        }
    }
}

declare namespace okhttp3 {
    export abstract class RequestBody {
        public static class: java.lang.Class<RequestBody>;
        public constructor();
        public static create(param0: MediaType, param1: okio.ByteString): RequestBody;
        public static create(param0: MediaType, param1: java.io.File): RequestBody;
        public static create(param0: MediaType, param1: string): RequestBody;
        public contentType(): MediaType;
        public writeTo(param0: okio.BufferedSink): void;
        public static create(param0: MediaType, param1: native.Array<number>): RequestBody;
        public contentLength(): number;
        public static create(param0: MediaType, param1: native.Array<number>, param2: number, param3: number): RequestBody;
    }
}

declare namespace okhttp3 {
    export class Response {
        public static class: java.lang.Class<Response>;
        public headers(): Headers;
        public priorResponse(): Response;
        public close(): void;
        public cacheResponse(): Response;
        public sentRequestAtMillis(): number;
        public cacheControl(): CacheControl;
        public toString(): string;
        public handshake(): Handshake;
        public peekBody(param0: number): ResponseBody;
        public isSuccessful(): boolean;
        public header(param0: string): string;
        public header(param0: string, param1: string): string;
        public body(): ResponseBody;
        public networkResponse(): Response;
        public headers(param0: string): java.util.List<string>;
        public newBuilder(): Response.Builder;
        public request(): Request;
        public code(): number;
        public protocol(): Protocol;
        public message(): string;
        public challenges(): java.util.List<Challenge>;
        public receivedResponseAtMillis(): number;
        public isRedirect(): boolean;
    }
    export namespace Response {
        export class Builder {
            public static class: java.lang.Class<Builder>;
            public cacheResponse(param0: Response): Builder;
            public body(param0: ResponseBody): Builder;
            public message(param0: string): Builder;
            public request(param0: Request): Builder;
            public header(param0: string, param1: string): Builder;
            public headers(param0: Headers): Builder;
            public sentRequestAtMillis(param0: number): Builder;
            public priorResponse(param0: Response): Builder;
            public networkResponse(param0: Response): Builder;
            public constructor();
            public removeHeader(param0: string): Builder;
            public handshake(param0: Handshake): Builder;
            public addHeader(param0: string, param1: string): Builder;
            public code(param0: number): Builder;
            public build(): Response;
            public protocol(param0: Protocol): Builder;
            public receivedResponseAtMillis(param0: number): Builder;
        }
    }
}

declare namespace okhttp3 {
    export abstract class ResponseBody {
        public static class: java.lang.Class<ResponseBody>;
        public constructor();
        public byteStream(): java.io.InputStream;
        public bytes(): native.Array<number>;
        public static create(param0: MediaType, param1: native.Array<number>): ResponseBody;
        public static create(param0: MediaType, param1: number, param2: okio.BufferedSource): ResponseBody;
        public close(): void;
        public source(): okio.BufferedSource;
        public static create(param0: MediaType, param1: okio.ByteString): ResponseBody;
        public static create(param0: MediaType, param1: string): ResponseBody;
        public charStream(): java.io.Reader;
        public contentType(): MediaType;
        public string(): string;
        public contentLength(): number;
    }
    export namespace ResponseBody {
        export class BomAwareReader {
            public static class: java.lang.Class<BomAwareReader>;
            public read(param0: native.Array<string>, param1: number, param2: number): number;
            public close(): void;
        }
    }
}

declare namespace okhttp3 {
    export class Route {
        public static class: java.lang.Class<Route>;
        public proxy(): java.net.Proxy;
        public constructor(param0: Address, param1: java.net.Proxy, param2: java.net.InetSocketAddress);
        public equals(param0: any): boolean;
        public address(): Address;
        public hashCode(): number;
        public toString(): string;
        public requiresTunnel(): boolean;
        public socketAddress(): java.net.InetSocketAddress;
    }
}

declare namespace okhttp3 {
    export class TlsVersion {
        public static class: java.lang.Class<TlsVersion>;
        public static TLS_1_3: TlsVersion;
        public static TLS_1_2: TlsVersion;
        public static TLS_1_1: TlsVersion;
        public static TLS_1_0: TlsVersion;
        public static SSL_3_0: TlsVersion;
        public javaName(): string;
        public static values(): native.Array<TlsVersion>;
        public static valueOf(param0: string): TlsVersion;
        public static forJavaName(param0: string): TlsVersion;
    }
}

declare namespace okhttp3 {
    export class WebSocket {
        public static class: java.lang.Class<WebSocket>;
        /**
         * Constructs a new instance of the okhttp3.WebSocket interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
         */
        public constructor(implementation: {
            request(): Request;
            queueSize(): number;
            send(param0: string): boolean;
            send(param0: okio.ByteString): boolean;
            close(param0: number, param1: string): boolean;
            cancel(): void;
        });
        public constructor();
        public send(param0: string): boolean;
        public send(param0: okio.ByteString): boolean;
        public close(param0: number, param1: string): boolean;
        public request(): Request;
        public queueSize(): number;
        public cancel(): void;
    }
    export namespace WebSocket {
        export class Factory {
            public static class: java.lang.Class<Factory>;
            /**
             * Constructs a new instance of the okhttp3.WebSocket$Factory interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
             */
            public constructor(implementation: { newWebSocket(param0: Request, param1: WebSocketListener): WebSocket });
            public constructor();
            public newWebSocket(param0: Request, param1: WebSocketListener): WebSocket;
        }
    }
}

declare namespace okhttp3 {
    export abstract class WebSocketListener {
        public static class: java.lang.Class<WebSocketListener>;
        public constructor();
        public onClosed(param0: WebSocket, param1: number, param2: string): void;
        public onMessage(param0: WebSocket, param1: okio.ByteString): void;
        public onFailure(param0: WebSocket, param1: java.lang.Throwable, param2: Response): void;
        public onOpen(param0: WebSocket, param1: Response): void;
        public onClosing(param0: WebSocket, param1: number, param2: string): void;
        public onMessage(param0: WebSocket, param1: string): void;
    }
}

declare namespace okhttp3 {
    export namespace internal {
        export abstract class Internal {
            public static class: java.lang.Class<Internal>;
            public static instance: Internal;
            public code(param0: Response.Builder): number;
            public addLenient(param0: Headers.Builder, param1: string): void;
            public connectionBecameIdle(param0: ConnectionPool, param1: connection.RealConnection): boolean;
            public setCache(param0: OkHttpClient.Builder, param1: cache.InternalCache): void;
            public equalsNonHost(param0: Address, param1: Address): boolean;
            public isInvalidHttpUrlHost(param0: java.lang.IllegalArgumentException): boolean;
            public newWebSocketCall(param0: OkHttpClient, param1: Request): Call;
            public constructor();
            public apply(param0: ConnectionSpec, param1: javax.net.ssl.SSLSocket, param2: boolean): void;
            public put(param0: ConnectionPool, param1: connection.RealConnection): void;
            public routeDatabase(param0: ConnectionPool): connection.RouteDatabase;
            public static initializeInstanceForTests(): void;
            public addLenient(param0: Headers.Builder, param1: string, param2: string): void;
            public deduplicate(param0: ConnectionPool, param1: Address, param2: connection.StreamAllocation): java.net.Socket;
            public timeoutExit(param0: Call, param1: java.io.IOException): java.io.IOException;
            public get(param0: ConnectionPool, param1: Address, param2: connection.StreamAllocation, param3: Route): connection.RealConnection;
            public streamAllocation(param0: Call): connection.StreamAllocation;
        }
    }
}

declare namespace okhttp3 {
    export namespace internal {
        export abstract class NamedRunnable {
            public static class: java.lang.Class<NamedRunnable>;
            public name: string;
            public execute(): void;
            public constructor(param0: string, param1: native.Array<any>);
            public run(): void;
        }
    }
}

declare namespace okhttp3 {
    export namespace internal {
        export class Util {
            public static class: java.lang.Class<Util>;
            public static EMPTY_BYTE_ARRAY: native.Array<number>;
            public static EMPTY_STRING_ARRAY: native.Array<string>;
            public static EMPTY_RESPONSE: ResponseBody;
            public static EMPTY_REQUEST: RequestBody;
            public static UTF_8: java.nio.charset.Charset;
            public static ISO_8859_1: java.nio.charset.Charset;
            public static UTC: java.util.TimeZone;
            public static NATURAL_ORDER: java.util.Comparator<string>;
            public static checkOffsetAndCount(param0: number, param1: number, param2: number): void;
            public static verifyAsIpAddress(param0: string): boolean;
            public static equal(param0: any, param1: any): boolean;
            public static bomAwareCharset(param0: okio.BufferedSource, param1: java.nio.charset.Charset): java.nio.charset.Charset;
            public static platformTrustManager(): javax.net.ssl.X509TrustManager;
            public static immutableMap(param0: java.util.Map): java.util.Map;
            public static indexOf(param0: java.util.Comparator<string>, param1: native.Array<string>, param2: string): number;
            public static format(param0: string, param1: native.Array<any>): string;
            public static decodeHexDigit(param0: string): number;
            public static indexOfControlOrNonAscii(param0: string): number;
            public static immutableList(param0: native.Array<any>): java.util.List;
            public static delimiterOffset(param0: string, param1: number, param2: number, param3: string): number;
            public static closeQuietly(param0: java.io.Closeable): void;
            public static hostHeader(param0: HttpUrl, param1: boolean): string;
            public static trimSubstring(param0: string, param1: number, param2: number): string;
            public static closeQuietly(param0: java.net.Socket): void;
            public static assertionError(param0: string, param1: java.lang.Exception): java.lang.AssertionError;
            public static skipTrailingAsciiWhitespace(param0: string, param1: number, param2: number): number;
            public static checkDuration(param0: string, param1: number, param2: java.util.concurrent.TimeUnit): number;
            public static intersect(param0: java.util.Comparator<any>, param1: native.Array<string>, param2: native.Array<string>): native.Array<string>;
            public static canonicalizeHost(param0: string): string;
            public static toHeaders(param0: java.util.List<http2.Header>): Headers;
            public static concat(param0: native.Array<string>, param1: string): native.Array<string>;
            public static addSuppressedIfPossible(param0: java.lang.Throwable, param1: java.lang.Throwable): void;
            public static nonEmptyIntersection(param0: java.util.Comparator<string>, param1: native.Array<string>, param2: native.Array<string>): boolean;
            public static closeQuietly(param0: java.net.ServerSocket): void;
            public static discard(param0: okio.Source, param1: number, param2: java.util.concurrent.TimeUnit): boolean;
            public static threadFactory(param0: string, param1: boolean): java.util.concurrent.ThreadFactory;
            public static skipLeadingAsciiWhitespace(param0: string, param1: number, param2: number): number;
            public static isAndroidGetsocknameError(param0: java.lang.AssertionError): boolean;
            public static skipAll(param0: okio.Source, param1: number, param2: java.util.concurrent.TimeUnit): boolean;
            public static immutableList(param0: java.util.List): java.util.List;
        }
    }
}

declare namespace okhttp3 {
    export namespace internal {
        export class Version {
            public static class: java.lang.Class<Version>;
            public static userAgent(): string;
        }
    }
}

declare namespace okhttp3 {
    export namespace internal {
        export namespace annotations {
            export class EverythingIsNonNull {
                public static class: java.lang.Class<EverythingIsNonNull>;
                /**
                 * Constructs a new instance of the okhttp3.internal.annotations.EverythingIsNonNull interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
                 */
                public constructor(implementation: {});
                public constructor();
            }
        }
    }
}

declare namespace okhttp3 {
    export namespace internal {
        export namespace cache {
            export class CacheInterceptor extends Interceptor {
                public static class: java.lang.Class<CacheInterceptor>;
                public intercept(param0: Interceptor.Chain): Response;
                public constructor(param0: InternalCache);
            }
        }
    }
}

declare namespace okhttp3 {
    export namespace internal {
        export namespace cache {
            export class CacheRequest {
                public static class: java.lang.Class<CacheRequest>;
                /**
                 * Constructs a new instance of the okhttp3.internal.cache.CacheRequest interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
                 */
                public constructor(implementation: { body(): okio.Sink; abort(): void });
                public constructor();
                public abort(): void;
                public body(): okio.Sink;
            }
        }
    }
}

declare namespace okhttp3 {
    export namespace internal {
        export namespace cache {
            export class CacheStrategy {
                public static class: java.lang.Class<CacheStrategy>;
                public networkRequest: Request;
                public cacheResponse: Response;
                public static isCacheable(param0: Response, param1: Request): boolean;
            }
            export namespace CacheStrategy {
                export class Factory {
                    public static class: java.lang.Class<Factory>;
                    public constructor(param0: number, param1: Request, param2: Response);
                    public get(): CacheStrategy;
                }
            }
        }
    }
}

declare namespace okhttp3 {
    export namespace internal {
        export namespace cache {
            export class DiskLruCache {
                public static class: java.lang.Class<DiskLruCache>;
                public remove(param0: string): boolean;
                public close(): void;
                public snapshots(): java.util.Iterator<DiskLruCache.Snapshot>;
                public isClosed(): boolean;
                public getDirectory(): java.io.File;
                public static create(param0: io.FileSystem, param1: java.io.File, param2: number, param3: number, param4: number): DiskLruCache;
                public get(param0: string): DiskLruCache.Snapshot;
                public size(): number;
                public flush(): void;
                public setMaxSize(param0: number): void;
                public edit(param0: string): DiskLruCache.Editor;
                public initialize(): void;
                public delete(): void;
                public getMaxSize(): number;
                public evictAll(): void;
            }
            export namespace DiskLruCache {
                export class Editor {
                    public static class: java.lang.Class<Editor>;
                    public newSource(param0: number): okio.Source;
                    public commit(): void;
                    public newSink(param0: number): okio.Sink;
                    public abortUnlessCommitted(): void;
                    public abort(): void;
                }
                export class Entry {
                    public static class: java.lang.Class<Entry>;
                }
                export class Snapshot {
                    public static class: java.lang.Class<Snapshot>;
                    public close(): void;
                    public key(): string;
                    public getLength(param0: number): number;
                    public edit(): Editor;
                    public getSource(param0: number): okio.Source;
                }
            }
        }
    }
}

declare namespace okhttp3 {
    export namespace internal {
        export namespace cache {
            export class FaultHidingSink {
                public static class: java.lang.Class<FaultHidingSink>;
                public close(): void;
                public write(param0: okio.Buffer, param1: number): void;
                public flush(): void;
                public onException(param0: java.io.IOException): void;
            }
        }
    }
}

declare namespace okhttp3 {
    export namespace internal {
        export namespace cache {
            export class InternalCache {
                public static class: java.lang.Class<InternalCache>;
                /**
                 * Constructs a new instance of the okhttp3.internal.cache.InternalCache interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
                 */
                public constructor(implementation: {
                    get(param0: Request): Response;
                    put(param0: Response): CacheRequest;
                    remove(param0: Request): void;
                    update(param0: Response, param1: Response): void;
                    trackConditionalCacheHit(): void;
                    trackResponse(param0: CacheStrategy): void;
                });
                public constructor();
                public put(param0: Response): CacheRequest;
                public get(param0: Request): Response;
                public remove(param0: Request): void;
                public update(param0: Response, param1: Response): void;
                public trackConditionalCacheHit(): void;
                public trackResponse(param0: CacheStrategy): void;
            }
        }
    }
}

declare namespace okhttp3 {
    export namespace internal {
        export namespace cache2 {
            export class FileOperator {
                public static class: java.lang.Class<FileOperator>;
                public write(param0: number, param1: okio.Buffer, param2: number): void;
                public read(param0: number, param1: okio.Buffer, param2: number): void;
            }
        }
    }
}

declare namespace okhttp3 {
    export namespace internal {
        export namespace cache2 {
            export class Relay {
                public static class: java.lang.Class<Relay>;
                public newSource(): okio.Source;
                public metadata(): okio.ByteString;
                public static edit(param0: java.io.File, param1: okio.Source, param2: okio.ByteString, param3: number): Relay;
                public static read(param0: java.io.File): Relay;
            }
            export namespace Relay {
                export class RelaySource {
                    public static class: java.lang.Class<RelaySource>;
                    public close(): void;
                    public timeout(): okio.Timeout;
                    public read(param0: okio.Buffer, param1: number): number;
                }
            }
        }
    }
}

declare namespace okhttp3 {
    export namespace internal {
        export namespace connection {
            export class ConnectInterceptor extends Interceptor {
                public static class: java.lang.Class<ConnectInterceptor>;
                public client: OkHttpClient;
                public constructor(param0: OkHttpClient);
                public intercept(param0: Interceptor.Chain): Response;
            }
        }
    }
}

declare namespace okhttp3 {
    export namespace internal {
        export namespace connection {
            export class ConnectionSpecSelector {
                public static class: java.lang.Class<ConnectionSpecSelector>;
                public constructor(param0: java.util.List<ConnectionSpec>);
                public configureSecureSocket(param0: javax.net.ssl.SSLSocket): ConnectionSpec;
                public connectionFailed(param0: java.io.IOException): boolean;
            }
        }
    }
}

declare namespace okhttp3 {
    export namespace internal {
        export namespace connection {
            export class RealConnection extends http2.Http2Connection.Listener implements Connection {
                public static class: java.lang.Class<RealConnection>;
                public noNewStreams: boolean;
                public successCount: number;
                public allocationLimit: number;
                public allocations: java.util.List<java.lang.ref.Reference<StreamAllocation>>;
                public idleAtNanos: number;
                public onSettings(param0: http2.Http2Connection): void;
                public connect(param0: number, param1: number, param2: number, param3: number, param4: boolean, param5: Call, param6: EventListener): void;
                public isEligible(param0: Address, param1: Route): boolean;
                public protocol(): Protocol;
                public route(): Route;
                public toString(): string;
                public socket(): java.net.Socket;
                public onStream(param0: http2.Http2Stream): void;
                public constructor();
                public constructor(param0: ConnectionPool, param1: Route);
                public isHealthy(param0: boolean): boolean;
                public supportsUrl(param0: HttpUrl): boolean;
                public newWebSocketStreams(param0: StreamAllocation): ws.RealWebSocket.Streams;
                public cancel(): void;
                public isMultiplexed(): boolean;
                public static testConnection(param0: ConnectionPool, param1: Route, param2: java.net.Socket, param3: number): RealConnection;
                public handshake(): Handshake;
                public newCodec(param0: OkHttpClient, param1: Interceptor.Chain, param2: StreamAllocation): http.HttpCodec;
            }
        }
    }
}

declare namespace okhttp3 {
    export namespace internal {
        export namespace connection {
            export class RouteDatabase {
                public static class: java.lang.Class<RouteDatabase>;
                public shouldPostpone(param0: Route): boolean;
                public connected(param0: Route): void;
                public failed(param0: Route): void;
                public constructor();
            }
        }
    }
}

declare namespace okhttp3 {
    export namespace internal {
        export namespace connection {
            export class RouteException {
                public static class: java.lang.Class<RouteException>;
                public getLastConnectException(): java.io.IOException;
                public constructor(param0: java.io.IOException);
                public addConnectException(param0: java.io.IOException): void;
                public getFirstConnectException(): java.io.IOException;
            }
        }
    }
}

declare namespace okhttp3 {
    export namespace internal {
        export namespace connection {
            export class RouteSelector {
                public static class: java.lang.Class<RouteSelector>;
                public next(): RouteSelector.Selection;
                public constructor(param0: Address, param1: RouteDatabase, param2: Call, param3: EventListener);
                public hasNext(): boolean;
                public connectFailed(param0: Route, param1: java.io.IOException): void;
            }
            export namespace RouteSelector {
                export class Selection {
                    public static class: java.lang.Class<Selection>;
                    public getAll(): java.util.List<Route>;
                    public next(): Route;
                    public hasNext(): boolean;
                }
            }
        }
    }
}

declare namespace okhttp3 {
    export namespace internal {
        export namespace connection {
            export class StreamAllocation {
                public static class: java.lang.Class<StreamAllocation>;
                public address: Address;
                public call: Call;
                public eventListener: EventListener;
                public streamFinished(param0: boolean, param1: http.HttpCodec, param2: number, param3: java.io.IOException): void;
                public release(): void;
                public codec(): http.HttpCodec;
                public route(): Route;
                public toString(): string;
                public newStream(param0: OkHttpClient, param1: Interceptor.Chain, param2: boolean): http.HttpCodec;
                public releaseAndAcquire(param0: RealConnection): java.net.Socket;
                public noNewStreams(): void;
                public acquire(param0: RealConnection, param1: boolean): void;
                public cancel(): void;
                public connection(): RealConnection;
                public hasMoreRoutes(): boolean;
                public constructor(param0: ConnectionPool, param1: Address, param2: Call, param3: EventListener, param4: any);
                public streamFailed(param0: java.io.IOException): void;
            }
            export namespace StreamAllocation {
                export class StreamAllocationReference extends java.lang.ref.WeakReference<StreamAllocation> {
                    public static class: java.lang.Class<StreamAllocationReference>;
                    public callStackTrace: any;
                }
            }
        }
    }
}

declare namespace okhttp3 {
    export namespace internal {
        export namespace http {
            export class BridgeInterceptor extends Interceptor {
                public static class: java.lang.Class<BridgeInterceptor>;
                public intercept(param0: Interceptor.Chain): Response;
                public constructor(param0: CookieJar);
            }
        }
    }
}

declare namespace okhttp3 {
    export namespace internal {
        export namespace http {
            export class CallServerInterceptor extends Interceptor {
                public static class: java.lang.Class<CallServerInterceptor>;
                public intercept(param0: Interceptor.Chain): Response;
                public constructor(param0: boolean);
            }
            export namespace CallServerInterceptor {
                export class CountingSink {
                    public static class: java.lang.Class<CountingSink>;
                    public write(param0: okio.Buffer, param1: number): void;
                }
            }
        }
    }
}

declare namespace okhttp3 {
    export namespace internal {
        export namespace http {
            export class HttpCodec {
                public static class: java.lang.Class<HttpCodec>;
                /**
                 * Constructs a new instance of the okhttp3.internal.http.HttpCodec interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
                 */
                public constructor(implementation: {
                    createRequestBody(param0: Request, param1: number): okio.Sink;
                    writeRequestHeaders(param0: Request): void;
                    flushRequest(): void;
                    finishRequest(): void;
                    readResponseHeaders(param0: boolean): Response.Builder;
                    openResponseBody(param0: Response): ResponseBody;
                    cancel(): void;
                });
                public constructor();
                public static DISCARD_STREAM_TIMEOUT_MILLIS: number;
                public finishRequest(): void;
                public openResponseBody(param0: Response): ResponseBody;
                public readResponseHeaders(param0: boolean): Response.Builder;
                public cancel(): void;
                public flushRequest(): void;
                public createRequestBody(param0: Request, param1: number): okio.Sink;
                public writeRequestHeaders(param0: Request): void;
            }
        }
    }
}

declare namespace okhttp3 {
    export namespace internal {
        export namespace http {
            export class HttpDate {
                public static class: java.lang.Class<HttpDate>;
                public static MAX_DATE: number;
                public static parse(param0: string): java.util.Date;
                public static format(param0: java.util.Date): string;
            }
        }
    }
}

declare namespace okhttp3 {
    export namespace internal {
        export namespace http {
            export class HttpHeaders {
                public static class: java.lang.Class<HttpHeaders>;
                public static varyHeaders(param0: Headers, param1: Headers): Headers;
                public static hasBody(param0: Response): boolean;
                public static receiveHeaders(param0: CookieJar, param1: HttpUrl, param2: Headers): void;
                public static varyHeaders(param0: Response): Headers;
                public static varyMatches(param0: Response, param1: Headers, param2: Request): boolean;
                public static skipWhitespace(param0: string, param1: number): number;
                public static hasVaryAll(param0: Headers): boolean;
                public static contentLength(param0: Response): number;
                public static hasVaryAll(param0: Response): boolean;
                public static skipUntil(param0: string, param1: number, param2: string): number;
                public static varyFields(param0: Headers): java.util.Set<string>;
                public static contentLength(param0: Headers): number;
                public static parseChallenges(param0: Headers, param1: string): java.util.List<Challenge>;
                public static parseSeconds(param0: string, param1: number): number;
            }
        }
    }
}

declare namespace okhttp3 {
    export namespace internal {
        export namespace http {
            export class HttpMethod {
                public static class: java.lang.Class<HttpMethod>;
                public static invalidatesCache(param0: string): boolean;
                public static requiresRequestBody(param0: string): boolean;
                public static permitsRequestBody(param0: string): boolean;
                public static redirectsWithBody(param0: string): boolean;
                public static redirectsToGet(param0: string): boolean;
            }
        }
    }
}

declare namespace okhttp3 {
    export namespace internal {
        export namespace http {
            export class RealInterceptorChain extends Interceptor.Chain {
                public static class: java.lang.Class<RealInterceptorChain>;
                public request(): Request;
                public httpStream(): HttpCodec;
                public connectTimeoutMillis(): number;
                public constructor(
                    param0: java.util.List<Interceptor>,
                    param1: connection.StreamAllocation,
                    param2: HttpCodec,
                    param3: connection.RealConnection,
                    param4: number,
                    param5: Request,
                    param6: Call,
                    param7: EventListener,
                    param8: number,
                    param9: number,
                    param10: number
                );
                public proceed(param0: Request, param1: connection.StreamAllocation, param2: HttpCodec, param3: connection.RealConnection): Response;
                public withWriteTimeout(param0: number, param1: java.util.concurrent.TimeUnit): Interceptor.Chain;
                public connection(): Connection;
                public writeTimeoutMillis(): number;
                public readTimeoutMillis(): number;
                public call(): Call;
                public withConnectTimeout(param0: number, param1: java.util.concurrent.TimeUnit): Interceptor.Chain;
                public proceed(param0: Request): Response;
                public eventListener(): EventListener;
                public withReadTimeout(param0: number, param1: java.util.concurrent.TimeUnit): Interceptor.Chain;
                public streamAllocation(): connection.StreamAllocation;
            }
        }
    }
}

declare namespace okhttp3 {
    export namespace internal {
        export namespace http {
            export class RealResponseBody extends ResponseBody {
                public static class: java.lang.Class<RealResponseBody>;
                public contentLength(): number;
                public constructor(param0: string, param1: number, param2: okio.BufferedSource);
                public source(): okio.BufferedSource;
                public contentType(): MediaType;
                public constructor();
            }
        }
    }
}

declare namespace okhttp3 {
    export namespace internal {
        export namespace http {
            export class RequestLine {
                public static class: java.lang.Class<RequestLine>;
                public static requestPath(param0: HttpUrl): string;
                public static get(param0: Request, param1: java.net.Proxy.Type): string;
            }
        }
    }
}

declare namespace okhttp3 {
    export namespace internal {
        export namespace http {
            export class RetryAndFollowUpInterceptor extends Interceptor {
                public static class: java.lang.Class<RetryAndFollowUpInterceptor>;
                public isCanceled(): boolean;
                public setCallStackTrace(param0: any): void;
                public intercept(param0: Interceptor.Chain): Response;
                public constructor(param0: OkHttpClient, param1: boolean);
                public cancel(): void;
                public streamAllocation(): connection.StreamAllocation;
            }
        }
    }
}

declare namespace okhttp3 {
    export namespace internal {
        export namespace http {
            export class StatusLine {
                public static class: java.lang.Class<StatusLine>;
                public static HTTP_TEMP_REDIRECT: number;
                public static HTTP_PERM_REDIRECT: number;
                public static HTTP_CONTINUE: number;
                public protocol: Protocol;
                public code: number;
                public message: string;
                public constructor(param0: Protocol, param1: number, param2: string);
                public static parse(param0: string): StatusLine;
                public toString(): string;
                public static get(param0: Response): StatusLine;
            }
        }
    }
}

declare namespace okhttp3 {
    export namespace internal {
        export namespace http {
            export class UnrepeatableRequestBody {
                public static class: java.lang.Class<UnrepeatableRequestBody>;
                /**
                 * Constructs a new instance of the okhttp3.internal.http.UnrepeatableRequestBody interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
                 */
                public constructor(implementation: {});
                public constructor();
            }
        }
    }
}

declare namespace okhttp3 {
    export namespace internal {
        export namespace http1 {
            export class Http1Codec extends http.HttpCodec {
                public static class: java.lang.Class<Http1Codec>;
                public finishRequest(): void;
                public newFixedLengthSink(param0: number): okio.Sink;
                public newChunkedSink(): okio.Sink;
                public constructor(param0: OkHttpClient, param1: connection.StreamAllocation, param2: okio.BufferedSource, param3: okio.BufferedSink);
                public isClosed(): boolean;
                public readResponseHeaders(param0: boolean): Response.Builder;
                public writeRequestHeaders(param0: Request): void;
                public writeRequest(param0: Headers, param1: string): void;
                public openResponseBody(param0: Response): ResponseBody;
                public newUnknownLengthSource(): okio.Source;
                public readHeaders(): Headers;
                public newChunkedSource(param0: HttpUrl): okio.Source;
                public cancel(): void;
                public flushRequest(): void;
                public createRequestBody(param0: Request, param1: number): okio.Sink;
                public newFixedLengthSource(param0: number): okio.Source;
            }
            export namespace Http1Codec {
                export abstract class AbstractSource {
                    public static class: java.lang.Class<AbstractSource>;
                    public closed: boolean;
                    public bytesRead: number;
                    public endOfInput(param0: boolean, param1: java.io.IOException): void;
                    public timeout(): okio.Timeout;
                    public read(param0: okio.Buffer, param1: number): number;
                }
                export class ChunkedSink {
                    public static class: java.lang.Class<ChunkedSink>;
                    public close(): void;
                    public flush(): void;
                    public write(param0: okio.Buffer, param1: number): void;
                    public timeout(): okio.Timeout;
                }
                export class ChunkedSource extends AbstractSource {
                    public static class: java.lang.Class<ChunkedSource>;
                    public close(): void;
                    public read(param0: okio.Buffer, param1: number): number;
                }
                export class FixedLengthSink {
                    public static class: java.lang.Class<FixedLengthSink>;
                    public close(): void;
                    public flush(): void;
                    public write(param0: okio.Buffer, param1: number): void;
                    public timeout(): okio.Timeout;
                }
                export class FixedLengthSource extends AbstractSource {
                    public static class: java.lang.Class<FixedLengthSource>;
                    public close(): void;
                    public read(param0: okio.Buffer, param1: number): number;
                }
                export class UnknownLengthSource extends AbstractSource {
                    public static class: java.lang.Class<UnknownLengthSource>;
                    public close(): void;
                    public read(param0: okio.Buffer, param1: number): number;
                }
            }
        }
    }
}

declare namespace okhttp3 {
    export namespace internal {
        export namespace http2 {
            export class ConnectionShutdownException {
                public static class: java.lang.Class<ConnectionShutdownException>;
                public constructor();
            }
        }
    }
}

declare namespace okhttp3 {
    export namespace internal {
        export namespace http2 {
            export class ErrorCode {
                public static class: java.lang.Class<ErrorCode>;
                public static NO_ERROR: ErrorCode;
                public static PROTOCOL_ERROR: ErrorCode;
                public static INTERNAL_ERROR: ErrorCode;
                public static FLOW_CONTROL_ERROR: ErrorCode;
                public static REFUSED_STREAM: ErrorCode;
                public static CANCEL: ErrorCode;
                public static COMPRESSION_ERROR: ErrorCode;
                public static CONNECT_ERROR: ErrorCode;
                public static ENHANCE_YOUR_CALM: ErrorCode;
                public static INADEQUATE_SECURITY: ErrorCode;
                public static HTTP_1_1_REQUIRED: ErrorCode;
                public httpCode: number;
                public static valueOf(param0: string): ErrorCode;
                public static fromHttp2(param0: number): ErrorCode;
                public static values(): native.Array<ErrorCode>;
            }
        }
    }
}

declare namespace okhttp3 {
    export namespace internal {
        export namespace http2 {
            export class Header {
                public static class: java.lang.Class<Header>;
                public static PSEUDO_PREFIX: okio.ByteString;
                public static RESPONSE_STATUS_UTF8: string;
                public static TARGET_METHOD_UTF8: string;
                public static TARGET_PATH_UTF8: string;
                public static TARGET_SCHEME_UTF8: string;
                public static TARGET_AUTHORITY_UTF8: string;
                public static RESPONSE_STATUS: okio.ByteString;
                public static TARGET_METHOD: okio.ByteString;
                public static TARGET_PATH: okio.ByteString;
                public static TARGET_SCHEME: okio.ByteString;
                public static TARGET_AUTHORITY: okio.ByteString;
                public name: okio.ByteString;
                public value: okio.ByteString;
                public constructor(param0: okio.ByteString, param1: okio.ByteString);
                public hashCode(): number;
                public equals(param0: any): boolean;
                public constructor(param0: okio.ByteString, param1: string);
                public toString(): string;
                public constructor(param0: string, param1: string);
            }
            export namespace Header {
                export class Listener {
                    public static class: java.lang.Class<Listener>;
                    /**
                     * Constructs a new instance of the okhttp3.internal.http2.Header$Listener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
                     */
                    public constructor(implementation: { onHeaders(param0: Headers): void });
                    public constructor();
                    public onHeaders(param0: Headers): void;
                }
            }
        }
    }
}

declare namespace okhttp3 {
    export namespace internal {
        export namespace http2 {
            export class Hpack {
                public static class: java.lang.Class<Hpack>;
            }
            export namespace Hpack {
                export class Reader {
                    public static class: java.lang.Class<Reader>;
                    public getAndResetHeaderList(): java.util.List<Header>;
                }
                export class Writer {
                    public static class: java.lang.Class<Writer>;
                }
            }
        }
    }
}

declare namespace okhttp3 {
    export namespace internal {
        export namespace http2 {
            export class Http2 {
                public static class: java.lang.Class<Http2>;
            }
        }
    }
}

declare namespace okhttp3 {
    export namespace internal {
        export namespace http2 {
            export class Http2Codec extends http.HttpCodec {
                public static class: java.lang.Class<Http2Codec>;
                public finishRequest(): void;
                public static readHttp2HeadersList(param0: Headers, param1: Protocol): Response.Builder;
                public openResponseBody(param0: Response): ResponseBody;
                public readResponseHeaders(param0: boolean): Response.Builder;
                public cancel(): void;
                public constructor(param0: OkHttpClient, param1: Interceptor.Chain, param2: connection.StreamAllocation, param3: Http2Connection);
                public flushRequest(): void;
                public createRequestBody(param0: Request, param1: number): okio.Sink;
                public writeRequestHeaders(param0: Request): void;
                public static http2HeadersList(param0: Request): java.util.List<Header>;
            }
            export namespace Http2Codec {
                export class StreamFinishingSource {
                    public static class: java.lang.Class<StreamFinishingSource>;
                    public close(): void;
                    public read(param0: okio.Buffer, param1: number): number;
                }
            }
        }
    }
}

declare namespace okhttp3 {
    export namespace internal {
        export namespace http2 {
            export class Http2Connection {
                public static class: java.lang.Class<Http2Connection>;
                public maxConcurrentStreams(): number;
                public pushStream(param0: number, param1: java.util.List<Header>, param2: boolean): Http2Stream;
                public writeData(param0: number, param1: boolean, param2: okio.Buffer, param3: number): void;
                public close(): void;
                public start(): void;
                public newStream(param0: java.util.List<Header>, param1: boolean): Http2Stream;
                public isShutdown(): boolean;
                public openStreamCount(): number;
                public shutdown(param0: ErrorCode): void;
                public setSettings(param0: Settings): void;
                public getProtocol(): Protocol;
                public flush(): void;
            }
            export namespace Http2Connection {
                export class Builder {
                    public static class: java.lang.Class<Builder>;
                    public constructor(param0: boolean);
                    public listener(param0: Listener): Builder;
                    public pingIntervalMillis(param0: number): Builder;
                    public build(): Http2Connection;
                    public socket(param0: java.net.Socket, param1: string, param2: okio.BufferedSource, param3: okio.BufferedSink): Builder;
                    public socket(param0: java.net.Socket): Builder;
                    public pushObserver(param0: PushObserver): Builder;
                }
                export abstract class Listener {
                    public static class: java.lang.Class<Listener>;
                    public static REFUSE_INCOMING_STREAMS: Listener;
                    public onStream(param0: Http2Stream): void;
                    public constructor();
                    public onSettings(param0: Http2Connection): void;
                }
                export class PingRunnable extends NamedRunnable {
                    public static class: java.lang.Class<PingRunnable>;
                    public execute(): void;
                }
                export class ReaderRunnable extends NamedRunnable implements Http2Reader.Handler {
                    public static class: java.lang.Class<ReaderRunnable>;
                    public settings(param0: boolean, param1: Settings): void;
                    public alternateService(param0: number, param1: string, param2: okio.ByteString, param3: string, param4: number, param5: number): void;
                    public ackSettings(): void;
                    public data(param0: boolean, param1: number, param2: okio.BufferedSource, param3: number): void;
                    public headers(param0: boolean, param1: number, param2: number, param3: java.util.List<Header>): void;
                    public priority(param0: number, param1: number, param2: number, param3: boolean): void;
                    public execute(): void;
                    public pushPromise(param0: number, param1: number, param2: java.util.List<Header>): void;
                    public rstStream(param0: number, param1: ErrorCode): void;
                    public goAway(param0: number, param1: ErrorCode, param2: okio.ByteString): void;
                    public windowUpdate(param0: number, param1: number): void;
                    public ping(param0: boolean, param1: number, param2: number): void;
                }
            }
        }
    }
}

declare namespace okhttp3 {
    export namespace internal {
        export namespace http2 {
            export class Http2Reader {
                public static class: java.lang.Class<Http2Reader>;
                public close(): void;
                public nextFrame(param0: boolean, param1: Http2Reader.Handler): boolean;
                public readConnectionPreface(param0: Http2Reader.Handler): void;
            }
            export namespace Http2Reader {
                export class ContinuationSource {
                    public static class: java.lang.Class<ContinuationSource>;
                    public close(): void;
                    public timeout(): okio.Timeout;
                    public read(param0: okio.Buffer, param1: number): number;
                }
                export class Handler {
                    public static class: java.lang.Class<Handler>;
                    /**
                     * Constructs a new instance of the okhttp3.internal.http2.Http2Reader$Handler interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
                     */
                    public constructor(implementation: {
                        data(param0: boolean, param1: number, param2: okio.BufferedSource, param3: number): void;
                        headers(param0: boolean, param1: number, param2: number, param3: java.util.List<Header>): void;
                        rstStream(param0: number, param1: ErrorCode): void;
                        settings(param0: boolean, param1: Settings): void;
                        ackSettings(): void;
                        ping(param0: boolean, param1: number, param2: number): void;
                        goAway(param0: number, param1: ErrorCode, param2: okio.ByteString): void;
                        windowUpdate(param0: number, param1: number): void;
                        priority(param0: number, param1: number, param2: number, param3: boolean): void;
                        pushPromise(param0: number, param1: number, param2: java.util.List<Header>): void;
                        alternateService(param0: number, param1: string, param2: okio.ByteString, param3: string, param4: number, param5: number): void;
                    });
                    public constructor();
                    public settings(param0: boolean, param1: Settings): void;
                    public alternateService(param0: number, param1: string, param2: okio.ByteString, param3: string, param4: number, param5: number): void;
                    public ackSettings(): void;
                    public data(param0: boolean, param1: number, param2: okio.BufferedSource, param3: number): void;
                    public headers(param0: boolean, param1: number, param2: number, param3: java.util.List<Header>): void;
                    public priority(param0: number, param1: number, param2: number, param3: boolean): void;
                    public pushPromise(param0: number, param1: number, param2: java.util.List<Header>): void;
                    public rstStream(param0: number, param1: ErrorCode): void;
                    public goAway(param0: number, param1: ErrorCode, param2: okio.ByteString): void;
                    public windowUpdate(param0: number, param1: number): void;
                    public ping(param0: boolean, param1: number, param2: number): void;
                }
            }
        }
    }
}

declare namespace okhttp3 {
    export namespace internal {
        export namespace http2 {
            export class Http2Stream {
                public static class: java.lang.Class<Http2Stream>;
                public getSource(): okio.Source;
                public close(param0: ErrorCode): void;
                public closeLater(param0: ErrorCode): void;
                public writeTimeout(): okio.Timeout;
                public getId(): number;
                public writeHeaders(param0: java.util.List<Header>, param1: boolean): void;
                public getErrorCode(): ErrorCode;
                public takeHeaders(): Headers;
                public getConnection(): Http2Connection;
                public isOpen(): boolean;
                public readTimeout(): okio.Timeout;
                public getSink(): okio.Sink;
                public isLocallyInitiated(): boolean;
                public setHeadersListener(param0: Header.Listener): void;
            }
            export namespace Http2Stream {
                export class FramingSink {
                    public static class: java.lang.Class<FramingSink>;
                    public close(): void;
                    public flush(): void;
                    public write(param0: okio.Buffer, param1: number): void;
                    public timeout(): okio.Timeout;
                }
                export class FramingSource {
                    public static class: java.lang.Class<FramingSource>;
                    public close(): void;
                    public timeout(): okio.Timeout;
                    public read(param0: okio.Buffer, param1: number): number;
                }
                export class StreamTimeout {
                    public static class: java.lang.Class<StreamTimeout>;
                    public timedOut(): void;
                    public newTimeoutException(param0: java.io.IOException): java.io.IOException;
                    public exitAndThrowIfTimedOut(): void;
                }
            }
        }
    }
}

declare namespace okhttp3 {
    export namespace internal {
        export namespace http2 {
            export class Http2Writer {
                public static class: java.lang.Class<Http2Writer>;
                public headers(param0: number, param1: java.util.List<Header>): void;
                public close(): void;
                public synStream(param0: boolean, param1: number, param2: number, param3: java.util.List<Header>): void;
                public settings(param0: Settings): void;
                public ping(param0: boolean, param1: number, param2: number): void;
                public windowUpdate(param0: number, param1: number): void;
                public frameHeader(param0: number, param1: number, param2: number, param3: number): void;
                public maxDataLength(): number;
                public goAway(param0: number, param1: ErrorCode, param2: native.Array<number>): void;
                public flush(): void;
                public connectionPreface(): void;
                public pushPromise(param0: number, param1: number, param2: java.util.List<Header>): void;
                public data(param0: boolean, param1: number, param2: okio.Buffer, param3: number): void;
                public rstStream(param0: number, param1: ErrorCode): void;
                public synReply(param0: boolean, param1: number, param2: java.util.List<Header>): void;
                public applyAndAckSettings(param0: Settings): void;
            }
        }
    }
}

declare namespace okhttp3 {
    export namespace internal {
        export namespace http2 {
            export class Huffman {
                public static class: java.lang.Class<Huffman>;
                public static get(): Huffman;
            }
            export namespace Huffman {
                export class Node {
                    public static class: java.lang.Class<Node>;
                }
            }
        }
    }
}

declare namespace okhttp3 {
    export namespace internal {
        export namespace http2 {
            export class PushObserver {
                public static class: java.lang.Class<PushObserver>;
                /**
                 * Constructs a new instance of the okhttp3.internal.http2.PushObserver interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
                 */
                public constructor(implementation: {
                    onRequest(param0: number, param1: java.util.List<Header>): boolean;
                    onHeaders(param0: number, param1: java.util.List<Header>, param2: boolean): boolean;
                    onData(param0: number, param1: okio.BufferedSource, param2: number, param3: boolean): boolean;
                    onReset(param0: number, param1: ErrorCode): void;
                    <clinit>(): void;
                });
                public constructor();
                public static CANCEL: PushObserver;
                public onRequest(param0: number, param1: java.util.List<Header>): boolean;
                public onHeaders(param0: number, param1: java.util.List<Header>, param2: boolean): boolean;
                public onData(param0: number, param1: okio.BufferedSource, param2: number, param3: boolean): boolean;
                public onReset(param0: number, param1: ErrorCode): void;
            }
        }
    }
}

declare namespace okhttp3 {
    export namespace internal {
        export namespace http2 {
            export class Settings {
                public static class: java.lang.Class<Settings>;
                public constructor();
            }
        }
    }
}

declare namespace okhttp3 {
    export namespace internal {
        export namespace http2 {
            export class StreamResetException {
                public static class: java.lang.Class<StreamResetException>;
                public errorCode: ErrorCode;
                public constructor(param0: ErrorCode);
            }
        }
    }
}

declare namespace okhttp3 {
    export namespace internal {
        export namespace io {
            export class FileSystem {
                public static class: java.lang.Class<FileSystem>;
                /**
                 * Constructs a new instance of the okhttp3.internal.io.FileSystem interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
                 */
                public constructor(implementation: {
                    source(param0: java.io.File): okio.Source;
                    sink(param0: java.io.File): okio.Sink;
                    appendingSink(param0: java.io.File): okio.Sink;
                    delete(param0: java.io.File): void;
                    exists(param0: java.io.File): boolean;
                    size(param0: java.io.File): number;
                    rename(param0: java.io.File, param1: java.io.File): void;
                    deleteContents(param0: java.io.File): void;
                    <clinit>(): void;
                });
                public constructor();
                public static SYSTEM: FileSystem;
                public source(param0: java.io.File): okio.Source;
                public size(param0: java.io.File): number;
                public deleteContents(param0: java.io.File): void;
                public appendingSink(param0: java.io.File): okio.Sink;
                public sink(param0: java.io.File): okio.Sink;
                public exists(param0: java.io.File): boolean;
                public rename(param0: java.io.File, param1: java.io.File): void;
                public delete(param0: java.io.File): void;
            }
        }
    }
}

declare namespace okhttp3 {
    export namespace internal {
        export namespace platform {
            export class AndroidPlatform extends Platform {
                public static class: java.lang.Class<AndroidPlatform>;
                public connectSocket(param0: java.net.Socket, param1: java.net.InetSocketAddress, param2: number): void;
                public configureTlsExtensions(param0: javax.net.ssl.SSLSocket, param1: string, param2: java.util.List<Protocol>): void;
                public log(param0: number, param1: string, param2: java.lang.Throwable): void;
                public logCloseableLeak(param0: string, param1: any): void;
                public buildTrustRootIndex(param0: javax.net.ssl.X509TrustManager): tls.TrustRootIndex;
                public isCleartextTrafficPermitted(param0: string): boolean;
                public buildCertificateChainCleaner(param0: javax.net.ssl.X509TrustManager): tls.CertificateChainCleaner;
                public buildCertificateChainCleaner(param0: javax.net.ssl.SSLSocketFactory): tls.CertificateChainCleaner;
                public getSelectedProtocol(param0: javax.net.ssl.SSLSocket): string;
                public trustManager(param0: javax.net.ssl.SSLSocketFactory): javax.net.ssl.X509TrustManager;
                public getStackTraceForCloseable(param0: string): any;
                public static buildIfSupported(): Platform;
                public getSSLContext(): javax.net.ssl.SSLContext;
            }
            export namespace AndroidPlatform {
                export class AndroidCertificateChainCleaner extends tls.CertificateChainCleaner {
                    public static class: java.lang.Class<AndroidCertificateChainCleaner>;
                    public equals(param0: any): boolean;
                    public clean(param0: java.util.List<java.security.cert.Certificate>, param1: string): java.util.List<java.security.cert.Certificate>;
                    public hashCode(): number;
                }
                export class AndroidTrustRootIndex extends tls.TrustRootIndex {
                    public static class: java.lang.Class<AndroidTrustRootIndex>;
                    public equals(param0: any): boolean;
                    public findByIssuerAndSignature(param0: java.security.cert.X509Certificate): java.security.cert.X509Certificate;
                    public hashCode(): number;
                }
                export class CloseGuard {
                    public static class: java.lang.Class<CloseGuard>;
                }
            }
        }
    }
}

declare namespace okhttp3 {
    export namespace internal {
        export namespace platform {
            export class ConscryptPlatform extends Platform {
                public static class: java.lang.Class<ConscryptPlatform>;
                public static buildIfSupported(): ConscryptPlatform;
                public getSelectedProtocol(param0: javax.net.ssl.SSLSocket): string;
                public trustManager(param0: javax.net.ssl.SSLSocketFactory): javax.net.ssl.X509TrustManager;
                public configureSslSocketFactory(param0: javax.net.ssl.SSLSocketFactory): void;
                public configureTlsExtensions(param0: javax.net.ssl.SSLSocket, param1: string, param2: java.util.List<Protocol>): void;
                public getSSLContext(): javax.net.ssl.SSLContext;
            }
        }
    }
}

declare namespace okhttp3 {
    export namespace internal {
        export namespace platform {
            export class Jdk9Platform extends Platform {
                public static class: java.lang.Class<Jdk9Platform>;
                public getSelectedProtocol(param0: javax.net.ssl.SSLSocket): string;
                public trustManager(param0: javax.net.ssl.SSLSocketFactory): javax.net.ssl.X509TrustManager;
                public static buildIfSupported(): Jdk9Platform;
                public configureTlsExtensions(param0: javax.net.ssl.SSLSocket, param1: string, param2: java.util.List<Protocol>): void;
            }
        }
    }
}

declare namespace okhttp3 {
    export namespace internal {
        export namespace platform {
            export class JdkWithJettyBootPlatform extends Platform {
                public static class: java.lang.Class<JdkWithJettyBootPlatform>;
                public getSelectedProtocol(param0: javax.net.ssl.SSLSocket): string;
                public afterHandshake(param0: javax.net.ssl.SSLSocket): void;
                public configureTlsExtensions(param0: javax.net.ssl.SSLSocket, param1: string, param2: java.util.List<Protocol>): void;
                public static buildIfSupported(): Platform;
            }
            export namespace JdkWithJettyBootPlatform {
                export class JettyNegoProvider {
                    public static class: java.lang.Class<JettyNegoProvider>;
                    public invoke(param0: any, param1: java.lang.reflect.Method, param2: native.Array<any>): any;
                }
            }
        }
    }
}

declare namespace okhttp3 {
    export namespace internal {
        export namespace platform {
            export class OptionalMethod<T> extends java.lang.Object {
                public static class: java.lang.Class<OptionalMethod<any>>;
                public invokeOptional(param0: T, param1: native.Array<any>): any;
                public invokeOptionalWithoutCheckedException(param0: T, param1: native.Array<any>): any;
                public isSupported(param0: T): boolean;
                public invoke(param0: T, param1: native.Array<any>): any;
                public invokeWithoutCheckedException(param0: T, param1: native.Array<any>): any;
            }
        }
    }
}

declare namespace okhttp3 {
    export namespace internal {
        export namespace platform {
            export class Platform {
                public static class: java.lang.Class<Platform>;
                public static INFO: number;
                public static WARN: number;
                public getPrefix(): string;
                public connectSocket(param0: java.net.Socket, param1: java.net.InetSocketAddress, param2: number): void;
                public configureSslSocketFactory(param0: javax.net.ssl.SSLSocketFactory): void;
                public configureTlsExtensions(param0: javax.net.ssl.SSLSocket, param1: string, param2: java.util.List<Protocol>): void;
                public static isConscryptPreferred(): boolean;
                public log(param0: number, param1: string, param2: java.lang.Throwable): void;
                public logCloseableLeak(param0: string, param1: any): void;
                public buildTrustRootIndex(param0: javax.net.ssl.X509TrustManager): tls.TrustRootIndex;
                public toString(): string;
                public isCleartextTrafficPermitted(param0: string): boolean;
                public constructor();
                public buildCertificateChainCleaner(param0: javax.net.ssl.X509TrustManager): tls.CertificateChainCleaner;
                public buildCertificateChainCleaner(param0: javax.net.ssl.SSLSocketFactory): tls.CertificateChainCleaner;
                public getSelectedProtocol(param0: javax.net.ssl.SSLSocket): string;
                public trustManager(param0: javax.net.ssl.SSLSocketFactory): javax.net.ssl.X509TrustManager;
                public afterHandshake(param0: javax.net.ssl.SSLSocket): void;
                public static get(): Platform;
                public getStackTraceForCloseable(param0: string): any;
                public static alpnProtocolNames(param0: java.util.List<Protocol>): java.util.List<string>;
                public getSSLContext(): javax.net.ssl.SSLContext;
            }
        }
    }
}

declare namespace okhttp3 {
    export namespace internal {
        export namespace proxy {
            export class NullProxySelector {
                public static class: java.lang.Class<NullProxySelector>;
                public select(param0: java.net.URI): java.util.List<java.net.Proxy>;
                public connectFailed(param0: java.net.URI, param1: java.net.SocketAddress, param2: java.io.IOException): void;
                public constructor();
            }
        }
    }
}

declare namespace okhttp3 {
    export namespace internal {
        export namespace publicsuffix {
            export class PublicSuffixDatabase {
                public static class: java.lang.Class<PublicSuffixDatabase>;
                public static PUBLIC_SUFFIX_RESOURCE: string;
                public static get(): PublicSuffixDatabase;
                public getEffectiveTldPlusOne(param0: string): string;
                public constructor();
            }
        }
    }
}

declare namespace okhttp3 {
    export namespace internal {
        export namespace tls {
            export class BasicCertificateChainCleaner extends CertificateChainCleaner {
                public static class: java.lang.Class<BasicCertificateChainCleaner>;
                public clean(param0: java.util.List<java.security.cert.Certificate>, param1: string): java.util.List<java.security.cert.Certificate>;
                public hashCode(): number;
                public equals(param0: any): boolean;
                public constructor(param0: TrustRootIndex);
                public constructor();
            }
        }
    }
}

declare namespace okhttp3 {
    export namespace internal {
        export namespace tls {
            export class BasicTrustRootIndex extends TrustRootIndex {
                public static class: java.lang.Class<BasicTrustRootIndex>;
                public constructor(param0: native.Array<java.security.cert.X509Certificate>);
                public hashCode(): number;
                public equals(param0: any): boolean;
                public findByIssuerAndSignature(param0: java.security.cert.X509Certificate): java.security.cert.X509Certificate;
            }
        }
    }
}

declare namespace okhttp3 {
    export namespace internal {
        export namespace tls {
            export abstract class CertificateChainCleaner {
                public static class: java.lang.Class<CertificateChainCleaner>;
                public static get(param0: javax.net.ssl.X509TrustManager): CertificateChainCleaner;
                public clean(param0: java.util.List<java.security.cert.Certificate>, param1: string): java.util.List<java.security.cert.Certificate>;
                public static get(param0: native.Array<java.security.cert.X509Certificate>): CertificateChainCleaner;
                public constructor();
            }
        }
    }
}

declare namespace okhttp3 {
    export namespace internal {
        export namespace tls {
            export class DistinguishedNameParser {
                public static class: java.lang.Class<DistinguishedNameParser>;
                public findMostSpecific(param0: string): string;
            }
        }
    }
}

declare namespace okhttp3 {
    export namespace internal {
        export namespace tls {
            export class OkHostnameVerifier {
                public static class: java.lang.Class<OkHostnameVerifier>;
                public static INSTANCE: OkHostnameVerifier;
                public verify(param0: string, param1: javax.net.ssl.SSLSession): boolean;
                public verifyHostname(param0: string, param1: string): boolean;
                public static allSubjectAltNames(param0: java.security.cert.X509Certificate): java.util.List<string>;
                public verify(param0: string, param1: java.security.cert.X509Certificate): boolean;
            }
        }
    }
}

declare namespace okhttp3 {
    export namespace internal {
        export namespace tls {
            export class TrustRootIndex {
                public static class: java.lang.Class<TrustRootIndex>;
                /**
                 * Constructs a new instance of the okhttp3.internal.tls.TrustRootIndex interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
                 */
                public constructor(implementation: { findByIssuerAndSignature(param0: java.security.cert.X509Certificate): java.security.cert.X509Certificate });
                public constructor();
                public findByIssuerAndSignature(param0: java.security.cert.X509Certificate): java.security.cert.X509Certificate;
            }
        }
    }
}

declare namespace okhttp3 {
    export namespace internal {
        export namespace ws {
            export class RealWebSocket implements WebSocket, WebSocketReader.FrameCallback {
                public static class: java.lang.Class<RealWebSocket>;
                public constructor(param0: Request, param1: WebSocketListener, param2: java.util.Random, param3: number);
                public request(): Request;
                public send(param0: string): boolean;
                public onReadPong(param0: okio.ByteString): void;
                public onReadPing(param0: okio.ByteString): void;
                public initReaderAndWriter(param0: string, param1: RealWebSocket.Streams): void;
                public queueSize(): number;
                public close(param0: number, param1: string): boolean;
                public loopReader(): void;
                public send(param0: okio.ByteString): boolean;
                public onReadMessage(param0: okio.ByteString): void;
                public failWebSocket(param0: java.lang.Exception, param1: Response): void;
                public cancel(): void;
                public connect(param0: OkHttpClient): void;
                public onReadClose(param0: number, param1: string): void;
                public onReadMessage(param0: string): void;
            }
            export namespace RealWebSocket {
                export class CancelRunnable {
                    public static class: java.lang.Class<CancelRunnable>;
                    public run(): void;
                }
                export class Close {
                    public static class: java.lang.Class<Close>;
                }
                export class Message {
                    public static class: java.lang.Class<Message>;
                }
                export class PingRunnable {
                    public static class: java.lang.Class<PingRunnable>;
                    public run(): void;
                }
                export abstract class Streams {
                    public static class: java.lang.Class<Streams>;
                    public client: boolean;
                    public source: okio.BufferedSource;
                    public sink: okio.BufferedSink;
                    public constructor(param0: boolean, param1: okio.BufferedSource, param2: okio.BufferedSink);
                }
            }
        }
    }
}

declare namespace okhttp3 {
    export namespace internal {
        export namespace ws {
            export class WebSocketProtocol {
                public static class: java.lang.Class<WebSocketProtocol>;
                public static acceptHeader(param0: string): string;
            }
        }
    }
}

declare namespace okhttp3 {
    export namespace internal {
        export namespace ws {
            export class WebSocketReader {
                public static class: java.lang.Class<WebSocketReader>;
            }
            export namespace WebSocketReader {
                export class FrameCallback {
                    public static class: java.lang.Class<FrameCallback>;
                    /**
                     * Constructs a new instance of the okhttp3.internal.ws.WebSocketReader$FrameCallback interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
                     */
                    public constructor(implementation: {
                        onReadMessage(param0: string): void;
                        onReadMessage(param0: okio.ByteString): void;
                        onReadPing(param0: okio.ByteString): void;
                        onReadPong(param0: okio.ByteString): void;
                        onReadClose(param0: number, param1: string): void;
                    });
                    public constructor();
                    public onReadClose(param0: number, param1: string): void;
                    public onReadMessage(param0: string): void;
                    public onReadMessage(param0: okio.ByteString): void;
                    public onReadPing(param0: okio.ByteString): void;
                    public onReadPong(param0: okio.ByteString): void;
                }
            }
        }
    }
}

declare namespace okhttp3 {
    export namespace internal {
        export namespace ws {
            export class WebSocketWriter {
                public static class: java.lang.Class<WebSocketWriter>;
            }
            export namespace WebSocketWriter {
                export class FrameSink {
                    public static class: java.lang.Class<FrameSink>;
                    public close(): void;
                    public flush(): void;
                    public write(param0: okio.Buffer, param1: number): void;
                    public timeout(): okio.Timeout;
                }
            }
        }
    }
}

//Generics information:
//okhttp3.internal.platform.OptionalMethod:1
