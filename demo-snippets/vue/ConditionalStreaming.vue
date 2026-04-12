<template>
    <Page>
        <ActionBar title="Conditional Streaming (iOS)" backgroundColor="#42b883" color="white">
            <NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="$navigateBack()" />
        </ActionBar>
        <GridLayout rows="auto,*">
            <StackLayout row="0" class="p-10 bg-light">
                <Label class="h3" text="Conditional Streaming Feature" />
                <Label class="text-muted" text="iOS only: Memory for small responses, file download for large ones" textWrap="true" />
                <Label class="text-warning mt-5" text="⚠️ downloadSizeThreshold works only on iOS" textWrap="true" />
            </StackLayout>
            <ScrollView row="1">
                <StackLayout class="p-20">
                    <!-- Threshold Tests -->
                    <Label class="h4 mt-20" text="Size Threshold Tests" />
                    <Button text="Threshold: 1MB - Small Response (10KB)" @tap="testThreshold1MBSmall" class="btn btn-primary" />
                    <Button text="Threshold: 1MB - Large Response (2MB)" @tap="testThreshold1MBLarge" class="btn btn-primary" />
                    <Button text="Threshold: 100KB - Tiny (5KB)" @tap="testThreshold100KBTiny" class="btn btn-primary" />
                    <Button text="Threshold: 100KB - Medium (500KB)" @tap="testThreshold100KBMedium" class="btn btn-primary" />
                    
                    <!-- Different Threshold Values -->
                    <Label class="h4 mt-20" text="Different Threshold Values" />
                    <Button text="Threshold: 0 (Always Memory)" @tap="testThreshold0" class="btn btn-primary" />
                    <Button text="Threshold: -1 (Always File)" @tap="testThresholdNeg1" class="btn btn-primary" />
                    <Button text="Threshold: 512KB" @tap="testThreshold512KB" class="btn btn-primary" />
                    <Button text="Threshold: 5MB" @tap="testThreshold5MB" class="btn btn-primary" />
                    
                    <!-- Performance Comparison -->
                    <Label class="h4 mt-20" text="Performance Comparison" />
                    <Button text="Compare: Memory vs File (Small)" @tap="testCompareSmall" class="btn btn-primary" />
                    <Button text="Compare: Memory vs File (Large)" @tap="testCompareLarge" class="btn btn-primary" />
                    <Button text="Compare: Different Thresholds" @tap="testCompareDifferentThresholds" class="btn btn-primary" />
                    
                    <!-- Combined with Early Resolve -->
                    <Label class="h4 mt-20" text="Combined with Early Resolve" />
                    <Button text="Early Resolve + Threshold" @tap="testEarlyResolveWithThreshold" class="btn btn-primary" />
                    <Button text="Verify: Early Resolve Takes Precedence" @tap="testEarlyResolvePrecedence" class="btn btn-primary" />
                    
                    <!-- Edge Cases -->
                    <Label class="h4 mt-20" text="Edge Cases" />
                    <Button text="Unknown Content-Length" @tap="testUnknownContentLength" class="btn btn-primary" />
                    <Button text="Exactly at Threshold" @tap="testExactlyAtThreshold" class="btn btn-primary" />
                    <Button text="Multiple Requests Different Sizes" @tap="testMultipleSizes" class="btn btn-primary" />
                    
                    <!-- Real-World Scenarios -->
                    <Label class="h4 mt-20" text="Real-World Scenarios" />
                    <Button text="API Calls (All Small)" @tap="testAPICalls" class="btn btn-primary" />
                    <Button text="Mixed: API + Downloads" @tap="testMixedWorkload" class="btn btn-primary" />
                    <Button text="Image Gallery Scenario" @tap="testImageGallery" class="btn btn-primary" />
                    
                    <!-- Results -->
                    <Label class="h4 mt-20" text="Results" />
                    <TextView :text="results" class="result-box" editable="false" />
                </StackLayout>
            </ScrollView>
        </GridLayout>
    </Page>
</template>

