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
- Streaming downloads (memory efficient)
- Request/response serialization
- Security policy integration
- Cache policy management

**@objc Methods (Clean API):**
- `request(method:urlString:parameters:headers:uploadProgress:downloadProgress:success:failure:)` - General HTTP requests
- `uploadMultipart(urlString:headers:constructingBodyWithBlock:progress:success:failure:)` - Multipart form upload
- `uploadFile(request:fileURL:progress:completionHandler:)` - File upload
- `uploadData(request:bodyData:progress:completionHandler:)` - Data upload
- `downloadToFile(urlString:destinationPath:headers:progress:completionHandler:)` - Streaming download to file

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

// Streaming download (memory efficient)
manager.downloadToFile(
    'https://example.com/large-file.zip',
    '/path/to/destination.zip',
    headers,
    progress,
    (response, filePath, error) => {
        if (error) {
            console.error('Download failed:', error);
        } else {
            console.log('Downloaded to:', filePath);
        }
    }
);
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
- `downloadToFile()` - Streaming downloads (new feature)

### Streaming Downloads
The `downloadToFile()` method uses Alamofire's download API to stream data directly to disk without loading it into memory. This is critical for:
- Large file downloads
- Memory-constrained devices
- Better performance and reliability

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
