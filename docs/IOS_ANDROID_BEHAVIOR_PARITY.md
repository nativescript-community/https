# iOS and Android Behavior Parity

## Overview

The iOS implementation has been updated to match Android's response handling behavior, providing consistent cross-platform functionality.

## Response Handling Behavior

### How It Works

Both iOS and Android now follow the same pattern:

1. **Request completes** - Response is returned with status code, headers, and data available
2. **Inspect response** - User can check status code and headers
3. **Process data** - User decides to call `.toFile()`, `.toArrayBuffer()`, `.toJSON()`, etc.

### Example Usage

```typescript
import { request } from '@nativescript-community/https';

// Make a request
const response = await request({
    method: 'GET',
    url: 'https://example.com/data.json',
    onProgress: (current, total) => {
        console.log(`Downloaded ${(current/total*100).toFixed(1)}%`);
    }
});

// Inspect response first
console.log('Status:', response.statusCode);
console.log('Content-Type:', response.headers['Content-Type']);
console.log('Content-Length:', response.contentLength);

// Then decide what to do with the data
if (response.statusCode === 200) {
    // Option 1: Parse as JSON
    const json = response.content.toJSON();
    
    // Option 2: Save to file
    const file = await response.content.toFile('~/Downloads/data.json');
    
    // Option 3: Get as ArrayBuffer
    const buffer = await response.content.toArrayBuffer();
    
    // Option 4: Get as Image (iOS only)
    const image = await response.content.toImage();
}
```

## Platform Implementation Details

### Android (OkHttp)

On Android, the response includes a `ResponseBody` that provides an input stream:

- Request completes and returns response
- ResponseBody is available with the data
- When `toFile()` is called, it reads from the ResponseBody stream and writes to disk
- When `toArrayBuffer()` is called, it reads from the ResponseBody stream into memory

**Native Code Flow:**
```java
// Response is returned with ResponseBody
ResponseBody responseBody = response.body();

// Later, when toFile() is called:
InputStream inputStream = responseBody.byteStream();
FileOutputStream output = new FileOutputStream(file);
// Stream data from input to output
```

### iOS (Alamofire)

On iOS, the response includes the data as NSData:

- Request completes and returns response  
- Data is loaded into memory as NSData
- When `toFile()` is called, it writes the NSData to disk
- When `toArrayBuffer()` is called, it converts NSData to ArrayBuffer

**Native Code Flow:**
```swift
// Response is returned with NSData
let data: NSData = responseData

// Later, when toFile() is called:
data.writeToFile(filePath, atomically: true)
```

## Memory Considerations

### Android
- ResponseBody provides a stream, so data isn't necessarily all in memory
- OkHttp may buffer data internally
- Large files will consume memory proportional to the buffering strategy

### iOS
- Response data is loaded into memory as NSData
- Large files will consume memory equal to the file size
- This matches Android's effective behavior for most use cases

### Recommendation

For both platforms:
- Small files (<10MB): No concern, data handling is efficient
- Medium files (10-50MB): Monitor memory usage, should work on most devices
- Large files (>50MB): Test on low-memory devices, consider chunked downloads if needed

## Benefits of Consistent Behavior

1. **Predictable API** - Same code works identically on both platforms
2. **Flexible Processing** - Inspect response before deciding how to handle data
3. **Simpler Mental Model** - No platform-specific special cases
4. **Easy Testing** - Same test cases work on both platforms

## Migration from Previous iOS Implementation

If you were using a previous version with `downloadFilePath` option:

```typescript
// OLD (no longer supported)
const response = await request({
    method: 'GET',
    url: 'https://example.com/file.zip',
    downloadFilePath: '~/Downloads/file.zip'
});

// NEW (consistent with Android)
const response = await request({
    method: 'GET',
    url: 'https://example.com/file.zip'
});
const file = await response.content.toFile('~/Downloads/file.zip');
```

## API Methods

### Response Methods (iOS and Android)

All methods work identically on both platforms:

- `response.content.toJSON()` - Parse response as JSON
- `response.content.toFile(path)` - Save response to file
- `response.content.toArrayBuffer()` - Get response as ArrayBuffer
- `response.content.toImage()` - Convert to Image (iOS only currently)

### Properties (iOS and Android)

- `response.statusCode` - HTTP status code
- `response.headers` - Response headers object
- `response.contentLength` - Response content length in bytes

## Error Handling

Error handling is also consistent:

```typescript
try {
    const response = await request({
        method: 'GET',
        url: 'https://example.com/data.json'
    });
    
    if (response.statusCode !== 200) {
        console.error('HTTP error:', response.statusCode);
        return;
    }
    
    const json = response.content.toJSON();
    // Process data
    
} catch (error) {
    // Network error, timeout, etc.
    console.error('Request failed:', error);
}
```

## Testing Cross-Platform Code

Since behavior is identical, you can write tests that work on both platforms:

```typescript
import { request } from '@nativescript-community/https';

async function testDownload() {
    const response = await request({
        method: 'GET',
        url: 'https://httpbin.org/image/png'
    });
    
    // These work identically on iOS and Android
    assert(response.statusCode === 200);
    assert(response.headers['Content-Type'].includes('image/png'));
    assert(response.contentLength > 0);
    
    const file = await response.content.toFile('~/test.png');
    assert(file.exists);
}
```

## Conclusion

The iOS implementation now matches Android's behavior, providing a consistent, predictable API across platforms. Users can inspect response metadata before deciding how to process the data, just like on Android.
