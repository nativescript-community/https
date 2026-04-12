# iOS Streaming Download Flow Diagram

## Request Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                          User Code                                   │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                │ await request({ method: 'GET', ... })
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     request.ios.ts                                   │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │ createRequest()                                                │ │
│  │   ├─ if (method === 'GET')                                     │ │
│  │   │    └─ manager.downloadToTemp(...)                         │ │
│  │   └─ else                                                      │ │
│  │        └─ manager.request(...) [old behavior]                 │ │
│  └───────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                │ downloadToTemp(...)
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                  AlamofireWrapper.swift                              │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │ downloadToTemp()                                               │ │
│  │   ├─ Create temp file path: UUID().uuidString                 │ │
│  │   ├─ session.download(request, to: tempPath)                  │ │
│  │   └─ Return immediately with (response, tempPath, error)      │ │
│  └───────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                │ Download complete
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        Network Layer                                 │
│                                                                      │
│  Server ─HTTP─> Alamofire ─chunks─> Temp File                      │
│                                      /tmp/B4F7C2A1-...              │
│                                      │                               │
│                                      └─ 500MB saved here            │
│                                         (NOT in RAM!)                │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                │ completionHandler(response, tempPath, nil)
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     request.ios.ts                                   │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │ Success Handler                                                │ │
│  │   ├─ Create HttpsResponseLegacy(null, length, url, tempPath) │ │
│  │   │                             ^^^^ no data, just path       │ │
│  │   └─ resolve({ content, statusCode, headers, ... })          │ │
│  └───────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                │ Response object returned
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                          User Code                                   │
│                                                                      │
│  const response = await request(...)  ← Returns here!               │
│                                                                      │
│  // At this point:                                                  │
│  //  - 500MB file downloaded                                        │
│  //  - Stored in /tmp/B4F7C2A1-...                                 │
│  //  - 0MB in RAM!                                                  │
│                                                                      │
│  console.log(response.statusCode);     // 200                       │
│  console.log(response.contentLength);  // 524288000 (500MB)        │
└─────────────────────────────────────────────────────────────────────┘
```

## Processing Flow - Option 1: toFile()

```
┌─────────────────────────────────────────────────────────────────────┐
│                          User Code                                   │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                │ response.content.toFile('~/Videos/video.mp4')
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                  HttpsResponseLegacy.toFile()                        │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │ if (this.tempFilePath) {                                       │ │
│  │    ├─ Get temp URL: /tmp/B4F7C2A1-...                         │ │
│  │    ├─ Get dest URL: ~/Videos/video.mp4                        │ │
│  │    └─ fileManager.moveItem(tempURL, destURL)                  │ │
│  │         └─ File system operation - INSTANT, 0 RAM!            │ │
│  │ }                                                               │ │
│  └───────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                │ File moved
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        File System                                   │
│                                                                      │
│  Before:                         After:                              │
│  /tmp/B4F7C2A1-... (500MB)      ~/Videos/video.mp4 (500MB)         │
│  ✓ exists                        ✓ exists                           │
│                                                                      │
│  Operation: mv (move)            RAM Used: 0 MB                     │
│  Time: < 1ms                     Data Copied: 0 bytes               │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                │ File.fromPath(...)
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                          User Code                                   │
│                                                                      │
│  const file = await response.content.toFile(...)  ← Returns here!   │
│                                                                      │
│  // File is now at destination                                      │
│  // 0 MB RAM used during operation                                  │
│  // Instant operation (just metadata change)                        │
└─────────────────────────────────────────────────────────────────────┘
```

## Processing Flow - Option 2: toJSON()

```
┌─────────────────────────────────────────────────────────────────────┐
│                          User Code                                   │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                │ response.content.toJSON()
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                  HttpsResponseLegacy.toJSON()                        │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │ if (!this.ensureDataLoaded()) return null;                     │ │
│  │   └─ ensureDataLoaded():                                       │ │
│  │       ├─ if (this.data) return true  // Already loaded         │ │
│  │       └─ if (this.tempFilePath)                                │ │
│  │            └─ this.data = NSData.dataWithContentsOfFile(...)   │ │
│  │                 └─ LOADS 500MB into RAM now                    │ │
│  └───────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                │ Data loaded
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        Memory                                        │
│                                                                      │
│  Before: 10MB RAM used                                              │
│  After:  510MB RAM used (500MB data + 10MB app)                    │
│                                                                      │
│  File: /tmp/B4F7C2A1-... still exists                              │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                │ Continue toJSON()
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                  HttpsResponseLegacy.toJSON()                        │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │ const data = nativeToObj(this.data, encoding);                 │ │
│  │ this.jsonResponse = parseJSON(data);                           │ │
│  │ return this.jsonResponse;                                      │ │
│  └───────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                │ JSON parsed
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                          User Code                                   │
│                                                                      │
│  const json = response.content.toJSON()  ← Returns here!            │
│                                                                      │
│  // Data was loaded from temp file                                  │
│  // Now in RAM as JSON object                                       │
│  // Temp file still exists (will be cleaned by OS)                 │
└─────────────────────────────────────────────────────────────────────┘
```

## Comparison: Old vs New

### Old Behavior (In-Memory)

```
┌──────────────────┐
│ await request()  │
└────────┬─────────┘
         │ Downloads 500MB into NSData
         ▼
