import Foundation
import Alamofire

@objc(AlamofireWrapper)
@objcMembers
public class AlamofireWrapper: NSObject {
    
    private var session: Session
    private var requestSerializer: RequestSerializer
    private var responseSerializer: ResponseSerializer
    private var securityPolicy: SecurityPolicyWrapper?
    private var cacheResponseHandler: ((URLSession, URLSessionDataTask, CachedURLResponse) -> CachedURLResponse?)?
    
    @objc public static let shared = AlamofireWrapper()
    
    @objc public override init() {
        let configuration = URLSessionConfiguration.default
        self.session = Session(configuration: configuration)
        self.requestSerializer = RequestSerializer()
        self.responseSerializer = ResponseSerializer()
        super.init()
    }
    
    @objc public init(configuration: URLSessionConfiguration) {
        self.session = Session(configuration: configuration)
        self.requestSerializer = RequestSerializer()
        self.responseSerializer = ResponseSerializer()
        super.init()
    }
    
    @objc public init(configuration: URLSessionConfiguration, baseURL: URL?) {
        self.session = Session(configuration: configuration)
        self.requestSerializer = RequestSerializer()
        self.responseSerializer = ResponseSerializer()
        super.init()
    }
    
    // MARK: - Serializer Properties
    
    @objc public var requestSerializerWrapper: RequestSerializer {
        get { return requestSerializer }
        set { requestSerializer = newValue }
    }
    
    @objc public var responseSerializerWrapper: ResponseSerializer {
        get { return responseSerializer }
        set { responseSerializer = newValue }
    }
    
    @objc public var securityPolicyWrapper: SecurityPolicyWrapper? {
        get { return securityPolicy }
        set { securityPolicy = newValue }
    }
    
    // MARK: - Cache Policy
    
    @objc public func setDataTaskWillCacheResponseBlock(_ block: ((URLSession, URLSessionDataTask, CachedURLResponse) -> CachedURLResponse?)?) {
        self.cacheResponseHandler = block
    }
    
    // MARK: - Helper Methods
    
    /// Apply server trust validation to a request
    private func applyServerTrustValidation<T: Request>(_ request: T, host: String) -> T {
        guard let secPolicy = securityPolicy else { return request }
        
        return request.validate { request, response, data in
            // In Alamofire 5.11+, we need to get serverTrust from URLSession delegate
            // The validation closure now receives the request instead of just the response
            guard let serverTrust = request.serverTrust else {
                return .failure(AFError.serverTrustEvaluationFailed(reason: .noServerTrust))
            }
            do {
                try secPolicy.evaluate(serverTrust, forHost: host)
                return .success(Void())
            } catch {
                return .failure(error)
            }
        }
    }
    
    /// Get dispatch queue for responses
    private func responseQueue(mainThread: Bool?) -> DispatchQueue {
        // Default to main thread if not specified (matches Android behavior)
        return (mainThread ?? true) ? .main : .global(qos: .userInitiated)
    }
    
    /// Get dispatch queue for progress callbacks
    private func progressQueue(progressMainThread: Bool?, responseMainThread: Bool?) -> DispatchQueue {
        // If progressMainThread is specified, use it
        // Otherwise, inherit from responseMainThread setting
        let useMain = progressMainThread ?? responseMainThread ?? true
        return useMain ? .main : .global(qos: .userInitiated)
    }
    
    // MARK: - Request Methods
    
    // Clean API: New shorter method name
    @objc public func request(
        _ method: String,
        _ urlString: String,
        _ parameters: NSDictionary?,
        _ headers: NSDictionary?,
        _ uploadProgress: ((Progress) -> Void)?,
        _ downloadProgress: ((Progress) -> Void)?,
        _ success: @escaping (URLSessionTask, Any?) -> Void,
        _ failure: @escaping (URLSessionTask?, Error) -> Void
    ) -> URLSessionTask? {
        return requestWithThreading(
            method,
            urlString,
            parameters,
            headers,
            nil, // responseOnMainThread - defaults to true
            nil, // progressOnMainThread - defaults to responseOnMainThread
            uploadProgress,
            downloadProgress,
            success,
            failure
        )
    }
    
