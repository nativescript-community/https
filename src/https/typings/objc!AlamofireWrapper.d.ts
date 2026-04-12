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
    
    // Request management
    cancelRequest(id: string): void;
    addInterceptor(interceptor: RequestInterceptorWrapper): void;
    addEventMonitor(monitor: EventMonitorWrapper): void;
    
    // New clean API methods - using request IDs and NSHTTPURLResponse callbacks
    request(
        method: string,
        urlString: string,
        parameters: NSDictionary<string, any>,
        headers: NSDictionary<string, any>,
        requestId: string,
        responseOnMainThread: NSNumber,  // optional boolean
        progressOnMainThread: NSNumber,  // optional boolean  
        uploadProgress: (progress: NSProgress) => void,
        downloadProgress: (progress: NSProgress) => void,
        success: (response: NSHTTPURLResponse, data: any) => void,
        failure: (response: NSHTTPURLResponse, error: NSError) => void
    ): void;
    
    // Extended API with threading options
    requestWithThreading(
        method: string,
        urlString: string,
        parameters: NSDictionary<string, any>,
        headers: NSDictionary<string, any>,
        requestId: string,
        responseOnMainThread: NSNumber,  // optional boolean
        progressOnMainThread: NSNumber,  // optional boolean  
        uploadProgress: (progress: NSProgress) => void,
        downloadProgress: (progress: NSProgress) => void,
        success: (response: NSHTTPURLResponse, data: any) => void,
        failure: (response: NSHTTPURLResponse, error: NSError) => void
    ): void;
    
    uploadMultipart(
        urlString: string,
        headers: NSDictionary<string, any>,
        requestId: string,
        responseOnMainThread: NSNumber,  // optional boolean
        progressOnMainThread: NSNumber,  // optional boolean  
        constructingBodyWithBlock: (formData: MultipartFormDataWrapper) => void,
        progress: (progress: NSProgress) => void,
        success: (response: NSHTTPURLResponse, data: any) => void,
        failure: (response: NSHTTPURLResponse, error: NSError) => void
    ): void;
    
    // Extended API with threading options
    uploadMultipartWithThreading(
        urlString: string,
        headers: NSDictionary<string, any>,
        requestId: string,
        responseOnMainThread: NSNumber,  // optional boolean
        progressOnMainThread: NSNumber,  // optional boolean
        constructingBodyWithBlock: (formData: MultipartFormDataWrapper) => void,
        progress: (progress: NSProgress) => void,
        success: (response: NSHTTPURLResponse, data: any) => void,
        failure: (response: NSHTTPURLResponse, error: NSError) => void
    ): void;
    
    uploadFile(
        request: NSMutableURLRequest,
        fileURL: NSURL,
        requestId: string,
        responseOnMainThread: NSNumber,  // optional boolean
        progressOnMainThread: NSNumber,  // optional boolean  
        progress: (progress: NSProgress) => void,
        success: (response: NSHTTPURLResponse, data: any) => void,
        failure: (response: NSHTTPURLResponse, error: NSError) => void
    ): void;
    
    uploadData(
        request: NSMutableURLRequest,
        bodyData: NSData,
        requestId: string,
        responseOnMainThread: NSNumber,  // optional boolean
        progressOnMainThread: NSNumber,  // optional boolean  
        progress: (progress: NSProgress) => void,
        success: (response: NSHTTPURLResponse, data: any) => void,
        failure: (response: NSHTTPURLResponse, error: NSError) => void
    ): void;
    
    downloadToTemp(
        method: string,
        urlString: string,
        parameters: NSDictionary<string, any>,
        headers: NSDictionary<string, any>,
        requestId: string,
        responseOnMainThread: NSNumber,  // optional boolean
        progressOnMainThread: NSNumber,  // optional boolean  
        progress: (progress: NSProgress) => void,
        success: (response: NSHTTPURLResponse, tempFilePath: string) => void,
        failure: (response: NSHTTPURLResponse, error: NSError) => void
    ): void;
    
    downloadToFile(
        urlString: string,
        destinationPath: string,
        headers: NSDictionary<string, any>,
        requestId: string,
        responseOnMainThread: NSNumber,  // optional boolean
        progressOnMainThread: NSNumber,  // optional boolean  
        progress: (progress: NSProgress) => void,
        success: (response: NSHTTPURLResponse, filePath: string) => void,
        failure: (response: NSHTTPURLResponse, error: NSError) => void
    ): void;
    
    downloadToTempWithEarlyHeaders(
        method: string,
        urlString: string,
        parameters: NSDictionary<string, any>,
        headers: NSDictionary<string, any>,
        requestId: string,
        responseOnMainThread: NSNumber,  // optional boolean
        progressOnMainThread: NSNumber,  // optional boolean  
        sizeThreshold: number,
        progress: (progress: NSProgress) => void,
        headersCallback: (response: NSHTTPURLResponse, contentLength: number) => void,
        success: (response: NSHTTPURLResponse, tempFilePath: string) => void,
        failure: (response: NSHTTPURLResponse, error: NSError) => void
    ): void;
    
    requestWithConditionalDownload(
        method: string,
        urlString: string,
        parameters: NSDictionary<string, any>,
        headers: NSDictionary<string, any>,
        requestId: string,
        responseOnMainThread: NSNumber,  // optional boolean
        progressOnMainThread: NSNumber,  // optional boolean  
        sizeThreshold: number,
        progress: (progress: NSProgress) => void,
        success: (response: NSHTTPURLResponse, data: any, tempFilePath: string) => void,
        failure: (response: NSHTTPURLResponse, error: NSError) => void
    ): void;
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

declare class EventMonitorWrapper extends NSObject {
    static alloc(): EventMonitorWrapper;
    init(): EventMonitorWrapper;
    
    // Callback setters
    setRequestDidResume(callback: (request: NSURLRequest) => void): void;
    setRequestDidSuspend(callback: (request: NSURLRequest) => void): void;
    setRequestDidCancel(callback: (request: NSURLRequest) => void): void;
    setRequestDidFinish(callback: (request: NSURLRequest) => void): void;
    setRequestDidComplete(callback: (request: NSURLRequest, response: NSHTTPURLResponse, error: NSError) => void): void;
    setDataTaskDidReceiveData(callback: (request: NSURLRequest, data: NSData) => void): void;
}

declare class RequestInterceptorWrapper extends NSObject {
    static alloc(): RequestInterceptorWrapper;
    init(): RequestInterceptorWrapper;
    
    // Callback setters
    setAdapt(callback: (request: NSURLRequest) => NSURLRequest): void;
    setRetry(callback: (request: NSURLRequest, error: NSError, retryCount: number) => boolean): void;
}
