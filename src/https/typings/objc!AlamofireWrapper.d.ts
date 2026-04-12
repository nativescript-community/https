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
    
    // New clean API methods - updated to use NSURLSessionTask for flexibility
    request(
        method: string,
        urlString: string,
        parameters: NSDictionary<string, any>,
        headers: NSDictionary<string, any>,
        uploadProgress: (progress: NSProgress) => void,
        downloadProgress: (progress: NSProgress) => void,
        success: (task: NSURLSessionTask, data: any) => void,
        failure: (task: NSURLSessionTask, error: NSError) => void
    ): NSURLSessionTask;
    
    // Extended API with threading options
    requestWithThreading(
        method: string,
        urlString: string,
        parameters: NSDictionary<string, any>,
        headers: NSDictionary<string, any>,
        responseOnMainThread: NSNumber,  // optional boolean
        progressOnMainThread: NSNumber,  // optional boolean  
        uploadProgress: (progress: NSProgress) => void,
        downloadProgress: (progress: NSProgress) => void,
        success: (task: NSURLSessionTask, data: any) => void,
        failure: (task: NSURLSessionTask, error: NSError) => void
    ): NSURLSessionTask;
    
    uploadMultipart(
        urlString: string,
        headers: NSDictionary<string, any>,
        constructingBodyWithBlock: (formData: MultipartFormDataWrapper) => void,
        progress: (progress: NSProgress) => void,
        success: (task: NSURLSessionTask, data: any) => void,
        failure: (task: NSURLSessionTask, error: NSError) => void
    ): NSURLSessionTask;
    
    // Extended API with threading options
    uploadMultipartWithThreading(
        urlString: string,
        headers: NSDictionary<string, any>,
        responseOnMainThread: NSNumber,  // optional boolean
        progressOnMainThread: NSNumber,  // optional boolean
        constructingBodyWithBlock: (formData: MultipartFormDataWrapper) => void,
        progress: (progress: NSProgress) => void,
        success: (task: NSURLSessionTask, data: any) => void,
        failure: (task: NSURLSessionTask, error: NSError) => void
    ): NSURLSessionTask;
    
    uploadFile(
        request: NSMutableURLRequest,
        fileURL: NSURL,
        progress: (progress: NSProgress) => void,
        completionHandler: (response: NSURLResponse, responseObject: any, error: NSError) => void
    ): NSURLSessionTask;
    
    uploadData(
        request: NSMutableURLRequest,
        bodyData: NSData,
        progress: (progress: NSProgress) => void,
        completionHandler: (response: NSURLResponse, responseObject: any, error: NSError) => void
    ): NSURLSessionTask;
    
    downloadToTemp(
        method: string,
        urlString: string,
        parameters: NSDictionary<string, any>,
        headers: NSDictionary<string, any>,
        progress: (progress: NSProgress) => void,
        completionHandler: (response: NSURLResponse, tempFilePath: string, error: NSError) => void
    ): NSURLSessionDownloadTask;
    
    downloadToFile(
        urlString: string,
        destinationPath: string,
        headers: NSDictionary<string, any>,
        progress: (progress: NSProgress) => void,
        completionHandler: (response: NSURLResponse, filePath: string, error: NSError) => void
    ): NSURLSessionDownloadTask;
    
    downloadToTempWithEarlyHeaders(
        method: string,
        urlString: string,
        parameters: NSDictionary<string, any>,
        headers: NSDictionary<string, any>,
        sizeThreshold: number,
        progress: (progress: NSProgress) => void,
        headersCallback: (response: NSURLResponse, contentLength: number) => void,
        completionHandler: (response: NSURLResponse, tempFilePath: string, error: NSError) => void
    ): NSURLSessionDownloadTask;
    
    requestWithConditionalDownload(
        method: string,
        urlString: string,
        parameters: NSDictionary<string, any>,
        headers: NSDictionary<string, any>,
        sizeThreshold: number,
        progress: (progress: NSProgress) => void,
        success: (task: NSURLSessionTask, data: any, tempFilePath: string) => void,
        failure: (task: NSURLSessionTask, error: NSError) => void
    ): NSURLSessionTask;
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
