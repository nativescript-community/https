<template>
    <Page>
        <ActionBar title="Advanced Features" backgroundColor="#42b883" color="white">
            <NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="$navigateBack()" />
        </ActionBar>
        <GridLayout rows="auto,*">
            <StackLayout row="0" class="p-10 bg-light">
                <Label class="h3" text="Advanced Features & Scenarios" />
                <Label class="text-muted" text="Test interceptors, custom configurations, and complex scenarios" textWrap="true" />
            </StackLayout>
            <ScrollView row="1">
                <StackLayout class="p-20">
                    <!-- Network Interceptors -->
                    <Label class="h4 mt-20" text="Network Interceptors" />
                    <Button text="Add Network Interceptor" @tap="testAddInterceptor" class="btn btn-primary" />
                    <Button text="Test with Interceptor" @tap="testWithInterceptor" class="btn btn-primary" />
                    <Label class="text-muted mt-5" text="Note: Interceptor implementation varies by platform" textWrap="true" />
                    
                    <!-- Request Tagging -->
                    <Label class="h4 mt-20" text="Request Tagging & Management" />
                    <Button text="Tagged Requests" @tap="testTaggedRequests" class="btn btn-primary" />
                    <Button text="Multiple Tags" @tap="testMultipleTags" class="btn btn-primary" />
                    <Button text="Cancel by Tag" @tap="testCancelByTag" class="btn btn-primary" />
                    
                    <!-- Custom Headers -->
                    <Label class="h4 mt-20" text="Custom Headers & Configuration" />
                    <Button text="Complex Custom Headers" @tap="testComplexHeaders" class="btn btn-primary" />
                    <Button text="Authorization Headers" @tap="testAuthHeaders" class="btn btn-primary" />
                    <Button text="Multiple Content-Types" @tap="testMultipleContentTypes" class="btn btn-primary" />
                    
                    <!-- Threading Options -->
                    <Label class="h4 mt-20" text="Threading Options" />
                    <Button text="Response on Main Thread" @tap="testResponseMainThread" class="btn btn-primary" />
                    <Button text="Response on Background Thread" @tap="testResponseBackgroundThread" class="btn btn-primary" />
                    <Button text="Progress on Main Thread" @tap="testProgressMainThread" class="btn btn-primary" />
                    
                    <!-- Large Response Handling (Android) -->
                    <Label class="h4 mt-20" text="Large Response (Android)" />
                    <Button text="Test allowLargeResponse" @tap="testAllowLargeResponse" class="btn btn-primary" />
                    <Label class="text-muted mt-5" text="Android only: allowLargeResponse option" textWrap="true" />
                    
                    <!-- Complex Scenarios -->
                    <Label class="h4 mt-20" text="Complex Scenarios" />
                    <Button text="Chained Requests" @tap="testChainedRequests" class="btn btn-primary" />
                    <Button text="Parallel Requests" @tap="testParallelRequests" class="btn btn-primary" />
                    <Button text="Sequential API Calls" @tap="testSequentialAPIs" class="btn btn-primary" />
                    <Button text="Retry Logic" @tap="testRetryLogic" class="btn btn-primary" />
                    
                    <!-- Performance Tests -->
                    <Label class="h4 mt-20" text="Performance Tests" />
                    <Button text="Concurrent Requests (10)" @tap="testConcurrent10" class="btn btn-primary" />
                    <Button text="Rapid Fire Requests" @tap="testRapidFire" class="btn btn-primary" />
                    <Button text="Memory Stress Test" @tap="testMemoryStress" class="btn btn-primary" />
                    
                    <!-- Edge Cases -->
                    <Label class="h4 mt-20" text="Edge Cases & Exotic Scenarios" />
                    <Button text="Mixed HTTP Methods" @tap="testMixedMethods" class="btn btn-primary" />
                    <Button text="Unicode & Special Characters" @tap="testUnicodeData" class="btn btn-primary" />
                    <Button text="Very Long URL" @tap="testLongURL" class="btn btn-primary" />
                    
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
        
        testAddInterceptor() {
            try {
                this.log('Adding network interceptor...');
                this.log('Note: Implementation varies by platform');
                
                // Basic interceptor example
                // Actual implementation depends on platform
                this.log('✓ Interceptor concept demonstrated');
                this.log('Platform-specific implementation required');
            } catch (error) {
                this.log(`Error: ${error}`);
            }
        },
        
        async testWithInterceptor() {
            try {
                this.log('Testing request with interceptor...');
                
                const response = await Https.request({
                    url: 'https://httpbin.org/get',
                    method: 'GET'
                });
                
                this.log(`✓ Request completed`);
                this.log(`Status: ${response.statusCode}`);
                this.log(`Interceptor would process this request`);
            } catch (error) {
                this.log(`Error: ${error}`);
            }
        },
        
        async testTaggedRequests() {
            try {
                this.log('Testing tagged requests...');
                
                const tags = ['request-1', 'request-2', 'request-3'];
                const promises = tags.map(tag => 
                    Https.request({
                        url: 'https://httpbin.org/get',
                        method: 'GET',
                        tag
                    })
                );
                
                const responses = await Promise.all(promises);
                this.log(`✓ All ${responses.length} tagged requests completed`);
                
                responses.forEach((response, index) => {
                    this.log(`  ${tags[index]}: ${response.statusCode}`);
                });
            } catch (error) {
                this.log(`Error: ${error}`);
            }
        },
        
        async testMultipleTags() {
            try {
                this.log('Testing multiple simultaneous tagged requests...');
                
                const count = 5;
                const promises = [];
                
                for (let i = 1; i <= count; i++) {
                    promises.push(
                        Https.request({
                            url: `https://httpbin.org/get?id=${i}`,
                            method: 'GET',
                            tag: `multi-tag-${i}`
                        })
                    );
                }
                
                const results = await Promise.all(promises);
                this.log(`✓ All ${count} tagged requests completed`);
            } catch (error) {
                this.log(`Error: ${error}`);
            }
        },
        
        async testCancelByTag() {
            try {
                this.log('Testing cancellation by tag...');
                
                const promise = Https.request({
                    url: 'https://httpbin.org/delay/5',
                    method: 'GET',
                    tag: 'cancel-test',
                    timeout: 10
                });
                
                setTimeout(() => {
                    this.log('Cancelling tagged request...');
                    Https.cancelRequest('cancel-test');
                }, 1000);
                
                await promise;
                this.log('✗ Should have been cancelled');
            } catch (error) {
                this.log(`✓ Tagged request cancelled: ${error}`);
            }
        },
        
        async testComplexHeaders() {
            try {
                this.log('Testing complex custom headers...');
                
                const response = await Https.request({
                    url: 'https://httpbin.org/get',
                    method: 'GET',
                    headers: {
                        'X-Custom-Header-1': 'value1',
                        'X-Custom-Header-2': 'value2',
                        'X-API-Key': 'secret-key-123',
                        'X-Request-ID': `req-${Date.now()}`,
                        'X-Client-Version': '1.0.0',
                        'X-Platform': Device.os,
                        'Accept': 'application/json',
                        'Accept-Language': 'en-US',
                        'User-Agent': 'NativeScript-HTTPS-Plugin/1.0'
                    }
                });
                
                this.log(`✓ Complex headers sent`);
                const data = response.content.toJSON();
                this.log(`Headers received: ${JSON.stringify(data.headers).substring(0, 200)}...`);
            } catch (error) {
                this.log(`Error: ${error}`);
            }
        },
        
        async testAuthHeaders() {
            try {
                this.log('Testing authorization headers...');
                
                const response = await Https.request({
                    url: 'https://httpbin.org/bearer',
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer test-token-12345'
                    }
                });
                
                this.log(`✓ Auth headers sent`);
                this.log(`Status: ${response.statusCode}`);
                const data = response.content.toJSON();
                this.log(`Token: ${data.token}`);
            } catch (error) {
                this.log(`Error: ${error}`);
            }
        },
        
        async testMultipleContentTypes() {
            try {
                this.log('Testing different content types...');
                
                const contentTypes = [
                    { type: 'application/json', data: { test: 'json' } },
                    { type: 'application/x-www-form-urlencoded', data: { test: 'form' } },
                    { type: 'text/plain', data: { test: 'text' } }
                ];
                
                for (const ct of contentTypes) {
                    const response = await Https.request({
                        url: 'https://httpbin.org/post',
                        method: 'POST',
                        headers: {
                            'Content-Type': ct.type
                        },
                        body: ct.data
                    });
                    
                    this.log(`${ct.type}: ${response.statusCode}`);
                }
                
                this.log(`✓ All content types tested`);
            } catch (error) {
                this.log(`Error: ${error}`);
            }
        },
        
        async testResponseMainThread() {
            try {
                this.log('Testing response on main thread...');
                
                const response = await Https.request({
                    url: 'https://httpbin.org/get',
                    method: 'GET',
                    responseOnMainThread: true
                });
                
                this.log(`✓ Response on main thread`);
                this.log(`Status: ${response.statusCode}`);
            } catch (error) {
                this.log(`Error: ${error}`);
            }
        },
        
        async testResponseBackgroundThread() {
            try {
                this.log('Testing response on background thread...');
                
                const response = await Https.request({
                    url: 'https://httpbin.org/get',
                    method: 'GET',
                    responseOnMainThread: false
                });
                
                this.log(`✓ Response on background thread`);
                this.log(`Status: ${response.statusCode}`);
            } catch (error) {
                this.log(`Error: ${error}`);
            }
        },
        
        async testProgressMainThread() {
            try {
                this.log('Testing progress on main thread...');
                
                const request = Https.createRequest({
                    url: 'https://httpbin.org/bytes/524288',
                    method: 'GET',
                    progressOnMainThread: true,
                    onProgress: (current, total) => {
                        if (current === total) {
                            this.log(`Progress complete: ${total} bytes`);
                        }
                    }
                });
                
                await new Promise((resolve, reject) => {
                    request.run(resolve, reject);
                });
                
                this.log(`✓ Progress on main thread`);
            } catch (error) {
                this.log(`Error: ${error}`);
            }
        },
        
        async testAllowLargeResponse() {
            try {
                this.log('Testing allowLargeResponse (Android only)...');
                this.log(`Platform: ${Device.os}`);
                
                const response = await Https.request({
                    url: 'https://httpbin.org/bytes/1048576',
                    method: 'GET',
                    allowLargeResponse: true
                });
                
                this.log(`✓ Large response handled`);
                this.log(`Size: ${response.contentLength} bytes`);
                
                if (Device.os === 'Android') {
                    this.log(`allowLargeResponse option used`);
                } else {
                    this.log(`Note: Option is Android-specific`);
                }
            } catch (error) {
                this.log(`Error: ${error}`);
            }
        },
        
        async testChainedRequests() {
            try {
                this.log('Testing chained requests...');
                
                // Request 1: Get UUID
                this.log('1. Getting UUID...');
                const response1 = await Https.request({
                    url: 'https://httpbin.org/uuid',
                    method: 'GET'
                });
                const uuid = response1.content.toJSON().uuid;
                this.log(`   UUID: ${uuid}`);
                
                // Request 2: Use UUID in next request
                this.log('2. Using UUID in second request...');
                const response2 = await Https.request({
                    url: 'https://httpbin.org/get',
                    method: 'GET',
                    params: { uuid }
                });
                this.log(`   Status: ${response2.statusCode}`);
                
                // Request 3: Final request with combined data
                this.log('3. Final request...');
                const response3 = await Https.request({
                    url: 'https://httpbin.org/post',
                    method: 'POST',
                    body: { uuid, timestamp: Date.now() }
                });
                this.log(`   Status: ${response3.statusCode}`);
                
                this.log(`✓ Chained requests completed`);
            } catch (error) {
                this.log(`Error: ${error}`);
            }
        },
        
        async testParallelRequests() {
            try {
                this.log('Testing parallel requests...');
                
                const urls = [
                    'https://httpbin.org/get',
                    'https://httpbin.org/uuid',
                    'https://httpbin.org/json',
                    'https://httpbin.org/user-agent',
                    'https://httpbin.org/headers'
                ];
                
                const start = Date.now();
                const promises = urls.map(url => 
                    Https.request({ url, method: 'GET' })
                );
                
                const responses = await Promise.all(promises);
                const elapsed = Date.now() - start;
                
                this.log(`✓ ${responses.length} parallel requests in ${elapsed}ms`);
                this.log(`Average: ${(elapsed / responses.length).toFixed(0)}ms per request`);
            } catch (error) {
                this.log(`Error: ${error}`);
            }
        },
        
        async testSequentialAPIs() {
            try {
                this.log('Testing sequential API calls...');
                
                const urls = [
                    'https://httpbin.org/get',
                    'https://httpbin.org/uuid',
                    'https://httpbin.org/json'
                ];
                
                const start = Date.now();
                
                for (let i = 0; i < urls.length; i++) {
                    const response = await Https.request({
                        url: urls[i],
                        method: 'GET'
                    });
                    this.log(`Request ${i + 1}: ${response.statusCode}`);
                }
                
                const elapsed = Date.now() - start;
                this.log(`✓ Sequential calls completed in ${elapsed}ms`);
            } catch (error) {
                this.log(`Error: ${error}`);
            }
        },
        
        async testRetryLogic() {
            try {
                this.log('Testing retry logic...');
                
                const maxRetries = 3;
                let attempt = 0;
                
                while (attempt < maxRetries) {
                    attempt++;
                    this.log(`Attempt ${attempt}/${maxRetries}...`);
                    
                    try {
                        const response = await Https.request({
                            url: 'https://httpbin.org/status/500', // Will fail
                            method: 'GET',
                            timeout: 5
                        });
                        
                        if (response.statusCode === 200) {
                            this.log(`✓ Success on attempt ${attempt}`);
                            break;
                        }
                    } catch (error) {
                        this.log(`  Attempt ${attempt} failed`);
                        
                        if (attempt === maxRetries) {
                            this.log(`✓ Max retries reached`);
                        } else {
                            await new Promise(resolve => setTimeout(resolve, 1000));
                        }
                    }
                }
            } catch (error) {
                this.log(`Error: ${error}`);
            }
        },
        
        async testConcurrent10() {
            try {
                this.log('Testing 10 concurrent requests...');
                
                const promises = [];
                for (let i = 1; i <= 10; i++) {
                    promises.push(
                        Https.request({
                            url: `https://httpbin.org/get?id=${i}`,
                            method: 'GET'
                        })
                    );
                }
                
                const start = Date.now();
                const responses = await Promise.all(promises);
                const elapsed = Date.now() - start;
                
                this.log(`✓ 10 concurrent requests in ${elapsed}ms`);
                this.log(`Average: ${(elapsed / 10).toFixed(0)}ms per request`);
            } catch (error) {
                this.log(`Error: ${error}`);
            }
        },
        
        async testRapidFire() {
            try {
                this.log('Testing rapid fire requests...');
                
                const count = 20;
                const start = Date.now();
                
                for (let i = 0; i < count; i++) {
                    await Https.request({
                        url: 'https://httpbin.org/get',
                        method: 'GET'
                    });
                }
                
                const elapsed = Date.now() - start;
                this.log(`✓ ${count} rapid requests in ${elapsed}ms`);
                this.log(`Average: ${(elapsed / count).toFixed(0)}ms per request`);
            } catch (error) {
                this.log(`Error: ${error}`);
            }
        },
        
        async testMemoryStress() {
            try {
                this.log('Testing memory stress (50 requests)...');
                this.log('This may take a moment...');
                
                const count = 50;
                const batchSize = 5;
                let completed = 0;
                
                for (let i = 0; i < count; i += batchSize) {
                    const batch = [];
                    
                    for (let j = 0; j < batchSize && (i + j) < count; j++) {
                        batch.push(
                            Https.request({
                                url: 'https://httpbin.org/bytes/10240',
                                method: 'GET'
                            })
                        );
                    }
                    
                    await Promise.all(batch);
                    completed += batch.length;
                    
                    if (completed % 10 === 0) {
                        this.log(`Progress: ${completed}/${count}`);
                    }
                }
                
                this.log(`✓ Memory stress test complete`);
                this.log(`${count} requests completed successfully`);
            } catch (error) {
                this.log(`Error: ${error}`);
            }
        },
        
        async testMixedMethods() {
            try {
                this.log('Testing mixed HTTP methods in sequence...');
                
                const requests = [
                    { method: 'GET', url: 'https://httpbin.org/get' },
                    { method: 'POST', url: 'https://httpbin.org/post', body: { test: 'data' } },
                    { method: 'PUT', url: 'https://httpbin.org/put', body: { test: 'update' } },
                    { method: 'DELETE', url: 'https://httpbin.org/delete' },
                    { method: 'PATCH', url: 'https://httpbin.org/patch', body: { test: 'patch' } }
                ];
                
                for (const req of requests) {
                    const response = await Https.request(req as any);
                    this.log(`${req.method}: ${response.statusCode}`);
                }
                
                this.log(`✓ All methods tested`);
            } catch (error) {
                this.log(`Error: ${error}`);
            }
        },
        
        async testUnicodeData() {
            try {
                this.log('Testing Unicode and special characters...');
                
                const response = await Https.request({
                    url: 'https://httpbin.org/post',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    },
                    body: {
                        english: 'Hello World',
                        chinese: '你好世界',
                        japanese: 'こんにちは世界',
                        arabic: 'مرحبا بالعالم',
                        emoji: '🌍🚀💻📱✨',
                        special: 'Ñoño, Zürich, Москва',
                        symbols: '∑ ∫ ∂ √ ∞ ≈ ≠'
                    }
                });
                
                this.log(`✓ Unicode data sent`);
                const data = response.content.toJSON();
                this.log(`Received: ${JSON.stringify(data.json).substring(0, 150)}...`);
            } catch (error) {
                this.log(`Error: ${error}`);
            }
        },
        
        async testLongURL() {
            try {
                this.log('Testing very long URL...');
                
                const params = {};
                for (let i = 0; i < 50; i++) {
                    params[`param${i}`] = `value${i}`;
                }
                
                const response = await Https.request({
                    url: 'https://httpbin.org/get',
                    method: 'GET',
                    params
                });
                
                this.log(`✓ Long URL handled`);
                this.log(`Status: ${response.statusCode}`);
                const data = response.content.toJSON();
                this.log(`Params sent: ${Object.keys(data.args).length}`);
            } catch (error) {
                this.log(`Error: ${error}`);
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
.bg-light {
    background-color: #f8f9fa;
}
</style>
