# Alamofire Swift Wrappers

This directory contains Swift wrapper classes that bridge between NativeScript's Objective-C runtime and Alamofire's Swift-only API.

## Files

### AlamofireWrapper.swift
Main session manager that wraps Alamofire's `Session` class.

# Alamofire Swift Wrappers

This directory contains Swift wrapper classes that bridge between NativeScript's Objective-C runtime and Alamofire's Swift-only API.

## Files

### AlamofireWrapper.swift
Main session manager that wraps Alamofire's `Session` class.

**Key Features:**
- HTTP request methods (GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS)
- Upload/download progress tracking
- Multipart form data uploads
- File uploads
- Request/response serialization
- Security policy integration
- Cache policy management

**@objc Methods (Clean API):**
- `request(method:urlString:parameters:headers:uploadProgress:downloadProgress:success:failure:)` - General HTTP requests
- `uploadMultipart(urlString:headers:constructingBodyWithBlock:progress:success:failure:)` - Multipart form upload
- `uploadFile(request:fileURL:progress:completionHandler:)` - File upload
- `uploadData(request:bodyData:progress:completionHandler:)` - Data upload

**Note:** Response data is loaded into memory as NSData, matching Android OkHttp behavior. Users can inspect status code and headers, then decide to call `.toFile()`, `.toArrayBuffer()`, etc.

### SecurityPolicyWrapper.swift
SSL/TLS security policy wrapper that implements Alamofire's `ServerTrustEvaluating` protocol.

**Key Features:**
- Certificate pinning (public key and certificate modes)
- Domain name validation
- Invalid certificate handling
- Compatible with AFSecurityPolicy API

**Pinning Modes:**
- 0 = None (default validation)
- 1 = PublicKey (pin to public keys)
- 2 = Certificate (pin to certificates)

### EventMonitorWrapper.swift
Wrapper for Alamofire's EventMonitor protocol to enable network event tracking from TypeScript.

**Key Features:**
- Request lifecycle tracking (resume, suspend, cancel, finish)
- Data reception monitoring
- Request completion tracking with response/error
- @objc-compatible callback-based API

**Available Callbacks:**
- `setRequestDidResume` - Called when request starts
- `setRequestDidSuspend` - Called when request is paused
- `setRequestDidCancel` - Called when request is cancelled
- `setRequestDidFinish` - Called when request finishes
- `setRequestDidComplete` - Called with response/error
- `setDataTaskDidReceiveData` - Called as data is received

### RequestInterceptorWrapper.swift
Wrapper for Alamofire's RequestInterceptor protocol to enable request modification and retry logic from TypeScript.

**Key Features:**
- Request adaptation (modify requests before sending)
- Automatic retry logic with custom conditions
- @objc-compatible callback-based API

**Available Callbacks:**
- `setAdapt` - Modify URLRequest before sending
- `setRetry` - Return true to retry failed requests

### MultipartFormDataWrapper.swift
Wrapper for building multipart form data requests.

**Key Features:**
- File uploads (URL and Data)
- Form field data
- Custom MIME types
- Multiple parts support

**@objc Methods:**
- `appendPartWithFileURLNameFileNameMimeTypeError` - Add file from URL
- `appendPartWithFileDataNameFileNameMimeType` - Add file from Data
- `appendPartWithFormDataName` - Add text field

## Usage from TypeScript

```typescript
// Initialize manager
const configuration = NSURLSessionConfiguration.defaultSessionConfiguration;
const manager = AlamofireWrapper.alloc().initWithConfiguration(configuration);

// Configure serializers
manager.requestSerializerWrapper.timeoutInterval = 30;
manager.requestSerializerWrapper.httpShouldHandleCookies = true;

// Set security policy
const policy = SecurityPolicyWrapper.policyWithPinningMode(AFSSLPinningMode.PublicKey);
policy.allowInvalidCertificates = false;
policy.validatesDomainName = true;
manager.securityPolicyWrapper = policy;

// Make a request (clean API)
const task = manager.request(
    'GET',
    'https://api.example.com/data',
    null,
    headers,
    uploadProgress,
    downloadProgress,
    success,
    failure
);
task.resume();

// Response data is available in memory
// User can then call toFile(), toArrayBuffer(), etc. on the response
```