    // Extended API with threading options
    @objc public func requestWithThreading(
        _ method: String,
        _ urlString: String,
        _ parameters: NSDictionary?,
        _ headers: NSDictionary?,
        _ responseOnMainThread: NSNumber?, // NSNumber wrapper for optional Bool
        _ progressOnMainThread: NSNumber?, // NSNumber wrapper for optional Bool
        _ uploadProgress: ((Progress) -> Void)?,
        _ downloadProgress: ((Progress) -> Void)?,
        _ success: @escaping (URLSessionTask, Any?) -> Void,
        _ failure: @escaping (URLSessionTask?, Error) -> Void
    ) -> URLSessionTask? {
        
        guard let url = URL(string: urlString) else {
            let error = NSError(domain: "AlamofireWrapper", code: -1, userInfo: [NSLocalizedDescriptionKey: "Invalid URL"])
            failure(nil, error)
            return nil
        }
        
        var request: URLRequest
        do {
            request = try requestSerializer.createRequest(
                url: url,
                method: HTTPMethod(rawValue: method.uppercased()),
                parameters: nil,
                headers: headers
            )
            // Encode parameters into the request
            try requestSerializer.encodeParameters(parameters, into: &request, method: HTTPMethod(rawValue: method.uppercased()))
        } catch {
            failure(nil, error)
            return nil
        }
        
        var afRequest: DataRequest = session.request(request)
        
        // Apply server trust evaluation if security policy is set
        if let host = url.host {
            afRequest = applyServerTrustValidation(afRequest, host: host)
        }
        
        // Determine queue settings
        let respMainThread = responseOnMainThread?.boolValue
        let progMainThread = progressOnMainThread?.boolValue
        let progQueue = progressQueue(progressMainThread: progMainThread, responseMainThread: respMainThread)
        
        // Upload progress
        if let uploadProgress = uploadProgress {
            afRequest = afRequest.uploadProgress(queue: progQueue) { progress in
                uploadProgress(progress)
            }
        }
        
        // Download progress
        if let downloadProgress = downloadProgress {
            afRequest = afRequest.downloadProgress(queue: progQueue) { progress in
                downloadProgress(progress)
            }
        }
        
        // Store reference to task before async callback
        let task = afRequest.task
        
        // Response handling
        let respQueue = responseQueue(mainThread: respMainThread)
        afRequest.response(queue: respQueue) { response in
            if let error = response.error {
                let nsError = self.createNSError(from: error, response: response.response, data: response.data)
                failure(task, nsError)
                return
            }
            
            // Deserialize response based on responseSerializer
            if let data = response.data {
                let result = self.responseSerializer.deserialize(data: data, response: response.response)
                success(task, result)
            } else {
                success(task, nil)
            }
        }
        
        return task
    }
    
    // MARK: - Multipart Form Data
    
    // Clean API: New shorter method name for multipart upload
    @objc public func uploadMultipart(
        _ urlString: String,
        _ headers: NSDictionary?,
        _ constructingBodyWithBlock: @escaping (MultipartFormDataWrapper) -> Void,
        _ progress: ((Progress) -> Void)?,
        _ success: @escaping (URLSessionTask, Any?) -> Void,
        _ failure: @escaping (URLSessionTask?, Error) -> Void
    ) -> URLSessionTask? {
        return uploadMultipartWithThreading(
            urlString,
            headers,
            nil, // responseOnMainThread
            nil, // progressOnMainThread
            constructingBodyWithBlock,
            progress,
            success,
            failure
        )
    }
    
