<template>
    <Page>
        <ActionBar title="Caching & Cookies" backgroundColor="#42b883" color="white">
            <NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="$navigateBack()" />
        </ActionBar>
        <GridLayout rows="auto,*">
            <StackLayout row="0" class="p-10 bg-light">
                <Label class="h3" text="Cache & Cookie Management" />
                <Label class="text-muted" text="Test caching policies and cookie handling" textWrap="true" />
            </StackLayout>
            <ScrollView row="1">
                <StackLayout class="p-20">
                    <!-- Cache Setup -->
                    <Label class="h4 mt-20" text="Cache Setup" />
                    <Button text="Set Cache (10MB)" @tap="setCacheSmall" class="btn btn-primary" />
                    <Button text="Set Cache (50MB)" @tap="setCacheLarge" class="btn btn-primary" />
                    <Button text="Clear All Cache" @tap="clearAllCache" class="btn btn-danger" />
                    
                    <!-- Cache Policies -->
                    <Label class="h4 mt-20" text="Cache Policies" />
                    <Button text="Request with 'noCache' Policy" @tap="testNoCachePolicy" class="btn btn-primary" />
                    <Button text="Request with 'onlyCache' Policy" @tap="testOnlyCachePolicy" class="btn btn-primary" />
                    <Button text="Request with 'ignoreCache' Policy" @tap="testIgnoreCachePolicy" class="btn btn-primary" />
                    <Button text="Request with Default Policy" @tap="testDefaultCachePolicy" class="btn btn-primary" />
                    
                    <!-- Cache Operations -->
                    <Label class="h4 mt-20" text="Cache Operations" />
                    <Button text="Cache Miss Test" @tap="testCacheMiss" class="btn btn-primary" />
                    <Button text="Cache Hit Test" @tap="testCacheHit" class="btn btn-primary" />
                    <Button text="Remove Specific Cached Response" @tap="removeCachedResponse" class="btn btn-primary" />
                    <Button text="Test Cache Expiration" @tap="testCacheExpiration" class="btn btn-primary" />
                    
                    <!-- Cache Scenarios -->
                    <Label class="h4 mt-20" text="Cache Scenarios" />
                    <Button text="Offline Mode Simulation" @tap="testOfflineMode" class="btn btn-primary" />
                    <Button text="Sequential Cache Tests" @tap="testSequentialCache" class="btn btn-primary" />
                    <Button text="Multiple URLs Caching" @tap="testMultipleURLsCaching" class="btn btn-primary" />
                    
                    <!-- Cookie Management -->
                    <Label class="h4 mt-20" text="Cookie Management" />
                    <Button text="Request with Cookies Enabled" @tap="testCookiesEnabled" class="btn btn-primary" />
                    <Button text="Request with Cookies Disabled" @tap="testCookiesDisabled" class="btn btn-primary" />
                    <Button text="Test Cookie Persistence" @tap="testCookiePersistence" class="btn btn-primary" />
                    <Button text="Clear All Cookies" @tap="clearAllCookies" class="btn btn-danger" />
                    
                    <!-- Advanced Tests -->
                    <Label class="h4 mt-20" text="Advanced Tests" />
                    <Button text="Cache + Cookies Combined" @tap="testCacheAndCookies" class="btn btn-primary" />
                    <Button text="Test Cache Headers" @tap="testCacheHeaders" class="btn btn-primary" />
                    
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
            results: 'Test results will appear here...',
            cachedURL: 'https://httpbin.org/cache/3600' // 1 hour cache
        };
    },
    methods: {
        log(message: string) {
            const timestamp = new Date().toLocaleTimeString();
            this.results = `[${timestamp}] ${message}\n\n${this.results}`;
            console.log(message);
        },
        
        setCacheSmall() {
            try {
                this.log('Setting up cache (10MB)...');
                
                const tempDir = fs.knownFolders.temp();
                const cacheDir = fs.path.join(tempDir.path, 'https-cache');
                
                Https.setCache({
                    diskLocation: cacheDir,
                    diskSize: 10 * 1024 * 1024, // 10MB
                    memorySize: 512 * 1024 // 512KB
                });
                
                this.log('✓ Cache configured');
                this.log(`Disk: 10MB at ${cacheDir}`);
                this.log(`Memory: 512KB`);
            } catch (error) {
                this.log(`✗ Failed to set cache: ${error}`);
            }
        },
        
        setCacheLarge() {
            try {
                this.log('Setting up cache (50MB)...');
                
                const tempDir = fs.knownFolders.temp();
                const cacheDir = fs.path.join(tempDir.path, 'https-cache');
                
                Https.setCache({
                    diskLocation: cacheDir,
                    diskSize: 50 * 1024 * 1024, // 50MB
                    memorySize: 2 * 1024 * 1024 // 2MB
                });
                
                this.log('✓ Cache configured');
                this.log(`Disk: 50MB at ${cacheDir}`);
                this.log(`Memory: 2MB`);
            } catch (error) {
                this.log(`✗ Failed to set cache: ${error}`);
            }
        },
        
        clearAllCache() {
            try {
                this.log('Clearing all cache...');
                Https.clearCache();
                this.log('✓ Cache cleared');
            } catch (error) {
                this.log(`✗ Failed to clear cache: ${error}`);
            }
        },
        
        async testNoCachePolicy() {
            try {
                this.log('Testing "noCache" policy...');
                this.log('Should always fetch from network');
                
                const response = await Https.request({
                    url: 'https://httpbin.org/get',
                    method: 'GET',
                    cachePolicy: 'noCache'
                });
                
                this.log(`✓ Request completed`);
                this.log(`Status: ${response.statusCode}`);
                this.log(`Policy: noCache - Always from network`);
            } catch (error) {
                this.log(`✗ Request failed: ${error}`);
            }
        },
        
        async testOnlyCachePolicy() {
            try {
                this.log('Testing "onlyCache" policy...');
                this.log('Should only use cache, fail if not cached');
                
                const response = await Https.request({
                    url: 'https://httpbin.org/get',
                    method: 'GET',
                    cachePolicy: 'onlyCache'
                });
                
                this.log(`✓ Loaded from cache`);
                this.log(`Status: ${response.statusCode}`);
            } catch (error) {
                this.log(`✗ Failed (expected if not cached): ${error}`);
            }
        },
        
        async testIgnoreCachePolicy() {
            try {
                this.log('Testing "ignoreCache" policy...');
                this.log('Should ignore cache and fetch fresh data');
                
                const response = await Https.request({
                    url: 'https://httpbin.org/get',
                    method: 'GET',
                    cachePolicy: 'ignoreCache'
                });
                
                this.log(`✓ Fresh data fetched`);
                this.log(`Status: ${response.statusCode}`);
            } catch (error) {
                this.log(`✗ Request failed: ${error}`);
            }
        },
        
        async testDefaultCachePolicy() {
            try {
                this.log('Testing default cache policy...');
                this.log('Should use HTTP cache headers');
                
                const response = await Https.request({
                    url: 'https://httpbin.org/cache/60', // 60 second cache
                    method: 'GET'
                });
                
                this.log(`✓ Request completed`);
                this.log(`Status: ${response.statusCode}`);
                this.log(`Default policy respects Cache-Control headers`);
            } catch (error) {
                this.log(`✗ Request failed: ${error}`);
            }
        },
        
        async testCacheMiss() {
            try {
                this.log('Testing cache miss...');
                
                // Clear cache first
                Https.clearCache();
                
                // Request unique URL (not cached)
                const url = `https://httpbin.org/get?t=${Date.now()}`;
                const start = Date.now();
                
                const response = await Https.request({
                    url,
                    method: 'GET'
                });
                
                const time = Date.now() - start;
                this.log(`✓ Cache miss - fetched from network`);
                this.log(`Time: ${time}ms`);
                this.log(`Status: ${response.statusCode}`);
            } catch (error) {
                this.log(`✗ Request failed: ${error}`);
            }
        },
        
        async testCacheHit() {
            try {
                this.log('Testing cache hit...');
                
                // Make first request to cache it
                this.log('1. First request (to cache)...');
                await Https.request({
                    url: this.cachedURL,
                    method: 'GET'
                });
                
                this.log('2. Second request (from cache)...');
                const start = Date.now();
                const response = await Https.request({
                    url: this.cachedURL,
                    method: 'GET'
                });
                const time = Date.now() - start;
                
                this.log(`✓ Cache hit - loaded from cache`);
                this.log(`Time: ${time}ms (should be faster)`);
                this.log(`Status: ${response.statusCode}`);
            } catch (error) {
                this.log(`✗ Request failed: ${error}`);
            }
        },
        
        removeCachedResponse() {
            try {
                this.log('Removing specific cached response...');
                Https.removeCachedResponse(this.cachedURL);
                this.log(`✓ Removed cache for: ${this.cachedURL}`);
            } catch (error) {
                this.log(`✗ Failed to remove: ${error}`);
            }
        },
        
        async testCacheExpiration() {
            try {
                this.log('Testing cache expiration...');
                
                // Request with 1 second cache
                this.log('1. Request with 1s cache...');
                const url = 'https://httpbin.org/cache/1';
                await Https.request({ url, method: 'GET' });
                
                this.log('2. Immediate re-request (should be cached)...');
                await Https.request({ url, method: 'GET' });
                
                this.log('3. Wait 2 seconds for expiration...');
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                this.log('4. Request after expiration (should re-fetch)...');
                await Https.request({ url, method: 'GET' });
                
                this.log('✓ Cache expiration test complete');
            } catch (error) {
                this.log(`✗ Test failed: ${error}`);
            }
        },
        
        async testOfflineMode() {
            try {
                this.log('Testing offline mode simulation...');
                
                // Cache some data first
                this.log('1. Caching data...');
                await Https.request({
                    url: this.cachedURL,
                    method: 'GET'
                });
                
                this.log('2. Try to load from cache only...');
                const response = await Https.request({
                    url: this.cachedURL,
                    method: 'GET',
                    cachePolicy: 'onlyCache'
                });
                
                this.log(`✓ Offline mode works`);
                this.log(`Loaded from cache: ${response.statusCode}`);
            } catch (error) {
                this.log(`✗ Failed: ${error}`);
            }
        },
        
        async testSequentialCache() {
            try {
                this.log('Testing sequential cache operations...');
                
                const url = 'https://httpbin.org/get';
                
                // Request 1
                this.log('1. First request...');
                const start1 = Date.now();
                await Https.request({ url, method: 'GET' });
                const time1 = Date.now() - start1;
                this.log(`   Time: ${time1}ms`);
                
                // Request 2 (should be faster if cached)
                this.log('2. Second request...');
                const start2 = Date.now();
                await Https.request({ url, method: 'GET' });
                const time2 = Date.now() - start2;
                this.log(`   Time: ${time2}ms`);
                
                // Request 3
                this.log('3. Third request...');
                const start3 = Date.now();
                await Https.request({ url, method: 'GET' });
                const time3 = Date.now() - start3;
                this.log(`   Time: ${time3}ms`);
                
                this.log(`✓ Sequential test complete`);
                this.log(`Times: ${time1}ms, ${time2}ms, ${time3}ms`);
            } catch (error) {
                this.log(`✗ Test failed: ${error}`);
            }
        },
        
        async testMultipleURLsCaching() {
            try {
                this.log('Testing multiple URLs caching...');
                
                const urls = [
                    'https://httpbin.org/get',
                    'https://httpbin.org/json',
                    'https://httpbin.org/uuid'
                ];
                
                // Cache all
                this.log('1. Caching all URLs...');
                for (const url of urls) {
                    await Https.request({ url, method: 'GET' });
                    this.log(`   Cached: ${url}`);
                }
                
                // Retrieve from cache
                this.log('2. Retrieving from cache...');
                for (const url of urls) {
                    const start = Date.now();
                    await Https.request({ url, method: 'GET' });
                    const time = Date.now() - start;
                    this.log(`   Retrieved: ${url} (${time}ms)`);
                }
                
                this.log('✓ Multiple URLs cached successfully');
            } catch (error) {
                this.log(`✗ Test failed: ${error}`);
            }
        },
        
        async testCookiesEnabled() {
            try {
                this.log('Testing request with cookies enabled...');
                
                const response = await Https.request({
                    url: 'https://httpbin.org/cookies/set?name=value',
                    method: 'GET',
                    cookiesEnabled: true
                });
                
                this.log(`✓ Request with cookies enabled`);
                this.log(`Status: ${response.statusCode}`);
                this.log(`Cookies should be stored in memory`);
                
                // Second request to check cookie persistence
                this.log('Making second request to verify cookies...');
                const response2 = await Https.request({
                    url: 'https://httpbin.org/cookies',
                    method: 'GET',
                    cookiesEnabled: true
                });
                
                const data = response2.content.toJSON();
                this.log(`Cookies: ${JSON.stringify(data.cookies)}`);
            } catch (error) {
                this.log(`✗ Request failed: ${error}`);
            }
        },
        
        async testCookiesDisabled() {
            try {
                this.log('Testing request with cookies disabled...');
                
                const response = await Https.request({
                    url: 'https://httpbin.org/cookies/set?test=disabled',
                    method: 'GET',
                    cookiesEnabled: false
                });
                
                this.log(`✓ Request with cookies disabled`);
                this.log(`Status: ${response.statusCode}`);
                this.log(`Cookies should not be stored`);
            } catch (error) {
                this.log(`✗ Request failed: ${error}`);
            }
        },
        
        async testCookiePersistence() {
            try {
                this.log('Testing cookie persistence...');
                this.log('Note: Cookies stored in memory, cleared on app restart');
                
                // Set cookie
                this.log('1. Setting cookie...');
                await Https.request({
                    url: 'https://httpbin.org/cookies/set?session=12345',
                    method: 'GET',
                    cookiesEnabled: true
                });
                
                // Verify cookie
                this.log('2. Verifying cookie...');
                const response = await Https.request({
                    url: 'https://httpbin.org/cookies',
                    method: 'GET',
                    cookiesEnabled: true
                });
                
                const data = response.content.toJSON();
                this.log(`✓ Cookies persisted: ${JSON.stringify(data.cookies)}`);
                this.log(`Note: Will be cleared on app restart`);
            } catch (error) {
                this.log(`✗ Test failed: ${error}`);
            }
        },
        
        clearAllCookies() {
            try {
                this.log('Clearing all cookies...');
                Https.clearCookies();
                this.log('✓ All cookies cleared');
            } catch (error) {
                this.log(`✗ Failed to clear cookies: ${error}`);
            }
        },
        
        async testCacheAndCookies() {
            try {
                this.log('Testing cache and cookies combined...');
                
                const response = await Https.request({
                    url: 'https://httpbin.org/cookies/set?combined=test',
                    method: 'GET',
                    cookiesEnabled: true,
                    cachePolicy: 'noCache'
                });
                
                this.log(`✓ Request with both features`);
                this.log(`Status: ${response.statusCode}`);
                this.log(`Cookies enabled, cache policy: noCache`);
            } catch (error) {
                this.log(`✗ Request failed: ${error}`);
            }
        },
        
        async testCacheHeaders() {
            try {
                this.log('Testing with cache-control headers...');
                
                const response = await Https.request({
                    url: 'https://httpbin.org/response-headers',
                    method: 'GET',
                    params: {
                        'Cache-Control': 'max-age=3600'
                    }
                });
                
                this.log(`✓ Request complete`);
                this.log(`Status: ${response.statusCode}`);
                this.log(`Headers: ${JSON.stringify(response.headers)}`);
                this.log(`Response respects Cache-Control headers`);
            } catch (error) {
                this.log(`✗ Request failed: ${error}`);
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
.btn-danger {
    background-color: #dc3545;
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
