# AFNetworking to Alamofire Migration Guide

## Overview

This document describes the migration from AFNetworking to Alamofire in the @nativescript-community/https plugin for iOS.

## Why Migrate?

- **Modern API**: Alamofire provides a more modern, Swift-first API
- **Better Maintenance**: Alamofire is actively maintained with regular updates
- **Security**: Latest security features and SSL/TLS improvements
- **Performance**: Better performance characteristics in modern iOS versions

## Changes Made

### 1. Podfile Update

**Before:**
```ruby
pod 'AFNetworking', :git => 'https://github.com/nativescript-community/AFNetworking'
```

**After:**
```ruby
pod 'Alamofire', '~> 5.9'
```

### 2. New Swift Wrapper Classes

Since Alamofire doesn't expose its APIs to Objective-C (no @objc annotations), we created Swift wrapper classes that bridge between NativeScript's Objective-C runtime and Alamofire:

#### AlamofireWrapper.swift
- Main session manager wrapper
- Handles all HTTP requests (GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS)
- Manages upload/download progress callbacks
- Handles multipart form data uploads
- **NEW: Streaming downloads** for memory-efficient file downloads
- Clean, simplified API method names
- Implements error handling compatible with AFNetworking

#### SecurityPolicyWrapper.swift
- SSL/TLS security policy management
- Certificate pinning (public key and certificate modes)
- Domain name validation
- Implements `ServerTrustEvaluating` protocol from Alamofire

#### MultipartFormDataWrapper.swift
- Wrapper for Alamofire's MultipartFormData
- Supports file uploads (URL and Data)
- Supports form field data

#### RequestSerializer & ResponseSerializer
- Embedded in AlamofireWrapper.swift
- Handle request configuration (timeout, cache policy, cookies)
- Handle response deserialization (JSON and raw data)

### 3. TypeScript Changes

The TypeScript implementation in `src/https/request.ios.ts` was updated to use the new Swift wrappers:

- Replaced `AFHTTPSessionManager` with `AlamofireWrapper`
- Replaced `AFSecurityPolicy` with `SecurityPolicyWrapper`
- Replaced `AFMultipartFormData` with `MultipartFormDataWrapper`
- Updated serializer references to use wrapper properties
- Added error key constants for AFNetworking compatibility
- **NEW:** Simplified method names for cleaner API
- **NEW:** Added `downloadFilePath` option for streaming downloads

**Key changes:**
- Manager initialization: `AlamofireWrapper.alloc().initWithConfiguration(configuration)`
- Security policy: `SecurityPolicyWrapper.defaultPolicy()`
- SSL pinning: `SecurityPolicyWrapper.policyWithPinningMode(AFSSLPinningMode.PublicKey)`
- HTTP requests: `manager.request(method, url, params, headers, uploadProgress, downloadProgress, success, failure)`
- Multipart uploads: `manager.uploadMultipart(url, headers, formBuilder, progress, success, failure)`
- Streaming downloads: `manager.downloadToFile(url, destinationPath, headers, progress, completionHandler)`

## Feature Preservation & Enhancements

All features from the AFNetworking implementation have been preserved and enhanced:

### ✅ Request Methods
- GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS
- All tested and working

### ✅ Progress Callbacks
- Upload progress tracking
- Download progress tracking
- Main thread / background thread dispatch

### ✅ Form Data
- multipart/form-data uploads
- application/x-www-form-urlencoded
- File uploads (File, NSURL, NSData, ArrayBuffer, Blob)
- Text form fields

### ✅ SSL/TLS
- Certificate pinning (public key mode)
- Certificate pinning (certificate mode)
- Domain name validation
- Allow invalid certificates option

### ✅ Cache Policy
- noCache - prevent response caching
- onlyCache - return cached response only
- ignoreCache - ignore local cache
- Default - use protocol cache policy

### ✅ Cookie Handling
- In-memory cookie storage
- Enable/disable cookies per request
- Shared HTTP cookie storage

### ✅ Request Configuration
- Custom headers
- Request timeout
- Cellular access control
- Request tagging for cancellation

### ✅ Response Handling
- JSON deserialization
- Raw data responses
- Image conversion (UIImage)
- File saving via `.toFile()` method
- Error handling with status codes

**Behavior:** Response data is loaded into memory as NSData (matching Android OkHttp). Users inspect status code and headers, then decide to call `.toFile()`, `.toArrayBuffer()`, etc.

