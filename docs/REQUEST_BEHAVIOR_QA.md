# iOS Request Behavior: Questions & Answers

This document answers common questions about how iOS requests work, especially regarding download timing and the new early resolution feature.

## Q1: Does request() wait for the full download to finish?

### Answer: **It depends on the `earlyResolve` option**

### Default Behavior (earlyResolve: false or not set)

**YES**, the request waits for the full download to complete before resolving:

```typescript
// This WAITS for full download
const response = await request({
    method: 'GET',
    url: 'https://example.com/large-file.zip'
});
// ← Download is 100% complete here
// response.content.toFile() is instant (just moves file)
```

**Timeline:**
```
1. await request() starts
2. HTTP connection established
3. Headers received
4. Download: [====================] 100%
5. await request() resolves ← HERE
6. response.content.toFile() ← Instant file move (no wait)
```

### With Early Resolution (earlyResolve: true)

**NO**, the request resolves immediately when headers arrive:

```typescript
// This resolves IMMEDIATELY when headers arrive
const response = await request({
    method: 'GET',
    url: 'https://example.com/large-file.zip',
    earlyResolve: true  // NEW FEATURE
});
// ← Headers received, download still in progress!
// response.content.toFile() WAITS for download to complete
```

**Timeline:**
```
1. await request() starts
2. HTTP connection established
3. Headers received
4. await request() resolves ← HERE (immediately!)
5. Download continues: [========>           ] 40%...
6. response.content.toFile() called
7. Download completes: [====================] 100%
8. response.content.toFile() resolves ← File moved
```

## Q2: When does toFile() wait for the download?

### Answer: **Only with earlyResolve: true**

### Default Behavior (earlyResolve: false)

`toFile()` does NOT wait because download is already complete:

```typescript
const response = await request({
    method: 'GET',
    url: 'https://example.com/video.mp4'
});
// ↑ Download finished here (100% complete)

// toFile() just moves the file (instant, no network)
await response.content.toFile('~/Videos/video.mp4');
// ↑ File system operation only (milliseconds)
```

### With Early Resolution (earlyResolve: true)

`toFile()` WAITS if download is not yet complete:

```typescript
const response = await request({
    method: 'GET',
    url: 'https://example.com/video.mp4',
    earlyResolve: true
});
// ↑ Headers received, but download still in progress

// toFile() waits for download to complete
await response.content.toFile('~/Videos/video.mp4');
// ↑ Waits for: [remaining download] + [file move]
```

## Q3: Can I cancel based on headers/status before full download?

### Answer: **YES, with earlyResolve: true**

This is the main benefit of early resolution:

```typescript
const response = await request({
    method: 'GET',
    url: 'https://example.com/huge-file.zip',
    earlyResolve: true,
    tag: 'my-download'
});

// Check headers immediately (download still in progress)
console.log('Status:', response.statusCode);
console.log('Size:', response.contentLength);
console.log('Type:', response.headers['Content-Type']);

// Cancel if not what we want
if (response.statusCode !== 200) {
    cancel('my-download');  // ← Cancels download immediately
    return;
}

if (response.contentLength > 100 * 1024 * 1024) {
    cancel('my-download');  // ← Saves bandwidth!
    return;
}

// Only proceed if headers are acceptable
await response.content.toFile('~/Downloads/file.zip');
```

## Q4: Is the download memory-efficient?

### Answer: **YES, always** (regardless of earlyResolve)

Both modes stream the download to a temp file on disk (not loaded into memory):

```typescript
// Memory-efficient (streams to temp file)
const response = await request({
    method: 'GET',
    url: 'https://example.com/500MB-video.mp4'
});
// Only ~2MB RAM used during download (not 500MB!)

// toFile() just moves the temp file (zero memory)
await response.content.toFile('~/Videos/video.mp4');
```

**Memory usage:**
- **During download:** ~2-5MB RAM (buffer only, not full file)
- **After download:** 0MB RAM (file on disk only)
- **During toFile():** 0MB RAM (file move, no copy)

## Q5: What's the difference from Android?

### Android (OkHttp with ResponseBody)

Android naturally has "early resolution" behavior:

```kotlin
// Resolves immediately when headers arrive
val response = client.newCall(request).execute()
// ↑ Headers available, body NOT consumed yet

// Check headers before consuming body
println("Status: ${response.code}")
println("Size: ${response.body?.contentLength()}")

if (response.code != 200) {
    response.close()  // Don't consume body
    return
}

// NOW consume body (streams to file)
response.body?.writeTo(file)
```

### iOS (New earlyResolve feature)

With `earlyResolve: true`, iOS behavior matches Android:

```typescript
// Resolves immediately when headers arrive
const response = await request({
    method: 'GET',
    url: '...',
    earlyResolve: true
});
// ↑ Headers available, download in background

// Check headers before consuming
console.log('Status:', response.statusCode);
console.log('Size:', response.contentLength);

if (response.statusCode !== 200) {
    cancel(tag);  // Don't consume body
    return;
}

// NOW consume body (waits for download, moves file)
await response.content.toFile('...');
```

## Summary Table

| Scenario | When request() resolves | When toFile() completes | Can cancel early? | Memory efficient? |
|----------|------------------------|-------------------------|-------------------|------------------|
| **Default iOS** | After full download | Immediately (file move) | ❌ No | ✅ Yes |
| **iOS with earlyResolve** | After headers received | After download + file move | ✅ Yes | ✅ Yes |
| **Android** | After headers received | After stream consumption | ✅ Yes | ✅ Yes |

## When to Use Early Resolution?

### ✅ Use earlyResolve: true when:

- Downloading large files (> 10MB)
- Need to validate headers/status before proceeding
- Want to cancel based on content-length or content-type
- Need to show file info (size, type) to user before downloading
- Building a download manager with conditional downloads

### ❌ Don't use earlyResolve: true when:

- Small API responses (< 1MB)
- Always need the full content (no conditional logic)
- Simple requests where you don't inspect headers
- Backward compatibility is critical

## Code Examples

### Example 1: Conditional Download

```typescript
async function conditionalDownload(url: string) {
    const response = await request({
        method: 'GET',
        url,
        earlyResolve: true,
        tag: url
    });
    
    // Check if we want this file
    const fileSize = response.contentLength;
    const contentType = response.headers['Content-Type'];
    
    if (fileSize > 50 * 1024 * 1024) {
        console.log('File too large:', fileSize);
        cancel(url);
        return null;
    }
    
    if (!contentType?.includes('application/pdf')) {
        console.log('Wrong type:', contentType);
        cancel(url);
        return null;
    }
    
    // Proceed with download
    return await response.content.toFile('~/Documents/file.pdf');
}
```

### Example 2: Progress with Early Feedback

```typescript
async function downloadWithProgress(url: string) {
    const response = await request({
        method: 'GET',
        url,
        earlyResolve: true,
        onProgress: (current, total) => {
            const percent = (current / total * 100).toFixed(1);
            console.log(`Progress: ${percent}%`);
        }
    });
    
    // Show file info immediately
    console.log(`Downloading ${response.contentLength} bytes`);
    console.log(`Type: ${response.headers['Content-Type']}`);
    
    // Now wait for completion
    return await response.content.toFile('~/Downloads/file');
}
```

### Example 3: Multiple Format Support

```typescript
async function smartDownload(url: string) {
    const response = await request({
        method: 'GET',
        url,
        earlyResolve: true
    });
    
    const type = response.headers['Content-Type'] || '';
    
    // Decide what to do based on content type
    if (type.includes('application/json')) {
        // Small JSON response
        return await response.content.toJSON();
    } else if (type.includes('image/')) {
        // Image file
        return await response.content.toImage();
    } else {
        // Large binary file
        return await response.content.toFile('~/Downloads/file');
    }
}
```

## Technical Details

### How It Works Internally

**Without earlyResolve:**
```
Alamofire DownloadRequest
  ↓
.response(queue: .main) { response in
    // Fires AFTER download completes
    completionHandler(response, tempFilePath, error)
}
  ↓
Promise resolves with tempFilePath
```

**With earlyResolve:**
```
Alamofire DownloadRequest
  ↓
.destination { temporaryURL, response in
    // Fires IMMEDIATELY when headers arrive
    headersCallback(response, contentLength)
    return (tempFileURL, options)
}
  ↓
Promise resolves immediately
  ↓
Download continues in background...
  ↓
.response(queue: .main) { response in
    // Fires AFTER download completes
    completionHandler(response, tempFilePath, error)
    // Updates HttpsResponseLegacy.tempFilePath
    // Resolves downloadCompletionPromise
}
  ↓
toFile() completes
```

### HttpsResponseLegacy Internals

```typescript
class HttpsResponseLegacy {
    private downloadCompletionPromise?: Promise<void>;
    private downloadCompleted: boolean = false;
    
    async toFile(path: string): Promise<File> {
        // Wait for download if not complete
        await this.waitForDownloadCompletion();
        
        // Now tempFilePath is available
        // Move temp file to destination
        fileManager.moveItem(this.tempFilePath, path);
    }
}
```

## See Also

- [Early Resolution Documentation](./EARLY_RESOLUTION.md) - Full feature guide
- [iOS Streaming Implementation](./IOS_STREAMING_IMPLEMENTATION.md) - Technical details
- [iOS/Android Parity](./IOS_ANDROID_BEHAVIOR_PARITY.md) - Platform comparison