### Using Interceptors and Event Monitors

```typescript
// Create an event monitor to track network events
const eventMonitor = EventMonitorWrapper.alloc().init();
eventMonitor.setRequestDidResume((request) => {
    console.log('Request started:', request.URL.absoluteString);
});
eventMonitor.setDataTaskDidReceiveData((request, data) => {
    console.log('Received data:', data.length, 'bytes');
});
eventMonitor.setRequestDidComplete((request, response, error) => {
    if (error) {
        console.log('Request failed:', error.localizedDescription);
    } else {
        console.log('Request completed:', response.statusCode);
    }
});
manager.addEventMonitor(eventMonitor);

// Create a request interceptor to modify requests and retry logic
const interceptor = RequestInterceptorWrapper.alloc().init();
interceptor.setAdapt((request) => {
    // Add custom headers to all requests
    const mutableRequest = request.mutableCopy();
    mutableRequest.setValueForHTTPHeaderField('CustomToken', 'Authorization');
    return mutableRequest;
});
interceptor.setRetry((request, error, retryCount) => {
    // Retry up to 3 times on network errors
    if (retryCount < 3) {
        console.log(`Retrying request (attempt ${retryCount + 1})...`);
        return true;
    }
    return false;
});
manager.addInterceptor(interceptor);
```

## Design Decisions

### Why Wrappers?
Alamofire is a pure Swift library that doesn't expose its APIs to Objective-C. NativeScript's iOS runtime uses Objective-C bridging to call native code from JavaScript/TypeScript. These wrapper classes bridge the gap by:

1. Using `@objc` and `@objcMembers` to expose Swift classes to Objective-C
2. Converting between Swift types and Objective-C types
3. Maintaining API compatibility with AFNetworking

### Method Naming
Method names have been simplified from AFNetworking's verbose Objective-C conventions to cleaner, more Swift-like names:
- `request()` - General HTTP requests (previously `dataTaskWithHTTPMethodURLStringParametersHeadersUploadProgressDownloadProgressSuccessFailure`)
- `uploadMultipart()` - Multipart form uploads (previously `POSTParametersHeadersConstructingBodyWithBlockProgressSuccessFailure`)
- `uploadFile()` - File uploads (previously `uploadTaskWithRequestFromFileProgressCompletionHandler`)
- `uploadData()` - Data uploads (previously `uploadTaskWithRequestFromDataProgressCompletionHandler`)

### Response Data Handling
Response data is loaded into memory as NSData (matching Android OkHttp behavior). This allows users to:
1. Inspect status code and headers immediately after request completes
2. Decide whether to call `.toFile()`, `.toArrayBuffer()`, `.toJSON()`, etc.
3. Have consistent behavior across iOS and Android platforms

**Note:** For large downloads, data will be loaded into memory. This matches Android's behavior where the response body is available and can be written to file when `toFile()` is called.

### Error Handling
Errors are wrapped in NSError objects with userInfo dictionaries that match AFNetworking's error structure. This ensures existing error handling code continues to work.

### Progress Callbacks
Alamofire's Progress objects are compatible with Foundation's Progress class (which bridges to NSProgress in Objective-C), so no conversion is needed.

## Building

These Swift files are compiled as part of the NativeScript iOS build process. They are automatically included when the plugin is installed in a NativeScript project.

Requirements:
- Xcode 14.0+
- Swift 5.7+
- iOS 12.0+
- Alamofire 5.9+

## Thread Safety

All request methods accept callbacks that are executed on the main queue by default. This matches AFNetworking's behavior and ensures UI updates can be safely made from callbacks.

## Testing

To test these wrappers:

1. Install the plugin in a NativeScript app
2. Build for iOS: `ns build ios`
3. Run the app: `ns run ios`
4. Test various request types and observe behavior

## Contributing

When modifying these files:

1. Maintain @objc compatibility
2. Keep method signatures matching AFNetworking where possible
3. Test all request types (GET, POST, multipart, uploads)
4. Verify SSL pinning still works
5. Check progress callbacks function correctly

## License

See LICENSE file in the repository root.