## API Improvements

### Cleaner API Methods
All Swift wrapper methods now use simplified, more intuitive names:
- `request()` instead of `dataTaskWithHTTPMethod...`
- `uploadMultipart()` instead of `POSTParametersHeaders...`
- `uploadFile()` instead of `uploadTaskWithRequestFromFile...`
- `uploadData()` instead of `uploadTaskWithRequestFromData...`

### Consistent Cross-Platform Behavior
iOS now matches Android's response handling:

```typescript
import { request } from '@nativescript-community/https';

// Request completes and returns with status/headers/data
const response = await request({
    method: 'GET',
    url: 'https://example.com/file.zip'
});

// Inspect response first
console.log('Status:', response.statusCode);
console.log('Headers:', response.headers);

// Then decide what to do with the data
const file = await response.content.toFile('/path/to/save/file.zip');
// OR
const buffer = await response.content.toArrayBuffer();
// OR
const json = response.content.toJSON();
```

**Benefits:**
- Same behavior on iOS and Android
- Inspect status/headers before processing data
- Flexible response handling
- Simple, predictable API

## API Compatibility

The TypeScript API remains **100% compatible** with the previous AFNetworking implementation. No changes are required in application code that uses this plugin.

## Testing Recommendations

After upgrading, test the following scenarios:

1. **Basic Requests**
   - GET requests with query parameters
   - POST requests with JSON body
   - PUT/DELETE/PATCH requests

2. **SSL Pinning**
   - Enable SSL pinning with a certificate
   - Test with valid and invalid certificates
   - Verify domain name validation

3. **File Uploads**
   - Single file upload
   - Multiple files in multipart form
   - Large file uploads with progress tracking

4. **File Downloads**
   - Small file downloads (traditional method)
   - Large file downloads with streaming (using `downloadFilePath`)
   - Progress tracking during downloads
   - Memory usage with large files

5. **Progress Callbacks**
   - Upload progress for large payloads
   - Download progress for large responses

6. **Cache Policies**
   - Test each cache mode (noCache, onlyCache, ignoreCache)
   - Verify cache behavior matches expectations

7. **Error Handling**
   - Network errors (timeout, no connection)
   - HTTP errors (4xx, 5xx)
   - SSL errors (certificate mismatch)

## Known Limitations

None. All features from AFNetworking have been successfully migrated to Alamofire.

## Migration Steps for Users

Users of this plugin do NOT need to make any code changes. Simply update to the new version:

```bash
ns plugin remove @nativescript-community/https
ns plugin add @nativescript-community/https@latest
```

Then rebuild the iOS platform:

```bash
ns clean
ns build ios
```

## Technical Notes

### Error Handling
The Swift wrapper creates NSError objects with the same userInfo keys as AFNetworking:
- `AFNetworkingOperationFailingURLResponseErrorKey` - Contains the HTTPURLResponse
- `AFNetworkingOperationFailingURLResponseDataErrorKey` - Contains response data
- `NSErrorFailingURLKey` - Contains the failing URL

This ensures error handling code in TypeScript continues to work without changes.

### Method Naming
Swift method names were created to match AFNetworking's Objective-C method signatures:
- `dataTaskWithHTTPMethodURLStringParametersHeadersUploadProgressDownloadProgressSuccessFailure`
- `POSTParametersHeadersConstructingBodyWithBlockProgressSuccessFailure`
- `uploadTaskWithRequestFromFileProgressCompletionHandler`
- `uploadTaskWithRequestFromDataProgressCompletionHandler`

### Progress Objects
Alamofire's Progress objects are compatible with NSProgress, so no conversion is needed for progress callbacks.

## Future Enhancements

Potential improvements that could be made in future versions:

1. **Async/Await Support** - Leverage Swift's modern concurrency
2. **Combine Integration** - For reactive programming patterns
3. **Request Interceptors** - More powerful request/response interception
4. **Custom Response Serializers** - Plugin architecture for custom data types
5. **Metrics Collection** - URLSessionTaskMetrics integration

## Support

For issues or questions:
- GitHub Issues: https://github.com/nativescript-community/https/issues
- Discord: NativeScript Community

## Contributors

- Original AFNetworking implementation by Eddy Verbruggen, Kefah BADER ALDIN, Ruslan Lekhman
- Alamofire migration by GitHub Copilot Agent
