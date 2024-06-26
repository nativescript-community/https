/// <reference path="android-declarations.d.ts"/>

declare module okhttp3 {
	export class Address extends java.lang.Object {
		public static class: java.lang.Class<okhttp3.Address>;
		/** @deprecated */
		public proxyAuthenticator(): okhttp3.Authenticator;
		/** @deprecated */
		public proxy(): java.net.Proxy;
		public proxy(): java.net.Proxy;
		public equals(param0: any): boolean;
		public sslSocketFactory(): javax.net.ssl.SSLSocketFactory;
		public equalsNonHost$okhttp(param0: okhttp3.Address): boolean;
		public certificatePinner(): okhttp3.CertificatePinner;
		/** @deprecated */
		public proxySelector(): java.net.ProxySelector;
		/** @deprecated */
		public protocols(): java.util.List<okhttp3.Protocol>;
		public protocols(): java.util.List<okhttp3.Protocol>;
		public dns(): okhttp3.Dns;
		public proxyAuthenticator(): okhttp3.Authenticator;
		public hostnameVerifier(): javax.net.ssl.HostnameVerifier;
		public constructor(param0: string, param1: number, param2: okhttp3.Dns, param3: javax.net.SocketFactory, param4: javax.net.ssl.SSLSocketFactory, param5: javax.net.ssl.HostnameVerifier, param6: okhttp3.CertificatePinner, param7: okhttp3.Authenticator, param8: java.net.Proxy, param9: java.util.List<any>, param10: java.util.List<okhttp3.ConnectionSpec>, param11: java.net.ProxySelector);
		public hashCode(): number;
		public connectionSpecs(): java.util.List<okhttp3.ConnectionSpec>;
		/** @deprecated */
		public sslSocketFactory(): javax.net.ssl.SSLSocketFactory;
		/** @deprecated */
		public certificatePinner(): okhttp3.CertificatePinner;
		/** @deprecated */
		public url(): okhttp3.HttpUrl;
		public proxySelector(): java.net.ProxySelector;
		public url(): okhttp3.HttpUrl;
		public toString(): string;
		/** @deprecated */
		public connectionSpecs(): java.util.List<okhttp3.ConnectionSpec>;
		/** @deprecated */
		public dns(): okhttp3.Dns;
		public socketFactory(): javax.net.SocketFactory;
		/** @deprecated */
		public hostnameVerifier(): javax.net.ssl.HostnameVerifier;
		/** @deprecated */
		public socketFactory(): javax.net.SocketFactory;
	}
}

declare module okhttp3 {
	export class Authenticator extends java.lang.Object {
		public static class: java.lang.Class<okhttp3.Authenticator>;
		/**
		 * Constructs a new instance of the okhttp3.Authenticator interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
		 */
		public constructor(implementation: {
			authenticate(param0: okhttp3.Route, param1: okhttp3.Response): okhttp3.Request;
			<clinit>(): void;
		});
		public constructor();
		public static NONE: okhttp3.Authenticator;
		public static JAVA_NET_AUTHENTICATOR: okhttp3.Authenticator;
		public authenticate(param0: okhttp3.Route, param1: okhttp3.Response): okhttp3.Request;
	}
	export module Authenticator {
		export class Companion extends java.lang.Object {
			public static class: java.lang.Class<okhttp3.Authenticator.Companion>;
		}
		export module Companion {
			export class AuthenticatorNone extends java.lang.Object implements okhttp3.Authenticator {
				public static class: java.lang.Class<okhttp3.Authenticator.Companion.AuthenticatorNone>;
				public authenticate(param0: okhttp3.Route, param1: okhttp3.Response): okhttp3.Request;
				public constructor();
			}
		}
	}
}

declare module okhttp3 {
	export class Cache extends java.lang.Object implements java.io.Closeable, java.io.Flushable {
		public static class: java.lang.Class<okhttp3.Cache>;
		public trackConditionalCacheHit$okhttp(): void;
		public close(): void;
		public directory(): java.io.File;
		public constructor(param0: java.io.File, param1: number);
		public writeAbortCount(): number;
		public constructor(param0: java.io.File, param1: number, param2: okhttp3.internal.io.FileSystem);
		/** @deprecated */
		public directory(): java.io.File;
		public isClosed(): boolean;
		public delete(): void;
		public put$okhttp(param0: okhttp3.Response): okhttp3.internal.cache.CacheRequest;
		public size(): number;
		public update$okhttp(param0: okhttp3.Response, param1: okhttp3.Response): void;
		public trackResponse$okhttp(param0: okhttp3.internal.cache.CacheStrategy): void;
		public urls(): java.util.Iterator<string>;
		public maxSize(): number;
		public getWriteSuccessCount$okhttp(): number;
		public getCache$okhttp(): okhttp3.internal.cache.DiskLruCache;
		public get$okhttp(param0: okhttp3.Request): okhttp3.Response;
		public static key(param0: okhttp3.HttpUrl): string;
		public setWriteAbortCount$okhttp(param0: number): void;
		public setWriteSuccessCount$okhttp(param0: number): void;
		public evictAll(): void;
		public networkCount(): number;
		public getWriteAbortCount$okhttp(): number;
		public requestCount(): number;
		public flush(): void;
		public remove$okhttp(param0: okhttp3.Request): void;
		public initialize(): void;
		public writeSuccessCount(): number;
		public hitCount(): number;
	}
	export module Cache {
		export class CacheResponseBody extends okhttp3.ResponseBody {
			public static class: java.lang.Class<okhttp3.Cache.CacheResponseBody>;
			public getSnapshot(): okhttp3.internal.cache.DiskLruCache.Snapshot;
			public contentLength(): number;
			public source(): okio.BufferedSource;
			public contentType(): okhttp3.MediaType;
			public constructor();
			public close(): void;
			public constructor(param0: okhttp3.internal.cache.DiskLruCache.Snapshot, param1: string, param2: string);
		}
		export class Companion extends java.lang.Object {
			public static class: java.lang.Class<okhttp3.Cache.Companion>;
			public varyMatches(param0: okhttp3.Response, param1: okhttp3.Headers, param2: okhttp3.Request): boolean;
			public readInt$okhttp(param0: okio.BufferedSource): number;
			public varyHeaders(param0: okhttp3.Response): okhttp3.Headers;
			public key(param0: okhttp3.HttpUrl): string;
			public hasVaryAll(param0: okhttp3.Response): boolean;
		}
		export class Entry extends java.lang.Object {
			public static class: java.lang.Class<okhttp3.Cache.Entry>;
			public matches(param0: okhttp3.Request, param1: okhttp3.Response): boolean;
			public constructor(param0: okhttp3.Response);
			public constructor(param0: okio.Source);
			public response(param0: okhttp3.internal.cache.DiskLruCache.Snapshot): okhttp3.Response;
			public writeTo(param0: okhttp3.internal.cache.DiskLruCache.Editor): void;
		}
		export module Entry {
			export class Companion extends java.lang.Object {
				public static class: java.lang.Class<okhttp3.Cache.Entry.Companion>;
			}
		}
		export class RealCacheRequest extends java.lang.Object implements okhttp3.internal.cache.CacheRequest {
			public static class: java.lang.Class<okhttp3.Cache.RealCacheRequest>;
			public getDone(): boolean;
			public body(): okio.Sink;
			public setDone(param0: boolean): void;
			public abort(): void;
			public constructor(param0: okhttp3.internal.cache.DiskLruCache.Editor);
		}
	}
}

declare module okhttp3 {
	export class CacheControl extends java.lang.Object {
		public static class: java.lang.Class<okhttp3.CacheControl>;
		public static FORCE_NETWORK: okhttp3.CacheControl;
		public static FORCE_CACHE: okhttp3.CacheControl;
		/** @deprecated */
		public mustRevalidate(): boolean;
		public maxStaleSeconds(): number;
		public mustRevalidate(): boolean;
		public toString(): string;
		public static parse(param0: okhttp3.Headers): okhttp3.CacheControl;
		/** @deprecated */
		public maxAgeSeconds(): number;
		/** @deprecated */
		public sMaxAgeSeconds(): number;
		/** @deprecated */
		public noTransform(): boolean;
		public minFreshSeconds(): number;
		public onlyIfCached(): boolean;
		/** @deprecated */
		public noStore(): boolean;
		public noCache(): boolean;
		public noTransform(): boolean;
		/** @deprecated */
		public minFreshSeconds(): number;
		/** @deprecated */
		public onlyIfCached(): boolean;
		public isPrivate(): boolean;
		public immutable(): boolean;
		/** @deprecated */
		public noCache(): boolean;
		public sMaxAgeSeconds(): number;
		/** @deprecated */
		public immutable(): boolean;
		/** @deprecated */
		public maxStaleSeconds(): number;
		public noStore(): boolean;
		public maxAgeSeconds(): number;
		public isPublic(): boolean;
	}
	export module CacheControl {
		export class Builder extends java.lang.Object {
			public static class: java.lang.Class<okhttp3.CacheControl.Builder>;
			public noCache(): okhttp3.CacheControl.Builder;
			public maxStale(param0: number, param1: java.util.concurrent.TimeUnit): okhttp3.CacheControl.Builder;
			public immutable(): okhttp3.CacheControl.Builder;
			public onlyIfCached(): okhttp3.CacheControl.Builder;
			public minFresh(param0: number, param1: java.util.concurrent.TimeUnit): okhttp3.CacheControl.Builder;
			public maxAge(param0: number, param1: java.util.concurrent.TimeUnit): okhttp3.CacheControl.Builder;
			public constructor();
			public build(): okhttp3.CacheControl;
			public noStore(): okhttp3.CacheControl.Builder;
			public noTransform(): okhttp3.CacheControl.Builder;
		}
		export class Companion extends java.lang.Object {
			public static class: java.lang.Class<okhttp3.CacheControl.Companion>;
			public parse(param0: okhttp3.Headers): okhttp3.CacheControl;
		}
	}
}

declare module okhttp3 {
	export class Call extends java.lang.Object implements java.lang.Cloneable {
		public static class: java.lang.Class<okhttp3.Call>;
		/**
		 * Constructs a new instance of the okhttp3.Call interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
		 */
		public constructor(implementation: {
			request(): okhttp3.Request;
			execute(): okhttp3.Response;
			enqueue(param0: okhttp3.Callback): void;
			cancel(): void;
			isExecuted(): boolean;
			isCanceled(): boolean;
			timeout(): okio.Timeout;
			clone(): okhttp3.Call;
		});
		public constructor();
		public isExecuted(): boolean;
		public clone(): okhttp3.Call;
		public request(): okhttp3.Request;
		public execute(): okhttp3.Response;
		public isCanceled(): boolean;
		public clone(): any;
		public enqueue(param0: okhttp3.Callback): void;
		public cancel(): void;
		public timeout(): okio.Timeout;
	}
	export module Call {
		export class Factory extends java.lang.Object {
			public static class: java.lang.Class<okhttp3.Call.Factory>;
			/**
			 * Constructs a new instance of the okhttp3.Call$Factory interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
			 */
			public constructor(implementation: {
				newCall(param0: okhttp3.Request): okhttp3.Call;
			});
			public constructor();
			public newCall(param0: okhttp3.Request): okhttp3.Call;
		}
	}
}

declare module okhttp3 {
	export class Callback extends java.lang.Object {
		public static class: java.lang.Class<okhttp3.Callback>;
		/**
		 * Constructs a new instance of the okhttp3.Callback interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
		 */
		public constructor(implementation: {
			onFailure(param0: okhttp3.Call, param1: java.io.IOException): void;
			onResponse(param0: okhttp3.Call, param1: okhttp3.Response): void;
		});
		public constructor();
		public onResponse(param0: okhttp3.Call, param1: okhttp3.Response): void;
		public onFailure(param0: okhttp3.Call, param1: java.io.IOException): void;
	}
}

declare module okhttp3 {
	export class CertificatePinner extends java.lang.Object {
		public static class: java.lang.Class<okhttp3.CertificatePinner>;
		public static DEFAULT: okhttp3.CertificatePinner;
		public equals(param0: any): boolean;
		/** @deprecated */
		public check(param0: string, param1: androidNative.Array<java.security.cert.Certificate>): void;
		public static sha256Hash(param0: java.security.cert.X509Certificate): okio.ByteString;
		public check$okhttp(param0: string, param1: any): void;
		public getCertificateChainCleaner$okhttp(): okhttp3.internal.tls.CertificateChainCleaner;
		public static sha1Hash(param0: java.security.cert.X509Certificate): okio.ByteString;
		public withCertificateChainCleaner$okhttp(param0: okhttp3.internal.tls.CertificateChainCleaner): okhttp3.CertificatePinner;
		public static pin(param0: java.security.cert.Certificate): string;
		public findMatchingPins(param0: string): java.util.List<okhttp3.CertificatePinner.Pin>;
		public hashCode(): number;
		public constructor(param0: java.util.Set<okhttp3.CertificatePinner.Pin>, param1: okhttp3.internal.tls.CertificateChainCleaner);
		public check(param0: string, param1: java.util.List<any>): void;
		public getPins(): java.util.Set<okhttp3.CertificatePinner.Pin>;
	}
	export module CertificatePinner {
		export class Builder extends java.lang.Object {
			public static class: java.lang.Class<okhttp3.CertificatePinner.Builder>;
			public build(): okhttp3.CertificatePinner;
			public constructor();
			public getPins(): java.util.List<okhttp3.CertificatePinner.Pin>;
			public add(param0: string, param1: androidNative.Array<string>): okhttp3.CertificatePinner.Builder;
		}
		export class Companion extends java.lang.Object {
			public static class: java.lang.Class<okhttp3.CertificatePinner.Companion>;
			public sha1Hash(param0: java.security.cert.X509Certificate): okio.ByteString;
			public sha256Hash(param0: java.security.cert.X509Certificate): okio.ByteString;
			public pin(param0: java.security.cert.Certificate): string;
		}
		export class Pin extends java.lang.Object {
			public static class: java.lang.Class<okhttp3.CertificatePinner.Pin>;
			public constructor(param0: string, param1: string);
			public matchesHostname(param0: string): boolean;
			public equals(param0: any): boolean;
			public toString(): string;
			public matchesCertificate(param0: java.security.cert.X509Certificate): boolean;
			public getHash(): okio.ByteString;
			public getHashAlgorithm(): string;
			public getPattern(): string;
			public hashCode(): number;
		}
	}
}

declare module okhttp3 {
	export class Challenge extends java.lang.Object {
		public static class: java.lang.Class<okhttp3.Challenge>;
		public equals(param0: any): boolean;
		public scheme(): string;
		/** @deprecated */
		public scheme(): string;
		public toString(): string;
		public constructor(param0: string, param1: java.util.Map<string,string>);
		public withCharset(param0: java.nio.charset.Charset): okhttp3.Challenge;
		public realm(): string;
		public constructor(param0: string, param1: string);
		public authParams(): java.util.Map<string,string>;
		public charset(): java.nio.charset.Charset;
		/** @deprecated */
		public charset(): java.nio.charset.Charset;
		/** @deprecated */
		public authParams(): java.util.Map<string,string>;
		public hashCode(): number;
		/** @deprecated */
		public realm(): string;
	}
}

declare module okhttp3 {
	export class CipherSuite extends java.lang.Object {
		public static class: java.lang.Class<okhttp3.CipherSuite>;
		public static TLS_RSA_WITH_NULL_MD5: okhttp3.CipherSuite;
		public static TLS_RSA_WITH_NULL_SHA: okhttp3.CipherSuite;
		public static TLS_RSA_EXPORT_WITH_RC4_40_MD5: okhttp3.CipherSuite;
		public static TLS_RSA_WITH_RC4_128_MD5: okhttp3.CipherSuite;
		public static TLS_RSA_WITH_RC4_128_SHA: okhttp3.CipherSuite;
		public static TLS_RSA_EXPORT_WITH_DES40_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_RSA_WITH_DES_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_RSA_WITH_3DES_EDE_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_DHE_DSS_EXPORT_WITH_DES40_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_DHE_DSS_WITH_DES_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_DHE_DSS_WITH_3DES_EDE_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_DHE_RSA_EXPORT_WITH_DES40_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_DHE_RSA_WITH_DES_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_DHE_RSA_WITH_3DES_EDE_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_DH_anon_EXPORT_WITH_RC4_40_MD5: okhttp3.CipherSuite;
		public static TLS_DH_anon_WITH_RC4_128_MD5: okhttp3.CipherSuite;
		public static TLS_DH_anon_EXPORT_WITH_DES40_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_DH_anon_WITH_DES_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_DH_anon_WITH_3DES_EDE_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_KRB5_WITH_DES_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_KRB5_WITH_3DES_EDE_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_KRB5_WITH_RC4_128_SHA: okhttp3.CipherSuite;
		public static TLS_KRB5_WITH_DES_CBC_MD5: okhttp3.CipherSuite;
		public static TLS_KRB5_WITH_3DES_EDE_CBC_MD5: okhttp3.CipherSuite;
		public static TLS_KRB5_WITH_RC4_128_MD5: okhttp3.CipherSuite;
		public static TLS_KRB5_EXPORT_WITH_DES_CBC_40_SHA: okhttp3.CipherSuite;
		public static TLS_KRB5_EXPORT_WITH_RC4_40_SHA: okhttp3.CipherSuite;
		public static TLS_KRB5_EXPORT_WITH_DES_CBC_40_MD5: okhttp3.CipherSuite;
		public static TLS_KRB5_EXPORT_WITH_RC4_40_MD5: okhttp3.CipherSuite;
		public static TLS_RSA_WITH_AES_128_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_DHE_DSS_WITH_AES_128_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_DHE_RSA_WITH_AES_128_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_DH_anon_WITH_AES_128_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_RSA_WITH_AES_256_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_DHE_DSS_WITH_AES_256_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_DHE_RSA_WITH_AES_256_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_DH_anon_WITH_AES_256_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_RSA_WITH_NULL_SHA256: okhttp3.CipherSuite;
		public static TLS_RSA_WITH_AES_128_CBC_SHA256: okhttp3.CipherSuite;
		public static TLS_RSA_WITH_AES_256_CBC_SHA256: okhttp3.CipherSuite;
		public static TLS_DHE_DSS_WITH_AES_128_CBC_SHA256: okhttp3.CipherSuite;
		public static TLS_RSA_WITH_CAMELLIA_128_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_DHE_DSS_WITH_CAMELLIA_128_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_DHE_RSA_WITH_CAMELLIA_128_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_DHE_RSA_WITH_AES_128_CBC_SHA256: okhttp3.CipherSuite;
		public static TLS_DHE_DSS_WITH_AES_256_CBC_SHA256: okhttp3.CipherSuite;
		public static TLS_DHE_RSA_WITH_AES_256_CBC_SHA256: okhttp3.CipherSuite;
		public static TLS_DH_anon_WITH_AES_128_CBC_SHA256: okhttp3.CipherSuite;
		public static TLS_DH_anon_WITH_AES_256_CBC_SHA256: okhttp3.CipherSuite;
		public static TLS_RSA_WITH_CAMELLIA_256_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_DHE_DSS_WITH_CAMELLIA_256_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_DHE_RSA_WITH_CAMELLIA_256_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_PSK_WITH_RC4_128_SHA: okhttp3.CipherSuite;
		public static TLS_PSK_WITH_3DES_EDE_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_PSK_WITH_AES_128_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_PSK_WITH_AES_256_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_RSA_WITH_SEED_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_RSA_WITH_AES_128_GCM_SHA256: okhttp3.CipherSuite;
		public static TLS_RSA_WITH_AES_256_GCM_SHA384: okhttp3.CipherSuite;
		public static TLS_DHE_RSA_WITH_AES_128_GCM_SHA256: okhttp3.CipherSuite;
		public static TLS_DHE_RSA_WITH_AES_256_GCM_SHA384: okhttp3.CipherSuite;
		public static TLS_DHE_DSS_WITH_AES_128_GCM_SHA256: okhttp3.CipherSuite;
		public static TLS_DHE_DSS_WITH_AES_256_GCM_SHA384: okhttp3.CipherSuite;
		public static TLS_DH_anon_WITH_AES_128_GCM_SHA256: okhttp3.CipherSuite;
		public static TLS_DH_anon_WITH_AES_256_GCM_SHA384: okhttp3.CipherSuite;
		public static TLS_EMPTY_RENEGOTIATION_INFO_SCSV: okhttp3.CipherSuite;
		public static TLS_FALLBACK_SCSV: okhttp3.CipherSuite;
		public static TLS_ECDH_ECDSA_WITH_NULL_SHA: okhttp3.CipherSuite;
		public static TLS_ECDH_ECDSA_WITH_RC4_128_SHA: okhttp3.CipherSuite;
		public static TLS_ECDH_ECDSA_WITH_3DES_EDE_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_ECDH_ECDSA_WITH_AES_128_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_ECDH_ECDSA_WITH_AES_256_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_ECDHE_ECDSA_WITH_NULL_SHA: okhttp3.CipherSuite;
		public static TLS_ECDHE_ECDSA_WITH_RC4_128_SHA: okhttp3.CipherSuite;
		public static TLS_ECDHE_ECDSA_WITH_3DES_EDE_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_ECDH_RSA_WITH_NULL_SHA: okhttp3.CipherSuite;
		public static TLS_ECDH_RSA_WITH_RC4_128_SHA: okhttp3.CipherSuite;
		public static TLS_ECDH_RSA_WITH_3DES_EDE_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_ECDH_RSA_WITH_AES_128_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_ECDH_RSA_WITH_AES_256_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_ECDHE_RSA_WITH_NULL_SHA: okhttp3.CipherSuite;
		public static TLS_ECDHE_RSA_WITH_RC4_128_SHA: okhttp3.CipherSuite;
		public static TLS_ECDHE_RSA_WITH_3DES_EDE_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_ECDH_anon_WITH_NULL_SHA: okhttp3.CipherSuite;
		public static TLS_ECDH_anon_WITH_RC4_128_SHA: okhttp3.CipherSuite;
		public static TLS_ECDH_anon_WITH_3DES_EDE_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_ECDH_anon_WITH_AES_128_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_ECDH_anon_WITH_AES_256_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256: okhttp3.CipherSuite;
		public static TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA384: okhttp3.CipherSuite;
		public static TLS_ECDH_ECDSA_WITH_AES_128_CBC_SHA256: okhttp3.CipherSuite;
		public static TLS_ECDH_ECDSA_WITH_AES_256_CBC_SHA384: okhttp3.CipherSuite;
		public static TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256: okhttp3.CipherSuite;
		public static TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA384: okhttp3.CipherSuite;
		public static TLS_ECDH_RSA_WITH_AES_128_CBC_SHA256: okhttp3.CipherSuite;
		public static TLS_ECDH_RSA_WITH_AES_256_CBC_SHA384: okhttp3.CipherSuite;
		public static TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256: okhttp3.CipherSuite;
		public static TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384: okhttp3.CipherSuite;
		public static TLS_ECDH_ECDSA_WITH_AES_128_GCM_SHA256: okhttp3.CipherSuite;
		public static TLS_ECDH_ECDSA_WITH_AES_256_GCM_SHA384: okhttp3.CipherSuite;
		public static TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256: okhttp3.CipherSuite;
		public static TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384: okhttp3.CipherSuite;
		public static TLS_ECDH_RSA_WITH_AES_128_GCM_SHA256: okhttp3.CipherSuite;
		public static TLS_ECDH_RSA_WITH_AES_256_GCM_SHA384: okhttp3.CipherSuite;
		public static TLS_ECDHE_PSK_WITH_AES_128_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_ECDHE_PSK_WITH_AES_256_CBC_SHA: okhttp3.CipherSuite;
		public static TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256: okhttp3.CipherSuite;
		public static TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256: okhttp3.CipherSuite;
		public static TLS_DHE_RSA_WITH_CHACHA20_POLY1305_SHA256: okhttp3.CipherSuite;
		public static TLS_ECDHE_PSK_WITH_CHACHA20_POLY1305_SHA256: okhttp3.CipherSuite;
		public static TLS_AES_128_GCM_SHA256: okhttp3.CipherSuite;
		public static TLS_AES_256_GCM_SHA384: okhttp3.CipherSuite;
		public static TLS_CHACHA20_POLY1305_SHA256: okhttp3.CipherSuite;
		public static TLS_AES_128_CCM_SHA256: okhttp3.CipherSuite;
		public static TLS_AES_128_CCM_8_SHA256: okhttp3.CipherSuite;
		public javaName(): string;
		public static forJavaName(param0: string): okhttp3.CipherSuite;
		/** @deprecated */
		public javaName(): string;
		public toString(): string;
	}
	export module CipherSuite {
		export class Companion extends java.lang.Object {
			public static class: java.lang.Class<okhttp3.CipherSuite.Companion>;
			public forJavaName(param0: string): okhttp3.CipherSuite;
			public getORDER_BY_NAME$okhttp(): java.util.Comparator<string>;
		}
	}
}

declare module okhttp3 {
	export class Connection extends java.lang.Object {
		public static class: java.lang.Class<okhttp3.Connection>;
		/**
		 * Constructs a new instance of the okhttp3.Connection interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
		 */
		public constructor(implementation: {
			route(): okhttp3.Route;
			socket(): java.net.Socket;
			handshake(): okhttp3.Handshake;
			protocol(): okhttp3.Protocol;
		});
		public constructor();
		public route(): okhttp3.Route;
		public protocol(): okhttp3.Protocol;
		public handshake(): okhttp3.Handshake;
		public socket(): java.net.Socket;
	}
}

declare module okhttp3 {
	export class ConnectionPool extends java.lang.Object {
		public static class: java.lang.Class<okhttp3.ConnectionPool>;
		public constructor();
		public connectionCount(): number;
		public getDelegate$okhttp(): okhttp3.internal.connection.RealConnectionPool;
		public evictAll(): void;
		public idleConnectionCount(): number;
		public constructor(param0: okhttp3.internal.connection.RealConnectionPool);
		public constructor(param0: number, param1: number, param2: java.util.concurrent.TimeUnit);
	}
}

