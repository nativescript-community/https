<template>
    <Page>
        <ActionBar title="Early Resolution (iOS)" backgroundColor="#42b883" color="white">
            <NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="$navigateBack()" />
        </ActionBar>
        <GridLayout rows="auto,*">
            <StackLayout row="0" class="p-10 bg-light">
                <Label class="h3" text="Early Resolution Feature" />
                <Label class="text-muted" text="iOS only: Resolve when headers arrive, before download completes" textWrap="true" />
                <Label class="text-warning mt-5" text="⚠️ earlyResolve works only on iOS" textWrap="true" />
            </StackLayout>
            <ScrollView row="1">
                <StackLayout class="p-20">
                    <!-- Basic Early Resolution -->
                    <Label class="h4 mt-20" text="Basic Early Resolution" />
                    <Button text="Early Resolve - Small File" @tap="testEarlyResolveSmall" class="btn btn-primary" />
                    <Button text="Early Resolve - Large File" @tap="testEarlyResolveLarge" class="btn btn-primary" />
                    <Button text="Early Resolve - Check Headers" @tap="testEarlyResolveHeaders" class="btn btn-primary" />
                    
                    <!-- Cancellation Tests -->
                    <Label class="h4 mt-20" text="Cancellation Based on Headers" />
                    <Button text="Cancel - Wrong Status Code" @tap="testCancelWrongStatus" class="btn btn-primary" />
                    <Button text="Cancel - File Too Large" @tap="testCancelTooLarge" class="btn btn-primary" />
                    <Button text="Cancel - Wrong Content Type" @tap="testCancelWrongContentType" class="btn btn-primary" />
                    <Button text="Cancel - After Headers" @tap="testCancelAfterHeaders" class="btn btn-primary" />
                    
                    <!-- Progress with Early Resolution -->
                    <Label class="h4 mt-20" text="Progress with Early Resolution" />
                    <Button text="Progress - Early Resolve" @tap="testProgressEarlyResolve" class="btn btn-primary" />
                    <Progress v-if="showProgress" :value="progress" maxValue="100" class="mt-10" />
                    <Label v-if="showProgress" :text="`Progress: ${progress.toFixed(1)}%`" class="text-center" />
                    
                    <!-- Comparison Tests -->
                    <Label class="h4 mt-20" text="Comparison: Early vs Normal" />
                    <Button text="Compare Resolution Times" @tap="testCompareResolution" class="btn btn-primary" />
                    
                    <!-- Advanced Tests -->
                    <Label class="h4 mt-20" text="Advanced Scenarios" />
                    <Button text="Multiple Early Resolve Requests" @tap="testMultipleEarlyResolve" class="btn btn-primary" />
                    <Button text="Early Resolve + toFile()" @tap="testEarlyResolveToFile" class="btn btn-primary" />
                    <Button text="Early Resolve + toJSON()" @tap="testEarlyResolveToJSON" class="btn btn-primary" />
                    
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
import * as fs from '@nativescript/core/file-system';
import { Device } from '@nativescript/core';

