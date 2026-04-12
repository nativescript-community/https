# Early Resolution Feature

## Overview

The early resolution feature allows iOS GET requests to resolve immediately when headers are received, before the full download completes. This enables you to:

1. **Inspect status code and headers** before committing to a large download
2. **Cancel requests early** if the response doesn't meet criteria (e.g., wrong content type, too large)
3. **Show progress UI** sooner since you know the download size immediately

## Usage

### Basic Example

```typescript
import { request } from '@nativescript-community/https';

async function downloadFile() {
    // Request resolves as soon as headers arrive
    const response = await request({
        method: 'GET',
        url: 'https://example.com/large-video.mp4',
        earlyResolve: true,  // Enable early resolution
        tag: 'my-download'   // For cancellation
    });
    
    console.log('Headers received!');
    console.log('Status:', response.statusCode);
    console.log('Content-Length:', response.contentLength);
    console.log('Content-Type:', response.headers['Content-Type']);
    
    // Check if we want to proceed with download
    if (response.statusCode !== 200) {
        console.log('Bad status code, cancelling...');
        cancel('my-download');
        return;
    }
    
    if (response.contentLength > 100 * 1024 * 1024) {
        console.log('File too large, cancelling...');
        cancel('my-download');
        return;
    }
    
    // toFile() waits for download to complete, then moves file
    console.log('Download accepted, waiting for completion...');
    const file = await response.content.toFile('~/Videos/video.mp4');
    console.log('Download complete:', file.path);
}
```

### With Progress Tracking

```typescript
const response = await request({
    method: 'GET',
    url: 'https://example.com/large-file.zip',
    earlyResolve: true,
    onProgress: (current, total) => {
        const percent = (current / total * 100).toFixed(1);
        console.log(`Download progress: ${percent}% (${current}/${total} bytes)`);
    }
});

// Check headers immediately
if (response.headers['Content-Type'] !== 'application/zip') {
    console.log('Wrong content type!');
    return;
}

// Wait for full download
await response.content.toFile('~/Downloads/file.zip');
```

### Conditional Download Based on Headers

```typescript
async function smartDownload(url: string) {
    const response = await request({
        method: 'GET',
        url,
        earlyResolve: true
    });
    
    const contentType = response.headers['Content-Type'] || '';
    const contentLength = response.contentLength;
    
    // Decide what to do based on headers
    if (contentType.includes('application/json')) {
        // Small JSON, use toJSON()
        const data = await response.content.toJSON();
        return data;
    } else if (contentType.includes('image/')) {
        // Image, use toImage()
        const image = await response.content.toImage();
        return image;
    } else {
        // Large file, save to disk
        const filename = `download_${Date.now()}`;
        await response.content.toFile(`~/Downloads/${filename}`);
        return filename;
    }
}
```

## How It Works

### Without Early Resolution (Default)

```
1. await request() starts
2. [HTTP connection established]
3. [Headers received]
4. [Full download to temp file: 0% ... 100%]
5. await request() resolves ← You get response here
6. response.content.toFile() ← Instant file move
```

### With Early Resolution (earlyResolve: true)

```
1. await request() starts
2. [HTTP connection established]
3. [Headers received]
4. await request() resolves ← You get response here (immediately!)
5. [Download continues in background: 0% ... 100%]
6. response.content.toFile() ← Waits for download, then moves file
   └─ If download not done: waits
   └─ If download done: instant file move
```

## Important Notes

### 1. Download Continues in Background

When `earlyResolve: true`, the promise resolves immediately but the download continues in the background. The download will complete even if you don't call `toFile()` or other content methods.

### 2. Content Methods Wait for Completion

All content access methods wait for the download to complete:

```typescript
const response = await request({ ..., earlyResolve: true });
// ↑ Resolves immediately with headers

await response.content.toFile('...');    // Waits for download
await response.content.toJSON();         // Waits for download
await response.content.toImage();        // Waits for download
await response.content.toString();       // Waits for download
```

### 3. Cancellation

You can cancel the download after inspecting headers:

```typescript
const response = await request({
    method: 'GET',
    url: '...',
    earlyResolve: true,
    tag: 'my-download'
});

if (response.contentLength > MAX_SIZE) {
    cancel('my-download');  // Cancels background download
}
```

### 4. GET Requests Only

Currently, early resolution only works with GET requests. Other HTTP methods (POST, PUT, DELETE) will ignore the `earlyResolve` option.

### 5. Memory Efficiency Maintained

Even with early resolution, downloads still stream to a temp file (not loaded into memory). This maintains the memory efficiency of the streaming download feature.

## Configuration Options

### earlyResolve

- **Type:** `boolean`
- **Default:** `false`
- **Platform:** iOS only
- **Description:** Resolve the request promise when headers arrive, before download completes

```typescript
{
    earlyResolve: true  // Resolve on headers, download continues
}
```

### downloadSizeThreshold

- **Type:** `number` (bytes)
- **Default:** `1048576` (1 MB)
- **Platform:** iOS only
- **Description:** Response size threshold for file download vs memory loading

```typescript
{
    downloadSizeThreshold: 5 * 1024 * 1024  // 5 MB threshold
}
```

Responses larger than this will be downloaded to temp file (memory efficient). Responses smaller will be loaded into memory (faster for small responses).

## Comparison with Android

Android's `ResponseBody` naturally provides this behavior:
- The request completes immediately when headers arrive
- The body stream is available but not consumed
- Calling methods like `toFile()` consumes the stream

iOS with `earlyResolve: true` mimics this behavior:
- The request resolves when headers arrive
- The download continues in background
- Calling methods like `toFile()` waits for completion

This makes the iOS and Android APIs more consistent when using `earlyResolve: true`.

## Error Handling

If the download fails after headers are received:

```typescript
try {
    const response = await request({
        method: 'GET',
        url: '...',
        earlyResolve: true
    });
    
    console.log('Headers OK:', response.statusCode);
    
    // If download fails after headers, toFile() will throw
    await response.content.toFile('...');
    
} catch (error) {
    console.error('Download failed:', error);
}
```

## Performance Considerations

### When to Use Early Resolution

✅ **Good use cases:**
- Large downloads where you want to check headers first
- Conditional downloads based on content type or size
- Downloads where user might cancel based on file size
- APIs that return metadata in headers (file size, checksum, etc.)

❌ **Not recommended:**
- Small API responses (< 1MB) where early resolution adds complexity
- Requests where you always need the full content
- Simple requests where you don't inspect headers

### Performance Impact

Early resolution has minimal performance impact:
- No additional network requests
- No memory overhead
- Download happens at the same speed
- Slight overhead from promise/callback management (negligible)

## Example: Download Manager with Early Resolution

```typescript
class DownloadManager {
    async download(url: string, destination: string) {
        try {
            // Get headers first
            const response = await request({
                method: 'GET',
                url,
                earlyResolve: true,
                tag: url,
                onProgress: (current, total) => {
                    this.updateProgress(url, current, total);
                }
            });
            
            // Validate headers
            if (response.statusCode !== 200) {
                throw new Error(`HTTP ${response.statusCode}`);
            }
            
            const fileSize = response.contentLength;
            const contentType = response.headers['Content-Type'];
            
            console.log(`Downloading ${fileSize} bytes (${contentType})`);
            
            // Check storage space
            if (fileSize > this.getAvailableSpace()) {
                cancel(url);
                throw new Error('Insufficient storage space');
            }
            
            // Proceed with download
            const file = await response.content.toFile(destination);
            console.log('Downloaded:', file.path);
            
            return file;
            
        } catch (error) {
            console.error('Download failed:', error);
            throw error;
        }
    }
    
    private updateProgress(url: string, current: number, total: number) {
        const percent = (current / total * 100).toFixed(1);
        console.log(`[${url}] ${percent}%`);
    }
    
    private getAvailableSpace(): number {
        // Implementation depends on platform
        return 1024 * 1024 * 1024; // Example: 1GB
    }
}
```

## Future Enhancements

Potential improvements for future versions:

1. **Streaming to custom destination:** Start writing to destination file immediately instead of temp file
2. **Partial downloads:** Resume interrupted downloads
3. **Multiple callbacks:** Progress callbacks that fire at different stages
4. **Background downloads:** Downloads that survive app termination (iOS background tasks)

## See Also

- [iOS Streaming Implementation](./IOS_STREAMING_IMPLEMENTATION.md)
- [iOS/Android Behavior Parity](./IOS_ANDROID_BEHAVIOR_PARITY.md)
- [Usage Examples](./USAGE_EXAMPLE.md)