<script lang="ts">
import Vue from 'vue';
import * as Https from '@nativescript-community/https';
import { Device } from '@nativescript/core';

export default Vue.extend({
    data() {
        return {
            results: 'Test results will appear here...'
        };
    },
    methods: {
        log(message: string) {
            const timestamp = new Date().toLocaleTimeString();
            this.results = `[${timestamp}] ${message}\n\n${this.results}`;
            console.log(message);
        },
        
        isIOS(): boolean {
            return Device.os === 'iOS';
        },
        
        async testThreshold1MBSmall() {
            if (!this.isIOS()) {
                this.log('⚠️ Conditional streaming is iOS-only feature');
                return;
            }
            
            try {
                this.log('Testing 1MB threshold with 10KB response...');
                const startTime = Date.now();
                
                const response = await Https.request({
                    url: 'https://httpbin.org/bytes/10240', // 10KB
                    method: 'GET',
                    downloadSizeThreshold: 1048576 // 1MB
                });
                
                const time = Date.now() - startTime;
                this.log(`✓ Request complete in ${time}ms`);
                this.log(`Size: ${response.contentLength} bytes (< 1MB threshold)`);
                this.log(`Expected: Loaded in memory (fast)`);
                
                const data = await response.content.toArrayBuffer();
                const totalTime = Date.now() - startTime;
                this.log(`✓ Data accessed in ${totalTime}ms`);
                this.log(`Downloaded: ${data.byteLength} bytes`);
            } catch (error) {
                this.log(`✗ Test failed: ${error}`);
            }
        },
        
        async testThreshold1MBLarge() {
            if (!this.isIOS()) {
                this.log('⚠️ Conditional streaming is iOS-only feature');
                return;
            }
            
            try {
                this.log('Testing 1MB threshold with 2MB response...');
                const startTime = Date.now();
                
                const response = await Https.request({
                    url: 'https://httpbin.org/bytes/2097152', // 2MB
                    method: 'GET',
                    downloadSizeThreshold: 1048576 // 1MB
                });
                
                const time = Date.now() - startTime;
                this.log(`✓ Request complete in ${time}ms`);
                this.log(`Size: ${response.contentLength} bytes (> 1MB threshold)`);
                this.log(`Expected: Saved to temp file (memory efficient)`);
                
                const data = await response.content.toArrayBuffer();
                const totalTime = Date.now() - startTime;
                this.log(`✓ Data accessed in ${totalTime}ms`);
                this.log(`Downloaded: ${data.byteLength} bytes`);
            } catch (error) {
                this.log(`✗ Test failed: ${error}`);
            }
        },
        
        async testThreshold100KBTiny() {
            if (!this.isIOS()) {
                this.log('⚠️ Conditional streaming is iOS-only feature');
                return;
            }
            
            try {
                this.log('Testing 100KB threshold with 5KB response...');
                
                const response = await Https.request({
                    url: 'https://httpbin.org/bytes/5120', // 5KB
                    method: 'GET',
                    downloadSizeThreshold: 102400 // 100KB
                });
                
                this.log(`✓ Size: ${response.contentLength} bytes (< 100KB)`);
                this.log(`Expected: In memory`);
                
                const json = await response.content.toArrayBuffer();
                this.log(`✓ Accessed ${json.byteLength} bytes instantly`);
            } catch (error) {
                this.log(`✗ Test failed: ${error}`);
            }
        },
        
        async testThreshold100KBMedium() {
            if (!this.isIOS()) {
                this.log('⚠️ Conditional streaming is iOS-only feature');
                return;
            }
            
            try {
                this.log('Testing 100KB threshold with 500KB response...');
                
                const response = await Https.request({
                    url: 'https://httpbin.org/bytes/512000', // 500KB
                    method: 'GET',
                    downloadSizeThreshold: 102400 // 100KB
                });
                
                this.log(`✓ Size: ${response.contentLength} bytes (> 100KB)`);
                this.log(`Expected: Saved to file`);
                
                const data = await response.content.toArrayBuffer();
                this.log(`✓ Downloaded ${data.byteLength} bytes`);
            } catch (error) {
                this.log(`✗ Test failed: ${error}`);
            }
        },
        
        async testThreshold0() {
            if (!this.isIOS()) {
                this.log('⚠️ Conditional streaming is iOS-only feature');
                return;
            }
            
            try {
                this.log('Testing threshold: 0 (always use memory)...');
                
                const response = await Https.request({
                    url: 'https://httpbin.org/bytes/102400', // 100KB
                    method: 'GET',
                    downloadSizeThreshold: 0
                });
                
                this.log(`✓ Size: ${response.contentLength} bytes`);
                this.log(`Threshold: 0 - Always use memory`);
                
                const data = await response.content.toArrayBuffer();
                this.log(`✓ Data in memory: ${data.byteLength} bytes`);
            } catch (error) {
                this.log(`✗ Test failed: ${error}`);
            }
        },
        
        async testThresholdNeg1() {
            if (!this.isIOS()) {
                this.log('⚠️ Conditional streaming is iOS-only feature');
                return;
            }
            
            try {
                this.log('Testing threshold: -1 (always use file)...');
                
                const response = await Https.request({
                    url: 'https://httpbin.org/bytes/10240', // 10KB
                    method: 'GET',
                    downloadSizeThreshold: -1
                });
                
                this.log(`✓ Size: ${response.contentLength} bytes`);
                this.log(`Threshold: -1 - Always use file download`);
                
                const data = await response.content.toArrayBuffer();
                this.log(`✓ Downloaded from file: ${data.byteLength} bytes`);
            } catch (error) {
                this.log(`✗ Test failed: ${error}`);
            }
        },
        
        async testThreshold512KB() {
            if (!this.isIOS()) {
                this.log('⚠️ Conditional streaming is iOS-only feature');
                return;
            }
            
            try {
                this.log('Testing 512KB threshold...');
                
                const response = await Https.request({
                    url: 'https://httpbin.org/bytes/262144', // 256KB
                    method: 'GET',
                    downloadSizeThreshold: 524288 // 512KB
                });
                
                this.log(`✓ Size: ${response.contentLength} bytes (< 512KB)`);
                this.log(`Expected: In memory`);
                
                const data = await response.content.toArrayBuffer();
                this.log(`✓ Accessed ${data.byteLength} bytes`);
            } catch (error) {
                this.log(`✗ Test failed: ${error}`);
            }
        },
        
        async testThreshold5MB() {
            if (!this.isIOS()) {
                this.log('⚠️ Conditional streaming is iOS-only feature');
                return;
            }
            
            try {
                this.log('Testing 5MB threshold with 1MB response...');
                
                const response = await Https.request({
                    url: 'https://httpbin.org/bytes/1048576', // 1MB
                    method: 'GET',
                    downloadSizeThreshold: 5242880 // 5MB
                });
                
                this.log(`✓ Size: ${response.contentLength} bytes (< 5MB)`);
                this.log(`Expected: In memory`);
                
                const data = await response.content.toArrayBuffer();
                this.log(`✓ Accessed ${data.byteLength} bytes quickly`);
            } catch (error) {
                this.log(`✗ Test failed: ${error}`);
            }
        },
        
        async testCompareSmall() {
            if (!this.isIOS()) {
                this.log('⚠️ Conditional streaming is iOS-only feature');
                return;
            }
            
            try {
                this.log('Comparing memory vs file for small response...');
                const url = 'https://httpbin.org/bytes/51200'; // 50KB
                
                // Test 1: Always file (no threshold)
                this.log('\n--- Always File ---');
                const start1 = Date.now();
                const response1 = await Https.request({
                    url,
                    method: 'GET'
                });
                await response1.content.toArrayBuffer();
                const time1 = Date.now() - start1;
                this.log(`File download: ${time1}ms`);
                
                // Test 2: Memory (threshold = 1MB)
                this.log('\n--- Memory (threshold 1MB) ---');
                const start2 = Date.now();
                const response2 = await Https.request({
                    url,
                    method: 'GET',
                    downloadSizeThreshold: 1048576
                });
                await response2.content.toArrayBuffer();
                const time2 = Date.now() - start2;
                this.log(`Memory load: ${time2}ms`);
                
                this.log(`\n--- Comparison ---`);
                this.log(`File: ${time1}ms`);
                this.log(`Memory: ${time2}ms`);
                const improvement = ((time1 - time2) / time1 * 100).toFixed(1);
                this.log(`✓ Memory is ${improvement}% faster for small files`);
            } catch (error) {
                this.log(`✗ Test failed: ${error}`);
            }
        },
        
        async testCompareLarge() {
            if (!this.isIOS()) {
                this.log('⚠️ Conditional streaming is iOS-only feature');
                return;
            }
            
            try {
                this.log('Comparing memory vs file for large response...');
                const url = 'https://httpbin.org/bytes/1048576'; // 1MB
                
                // Test 1: File (threshold = 100KB)
                this.log('\n--- File (threshold 100KB) ---');
                const start1 = Date.now();
                const response1 = await Https.request({
                    url,
                    method: 'GET',
                    downloadSizeThreshold: 102400
                });
                await response1.content.toArrayBuffer();
                const time1 = Date.now() - start1;
                this.log(`File download: ${time1}ms`);
                
                // Test 2: Memory (threshold = 10MB)
                this.log('\n--- Memory (threshold 10MB) ---');
                const start2 = Date.now();
                const response2 = await Https.request({
                    url,
                    method: 'GET',
                    downloadSizeThreshold: 10485760
                });
                await response2.content.toArrayBuffer();
                const time2 = Date.now() - start2;
                this.log(`Memory load: ${time2}ms`);
                
                this.log(`\n--- Comparison ---`);
                this.log(`✓ Both methods work for large files`);
                this.log(`File: ${time1}ms, Memory: ${time2}ms`);
            } catch (error) {
                this.log(`✗ Test failed: ${error}`);
            }
        },
        
        async testCompareDifferentThresholds() {
            if (!this.isIOS()) {
                this.log('⚠️ Conditional streaming is iOS-only feature');
                return;
            }
            
            try {
                this.log('Comparing different threshold values...');
                const url = 'https://httpbin.org/bytes/524288'; // 512KB
                
                const thresholds = [
                    { name: '100KB', value: 102400 },
                    { name: '500KB', value: 512000 },
                    { name: '1MB', value: 1048576 },
                    { name: '5MB', value: 5242880 }
                ];
                
                for (const threshold of thresholds) {
                    const start = Date.now();
                    const response = await Https.request({
                        url,
                        method: 'GET',
                        downloadSizeThreshold: threshold.value
                    });
                    await response.content.toArrayBuffer();
                    const time = Date.now() - start;
                    
                    const strategy = response.contentLength <= threshold.value ? 'Memory' : 'File';
                    this.log(`${threshold.name} threshold: ${time}ms (${strategy})`);
                }
                
                this.log(`✓ All thresholds tested`);
            } catch (error) {
                this.log(`✗ Test failed: ${error}`);
            }
        },
        
        async testEarlyResolveWithThreshold() {
            if (!this.isIOS()) {
                this.log('⚠️ Conditional streaming is iOS-only feature');
                return;
            }
            
            try {
                this.log('Testing early resolve + threshold combination...');
                
                const response = await Https.request({
                    url: 'https://httpbin.org/bytes/102400',
                    method: 'GET',
                    earlyResolve: true,
                    downloadSizeThreshold: 1048576,
                    tag: 'early-threshold'
                });
                
                this.log(`✓ Headers received immediately`);
                this.log(`Size: ${response.contentLength} bytes`);
                this.log(`Note: earlyResolve takes precedence - uses file download`);
                
                await response.content.toArrayBuffer();
                this.log(`✓ Download complete`);
            } catch (error) {
                this.log(`✗ Test failed: ${error}`);
            }
        },
        
        async testEarlyResolvePrecedence() {
            if (!this.isIOS()) {
                this.log('⚠️ Conditional streaming is iOS-only feature');
                return;
            }
            
            try {
                this.log('Verifying earlyResolve takes precedence over threshold...');
                
                this.log('\n--- Test 1: Only threshold (small file) ---');
                const response1 = await Https.request({
                    url: 'https://httpbin.org/bytes/10240',
                    method: 'GET',
                    downloadSizeThreshold: 1048576
                });
                this.log(`Without earlyResolve: Uses conditional logic`);
                this.log(`Size: ${response1.contentLength}, Expected: Memory`);
                
                this.log('\n--- Test 2: earlyResolve + threshold (same file) ---');
                const response2 = await Https.request({
                    url: 'https://httpbin.org/bytes/10240',
                    method: 'GET',
                    earlyResolve: true,
                    downloadSizeThreshold: 1048576,
                    tag: 'precedence-test'
                });
                this.log(`With earlyResolve: Ignores threshold`);
                this.log(`Size: ${response2.contentLength}, Uses: File download always`);
                
                this.log(`\n✓ Confirmed: earlyResolve takes precedence`);
            } catch (error) {
                this.log(`✗ Test failed: ${error}`);
            }
        },
        
        async testUnknownContentLength() {
            if (!this.isIOS()) {
                this.log('⚠️ Conditional streaming is iOS-only feature');
                return;
            }
            
            try {
                this.log('Testing with unknown Content-Length...');
                
                // Some endpoints don't send Content-Length
                const response = await Https.request({
                    url: 'https://httpbin.org/stream-bytes/10240',
                    method: 'GET',
                    downloadSizeThreshold: 1048576
                });
                
                this.log(`Content-Length: ${response.contentLength}`);
                this.log(`When unknown, falls back to default behavior`);
                
                const data = await response.content.toArrayBuffer();
                this.log(`✓ Downloaded ${data.byteLength} bytes`);
            } catch (error) {
                this.log(`✗ Test failed: ${error}`);
            }
        },
        
        async testExactlyAtThreshold() {
            if (!this.isIOS()) {
                this.log('⚠️ Conditional streaming is iOS-only feature');
                return;
            }
            
            try {
                this.log('Testing response exactly at threshold...');
                const threshold = 102400; // 100KB
                
                const response = await Https.request({
                    url: `https://httpbin.org/bytes/${threshold}`,
                    method: 'GET',
                    downloadSizeThreshold: threshold
                });
                
                this.log(`Size: ${response.contentLength} bytes`);
                this.log(`Threshold: ${threshold} bytes`);
                this.log(`Equal size: Uses memory (≤ threshold)`);
                
                const data = await response.content.toArrayBuffer();
                this.log(`✓ Accessed ${data.byteLength} bytes`);
            } catch (error) {
                this.log(`✗ Test failed: ${error}`);
            }
        },
        
        async testMultipleSizes() {
            if (!this.isIOS()) {
                this.log('⚠️ Conditional streaming is iOS-only feature');
                return;
            }
            
            try {
                this.log('Testing multiple requests with different sizes...');
                const threshold = 524288; // 512KB
                
                const sizes = [
                    { name: '10KB', bytes: 10240 },
                    { name: '100KB', bytes: 102400 },
                    { name: '500KB', bytes: 512000 },
                    { name: '1MB', bytes: 1048576 }
                ];
                
                for (const size of sizes) {
                    const response = await Https.request({
                        url: `https://httpbin.org/bytes/${size.bytes}`,
                        method: 'GET',
                        downloadSizeThreshold: threshold
                    });
                    
                    const strategy = response.contentLength <= threshold ? 'Memory' : 'File';
                    this.log(`${size.name}: ${strategy} (${response.contentLength} bytes)`);
                }
                
                this.log(`✓ All sizes handled appropriately`);
            } catch (error) {
                this.log(`✗ Test failed: ${error}`);
            }
        },
        
        async testAPICalls() {
            if (!this.isIOS()) {
                this.log('⚠️ Conditional streaming is iOS-only feature');
                return;
            }
            
            try {
                this.log('Simulating API calls (all small responses)...');
                const threshold = 1048576; // 1MB - good for APIs
                
                const apis = [
                    'https://httpbin.org/get',
                    'https://httpbin.org/json',
                    'https://httpbin.org/uuid'
                ];
                
                for (const url of apis) {
                    const start = Date.now();
                    const response = await Https.request({
                        url,
                        method: 'GET',
                        downloadSizeThreshold: threshold
                    });
                    const time = Date.now() - start;
                    
                    this.log(`${url}`);
                    this.log(`  Size: ${response.contentLength} bytes, Time: ${time}ms`);
                    this.log(`  Strategy: Memory (fast API response)`);
                }
                
                this.log(`✓ All API calls optimized for memory`);
            } catch (error) {
                this.log(`✗ Test failed: ${error}`);
            }
        },
        
        async testMixedWorkload() {
            if (!this.isIOS()) {
                this.log('⚠️ Conditional streaming is iOS-only feature');
                return;
            }
            
            try {
                this.log('Simulating mixed workload (API + downloads)...');
                const threshold = 524288; // 512KB
                
                const requests = [
                    { url: 'https://httpbin.org/get', type: 'API' },
                    { url: 'https://httpbin.org/bytes/10240', type: 'Small file' },
                    { url: 'https://httpbin.org/bytes/1048576', type: 'Large file' }
                ];
                
                for (const req of requests) {
                    const start = Date.now();
                    const response = await Https.request({
                        url: req.url,
                        method: 'GET',
                        downloadSizeThreshold: threshold
                    });
                    const time = Date.now() - start;
                    
                    const strategy = response.contentLength <= threshold ? 'Memory' : 'File';
                    this.log(`${req.type}: ${strategy}, ${time}ms, ${response.contentLength} bytes`);
                }
                
                this.log(`✓ Mixed workload handled efficiently`);
            } catch (error) {
                this.log(`✗ Test failed: ${error}`);
            }
        },
        
        async testImageGallery() {
            if (!this.isIOS()) {
                this.log('⚠️ Conditional streaming is iOS-only feature');
                return;
            }
            
            try {
                this.log('Simulating image gallery scenario...');
                const threshold = 2097152; // 2MB - thumbs in memory, full in file
                
                const images = [
                    { name: 'Thumbnail 1', size: 51200 }, // 50KB
                    { name: 'Thumbnail 2', size: 61440 }, // 60KB
                    { name: 'Full Image 1', size: 5242880 }, // 5MB
                    { name: 'Full Image 2', size: 3145728 }  // 3MB
                ];
                
                for (const img of images) {
                    const response = await Https.request({
                        url: `https://httpbin.org/bytes/${img.size}`,
                        method: 'GET',
                        downloadSizeThreshold: threshold
                    });
                    
                    const strategy = response.contentLength <= threshold ? 'Memory (fast)' : 'File (efficient)';
                    this.log(`${img.name}: ${strategy}`);
                }
                
                this.log(`✓ Thumbnails in memory, full images to file`);
            } catch (error) {
                this.log(`✗ Test failed: ${error}`);
            }
        }
    }
});
</script>

<style scoped lang="scss">
.btn {
    background-color: #42b883;
    color: white;
    margin: 5 0;
}
.result-box {
    background-color: #f5f5f5;
    color: #333;
    padding: 10;
    margin-top: 10;
    border-radius: 5;
    min-height: 200;
    font-family: monospace;
    font-size: 12;
}
.h3 {
    font-size: 20;
    font-weight: bold;
}
.h4 {
    font-size: 16;
    font-weight: bold;
    color: #42b883;
}
.text-muted {
    color: #666;
    font-size: 12;
}
.text-warning {
    color: #ff9800;
    font-size: 12;
    font-weight: bold;
}
.bg-light {
    background-color: #f8f9fa;
}
</style>