export default Vue.extend({
    data() {
        return {
            results: 'Test results will appear here...',
            showProgress: false,
            progress: 0
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
        
        async testEarlyResolveSmall() {
            if (!this.isIOS()) {
                this.log('⚠️ Early resolution is iOS-only feature');
                return;
            }
            
            try {
                this.log('Testing early resolve with small file...');
                const startTime = Date.now();
                
                const response = await Https.request({
                    url: 'https://httpbin.org/bytes/10240', // 10KB
                    method: 'GET',
                    earlyResolve: true,
                    tag: 'early-small'
                });
                
                const resolveTime = Date.now() - startTime;
                this.log(`✓ Request resolved in ${resolveTime}ms`);
                this.log(`Status: ${response.statusCode}`);
                this.log(`Content-Length: ${response.contentLength} bytes`);
                
                // Wait for download to complete
                this.log('Waiting for download to complete...');
                const data = await response.content.toArrayBuffer();
                const totalTime = Date.now() - startTime;
                
                this.log(`✓ Download complete in ${totalTime}ms`);
                this.log(`Downloaded: ${data.byteLength} bytes`);
            } catch (error) {
                this.log(`✗ Test failed: ${error}`);
            }
        },
        
        async testEarlyResolveLarge() {
            if (!this.isIOS()) {
                this.log('⚠️ Early resolution is iOS-only feature');
                return;
            }
            
            try {
                this.log('Testing early resolve with large file...');
                const startTime = Date.now();
                
                const response = await Https.request({
                    url: 'https://httpbin.org/bytes/1048576', // 1MB
                    method: 'GET',
                    earlyResolve: true,
                    tag: 'early-large'
                });
                
                const resolveTime = Date.now() - startTime;
                this.log(`✓ Request resolved in ${resolveTime}ms (headers only)`);
                this.log(`Status: ${response.statusCode}`);
                this.log(`Content-Length: ${response.contentLength} bytes`);
                this.log(`Content-Type: ${response.headers['Content-Type']}`);
                
                // Wait for download to complete
                this.log('Waiting for full download...');
                const data = await response.content.toArrayBuffer();
                const totalTime = Date.now() - startTime;
                
                this.log(`✓ Download complete in ${totalTime}ms`);
                this.log(`Downloaded: ${data.byteLength} bytes`);
                this.log(`Overhead: Headers in ${resolveTime}ms, Full download in ${totalTime}ms`);
            } catch (error) {
                this.log(`✗ Test failed: ${error}`);
            }
        },
        
        async testEarlyResolveHeaders() {
            if (!this.isIOS()) {
                this.log('⚠️ Early resolution is iOS-only feature');
                return;
            }
            
            try {
                this.log('Testing header inspection with early resolve...');
                
                const response = await Https.request({
                    url: 'https://httpbin.org/response-headers',
                    method: 'GET',
                    params: {
                        'X-Custom': 'test-value',
                        'X-API-Version': '2.0'
                    },
                    earlyResolve: true
                });
                
                this.log(`✓ Headers received immediately`);
                this.log(`Status: ${response.statusCode}`);
                this.log(`Content-Length: ${response.contentLength}`);
                this.log(`All headers: ${JSON.stringify(response.headers, null, 2)}`);
                
                // Complete the request
                const data = await response.content.toString();
                this.log(`✓ Response body: ${data.substring(0, 200)}...`);
            } catch (error) {
                this.log(`✗ Test failed: ${error}`);
            }
        },
        
        async testCancelWrongStatus() {
            if (!this.isIOS()) {
                this.log('⚠️ Early resolution is iOS-only feature');
                return;
            }
            
            try {
                this.log('Testing cancellation on wrong status code...');
                
                const response = await Https.request({
                    url: 'https://httpbin.org/status/404',
                    method: 'GET',
                    earlyResolve: true,
                    tag: 'cancel-status'
                });
                
                this.log(`Headers received - Status: ${response.statusCode}`);
                
                if (response.statusCode !== 200) {
                    this.log(`✓ Wrong status code detected, cancelling...`);
                    Https.cancelRequest('cancel-status');
                    this.log(`✓ Request cancelled successfully`);
                    return;
                }
                
                this.log(`Should not reach here`);
            } catch (error) {
                this.log(`✓ Request cancelled: ${error}`);
            }
        },
        
        async testCancelTooLarge() {
            if (!this.isIOS()) {
                this.log('⚠️ Early resolution is iOS-only feature');
                return;
            }
            
            try {
                this.log('Testing cancellation if file too large...');
                const MAX_SIZE = 100000; // 100KB limit
                
                const response = await Https.request({
                    url: 'https://httpbin.org/bytes/1048576', // 1MB
                    method: 'GET',
                    earlyResolve: true,
                    tag: 'cancel-size'
                });
                
                this.log(`Headers received - Size: ${response.contentLength} bytes`);
                
                if (response.contentLength > MAX_SIZE) {
                    this.log(`✓ File too large (${response.contentLength} > ${MAX_SIZE}), cancelling...`);
                    Https.cancelRequest('cancel-size');
                    this.log(`✓ Request cancelled, saved bandwidth!`);
                    return;
                }
                
                this.log(`File size acceptable, continuing...`);
            } catch (error) {
                this.log(`✓ Request cancelled: ${error}`);
            }
        },
        
        async testCancelWrongContentType() {
            if (!this.isIOS()) {
                this.log('⚠️ Early resolution is iOS-only feature');
                return;
            }
            
            try {
                this.log('Testing cancellation on wrong content type...');
                
                const response = await Https.request({
                    url: 'https://httpbin.org/html',
                    method: 'GET',
                    earlyResolve: true,
                    tag: 'cancel-type'
                });
                
                const contentType = response.headers['Content-Type'] || '';
                this.log(`Headers received - Content-Type: ${contentType}`);
                
                if (!contentType.includes('application/json')) {
                    this.log(`✓ Wrong content type, expected JSON, got ${contentType}`);
                    Https.cancelRequest('cancel-type');
                    this.log(`✓ Request cancelled`);
                    return;
                }
                
                this.log(`Content type OK`);
            } catch (error) {
                this.log(`✓ Request cancelled: ${error}`);
            }
        },
        
        async testCancelAfterHeaders() {
            if (!this.isIOS()) {
                this.log('⚠️ Early resolution is iOS-only feature');
                return;
            }
            
            try {
                this.log('Testing manual cancellation after headers...');
                
                const response = await Https.request({
                    url: 'https://httpbin.org/bytes/524288', // 512KB
                    method: 'GET',
                    earlyResolve: true,
                    tag: 'cancel-manual'
                });
                
                this.log(`✓ Headers received, inspecting...`);
                this.log(`Status: ${response.statusCode}`);
                this.log(`Size: ${response.contentLength} bytes`);
                
                // Simulate user decision to cancel
                this.log(`User decided to cancel, cancelling...`);
                Https.cancelRequest('cancel-manual');
                this.log(`✓ Request cancelled after header inspection`);
            } catch (error) {
                this.log(`✓ Cancelled: ${error}`);
            }
        },
        
        async testProgressEarlyResolve() {
            if (!this.isIOS()) {
                this.log('⚠️ Early resolution is iOS-only feature');
                return;
            }
            
            try {
                this.log('Testing progress tracking with early resolve...');
                this.showProgress = true;
                this.progress = 0;
                
                const startTime = Date.now();
                
                const response = await Https.request({
                    url: 'https://httpbin.org/bytes/524288', // 512KB
                    method: 'GET',
                    earlyResolve: true,
                    tag: 'progress-early',
                    onProgress: (current, total) => {
                        this.progress = (current / total) * 100;
                        if (current === total) {
                            this.log(`Progress: 100% (${total} bytes)`);
                        }
                    }
                });
                
                const resolveTime = Date.now() - startTime;
                this.log(`✓ Headers resolved in ${resolveTime}ms`);
                this.log(`Size: ${response.contentLength} bytes`);
                this.log(`Downloading in background...`);
                
                // Wait for completion
                await response.content.toArrayBuffer();
                const totalTime = Date.now() - startTime;
                
                this.log(`✓ Download complete in ${totalTime}ms`);
                this.showProgress = false;
            } catch (error) {
                this.log(`✗ Test failed: ${error}`);
                this.showProgress = false;
            }
        },
        
        async testCompareResolution() {
            if (!this.isIOS()) {
                this.log('⚠️ Early resolution is iOS-only feature');
                return;
            }
            
            try {
                this.log('Comparing early resolve vs normal resolution...');
                const url = 'https://httpbin.org/bytes/262144'; // 256KB
                
                // Test 1: Normal resolution
                this.log('\n--- Normal Resolution ---');
                const start1 = Date.now();
                const response1 = await Https.request({
                    url,
                    method: 'GET',
                    earlyResolve: false
                });
                const time1 = Date.now() - start1;
                this.log(`Normal: Resolved in ${time1}ms`);
                this.log(`Status: ${response1.statusCode}, Size: ${response1.contentLength}`);
                
                // Test 2: Early resolution
                this.log('\n--- Early Resolution ---');
                const start2 = Date.now();
                const response2 = await Https.request({
                    url,
                    method: 'GET',
                    earlyResolve: true,
                    tag: 'compare-early'
                });
                const resolveTime = Date.now() - start2;
                this.log(`Early: Headers in ${resolveTime}ms`);
                this.log(`Status: ${response2.statusCode}, Size: ${response2.contentLength}`);
                
                await response2.content.toArrayBuffer();
                const time2 = Date.now() - start2;
                this.log(`Early: Total time ${time2}ms`);
                
                this.log(`\n--- Comparison ---`);
                this.log(`Normal resolve: ${time1}ms`);
                this.log(`Early headers: ${resolveTime}ms (${((resolveTime/time1)*100).toFixed(1)}%)`);
                this.log(`Early total: ${time2}ms`);
                this.log(`✓ Early resolve gives ~${time1-resolveTime}ms advantage for header inspection`);
            } catch (error) {
                this.log(`✗ Test failed: ${error}`);
            }
        },
        
        async testMultipleEarlyResolve() {
            if (!this.isIOS()) {
                this.log('⚠️ Early resolution is iOS-only feature');
                return;
            }
            
            try {
                this.log('Testing multiple concurrent early resolve requests...');
                
                const urls = [
                    'https://httpbin.org/bytes/10240',
                    'https://httpbin.org/bytes/20480',
                    'https://httpbin.org/bytes/30720'
                ];
                
                const promises = urls.map((url, index) => 
                    Https.request({
                        url,
                        method: 'GET',
                        earlyResolve: true,
                        tag: `multi-${index}`
                    }).then(response => {
                        this.log(`✓ Request ${index + 1} resolved: ${response.contentLength} bytes`);
                        return response;
                    })
                );
                
                const responses = await Promise.all(promises);
                this.log(`✓ All ${responses.length} requests resolved`);
                
                // Wait for all downloads
                this.log('Waiting for all downloads to complete...');
                await Promise.all(responses.map(r => r.content.toArrayBuffer()));
                this.log(`✓ All downloads complete`);
            } catch (error) {
                this.log(`✗ Test failed: ${error}`);
            }
        },
        
        async testEarlyResolveToFile() {
            if (!this.isIOS()) {
                this.log('⚠️ Early resolution is iOS-only feature');
                return;
            }
            
            try {
                this.log('Testing early resolve with toFile()...');
                
                const response = await Https.request({
                    url: 'https://httpbin.org/bytes/102400', // 100KB
                    method: 'GET',
                    earlyResolve: true,
                    tag: 'early-file'
                });
                
                this.log(`✓ Headers received`);
                this.log(`Size: ${response.contentLength} bytes`);
                
                const dir = fs.knownFolders.temp();
                const filePath = fs.path.join(dir.path, 'early-test.bin');
                
                this.log('Calling toFile()...');
                const file = await response.content.toFile(filePath);
                this.log(`✓ File saved: ${file.path}`);
                this.log(`File size: ${file.size} bytes`);
            } catch (error) {
                this.log(`✗ Test failed: ${error}`);
            }
        },
        
        async testEarlyResolveToJSON() {
            if (!this.isIOS()) {
                this.log('⚠️ Early resolution is iOS-only feature');
                return;
            }
            
            try {
                this.log('Testing early resolve with toJSON()...');
                
                const response = await Https.request({
                    url: 'https://httpbin.org/json',
                    method: 'GET',
                    earlyResolve: true,
                    tag: 'early-json'
                });
                
                this.log(`✓ Headers received`);
                this.log(`Status: ${response.statusCode}`);
                this.log(`Content-Type: ${response.headers['Content-Type']}`);
                
                this.log('Calling toJSON()...');
                const json = await response.content.toJSON();
                this.log(`✓ JSON parsed: ${JSON.stringify(json).substring(0, 200)}...`);
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