declare module okhttp3 {
	export class ConnectionSpec extends java.lang.Object {
		public static class: java.lang.Class<okhttp3.ConnectionSpec>;
		public static RESTRICTED_TLS: okhttp3.ConnectionSpec;
		public static MODERN_TLS: okhttp3.ConnectionSpec;
		public static COMPATIBLE_TLS: okhttp3.ConnectionSpec;
		public static CLEARTEXT: okhttp3.ConnectionSpec;
		/** @deprecated */
		public supportsTlsExtensions(): boolean;
		public cipherSuites(): java.util.List<okhttp3.CipherSuite>;
		public equals(param0: any): boolean;
		public supportsTlsExtensions(): boolean;
		public tlsVersions(): java.util.List<okhttp3.TlsVersion>;
		public toString(): string;
		/** @deprecated */
		public cipherSuites(): java.util.List<okhttp3.CipherSuite>;
		public hashCode(): number;
		public isCompatible(param0: javax.net.ssl.SSLSocket): boolean;
		public isTls(): boolean;
		public apply$okhttp(param0: javax.net.ssl.SSLSocket, param1: boolean): void;
		/** @deprecated */
		public tlsVersions(): java.util.List<okhttp3.TlsVersion>;
		public constructor(param0: boolean, param1: boolean, param2: androidNative.Array<string>, param3: androidNative.Array<string>);
	}
	export module ConnectionSpec {
		export class Builder extends java.lang.Object {
			public static class: java.lang.Class<okhttp3.ConnectionSpec.Builder>;
			public getCipherSuites$okhttp(): androidNative.Array<string>;
			public build(): okhttp3.ConnectionSpec;
			public constructor(param0: boolean);
			public tlsVersions(param0: androidNative.Array<okhttp3.TlsVersion>): okhttp3.ConnectionSpec.Builder;
			public getSupportsTlsExtensions$okhttp(): boolean;
			public constructor(param0: okhttp3.ConnectionSpec);
			public cipherSuites(param0: androidNative.Array<okhttp3.CipherSuite>): okhttp3.ConnectionSpec.Builder;
			public setSupportsTlsExtensions$okhttp(param0: boolean): void;
			public setTlsVersions$okhttp(param0: androidNative.Array<string>): void;
			/** @deprecated */
			public supportsTlsExtensions(param0: boolean): okhttp3.ConnectionSpec.Builder;
			public getTls$okhttp(): boolean;
			public setTls$okhttp(param0: boolean): void;
			public getTlsVersions$okhttp(): androidNative.Array<string>;
			public cipherSuites(param0: androidNative.Array<string>): okhttp3.ConnectionSpec.Builder;
			public allEnabledCipherSuites(): okhttp3.ConnectionSpec.Builder;
			public allEnabledTlsVersions(): okhttp3.ConnectionSpec.Builder;
			public setCipherSuites$okhttp(param0: androidNative.Array<string>): void;
			public tlsVersions(param0: androidNative.Array<string>): okhttp3.ConnectionSpec.Builder;
		}
		export class Companion extends java.lang.Object {
			public static class: java.lang.Class<okhttp3.ConnectionSpec.Companion>;
		}
	}
}

declare module okhttp3 {
	export class Cookie extends java.lang.Object {
		public static class: java.lang.Class<okhttp3.Cookie>;
		public equals(param0: any): boolean;
		public matches(param0: okhttp3.HttpUrl): boolean;
		/** @deprecated */
		public hostOnly(): boolean;
		/** @deprecated */
		public expiresAt(): number;
		public httpOnly(): boolean;
		/** @deprecated */
		public path(): string;
		public expiresAt(): number;
		/** @deprecated */
		public name(): string;
		public toString$okhttp(param0: boolean): string;
		public hashCode(): number;
		/** @deprecated */
		public persistent(): boolean;
		public secure(): boolean;
		/** @deprecated */
		public domain(): string;
		public domain(): string;
		/** @deprecated */
		public httpOnly(): boolean;
		public static parseAll(param0: okhttp3.HttpUrl, param1: okhttp3.Headers): java.util.List<okhttp3.Cookie>;
		/** @deprecated */
		public secure(): boolean;
		public toString(): string;
		/** @deprecated */
		public value(): string;
		public persistent(): boolean;
		public static parse(param0: okhttp3.HttpUrl, param1: string): okhttp3.Cookie;
		public hostOnly(): boolean;
		public name(): string;
		public path(): string;
		public value(): string;
	}
	export module Cookie {
		export class Builder extends java.lang.Object {
			public static class: java.lang.Class<okhttp3.Cookie.Builder>;
			public domain(param0: string): okhttp3.Cookie.Builder;
			public hostOnlyDomain(param0: string): okhttp3.Cookie.Builder;
			public value(param0: string): okhttp3.Cookie.Builder;
			public httpOnly(): okhttp3.Cookie.Builder;
			public secure(): okhttp3.Cookie.Builder;
			public expiresAt(param0: number): okhttp3.Cookie.Builder;
			public build(): okhttp3.Cookie;
			public name(param0: string): okhttp3.Cookie.Builder;
			public constructor();
			public path(param0: string): okhttp3.Cookie.Builder;
		}
		export class Companion extends java.lang.Object {
			public static class: java.lang.Class<okhttp3.Cookie.Companion>;
			public parse$okhttp(param0: number, param1: okhttp3.HttpUrl, param2: string): okhttp3.Cookie;
			public parse(param0: okhttp3.HttpUrl, param1: string): okhttp3.Cookie;
			public parseAll(param0: okhttp3.HttpUrl, param1: okhttp3.Headers): java.util.List<okhttp3.Cookie>;
		}
	}
}

declare module okhttp3 {
	export class CookieJar extends java.lang.Object {
		public static class: java.lang.Class<okhttp3.CookieJar>;
		/**
		 * Constructs a new instance of the okhttp3.CookieJar interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
		 */
		public constructor(implementation: {
			saveFromResponse(param0: okhttp3.HttpUrl, param1: java.util.List<okhttp3.Cookie>): void;
			loadForRequest(param0: okhttp3.HttpUrl): java.util.List<okhttp3.Cookie>;
			<clinit>(): void;
		});
		public constructor();
		public static NO_COOKIES: okhttp3.CookieJar;
		public loadForRequest(param0: okhttp3.HttpUrl): java.util.List<okhttp3.Cookie>;
		public saveFromResponse(param0: okhttp3.HttpUrl, param1: java.util.List<okhttp3.Cookie>): void;
	}
	export module CookieJar {
		export class Companion extends java.lang.Object {
			public static class: java.lang.Class<okhttp3.CookieJar.Companion>;
		}
		export module Companion {
			export class NoCookies extends java.lang.Object implements okhttp3.CookieJar {
				public static class: java.lang.Class<okhttp3.CookieJar.Companion.NoCookies>;
				public loadForRequest(param0: okhttp3.HttpUrl): java.util.List<okhttp3.Cookie>;
				public saveFromResponse(param0: okhttp3.HttpUrl, param1: java.util.List<okhttp3.Cookie>): void;
				public constructor();
			}
		}
	}
}

declare module okhttp3 {
	export class Credentials extends java.lang.Object {
		public static class: java.lang.Class<okhttp3.Credentials>;
		public static INSTANCE: okhttp3.Credentials;
		public static basic(param0: string, param1: string, param2: java.nio.charset.Charset): string;
		public static basic(param0: string, param1: string): string;
	}
}

declare module okhttp3 {
	export class Dispatcher extends java.lang.Object {
		public static class: java.lang.Class<okhttp3.Dispatcher>;
		public constructor();
		public setMaxRequestsPerHost(param0: number): void;
		public constructor(param0: java.util.concurrent.ExecutorService);
		public queuedCallsCount(): number;
		/** @deprecated */
		public executorService(): java.util.concurrent.ExecutorService;
		public finished$okhttp(param0: okhttp3.internal.connection.RealCall.AsyncCall): void;
		public runningCallsCount(): number;
		public runningCalls(): java.util.List<okhttp3.Call>;
		public cancelAll(): void;
		public queuedCalls(): java.util.List<okhttp3.Call>;
		public setMaxRequests(param0: number): void;
		public getMaxRequestsPerHost(): number;
		public executed$okhttp(param0: okhttp3.internal.connection.RealCall): void;
		public executorService(): java.util.concurrent.ExecutorService;
		public setIdleCallback(param0: java.lang.Runnable): void;
		public getIdleCallback(): java.lang.Runnable;
		public enqueue$okhttp(param0: okhttp3.internal.connection.RealCall.AsyncCall): void;
		public getMaxRequests(): number;
		public finished$okhttp(param0: okhttp3.internal.connection.RealCall): void;
	}
}

declare module okhttp3 {
	export class Dns extends java.lang.Object {
		public static class: java.lang.Class<okhttp3.Dns>;
		/**
		 * Constructs a new instance of the okhttp3.Dns interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
		 */
		public constructor(implementation: {
			lookup(param0: string): java.util.List<java.net.InetAddress>;
			<clinit>(): void;
		});
		public constructor();
		public static SYSTEM: okhttp3.Dns;
		public lookup(param0: string): java.util.List<java.net.InetAddress>;
	}
	export module Dns {
		export class Companion extends java.lang.Object {
			public static class: java.lang.Class<okhttp3.Dns.Companion>;
		}
		export module Companion {
			export class DnsSystem extends java.lang.Object implements okhttp3.Dns {
				public static class: java.lang.Class<okhttp3.Dns.Companion.DnsSystem>;
				public lookup(param0: string): java.util.List<java.net.InetAddress>;
				public constructor();
			}
		}
	}
}

declare module okhttp3 {
	export abstract class EventListener extends java.lang.Object {
		public static class: java.lang.Class<okhttp3.EventListener>;
		public static NONE: okhttp3.EventListener;
		public connectFailed(param0: okhttp3.Call, param1: java.net.InetSocketAddress, param2: java.net.Proxy, param3: okhttp3.Protocol, param4: java.io.IOException): void;
		public proxySelectStart(param0: okhttp3.Call, param1: okhttp3.HttpUrl): void;
		public proxySelectEnd(param0: okhttp3.Call, param1: okhttp3.HttpUrl, param2: java.util.List<java.net.Proxy>): void;
		public connectionReleased(param0: okhttp3.Call, param1: okhttp3.Connection): void;
		public dnsEnd(param0: okhttp3.Call, param1: string, param2: java.util.List<java.net.InetAddress>): void;
		public secureConnectEnd(param0: okhttp3.Call, param1: okhttp3.Handshake): void;
		public dnsStart(param0: okhttp3.Call, param1: string): void;
		public connectEnd(param0: okhttp3.Call, param1: java.net.InetSocketAddress, param2: java.net.Proxy, param3: okhttp3.Protocol): void;
		public requestHeadersEnd(param0: okhttp3.Call, param1: okhttp3.Request): void;
		public connectStart(param0: okhttp3.Call, param1: java.net.InetSocketAddress, param2: java.net.Proxy): void;
		public callFailed(param0: okhttp3.Call, param1: java.io.IOException): void;
		public constructor();
		public cacheMiss(param0: okhttp3.Call): void;
		public callStart(param0: okhttp3.Call): void;
		public satisfactionFailure(param0: okhttp3.Call, param1: okhttp3.Response): void;
		public responseBodyEnd(param0: okhttp3.Call, param1: number): void;
		public responseFailed(param0: okhttp3.Call, param1: java.io.IOException): void;
		public callEnd(param0: okhttp3.Call): void;
		public secureConnectStart(param0: okhttp3.Call): void;
		public responseHeadersEnd(param0: okhttp3.Call, param1: okhttp3.Response): void;
		public canceled(param0: okhttp3.Call): void;
		public connectionAcquired(param0: okhttp3.Call, param1: okhttp3.Connection): void;
		public responseBodyStart(param0: okhttp3.Call): void;
		public cacheConditionalHit(param0: okhttp3.Call, param1: okhttp3.Response): void;
		public requestBodyEnd(param0: okhttp3.Call, param1: number): void;
		public requestFailed(param0: okhttp3.Call, param1: java.io.IOException): void;
		public requestHeadersStart(param0: okhttp3.Call): void;
		public requestBodyStart(param0: okhttp3.Call): void;
		public responseHeadersStart(param0: okhttp3.Call): void;
		public cacheHit(param0: okhttp3.Call, param1: okhttp3.Response): void;
	}
	export module EventListener {
		export class Companion extends java.lang.Object {
			public static class: java.lang.Class<okhttp3.EventListener.Companion>;
		}
		export class Factory extends java.lang.Object {
			public static class: java.lang.Class<okhttp3.EventListener.Factory>;
			/**
			 * Constructs a new instance of the okhttp3.EventListener$Factory interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
			 */
			public constructor(implementation: {
				create(param0: okhttp3.Call): okhttp3.EventListener;
			});
			public constructor();
			public create(param0: okhttp3.Call): okhttp3.EventListener;
		}
	}
}

declare module okhttp3 {
	export class FormBody extends okhttp3.RequestBody {
		public static class: java.lang.Class<okhttp3.FormBody>;
		public constructor();
		public value(param0: number): string;
		public encodedValue(param0: number): string;
		public name(param0: number): string;
		public size(): number;
		public constructor(param0: java.util.List<string>, param1: java.util.List<string>);
		public encodedName(param0: number): string;
		public contentType(): okhttp3.MediaType;
		public writeTo(param0: okio.BufferedSink): void;
		public contentLength(): number;
		/** @deprecated */
		public size(): number;
	}
	export module FormBody {
		export class Builder extends java.lang.Object {
			public static class: java.lang.Class<okhttp3.FormBody.Builder>;
			public constructor(param0: java.nio.charset.Charset);
			public addEncoded(param0: string, param1: string): okhttp3.FormBody.Builder;
			public constructor();
			public add(param0: string, param1: string): okhttp3.FormBody.Builder;
			public build(): okhttp3.FormBody;
		}
		export class Companion extends java.lang.Object {
			public static class: java.lang.Class<okhttp3.FormBody.Companion>;
		}
	}
}

declare module okhttp3 {
	export class Handshake extends java.lang.Object {
		public static class: java.lang.Class<okhttp3.Handshake>;
		/** @deprecated */
		public tlsVersion(): okhttp3.TlsVersion;
		public equals(param0: any): boolean;
		public localCertificates(): java.util.List<java.security.cert.Certificate>;
		public peerCertificates(): java.util.List<java.security.cert.Certificate>;
		public toString(): string;
		public peerPrincipal(): java.security.Principal;
		public static get(param0: okhttp3.TlsVersion, param1: okhttp3.CipherSuite, param2: java.util.List<any>, param3: java.util.List<any>): okhttp3.Handshake;
		/** @deprecated */
		public cipherSuite(): okhttp3.CipherSuite;
		public static get(param0: javax.net.ssl.SSLSession): okhttp3.Handshake;
		public constructor(param0: okhttp3.TlsVersion, param1: okhttp3.CipherSuite, param2: java.util.List<any>, param3: any);
		/** @deprecated */
		public peerPrincipal(): java.security.Principal;
		/** @deprecated */
		public localPrincipal(): java.security.Principal;
		public hashCode(): number;
		/** @deprecated */
		public localCertificates(): java.util.List<java.security.cert.Certificate>;
		public localPrincipal(): java.security.Principal;
		public tlsVersion(): okhttp3.TlsVersion;
		/** @deprecated */
		public peerCertificates(): java.util.List<java.security.cert.Certificate>;
		public cipherSuite(): okhttp3.CipherSuite;
	}
	export module Handshake {
		export class Companion extends java.lang.Object {
			public static class: java.lang.Class<okhttp3.Handshake.Companion>;
			public get(param0: javax.net.ssl.SSLSession): okhttp3.Handshake;
			public get(param0: okhttp3.TlsVersion, param1: okhttp3.CipherSuite, param2: java.util.List<any>, param3: java.util.List<any>): okhttp3.Handshake;
			/** @deprecated */
			public get(param0: javax.net.ssl.SSLSession): okhttp3.Handshake;
		}
	}
}

declare module okhttp3 {
	export class Headers extends java.lang.Object {
		public static class: java.lang.Class<okhttp3.Headers>;
		public value(param0: number): string;
		public equals(param0: any): boolean;
		public newBuilder(): okhttp3.Headers.Builder;
		public forEach(param0: any /* any*/): void;
		public getInstant(param0: string): java.time.Instant;
		public iterator(): java.util.Iterator<any>;
		public toString(): string;
		public get(param0: string): string;
		public values(param0: string): java.util.List<string>;
		public names(): java.util.Set<string>;
		public name(param0: number): string;
		public size(): number;
		public iterator(): java.util.Iterator<any>;
		public spliterator(): java.util.Spliterator<any>;
		public hashCode(): number;
		public toMultimap(): java.util.Map<string,java.util.List<string>>;
		public getDate(param0: string): java.util.Date;
		public byteCount(): number;
		/** @deprecated */
		public size(): number;
	}
	export module Headers {
		export class Builder extends java.lang.Object {
			public static class: java.lang.Class<okhttp3.Headers.Builder>;
			public get(param0: string): string;
			public build(): okhttp3.Headers;
			public set(param0: string, param1: java.time.Instant): okhttp3.Headers.Builder;
			public getNamesAndValues$okhttp(): java.util.List<string>;
			public set(param0: string, param1: string): okhttp3.Headers.Builder;
			public constructor();
			public addAll(param0: okhttp3.Headers): okhttp3.Headers.Builder;
			public addLenient$okhttp(param0: string, param1: string): okhttp3.Headers.Builder;
			public add(param0: string, param1: string): okhttp3.Headers.Builder;
			public removeAll(param0: string): okhttp3.Headers.Builder;
			public add(param0: string, param1: java.time.Instant): okhttp3.Headers.Builder;
			public set(param0: string, param1: java.util.Date): okhttp3.Headers.Builder;
			public add(param0: string): okhttp3.Headers.Builder;
			public addUnsafeNonAscii(param0: string, param1: string): okhttp3.Headers.Builder;
			public addLenient$okhttp(param0: string): okhttp3.Headers.Builder;
			public add(param0: string, param1: java.util.Date): okhttp3.Headers.Builder;
		}
		export class Companion extends java.lang.Object {
			public static class: java.lang.Class<okhttp3.Headers.Companion>;
			/** @deprecated */
			public of(param0: androidNative.Array<string>): okhttp3.Headers;
			/** @deprecated */
			public of(param0: java.util.Map<string,string>): okhttp3.Headers;
		}
	}
}

declare module okhttp3 {
	export class HttpUrl extends java.lang.Object {
		public static class: java.lang.Class<okhttp3.HttpUrl>;
		public static USERNAME_ENCODE_SET: string;
		public static PASSWORD_ENCODE_SET: string;
		public static PATH_SEGMENT_ENCODE_SET: string;
		public static PATH_SEGMENT_ENCODE_SET_URI: string;
		public static QUERY_ENCODE_SET: string;
		public static QUERY_COMPONENT_REENCODE_SET: string;
		public static QUERY_COMPONENT_ENCODE_SET: string;
		public static QUERY_COMPONENT_ENCODE_SET_URI: string;
		public static FORM_ENCODE_SET: string;
		public static FRAGMENT_ENCODE_SET: string;
		public static FRAGMENT_ENCODE_SET_URI: string;
		public static get(param0: java.net.URI): okhttp3.HttpUrl;
		public equals(param0: any): boolean;
		public topPrivateDomain(): string;
		public queryParameterName(param0: number): string;
		/** @deprecated */
		public queryParameterNames(): java.util.Set<string>;
		public queryParameterNames(): java.util.Set<string>;
		/** @deprecated */
		public port(): number;
		public encodedPassword(): string;
		public query(): string;
		/** @deprecated */
		public pathSegments(): java.util.List<string>;
		/** @deprecated */
		public username(): string;
		/** @deprecated */
		public encodedUsername(): string;
		public static get(param0: string): okhttp3.HttpUrl;
		public pathSize(): number;
		public isHttps(): boolean;
		/** @deprecated */
		public host(): string;
		public newBuilder(): okhttp3.HttpUrl.Builder;
		public port(): number;
		public encodedFragment(): string;
		public redact(): string;
		/** @deprecated */
		public scheme(): string;
		public fragment(): string;
		public toString(): string;
		public uri(): java.net.URI;
		/** @deprecated */
		public encodedQuery(): string;
		public queryParameterValue(param0: number): string;
		/** @deprecated */
		public encodedFragment(): string;
		public host(): string;
		public static get(param0: java.net.URL): okhttp3.HttpUrl;
		/** @deprecated */
		public password(): string;
		public url(): java.net.URL;
		public querySize(): number;
		public static defaultPort(param0: string): number;
		public scheme(): string;
		/** @deprecated */
		public uri(): java.net.URI;
		public constructor(param0: string, param1: string, param2: string, param3: string, param4: number, param5: java.util.List<string>, param6: java.util.List<string>, param7: string, param8: string);
		public queryParameter(param0: string): string;
		/** @deprecated */
		public encodedPathSegments(): java.util.List<string>;
		public password(): string;
		public hashCode(): number;
		public resolve(param0: string): okhttp3.HttpUrl;
		public encodedPathSegments(): java.util.List<string>;
		public encodedQuery(): string;
		public encodedPath(): string;
		/** @deprecated */
		public pathSize(): number;
		/** @deprecated */
		public encodedPath(): string;
		public encodedUsername(): string;
		public queryParameterValues(param0: string): java.util.List<string>;
		/** @deprecated */
		public fragment(): string;
		public newBuilder(param0: string): okhttp3.HttpUrl.Builder;
		/** @deprecated */
		public query(): string;
		public pathSegments(): java.util.List<string>;
		public static parse(param0: string): okhttp3.HttpUrl;
		/** @deprecated */
		public url(): java.net.URL;
		/** @deprecated */
		public encodedPassword(): string;
		/** @deprecated */
		public querySize(): number;
		public username(): string;
	}
	export module HttpUrl {
		export class Builder extends java.lang.Object {
			public static class: java.lang.Class<okhttp3.HttpUrl.Builder>;
			public static INVALID_HOST: string;
			public addPathSegment(param0: string): okhttp3.HttpUrl.Builder;
			public addEncodedPathSegment(param0: string): okhttp3.HttpUrl.Builder;
			public setEncodedQueryParameter(param0: string, param1: string): okhttp3.HttpUrl.Builder;
			public setQueryParameter(param0: string, param1: string): okhttp3.HttpUrl.Builder;
			public setEncodedQueryNamesAndValues$okhttp(param0: java.util.List<string>): void;
			public getEncodedQueryNamesAndValues$okhttp(): java.util.List<string>;
			public getEncodedPathSegments$okhttp(): java.util.List<string>;
			public encodedFragment(param0: string): okhttp3.HttpUrl.Builder;
			public username(param0: string): okhttp3.HttpUrl.Builder;
			public parse$okhttp(param0: okhttp3.HttpUrl, param1: string): okhttp3.HttpUrl.Builder;
			public setEncodedFragment$okhttp(param0: string): void;
			public addPathSegments(param0: string): okhttp3.HttpUrl.Builder;
			public setPort$okhttp(param0: number): void;
			public getHost$okhttp(): string;
			public encodedPath(param0: string): okhttp3.HttpUrl.Builder;
			public getScheme$okhttp(): string;
			public setScheme$okhttp(param0: string): void;
			public encodedPassword(param0: string): okhttp3.HttpUrl.Builder;
			public addEncodedPathSegments(param0: string): okhttp3.HttpUrl.Builder;
			public encodedQuery(param0: string): okhttp3.HttpUrl.Builder;
			public setEncodedUsername$okhttp(param0: string): void;
			public getPort$okhttp(): number;
			public host(param0: string): okhttp3.HttpUrl.Builder;
			public removeAllEncodedQueryParameters(param0: string): okhttp3.HttpUrl.Builder;
			public setEncodedPathSegment(param0: number, param1: string): okhttp3.HttpUrl.Builder;
			public setHost$okhttp(param0: string): void;
			public reencodeForUri$okhttp(): okhttp3.HttpUrl.Builder;
			public constructor();
			public encodedUsername(param0: string): okhttp3.HttpUrl.Builder;
			public password(param0: string): okhttp3.HttpUrl.Builder;
			public getEncodedUsername$okhttp(): string;
			public getEncodedPassword$okhttp(): string;
			public getEncodedFragment$okhttp(): string;
			public port(param0: number): okhttp3.HttpUrl.Builder;
			public toString(): string;
			public addQueryParameter(param0: string, param1: string): okhttp3.HttpUrl.Builder;
			public addEncodedQueryParameter(param0: string, param1: string): okhttp3.HttpUrl.Builder;
			public query(param0: string): okhttp3.HttpUrl.Builder;
			public setPathSegment(param0: number, param1: string): okhttp3.HttpUrl.Builder;
			public removeAllQueryParameters(param0: string): okhttp3.HttpUrl.Builder;
			public scheme(param0: string): okhttp3.HttpUrl.Builder;
			public removePathSegment(param0: number): okhttp3.HttpUrl.Builder;
			public fragment(param0: string): okhttp3.HttpUrl.Builder;
			public build(): okhttp3.HttpUrl;
			public setEncodedPassword$okhttp(param0: string): void;
		}
		export module Builder {
			export class Companion extends java.lang.Object {
				public static class: java.lang.Class<okhttp3.HttpUrl.Builder.Companion>;
			}
		}
		export class Companion extends java.lang.Object {
			public static class: java.lang.Class<okhttp3.HttpUrl.Companion>;
			public toPathString$okhttp(param0: java.util.List<string>, param1: java.lang.StringBuilder): void;
			/** @deprecated */
			public parse(param0: string): okhttp3.HttpUrl;
			public defaultPort(param0: string): number;
			public get(param0: java.net.URL): okhttp3.HttpUrl;
			public get(param0: java.net.URI): okhttp3.HttpUrl;
			public toQueryNamesAndValues$okhttp(param0: string): java.util.List<string>;
			/** @deprecated */
			public get(param0: string): okhttp3.HttpUrl;
			public percentDecode$okhttp(param0: string, param1: number, param2: number, param3: boolean): string;
			public canonicalize$okhttp(param0: string, param1: number, param2: number, param3: string, param4: boolean, param5: boolean, param6: boolean, param7: boolean, param8: java.nio.charset.Charset): string;
			public toQueryString$okhttp(param0: java.util.List<string>, param1: java.lang.StringBuilder): void;
			public get(param0: string): okhttp3.HttpUrl;
			public parse(param0: string): okhttp3.HttpUrl;
			/** @deprecated */
			public get(param0: java.net.URL): okhttp3.HttpUrl;
			/** @deprecated */
			public get(param0: java.net.URI): okhttp3.HttpUrl;
		}
	}
}