    // Extended API with threading options
    @objc public func uploadMultipartWithThreading(
        _ urlString: String,
        _ headers: NSDictionary?,
        _ responseOnMainThread: NSNumber?,
        _ progressOnMainThread: NSNumber?,
        _ constructingBodyWithBlock: @escaping (MultipartFormDataWrapper) -> Void,
        _ progress: ((Progress) -> Void)?,
        _ success: @escaping (URLSessionTask, Any?) -> Void,
        _ failure: @escaping (URLSessionTask?, Error) -> Void
    ) -> URLSessionTask? {
        
        guard let url = URL(string: urlString) else {
            let error = NSError(domain: "AlamofireWrapper", code: -1, userInfo: [NSLocalizedDescriptionKey: "Invalid URL"])
            failure(nil, error)
            return nil
        }
        
        let wrapper = MultipartFormDataWrapper()
        constructingBodyWithBlock(wrapper)
        
        var request: URLRequest
        do {
            request = try requestSerializer.createRequest(
                url: url,
                method: .post,
                parameters: nil,
                headers: headers
            )
        } catch {
            failure(nil, error)
            return nil
        }
        
        var afRequest = session.upload(multipartFormData: { multipartFormData in
            wrapper.apply(to: multipartFormData)
        }, with: request)
        
        // Apply server trust evaluation if security policy is set
        if let host = url.host {
            afRequest = applyServerTrustValidation(afRequest, host: host)
        }
        
        // Determine queue settings
        let respMainThread = responseOnMainThread?.boolValue
        let progMainThread = progressOnMainThread?.boolValue
        let progQueue = progressQueue(progressMainThread: progMainThread, responseMainThread: respMainThread)
        
        // Upload progress
        if let progress = progress {
            afRequest = afRequest.uploadProgress(queue: progQueue) { progressInfo in
                progress(progressInfo)
            }
        }
        
        // Store reference to task before async callback
        let task = afRequest.task
        
        // Response handling
        let respQueue = responseQueue(mainThread: respMainThread)
        afRequest.response(queue: respQueue) { response in
            if let error = response.error {
                let nsError = self.createNSError(from: error, response: response.response, data: response.data)
                failure(task, nsError)
                return
            }
            
            // Deserialize response based on responseSerializer
            if let data = response.data {
                let result = self.responseSerializer.deserialize(data: data, response: response.response)
                success(task, result)
            } else {
                success(task, nil)
            }
        }
        
        return task
    }
    
    // MARK: - Upload Tasks
    
    // Clean API: Upload file
    @objc public func uploadFile(
        _ request: URLRequest,
        _ fileURL: URL,
        _ progress: ((Progress) -> Void)?,
        _ completionHandler: @escaping (URLResponse?, Any?, Error?) -> Void
    ) -> URLSessionTask? {
        
        var afRequest = session.upload(fileURL, with: request)
        
        // Apply server trust evaluation if security policy is set
        if let host = request.url?.host {
            afRequest = applyServerTrustValidation(afRequest, host: host)
        }
        
        // Upload progress (default to main thread)
        if let progress = progress {
            afRequest = afRequest.uploadProgress(queue: .main) { progressInfo in
                progress(progressInfo)
            }
        }
        
        // Response handling
        afRequest.response(queue: .main) { response in
            if let error = response.error {
                completionHandler(response.response, nil, error)
                return
            }
            
            // Deserialize response based on responseSerializer
            if let data = response.data {
                let result = self.responseSerializer.deserialize(data: data, response: response.response)
                completionHandler(response.response, result, nil)
            } else {
                completionHandler(response.response, nil, nil)
            }
        }
        
        return afRequest.task
    }
    
