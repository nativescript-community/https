# iOS/Android Behavior Example

## Current Behavior (Consistent Across Platforms)

```typescript
import { request } from '@nativescript-community/https';

async function downloadFile() {
    console.log('Starting download...');
    
    // Step 1: Make the request
    // Both iOS and Android load the response data into memory
    const response = await request({
        method: 'GET',
        url: 'https://example.com/data.zip',
        onProgress: (current, total) => {
            const percent = (current / total * 100).toFixed(1);
            console.log(`Downloading: ${percent}%`);
        }
    });
    
    // Step 2: Request completes, inspect the response
    console.log('Download complete!');
    console.log('Status code:', response.statusCode);
    console.log('Content-Type:', response.headers['Content-Type']);
    console.log('Content-Length:', response.contentLength);
    
    // Step 3: Now decide what to do with the data
    if (response.statusCode === 200) {
        // Option A: Save to file
        const file = await response.content.toFile('~/Downloads/data.zip');
        console.log('Saved to:', file.path);
        
        // Option B: Get as ArrayBuffer (alternative)
        // const buffer = await response.content.toArrayBuffer();
        // console.log('Buffer size:', buffer.byteLength);
        
        // Option C: Parse as JSON (if applicable)
        // const json = response.content.toJSON();
        // console.log('Data:', json);
    } else {
        console.error('Download failed with status:', response.statusCode);
    }
}

// Example with error handling
async function downloadWithErrorHandling() {
    try {
        const response = await request({
            method: 'GET',
            url: 'https://example.com/large-file.pdf',
            timeout: 60, // 60 seconds
            onProgress: (current, total) => {
                console.log(`Progress: ${current}/${total}`);
            }
        });
        
        // Check status first
        if (response.statusCode >= 400) {
            throw new Error(`HTTP ${response.statusCode}`);
        }
        
        // Verify content type
        const contentType = response.headers['Content-Type'] || '';
        if (!contentType.includes('pdf')) {
            console.warn('Warning: Expected PDF but got:', contentType);
        }
        
        // Save to file
        const file = await response.content.toFile('~/Documents/file.pdf');
        console.log('Successfully saved:', file.path);
        
        return file;
        
    } catch (error) {
        console.error('Download failed:', error.message);
        throw error;
    }
}

// Example with conditional processing
async function downloadAndProcess() {
    const response = await request({
        method: 'GET',
        url: 'https://api.example.com/data'
    });
    
    console.log('Received response:', response.statusCode);
    
    // Decide what to do based on content type
    const contentType = response.headers['Content-Type'] || '';
    
    if (contentType.includes('json')) {
        // Parse as JSON
        const json = response.content.toJSON();
        console.log('JSON data:', json);
        return json;
        
    } else if (contentType.includes('image')) {
        // Save as image file
        const file = await response.content.toFile('~/Pictures/image.jpg');
        console.log('Image saved:', file.path);
        
        // iOS: Can also convert to ImageSource
        // const image = await response.content.toImage();
        
        return file;
        
    } else {
        // Save as generic file
        const file = await response.content.toFile('~/Downloads/data.bin');
        console.log('File saved:', file.path);
        return file;
    }
}
```

## Key Points

1. **Request completes with data in memory** (both platforms)
2. **Inspect response first** (status, headers, content length)
3. **Then decide how to process** (toFile, toArrayBuffer, toJSON, etc.)
4. **Same behavior on iOS and Android** (cross-platform consistency)

## Platform Implementation

### iOS (Alamofire)
- Response data is NSData in memory
- `toFile()` writes NSData to disk: `data.writeToFileAtomically(path, true)`
- `toArrayBuffer()` converts NSData to ArrayBuffer
- `toJSON()` deserializes NSData as JSON

### Android (OkHttp)
- Response data is in ResponseBody
- `toFile()` streams ResponseBody to disk via InputStream
- `toArrayBuffer()` reads ResponseBody into ByteBuffer
- `toJSON()` parses ResponseBody as JSON

## Memory Considerations

Both platforms load response data for processing:
- **Small files (<10MB)**: No issues
- **Medium files (10-50MB)**: Should work on most devices
- **Large files (>50MB)**: Monitor memory usage, test on target devices

This is the expected behavior for both platforms and matches standard HTTP client behavior (fetch API, Axios, etc.).
