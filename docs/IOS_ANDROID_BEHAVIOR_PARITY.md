# iOS and Android Streaming Behavior

## Overview

Both iOS and Android now implement true streaming downloads where response bodies are NOT loaded into memory until explicitly accessed. This provides memory-efficient handling of large files.

## How It Works

### Android (OkHttp)

Android uses OkHttp's `ResponseBody` which provides a stream:

1. **Request completes** - Response returned with `ResponseBody` (unopened stream)
2. **Inspect response** - User can check status code and headers
3. **Process data** - When `.toFile()`, `.toArrayBuffer()`, etc. is called:
   - Stream is opened and consumed
   - For `toFile()`: Data streams directly to disk
   - For `toArrayBuffer()`: Data streams into memory
   - For `toJSON()`: Data streams, parsed, returned

**Memory Usage**: Only buffered data in memory during streaming (typically ~8KB at a time)

### iOS (Alamofire)

iOS now uses Alamofire's `DownloadRequest` which downloads to a temp file:

1. **Request completes** - Response body downloaded to temp file
2. **Inspect response** - User can check status code and headers
3. **Process data** - When `.toFile()`, `.toArrayBuffer()`, etc. is called:
   - For `toFile()`: Temp file is moved to destination (no copy, no memory)
   - For `toArrayBuffer()`: Temp file loaded into memory
   - For `toJSON()`: Temp file loaded and parsed
   - For `toString()`: Temp file loaded as string

**Memory Usage**: Temp file on disk during download, loaded into memory only when explicitly accessed

## Response Handling Behavior

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

- Request completes and returns response with ResponseBody (stream not yet consumed)
- ResponseBody stream is available but not opened
- When `toFile()` is called, it opens the stream and writes to disk chunk by chunk
- When `toArrayBuffer()` is called, it opens the stream and reads into memory
- Stream is consumed only once - subsequent calls use cached data

**Native Code Flow:**
```java
// Response is returned with ResponseBody (stream)
ResponseBody responseBody = response.body();

// Later, when toFile() is called:
InputStream inputStream = responseBody.byteStream();
FileOutputStream output = new FileOutputStream(file);
byte[] buffer = new byte[1024];
while ((count = inputStream.read(buffer)) != -1) {
    output.write(buffer, 0, count);  // Streaming write
}
```

**Memory Characteristics:**
- Only buffer size (~1KB) in memory during streaming
- Large files: ~1-2MB RAM overhead maximum
- File writes happen progressively as data arrives

### iOS (Alamofire)

On iOS, the response downloads to a temporary file automatically:

- Request completes and downloads body to temp file  
- Temp file path stored in response object
- When `toFile()` is called, it moves the temp file to destination (fast file system operation)
- When `toArrayBuffer()` is called, it loads the temp file into memory
- When `toJSON()` is called, it loads and parses the temp file

**Native Code Flow:**
```swift
// Response downloads to temp file during request
let tempFileURL = FileManager.default.temporaryDirectory
    .appendingPathComponent(UUID().uuidString)
// Download happens here, saved to tempFileURL

// Later, when toFile() is called:
try FileManager.default.moveItem(at: tempFileURL, to: destinationURL)
// Fast move operation, no data copying

// Or when toArrayBuffer() is called:
let data = try Data(contentsOf: tempFileURL)
// File loaded into memory at this point
```

**Memory Characteristics:**
- Temp file written to disk during download
- No memory overhead during download (except small buffer)
- Memory used only when explicitly loading via toArrayBuffer()/toJSON()
- toFile() uses file move (no memory overhead)

## Memory Considerations

### Comparison

| Operation | Android Memory | iOS Memory |
|-----------|----------------|------------|
| **During download** | ~1-2MB buffer | ~1-2MB buffer + temp file on disk |
| **After download** | ResponseBody (minimal) | Temp file on disk (0 RAM) |
| **toFile()** | Stream to disk (~1MB buffer) | File move (0 RAM) |
| **toArrayBuffer()** | Load into memory | Load from temp file into memory |
| **toJSON()** | Stream and parse | Load from temp file and parse |

### Benefits

Both platforms now provide true memory-efficient streaming:

1. **Large File Downloads**: Won't cause OOM errors
2. **Flexible Processing**: Inspect headers before committing to download
3. **Efficient File Saving**: Direct streaming (Android) or file move (iOS)
4. **On-Demand Loading**: Data loaded into memory only when explicitly requested

### Recommendations

For both platforms:
- **Small files (<10MB)**: Any method works efficiently
- **Medium files (10-100MB)**: Use `toFile()` for best memory efficiency
- **Large files (>100MB)**: Always use `toFile()` to avoid memory issues
- **JSON APIs**: `toJSON()` works well for responses up to ~50MB

## Example Usage

```typescript
import { request } from '@nativescript-community/https';

async function downloadLargeFile() {
    console.log('Starting download...');
    
    // Step 1: Make the request
    // iOS: Downloads to temp file on disk (not in RAM)
    // Android: Opens connection, keeps ResponseBody stream (not in RAM)
    const response = await request({
        method: 'GET',
        url: 'https://example.com/large-file.zip',
        onProgress: (current, total) => {
            const percent = (current / total * 100).toFixed(1);
            console.log(`Downloading: ${percent}%`);
        }
    });
    
    // Step 2: Request completes, inspect the response
    // At this point, large file is NOT in memory on either platform!
    console.log('Download complete!');
    console.log('Status code:', response.statusCode);
    console.log('Content-Type:', response.headers['Content-Type']);
    console.log('Content-Length:', response.contentLength);
    
    // Step 3: Now decide what to do with the data
    if (response.statusCode === 200) {
        // Option A: Save to file (MOST MEMORY EFFICIENT)
        // iOS: Moves temp file (0 RAM overhead)
        // Android: Streams ResponseBody to file (~1MB RAM overhead)
        const file = await response.content.toFile('~/Downloads/file.zip');
        console.log('Saved to:', file.path);
        
        // Option B: Load into memory (for processing)
        // iOS: Loads temp file into RAM
        // Android: Streams ResponseBody into RAM
        // WARNING: Use only for files that fit in memory!
        // const buffer = await response.content.toArrayBuffer();
        // console.log('Buffer size:', buffer.byteLength);
        
        // Option C: Parse as JSON (for APIs)
        // iOS: Loads temp file and parses
        // Android: Streams ResponseBody and parses
        // const json = response.content.toJSON();
        // console.log('Data:', json);
    } else {
        console.error('Download failed with status:', response.statusCode);
    }
}
```

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