    // Clean API: Upload data
    @objc public func uploadData(
        _ request: URLRequest,
        _ bodyData: Data,
        _ progress: ((Progress) -> Void)?,
        _ completionHandler: @escaping (URLResponse?, Any?, Error?) -> Void
    ) -> URLSessionTask? {
        
        var afRequest = session.upload(bodyData, with: request)
        
        // Apply server trust evaluation if security policy is set
        if let host = request.url?.host {
            afRequest = applyServerTrustValidation(afRequest, host: host)
        }
        
        // Upload progress (default to main thread)
        if let progress = progress {
            afRequest = afRequest.uploadProgress(queue: .main) { progressInfo in
                progress(progressInfo)
            }
        }
        
        // Response handling
        afRequest.response(queue: .main) { response in
            if let error = response.error {
                completionHandler(response.response, nil, error)
                return
            }
            
            // Deserialize response based on responseSerializer
            if let data = response.data {
                let result = self.responseSerializer.deserialize(data: data, response: response.response)
                completionHandler(response.response, result, nil)
            } else {
                completionHandler(response.response, nil, nil)
            }
        }
        
        return afRequest.task
    }
    
    // MARK: - Download Tasks
    
    // Streaming download to temporary location (for deferred processing)
    // This downloads the response body to a temp file and returns the temp path
    // Allows inspecting headers before deciding what to do with the body
    @objc public func downloadToTemp(
        _ method: String,
        _ urlString: String,
        _ parameters: NSDictionary?,
        _ headers: NSDictionary?,
        _ progress: ((Progress) -> Void)?,
        _ completionHandler: @escaping (URLResponse?, String?, Error?) -> Void
    ) -> URLSessionDownloadTask? {
        
        guard let url = URL(string: urlString) else {
            let error = NSError(domain: "AlamofireWrapper", code: -1, userInfo: [NSLocalizedDescriptionKey: "Invalid URL"])
            completionHandler(nil, nil, error)
            return nil
        }
        
        var request: URLRequest
        do {
            request = try requestSerializer.createRequest(
                url: url,
                method: HTTPMethod(rawValue: method.uppercased()),
                parameters: nil,
                headers: headers
            )
            // Encode parameters into the request
            try requestSerializer.encodeParameters(parameters, into: &request, method: HTTPMethod(rawValue: method.uppercased()))
        } catch {
            completionHandler(nil, nil, error)
            return nil
        }
        
        // Create destination closure that saves to a temp file
        let destination: DownloadRequest.Destination = { temporaryURL, response in
            // Create a unique temp file path
            let tempDir = FileManager.default.temporaryDirectory
            let tempFileName = UUID().uuidString
            let tempFileURL = tempDir.appendingPathComponent(tempFileName)
            
            return (tempFileURL, [.removePreviousFile, .createIntermediateDirectories])
        }
        
        var downloadRequest = session.download(request, to: destination)
        
        // Apply server trust evaluation if security policy is set
        if let host = url.host {
            downloadRequest = applyServerTrustValidation(downloadRequest, host: host)
        }
        
        // Download progress (default to main thread)
        if let progress = progress {
            downloadRequest = downloadRequest.downloadProgress(queue: .main) { progressInfo in
                progress(progressInfo)
            }
        }
        
        // Response handling
        downloadRequest.response(queue: .main) { response in
            if let error = response.error {
                completionHandler(response.response, nil, error)
                return
            }
            
            // Return the temp file path on success
            if let tempFileURL = response.fileURL {
                completionHandler(response.response, tempFileURL.path, nil)
            } else {
                let error = NSError(domain: "AlamofireWrapper", code: -1, userInfo: [NSLocalizedDescriptionKey: "No file URL in download response"])
                completionHandler(response.response, nil, error)
            }
        }
        
        return downloadRequest.task as? URLSessionDownloadTask
    }
    
