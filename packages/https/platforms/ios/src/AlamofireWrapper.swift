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
    
    // MARK: - Request Methods
    
    // Clean API: New shorter method name
    @objc public func request(
        _ method: String,
        _ urlString: String,
        _ parameters: NSDictionary?,
        _ headers: NSDictionary?,
        _ uploadProgress: ((Progress) -> Void)?,
        _ downloadProgress: ((Progress) -> Void)?,
        _ success: @escaping (URLSessionDataTask, Any?) -> Void,
        _ failure: @escaping (URLSessionDataTask?, Error) -> Void
    ) -> URLSessionDataTask? {
        
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
        if let secPolicy = securityPolicy, let host = url.host {
            afRequest = afRequest.validate { _, response, _ in
                guard let serverTrust = response.serverTrust else {
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
        
        // Upload progress
        if let uploadProgress = uploadProgress {
            afRequest = afRequest.uploadProgress { progress in
                uploadProgress(progress)
            }
        }
        
        // Download progress
        if let downloadProgress = downloadProgress {
            afRequest = afRequest.downloadProgress { progress in
                downloadProgress(progress)
            }
        }
        
        // Response handling
        afRequest.response(queue: .main) { response in
            let task = response.request?.task as? URLSessionDataTask
            guard let task = task else {
                let error = NSError(domain: "AlamofireWrapper", code: -1, userInfo: [NSLocalizedDescriptionKey: "No task available"])
                failure(nil, error)
                return
            }
            
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
        
        return afRequest.task
    }
    
    // MARK: - Multipart Form Data
    
    // Clean API: New shorter method name for multipart upload
    @objc public func uploadMultipart(
        _ urlString: String,
        _ headers: NSDictionary?,
        _ constructingBodyWithBlock: @escaping (MultipartFormDataWrapper) -> Void,
        _ progress: ((Progress) -> Void)?,
        _ success: @escaping (URLSessionDataTask, Any?) -> Void,
        _ failure: @escaping (URLSessionDataTask?, Error) -> Void
    ) -> URLSessionDataTask? {
        
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
        if let secPolicy = securityPolicy, let host = url.host {
            afRequest = afRequest.validate { _, response, _ in
                guard let serverTrust = response.serverTrust else {
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
        
        // Upload progress
        
        // Upload progress
        if let progress = progress {
            afRequest = afRequest.uploadProgress { progressInfo in
                progress(progressInfo)
            }
        }
        
        // Response handling
        afRequest.response(queue: .main) { response in
            let task = response.request?.task as? URLSessionDataTask
            guard let task = task else {
                let error = NSError(domain: "AlamofireWrapper", code: -1, userInfo: [NSLocalizedDescriptionKey: "No task available"])
                failure(nil, error)
                return
            }
            
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
        
        return afRequest.task
    }
    
    // MARK: - Upload Tasks
    
    // Clean API: Upload file
    @objc public func uploadFile(
        _ request: URLRequest,
        _ fileURL: URL,
        _ progress: ((Progress) -> Void)?,
        _ completionHandler: @escaping (URLResponse?, Any?, Error?) -> Void
    ) -> URLSessionDataTask? {
        
        var afRequest = session.upload(fileURL, with: request)
        
        // Apply server trust evaluation if security policy is set
        if let secPolicy = securityPolicy, let host = request.url?.host {
            afRequest = afRequest.validate { _, response, _ in
                guard let serverTrust = response.serverTrust else {
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
        
        // Upload progress
        
        // Upload progress
        if let progress = progress {
            afRequest = afRequest.uploadProgress { progressInfo in
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
    ) -> URLSessionDataTask? {
        
        var afRequest = session.upload(bodyData, with: request)
        
        // Apply server trust evaluation if security policy is set
        if let secPolicy = securityPolicy, let host = request.url?.host {
            afRequest = afRequest.validate { _, response, _ in
                guard let serverTrust = response.serverTrust else {
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
        
        // Upload progress
        
        // Upload progress
        if let progress = progress {
            afRequest = afRequest.uploadProgress { progressInfo in
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
        if let secPolicy = securityPolicy, let host = url.host {
            downloadRequest = downloadRequest.validate { _, response, _ in
                guard let serverTrust = response.serverTrust else {
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
        
        // Download progress
        if let progress = progress {
            downloadRequest = downloadRequest.downloadProgress { progressInfo in
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
        if let secPolicy = securityPolicy, let host = url.host {
            downloadRequest = downloadRequest.validate { _, response, _ in
                guard let serverTrust = response.serverTrust else {
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
        
        // Download progress
        if let progress = progress {
            downloadRequest = downloadRequest.downloadProgress { progressInfo in
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