declare module okhttp3 {
	export class Interceptor extends java.lang.Object {
		public static class: java.lang.Class<okhttp3.Interceptor>;
		/**
		 * Constructs a new instance of the okhttp3.Interceptor interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
		 */
		public constructor(implementation: {
			intercept(param0: okhttp3.Interceptor.Chain): okhttp3.Response;
		});
		public constructor();
		public intercept(param0: okhttp3.Interceptor.Chain): okhttp3.Response;
	}
	export module Interceptor {
		export class Chain extends java.lang.Object {
			public static class: java.lang.Class<okhttp3.Interceptor.Chain>;
			/**
			 * Constructs a new instance of the okhttp3.Interceptor$Chain interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
			 */
			public constructor(implementation: {
				request(): okhttp3.Request;
				proceed(param0: okhttp3.Request): okhttp3.Response;
				connection(): okhttp3.Connection;
				call(): okhttp3.Call;
				connectTimeoutMillis(): number;
				withConnectTimeout(param0: number, param1: java.util.concurrent.TimeUnit): okhttp3.Interceptor.Chain;
				readTimeoutMillis(): number;
				withReadTimeout(param0: number, param1: java.util.concurrent.TimeUnit): okhttp3.Interceptor.Chain;
				writeTimeoutMillis(): number;
				withWriteTimeout(param0: number, param1: java.util.concurrent.TimeUnit): okhttp3.Interceptor.Chain;
			});
			public constructor();
			public request(): okhttp3.Request;
			public withConnectTimeout(param0: number, param1: java.util.concurrent.TimeUnit): okhttp3.Interceptor.Chain;
			public call(): okhttp3.Call;
			public withWriteTimeout(param0: number, param1: java.util.concurrent.TimeUnit): okhttp3.Interceptor.Chain;
			public readTimeoutMillis(): number;
			public withReadTimeout(param0: number, param1: java.util.concurrent.TimeUnit): okhttp3.Interceptor.Chain;
			public proceed(param0: okhttp3.Request): okhttp3.Response;
			public connection(): okhttp3.Connection;
			public connectTimeoutMillis(): number;
			public writeTimeoutMillis(): number;
		}
		export class Companion extends java.lang.Object {
			public static class: java.lang.Class<okhttp3.Interceptor.Companion>;
			public invoke(param0: any): okhttp3.Interceptor;
		}
	}
}

declare module okhttp3 {
	export class MediaType extends java.lang.Object {
		public static class: java.lang.Class<okhttp3.MediaType>;
		public type(): string;
		public equals(param0: any): boolean;
		public charset(): java.nio.charset.Charset;
		public subtype(): string;
		public parameter(param0: string): string;
		public charset(param0: java.nio.charset.Charset): java.nio.charset.Charset;
		public hashCode(): number;
		public static get(param0: string): okhttp3.MediaType;
		public static parse(param0: string): okhttp3.MediaType;
		public toString(): string;
		/** @deprecated */
		public type(): string;
		/** @deprecated */
		public subtype(): string;
	}
	export module MediaType {
		export class Companion extends java.lang.Object {
			public static class: java.lang.Class<okhttp3.MediaType.Companion>;
			public parse(param0: string): okhttp3.MediaType;
			public get(param0: string): okhttp3.MediaType;
			/** @deprecated */
			public parse(param0: string): okhttp3.MediaType;
			/** @deprecated */
			public get(param0: string): okhttp3.MediaType;
		}
	}
}

declare module okhttp3 {
	export class MultipartBody extends okhttp3.RequestBody {
		public static class: java.lang.Class<okhttp3.MultipartBody>;
		public static MIXED: okhttp3.MediaType;
		public static ALTERNATIVE: okhttp3.MediaType;
		public static DIGEST: okhttp3.MediaType;
		public static PARALLEL: okhttp3.MediaType;
		public static FORM: okhttp3.MediaType;
		public constructor();
		/** @deprecated */
		public type(): okhttp3.MediaType;
		public parts(): java.util.List<okhttp3.MultipartBody.Part>;
		/** @deprecated */
		public boundary(): string;
		public type(): okhttp3.MediaType;
		public writeTo(param0: okio.BufferedSink): void;
		public boundary(): string;
		public size(): number;
		/** @deprecated */
		public parts(): java.util.List<okhttp3.MultipartBody.Part>;
		public constructor(param0: okio.ByteString, param1: okhttp3.MediaType, param2: java.util.List<okhttp3.MultipartBody.Part>);
		public contentType(): okhttp3.MediaType;
		public part(param0: number): okhttp3.MultipartBody.Part;
		public contentLength(): number;
		/** @deprecated */
		public size(): number;
	}
	export module MultipartBody {
		export class Builder extends java.lang.Object {
			public static class: java.lang.Class<okhttp3.MultipartBody.Builder>;
			public setType(param0: okhttp3.MediaType): okhttp3.MultipartBody.Builder;
			public addPart(param0: okhttp3.MultipartBody.Part): okhttp3.MultipartBody.Builder;
			public build(): okhttp3.MultipartBody;
			public addPart(param0: okhttp3.Headers, param1: okhttp3.RequestBody): okhttp3.MultipartBody.Builder;
			public addPart(param0: okhttp3.RequestBody): okhttp3.MultipartBody.Builder;
			public addFormDataPart(param0: string, param1: string): okhttp3.MultipartBody.Builder;
			public addFormDataPart(param0: string, param1: string, param2: okhttp3.RequestBody): okhttp3.MultipartBody.Builder;
			public constructor();
			public constructor(param0: string);
		}
		export class Companion extends java.lang.Object {
			public static class: java.lang.Class<okhttp3.MultipartBody.Companion>;
			public appendQuotedString$okhttp(param0: java.lang.StringBuilder, param1: string): void;
		}
		export class Part extends java.lang.Object {
			public static class: java.lang.Class<okhttp3.MultipartBody.Part>;
			public headers(): okhttp3.Headers;
			/** @deprecated */
			public headers(): okhttp3.Headers;
			/** @deprecated */
			public body(): okhttp3.RequestBody;
			public static create(param0: okhttp3.Headers, param1: okhttp3.RequestBody): okhttp3.MultipartBody.Part;
			public static createFormData(param0: string, param1: string, param2: okhttp3.RequestBody): okhttp3.MultipartBody.Part;
			public static create(param0: okhttp3.RequestBody): okhttp3.MultipartBody.Part;
			public static createFormData(param0: string, param1: string): okhttp3.MultipartBody.Part;
			public body(): okhttp3.RequestBody;
		}
		export module Part {
			export class Companion extends java.lang.Object {
				public static class: java.lang.Class<okhttp3.MultipartBody.Part.Companion>;
				public createFormData(param0: string, param1: string): okhttp3.MultipartBody.Part;
				public createFormData(param0: string, param1: string, param2: okhttp3.RequestBody): okhttp3.MultipartBody.Part;
				public create(param0: okhttp3.RequestBody): okhttp3.MultipartBody.Part;
				public create(param0: okhttp3.Headers, param1: okhttp3.RequestBody): okhttp3.MultipartBody.Part;
			}
		}
	}
}

declare module okhttp3 {
	export class MultipartReader extends java.lang.Object implements java.io.Closeable {
		public static class: java.lang.Class<okhttp3.MultipartReader>;
		public boundary(): string;
		public close(): void;
		public nextPart(): okhttp3.MultipartReader.Part;
		public constructor(param0: okio.BufferedSource, param1: string);
		public constructor(param0: okhttp3.ResponseBody);
	}
	export module MultipartReader {
		export class Companion extends java.lang.Object {
			public static class: java.lang.Class<okhttp3.MultipartReader.Companion>;
			public getAfterBoundaryOptions(): okio.Options;
		}
		export class Part extends java.lang.Object implements java.io.Closeable {
			public static class: java.lang.Class<okhttp3.MultipartReader.Part>;
			public constructor(param0: okhttp3.Headers, param1: okio.BufferedSource);
			public headers(): okhttp3.Headers;
			public body(): okio.BufferedSource;
			public close(): void;
		}
		export class PartSource extends java.lang.Object {
			public static class: java.lang.Class<okhttp3.MultipartReader.PartSource>;
			public constructor(param0: okhttp3.MultipartReader);
			public timeout(): okio.Timeout;
			public read(param0: okio.Buffer, param1: number): number;
			public close(): void;
		}
	}
}

declare module okhttp3 {
	export class OkHttp extends java.lang.Object {
		public static class: java.lang.Class<okhttp3.OkHttp>;
		public static INSTANCE: okhttp3.OkHttp;
		public static VERSION: string;
	}
}

declare module okhttp3 {
	export class OkHttpClient extends java.lang.Object implements java.lang.Cloneable, okhttp3.Call.Factory, okhttp3.WebSocket.Factory {
		public static class: java.lang.Class<okhttp3.OkHttpClient>;
		/** @deprecated */
		public proxy(): java.net.Proxy;
		/** @deprecated */
		public proxyAuthenticator(): okhttp3.Authenticator;
		/** @deprecated */
		public callTimeoutMillis(): number;
		public connectionPool(): okhttp3.ConnectionPool;
		public cache(): okhttp3.Cache;
		/** @deprecated */
		public protocols(): java.util.List<okhttp3.Protocol>;
		/** @deprecated */
		public dispatcher(): okhttp3.Dispatcher;
		public dns(): okhttp3.Dns;
		public proxyAuthenticator(): okhttp3.Authenticator;
		public hostnameVerifier(): javax.net.ssl.HostnameVerifier;
		public callTimeoutMillis(): number;
		public connectTimeoutMillis(): number;
		public newBuilder(): okhttp3.OkHttpClient.Builder;
		/** @deprecated */
		public networkInterceptors(): java.util.List<okhttp3.Interceptor>;
		/** @deprecated */
		public sslSocketFactory(): javax.net.ssl.SSLSocketFactory;
		public constructor();
		public followRedirects(): boolean;
		public interceptors(): java.util.List<okhttp3.Interceptor>;
		/** @deprecated */
		public connectTimeoutMillis(): number;
		/** @deprecated */
		public dns(): okhttp3.Dns;
		public socketFactory(): javax.net.SocketFactory;
		public retryOnConnectionFailure(): boolean;
		public constructor(param0: okhttp3.OkHttpClient.Builder);
		/** @deprecated */
		public hostnameVerifier(): javax.net.ssl.HostnameVerifier;
		public proxy(): java.net.Proxy;
		public sslSocketFactory(): javax.net.ssl.SSLSocketFactory;
		public certificatePinner(): okhttp3.CertificatePinner;
		/** @deprecated */
		public proxySelector(): java.net.ProxySelector;
		public clone(): any;
		public dispatcher(): okhttp3.Dispatcher;
		/** @deprecated */
		public interceptors(): java.util.List<okhttp3.Interceptor>;
		public certificateChainCleaner(): okhttp3.internal.tls.CertificateChainCleaner;
		public protocols(): java.util.List<okhttp3.Protocol>;
		/** @deprecated */
		public followSslRedirects(): boolean;
		/** @deprecated */
		public writeTimeoutMillis(): number;
		/** @deprecated */
		public cache(): okhttp3.Cache;
		/** @deprecated */
		public connectionPool(): okhttp3.ConnectionPool;
		/** @deprecated */
		public retryOnConnectionFailure(): boolean;
		public minWebSocketMessageToCompress(): number;
		public cookieJar(): okhttp3.CookieJar;
		public pingIntervalMillis(): number;
		/** @deprecated */
		public pingIntervalMillis(): number;
		public connectionSpecs(): java.util.List<okhttp3.ConnectionSpec>;
		/** @deprecated */
		public eventListenerFactory(): okhttp3.EventListener.Factory;
		/** @deprecated */
		public certificatePinner(): okhttp3.CertificatePinner;
		public proxySelector(): java.net.ProxySelector;
		/** @deprecated */
		public cookieJar(): okhttp3.CookieJar;
		public readTimeoutMillis(): number;
		public authenticator(): okhttp3.Authenticator;
		public getRouteDatabase(): okhttp3.internal.connection.RouteDatabase;
		/** @deprecated */
		public authenticator(): okhttp3.Authenticator;
		public writeTimeoutMillis(): number;
		/** @deprecated */
		public connectionSpecs(): java.util.List<okhttp3.ConnectionSpec>;
		public newWebSocket(param0: okhttp3.Request, param1: okhttp3.WebSocketListener): okhttp3.WebSocket;
		public followSslRedirects(): boolean;
		/** @deprecated */
		public readTimeoutMillis(): number;
		/** @deprecated */
		public followRedirects(): boolean;
		public networkInterceptors(): java.util.List<okhttp3.Interceptor>;
		public eventListenerFactory(): okhttp3.EventListener.Factory;
		public x509TrustManager(): javax.net.ssl.X509TrustManager;
		public newCall(param0: okhttp3.Request): okhttp3.Call;
		/** @deprecated */
		public socketFactory(): javax.net.SocketFactory;
	}
	export module OkHttpClient {
		export class Builder extends java.lang.Object {
			public static class: java.lang.Class<okhttp3.OkHttpClient.Builder>;
			public addInterceptor(param0: okhttp3.Interceptor): okhttp3.OkHttpClient.Builder;
			public getRetryOnConnectionFailure$okhttp(): boolean;
			public setProxy$okhttp(param0: java.net.Proxy): void;
			public getDispatcher$okhttp(): okhttp3.Dispatcher;
			public getProxyAuthenticator$okhttp(): okhttp3.Authenticator;
			public readTimeout(param0: java.time.Duration): okhttp3.OkHttpClient.Builder;
			public setDns$okhttp(param0: okhttp3.Dns): void;
			public protocols(param0: java.util.List<any>): okhttp3.OkHttpClient.Builder;
			public eventListener(param0: okhttp3.EventListener): okhttp3.OkHttpClient.Builder;
			public getProxy$okhttp(): java.net.Proxy;
			public getSslSocketFactoryOrNull$okhttp(): javax.net.ssl.SSLSocketFactory;
			public cookieJar(param0: okhttp3.CookieJar): okhttp3.OkHttpClient.Builder;
			public getFollowSslRedirects$okhttp(): boolean;
			public connectTimeout(param0: number, param1: java.util.concurrent.TimeUnit): okhttp3.OkHttpClient.Builder;
			public pingInterval(param0: java.time.Duration): okhttp3.OkHttpClient.Builder;
			public constructor();
			public dispatcher(param0: okhttp3.Dispatcher): okhttp3.OkHttpClient.Builder;
			public socketFactory(param0: javax.net.SocketFactory): okhttp3.OkHttpClient.Builder;
			public writeTimeout(param0: number, param1: java.util.concurrent.TimeUnit): okhttp3.OkHttpClient.Builder;
			public hostnameVerifier(param0: javax.net.ssl.HostnameVerifier): okhttp3.OkHttpClient.Builder;
			public getWriteTimeout$okhttp(): number;
			public setX509TrustManagerOrNull$okhttp(param0: javax.net.ssl.X509TrustManager): void;
			public getProtocols$okhttp(): java.util.List<okhttp3.Protocol>;
			/** @deprecated */
			public sslSocketFactory(param0: javax.net.ssl.SSLSocketFactory): okhttp3.OkHttpClient.Builder;
			public getReadTimeout$okhttp(): number;
			public minWebSocketMessageToCompress(param0: number): okhttp3.OkHttpClient.Builder;
			public setCertificateChainCleaner$okhttp(param0: okhttp3.internal.tls.CertificateChainCleaner): void;
			public readTimeout(param0: number, param1: java.util.concurrent.TimeUnit): okhttp3.OkHttpClient.Builder;
			public build(): okhttp3.OkHttpClient;
			public cache(param0: okhttp3.Cache): okhttp3.OkHttpClient.Builder;
			public setMinWebSocketMessageToCompress$okhttp(param0: number): void;
			public addNetworkInterceptor(param0: any): okhttp3.OkHttpClient.Builder;
			public getConnectionPool$okhttp(): okhttp3.ConnectionPool;
			public setCallTimeout$okhttp(param0: number): void;
			public setCertificatePinner$okhttp(param0: okhttp3.CertificatePinner): void;
			public setRouteDatabase$okhttp(param0: okhttp3.internal.connection.RouteDatabase): void;
			public getAuthenticator$okhttp(): okhttp3.Authenticator;
			public setCache$okhttp(param0: okhttp3.Cache): void;
			public connectTimeout(param0: java.time.Duration): okhttp3.OkHttpClient.Builder;
			public setProxyAuthenticator$okhttp(param0: okhttp3.Authenticator): void;
			public setAuthenticator$okhttp(param0: okhttp3.Authenticator): void;
			public getCertificateChainCleaner$okhttp(): okhttp3.internal.tls.CertificateChainCleaner;
			public setPingInterval$okhttp(param0: number): void;
			public addNetworkInterceptor(param0: okhttp3.Interceptor): okhttp3.OkHttpClient.Builder;
			public setConnectionSpecs$okhttp(param0: java.util.List<okhttp3.ConnectionSpec>): void;
			public getCertificatePinner$okhttp(): okhttp3.CertificatePinner;
			public getDns$okhttp(): okhttp3.Dns;
			public getCookieJar$okhttp(): okhttp3.CookieJar;
			public connectionPool(param0: okhttp3.ConnectionPool): okhttp3.OkHttpClient.Builder;
			public setReadTimeout$okhttp(param0: number): void;
			public getNetworkInterceptors$okhttp(): java.util.List<okhttp3.Interceptor>;
			public connectionSpecs(param0: java.util.List<okhttp3.ConnectionSpec>): okhttp3.OkHttpClient.Builder;
			public setConnectTimeout$okhttp(param0: number): void;
			public proxyAuthenticator(param0: okhttp3.Authenticator): okhttp3.OkHttpClient.Builder;
			public followRedirects(param0: boolean): okhttp3.OkHttpClient.Builder;
			public setFollowSslRedirects$okhttp(param0: boolean): void;
			public callTimeout(param0: java.time.Duration): okhttp3.OkHttpClient.Builder;
			public getCallTimeout$okhttp(): number;
			public setCookieJar$okhttp(param0: okhttp3.CookieJar): void;
			public retryOnConnectionFailure(param0: boolean): okhttp3.OkHttpClient.Builder;
			public authenticator(param0: okhttp3.Authenticator): okhttp3.OkHttpClient.Builder;
			public constructor(param0: okhttp3.OkHttpClient);
			public setHostnameVerifier$okhttp(param0: javax.net.ssl.HostnameVerifier): void;
			public certificatePinner(param0: okhttp3.CertificatePinner): okhttp3.OkHttpClient.Builder;
			public getCache$okhttp(): okhttp3.Cache;
			public setSslSocketFactoryOrNull$okhttp(param0: javax.net.ssl.SSLSocketFactory): void;
			public setEventListenerFactory$okhttp(param0: okhttp3.EventListener.Factory): void;
			public interceptors(): java.util.List<okhttp3.Interceptor>;
			public getInterceptors$okhttp(): java.util.List<okhttp3.Interceptor>;
			public getConnectTimeout$okhttp(): number;
			public dns(param0: okhttp3.Dns): okhttp3.OkHttpClient.Builder;
			public callTimeout(param0: number, param1: java.util.concurrent.TimeUnit): okhttp3.OkHttpClient.Builder;
			public getConnectionSpecs$okhttp(): java.util.List<okhttp3.ConnectionSpec>;
			public writeTimeout(param0: java.time.Duration): okhttp3.OkHttpClient.Builder;
			public eventListenerFactory(param0: okhttp3.EventListener.Factory): okhttp3.OkHttpClient.Builder;
			public pingInterval(param0: number, param1: java.util.concurrent.TimeUnit): okhttp3.OkHttpClient.Builder;
			public setFollowRedirects$okhttp(param0: boolean): void;
			public setWriteTimeout$okhttp(param0: number): void;
			public setConnectionPool$okhttp(param0: okhttp3.ConnectionPool): void;
			public getProxySelector$okhttp(): java.net.ProxySelector;
			public setSocketFactory$okhttp(param0: javax.net.SocketFactory): void;
			public networkInterceptors(): java.util.List<okhttp3.Interceptor>;
			public getHostnameVerifier$okhttp(): javax.net.ssl.HostnameVerifier;
			public sslSocketFactory(param0: javax.net.ssl.SSLSocketFactory, param1: javax.net.ssl.X509TrustManager): okhttp3.OkHttpClient.Builder;
			public followSslRedirects(param0: boolean): okhttp3.OkHttpClient.Builder;
			public getX509TrustManagerOrNull$okhttp(): javax.net.ssl.X509TrustManager;
			public setProtocols$okhttp(param0: java.util.List<any>): void;
			public getPingInterval$okhttp(): number;
			public setRetryOnConnectionFailure$okhttp(param0: boolean): void;
			public proxySelector(param0: java.net.ProxySelector): okhttp3.OkHttpClient.Builder;
			public addInterceptor(param0: any): okhttp3.OkHttpClient.Builder;
			public getEventListenerFactory$okhttp(): okhttp3.EventListener.Factory;
			public getSocketFactory$okhttp(): javax.net.SocketFactory;
			public setDispatcher$okhttp(param0: okhttp3.Dispatcher): void;
			public getFollowRedirects$okhttp(): boolean;
			public getMinWebSocketMessageToCompress$okhttp(): number;
			public setProxySelector$okhttp(param0: java.net.ProxySelector): void;
			public proxy(param0: java.net.Proxy): okhttp3.OkHttpClient.Builder;
			public getRouteDatabase$okhttp(): okhttp3.internal.connection.RouteDatabase;
		}
		export class Companion extends java.lang.Object {
			public static class: java.lang.Class<okhttp3.OkHttpClient.Companion>;
			public getDEFAULT_CONNECTION_SPECS$okhttp(): java.util.List<okhttp3.ConnectionSpec>;
			public getDEFAULT_PROTOCOLS$okhttp(): java.util.List<okhttp3.Protocol>;
		}
	}
}

declare module okhttp3 {
	export class Protocol {
		public static class: java.lang.Class<okhttp3.Protocol>;
		public static HTTP_1_0: okhttp3.Protocol;
		public static HTTP_1_1: okhttp3.Protocol;
		public static SPDY_3: okhttp3.Protocol;
		public static HTTP_2: okhttp3.Protocol;
		public static H2_PRIOR_KNOWLEDGE: okhttp3.Protocol;
		public static QUIC: okhttp3.Protocol;
		public static valueOf(param0: string): okhttp3.Protocol;
		public static get(param0: string): okhttp3.Protocol;
		public static valueOf(param0: java.lang.Class<any>, param1: string): java.lang.Enum<any>;
		public static values(): androidNative.Array<okhttp3.Protocol>;
		public toString(): string;
	}
	export module Protocol {
		export class Companion extends java.lang.Object {
			public static class: java.lang.Class<okhttp3.Protocol.Companion>;
			public get(param0: string): okhttp3.Protocol;
		}
	}
}

declare module okhttp3 {
	export class Request extends java.lang.Object {
		public static class: java.lang.Class<okhttp3.Request>;
		/** @deprecated */
		public url(): okhttp3.HttpUrl;
		public headers(): okhttp3.Headers;
		public tag(): any;
		public newBuilder(): okhttp3.Request.Builder;
		public constructor(param0: okhttp3.HttpUrl, param1: string, param2: okhttp3.Headers, param3: okhttp3.RequestBody, param4: java.util.Map<java.lang.Class<any>,any>);
		public url(): okhttp3.HttpUrl;
		public cacheControl(): okhttp3.CacheControl;
		public method(): string;
		public toString(): string;
		public header(param0: string): string;
		public headers(param0: string): java.util.List<string>;
		/** @deprecated */
		public body(): okhttp3.RequestBody;
		/** @deprecated */
		public cacheControl(): okhttp3.CacheControl;
		public getTags$okhttp(): java.util.Map<java.lang.Class<any>,any>;
		/** @deprecated */
		public method(): string;
		public tag(param0: java.lang.Class<any>): any;
		public body(): okhttp3.RequestBody;
		public isHttps(): boolean;
		/** @deprecated */
		public headers(): okhttp3.Headers;
	}
	export module Request {
		export class Builder extends java.lang.Object {
			public static class: java.lang.Class<okhttp3.Request.Builder>;
			public setMethod$okhttp(param0: string): void;
			public url(param0: okhttp3.HttpUrl): okhttp3.Request.Builder;
			public tag(param0: any): okhttp3.Request.Builder;
			public constructor(param0: okhttp3.Request);
			public url(param0: java.net.URL): okhttp3.Request.Builder;
			public header(param0: string, param1: string): okhttp3.Request.Builder;
			public put(param0: okhttp3.RequestBody): okhttp3.Request.Builder;
			public setBody$okhttp(param0: okhttp3.RequestBody): void;
			public get(): okhttp3.Request.Builder;
			public getUrl$okhttp(): okhttp3.HttpUrl;
			public post(param0: okhttp3.RequestBody): okhttp3.Request.Builder;
			public getTags$okhttp(): java.util.Map<java.lang.Class<any>,any>;
			public method(param0: string, param1: okhttp3.RequestBody): okhttp3.Request.Builder;
			public url(param0: string): okhttp3.Request.Builder;
			public setHeaders$okhttp(param0: okhttp3.Headers.Builder): void;
			public removeHeader(param0: string): okhttp3.Request.Builder;
			public head(): okhttp3.Request.Builder;
			public setTags$okhttp(param0: java.util.Map<java.lang.Class<any>,any>): void;
			public setUrl$okhttp(param0: okhttp3.HttpUrl): void;
			public getMethod$okhttp(): string;
			public tag(param0: java.lang.Class<any>, param1: any): okhttp3.Request.Builder;
			public headers(param0: okhttp3.Headers): okhttp3.Request.Builder;
			public delete(): okhttp3.Request.Builder;
			public constructor();
			public addHeader(param0: string, param1: string): okhttp3.Request.Builder;
			public getBody$okhttp(): okhttp3.RequestBody;
			public delete(param0: okhttp3.RequestBody): okhttp3.Request.Builder;
			public patch(param0: okhttp3.RequestBody): okhttp3.Request.Builder;
			public build(): okhttp3.Request;
			public getHeaders$okhttp(): okhttp3.Headers.Builder;
			public cacheControl(param0: okhttp3.CacheControl): okhttp3.Request.Builder;
		}
	}
}

