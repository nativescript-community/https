declare class AlamofireWrapper extends NSObject {
    static shared: AlamofireWrapper;
    
    requestSerializerWrapper: RequestSerializer;
    responseSerializerWrapper: ResponseSerializer;
    securityPolicyWrapper: SecurityPolicyWrapper;
    
    static alloc(): AlamofireWrapper;
    init(): AlamofireWrapper;
    initWithConfiguration(configuration: NSURLSessionConfiguration): AlamofireWrapper;
    initWithConfigurationBaseURL(configuration: NSURLSessionConfiguration, baseURL: NSURL): AlamofireWrapper;
    
    setDataTaskWillCacheResponseBlock(block: (session: NSURLSession, task: NSURLSessionDataTask, cacheResponse: NSCachedURLResponse) => NSCachedURLResponse): void;
    
    dataTaskWithHTTPMethodURLStringParametersHeadersUploadProgressDownloadProgressSuccessFailure(
        method: string,
        urlString: string,
        parameters: NSDictionary<string, any>,
        headers: NSDictionary<string, any>,
        uploadProgress: (progress: NSProgress) => void,
        downloadProgress: (progress: NSProgress) => void,
        success: (task: NSURLSessionDataTask, data: any) => void,
        failure: (task: NSURLSessionDataTask, error: NSError) => void
    ): NSURLSessionDataTask;
    
    POSTParametersHeadersConstructingBodyWithBlockProgressSuccessFailure(
        urlString: string,
        parameters: NSDictionary<string, any>,
        headers: NSDictionary<string, any>,
        constructingBodyWithBlock: (formData: MultipartFormDataWrapper) => void,
        progress: (progress: NSProgress) => void,
        success: (task: NSURLSessionDataTask, data: any) => void,
        failure: (task: NSURLSessionDataTask, error: NSError) => void
    ): NSURLSessionDataTask;
    
    uploadTaskWithRequestFromFileProgressCompletionHandler(
        request: NSMutableURLRequest,
        fileURL: NSURL,
        progress: (progress: NSProgress) => void,
        completionHandler: (response: NSURLResponse, responseObject: any, error: NSError) => void
    ): NSURLSessionDataTask;
    
    uploadTaskWithRequestFromDataProgressCompletionHandler(
        request: NSMutableURLRequest,
        bodyData: NSData,
        progress: (progress: NSProgress) => void,
        completionHandler: (response: NSURLResponse, responseObject: any, error: NSError) => void
    ): NSURLSessionDataTask;
}

declare class RequestSerializer extends NSObject {
    static alloc(): RequestSerializer;
    init(): RequestSerializer;
    
    timeoutInterval: number;
    allowsCellularAccess: boolean;
    httpShouldHandleCookies: boolean;
    cachePolicy: NSURLRequestCachePolicy;
}

declare class ResponseSerializer extends NSObject {
    static alloc(): ResponseSerializer;
    init(): ResponseSerializer;
    
    acceptsJSON: boolean;
    readingOptions: NSJSONReadingOptions;
}

declare class SecurityPolicyWrapper extends NSObject {
    static alloc(): SecurityPolicyWrapper;
    init(): SecurityPolicyWrapper;
    
    static defaultPolicy(): SecurityPolicyWrapper;
    static policyWithPinningMode(mode: number): SecurityPolicyWrapper;
    
    allowInvalidCertificates: boolean;
    validatesDomainName: boolean;
    pinningMode: number;
    pinnedCertificates: NSSet<any>;
}

declare class MultipartFormDataWrapper extends NSObject {
    static alloc(): MultipartFormDataWrapper;
    init(): MultipartFormDataWrapper;
    
    appendPartWithFileURLNameFileNameMimeTypeError(
        fileURL: NSURL,
        name: string,
        fileName: string,
        mimeType: string
    ): void;
    
    appendPartWithFileDataNameFileNameMimeType(
        data: NSData,
        name: string,
        fileName: string,
        mimeType: string
    ): void;
    
    appendPartWithFormDataName(
        data: NSData,
        name: string
    ): void;
}

declare const enum AFSSLPinningMode {
    None = 0,
    PublicKey = 1,
    Certificate = 2
}