    // Clean API: Download file with streaming to disk (optimized, no memory loading)
    @objc public func downloadToFile(
        _ urlString: String,
        _ destinationPath: String,
        _ headers: NSDictionary?,
        _ progress: ((Progress) -> Void)?,
        _ completionHandler: @escaping (URLResponse?, String?, Error?) -> Void
    ) -> URLSessionDownloadTask? {
        
        guard let url = URL(string: urlString) else {
            let error = NSError(domain: "AlamofireWrapper", code: -1, userInfo: [NSLocalizedDescriptionKey: "Invalid URL"])
            completionHandler(nil, nil, error)
            return nil
        }
        
        var request: URLRequest
        do {
            request = try requestSerializer.createRequest(
                url: url,
                method: .get,
                parameters: nil,
                headers: headers
            )
        } catch {
            completionHandler(nil, nil, error)
            return nil
        }
        
        // Create destination closure that moves file to the specified path
        let destination: DownloadRequest.Destination = { temporaryURL, response in
            let destinationURL = URL(fileURLWithPath: destinationPath)
            
            // Ensure parent directory exists
            let parentDirectory = destinationURL.deletingLastPathComponent()
            try? FileManager.default.createDirectory(at: parentDirectory, withIntermediateDirectories: true, attributes: nil)
            
            return (destinationURL, [.removePreviousFile, .createIntermediateDirectories])
        }
        
        var downloadRequest = session.download(request, to: destination)
        
        // Apply server trust evaluation if security policy is set
        if let host = url.host {
            downloadRequest = applyServerTrustValidation(downloadRequest, host: host)
        }
        
        // Download progress (default to main thread)
        if let progress = progress {
            downloadRequest = downloadRequest.downloadProgress(queue: .main) { progressInfo in
                progress(progressInfo)
            }
        }
        
        // Response handling
        downloadRequest.response(queue: .main) { response in
            if let error = response.error {
                completionHandler(response.response, nil, error)
                return
            }
            
            // Return the destination path on success
            completionHandler(response.response, destinationPath, nil)
        }
        
        return downloadRequest.task as? URLSessionDownloadTask
    }
    
    // MARK: - Early Resolution Support
    
    /**
     * Download to temp file with early resolution on headers received.
     * Calls headersCallback as soon as headers are available (before download completes).
     * Calls completionHandler when download finishes with temp file path.
     * This allows inspecting status/headers early and cancelling before full download.
     */
    @objc public func downloadToTempWithEarlyHeaders(
        _ method: String,
        _ urlString: String,
        _ parameters: NSDictionary?,
        _ headers: NSDictionary?,
        _ sizeThreshold: Int64,
        _ progress: ((Progress) -> Void)?,
        _ headersCallback: @escaping (URLResponse?, Int64) -> Void,
        _ completionHandler: @escaping (URLResponse?, String?, Error?) -> Void
    ) -> URLSessionDownloadTask? {
        
        guard let url = URL(string: urlString) else {
            let error = NSError(domain: "AlamofireWrapper", code: -1, userInfo: [NSLocalizedDescriptionKey: "Invalid URL"])
            completionHandler(nil, nil, error)
            return nil
        }
        
        var request: URLRequest
        do {
            request = try requestSerializer.createRequest(
                url: url,
                method: HTTPMethod(rawValue: method.uppercased()),
                parameters: nil,
                headers: headers
            )
            // Encode parameters into the request
            try requestSerializer.encodeParameters(parameters, into: &request, method: HTTPMethod(rawValue: method.uppercased()))
        } catch {
            completionHandler(nil, nil, error)
            return nil
        }
        
        // Use atomic Boolean class for thread-safe flag (Swift 6 compatible)
        final class HeadersCallbackState {
            private let lock = NSLock()
            private var called = false
            
            func callOnce(_ callback: () -> Void) {
                lock.lock()
                defer { lock.unlock() }
                if !called {
                    called = true
                    callback()
                }
            }
        }
        
        let callbackState = HeadersCallbackState()
        
        // Create destination closure that saves to a temp file
        let destination: DownloadRequest.Destination = { temporaryURL, response in
            // Create a unique temp file path
            let tempDir = FileManager.default.temporaryDirectory
            let tempFileName = UUID().uuidString
            let tempFileURL = tempDir.appendingPathComponent(tempFileName)
            
            // Call headersCallback on first response (only once)
            callbackState.callOnce {
                let contentLength = response.expectedContentLength
                headersCallback(response, contentLength)
            }
            
            return (tempFileURL, [.removePreviousFile, .createIntermediateDirectories])
        }
        
        var downloadRequest = session.download(request, to: destination)
        
        // Apply server trust evaluation if security policy is set
        if let host = url.host {
            downloadRequest = applyServerTrustValidation(downloadRequest, host: host)
        }
        
        // Download progress (default to main thread)
        if let progress = progress {
            downloadRequest = downloadRequest.downloadProgress(queue: .main) { progressInfo in
                progress(progressInfo)
            }
        }
        
        // Response handling (fires when download completes)
        downloadRequest.response(queue: .main) { response in
            if let error = response.error {
                completionHandler(response.response, nil, error)
                return
            }
            
            // Return the temp file path on success
            if let tempFileURL = response.fileURL {
                completionHandler(response.response, tempFileURL.path, nil)
            } else {
                let error = NSError(domain: "AlamofireWrapper", code: -1, userInfo: [NSLocalizedDescriptionKey: "No file URL in download response"])
                completionHandler(response.response, nil, error)
            }
        }
        
        return downloadRequest.task as? URLSessionDownloadTask
    }
    