declare module okhttp3 {
	export abstract class RequestBody extends java.lang.Object {
		public static class: java.lang.Class<okhttp3.RequestBody>;
		public constructor();
		/** @deprecated */
		public static create(param0: okhttp3.MediaType, param1: androidNative.Array<number>, param2: number, param3: number): okhttp3.RequestBody;
		/** @deprecated */
		public static create(param0: okhttp3.MediaType, param1: androidNative.Array<number>, param2: number): okhttp3.RequestBody;
		public static create(param0: androidNative.Array<number>, param1: okhttp3.MediaType, param2: number, param3: number): okhttp3.RequestBody;
		/** @deprecated */
		public static create(param0: okhttp3.MediaType, param1: okio.ByteString): okhttp3.RequestBody;
		public static create(param0: androidNative.Array<number>, param1: okhttp3.MediaType): okhttp3.RequestBody;
		public isOneShot(): boolean;
		public static create(param0: androidNative.Array<number>, param1: okhttp3.MediaType, param2: number): okhttp3.RequestBody;
		/** @deprecated */
		public static create(param0: okhttp3.MediaType, param1: java.io.File): okhttp3.RequestBody;
		public writeTo(param0: okio.BufferedSink): void;
		public static create(param0: java.io.File, param1: okhttp3.MediaType): okhttp3.RequestBody;
		/** @deprecated */
		public static create(param0: okhttp3.MediaType, param1: string): okhttp3.RequestBody;
		public static create(param0: androidNative.Array<number>): okhttp3.RequestBody;
		public static create(param0: string, param1: okhttp3.MediaType): okhttp3.RequestBody;
		/** @deprecated */
		public static create(param0: okhttp3.MediaType, param1: androidNative.Array<number>): okhttp3.RequestBody;
		public contentType(): okhttp3.MediaType;
		public contentLength(): number;
		public isDuplex(): boolean;
		public static create(param0: okio.ByteString, param1: okhttp3.MediaType): okhttp3.RequestBody;
	}
	export module RequestBody {
		export class Companion extends java.lang.Object {
			public static class: java.lang.Class<okhttp3.RequestBody.Companion>;
			/** @deprecated */
			public create(param0: okhttp3.MediaType, param1: androidNative.Array<number>, param2: number): okhttp3.RequestBody;
			/** @deprecated */
			public create(param0: okhttp3.MediaType, param1: java.io.File): okhttp3.RequestBody;
			public create(param0: java.io.File, param1: okhttp3.MediaType): okhttp3.RequestBody;
			public create(param0: androidNative.Array<number>): okhttp3.RequestBody;
			/** @deprecated */
			public create(param0: okhttp3.MediaType, param1: string): okhttp3.RequestBody;
			public create(param0: androidNative.Array<number>, param1: okhttp3.MediaType, param2: number): okhttp3.RequestBody;
			public create(param0: androidNative.Array<number>, param1: okhttp3.MediaType): okhttp3.RequestBody;
			public create(param0: okio.ByteString, param1: okhttp3.MediaType): okhttp3.RequestBody;
			public create(param0: androidNative.Array<number>, param1: okhttp3.MediaType, param2: number, param3: number): okhttp3.RequestBody;
			/** @deprecated */
			public create(param0: okhttp3.MediaType, param1: okio.ByteString): okhttp3.RequestBody;
			/** @deprecated */
			public create(param0: okhttp3.MediaType, param1: androidNative.Array<number>): okhttp3.RequestBody;
			public create(param0: string, param1: okhttp3.MediaType): okhttp3.RequestBody;
			/** @deprecated */
			public create(param0: okhttp3.MediaType, param1: androidNative.Array<number>, param2: number, param3: number): okhttp3.RequestBody;
		}
	}
}

declare module okhttp3 {
	export class Response extends java.lang.Object implements java.io.Closeable {
		public static class: java.lang.Class<okhttp3.Response>;
		public headers(): okhttp3.Headers;
		public close(): void;
		public sentRequestAtMillis(): number;
		public cacheControl(): okhttp3.CacheControl;
		public exchange(): okhttp3.internal.connection.Exchange;
		public handshake(): okhttp3.Handshake;
		public peekBody(param0: number): okhttp3.ResponseBody;
		/** @deprecated */
		public request(): okhttp3.Request;
		/** @deprecated */
		public code(): number;
		public header(param0: string, param1: string): string;
		public header(param0: string): string;
		/** @deprecated */
		public priorResponse(): okhttp3.Response;
		public body(): okhttp3.ResponseBody;
		public networkResponse(): okhttp3.Response;
		/** @deprecated */
		public networkResponse(): okhttp3.Response;
		public trailers(): okhttp3.Headers;
		/** @deprecated */
		public cacheControl(): okhttp3.CacheControl;
		public request(): okhttp3.Request;
		public code(): number;
		public protocol(): okhttp3.Protocol;
		/** @deprecated */
		public protocol(): okhttp3.Protocol;
		/** @deprecated */
		public headers(): okhttp3.Headers;
		public priorResponse(): okhttp3.Response;
		/** @deprecated */
		public body(): okhttp3.ResponseBody;
		public constructor(param0: okhttp3.Request, param1: okhttp3.Protocol, param2: string, param3: number, param4: okhttp3.Handshake, param5: okhttp3.Headers, param6: okhttp3.ResponseBody, param7: okhttp3.Response, param8: okhttp3.Response, param9: okhttp3.Response, param10: number, param11: number, param12: okhttp3.internal.connection.Exchange);
		public cacheResponse(): okhttp3.Response;
		/** @deprecated */
		public sentRequestAtMillis(): number;
		public toString(): string;
		public isSuccessful(): boolean;
		/** @deprecated */
		public receivedResponseAtMillis(): number;
		/** @deprecated */
		public cacheResponse(): okhttp3.Response;
		public headers(param0: string): java.util.List<string>;
		public newBuilder(): okhttp3.Response.Builder;
		/** @deprecated */
		public message(): string;
		public message(): string;
		public receivedResponseAtMillis(): number;
		public challenges(): java.util.List<okhttp3.Challenge>;
		public isRedirect(): boolean;
		/** @deprecated */
		public handshake(): okhttp3.Handshake;
	}
	export module Response {
		export class Builder extends java.lang.Object {
			public static class: java.lang.Class<okhttp3.Response.Builder>;
			public cacheResponse(param0: okhttp3.Response): okhttp3.Response.Builder;
			public setBody$okhttp(param0: okhttp3.ResponseBody): void;
			public getExchange$okhttp(): okhttp3.internal.connection.Exchange;
			public setCacheResponse$okhttp(param0: okhttp3.Response): void;
			public request(param0: okhttp3.Request): okhttp3.Response.Builder;
			public sentRequestAtMillis(param0: number): okhttp3.Response.Builder;
			public setMessage$okhttp(param0: string): void;
			public getPriorResponse$okhttp(): okhttp3.Response;
			public priorResponse(param0: okhttp3.Response): okhttp3.Response.Builder;
			public setPriorResponse$okhttp(param0: okhttp3.Response): void;
			public initExchange$okhttp(param0: okhttp3.internal.connection.Exchange): void;
			public getProtocol$okhttp(): okhttp3.Protocol;
			public removeHeader(param0: string): okhttp3.Response.Builder;
			public setHandshake$okhttp(param0: okhttp3.Handshake): void;
			public setRequest$okhttp(param0: okhttp3.Request): void;
			public getSentRequestAtMillis$okhttp(): number;
			public setReceivedResponseAtMillis$okhttp(param0: number): void;
			public setHeaders$okhttp(param0: okhttp3.Headers.Builder): void;
			public getRequest$okhttp(): okhttp3.Request;
			public setNetworkResponse$okhttp(param0: okhttp3.Response): void;
			public getCacheResponse$okhttp(): okhttp3.Response;
			public protocol(param0: okhttp3.Protocol): okhttp3.Response.Builder;
			public receivedResponseAtMillis(param0: number): okhttp3.Response.Builder;
			public body(param0: okhttp3.ResponseBody): okhttp3.Response.Builder;
			public message(param0: string): okhttp3.Response.Builder;
			public constructor(param0: okhttp3.Response);
			public setExchange$okhttp(param0: okhttp3.internal.connection.Exchange): void;
			public header(param0: string, param1: string): okhttp3.Response.Builder;
			public getMessage$okhttp(): string;
			public headers(param0: okhttp3.Headers): okhttp3.Response.Builder;
			public setCode$okhttp(param0: number): void;
			public getBody$okhttp(): okhttp3.ResponseBody;
			public networkResponse(param0: okhttp3.Response): okhttp3.Response.Builder;
			public constructor();
			public getReceivedResponseAtMillis$okhttp(): number;
			public setProtocol$okhttp(param0: okhttp3.Protocol): void;
			public handshake(param0: okhttp3.Handshake): okhttp3.Response.Builder;
			public getCode$okhttp(): number;
			public addHeader(param0: string, param1: string): okhttp3.Response.Builder;
			public getHeaders$okhttp(): okhttp3.Headers.Builder;
			public setSentRequestAtMillis$okhttp(param0: number): void;
			public getNetworkResponse$okhttp(): okhttp3.Response;
			public code(param0: number): okhttp3.Response.Builder;
			public build(): okhttp3.Response;
			public getHandshake$okhttp(): okhttp3.Handshake;
		}
	}
}

declare module okhttp3 {
	export abstract class ResponseBody extends java.lang.Object implements java.io.Closeable {
		public static class: java.lang.Class<okhttp3.ResponseBody>;
		public constructor();
		public byteStream(): java.io.InputStream;
		/** @deprecated */
		public static create(param0: okhttp3.MediaType, param1: number, param2: okio.BufferedSource): okhttp3.ResponseBody;
		public close(): void;
		public static create(param0: androidNative.Array<number>, param1: okhttp3.MediaType): okhttp3.ResponseBody;
		/** @deprecated */
		public static create(param0: okhttp3.MediaType, param1: okio.ByteString): okhttp3.ResponseBody;
		public byteString(): okio.ByteString;
		public source(): okio.BufferedSource;
		public static create(param0: string, param1: okhttp3.MediaType): okhttp3.ResponseBody;
		public bytes(): androidNative.Array<number>;
		public static create(param0: okio.BufferedSource, param1: okhttp3.MediaType, param2: number): okhttp3.ResponseBody;
		public charStream(): java.io.Reader;
		public static create(param0: okio.ByteString, param1: okhttp3.MediaType): okhttp3.ResponseBody;
		public contentType(): okhttp3.MediaType;
		public string(): string;
		public contentLength(): number;
		/** @deprecated */
		public static create(param0: okhttp3.MediaType, param1: androidNative.Array<number>): okhttp3.ResponseBody;
		/** @deprecated */
		public static create(param0: okhttp3.MediaType, param1: string): okhttp3.ResponseBody;
	}
	export module ResponseBody {
		export class BomAwareReader extends java.io.Reader {
			public static class: java.lang.Class<okhttp3.ResponseBody.BomAwareReader>;
			public read(param0: androidNative.Array<string>): number;
			public read(param0: java.nio.CharBuffer): number;
			public constructor();
			public constructor(param0: okio.BufferedSource, param1: java.nio.charset.Charset);
			public close(): void;
			public constructor(param0: any);
			public read(param0: androidNative.Array<string>, param1: number, param2: number): number;
			public read(): number;
		}
		export class Companion extends java.lang.Object {
			public static class: java.lang.Class<okhttp3.ResponseBody.Companion>;
			public create(param0: androidNative.Array<number>, param1: okhttp3.MediaType): okhttp3.ResponseBody;
			/** @deprecated */
			public create(param0: okhttp3.MediaType, param1: okio.ByteString): okhttp3.ResponseBody;
			/** @deprecated */
			public create(param0: okhttp3.MediaType, param1: string): okhttp3.ResponseBody;
			public create(param0: okio.BufferedSource, param1: okhttp3.MediaType, param2: number): okhttp3.ResponseBody;
			public create(param0: string, param1: okhttp3.MediaType): okhttp3.ResponseBody;
			public create(param0: okio.ByteString, param1: okhttp3.MediaType): okhttp3.ResponseBody;
			/** @deprecated */
			public create(param0: okhttp3.MediaType, param1: number, param2: okio.BufferedSource): okhttp3.ResponseBody;
			/** @deprecated */
			public create(param0: okhttp3.MediaType, param1: androidNative.Array<number>): okhttp3.ResponseBody;
		}
	}
}

declare module okhttp3 {
	export class Route extends java.lang.Object {
		public static class: java.lang.Class<okhttp3.Route>;
		/** @deprecated */
		public proxy(): java.net.Proxy;
		public proxy(): java.net.Proxy;
		public constructor(param0: okhttp3.Address, param1: java.net.Proxy, param2: java.net.InetSocketAddress);
		public equals(param0: any): boolean;
		public address(): okhttp3.Address;
		public hashCode(): number;
		/** @deprecated */
		public socketAddress(): java.net.InetSocketAddress;
		public toString(): string;
		/** @deprecated */
		public address(): okhttp3.Address;
		public requiresTunnel(): boolean;
		public socketAddress(): java.net.InetSocketAddress;
	}
}

declare module okhttp3 {
	export class TlsVersion {
		public static class: java.lang.Class<okhttp3.TlsVersion>;
		public static TLS_1_3: okhttp3.TlsVersion;
		public static TLS_1_2: okhttp3.TlsVersion;
		public static TLS_1_1: okhttp3.TlsVersion;
		public static TLS_1_0: okhttp3.TlsVersion;
		public static SSL_3_0: okhttp3.TlsVersion;
		public javaName(): string;
		public static values(): androidNative.Array<okhttp3.TlsVersion>;
		public static valueOf(param0: java.lang.Class<any>, param1: string): java.lang.Enum<any>;
		/** @deprecated */
		public javaName(): string;
		public static valueOf(param0: string): okhttp3.TlsVersion;
		public static forJavaName(param0: string): okhttp3.TlsVersion;
	}
	export module TlsVersion {
		export class Companion extends java.lang.Object {
			public static class: java.lang.Class<okhttp3.TlsVersion.Companion>;
			public forJavaName(param0: string): okhttp3.TlsVersion;
		}
	}
}

