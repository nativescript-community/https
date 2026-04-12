<template>
    <Page>
        <ActionBar title="Error Handling" backgroundColor="#42b883" color="white">
            <NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="$navigateBack()" />
        </ActionBar>
        <GridLayout rows="auto,*">
            <StackLayout row="0" class="p-10 bg-light">
                <Label class="h3" text="Error Handling Tests" />
                <Label class="text-muted" text="Test various error scenarios and edge cases" textWrap="true" />
            </StackLayout>
            <ScrollView row="1">
                <StackLayout class="p-20">
                    <!-- HTTP Error Codes -->
                    <Label class="h4 mt-20" text="HTTP Error Codes" />
                    <Button text="404 Not Found" @tap="test404" class="btn btn-primary" />
                    <Button text="500 Internal Server Error" @tap="test500" class="btn btn-primary" />
                    <Button text="403 Forbidden" @tap="test403" class="btn btn-primary" />
                    <Button text="401 Unauthorized" @tap="test401" class="btn btn-primary" />
                    <Button text="400 Bad Request" @tap="test400" class="btn btn-primary" />
                    
                    <!-- Network Errors -->
                    <Label class="h4 mt-20" text="Network Errors" />
                    <Button text="Invalid URL" @tap="testInvalidURL" class="btn btn-primary" />
                    <Button text="Non-Existent Domain" @tap="testNonExistentDomain" class="btn btn-primary" />
                    <Button text="Connection Timeout" @tap="testConnectionTimeout" class="btn btn-primary" />
                    <Button text="No Internet Simulation" @tap="testNoInternet" class="btn btn-primary" />
                    
                    <!-- SSL/TLS Errors -->
                    <Label class="h4 mt-20" text="SSL/TLS Errors" />
                    <Button text="Invalid SSL Certificate" @tap="testInvalidSSL" class="btn btn-primary" />
                    <Button text="Self-Signed Certificate" @tap="testSelfSigned" class="btn btn-primary" />
                    <Button text="SSL Pinning Mismatch" @tap="testSSLPinningMismatch" class="btn btn-primary" />
                    
                    <!-- Malformed Data -->
                    <Label class="h4 mt-20" text="Malformed Data" />
                    <Button text="Invalid JSON Response" @tap="testInvalidJSON" class="btn btn-primary" />
                    <Button text="Empty Response" @tap="testEmptyResponse" class="btn btn-primary" />
                    <Button text="Corrupted Data" @tap="testCorruptedData" class="btn btn-primary" />
                    
                    <!-- Edge Cases -->
                    <Label class="h4 mt-20" text="Edge Cases" />
                    <Button text="Extremely Large Response" @tap="testLargeResponse" class="btn btn-primary" />
                    <Button text="Very Slow Response" @tap="testSlowResponse" class="btn btn-primary" />
                    <Button text="Redirect Loop" @tap="testRedirectLoop" class="btn btn-primary" />
                    <Button text="Concurrent Error Requests" @tap="testConcurrentErrors" class="btn btn-primary" />
                    
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
        
        async test404() {
            try {
                this.log('Testing 404 Not Found...');
                
                const response = await Https.request({
                    url: 'https://httpbin.org/status/404',
                    method: 'GET'
                });
                
                this.log(`Status: ${response.statusCode}`);
                if (response.statusCode === 404) {
                    this.log('✓ 404 handled correctly');
                } else {
                    this.log('✗ Unexpected status code');
                }
            } catch (error) {
                this.log(`✓ 404 error caught: ${error}`);
            }
        },
        
        async test500() {
            try {
                this.log('Testing 500 Internal Server Error...');
                
                const response = await Https.request({
                    url: 'https://httpbin.org/status/500',
                    method: 'GET'
                });
                
                this.log(`Status: ${response.statusCode}`);
                if (response.statusCode === 500) {
                    this.log('✓ 500 handled correctly');
                }
            } catch (error) {
                this.log(`✓ 500 error caught: ${error}`);
            }
        },
        
        async test403() {
            try {
                this.log('Testing 403 Forbidden...');
                
                const response = await Https.request({
                    url: 'https://httpbin.org/status/403',
                    method: 'GET'
                });
                
                this.log(`Status: ${response.statusCode}`);
                if (response.statusCode === 403) {
                    this.log('✓ 403 handled correctly');
                }
            } catch (error) {
                this.log(`✓ 403 error caught: ${error}`);
            }
        },
        
        async test401() {
            try {
                this.log('Testing 401 Unauthorized...');
                
                const response = await Https.request({
                    url: 'https://httpbin.org/status/401',
                    method: 'GET'
                });
                
                this.log(`Status: ${response.statusCode}`);
                if (response.statusCode === 401) {
                    this.log('✓ 401 handled correctly');
                }
            } catch (error) {
                this.log(`✓ 401 error caught: ${error}`);
            }
        },
        
        async test400() {
            try {
                this.log('Testing 400 Bad Request...');
                
                const response = await Https.request({
                    url: 'https://httpbin.org/status/400',
                    method: 'GET'
                });
                
                this.log(`Status: ${response.statusCode}`);
                if (response.statusCode === 400) {
                    this.log('✓ 400 handled correctly');
                }
            } catch (error) {
                this.log(`✓ 400 error caught: ${error}`);
            }
        },
        
        async testInvalidURL() {
            try {
                this.log('Testing invalid URL...');
                
                await Https.request({
                    url: 'not-a-valid-url',
                    method: 'GET'
                });
                
                this.log('✗ Should have thrown an error');
            } catch (error) {
                this.log(`✓ Invalid URL error caught: ${error}`);
            }
        },
        
        async testNonExistentDomain() {
            try {
                this.log('Testing non-existent domain...');
                
                await Https.request({
                    url: 'https://this-domain-definitely-does-not-exist-12345.com',
                    method: 'GET',
                    timeout: 5
                });
                
                this.log('✗ Should have thrown an error');
            } catch (error) {
                this.log(`✓ Domain error caught: ${error}`);
            }
        },
        
        async testConnectionTimeout() {
            try {
                this.log('Testing connection timeout...');
                this.log('Using 1 second timeout with 10 second delay...');
                
                const start = Date.now();
                await Https.request({
                    url: 'https://httpbin.org/delay/10',
                    method: 'GET',
                    timeout: 1
                });
                
                this.log('✗ Should have timed out');
            } catch (error) {
                const elapsed = ((Date.now() - start) / 1000).toFixed(1);
                this.log(`✓ Timeout after ${elapsed}s: ${error}`);
            }
        },
        
        async testNoInternet() {
            try {
                this.log('Testing no internet simulation...');
                this.log('Note: Requires actual network disconnection to test properly');
                this.log('Attempting request with very short timeout...');
                
                await Https.request({
                    url: 'https://httpbin.org/get',
                    method: 'GET',
                    timeout: 0.1 // 100ms timeout
                });
                
                this.log('Request succeeded (network available)');
            } catch (error) {
                this.log(`Network error: ${error}`);
            }
        },
        
        async testInvalidSSL() {
            try {
                this.log('Testing invalid SSL certificate...');
                this.log('Note: Most modern HTTP clients reject invalid certs by default');
                
                // This URL is known to have SSL issues
                await Https.request({
                    url: 'https://expired.badssl.com/',
                    method: 'GET',
                    timeout: 5
                });
                
                this.log('✗ Should have rejected invalid certificate');
            } catch (error) {
                this.log(`✓ SSL error caught: ${error}`);
            }
        },
        
        async testSelfSigned() {
            try {
                this.log('Testing self-signed certificate...');
                
                await Https.request({
                    url: 'https://self-signed.badssl.com/',
                    method: 'GET',
                    timeout: 5
                });
                
                this.log('✗ Should have rejected self-signed certificate');
            } catch (error) {
                this.log(`✓ Self-signed cert rejected: ${error}`);
            }
        },
        
        async testSSLPinningMismatch() {
            try {
                this.log('Testing SSL pinning mismatch...');
                
                // Enable SSL pinning for httpbin
                const dir = fs.knownFolders.currentApp().getFolder('assets');
                const certificate = dir.getFile('httpbin.org.cer').path;
                
                Https.enableSSLPinning({
                    host: 'httpbin.org',
                    certificate
                });
                
                // Try to access different host (should work - no pinning)
                await Https.request({
                    url: 'https://mockbin.com/request',
                    method: 'GET',
                    timeout: 5
                });
                
                this.log('✓ Different host works (no pinning conflict)');
                
                // Disable pinning
                Https.disableSSLPinning();
            } catch (error) {
                this.log(`SSL pinning error: ${error}`);
                Https.disableSSLPinning();
            }
        },
        
        async testInvalidJSON() {
            try {
                this.log('Testing invalid JSON response...');
                
                const response = await Https.request({
                    url: 'https://httpbin.org/html',
                    method: 'GET'
                });
                
                // Try to parse HTML as JSON (should fail)
                try {
                    const json = response.content.toJSON();
                    this.log(`Unexpected: Parsed as ${JSON.stringify(json)}`);
                } catch (jsonError) {
                    this.log(`✓ JSON parse error caught: ${jsonError}`);
                }
            } catch (error) {
                this.log(`Request error: ${error}`);
            }
        },
        
        async testEmptyResponse() {
            try {
                this.log('Testing empty response...');
                
                const response = await Https.request({
                    url: 'https://httpbin.org/status/204', // No Content
                    method: 'GET'
                });
                
                this.log(`✓ Empty response handled`);
                this.log(`Status: ${response.statusCode}`);
                this.log(`Content length: ${response.contentLength}`);
            } catch (error) {
                this.log(`Error: ${error}`);
            }
        },
        
        async testCorruptedData() {
            try {
                this.log('Testing corrupted/random data...');
                
                const response = await Https.request({
                    url: 'https://httpbin.org/bytes/256',
                    method: 'GET'
                });
                
                // Try to parse random bytes as JSON (should fail)
                try {
                    const json = response.content.toJSON();
                    this.log(`Unexpected: Parsed as ${JSON.stringify(json)}`);
                } catch (parseError) {
                    this.log(`✓ Parse error caught for corrupted data: ${parseError}`);
                }
            } catch (error) {
                this.log(`Request error: ${error}`);
            }
        },
        
        async testLargeResponse() {
            try {
                this.log('Testing extremely large response (10MB)...');
                this.log('This may take a moment...');
                
                const start = Date.now();
                const response = await Https.request({
                    url: 'https://httpbin.org/bytes/10485760', // 10MB
                    method: 'GET',
                    timeout: 30
                });
                
                const elapsed = ((Date.now() - start) / 1000).toFixed(1);
                this.log(`✓ Large response handled in ${elapsed}s`);
                this.log(`Size: ${(response.contentLength / 1024 / 1024).toFixed(2)} MB`);
            } catch (error) {
                this.log(`✗ Failed to handle large response: ${error}`);
            }
        },
        
        async testSlowResponse() {
            try {
                this.log('Testing very slow response (5 second delay)...');
                
                const start = Date.now();
                const response = await Https.request({
                    url: 'https://httpbin.org/delay/5',
                    method: 'GET',
                    timeout: 10
                });
                
                const elapsed = ((Date.now() - start) / 1000).toFixed(1);
                this.log(`✓ Slow response handled in ${elapsed}s`);
                this.log(`Status: ${response.statusCode}`);
            } catch (error) {
                this.log(`Error: ${error}`);
            }
        },
        
        async testRedirectLoop() {
            try {
                this.log('Testing redirect loop...');
                
                const response = await Https.request({
                    url: 'https://httpbin.org/redirect/5', // 5 redirects
                    method: 'GET',
                    timeout: 10
                });
                
                this.log(`✓ Redirects handled`);
                this.log(`Final status: ${response.statusCode}`);
            } catch (error) {
                this.log(`Redirect error: ${error}`);
            }
        },
        
        async testConcurrentErrors() {
            try {
                this.log('Testing concurrent error requests...');
                
                const errorRequests = [
                    Https.request({ url: 'https://httpbin.org/status/404', method: 'GET' }),
                    Https.request({ url: 'https://httpbin.org/status/500', method: 'GET' }),
                    Https.request({ url: 'https://httpbin.org/status/403', method: 'GET' }),
                    Https.request({ url: 'https://httpbin.org/delay/10', method: 'GET', timeout: 1 })
                ];
                
                const results = await Promise.allSettled(errorRequests);
                
                let successCount = 0;
                let errorCount = 0;
                
                results.forEach((result, index) => {
                    if (result.status === 'fulfilled') {
                        successCount++;
                        this.log(`Request ${index + 1}: Status ${result.value.statusCode}`);
                    } else {
                        errorCount++;
                        this.log(`Request ${index + 1}: Error`);
                    }
                });
                
                this.log(`✓ Concurrent errors handled`);
                this.log(`Success: ${successCount}, Errors: ${errorCount}`);
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
.bg-light {
    background-color: #f8f9fa;
}
</style>