    /**
     * Request with conditional download based on response size.
     * Starts as data request, checks Content-Length header, then:
     * - If size <= threshold: continues as data request (memory)
     * - If size > threshold: switches to download request (file)
     * This provides memory efficiency for small responses while using streaming for large ones.
     */
    @objc public func requestWithConditionalDownload(
        _ method: String,
        _ urlString: String,
        _ parameters: NSDictionary?,
        _ headers: NSDictionary?,
        _ sizeThreshold: Int64,
        _ progress: ((Progress) -> Void)?,
        _ success: @escaping (URLSessionTask, Any?, String?) -> Void,
        _ failure: @escaping (URLSessionTask?, Error) -> Void
    ) -> URLSessionTask? {
        
        guard let url = URL(string: urlString) else {
            let error = NSError(domain: "AlamofireWrapper", code: -1, userInfo: [NSLocalizedDescriptionKey: "Invalid URL"])
            failure(nil, error)
            return nil
        }
        
        var request: URLRequest
        do {
            request = try requestSerializer.createRequest(
                url: url,
                method: HTTPMethod(rawValue: method.uppercased()),
                parameters: nil,
                headers: headers
            )
            // Encode parameters into the request
            try requestSerializer.encodeParameters(parameters, into: &request, method: HTTPMethod(rawValue: method.uppercased()))
        } catch {
            failure(nil, error)
            return nil
        }
        
        // Start as data request to get headers quickly
        var afRequest: DataRequest = session.request(request)
        
        // Apply server trust evaluation if security policy is set
        if let host = url.host {
            afRequest = applyServerTrustValidation(afRequest, host: host)
        }
        
        // Download progress (default to main thread)
        if let progress = progress {
            afRequest = afRequest.downloadProgress(queue: .main) { progressInfo in
                progress(progressInfo)
            }
        }
        
        // Store reference to task before async callback
        let task = afRequest.task
        
        // Response handling
        afRequest.response(queue: .main) { response in
            if let error = response.error {
                let nsError = self.createNSError(from: error, response: response.response, data: response.data)
                failure(task, nsError)
                return
            }
            
            // Check content length to decide strategy
            let contentLength = response.response?.expectedContentLength ?? -1
            
            // If content length is unknown or above threshold, would have been better as download
            // but since we already have the data in memory, just return it
            // For threshold decision: <= threshold uses memory (what we did), > threshold should use file
            
            if let data = response.data {
                // If data is larger than threshold, save to temp file for consistency
                if sizeThreshold >= 0 && contentLength > sizeThreshold {
                    // Save data to temp file
                    let tempDir = FileManager.default.temporaryDirectory
                    let tempFileName = UUID().uuidString
                    let tempFileURL = tempDir.appendingPathComponent(tempFileName)
                    
                    do {
                        try data.write(to: tempFileURL)
                        // Return with temp file path
                        success(task, nil, tempFileURL.path)
                    } catch {
                        // Failed to write, just return data in memory
                        let result = self.responseSerializer.deserialize(data: data, response: response.response)
                        success(task, result, nil)
                    }
                } else {
                    // Small response or threshold not set, return data in memory
                    let result = self.responseSerializer.deserialize(data: data, response: response.response)
                    success(task, result, nil)
                }
            } else {
                success(task, nil, nil)
            }
        }
        
        return task
    }
    