declare module okhttp3 {
	export class WebSocket extends java.lang.Object {
		public static class: java.lang.Class<okhttp3.WebSocket>;
		/**
		 * Constructs a new instance of the okhttp3.WebSocket interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
		 */
		public constructor(implementation: {
			request(): okhttp3.Request;
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
		public request(): okhttp3.Request;
		public queueSize(): number;
		public cancel(): void;
	}
	export module WebSocket {
		export class Factory extends java.lang.Object {
			public static class: java.lang.Class<okhttp3.WebSocket.Factory>;
			/**
			 * Constructs a new instance of the okhttp3.WebSocket$Factory interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
			 */
			public constructor(implementation: {
				newWebSocket(param0: okhttp3.Request, param1: okhttp3.WebSocketListener): okhttp3.WebSocket;
			});
			public constructor();
			public newWebSocket(param0: okhttp3.Request, param1: okhttp3.WebSocketListener): okhttp3.WebSocket;
		}
	}
}

declare module okhttp3 {
	export abstract class WebSocketListener extends java.lang.Object {
		public static class: java.lang.Class<okhttp3.WebSocketListener>;
		public constructor();
		public onClosed(param0: okhttp3.WebSocket, param1: number, param2: string): void;
		public onMessage(param0: okhttp3.WebSocket, param1: okio.ByteString): void;
		public onFailure(param0: okhttp3.WebSocket, param1: java.lang.Throwable, param2: okhttp3.Response): void;
		public onOpen(param0: okhttp3.WebSocket, param1: okhttp3.Response): void;
		public onClosing(param0: okhttp3.WebSocket, param1: number, param2: string): void;
		public onMessage(param0: okhttp3.WebSocket, param1: string): void;
	}
}

declare module okhttp3 {
	export module internal {
		export class Internal extends java.lang.Object {
			public static class: java.lang.Class<okhttp3.internal.Internal>;
			public static cacheGet(param0: okhttp3.Cache, param1: okhttp3.Request): okhttp3.Response;
			public static addHeaderLenient(param0: okhttp3.Headers.Builder, param1: string, param2: string): okhttp3.Headers.Builder;
			public static parseCookie(param0: number, param1: okhttp3.HttpUrl, param2: string): okhttp3.Cookie;
			public static applyConnectionSpec(param0: okhttp3.ConnectionSpec, param1: javax.net.ssl.SSLSocket, param2: boolean): void;
			public static cookieToString(param0: okhttp3.Cookie, param1: boolean): string;
			public static addHeaderLenient(param0: okhttp3.Headers.Builder, param1: string): okhttp3.Headers.Builder;
		}
	}
}

declare module okhttp3 {
	export module internal {
		export class SuppressSignatureCheck extends java.lang.Object implements java.lang.annotation.Annotation {
			public static class: java.lang.Class<okhttp3.internal.SuppressSignatureCheck>;
			/**
			 * Constructs a new instance of the okhttp3.internal.SuppressSignatureCheck interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
			 */
			public constructor(implementation: {
				equals(param0: any): boolean;
				hashCode(): number;
				toString(): string;
				annotationType(): java.lang.Class<any>;
			});
			public constructor();
			public equals(param0: any): boolean;
			public toString(): string;
			public annotationType(): java.lang.Class<any>;
			public hashCode(): number;
		}
	}
}

declare module okhttp3 {
	export module internal {
		export class Util extends java.lang.Object {
			public static class: java.lang.Class<okhttp3.internal.Util>;
			public static EMPTY_BYTE_ARRAY: androidNative.Array<number>;
			public static EMPTY_HEADERS: okhttp3.Headers;
			public static EMPTY_RESPONSE: okhttp3.ResponseBody;
			public static EMPTY_REQUEST: okhttp3.RequestBody;
			public static UTC: java.util.TimeZone;
			public static assertionsEnabled: boolean;
			public static okHttpName: string;
			public static userAgent: string;
			public static toHostHeader(param0: okhttp3.HttpUrl, param1: boolean): string;
			public static toHeaderList(param0: okhttp3.Headers): java.util.List<okhttp3.internal.http2.Header>;
			public static isSensitiveHeader(param0: string): boolean;
			public static canReuseConnectionFor(param0: okhttp3.HttpUrl, param1: okhttp3.HttpUrl): boolean;
			public static toLongOrDefault(param0: string, param1: number): number;
			public static format(param0: string, param1: androidNative.Array<any>): string;
			public static withSuppressed(param0: java.lang.Exception, param1: java.util.List<any>): java.lang.Throwable;
			public static headersContentLength(param0: okhttp3.Response): number;
			public static addIfAbsent(param0: java.util.List<any>, param1: any): void;
			public static canParseAsIpAddress(param0: string): boolean;
			public static isHealthy(param0: java.net.Socket, param1: okio.BufferedSource): boolean;
			public static asFactory(param0: okhttp3.EventListener): okhttp3.EventListener.Factory;
			public static indexOfNonWhitespace(param0: string, param1: number): number;
			public static parseHexDigit(param0: string): number;
			public static isCivilized(param0: okhttp3.internal.io.FileSystem, param1: java.io.File): boolean;
			public static readBomAsCharset(param0: okio.BufferedSource, param1: java.nio.charset.Charset): java.nio.charset.Charset;
			public static indexOfLastNonAsciiWhitespace(param0: string, param1: number, param2: number): number;
			public static discard(param0: okio.Source, param1: number, param2: java.util.concurrent.TimeUnit): boolean;
			public static skipAll(param0: okio.Buffer, param1: number): number;
			public static toHexString(param0: number): string;
			public static intersect(param0: androidNative.Array<string>, param1: androidNative.Array<string>, param2: java.util.Comparator<any>): androidNative.Array<string>;
			public static toImmutableList(param0: java.util.List<any>): java.util.List<any>;
			public static assertThreadHoldsLock(param0: any): void;
			public static notify(param0: any): void;
			public static threadFactory(param0: string, param1: boolean): java.util.concurrent.ThreadFactory;
			public static concat(param0: androidNative.Array<string>, param1: string): androidNative.Array<string>;
			public static skipAll(param0: okio.Source, param1: number, param2: java.util.concurrent.TimeUnit): boolean;
			public static checkOffsetAndCount(param0: number, param1: number, param2: number): void;
			public wait(param0: number): void;
			public static readFieldOrNull(param0: any, param1: java.lang.Class<any>, param2: string): any;
			public static filterList(param0: java.lang.Iterable<any>, param1: any): java.util.List<any>;
			public static hasIntersection(param0: androidNative.Array<string>, param1: androidNative.Array<string>, param2: java.util.Comparator<any>): boolean;
			public static indexOfFirstNonAsciiWhitespace(param0: string, param1: number, param2: number): number;
			public static toNonNegativeInt(param0: string, param1: number): number;
			public static indexOfControlOrNonAscii(param0: string): number;
			public static wait(param0: any): void;
			public static delimiterOffset(param0: string, param1: string, param2: number, param3: number): number;
			public static immutableListOf(param0: androidNative.Array<any>): java.util.List<any>;
			public wait(): void;
			public static ignoreIoExceptions(param0: any): void;
			public static closeQuietly(param0: java.io.Closeable): void;
			public static trimSubstring(param0: string, param1: number, param2: number): string;
			public notify(): void;
			public static closeQuietly(param0: java.net.Socket): void;
			public static checkDuration(param0: string, param1: number, param2: java.util.concurrent.TimeUnit): number;
			public static toImmutableMap(param0: java.util.Map<any,any>): java.util.Map<any,any>;
			public static notifyAll(param0: any): void;
			public static readMedium(param0: okio.BufferedSource): number;
			public static toHeaders(param0: java.util.List<okhttp3.internal.http2.Header>): okhttp3.Headers;
			public static peerName(param0: java.net.Socket): string;
			public static assertThreadDoesntHoldLock(param0: any): void;
			public wait(param0: number, param1: number): void;
			public static indexOf(param0: androidNative.Array<string>, param1: string, param2: java.util.Comparator<string>): number;
			public notifyAll(): void;
			public static closeQuietly(param0: java.net.ServerSocket): void;
			public static and(param0: number, param1: number): number;
			public static writeMedium(param0: okio.BufferedSink, param1: number): void;
			public static threadName(param0: string, param1: any): void;
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module authenticator {
			export class JavaNetAuthenticator extends java.lang.Object implements okhttp3.Authenticator {
				public static class: java.lang.Class<okhttp3.internal.authenticator.JavaNetAuthenticator>;
				public constructor(param0: okhttp3.Dns);
				public authenticate(param0: okhttp3.Route, param1: okhttp3.Response): okhttp3.Request;
				public constructor();
			}
			export module JavaNetAuthenticator {
				export class WhenMappings extends java.lang.Object {
					public static class: java.lang.Class<okhttp3.internal.authenticator.JavaNetAuthenticator.WhenMappings>;
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module cache {
			export class CacheInterceptor extends java.lang.Object implements okhttp3.Interceptor {
				public static class: java.lang.Class<okhttp3.internal.cache.CacheInterceptor>;
				public intercept(param0: okhttp3.Interceptor.Chain): okhttp3.Response;
				public getCache$okhttp(): okhttp3.Cache;
				public constructor(param0: okhttp3.Cache);
			}
			export module CacheInterceptor {
				export class Companion extends java.lang.Object {
					public static class: java.lang.Class<okhttp3.internal.cache.CacheInterceptor.Companion>;
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module cache {
			export class CacheRequest extends java.lang.Object {
				public static class: java.lang.Class<okhttp3.internal.cache.CacheRequest>;
				/**
				 * Constructs a new instance of the okhttp3.internal.cache.CacheRequest interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
				 */
				public constructor(implementation: {
					body(): okio.Sink;
					abort(): void;
				});
				public constructor();
				public abort(): void;
				public body(): okio.Sink;
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module cache {
			export class CacheStrategy extends java.lang.Object {
				public static class: java.lang.Class<okhttp3.internal.cache.CacheStrategy>;
				public constructor(param0: okhttp3.Request, param1: okhttp3.Response);
				public getNetworkRequest(): okhttp3.Request;
				public getCacheResponse(): okhttp3.Response;
			}
			export module CacheStrategy {
				export class Companion extends java.lang.Object {
					public static class: java.lang.Class<okhttp3.internal.cache.CacheStrategy.Companion>;
					public isCacheable(param0: okhttp3.Response, param1: okhttp3.Request): boolean;
				}
				export class Factory extends java.lang.Object {
					public static class: java.lang.Class<okhttp3.internal.cache.CacheStrategy.Factory>;
					public compute(): okhttp3.internal.cache.CacheStrategy;
					public constructor(param0: number, param1: okhttp3.Request, param2: okhttp3.Response);
					public getRequest$okhttp(): okhttp3.Request;
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module cache {
			export class DiskLruCache extends java.lang.Object implements java.io.Closeable, java.io.Flushable {
				public static class: java.lang.Class<okhttp3.internal.cache.DiskLruCache>;
				public static JOURNAL_FILE: string;
				public static JOURNAL_FILE_TEMP: string;
				public static JOURNAL_FILE_BACKUP: string;
				public static MAGIC: string;
				public static VERSION_1: string;
				public static ANY_SEQUENCE_NUMBER: number;
				public static LEGAL_KEY_PATTERN: any;
				public static CLEAN: string;
				public static DIRTY: string;
				public static REMOVE: string;
				public static READ: string;
				public remove(param0: string): boolean;
				public getClosed$okhttp(): boolean;
				public edit(param0: string, param1: number): okhttp3.internal.cache.DiskLruCache.Editor;
				public getDirectory(): java.io.File;
				public getValueCount$okhttp(): number;
				public get(param0: string): okhttp3.internal.cache.DiskLruCache.Snapshot;
				public flush(): void;
				public constructor(param0: okhttp3.internal.io.FileSystem, param1: java.io.File, param2: number, param3: number, param4: number, param5: okhttp3.internal.concurrent.TaskRunner);
				public trimToSize(): void;
				public delete(): void;
				public getLruEntries$okhttp(): java.util.LinkedHashMap<string,okhttp3.internal.cache.DiskLruCache.Entry>;
				public evictAll(): void;
				public rebuildJournal$okhttp(): void;
				public close(): void;
				public snapshots(): java.util.Iterator<okhttp3.internal.cache.DiskLruCache.Snapshot>;
				public isClosed(): boolean;
				public size(): number;
				public setMaxSize(param0: number): void;
				public setClosed$okhttp(param0: boolean): void;
				public edit(param0: string): okhttp3.internal.cache.DiskLruCache.Editor;
				public initialize(): void;
				public removeEntry$okhttp(param0: okhttp3.internal.cache.DiskLruCache.Entry): boolean;
				public completeEdit$okhttp(param0: okhttp3.internal.cache.DiskLruCache.Editor, param1: boolean): void;
				public getMaxSize(): number;
				public getFileSystem$okhttp(): okhttp3.internal.io.FileSystem;
			}
			export module DiskLruCache {
				export class Companion extends java.lang.Object {
					public static class: java.lang.Class<okhttp3.internal.cache.DiskLruCache.Companion>;
				}
				export class Editor extends java.lang.Object {
					public static class: java.lang.Class<okhttp3.internal.cache.DiskLruCache.Editor>;
					public detach$okhttp(): void;
					public newSource(param0: number): okio.Source;
					public commit(): void;
					public newSink(param0: number): okio.Sink;
					public getEntry$okhttp(): okhttp3.internal.cache.DiskLruCache.Entry;
					public constructor(param0: okhttp3.internal.cache.DiskLruCache.Entry);
					public getWritten$okhttp(): androidNative.Array<boolean>;
					public abort(): void;
				}
				export class Entry extends java.lang.Object {
					public static class: java.lang.Class<okhttp3.internal.cache.DiskLruCache.Entry>;
					public getReadable$okhttp(): boolean;
					public constructor(param0: string);
					public getLengths$okhttp(): androidNative.Array<number>;
					public getZombie$okhttp(): boolean;
					public snapshot$okhttp(): okhttp3.internal.cache.DiskLruCache.Snapshot;
					public setReadable$okhttp(param0: boolean): void;
					public writeLengths$okhttp(param0: okio.BufferedSink): void;
					public setSequenceNumber$okhttp(param0: number): void;
					public setLengths$okhttp(param0: java.util.List<string>): void;
					public getLockingSourceCount$okhttp(): number;
					public setCurrentEditor$okhttp(param0: okhttp3.internal.cache.DiskLruCache.Editor): void;
					public getCleanFiles$okhttp(): java.util.List<java.io.File>;
					public getKey$okhttp(): string;
					public getSequenceNumber$okhttp(): number;
					public setLockingSourceCount$okhttp(param0: number): void;
					public getDirtyFiles$okhttp(): java.util.List<java.io.File>;
					public setZombie$okhttp(param0: boolean): void;
					public getCurrentEditor$okhttp(): okhttp3.internal.cache.DiskLruCache.Editor;
				}
				export class Snapshot extends java.lang.Object implements java.io.Closeable {
					public static class: java.lang.Class<okhttp3.internal.cache.DiskLruCache.Snapshot>;
					public constructor(param0: string, param1: number, param2: java.util.List<any>, param3: androidNative.Array<number>);
					public close(): void;
					public key(): string;
					public getLength(param0: number): number;
					public edit(): okhttp3.internal.cache.DiskLruCache.Editor;
					public getSource(param0: number): okio.Source;
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module cache {
			export class FaultHidingSink {
				public static class: java.lang.Class<okhttp3.internal.cache.FaultHidingSink>;
				public close(): void;
				public getOnException(): any;
				public constructor(param0: okio.Sink, param1: any);
				public write(param0: okio.Buffer, param1: number): void;
				public flush(): void;
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module cache2 {
			export class FileOperator extends java.lang.Object {
				public static class: java.lang.Class<okhttp3.internal.cache2.FileOperator>;
				public write(param0: number, param1: okio.Buffer, param2: number): void;
				public constructor(param0: java.nio.channels.FileChannel);
				public read(param0: number, param1: okio.Buffer, param2: number): void;
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module cache2 {
			export class Relay extends java.lang.Object {
				public static class: java.lang.Class<okhttp3.internal.cache2.Relay>;
				public static PREFIX_CLEAN: okio.ByteString;
				public static PREFIX_DIRTY: okio.ByteString;
				public commit(param0: number): void;
				public newSource(): okio.Source;
				public getUpstreamReader(): java.lang.Thread;
				public getUpstreamBuffer(): okio.Buffer;
				public setComplete(param0: boolean): void;
				public getSourceCount(): number;
				public metadata(): okio.ByteString;
				public setFile(param0: java.io.RandomAccessFile): void;
				public getUpstreamPos(): number;
				public isClosed(): boolean;
				public getComplete(): boolean;
				public getFile(): java.io.RandomAccessFile;
				public getBufferMaxSize(): number;
				public setUpstream(param0: okio.Source): void;
				public setUpstreamReader(param0: java.lang.Thread): void;
				public setSourceCount(param0: number): void;
				public getBuffer(): okio.Buffer;
				public getUpstream(): okio.Source;
				public setUpstreamPos(param0: number): void;
			}
			export module Relay {
				export class Companion extends java.lang.Object {
					public static class: java.lang.Class<okhttp3.internal.cache2.Relay.Companion>;
					public edit(param0: java.io.File, param1: okio.Source, param2: okio.ByteString, param3: number): okhttp3.internal.cache2.Relay;
					public read(param0: java.io.File): okhttp3.internal.cache2.Relay;
				}
				export class RelaySource extends java.lang.Object {
					public static class: java.lang.Class<okhttp3.internal.cache2.Relay.RelaySource>;
					public constructor(param0: okhttp3.internal.cache2.Relay);
					public close(): void;
					public timeout(): okio.Timeout;
					public read(param0: okio.Buffer, param1: number): number;
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module concurrent {
			export abstract class Task extends java.lang.Object {
				public static class: java.lang.Class<okhttp3.internal.concurrent.Task>;
				public getNextExecuteNanoTime$okhttp(): number;
				public runOnce(): number;
				public setNextExecuteNanoTime$okhttp(param0: number): void;
				public constructor(param0: string, param1: boolean);
				public setQueue$okhttp(param0: okhttp3.internal.concurrent.TaskQueue): void;
				public getCancelable(): boolean;
				public getQueue$okhttp(): okhttp3.internal.concurrent.TaskQueue;
				public getName(): string;
				public initQueue$okhttp(param0: okhttp3.internal.concurrent.TaskQueue): void;
				public toString(): string;
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module concurrent {
			export class TaskQueue extends java.lang.Object {
				public static class: java.lang.Class<okhttp3.internal.concurrent.TaskQueue>;
				public constructor(param0: okhttp3.internal.concurrent.TaskRunner, param1: string);
				public getActiveTask$okhttp(): okhttp3.internal.concurrent.Task;
				public getName$okhttp(): string;
				public toString(): string;
				public scheduleAndDecide$okhttp(param0: okhttp3.internal.concurrent.Task, param1: number, param2: boolean): boolean;
				public schedule(param0: string, param1: number, param2: any): void;
				public getTaskRunner$okhttp(): okhttp3.internal.concurrent.TaskRunner;
				public getFutureTasks$okhttp(): java.util.List<okhttp3.internal.concurrent.Task>;
				public shutdown(): void;
				public getCancelActiveTask$okhttp(): boolean;
				public getScheduledTasks(): java.util.List<okhttp3.internal.concurrent.Task>;
				public cancelAll(): void;
				public getShutdown$okhttp(): boolean;
				public execute(param0: string, param1: number, param2: boolean, param3: any): void;
				public setShutdown$okhttp(param0: boolean): void;
				public setActiveTask$okhttp(param0: okhttp3.internal.concurrent.Task): void;
				public idleLatch(): java.util.concurrent.CountDownLatch;
				public cancelAllAndDecide$okhttp(): boolean;
				public schedule(param0: okhttp3.internal.concurrent.Task, param1: number): void;
				public setCancelActiveTask$okhttp(param0: boolean): void;
			}
			export module TaskQueue {
				export class AwaitIdleTask extends okhttp3.internal.concurrent.Task {
					public static class: java.lang.Class<okhttp3.internal.concurrent.TaskQueue.AwaitIdleTask>;
					public runOnce(): number;
					public constructor();
					public constructor(param0: string, param1: boolean);
					public getLatch(): java.util.concurrent.CountDownLatch;
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module concurrent {
			export class TaskRunner extends java.lang.Object {
				public static class: java.lang.Class<okhttp3.internal.concurrent.TaskRunner>;
				public static INSTANCE: okhttp3.internal.concurrent.TaskRunner;
				public kickCoordinator$okhttp(param0: okhttp3.internal.concurrent.TaskQueue): void;
				public cancelAll(): void;
				public getBackend(): okhttp3.internal.concurrent.TaskRunner.Backend;
				public activeQueues(): java.util.List<okhttp3.internal.concurrent.TaskQueue>;
				public constructor(param0: okhttp3.internal.concurrent.TaskRunner.Backend);
				public awaitTaskToRun(): okhttp3.internal.concurrent.Task;
				public newQueue(): okhttp3.internal.concurrent.TaskQueue;
			}
			export module TaskRunner {
				export class Backend extends java.lang.Object {
					public static class: java.lang.Class<okhttp3.internal.concurrent.TaskRunner.Backend>;
					/**
					 * Constructs a new instance of the okhttp3.internal.concurrent.TaskRunner$Backend interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						beforeTask(param0: okhttp3.internal.concurrent.TaskRunner): void;
						nanoTime(): number;
						coordinatorNotify(param0: okhttp3.internal.concurrent.TaskRunner): void;
						coordinatorWait(param0: okhttp3.internal.concurrent.TaskRunner, param1: number): void;
						execute(param0: java.lang.Runnable): void;
					});
					public constructor();
					public coordinatorWait(param0: okhttp3.internal.concurrent.TaskRunner, param1: number): void;
					public execute(param0: java.lang.Runnable): void;
					public coordinatorNotify(param0: okhttp3.internal.concurrent.TaskRunner): void;
					public beforeTask(param0: okhttp3.internal.concurrent.TaskRunner): void;
					public nanoTime(): number;
				}
				export class Companion extends java.lang.Object {
					public static class: java.lang.Class<okhttp3.internal.concurrent.TaskRunner.Companion>;
					public getLogger(): java.util.logging.Logger;
				}
				export class RealBackend extends java.lang.Object implements okhttp3.internal.concurrent.TaskRunner.Backend {
					public static class: java.lang.Class<okhttp3.internal.concurrent.TaskRunner.RealBackend>;
					public coordinatorWait(param0: okhttp3.internal.concurrent.TaskRunner, param1: number): void;
					public execute(param0: java.lang.Runnable): void;
					public shutdown(): void;
					public coordinatorNotify(param0: okhttp3.internal.concurrent.TaskRunner): void;
					public constructor(param0: java.util.concurrent.ThreadFactory);
					public beforeTask(param0: okhttp3.internal.concurrent.TaskRunner): void;
					public nanoTime(): number;
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module connection {
			export class ConnectInterceptor extends java.lang.Object implements okhttp3.Interceptor {
				public static class: java.lang.Class<okhttp3.internal.connection.ConnectInterceptor>;
				public static INSTANCE: okhttp3.internal.connection.ConnectInterceptor;
				public intercept(param0: okhttp3.Interceptor.Chain): okhttp3.Response;
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module connection {
			export class ConnectionSpecSelector extends java.lang.Object {
				public static class: java.lang.Class<okhttp3.internal.connection.ConnectionSpecSelector>;
				public constructor(param0: java.util.List<okhttp3.ConnectionSpec>);
				public configureSecureSocket(param0: javax.net.ssl.SSLSocket): okhttp3.ConnectionSpec;
				public connectionFailed(param0: java.io.IOException): boolean;
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module connection {
			export class Exchange extends java.lang.Object {
				public static class: java.lang.Class<okhttp3.internal.connection.Exchange>;
				public finishRequest(): void;
				public getCall$okhttp(): okhttp3.internal.connection.RealCall;
				public getEventListener$okhttp(): okhttp3.EventListener;
				public trailers(): okhttp3.Headers;
				public isDuplex$okhttp(): boolean;
				public getConnection$okhttp(): okhttp3.internal.connection.RealConnection;
				public readResponseHeaders(param0: boolean): okhttp3.Response.Builder;
				public newWebSocketStreams(): okhttp3.internal.ws.RealWebSocket.Streams;
				public writeRequestHeaders(param0: okhttp3.Request): void;
				public responseHeadersStart(): void;
				public noRequestBody(): void;
				public getFinder$okhttp(): okhttp3.internal.connection.ExchangeFinder;
				public isCoalescedConnection$okhttp(): boolean;
				public detachWithViolence(): void;
				public openResponseBody(param0: okhttp3.Response): okhttp3.ResponseBody;
				public responseHeadersEnd(param0: okhttp3.Response): void;
				public constructor(param0: okhttp3.internal.connection.RealCall, param1: okhttp3.EventListener, param2: okhttp3.internal.connection.ExchangeFinder, param3: okhttp3.internal.http.ExchangeCodec);
				public webSocketUpgradeFailed(): void;
				public createRequestBody(param0: okhttp3.Request, param1: boolean): okio.Sink;
				public cancel(): void;
				public flushRequest(): void;
				public noNewExchangesOnConnection(): void;
				public bodyComplete(param0: number, param1: boolean, param2: boolean, param3: java.io.IOException): java.io.IOException;
			}
			export module Exchange {
				export class RequestBodySink {
					public static class: java.lang.Class<okhttp3.internal.connection.Exchange.RequestBodySink>;
					public close(): void;
					public flush(): void;
					public write(param0: okio.Buffer, param1: number): void;
					public constructor(param0: okio.Sink, param1: number);
				}
				export class ResponseBodySource {
					public static class: java.lang.Class<okhttp3.internal.connection.Exchange.ResponseBodySource>;
					public constructor(param0: okio.Source, param1: number);
					public close(): void;
					public complete(param0: java.io.IOException): java.io.IOException;
					public read(param0: okio.Buffer, param1: number): number;
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module connection {
			export class ExchangeFinder extends java.lang.Object {
				public static class: java.lang.Class<okhttp3.internal.connection.ExchangeFinder>;
				public sameHostAndPort(param0: okhttp3.HttpUrl): boolean;
				public getAddress$okhttp(): okhttp3.Address;
				public find(param0: okhttp3.OkHttpClient, param1: okhttp3.internal.http.RealInterceptorChain): okhttp3.internal.http.ExchangeCodec;
				public retryAfterFailure(): boolean;
				public constructor(param0: okhttp3.internal.connection.RealConnectionPool, param1: okhttp3.Address, param2: okhttp3.internal.connection.RealCall, param3: okhttp3.EventListener);
				public trackFailure(param0: java.io.IOException): void;
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module connection {
			export class RealCall extends java.lang.Object implements okhttp3.Call {
				public static class: java.lang.Class<okhttp3.internal.connection.RealCall>;
				public request(): okhttp3.Request;
				public initExchange$okhttp(param0: okhttp3.internal.http.RealInterceptorChain): okhttp3.internal.connection.Exchange;
				public getEventListener$okhttp(): okhttp3.EventListener;
				public timeoutEarlyExit(): void;
				public acquireConnectionNoEvents(param0: okhttp3.internal.connection.RealConnection): void;
				public getResponseWithInterceptorChain$okhttp(): okhttp3.Response;
				public getConnectionToCancel(): okhttp3.internal.connection.RealConnection;
				public redactedUrl$okhttp(): string;
				public isCanceled(): boolean;
				public timeout(): okio.Timeout;
				public setConnectionToCancel(param0: okhttp3.internal.connection.RealConnection): void;
				public clone(): any;
				public releaseConnectionNoEvents$okhttp(): java.net.Socket;
				public cancel(): void;
				public execute(): okhttp3.Response;
				public getForWebSocket(): boolean;
				public getConnection(): okhttp3.internal.connection.RealConnection;
				public noMoreExchanges$okhttp(param0: java.io.IOException): java.io.IOException;
				public enqueue(param0: okhttp3.Callback): void;
				public enterNetworkInterceptorExchange(param0: okhttp3.Request, param1: boolean): void;
				public messageDone$okhttp(param0: okhttp3.internal.connection.Exchange, param1: boolean, param2: boolean, param3: java.io.IOException): java.io.IOException;
				public retryAfterFailure(): boolean;
				public getClient(): okhttp3.OkHttpClient;
				public timeout(): okio.AsyncTimeout;
				public clone(): okhttp3.internal.connection.RealCall;
				public exitNetworkInterceptorExchange$okhttp(param0: boolean): void;
				public clone(): okhttp3.Call;
				public getOriginalRequest(): okhttp3.Request;
				public getInterceptorScopedExchange$okhttp(): okhttp3.internal.connection.Exchange;
				public constructor(param0: okhttp3.OkHttpClient, param1: okhttp3.Request, param2: boolean);
				public isExecuted(): boolean;
			}
			export module RealCall {
				export class AsyncCall extends java.lang.Object implements java.lang.Runnable {
					public static class: java.lang.Class<okhttp3.internal.connection.RealCall.AsyncCall>;
					public reuseCallsPerHostFrom(param0: okhttp3.internal.connection.RealCall.AsyncCall): void;
					public getCallsPerHost(): java.util.concurrent.atomic.AtomicInteger;
					public executeOn(param0: java.util.concurrent.ExecutorService): void;
					public run(): void;
					public constructor(param0: okhttp3.Callback);
					public getRequest(): okhttp3.Request;
					public getCall(): okhttp3.internal.connection.RealCall;
					public getHost(): string;
				}
				export class CallReference extends java.lang.ref.WeakReference<okhttp3.internal.connection.RealCall> {
					public static class: java.lang.Class<okhttp3.internal.connection.RealCall.CallReference>;
					public getCallStackTrace(): any;
					public constructor(param0: okhttp3.internal.connection.RealCall, param1: any);
					public constructor(param0: any);
					public constructor(param0: any, param1: java.lang.ref.ReferenceQueue<any>);
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module connection {
			export class RealConnection extends okhttp3.internal.http2.Http2Connection.Listener implements okhttp3.Connection {
				public static class: java.lang.Class<okhttp3.internal.connection.RealConnection>;
				public static IDLE_CONNECTION_HEALTHY_NS: number;
				public newWebSocketStreams$okhttp(param0: okhttp3.internal.connection.Exchange): okhttp3.internal.ws.RealWebSocket.Streams;
				public connect(param0: number, param1: number, param2: number, param3: number, param4: boolean, param5: okhttp3.Call, param6: okhttp3.EventListener): void;
				public protocol(): okhttp3.Protocol;
				public socket(): java.net.Socket;
				public constructor();
				public noNewExchanges$okhttp(): void;
				public trackFailure$okhttp(param0: okhttp3.internal.connection.RealCall, param1: java.io.IOException): void;
				public getConnectionPool(): okhttp3.internal.connection.RealConnectionPool;
				public isHealthy(param0: boolean): boolean;
				public cancel(): void;
				public handshake(): okhttp3.Handshake;
				public getCalls(): java.util.List<java.lang.ref.Reference<okhttp3.internal.connection.RealCall>>;
				public constructor(param0: okhttp3.internal.connection.RealConnectionPool, param1: okhttp3.Route);
				public isMultiplexed$okhttp(): boolean;
				public onSettings(param0: okhttp3.internal.http2.Http2Connection, param1: okhttp3.internal.http2.Settings): void;
				public getRouteFailureCount$okhttp(): number;
				public setIdleAtNs$okhttp(param0: number): void;
				public route(): okhttp3.Route;
				public setNoNewExchanges(param0: boolean): void;
				public noCoalescedConnections$okhttp(): void;
				public isEligible$okhttp(param0: okhttp3.Address, param1: java.util.List<okhttp3.Route>): boolean;
				public toString(): string;
				public onStream(param0: okhttp3.internal.http2.Http2Stream): void;
				public newCodec$okhttp(param0: okhttp3.OkHttpClient, param1: okhttp3.internal.http.RealInterceptorChain): okhttp3.internal.http.ExchangeCodec;
				public incrementSuccessCount$okhttp(): void;
				public getIdleAtNs$okhttp(): number;
				public connectFailed$okhttp(param0: okhttp3.OkHttpClient, param1: okhttp3.Route, param2: java.io.IOException): void;
				public getNoNewExchanges(): boolean;
				public setRouteFailureCount$okhttp(param0: number): void;
			}
			export module RealConnection {
				export class Companion extends java.lang.Object {
					public static class: java.lang.Class<okhttp3.internal.connection.RealConnection.Companion>;
					public newTestConnection(param0: okhttp3.internal.connection.RealConnectionPool, param1: okhttp3.Route, param2: java.net.Socket, param3: number): okhttp3.internal.connection.RealConnection;
				}
				export class WhenMappings extends java.lang.Object {
					public static class: java.lang.Class<okhttp3.internal.connection.RealConnection.WhenMappings>;
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module connection {
			export class RealConnectionPool extends java.lang.Object {
				public static class: java.lang.Class<okhttp3.internal.connection.RealConnectionPool>;
				public cleanup(param0: number): number;
				public constructor(param0: okhttp3.internal.concurrent.TaskRunner, param1: number, param2: number, param3: java.util.concurrent.TimeUnit);
				public connectionCount(): number;
				public callAcquirePooledConnection(param0: okhttp3.Address, param1: okhttp3.internal.connection.RealCall, param2: java.util.List<okhttp3.Route>, param3: boolean): boolean;
				public put(param0: okhttp3.internal.connection.RealConnection): void;
				public evictAll(): void;
				public idleConnectionCount(): number;
				public connectionBecameIdle(param0: okhttp3.internal.connection.RealConnection): boolean;
			}
			export module RealConnectionPool {
				export class Companion extends java.lang.Object {
					public static class: java.lang.Class<okhttp3.internal.connection.RealConnectionPool.Companion>;
					public get(param0: okhttp3.ConnectionPool): okhttp3.internal.connection.RealConnectionPool;
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module connection {
			export class RouteDatabase extends java.lang.Object {
				public static class: java.lang.Class<okhttp3.internal.connection.RouteDatabase>;
				public shouldPostpone(param0: okhttp3.Route): boolean;
				public connected(param0: okhttp3.Route): void;
				public failed(param0: okhttp3.Route): void;
				public constructor();
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module connection {
			export class RouteException extends java.lang.RuntimeException {
				public static class: java.lang.Class<okhttp3.internal.connection.RouteException>;
				public getLastConnectException(): java.io.IOException;
				public constructor(param0: java.io.IOException);
				public addConnectException(param0: java.io.IOException): void;
				public constructor(param0: string, param1: java.lang.Throwable);
				public getFirstConnectException(): java.io.IOException;
				public constructor(param0: java.lang.Throwable);
				public constructor(param0: string);
				public constructor();
				public constructor(param0: string, param1: java.lang.Throwable, param2: boolean, param3: boolean);
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module connection {
			export class RouteSelector extends java.lang.Object {
				public static class: java.lang.Class<okhttp3.internal.connection.RouteSelector>;
				public next(): okhttp3.internal.connection.RouteSelector.Selection;
				public constructor(param0: okhttp3.Address, param1: okhttp3.internal.connection.RouteDatabase, param2: okhttp3.Call, param3: okhttp3.EventListener);
				public hasNext(): boolean;
			}
			export module RouteSelector {
				export class Companion extends java.lang.Object {
					public static class: java.lang.Class<okhttp3.internal.connection.RouteSelector.Companion>;
					public getSocketHost(param0: java.net.InetSocketAddress): string;
				}
				export class Selection extends java.lang.Object {
					public static class: java.lang.Class<okhttp3.internal.connection.RouteSelector.Selection>;
					public next(): okhttp3.Route;
					public constructor(param0: java.util.List<okhttp3.Route>);
					public getRoutes(): java.util.List<okhttp3.Route>;
					public hasNext(): boolean;
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module http {
			export class BridgeInterceptor extends java.lang.Object implements okhttp3.Interceptor {
				public static class: java.lang.Class<okhttp3.internal.http.BridgeInterceptor>;
				public intercept(param0: okhttp3.Interceptor.Chain): okhttp3.Response;
				public constructor(param0: okhttp3.CookieJar);
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module http {
			export class CallServerInterceptor extends java.lang.Object implements okhttp3.Interceptor {
				public static class: java.lang.Class<okhttp3.internal.http.CallServerInterceptor>;
				public intercept(param0: okhttp3.Interceptor.Chain): okhttp3.Response;
				public constructor(param0: boolean);
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module http {
			export class ExchangeCodec extends java.lang.Object {
				public static class: java.lang.Class<okhttp3.internal.http.ExchangeCodec>;
				/**
				 * Constructs a new instance of the okhttp3.internal.http.ExchangeCodec interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
				 */
				public constructor(implementation: {
					getConnection(): okhttp3.internal.connection.RealConnection;
					createRequestBody(param0: okhttp3.Request, param1: number): okio.Sink;
					writeRequestHeaders(param0: okhttp3.Request): void;
					flushRequest(): void;
					finishRequest(): void;
					readResponseHeaders(param0: boolean): okhttp3.Response.Builder;
					reportedContentLength(param0: okhttp3.Response): number;
					openResponseBodySource(param0: okhttp3.Response): okio.Source;
					trailers(): okhttp3.Headers;
					cancel(): void;
					<clinit>(): void;
				});
				public constructor();
				public static DISCARD_STREAM_TIMEOUT_MILLIS: number;
				public finishRequest(): void;
				public trailers(): okhttp3.Headers;
				public reportedContentLength(param0: okhttp3.Response): number;
				public openResponseBodySource(param0: okhttp3.Response): okio.Source;
				public readResponseHeaders(param0: boolean): okhttp3.Response.Builder;
				public cancel(): void;
				public flushRequest(): void;
				public createRequestBody(param0: okhttp3.Request, param1: number): okio.Sink;
				public writeRequestHeaders(param0: okhttp3.Request): void;
				public getConnection(): okhttp3.internal.connection.RealConnection;
			}
			export module ExchangeCodec {
				export class Companion extends java.lang.Object {
					public static class: java.lang.Class<okhttp3.internal.http.ExchangeCodec.Companion>;
					public static DISCARD_STREAM_TIMEOUT_MILLIS: number;
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module http {
			export class HttpHeaders extends java.lang.Object {
				public static class: java.lang.Class<okhttp3.internal.http.HttpHeaders>;
				public static receiveHeaders(param0: okhttp3.CookieJar, param1: okhttp3.HttpUrl, param2: okhttp3.Headers): void;
				public static promisesBody(param0: okhttp3.Response): boolean;
				/** @deprecated */
				public static hasBody(param0: okhttp3.Response): boolean;
				public static parseChallenges(param0: okhttp3.Headers, param1: string): java.util.List<okhttp3.Challenge>;
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module http {
			export class HttpMethod extends java.lang.Object {
				public static class: java.lang.Class<okhttp3.internal.http.HttpMethod>;
				public static INSTANCE: okhttp3.internal.http.HttpMethod;
				public static requiresRequestBody(param0: string): boolean;
				public static permitsRequestBody(param0: string): boolean;
				public redirectsToGet(param0: string): boolean;
				public redirectsWithBody(param0: string): boolean;
				public invalidatesCache(param0: string): boolean;
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module http {
			export class RealInterceptorChain extends java.lang.Object implements okhttp3.Interceptor.Chain {
				public static class: java.lang.Class<okhttp3.internal.http.RealInterceptorChain>;
				public getConnectTimeoutMillis$okhttp(): number;
				public request(): okhttp3.Request;
				public getCall$okhttp(): okhttp3.internal.connection.RealCall;
				public getRequest$okhttp(): okhttp3.Request;
				public connectTimeoutMillis(): number;
				public getReadTimeoutMillis$okhttp(): number;
				public getWriteTimeoutMillis$okhttp(): number;
				public constructor(param0: okhttp3.internal.connection.RealCall, param1: java.util.List<any>, param2: number, param3: okhttp3.internal.connection.Exchange, param4: okhttp3.Request, param5: number, param6: number, param7: number);
				public withWriteTimeout(param0: number, param1: java.util.concurrent.TimeUnit): okhttp3.Interceptor.Chain;
				public connection(): okhttp3.Connection;
				public writeTimeoutMillis(): number;
				public copy$okhttp(param0: number, param1: okhttp3.internal.connection.Exchange, param2: okhttp3.Request, param3: number, param4: number, param5: number): okhttp3.internal.http.RealInterceptorChain;
				public readTimeoutMillis(): number;
				public call(): okhttp3.Call;
				public withConnectTimeout(param0: number, param1: java.util.concurrent.TimeUnit): okhttp3.Interceptor.Chain;
				public getExchange$okhttp(): okhttp3.internal.connection.Exchange;
				public proceed(param0: okhttp3.Request): okhttp3.Response;
				public withReadTimeout(param0: number, param1: java.util.concurrent.TimeUnit): okhttp3.Interceptor.Chain;
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module http {
			export class RealResponseBody extends okhttp3.ResponseBody {
				public static class: java.lang.Class<okhttp3.internal.http.RealResponseBody>;
				public close(): void;
				public contentLength(): number;
				public constructor(param0: string, param1: number, param2: okio.BufferedSource);
				public source(): okio.BufferedSource;
				public contentType(): okhttp3.MediaType;
				public constructor();
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module http {
			export class RequestLine extends java.lang.Object {
				public static class: java.lang.Class<okhttp3.internal.http.RequestLine>;
				public static INSTANCE: okhttp3.internal.http.RequestLine;
				public get(param0: okhttp3.Request, param1: java.net.Proxy.Type): string;
				public requestPath(param0: okhttp3.HttpUrl): string;
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module http {
			export class RetryAndFollowUpInterceptor extends java.lang.Object implements okhttp3.Interceptor {
				public static class: java.lang.Class<okhttp3.internal.http.RetryAndFollowUpInterceptor>;
				public constructor(param0: okhttp3.OkHttpClient);
				public intercept(param0: okhttp3.Interceptor.Chain): okhttp3.Response;
			}
			export module RetryAndFollowUpInterceptor {
				export class Companion extends java.lang.Object {
					public static class: java.lang.Class<okhttp3.internal.http.RetryAndFollowUpInterceptor.Companion>;
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module http {
			export class StatusLine extends java.lang.Object {
				public static class: java.lang.Class<okhttp3.internal.http.StatusLine>;
				public protocol: okhttp3.Protocol;
				public code: number;
				public message: string;
				public static HTTP_TEMP_REDIRECT: number;
				public static HTTP_PERM_REDIRECT: number;
				public static HTTP_MISDIRECTED_REQUEST: number;
				public static HTTP_CONTINUE: number;
				public constructor(param0: okhttp3.Protocol, param1: number, param2: string);
				public toString(): string;
			}
			export module StatusLine {
				export class Companion extends java.lang.Object {
					public static class: java.lang.Class<okhttp3.internal.http.StatusLine.Companion>;
					public parse(param0: string): okhttp3.internal.http.StatusLine;
					public get(param0: okhttp3.Response): okhttp3.internal.http.StatusLine;
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module http1 {
			export class HeadersReader extends java.lang.Object {
				public static class: java.lang.Class<okhttp3.internal.http1.HeadersReader>;
				public constructor(param0: okio.BufferedSource);
				public readHeaders(): okhttp3.Headers;
				public getSource(): okio.BufferedSource;
				public readLine(): string;
			}
			export module HeadersReader {
				export class Companion extends java.lang.Object {
					public static class: java.lang.Class<okhttp3.internal.http1.HeadersReader.Companion>;
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module http1 {
			export class Http1ExchangeCodec extends java.lang.Object implements okhttp3.internal.http.ExchangeCodec {
				public static class: java.lang.Class<okhttp3.internal.http1.Http1ExchangeCodec>;
				public finishRequest(): void;
				public trailers(): okhttp3.Headers;
				public openResponseBodySource(param0: okhttp3.Response): okio.Source;
				public isClosed(): boolean;
				public readResponseHeaders(param0: boolean): okhttp3.Response.Builder;
				public skipConnectBody(param0: okhttp3.Response): void;
				public writeRequestHeaders(param0: okhttp3.Request): void;
				public writeRequest(param0: okhttp3.Headers, param1: string): void;
				public reportedContentLength(param0: okhttp3.Response): number;
				public cancel(): void;
				public flushRequest(): void;
				public constructor(param0: okhttp3.OkHttpClient, param1: okhttp3.internal.connection.RealConnection, param2: okio.BufferedSource, param3: okio.BufferedSink);
				public createRequestBody(param0: okhttp3.Request, param1: number): okio.Sink;
				public getConnection(): okhttp3.internal.connection.RealConnection;
			}
			export module Http1ExchangeCodec {
				export abstract class AbstractSource extends java.lang.Object {
					public static class: java.lang.Class<okhttp3.internal.http1.Http1ExchangeCodec.AbstractSource>;
					public responseBodyComplete(): void;
					public constructor(param0: okhttp3.internal.http1.Http1ExchangeCodec);
					public getTimeout(): okio.ForwardingTimeout;
					public getClosed(): boolean;
					public timeout(): okio.Timeout;
					public setClosed(param0: boolean): void;
					public read(param0: okio.Buffer, param1: number): number;
				}
				export class ChunkedSink extends java.lang.Object {
					public static class: java.lang.Class<okhttp3.internal.http1.Http1ExchangeCodec.ChunkedSink>;
					public constructor(param0: okhttp3.internal.http1.Http1ExchangeCodec);
					public close(): void;
					public flush(): void;
					public write(param0: okio.Buffer, param1: number): void;
					public timeout(): okio.Timeout;
				}
				export class ChunkedSource extends okhttp3.internal.http1.Http1ExchangeCodec.AbstractSource {
					public static class: java.lang.Class<okhttp3.internal.http1.Http1ExchangeCodec.ChunkedSource>;
					public constructor(param0: okhttp3.internal.http1.Http1ExchangeCodec);
					public constructor(param0: okhttp3.HttpUrl);
					public close(): void;
					public read(param0: okio.Buffer, param1: number): number;
				}
				export class Companion extends java.lang.Object {
					public static class: java.lang.Class<okhttp3.internal.http1.Http1ExchangeCodec.Companion>;
				}
				export class FixedLengthSource extends okhttp3.internal.http1.Http1ExchangeCodec.AbstractSource {
					public static class: java.lang.Class<okhttp3.internal.http1.Http1ExchangeCodec.FixedLengthSource>;
					public constructor(param0: okhttp3.internal.http1.Http1ExchangeCodec);
					public close(): void;
					public read(param0: okio.Buffer, param1: number): number;
					public constructor(param0: number);
				}
				export class KnownLengthSink extends java.lang.Object {
					public static class: java.lang.Class<okhttp3.internal.http1.Http1ExchangeCodec.KnownLengthSink>;
					public constructor(param0: okhttp3.internal.http1.Http1ExchangeCodec);
					public close(): void;
					public flush(): void;
					public write(param0: okio.Buffer, param1: number): void;
					public timeout(): okio.Timeout;
				}
				export class UnknownLengthSource extends okhttp3.internal.http1.Http1ExchangeCodec.AbstractSource {
					public static class: java.lang.Class<okhttp3.internal.http1.Http1ExchangeCodec.UnknownLengthSource>;
					public constructor(param0: okhttp3.internal.http1.Http1ExchangeCodec);
					public close(): void;
					public read(param0: okio.Buffer, param1: number): number;
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module http2 {
			export class ConnectionShutdownException extends java.io.IOException {
				public static class: java.lang.Class<okhttp3.internal.http2.ConnectionShutdownException>;
				public constructor(param0: string, param1: java.lang.Throwable);
				public constructor(param0: java.lang.Throwable);
				public constructor(param0: string);
				public constructor();
				public constructor(param0: string, param1: java.lang.Throwable, param2: boolean, param3: boolean);
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module http2 {
			export class ErrorCode {
				public static class: java.lang.Class<okhttp3.internal.http2.ErrorCode>;
				public static NO_ERROR: okhttp3.internal.http2.ErrorCode;
				public static PROTOCOL_ERROR: okhttp3.internal.http2.ErrorCode;
				public static INTERNAL_ERROR: okhttp3.internal.http2.ErrorCode;
				public static FLOW_CONTROL_ERROR: okhttp3.internal.http2.ErrorCode;
				public static SETTINGS_TIMEOUT: okhttp3.internal.http2.ErrorCode;
				public static STREAM_CLOSED: okhttp3.internal.http2.ErrorCode;
				public static FRAME_SIZE_ERROR: okhttp3.internal.http2.ErrorCode;
				public static REFUSED_STREAM: okhttp3.internal.http2.ErrorCode;
				public static CANCEL: okhttp3.internal.http2.ErrorCode;
				public static COMPRESSION_ERROR: okhttp3.internal.http2.ErrorCode;
				public static CONNECT_ERROR: okhttp3.internal.http2.ErrorCode;
				public static ENHANCE_YOUR_CALM: okhttp3.internal.http2.ErrorCode;
				public static INADEQUATE_SECURITY: okhttp3.internal.http2.ErrorCode;
				public static HTTP_1_1_REQUIRED: okhttp3.internal.http2.ErrorCode;
				public static values(): androidNative.Array<okhttp3.internal.http2.ErrorCode>;
				public static valueOf(param0: string): okhttp3.internal.http2.ErrorCode;
				public getHttpCode(): number;
				public static valueOf(param0: java.lang.Class<any>, param1: string): java.lang.Enum<any>;
			}
			export module ErrorCode {
				export class Companion extends java.lang.Object {
					public static class: java.lang.Class<okhttp3.internal.http2.ErrorCode.Companion>;
					public fromHttp2(param0: number): okhttp3.internal.http2.ErrorCode;
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module http2 {
			export class Header extends java.lang.Object {
				public static class: java.lang.Class<okhttp3.internal.http2.Header>;
				public name: okio.ByteString;
				public value: okio.ByteString;
				public hpackSize: number;
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
				public constructor(param0: okio.ByteString, param1: okio.ByteString);
				public component2(): okio.ByteString;
				public hashCode(): number;
				public copy(param0: okio.ByteString, param1: okio.ByteString): okhttp3.internal.http2.Header;
				public equals(param0: any): boolean;
				public constructor(param0: okio.ByteString, param1: string);
				public component1(): okio.ByteString;
				public toString(): string;
				public constructor(param0: string, param1: string);
			}
			export module Header {
				export class Companion extends java.lang.Object {
					public static class: java.lang.Class<okhttp3.internal.http2.Header.Companion>;
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module http2 {
			export class Hpack extends java.lang.Object {
				public static class: java.lang.Class<okhttp3.internal.http2.Hpack>;
				public static INSTANCE: okhttp3.internal.http2.Hpack;
				public checkLowercase(param0: okio.ByteString): okio.ByteString;
				public getSTATIC_HEADER_TABLE(): androidNative.Array<okhttp3.internal.http2.Header>;
				public getNAME_TO_FIRST_INDEX(): java.util.Map<okio.ByteString,java.lang.Integer>;
			}
			export module Hpack {
				export class Reader extends java.lang.Object {
					public static class: java.lang.Class<okhttp3.internal.http2.Hpack.Reader>;
					public dynamicTable: androidNative.Array<okhttp3.internal.http2.Header>;
					public headerCount: number;
					public dynamicTableByteCount: number;
					public constructor(param0: okio.Source, param1: number, param2: number);
					public maxDynamicTableByteCount(): number;
					public constructor(param0: okio.Source, param1: number);
					public readHeaders(): void;
					public readByteString(): okio.ByteString;
					public getAndResetHeaderList(): java.util.List<okhttp3.internal.http2.Header>;
					public readInt(param0: number, param1: number): number;
				}
				export class Writer extends java.lang.Object {
					public static class: java.lang.Class<okhttp3.internal.http2.Hpack.Writer>;
					public headerTableSizeSetting: number;
					public maxDynamicTableByteCount: number;
					public dynamicTable: androidNative.Array<okhttp3.internal.http2.Header>;
					public headerCount: number;
					public dynamicTableByteCount: number;
					public writeByteString(param0: okio.ByteString): void;
					public writeHeaders(param0: java.util.List<okhttp3.internal.http2.Header>): void;
					public constructor(param0: number, param1: okio.Buffer);
					public constructor(param0: number, param1: boolean, param2: okio.Buffer);
					public resizeHeaderTable(param0: number): void;
					public writeInt(param0: number, param1: number, param2: number): void;
					public constructor(param0: okio.Buffer);
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module http2 {
			export class Http2 extends java.lang.Object {
				public static class: java.lang.Class<okhttp3.internal.http2.Http2>;
				public static INSTANCE: okhttp3.internal.http2.Http2;
				public static CONNECTION_PREFACE: okio.ByteString;
				public static INITIAL_MAX_FRAME_SIZE: number;
				public static TYPE_DATA: number;
				public static TYPE_HEADERS: number;
				public static TYPE_PRIORITY: number;
				public static TYPE_RST_STREAM: number;
				public static TYPE_SETTINGS: number;
				public static TYPE_PUSH_PROMISE: number;
				public static TYPE_PING: number;
				public static TYPE_GOAWAY: number;
				public static TYPE_WINDOW_UPDATE: number;
				public static TYPE_CONTINUATION: number;
				public static FLAG_NONE: number;
				public static FLAG_ACK: number;
				public static FLAG_END_STREAM: number;
				public static FLAG_END_HEADERS: number;
				public static FLAG_END_PUSH_PROMISE: number;
				public static FLAG_PADDED: number;
				public static FLAG_PRIORITY: number;
				public static FLAG_COMPRESSED: number;
				public formattedType$okhttp(param0: number): string;
				public formatFlags(param0: number, param1: number): string;
				public frameLog(param0: boolean, param1: number, param2: number, param3: number, param4: number): string;
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module http2 {
			export class Http2Connection extends java.lang.Object implements java.io.Closeable {
				public static class: java.lang.Class<okhttp3.internal.http2.Http2Connection>;
				public static OKHTTP_CLIENT_WINDOW_SIZE: number;
				public static INTERVAL_PING: number;
				public static DEGRADED_PING: number;
				public static AWAIT_PING: number;
				public static DEGRADED_PONG_TIMEOUT_NS: number;
				public pushedStream$okhttp(param0: number): boolean;
				public getListener$okhttp(): okhttp3.internal.http2.Http2Connection.Listener;
				public openStreamCount(): number;
				public flush(): void;
				public getConnectionName$okhttp(): string;
				public getWriter(): okhttp3.internal.http2.Http2Writer;
				public writeHeaders$okhttp(param0: number, param1: boolean, param2: java.util.List<okhttp3.internal.http2.Header>): void;
				public pushDataLater$okhttp(param0: number, param1: okio.BufferedSource, param2: number, param3: boolean): void;
				public constructor(param0: okhttp3.internal.http2.Http2Connection.Builder);
				public start(param0: boolean, param1: okhttp3.internal.concurrent.TaskRunner): void;
				public close(): void;
				public removeStream$okhttp(param0: number): okhttp3.internal.http2.Http2Stream;
				public getSocket$okhttp(): java.net.Socket;
				public writePingAndAwaitPong(): void;
				public getStream(param0: number): okhttp3.internal.http2.Http2Stream;
				public setSettings(param0: okhttp3.internal.http2.Settings): void;
				public isHealthy(param0: number): boolean;
				public getReadBytesAcknowledged(): number;
				public writePing(): void;
				public pushHeadersLater$okhttp(param0: number, param1: java.util.List<okhttp3.internal.http2.Header>, param2: boolean): void;
				public updateConnectionFlowControl$okhttp(param0: number): void;
				public newStream(param0: java.util.List<okhttp3.internal.http2.Header>, param1: boolean): okhttp3.internal.http2.Http2Stream;
				public getPeerSettings(): okhttp3.internal.http2.Settings;
				public getWriteBytesMaximum(): number;
				public getReadBytesTotal(): number;
				public pushResetLater$okhttp(param0: number, param1: okhttp3.internal.http2.ErrorCode): void;
				public getClient$okhttp(): boolean;
				public pushStream(param0: number, param1: java.util.List<okhttp3.internal.http2.Header>, param2: boolean): okhttp3.internal.http2.Http2Stream;
				public writeSynReset$okhttp(param0: number, param1: okhttp3.internal.http2.ErrorCode): void;
				public getOkHttpSettings(): okhttp3.internal.http2.Settings;
				public setNextStreamId$okhttp(param0: number): void;
				public writePing(param0: boolean, param1: number, param2: number): void;
				public getReaderRunnable(): okhttp3.internal.http2.Http2Connection.ReaderRunnable;
				public writeWindowUpdateLater$okhttp(param0: number, param1: number): void;
				public getLastGoodStreamId$okhttp(): number;
				public awaitPong(): void;
				public writeSynResetLater$okhttp(param0: number, param1: okhttp3.internal.http2.ErrorCode): void;
				public setLastGoodStreamId$okhttp(param0: number): void;
				public start(): void;
				public getNextStreamId$okhttp(): number;
				public setPeerSettings(param0: okhttp3.internal.http2.Settings): void;
				public close$okhttp(param0: okhttp3.internal.http2.ErrorCode, param1: okhttp3.internal.http2.ErrorCode, param2: java.io.IOException): void;
				public writeData(param0: number, param1: boolean, param2: okio.Buffer, param3: number): void;
				public sendDegradedPingLater$okhttp(): void;
				public start(param0: boolean): void;
				public shutdown(param0: okhttp3.internal.http2.ErrorCode): void;
				public pushRequestLater$okhttp(param0: number, param1: java.util.List<okhttp3.internal.http2.Header>): void;
				public getStreams$okhttp(): java.util.Map<java.lang.Integer,okhttp3.internal.http2.Http2Stream>;
				public getWriteBytesTotal(): number;
			}
			export module Http2Connection {
				export class Builder extends java.lang.Object {
					public static class: java.lang.Class<okhttp3.internal.http2.Http2Connection.Builder>;
					public connectionName: string;
					public source: okio.BufferedSource;
					public sink: okio.BufferedSink;
					public setPushObserver$okhttp(param0: okhttp3.internal.http2.PushObserver): void;
					public listener(param0: okhttp3.internal.http2.Http2Connection.Listener): okhttp3.internal.http2.Http2Connection.Builder;
					public build(): okhttp3.internal.http2.Http2Connection;
					public setSocket$okhttp(param0: java.net.Socket): void;
					public getClient$okhttp(): boolean;
					public socket(param0: java.net.Socket, param1: string, param2: okio.BufferedSource): okhttp3.internal.http2.Http2Connection.Builder;
					public pushObserver(param0: okhttp3.internal.http2.PushObserver): okhttp3.internal.http2.Http2Connection.Builder;
					public setClient$okhttp(param0: boolean): void;
					public getSocket$okhttp(): java.net.Socket;
					public getListener$okhttp(): okhttp3.internal.http2.Http2Connection.Listener;
					public pingIntervalMillis(param0: number): okhttp3.internal.http2.Http2Connection.Builder;
					public socket(param0: java.net.Socket, param1: string): okhttp3.internal.http2.Http2Connection.Builder;
					public constructor(param0: boolean, param1: okhttp3.internal.concurrent.TaskRunner);
					public setConnectionName$okhttp(param0: string): void;
					public setPingIntervalMillis$okhttp(param0: number): void;
					public getSource$okhttp(): okio.BufferedSource;
					public setListener$okhttp(param0: okhttp3.internal.http2.Http2Connection.Listener): void;
					public socket(param0: java.net.Socket, param1: string, param2: okio.BufferedSource, param3: okio.BufferedSink): okhttp3.internal.http2.Http2Connection.Builder;
					public getConnectionName$okhttp(): string;
					public getPushObserver$okhttp(): okhttp3.internal.http2.PushObserver;
					public getSink$okhttp(): okio.BufferedSink;
					public setSink$okhttp(param0: okio.BufferedSink): void;
					public getPingIntervalMillis$okhttp(): number;
					public setSource$okhttp(param0: okio.BufferedSource): void;
					public getTaskRunner$okhttp(): okhttp3.internal.concurrent.TaskRunner;
					public socket(param0: java.net.Socket): okhttp3.internal.http2.Http2Connection.Builder;
				}
				export class Companion extends java.lang.Object {
					public static class: java.lang.Class<okhttp3.internal.http2.Http2Connection.Companion>;
					public getDEFAULT_SETTINGS(): okhttp3.internal.http2.Settings;
				}
				export abstract class Listener extends java.lang.Object {
					public static class: java.lang.Class<okhttp3.internal.http2.Http2Connection.Listener>;
					public static REFUSE_INCOMING_STREAMS: okhttp3.internal.http2.Http2Connection.Listener;
					public onStream(param0: okhttp3.internal.http2.Http2Stream): void;
					public constructor();
					public onSettings(param0: okhttp3.internal.http2.Http2Connection, param1: okhttp3.internal.http2.Settings): void;
				}
				export module Listener {
					export class Companion extends java.lang.Object {
						public static class: java.lang.Class<okhttp3.internal.http2.Http2Connection.Listener.Companion>;
					}
				}
				export class ReaderRunnable extends java.lang.Object {
					public static class: java.lang.Class<okhttp3.internal.http2.Http2Connection.ReaderRunnable>;
					public ackSettings(): void;
					public invoke(): void;
					public headers(param0: boolean, param1: number, param2: number, param3: java.util.List<okhttp3.internal.http2.Header>): void;
					public priority(param0: number, param1: number, param2: number, param3: boolean): void;
					public applyAndAckSettings(param0: boolean, param1: okhttp3.internal.http2.Settings): void;
					public pushPromise(param0: number, param1: number, param2: java.util.List<okhttp3.internal.http2.Header>): void;
					public constructor(param0: okhttp3.internal.http2.Http2Reader);
					public getReader$okhttp(): okhttp3.internal.http2.Http2Reader;
					public settings(param0: boolean, param1: okhttp3.internal.http2.Settings): void;
					public alternateService(param0: number, param1: string, param2: okio.ByteString, param3: string, param4: number, param5: number): void;
					public data(param0: boolean, param1: number, param2: okio.BufferedSource, param3: number): void;
					public rstStream(param0: number, param1: okhttp3.internal.http2.ErrorCode): void;
					public goAway(param0: number, param1: okhttp3.internal.http2.ErrorCode, param2: okio.ByteString): void;
					public windowUpdate(param0: number, param1: number): void;
					public ping(param0: boolean, param1: number, param2: number): void;
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module http2 {
			export class Http2ExchangeCodec extends java.lang.Object implements okhttp3.internal.http.ExchangeCodec {
				public static class: java.lang.Class<okhttp3.internal.http2.Http2ExchangeCodec>;
				public finishRequest(): void;
				public trailers(): okhttp3.Headers;
				public constructor(param0: okhttp3.OkHttpClient, param1: okhttp3.internal.connection.RealConnection, param2: okhttp3.internal.http.RealInterceptorChain, param3: okhttp3.internal.http2.Http2Connection);
				public reportedContentLength(param0: okhttp3.Response): number;
				public openResponseBodySource(param0: okhttp3.Response): okio.Source;
				public readResponseHeaders(param0: boolean): okhttp3.Response.Builder;
				public cancel(): void;
				public flushRequest(): void;
				public createRequestBody(param0: okhttp3.Request, param1: number): okio.Sink;
				public writeRequestHeaders(param0: okhttp3.Request): void;
				public getConnection(): okhttp3.internal.connection.RealConnection;
			}
			export module Http2ExchangeCodec {
				export class Companion extends java.lang.Object {
					public static class: java.lang.Class<okhttp3.internal.http2.Http2ExchangeCodec.Companion>;
					public http2HeadersList(param0: okhttp3.Request): java.util.List<okhttp3.internal.http2.Header>;
					public readHttp2HeadersList(param0: okhttp3.Headers, param1: okhttp3.Protocol): okhttp3.Response.Builder;
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module http2 {
			export class Http2Reader extends java.lang.Object implements java.io.Closeable {
				public static class: java.lang.Class<okhttp3.internal.http2.Http2Reader>;
				public close(): void;
				public nextFrame(param0: boolean, param1: okhttp3.internal.http2.Http2Reader.Handler): boolean;
				public constructor(param0: okio.BufferedSource, param1: boolean);
				public readConnectionPreface(param0: okhttp3.internal.http2.Http2Reader.Handler): void;
			}
			export module Http2Reader {
				export class Companion extends java.lang.Object {
					public static class: java.lang.Class<okhttp3.internal.http2.Http2Reader.Companion>;
					public getLogger(): java.util.logging.Logger;
					public lengthWithoutPadding(param0: number, param1: number, param2: number): number;
				}
				export class ContinuationSource extends java.lang.Object {
					public static class: java.lang.Class<okhttp3.internal.http2.Http2Reader.ContinuationSource>;
					public getFlags(): number;
					public setStreamId(param0: number): void;
					public getLength(): number;
					public timeout(): okio.Timeout;
					public read(param0: okio.Buffer, param1: number): number;
					public constructor(param0: okio.BufferedSource);
					public setLength(param0: number): void;
					public getStreamId(): number;
					public getPadding(): number;
					public setPadding(param0: number): void;
					public setFlags(param0: number): void;
					public close(): void;
					public getLeft(): number;
					public setLeft(param0: number): void;
				}
				export class Handler extends java.lang.Object {
					public static class: java.lang.Class<okhttp3.internal.http2.Http2Reader.Handler>;
					/**
					 * Constructs a new instance of the okhttp3.internal.http2.Http2Reader$Handler interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						data(param0: boolean, param1: number, param2: okio.BufferedSource, param3: number): void;
						headers(param0: boolean, param1: number, param2: number, param3: java.util.List<okhttp3.internal.http2.Header>): void;
						rstStream(param0: number, param1: okhttp3.internal.http2.ErrorCode): void;
						settings(param0: boolean, param1: okhttp3.internal.http2.Settings): void;
						ackSettings(): void;
						ping(param0: boolean, param1: number, param2: number): void;
						goAway(param0: number, param1: okhttp3.internal.http2.ErrorCode, param2: okio.ByteString): void;
						windowUpdate(param0: number, param1: number): void;
						priority(param0: number, param1: number, param2: number, param3: boolean): void;
						pushPromise(param0: number, param1: number, param2: java.util.List<okhttp3.internal.http2.Header>): void;
						alternateService(param0: number, param1: string, param2: okio.ByteString, param3: string, param4: number, param5: number): void;
					});
					public constructor();
					public settings(param0: boolean, param1: okhttp3.internal.http2.Settings): void;
					public alternateService(param0: number, param1: string, param2: okio.ByteString, param3: string, param4: number, param5: number): void;
					public ackSettings(): void;
					public data(param0: boolean, param1: number, param2: okio.BufferedSource, param3: number): void;
					public headers(param0: boolean, param1: number, param2: number, param3: java.util.List<okhttp3.internal.http2.Header>): void;
					public priority(param0: number, param1: number, param2: number, param3: boolean): void;
					public pushPromise(param0: number, param1: number, param2: java.util.List<okhttp3.internal.http2.Header>): void;
					public rstStream(param0: number, param1: okhttp3.internal.http2.ErrorCode): void;
					public goAway(param0: number, param1: okhttp3.internal.http2.ErrorCode, param2: okio.ByteString): void;
					public windowUpdate(param0: number, param1: number): void;
					public ping(param0: boolean, param1: number, param2: number): void;
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module http2 {
			export class Http2Stream extends java.lang.Object {
				public static class: java.lang.Class<okhttp3.internal.http2.Http2Stream>;
				public static EMIT_BUFFER_SIZE: number;
				public getSource(): okio.Source;
				public closeLater(param0: okhttp3.internal.http2.ErrorCode): void;
				public enqueueTrailers(param0: okhttp3.Headers): void;
				public setWriteBytesTotal$okhttp(param0: number): void;
				public trailers(): okhttp3.Headers;
				public writeHeaders(param0: java.util.List<okhttp3.internal.http2.Header>, param1: boolean, param2: boolean): void;
				public cancelStreamIfNecessary$okhttp(): void;
				public getReadTimeout$okhttp(): okhttp3.internal.http2.Http2Stream.StreamTimeout;
				public readTimeout(): okio.Timeout;
				public getErrorCode$okhttp(): okhttp3.internal.http2.ErrorCode;
				public addBytesToWriteWindow(param0: number): void;
				public getSink(): okio.Sink;
				public checkOutNotClosed$okhttp(): void;
				public isLocallyInitiated(): boolean;
				public setErrorCode$okhttp(param0: okhttp3.internal.http2.ErrorCode): void;
				public writeTimeout(): okio.Timeout;
				public getId(): number;
				public receiveRstStream(param0: okhttp3.internal.http2.ErrorCode): void;
				public setWriteBytesMaximum$okhttp(param0: number): void;
				public getSource$okhttp(): okhttp3.internal.http2.Http2Stream.FramingSource;
				public getWriteTimeout$okhttp(): okhttp3.internal.http2.Http2Stream.StreamTimeout;
				public receiveHeaders(param0: okhttp3.Headers, param1: boolean): void;
				public setReadBytesAcknowledged$okhttp(param0: number): void;
				public getReadBytesAcknowledged(): number;
				public takeHeaders(): okhttp3.Headers;
				public setReadBytesTotal$okhttp(param0: number): void;
				public getWriteBytesTotal(): number;
				public close(param0: okhttp3.internal.http2.ErrorCode, param1: java.io.IOException): void;
				public getSink$okhttp(): okhttp3.internal.http2.Http2Stream.FramingSink;
				public getErrorException$okhttp(): java.io.IOException;
				public getConnection(): okhttp3.internal.http2.Http2Connection;
				public isOpen(): boolean;
				public receiveData(param0: okio.BufferedSource, param1: number): void;
				public waitForIo$okhttp(): void;
				public getWriteBytesMaximum(): number;
				public getReadBytesTotal(): number;
				public setErrorException$okhttp(param0: java.io.IOException): void;
				public constructor(param0: number, param1: okhttp3.internal.http2.Http2Connection, param2: boolean, param3: boolean, param4: okhttp3.Headers);
			}
			export module Http2Stream {
				export class Companion extends java.lang.Object {
					public static class: java.lang.Class<okhttp3.internal.http2.Http2Stream.Companion>;
				}
				export class FramingSink extends java.lang.Object {
					public static class: java.lang.Class<okhttp3.internal.http2.Http2Stream.FramingSink>;
					public getTrailers(): okhttp3.Headers;
					public constructor(param0: boolean);
					public getFinished(): boolean;
					public setTrailers(param0: okhttp3.Headers): void;
					public getClosed(): boolean;
					public close(): void;
					public flush(): void;
					public write(param0: okio.Buffer, param1: number): void;
					public timeout(): okio.Timeout;
					public setClosed(param0: boolean): void;
					public setFinished(param0: boolean): void;
				}
				export class FramingSource extends java.lang.Object {
					public static class: java.lang.Class<okhttp3.internal.http2.Http2Stream.FramingSource>;
					public getTrailers(): okhttp3.Headers;
					public receive$okhttp(param0: okio.BufferedSource, param1: number): void;
					public setTrailers(param0: okhttp3.Headers): void;
					public getFinished$okhttp(): boolean;
					public timeout(): okio.Timeout;
					public read(param0: okio.Buffer, param1: number): number;
					public constructor(param0: number, param1: boolean);
					public getReadBuffer(): okio.Buffer;
					public getClosed$okhttp(): boolean;
					public setFinished$okhttp(param0: boolean): void;
					public close(): void;
					public getReceiveBuffer(): okio.Buffer;
					public setClosed$okhttp(param0: boolean): void;
				}
				export class StreamTimeout {
					public static class: java.lang.Class<okhttp3.internal.http2.Http2Stream.StreamTimeout>;
					public timedOut(): void;
					public newTimeoutException(param0: java.io.IOException): java.io.IOException;
					public exitAndThrowIfTimedOut(): void;
					public constructor(param0: okhttp3.internal.http2.Http2Stream);
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module http2 {
			export class Http2Writer extends java.lang.Object implements java.io.Closeable {
				public static class: java.lang.Class<okhttp3.internal.http2.Http2Writer>;
				public close(): void;
				public getHpackWriter(): okhttp3.internal.http2.Hpack.Writer;
				public dataFrame(param0: number, param1: number, param2: okio.Buffer, param3: number): void;
				public settings(param0: okhttp3.internal.http2.Settings): void;
				public ping(param0: boolean, param1: number, param2: number): void;
				public constructor(param0: okio.BufferedSink, param1: boolean);
				public windowUpdate(param0: number, param1: number): void;
				public frameHeader(param0: number, param1: number, param2: number, param3: number): void;
				public maxDataLength(): number;
				public flush(): void;
				public connectionPreface(): void;
				public goAway(param0: number, param1: okhttp3.internal.http2.ErrorCode, param2: androidNative.Array<number>): void;
				public pushPromise(param0: number, param1: number, param2: java.util.List<okhttp3.internal.http2.Header>): void;
				public data(param0: boolean, param1: number, param2: okio.Buffer, param3: number): void;
				public rstStream(param0: number, param1: okhttp3.internal.http2.ErrorCode): void;
				public headers(param0: boolean, param1: number, param2: java.util.List<okhttp3.internal.http2.Header>): void;
				public applyAndAckSettings(param0: okhttp3.internal.http2.Settings): void;
			}
			export module Http2Writer {
				export class Companion extends java.lang.Object {
					public static class: java.lang.Class<okhttp3.internal.http2.Http2Writer.Companion>;
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module http2 {
			export class Huffman extends java.lang.Object {
				public static class: java.lang.Class<okhttp3.internal.http2.Huffman>;
				public static INSTANCE: okhttp3.internal.http2.Huffman;
				public encodedLength(param0: okio.ByteString): number;
				public encode(param0: okio.ByteString, param1: okio.BufferedSink): void;
				public decode(param0: okio.BufferedSource, param1: number, param2: okio.BufferedSink): void;
			}
			export module Huffman {
				export class Node extends java.lang.Object {
					public static class: java.lang.Class<okhttp3.internal.http2.Huffman.Node>;
					public getSymbol(): number;
					public getChildren(): androidNative.Array<okhttp3.internal.http2.Huffman.Node>;
					public constructor();
					public getTerminalBitCount(): number;
					public constructor(param0: number, param1: number);
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module http2 {
			export class PushObserver extends java.lang.Object {
				public static class: java.lang.Class<okhttp3.internal.http2.PushObserver>;
				/**
				 * Constructs a new instance of the okhttp3.internal.http2.PushObserver interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
				 */
				public constructor(implementation: {
					onRequest(param0: number, param1: java.util.List<okhttp3.internal.http2.Header>): boolean;
					onHeaders(param0: number, param1: java.util.List<okhttp3.internal.http2.Header>, param2: boolean): boolean;
					onData(param0: number, param1: okio.BufferedSource, param2: number, param3: boolean): boolean;
					onReset(param0: number, param1: okhttp3.internal.http2.ErrorCode): void;
					<clinit>(): void;
				});
				public constructor();
				public static CANCEL: okhttp3.internal.http2.PushObserver;
				public onRequest(param0: number, param1: java.util.List<okhttp3.internal.http2.Header>): boolean;
				public onHeaders(param0: number, param1: java.util.List<okhttp3.internal.http2.Header>, param2: boolean): boolean;
				public onData(param0: number, param1: okio.BufferedSource, param2: number, param3: boolean): boolean;
				public onReset(param0: number, param1: okhttp3.internal.http2.ErrorCode): void;
			}
			export module PushObserver {
				export class Companion extends java.lang.Object {
					public static class: java.lang.Class<okhttp3.internal.http2.PushObserver.Companion>;
				}
				export module Companion {
					export class PushObserverCancel extends java.lang.Object implements okhttp3.internal.http2.PushObserver {
						public static class: java.lang.Class<okhttp3.internal.http2.PushObserver.Companion.PushObserverCancel>;
						public onRequest(param0: number, param1: java.util.List<okhttp3.internal.http2.Header>): boolean;
						public onHeaders(param0: number, param1: java.util.List<okhttp3.internal.http2.Header>, param2: boolean): boolean;
						public constructor();
						public onReset(param0: number, param1: okhttp3.internal.http2.ErrorCode): void;
						public onData(param0: number, param1: okio.BufferedSource, param2: number, param3: boolean): boolean;
					}
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module http2 {
			export class Settings extends java.lang.Object {
				public static class: java.lang.Class<okhttp3.internal.http2.Settings>;
				public static DEFAULT_INITIAL_WINDOW_SIZE: number;
				public static HEADER_TABLE_SIZE: number;
				public static ENABLE_PUSH: number;
				public static MAX_CONCURRENT_STREAMS: number;
				public static MAX_FRAME_SIZE: number;
				public static MAX_HEADER_LIST_SIZE: number;
				public static INITIAL_WINDOW_SIZE: number;
				public static COUNT: number;
				public merge(param0: okhttp3.internal.http2.Settings): void;
				public getHeaderTableSize(): number;
				public getEnablePush(param0: boolean): boolean;
				public get(param0: number): number;
				public constructor();
				public getInitialWindowSize(): number;
				public size(): number;
				public getMaxConcurrentStreams(): number;
				public clear(): void;
				public isSet(param0: number): boolean;
				public getMaxFrameSize(param0: number): number;
				public set(param0: number, param1: number): okhttp3.internal.http2.Settings;
				public getMaxHeaderListSize(param0: number): number;
			}
			export module Settings {
				export class Companion extends java.lang.Object {
					public static class: java.lang.Class<okhttp3.internal.http2.Settings.Companion>;
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module http2 {
			export class StreamResetException extends java.io.IOException {
				public static class: java.lang.Class<okhttp3.internal.http2.StreamResetException>;
				public errorCode: okhttp3.internal.http2.ErrorCode;
				public constructor(param0: okhttp3.internal.http2.ErrorCode);
				public constructor(param0: string, param1: java.lang.Throwable);
				public constructor(param0: java.lang.Throwable);
				public constructor(param0: string);
				public constructor();
				public constructor(param0: string, param1: java.lang.Throwable, param2: boolean, param3: boolean);
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module io {
			export class FileSystem extends java.lang.Object {
				public static class: java.lang.Class<okhttp3.internal.io.FileSystem>;
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
				public static SYSTEM: okhttp3.internal.io.FileSystem;
				public source(param0: java.io.File): okio.Source;
				public size(param0: java.io.File): number;
				public deleteContents(param0: java.io.File): void;
				public appendingSink(param0: java.io.File): okio.Sink;
				public sink(param0: java.io.File): okio.Sink;
				public exists(param0: java.io.File): boolean;
				public rename(param0: java.io.File, param1: java.io.File): void;
				public delete(param0: java.io.File): void;
			}
			export module FileSystem {
				export class Companion extends java.lang.Object {
					public static class: java.lang.Class<okhttp3.internal.io.FileSystem.Companion>;
				}
				export module Companion {
					export class SystemFileSystem extends java.lang.Object implements okhttp3.internal.io.FileSystem {
						public static class: java.lang.Class<okhttp3.internal.io.FileSystem.Companion.SystemFileSystem>;
						public source(param0: java.io.File): okio.Source;
						public appendingSink(param0: java.io.File): okio.Sink;
						public constructor();
						public sink(param0: java.io.File): okio.Sink;
						public delete(param0: java.io.File): void;
						public size(param0: java.io.File): number;
						public deleteContents(param0: java.io.File): void;
						public exists(param0: java.io.File): boolean;
						public rename(param0: java.io.File, param1: java.io.File): void;
						public toString(): string;
					}
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module platform {
			export class Android10Platform extends okhttp3.internal.platform.Platform {
				public static class: java.lang.Class<okhttp3.internal.platform.Android10Platform>;
				public buildCertificateChainCleaner(param0: javax.net.ssl.X509TrustManager): okhttp3.internal.tls.CertificateChainCleaner;
				public getSelectedProtocol(param0: javax.net.ssl.SSLSocket): string;
				public trustManager(param0: javax.net.ssl.SSLSocketFactory): javax.net.ssl.X509TrustManager;
				public configureTlsExtensions(param0: javax.net.ssl.SSLSocket, param1: string, param2: java.util.List<okhttp3.Protocol>): void;
				public configureTlsExtensions(param0: javax.net.ssl.SSLSocket, param1: string, param2: java.util.List<any>): void;
				public isCleartextTrafficPermitted(param0: string): boolean;
				public constructor();
			}
			export module Android10Platform {
				export class Companion extends java.lang.Object {
					public static class: java.lang.Class<okhttp3.internal.platform.Android10Platform.Companion>;
					public isSupported(): boolean;
					public buildIfSupported(): okhttp3.internal.platform.Platform;
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module platform {
			export class AndroidPlatform extends okhttp3.internal.platform.Platform {
				public static class: java.lang.Class<okhttp3.internal.platform.AndroidPlatform>;
				public buildCertificateChainCleaner(param0: javax.net.ssl.X509TrustManager): okhttp3.internal.tls.CertificateChainCleaner;
				public connectSocket(param0: java.net.Socket, param1: java.net.InetSocketAddress, param2: number): void;
				public getSelectedProtocol(param0: javax.net.ssl.SSLSocket): string;
				public trustManager(param0: javax.net.ssl.SSLSocketFactory): javax.net.ssl.X509TrustManager;
				public configureTlsExtensions(param0: javax.net.ssl.SSLSocket, param1: string, param2: java.util.List<okhttp3.Protocol>): void;
				public logCloseableLeak(param0: string, param1: any): void;
				public getStackTraceForCloseable(param0: string): any;
				public buildTrustRootIndex(param0: javax.net.ssl.X509TrustManager): okhttp3.internal.tls.TrustRootIndex;
				public isCleartextTrafficPermitted(param0: string): boolean;
				public constructor();
			}
			export module AndroidPlatform {
				export class Companion extends java.lang.Object {
					public static class: java.lang.Class<okhttp3.internal.platform.AndroidPlatform.Companion>;
					public isSupported(): boolean;
					public buildIfSupported(): okhttp3.internal.platform.Platform;
				}
				export class CustomTrustRootIndex extends java.lang.Object implements okhttp3.internal.tls.TrustRootIndex {
					public static class: java.lang.Class<okhttp3.internal.platform.AndroidPlatform.CustomTrustRootIndex>;
					public constructor(param0: javax.net.ssl.X509TrustManager, param1: java.lang.reflect.Method);
					public equals(param0: any): boolean;
					public findByIssuerAndSignature(param0: java.security.cert.X509Certificate): java.security.cert.X509Certificate;
					public toString(): string;
					public copy(param0: javax.net.ssl.X509TrustManager, param1: java.lang.reflect.Method): okhttp3.internal.platform.AndroidPlatform.CustomTrustRootIndex;
					public hashCode(): number;
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module platform {
			export class BouncyCastlePlatform extends okhttp3.internal.platform.Platform {
				public static class: java.lang.Class<okhttp3.internal.platform.BouncyCastlePlatform>;
				public newSSLContext(): javax.net.ssl.SSLContext;
				public getSelectedProtocol(param0: javax.net.ssl.SSLSocket): string;
				public trustManager(param0: javax.net.ssl.SSLSocketFactory): javax.net.ssl.X509TrustManager;
				public configureTlsExtensions(param0: javax.net.ssl.SSLSocket, param1: string, param2: java.util.List<okhttp3.Protocol>): void;
				public platformTrustManager(): javax.net.ssl.X509TrustManager;
			}
			export module BouncyCastlePlatform {
				export class Companion extends java.lang.Object {
					public static class: java.lang.Class<okhttp3.internal.platform.BouncyCastlePlatform.Companion>;
					public isSupported(): boolean;
					public buildIfSupported(): okhttp3.internal.platform.BouncyCastlePlatform;
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module platform {
			export class ConscryptPlatform extends okhttp3.internal.platform.Platform {
				public static class: java.lang.Class<okhttp3.internal.platform.ConscryptPlatform>;
				public newSslSocketFactory(param0: javax.net.ssl.X509TrustManager): javax.net.ssl.SSLSocketFactory;
				public newSSLContext(): javax.net.ssl.SSLContext;
				public getSelectedProtocol(param0: javax.net.ssl.SSLSocket): string;
				public trustManager(param0: javax.net.ssl.SSLSocketFactory): javax.net.ssl.X509TrustManager;
				public configureTlsExtensions(param0: javax.net.ssl.SSLSocket, param1: string, param2: java.util.List<okhttp3.Protocol>): void;
				public platformTrustManager(): javax.net.ssl.X509TrustManager;
			}
			export module ConscryptPlatform {
				export class Companion extends java.lang.Object {
					public static class: java.lang.Class<okhttp3.internal.platform.ConscryptPlatform.Companion>;
					public isSupported(): boolean;
					public buildIfSupported(): okhttp3.internal.platform.ConscryptPlatform;
					public atLeastVersion(param0: number, param1: number, param2: number): boolean;
				}
				export class DisabledHostnameVerifier extends java.lang.Object {
					public static class: java.lang.Class<okhttp3.internal.platform.ConscryptPlatform.DisabledHostnameVerifier>;
					public static INSTANCE: okhttp3.internal.platform.ConscryptPlatform.DisabledHostnameVerifier;
					public verify(param0: androidNative.Array<java.security.cert.X509Certificate>, param1: string, param2: javax.net.ssl.SSLSession): boolean;
					public verify(param0: string, param1: javax.net.ssl.SSLSession): boolean;
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module platform {
			export class Jdk8WithJettyBootPlatform extends okhttp3.internal.platform.Platform {
				public static class: java.lang.Class<okhttp3.internal.platform.Jdk8WithJettyBootPlatform>;
				public getSelectedProtocol(param0: javax.net.ssl.SSLSocket): string;
				public afterHandshake(param0: javax.net.ssl.SSLSocket): void;
				public constructor(param0: java.lang.reflect.Method, param1: java.lang.reflect.Method, param2: java.lang.reflect.Method, param3: java.lang.Class<any>, param4: java.lang.Class<any>);
				public configureTlsExtensions(param0: javax.net.ssl.SSLSocket, param1: string, param2: java.util.List<okhttp3.Protocol>): void;
				public configureTlsExtensions(param0: javax.net.ssl.SSLSocket, param1: string, param2: java.util.List<any>): void;
				public constructor();
			}
			export module Jdk8WithJettyBootPlatform {
				export class AlpnProvider extends java.lang.Object implements java.lang.reflect.InvocationHandler {
					public static class: java.lang.Class<okhttp3.internal.platform.Jdk8WithJettyBootPlatform.AlpnProvider>;
					public getSelected(): string;
					public setUnsupported(param0: boolean): void;
					public constructor(param0: java.util.List<string>);
					public getUnsupported(): boolean;
					public setSelected(param0: string): void;
					public invoke(param0: any, param1: java.lang.reflect.Method, param2: androidNative.Array<any>): any;
				}
				export class Companion extends java.lang.Object {
					public static class: java.lang.Class<okhttp3.internal.platform.Jdk8WithJettyBootPlatform.Companion>;
					public buildIfSupported(): okhttp3.internal.platform.Platform;
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module platform {
			export class Jdk9Platform extends okhttp3.internal.platform.Platform {
				public static class: java.lang.Class<okhttp3.internal.platform.Jdk9Platform>;
				public getSelectedProtocol(param0: javax.net.ssl.SSLSocket): string;
				public trustManager(param0: javax.net.ssl.SSLSocketFactory): javax.net.ssl.X509TrustManager;
				public configureTlsExtensions(param0: javax.net.ssl.SSLSocket, param1: string, param2: java.util.List<okhttp3.Protocol>): void;
				public constructor();
			}
			export module Jdk9Platform {
				export class Companion extends java.lang.Object {
					public static class: java.lang.Class<okhttp3.internal.platform.Jdk9Platform.Companion>;
					public buildIfSupported(): okhttp3.internal.platform.Jdk9Platform;
					public isAvailable(): boolean;
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module platform {
			export class OpenJSSEPlatform extends okhttp3.internal.platform.Platform {
				public static class: java.lang.Class<okhttp3.internal.platform.OpenJSSEPlatform>;
				public newSSLContext(): javax.net.ssl.SSLContext;
				public getSelectedProtocol(param0: javax.net.ssl.SSLSocket): string;
				public trustManager(param0: javax.net.ssl.SSLSocketFactory): javax.net.ssl.X509TrustManager;
				public configureTlsExtensions(param0: javax.net.ssl.SSLSocket, param1: string, param2: java.util.List<okhttp3.Protocol>): void;
				public platformTrustManager(): javax.net.ssl.X509TrustManager;
			}
			export module OpenJSSEPlatform {
				export class Companion extends java.lang.Object {
					public static class: java.lang.Class<okhttp3.internal.platform.OpenJSSEPlatform.Companion>;
					public isSupported(): boolean;
					public buildIfSupported(): okhttp3.internal.platform.OpenJSSEPlatform;
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module platform {
			export class Platform extends java.lang.Object {
				public static class: java.lang.Class<okhttp3.internal.platform.Platform>;
				public static INFO: number;
				public static WARN: number;
				public newSslSocketFactory(param0: javax.net.ssl.X509TrustManager): javax.net.ssl.SSLSocketFactory;
				public getPrefix(): string;
				public newSSLContext(): javax.net.ssl.SSLContext;
				public connectSocket(param0: java.net.Socket, param1: java.net.InetSocketAddress, param2: number): void;
				public configureTlsExtensions(param0: javax.net.ssl.SSLSocket, param1: string, param2: java.util.List<okhttp3.Protocol>): void;
				public logCloseableLeak(param0: string, param1: any): void;
				public buildTrustRootIndex(param0: javax.net.ssl.X509TrustManager): okhttp3.internal.tls.TrustRootIndex;
				public toString(): string;
				public isCleartextTrafficPermitted(param0: string): boolean;
				public constructor();
				public buildCertificateChainCleaner(param0: javax.net.ssl.X509TrustManager): okhttp3.internal.tls.CertificateChainCleaner;
				public getSelectedProtocol(param0: javax.net.ssl.SSLSocket): string;
				public trustManager(param0: javax.net.ssl.SSLSocketFactory): javax.net.ssl.X509TrustManager;
				public afterHandshake(param0: javax.net.ssl.SSLSocket): void;
				public log(param0: string, param1: number, param2: java.lang.Throwable): void;
				public platformTrustManager(): javax.net.ssl.X509TrustManager;
				public getStackTraceForCloseable(param0: string): any;
				public static get(): okhttp3.internal.platform.Platform;
			}
			export module Platform {
				export class Companion extends java.lang.Object {
					public static class: java.lang.Class<okhttp3.internal.platform.Platform.Companion>;
					public concatLengthPrefixed(param0: java.util.List<any>): androidNative.Array<number>;
					public isAndroid(): boolean;
					public alpnProtocolNames(param0: java.util.List<any>): java.util.List<string>;
					public resetForTests(param0: okhttp3.internal.platform.Platform): void;
					public get(): okhttp3.internal.platform.Platform;
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module platform {
			export module android {
				export class Android10SocketAdapter extends java.lang.Object implements okhttp3.internal.platform.android.SocketAdapter {
					public static class: java.lang.Class<okhttp3.internal.platform.android.Android10SocketAdapter>;
					public isSupported(): boolean;
					public matchesSocket(param0: javax.net.ssl.SSLSocket): boolean;
					public configureTlsExtensions(param0: javax.net.ssl.SSLSocket, param1: string, param2: java.util.List<any>): void;
					public constructor();
					public getSelectedProtocol(param0: javax.net.ssl.SSLSocket): string;
					public trustManager(param0: javax.net.ssl.SSLSocketFactory): javax.net.ssl.X509TrustManager;
					public matchesSocketFactory(param0: javax.net.ssl.SSLSocketFactory): boolean;
				}
				export module Android10SocketAdapter {
					export class Companion extends java.lang.Object {
						public static class: java.lang.Class<okhttp3.internal.platform.android.Android10SocketAdapter.Companion>;
						public buildIfSupported(): okhttp3.internal.platform.android.SocketAdapter;
						public isSupported(): boolean;
					}
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module platform {
			export module android {
				export class AndroidCertificateChainCleaner extends okhttp3.internal.tls.CertificateChainCleaner {
					public static class: java.lang.Class<okhttp3.internal.platform.android.AndroidCertificateChainCleaner>;
					public equals(param0: any): boolean;
					public constructor(param0: javax.net.ssl.X509TrustManager, param1: globalAndroid.net.http.X509TrustManagerExtensions);
					public constructor();
					public clean(param0: java.util.List<any>, param1: string): java.util.List<java.security.cert.Certificate>;
					public hashCode(): number;
				}
				export module AndroidCertificateChainCleaner {
					export class Companion extends java.lang.Object {
						public static class: java.lang.Class<okhttp3.internal.platform.android.AndroidCertificateChainCleaner.Companion>;
						public buildIfSupported(param0: javax.net.ssl.X509TrustManager): okhttp3.internal.platform.android.AndroidCertificateChainCleaner;
					}
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module platform {
			export module android {
				export class AndroidLog extends java.lang.Object {
					public static class: java.lang.Class<okhttp3.internal.platform.android.AndroidLog>;
					public static INSTANCE: okhttp3.internal.platform.android.AndroidLog;
					public androidLog$okhttp(param0: string, param1: number, param2: string, param3: java.lang.Throwable): void;
					public enable(): void;
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module platform {
			export module android {
				export class AndroidLogHandler extends java.util.logging.Handler {
					public static class: java.lang.Class<okhttp3.internal.platform.android.AndroidLogHandler>;
					public static INSTANCE: okhttp3.internal.platform.android.AndroidLogHandler;
					public publish(param0: java.util.logging.LogRecord): void;
					public close(): void;
					public flush(): void;
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module platform {
			export module android {
				export class AndroidSocketAdapter extends java.lang.Object implements okhttp3.internal.platform.android.SocketAdapter {
					public static class: java.lang.Class<okhttp3.internal.platform.android.AndroidSocketAdapter>;
					public isSupported(): boolean;
					public matchesSocket(param0: javax.net.ssl.SSLSocket): boolean;
					public constructor(param0: java.lang.Class<any>);
					public configureTlsExtensions(param0: javax.net.ssl.SSLSocket, param1: string, param2: java.util.List<any>): void;
					public getSelectedProtocol(param0: javax.net.ssl.SSLSocket): string;
					public trustManager(param0: javax.net.ssl.SSLSocketFactory): javax.net.ssl.X509TrustManager;
					public matchesSocketFactory(param0: javax.net.ssl.SSLSocketFactory): boolean;
				}
				export module AndroidSocketAdapter {
					export class Companion extends java.lang.Object {
						public static class: java.lang.Class<okhttp3.internal.platform.android.AndroidSocketAdapter.Companion>;
						public getPlayProviderFactory(): okhttp3.internal.platform.android.DeferredSocketAdapter.Factory;
						public factory(param0: string): okhttp3.internal.platform.android.DeferredSocketAdapter.Factory;
					}
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module platform {
			export module android {
				export class BouncyCastleSocketAdapter extends java.lang.Object implements okhttp3.internal.platform.android.SocketAdapter {
					public static class: java.lang.Class<okhttp3.internal.platform.android.BouncyCastleSocketAdapter>;
					public isSupported(): boolean;
					public matchesSocket(param0: javax.net.ssl.SSLSocket): boolean;
					public configureTlsExtensions(param0: javax.net.ssl.SSLSocket, param1: string, param2: java.util.List<any>): void;
					public constructor();
					public getSelectedProtocol(param0: javax.net.ssl.SSLSocket): string;
					public trustManager(param0: javax.net.ssl.SSLSocketFactory): javax.net.ssl.X509TrustManager;
					public matchesSocketFactory(param0: javax.net.ssl.SSLSocketFactory): boolean;
				}
				export module BouncyCastleSocketAdapter {
					export class Companion extends java.lang.Object {
						public static class: java.lang.Class<okhttp3.internal.platform.android.BouncyCastleSocketAdapter.Companion>;
						public getFactory(): okhttp3.internal.platform.android.DeferredSocketAdapter.Factory;
					}
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module platform {
			export module android {
				export class CloseGuard extends java.lang.Object {
					public static class: java.lang.Class<okhttp3.internal.platform.android.CloseGuard>;
					public warnIfOpen(param0: any): boolean;
					public createAndOpen(param0: string): any;
					public constructor(param0: java.lang.reflect.Method, param1: java.lang.reflect.Method, param2: java.lang.reflect.Method);
				}
				export module CloseGuard {
					export class Companion extends java.lang.Object {
						public static class: java.lang.Class<okhttp3.internal.platform.android.CloseGuard.Companion>;
						public get(): okhttp3.internal.platform.android.CloseGuard;
					}
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module platform {
			export module android {
				export class ConscryptSocketAdapter extends java.lang.Object implements okhttp3.internal.platform.android.SocketAdapter {
					public static class: java.lang.Class<okhttp3.internal.platform.android.ConscryptSocketAdapter>;
					public isSupported(): boolean;
					public matchesSocket(param0: javax.net.ssl.SSLSocket): boolean;
					public configureTlsExtensions(param0: javax.net.ssl.SSLSocket, param1: string, param2: java.util.List<any>): void;
					public constructor();
					public getSelectedProtocol(param0: javax.net.ssl.SSLSocket): string;
					public trustManager(param0: javax.net.ssl.SSLSocketFactory): javax.net.ssl.X509TrustManager;
					public matchesSocketFactory(param0: javax.net.ssl.SSLSocketFactory): boolean;
				}
				export module ConscryptSocketAdapter {
					export class Companion extends java.lang.Object {
						public static class: java.lang.Class<okhttp3.internal.platform.android.ConscryptSocketAdapter.Companion>;
						public getFactory(): okhttp3.internal.platform.android.DeferredSocketAdapter.Factory;
					}
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module platform {
			export module android {
				export class DeferredSocketAdapter extends java.lang.Object implements okhttp3.internal.platform.android.SocketAdapter {
					public static class: java.lang.Class<okhttp3.internal.platform.android.DeferredSocketAdapter>;
					public isSupported(): boolean;
					public matchesSocket(param0: javax.net.ssl.SSLSocket): boolean;
					public configureTlsExtensions(param0: javax.net.ssl.SSLSocket, param1: string, param2: java.util.List<any>): void;
					public getSelectedProtocol(param0: javax.net.ssl.SSLSocket): string;
					public constructor(param0: okhttp3.internal.platform.android.DeferredSocketAdapter.Factory);
					public trustManager(param0: javax.net.ssl.SSLSocketFactory): javax.net.ssl.X509TrustManager;
					public matchesSocketFactory(param0: javax.net.ssl.SSLSocketFactory): boolean;
				}
				export module DeferredSocketAdapter {
					export class Factory extends java.lang.Object {
						public static class: java.lang.Class<okhttp3.internal.platform.android.DeferredSocketAdapter.Factory>;
						/**
						 * Constructs a new instance of the okhttp3.internal.platform.android.DeferredSocketAdapter$Factory interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							matchesSocket(param0: javax.net.ssl.SSLSocket): boolean;
							create(param0: javax.net.ssl.SSLSocket): okhttp3.internal.platform.android.SocketAdapter;
						});
						public constructor();
						public matchesSocket(param0: javax.net.ssl.SSLSocket): boolean;
						public create(param0: javax.net.ssl.SSLSocket): okhttp3.internal.platform.android.SocketAdapter;
					}
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module platform {
			export module android {
				export class SocketAdapter extends java.lang.Object {
					public static class: java.lang.Class<okhttp3.internal.platform.android.SocketAdapter>;
					/**
					 * Constructs a new instance of the okhttp3.internal.platform.android.SocketAdapter interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						isSupported(): boolean;
						trustManager(param0: javax.net.ssl.SSLSocketFactory): javax.net.ssl.X509TrustManager;
						matchesSocket(param0: javax.net.ssl.SSLSocket): boolean;
						matchesSocketFactory(param0: javax.net.ssl.SSLSocketFactory): boolean;
						configureTlsExtensions(param0: javax.net.ssl.SSLSocket, param1: string, param2: java.util.List<any>): void;
						getSelectedProtocol(param0: javax.net.ssl.SSLSocket): string;
					});
					public constructor();
					public isSupported(): boolean;
					public matchesSocket(param0: javax.net.ssl.SSLSocket): boolean;
					public configureTlsExtensions(param0: javax.net.ssl.SSLSocket, param1: string, param2: java.util.List<any>): void;
					public getSelectedProtocol(param0: javax.net.ssl.SSLSocket): string;
					public trustManager(param0: javax.net.ssl.SSLSocketFactory): javax.net.ssl.X509TrustManager;
					public matchesSocketFactory(param0: javax.net.ssl.SSLSocketFactory): boolean;
				}
				export module SocketAdapter {
					export class DefaultImpls extends java.lang.Object {
						public static class: java.lang.Class<okhttp3.internal.platform.android.SocketAdapter.DefaultImpls>;
						public static trustManager(param0: okhttp3.internal.platform.android.SocketAdapter, param1: javax.net.ssl.SSLSocketFactory): javax.net.ssl.X509TrustManager;
						public static matchesSocketFactory(param0: okhttp3.internal.platform.android.SocketAdapter, param1: javax.net.ssl.SSLSocketFactory): boolean;
					}
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module platform {
			export module android {
				export class StandardAndroidSocketAdapter extends okhttp3.internal.platform.android.AndroidSocketAdapter {
					public static class: java.lang.Class<okhttp3.internal.platform.android.StandardAndroidSocketAdapter>;
					public isSupported(): boolean;
					public constructor(param0: java.lang.Class<any>, param1: java.lang.Class<any>, param2: java.lang.Class<any>);
					public matchesSocket(param0: javax.net.ssl.SSLSocket): boolean;
					public constructor(param0: java.lang.Class<any>);
					public configureTlsExtensions(param0: javax.net.ssl.SSLSocket, param1: string, param2: java.util.List<any>): void;
					public getSelectedProtocol(param0: javax.net.ssl.SSLSocket): string;
					public matchesSocketFactory(param0: javax.net.ssl.SSLSocketFactory): boolean;
					public trustManager(param0: javax.net.ssl.SSLSocketFactory): javax.net.ssl.X509TrustManager;
				}
				export module StandardAndroidSocketAdapter {
					export class Companion extends java.lang.Object {
						public static class: java.lang.Class<okhttp3.internal.platform.android.StandardAndroidSocketAdapter.Companion>;
						public buildIfSupported(param0: string): okhttp3.internal.platform.android.SocketAdapter;
					}
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module proxy {
			export class NullProxySelector extends java.net.ProxySelector {
				public static class: java.lang.Class<okhttp3.internal.proxy.NullProxySelector>;
				public static INSTANCE: okhttp3.internal.proxy.NullProxySelector;
				public select(param0: java.net.URI): java.util.List<java.net.Proxy>;
				public connectFailed(param0: java.net.URI, param1: java.net.SocketAddress, param2: java.io.IOException): void;
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module publicsuffix {
			export class PublicSuffixDatabase extends java.lang.Object {
				public static class: java.lang.Class<okhttp3.internal.publicsuffix.PublicSuffixDatabase>;
				public static PUBLIC_SUFFIX_RESOURCE: string;
				public getEffectiveTldPlusOne(param0: string): string;
				public setListBytes(param0: androidNative.Array<number>, param1: androidNative.Array<number>): void;
				public constructor();
			}
			export module PublicSuffixDatabase {
				export class Companion extends java.lang.Object {
					public static class: java.lang.Class<okhttp3.internal.publicsuffix.PublicSuffixDatabase.Companion>;
					public get(): okhttp3.internal.publicsuffix.PublicSuffixDatabase;
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module tls {
			export class BasicCertificateChainCleaner extends okhttp3.internal.tls.CertificateChainCleaner {
				public static class: java.lang.Class<okhttp3.internal.tls.BasicCertificateChainCleaner>;
				public hashCode(): number;
				public equals(param0: any): boolean;
				public constructor(param0: okhttp3.internal.tls.TrustRootIndex);
				public constructor();
				public clean(param0: java.util.List<any>, param1: string): java.util.List<java.security.cert.Certificate>;
			}
			export module BasicCertificateChainCleaner {
				export class Companion extends java.lang.Object {
					public static class: java.lang.Class<okhttp3.internal.tls.BasicCertificateChainCleaner.Companion>;
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module tls {
			export class BasicTrustRootIndex extends java.lang.Object implements okhttp3.internal.tls.TrustRootIndex {
				public static class: java.lang.Class<okhttp3.internal.tls.BasicTrustRootIndex>;
				public hashCode(): number;
				public equals(param0: any): boolean;
				public findByIssuerAndSignature(param0: java.security.cert.X509Certificate): java.security.cert.X509Certificate;
				public constructor(param0: androidNative.Array<java.security.cert.X509Certificate>);
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module tls {
			export abstract class CertificateChainCleaner extends java.lang.Object {
				public static class: java.lang.Class<okhttp3.internal.tls.CertificateChainCleaner>;
				public constructor();
				public clean(param0: java.util.List<any>, param1: string): java.util.List<java.security.cert.Certificate>;
			}
			export module CertificateChainCleaner {
				export class Companion extends java.lang.Object {
					public static class: java.lang.Class<okhttp3.internal.tls.CertificateChainCleaner.Companion>;
					public get(param0: androidNative.Array<java.security.cert.X509Certificate>): okhttp3.internal.tls.CertificateChainCleaner;
					public get(param0: javax.net.ssl.X509TrustManager): okhttp3.internal.tls.CertificateChainCleaner;
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module tls {
			export class OkHostnameVerifier extends java.lang.Object implements javax.net.ssl.HostnameVerifier {
				public static class: java.lang.Class<okhttp3.internal.tls.OkHostnameVerifier>;
				public static INSTANCE: okhttp3.internal.tls.OkHostnameVerifier;
				public verify(param0: string, param1: javax.net.ssl.SSLSession): boolean;
				public allSubjectAltNames(param0: java.security.cert.X509Certificate): java.util.List<string>;
				public verify(param0: string, param1: java.security.cert.X509Certificate): boolean;
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module tls {
			export class TrustRootIndex extends java.lang.Object {
				public static class: java.lang.Class<okhttp3.internal.tls.TrustRootIndex>;
				/**
				 * Constructs a new instance of the okhttp3.internal.tls.TrustRootIndex interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
				 */
				public constructor(implementation: {
					findByIssuerAndSignature(param0: java.security.cert.X509Certificate): java.security.cert.X509Certificate;
				});
				public constructor();
				public findByIssuerAndSignature(param0: java.security.cert.X509Certificate): java.security.cert.X509Certificate;
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module ws {
			export class MessageDeflater extends java.lang.Object implements java.io.Closeable {
				public static class: java.lang.Class<okhttp3.internal.ws.MessageDeflater>;
				public close(): void;
				public deflate(param0: okio.Buffer): void;
				public constructor(param0: boolean);
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module ws {
			export class MessageInflater extends java.lang.Object implements java.io.Closeable {
				public static class: java.lang.Class<okhttp3.internal.ws.MessageInflater>;
				public close(): void;
				public constructor(param0: boolean);
				public inflate(param0: okio.Buffer): void;
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module ws {
			export class RealWebSocket extends java.lang.Object implements okhttp3.WebSocket, okhttp3.internal.ws.WebSocketReader.FrameCallback {
				public static class: java.lang.Class<okhttp3.internal.ws.RealWebSocket>;
				public static DEFAULT_MINIMUM_DEFLATE_SIZE: number;
				public request(): okhttp3.Request;
				public send(param0: string): boolean;
				public onReadPong(param0: okio.ByteString): void;
				public onReadPing(param0: okio.ByteString): void;
				public pong(param0: okio.ByteString): boolean;
				public constructor(param0: okhttp3.internal.concurrent.TaskRunner, param1: okhttp3.Request, param2: okhttp3.WebSocketListener, param3: java.util.Random, param4: number, param5: okhttp3.internal.ws.WebSocketExtensions, param6: number);
				public loopReader(): void;
				public receivedPongCount(): number;
				public send(param0: okio.ByteString): boolean;
				public onReadMessage(param0: okio.ByteString): void;
				public failWebSocket(param0: java.lang.Exception, param1: okhttp3.Response): void;
				public checkUpgradeSuccess$okhttp(param0: okhttp3.Response, param1: okhttp3.internal.connection.Exchange): void;
				public close(param0: number, param1: string, param2: number): boolean;
				public awaitTermination(param0: number, param1: java.util.concurrent.TimeUnit): void;
				public cancel(): void;
				public onReadClose(param0: number, param1: string): void;
				public processNextFrame(): boolean;
				public onReadMessage(param0: string): void;
				public receivedPingCount(): number;
				public writeOneFrame$okhttp(): boolean;
				public initReaderAndWriter(param0: string, param1: okhttp3.internal.ws.RealWebSocket.Streams): void;
				public queueSize(): number;
				public close(param0: number, param1: string): boolean;
				public tearDown(): void;
				public writePingFrame$okhttp(): void;
				public getListener$okhttp(): okhttp3.WebSocketListener;
				public sentPingCount(): number;
				public connect(param0: okhttp3.OkHttpClient): void;
			}
			export module RealWebSocket {
				export class Close extends java.lang.Object {
					public static class: java.lang.Class<okhttp3.internal.ws.RealWebSocket.Close>;
					public getCancelAfterCloseMillis(): number;
					public getReason(): okio.ByteString;
					public constructor(param0: number, param1: okio.ByteString, param2: number);
					public getCode(): number;
				}
				export class Companion extends java.lang.Object {
					public static class: java.lang.Class<okhttp3.internal.ws.RealWebSocket.Companion>;
				}
				export class Message extends java.lang.Object {
					public static class: java.lang.Class<okhttp3.internal.ws.RealWebSocket.Message>;
					public getData(): okio.ByteString;
					public constructor(param0: number, param1: okio.ByteString);
					public getFormatOpcode(): number;
				}
				export abstract class Streams extends java.lang.Object implements java.io.Closeable {
					public static class: java.lang.Class<okhttp3.internal.ws.RealWebSocket.Streams>;
					public getSink(): okio.BufferedSink;
					public constructor(param0: boolean, param1: okio.BufferedSource, param2: okio.BufferedSink);
					public getClient(): boolean;
					public close(): void;
					public getSource(): okio.BufferedSource;
				}
				export class WriterTask extends okhttp3.internal.concurrent.Task {
					public static class: java.lang.Class<okhttp3.internal.ws.RealWebSocket.WriterTask>;
					public runOnce(): number;
					public constructor(param0: string, param1: boolean);
					public constructor(param0: okhttp3.internal.ws.RealWebSocket);
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module ws {
			export class WebSocketExtensions extends java.lang.Object {
				public static class: java.lang.Class<okhttp3.internal.ws.WebSocketExtensions>;
				public perMessageDeflate: boolean;
				public clientMaxWindowBits: java.lang.Integer;
				public clientNoContextTakeover: boolean;
				public serverMaxWindowBits: java.lang.Integer;
				public serverNoContextTakeover: boolean;
				public unknownValues: boolean;
				public constructor(param0: boolean, param1: java.lang.Integer, param2: boolean, param3: java.lang.Integer, param4: boolean, param5: boolean);
				public noContextTakeover(param0: boolean): boolean;
				public component1(): boolean;
				public component5(): boolean;
				public toString(): string;
				public component3(): boolean;
				public constructor();
				public copy(param0: boolean, param1: java.lang.Integer, param2: boolean, param3: java.lang.Integer, param4: boolean, param5: boolean): okhttp3.internal.ws.WebSocketExtensions;
				public hashCode(): number;
				public equals(param0: any): boolean;
				public component6(): boolean;
				public component2(): java.lang.Integer;
				public component4(): java.lang.Integer;
			}
			export module WebSocketExtensions {
				export class Companion extends java.lang.Object {
					public static class: java.lang.Class<okhttp3.internal.ws.WebSocketExtensions.Companion>;
					public parse(param0: okhttp3.Headers): okhttp3.internal.ws.WebSocketExtensions;
				}
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module ws {
			export class WebSocketProtocol extends java.lang.Object {
				public static class: java.lang.Class<okhttp3.internal.ws.WebSocketProtocol>;
				public static INSTANCE: okhttp3.internal.ws.WebSocketProtocol;
				public static ACCEPT_MAGIC: string;
				public static B0_FLAG_FIN: number;
				public static B0_FLAG_RSV1: number;
				public static B0_FLAG_RSV2: number;
				public static B0_FLAG_RSV3: number;
				public static B0_MASK_OPCODE: number;
				public static OPCODE_FLAG_CONTROL: number;
				public static B1_FLAG_MASK: number;
				public static B1_MASK_LENGTH: number;
				public static OPCODE_CONTINUATION: number;
				public static OPCODE_TEXT: number;
				public static OPCODE_BINARY: number;
				public static OPCODE_CONTROL_CLOSE: number;
				public static OPCODE_CONTROL_PING: number;
				public static OPCODE_CONTROL_PONG: number;
				public static PAYLOAD_BYTE_MAX: number;
				public static CLOSE_MESSAGE_MAX: number;
				public static PAYLOAD_SHORT: number;
				public static PAYLOAD_SHORT_MAX: number;
				public static PAYLOAD_LONG: number;
				public static CLOSE_CLIENT_GOING_AWAY: number;
				public static CLOSE_NO_STATUS_CODE: number;
				public validateCloseCode(param0: number): void;
				public closeCodeExceptionMessage(param0: number): string;
				public acceptHeader(param0: string): string;
				public toggleMask(param0: okio.Buffer.UnsafeCursor, param1: androidNative.Array<number>): void;
			}
		}
	}
}

declare module okhttp3 {
	export module internal {
		export module ws {
			export class WebSocketReader extends java.lang.Object implements java.io.Closeable {
				public static class: java.lang.Class<okhttp3.internal.ws.WebSocketReader>;
				public processNextFrame(): void;
				public close(): void;
				public getSource(): okio.BufferedSource;
				public constructor(param0: boolean, param1: okio.BufferedSource, param2: okhttp3.internal.ws.WebSocketReader.FrameCallback, param3: boolean, param4: boolean);
			}
			export module WebSocketReader {
				export class FrameCallback extends java.lang.Object {
					public static class: java.lang.Class<okhttp3.internal.ws.WebSocketReader.FrameCallback>;
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

declare module okhttp3 {
	export module internal {
		export module ws {
			export class WebSocketWriter extends java.lang.Object implements java.io.Closeable {
				public static class: java.lang.Class<okhttp3.internal.ws.WebSocketWriter>;
				public constructor(param0: boolean, param1: okio.BufferedSink, param2: java.util.Random, param3: boolean, param4: boolean, param5: number);
				public close(): void;
				public writePing(param0: okio.ByteString): void;
				public writeClose(param0: number, param1: okio.ByteString): void;
				public getRandom(): java.util.Random;
				public getSink(): okio.BufferedSink;
				public writePong(param0: okio.ByteString): void;
				public writeMessageFrame(param0: number, param1: okio.ByteString): void;
			}
		}
	}
}

//Generics information:

