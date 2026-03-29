# Streaming Downloads Usage Guide

## Overview

The iOS implementation now supports memory-efficient streaming downloads using Alamofire's download API. This feature writes data directly to disk without loading the entire response into memory, making it ideal for large files.

## Basic Usage

### Option 1: Using downloadFilePath (Recommended for Large Files)

```typescript
import { request } from '@nativescript-community/https';

const response = await request({
    method: 'GET',
    url: 'https://example.com/large-video.mp4',
    downloadFilePath: '~/Documents/video.mp4', // Stream directly to this path
    onProgress: (current, total) => {
        const percent = (current / total * 100).toFixed(1);
        console.log(`Download progress: ${percent}%`);
    }
});

console.log('Download complete!');
console.log('Status:', response.statusCode);
console.log('Headers:', response.headers);
```

### Option 2: Traditional Method (Loads into Memory)

```typescript
import { request } from '@nativescript-community/https';

const response = await request({
    method: 'GET',
    url: 'https://example.com/image.jpg',
    useLegacy: true
});

// This loads the entire response into memory first
const file = await response.content.toFile('~/Documents/image.jpg');
console.log('File saved to:', file.path);
```

## Comparison

### Memory Usage

| Method | Memory Usage | Best For |
|--------|--------------|----------|
| `downloadFilePath` | Minimal (streaming) | Large files (>10MB) |
| `toFile()` | Full file size | Small files (<10MB) |

### Performance Metrics

**Example: Downloading a 100MB file**

- **With `downloadFilePath`:** ~5-10MB RAM usage
- **With `toFile()`:** ~100MB+ RAM usage

## Advanced Examples

### Download with Custom Headers

```typescript
const response = await request({
    method: 'GET',
    url: 'https://api.example.com/protected/file.zip',
    headers: {
        'Authorization': 'Bearer your-token-here',
        'Accept': 'application/octet-stream'
    },
    downloadFilePath: '~/Downloads/file.zip',
    onProgress: (current, total) => {
        // Update UI progress bar
        updateProgressBar(current, total);
    }
});
```

### Download with SSL Pinning

```typescript
import { enableSSLPinning, request } from '@nativescript-community/https';

// First, enable SSL pinning
enableSSLPinning({
    host: 'secure.example.com',
    certificate: 'path/to/certificate.cer',
    allowInvalidCertificates: false,
    validatesDomainName: true
});

// Then make the request
const response = await request({
    method: 'GET',
    url: 'https://secure.example.com/sensitive-data.zip',
    downloadFilePath: '~/Documents/data.zip'
});
```

### Download with Retry Logic

```typescript
async function downloadWithRetry(url: string, path: string, maxRetries: number = 3): Promise<void> {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            console.log(`Download attempt ${attempt} of ${maxRetries}`);
            
            const response = await request({
                method: 'GET',
                url: url,
                downloadFilePath: path,
                timeout: 60, // 60 seconds
                onProgress: (current, total) => {
                    console.log(`Progress: ${(current/total*100).toFixed(1)}%`);
                }
            });
            
            if (response.statusCode === 200) {
                console.log('Download successful!');
                return;
            }
            
            throw new Error(`HTTP ${response.statusCode}`);
            
        } catch (error) {
            console.error(`Attempt ${attempt} failed:`, error);
            
            if (attempt === maxRetries) {
                throw new Error(`Download failed after ${maxRetries} attempts: ${error}`);
            }
            
            // Wait before retrying (exponential backoff)
            await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
        }
    }
}

// Usage
try {
    await downloadWithRetry(
        'https://example.com/large-file.zip',
        '~/Downloads/file.zip'
    );
} catch (error) {
    console.error('Download failed:', error);
}
```

### Download Multiple Files Concurrently

```typescript
import { request } from '@nativescript-community/https';

interface DownloadTask {
    url: string;
    path: string;
    name: string;
}

async function downloadMultiple(tasks: DownloadTask[]): Promise<void> {
    const downloads = tasks.map(task => 
        request({
            method: 'GET',
            url: task.url,
            downloadFilePath: task.path,
            onProgress: (current, total) => {
                console.log(`${task.name}: ${(current/total*100).toFixed(1)}%`);
            }
        }).then(response => {
            console.log(`${task.name} completed (${response.statusCode})`);
            return { task, response };
        }).catch(error => {
            console.error(`${task.name} failed:`, error);
            return { task, error };
        })
    );
    
    const results = await Promise.all(downloads);
    
    const successful = results.filter(r => !r.error).length;
    const failed = results.filter(r => r.error).length;
    
    console.log(`\nDownload summary: ${successful} successful, ${failed} failed`);
}

// Usage
await downloadMultiple([
    { url: 'https://example.com/file1.zip', path: '~/Downloads/file1.zip', name: 'File 1' },
    { url: 'https://example.com/file2.zip', path: '~/Downloads/file2.zip', name: 'File 2' },
    { url: 'https://example.com/file3.zip', path: '~/Downloads/file3.zip', name: 'File 3' }
]);
```

## Best Practices

### 1. Always Use Streaming for Large Files

```typescript
// ❌ Bad - Loads entire file into memory
const response = await request({ url: largeFileUrl });
await response.content.toFile(path);

// ✅ Good - Streams directly to disk
const response = await request({ 
    url: largeFileUrl,
    downloadFilePath: path 
});
```

### 2. Handle Progress Events

```typescript
let lastUpdate = 0;

const response = await request({
    url: fileUrl,
    downloadFilePath: path,
    onProgress: (current, total) => {
        const now = Date.now();
        // Update UI at most once per second
        if (now - lastUpdate > 1000) {
            updateUI(current, total);
            lastUpdate = now;
        }
    }
});
```

### 3. Set Appropriate Timeouts

```typescript
// For large files, increase timeout
const response = await request({
    url: veryLargeFileUrl,
    downloadFilePath: path,
    timeout: 300 // 5 minutes for very large files
});
```

### 4. Clean Up on Errors

```typescript
import { File } from '@nativescript/core';

const filePath = '~/Downloads/file.zip';

try {
    await request({
        url: fileUrl,
        downloadFilePath: filePath
    });
} catch (error) {
    // Clean up partial download
    try {
        const file = File.fromPath(filePath);
        if (file.exists) {
            file.remove();
        }
    } catch (cleanupError) {
        console.error('Failed to clean up:', cleanupError);
    }
    
    throw error;
}
```

## Platform Support

| Feature | iOS | Android |
|---------|-----|---------|
| Streaming downloads via `downloadFilePath` | ✅ Yes | ⚠️ Coming soon |
| Traditional `toFile()` | ✅ Yes | ✅ Yes |
| Progress tracking | ✅ Yes | ✅ Yes |

## Performance Tips

1. **Use Wi-Fi for large downloads** - Check network type before starting large downloads
2. **Implement resume capability** - For very large files, consider implementing range requests
3. **Monitor available storage** - Check disk space before starting downloads
4. **Background downloads** - Consider using background URL sessions for downloads that should continue when app is backgrounded

## Troubleshooting

### Download Fails with Timeout

```typescript
// Increase timeout for slow connections
const response = await request({
    url: fileUrl,
    downloadFilePath: path,
    timeout: 120 // 2 minutes
});
```

### Progress Not Updating

Make sure you're using the correct progress callback:

```typescript
// ✅ Correct
const response = await request({
    url: fileUrl,
    downloadFilePath: path,
    onProgress: (current, total) => {
        console.log(current, total);
    }
});
```

### File Not Found After Download

Ensure the path is writable and parent directories exist:

```typescript
import { knownFolders, path as pathModule } from '@nativescript/core';

const documentsPath = knownFolders.documents().path;
const filePath = pathModule.join(documentsPath, 'subfolder', 'file.zip');

// Directory creation is handled automatically by the download API
const response = await request({
    url: fileUrl,
    downloadFilePath: filePath
});
```

## Migration from toFile()

If you're currently using `toFile()` and want to migrate to streaming:

```typescript
// Before (loads into memory)
const response = await request({ url: fileUrl });
const file = await response.content.toFile(savePath);

// After (streaming)
const response = await request({ 
    url: fileUrl,
    downloadFilePath: savePath 
});
// File is already saved to disk
```

## Conclusion

Using `downloadFilePath` for streaming downloads is the recommended approach for any file larger than 10MB. It provides better memory efficiency, improved performance on constrained devices, and a more reliable download experience for your users.