    // MARK: - Helper Methods
    
    private func createNSError(from error: Error, response: HTTPURLResponse?, data: Data?) -> NSError {
        var userInfo: [String: Any] = [
            NSLocalizedDescriptionKey: error.localizedDescription
        ]
        
        if let response = response {
            userInfo["AFNetworkingOperationFailingURLResponseErrorKey"] = response
        }
        
        if let data = data {
            userInfo["AFNetworkingOperationFailingURLResponseDataErrorKey"] = data
        }
        
        if let afError = error as? AFError {
            if case .sessionTaskFailed(let sessionError) = afError {
                if let urlError = sessionError as? URLError {
                    userInfo["NSErrorFailingURLKey"] = urlError.failingURL
                    return NSError(domain: NSURLErrorDomain, code: urlError.errorCode, userInfo: userInfo)
                }
            }
        }
        
        return NSError(domain: "AlamofireWrapper", code: (error as NSError).code, userInfo: userInfo)
    }
}

// MARK: - Request Serializer

@objc(RequestSerializer)
@objcMembers
public class RequestSerializer: NSObject {
    
    @objc public var timeoutInterval: TimeInterval = 10
    @objc public var allowsCellularAccess: Bool = true
    @objc public var httpShouldHandleCookies: Bool = true
    @objc public var cachePolicy: URLRequest.CachePolicy = .useProtocolCachePolicy
    
    public func createRequest(
        url: URL,
        method: HTTPMethod,
        parameters: NSDictionary?,
        headers: NSDictionary?
    ) throws -> URLRequest {
        var request = URLRequest(url: url)
        request.httpMethod = method.rawValue
        request.timeoutInterval = timeoutInterval
        request.allowsCellularAccess = allowsCellularAccess
        request.httpShouldHandleCookies = httpShouldHandleCookies
        request.cachePolicy = cachePolicy
        
        // Add headers
        if let headers = headers as? [String: String] {
            for (key, value) in headers {
                request.setValue(value, forHTTPHeaderField: key)
            }
        }
        
        return request
    }
    
    public func encodeParameters(_ parameters: NSDictionary?, into request: inout URLRequest, method: HTTPMethod) throws {
        // Encode parameters
        if let parameters = parameters {
            if method == .post || method == .put || method == .patch {
                // For POST/PUT/PATCH, encode as JSON in body
                let jsonData = try JSONSerialization.data(withJSONObject: parameters, options: [])
                request.httpBody = jsonData
                if request.value(forHTTPHeaderField: "Content-Type") == nil {
                    request.setValue("application/json", forHTTPHeaderField: "Content-Type")
                }
            } else {
                // For GET and others, encode as query parameters
                if let dict = parameters as? [String: Any], let requestURL = request.url {
                    var components = URLComponents(url: requestURL, resolvingAgainstBaseURL: false)
                    components?.queryItems = dict.map { URLQueryItem(name: $0.key, value: "\($0.value)") }
                    if let urlWithQuery = components?.url {
                        request.url = urlWithQuery
                    }
                }
            }
        }
    }
}

// MARK: - Response Serializer

@objc(ResponseSerializer)
@objcMembers
public class ResponseSerializer: NSObject {
    
    @objc public var acceptsJSON: Bool = true
    @objc public var readingOptions: JSONSerialization.ReadingOptions = .allowFragments
    
    public func deserialize(data: Data, response: HTTPURLResponse?) -> Any? {
        if acceptsJSON {
            do {
                return try JSONSerialization.jsonObject(with: data, options: readingOptions)
            } catch {
                // If JSON parsing fails, return raw data
                return data
            }
        } else {
            return data
        }
    }
}