┌────────────────────┐
│ 500MB in RAM      │ ← Problem: Large memory usage
└────────┬───────────┘
         │
         ▼
┌──────────────────┐
│ toFile() called  │
└────────┬─────────┘
         │ Writes NSData to disk
         ▼
┌────────────────────┐
│ 500MB in RAM      │ ← Still in memory!
│ 500MB on disk     │
└───────────────────┘
```

### New Behavior (Streaming)

```
┌──────────────────┐
│ await request()  │
└────────┬─────────┘
         │ Downloads 500MB to temp file
         ▼
┌────────────────────┐
│ 0MB in RAM        │ ← Solution: No memory usage
│ 500MB in /tmp     │
└────────┬───────────┘
         │
         ▼
┌──────────────────┐
│ toFile() called  │
└────────┬─────────┘
         │ Moves temp file (instant)
         ▼
┌────────────────────┐
│ 0MB in RAM        │ ← Still 0 memory!
│ 500MB at dest     │
└───────────────────┘
```

## Memory Usage Timeline

```
Old Behavior:
Time ────────────────────────────────────────────────────────────►
RAM  │
     │      ┌─────────────────────────────────────────┐
500MB│      │ NSData in memory                        │
     │      │                                         │
     │    ┌─┘                                         └─┐
     │    │ Downloading...                              │ After toFile()
  0MB│────┘                                             └──────────►
     request()                                         cleanup


New Behavior:
Time ────────────────────────────────────────────────────────────►
RAM  │
     │      ┌─┐                                         ┌─┐
 2MB │      │ │ Buffer during download                  │ │ If toJSON()
     │      │ │                                         │ │
     │    ┌─┘ └─┐                                     ┌─┘ └─┐
  0MB│────┘     └─────────────────────────────────────┘     └────►
     request()  done                                 toFile()
     
     Temp file: [================================500MB=========]
                └─────────────── on disk ─────────────────────┘
```

## Key Differences Summary

| Aspect | Old | New |
|--------|-----|-----|
| **Download destination** | NSData in RAM | Temp file on disk |
| **Memory during download** | Growing to full size | ~2MB buffer |
| **Memory after download** | Full file size | 0 MB |
| **toFile() operation** | Write from RAM | Move file (instant) |
| **toFile() memory** | 0 (already in RAM) | 0 (file operation) |
| **toJSON() operation** | Parse from RAM | Load → parse |
| **toJSON() memory** | 0 (already in RAM) | Full file size |
| **Temp file cleanup** | N/A | Automatic by OS |
| **Large file support** | Limited by RAM | Limited by disk |
| **OOM risk** | High | None |
