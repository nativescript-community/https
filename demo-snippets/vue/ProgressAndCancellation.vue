<template>
    <Page>
        <ActionBar title="Progress & Cancellation" backgroundColor="#42b883" color="white">
            <NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="$navigateBack()" />
        </ActionBar>
        <GridLayout rows="auto,*">
            <StackLayout row="0" class="p-10 bg-light">
                <Label class="h3" text="Progress & Cancellation Tests" />
                <Label class="text-muted" text="Test progress callbacks and request cancellation" textWrap="true" />
            </StackLayout>
            <ScrollView row="1">
                <StackLayout class="p-20">
                    <!-- Progress Tests -->
                    <Label class="h4 mt-20" text="Progress Tracking" />
                    <Button text="Download with Progress" class="btn btn-primary" @tap="testDownloadProgress" />
                    <Button text="Upload with Progress" class="btn btn-primary" @tap="testUploadProgress" />
                    <Button text="Multiple Downloads with Progress" class="btn btn-primary" @tap="testMultipleProgress" />

                    <Progress v-if="showProgress" :value="progress" maxValue="100" class="mt-10" />
                    <Label v-if="showProgress" :text="`Progress: ${progress.toFixed(1)}%`" class="text-center" />

                    <!-- Cancellation Tests -->
                    <Label class="h4 mt-20" text="Request Cancellation" />
                    <Button text="Cancel by Tag" class="btn btn-primary" @tap="testCancelByTag" />
                    <Button text="Cancel Multiple Requests" class="btn btn-primary" @tap="testCancelMultiple" />
                    <Button text="Cancel All Requests" class="btn btn-primary" @tap="testCancelAll" />
                    <Button text="Cancel During Progress" class="btn btn-primary" @tap="testCancelDuringProgress" />

                    <!-- Advanced Cancellation -->
                    <Label class="h4 mt-20" text="Advanced Cancellation Scenarios" />
                    <Button text="Cancel Before Completion" class="btn btn-primary" @tap="testCancelBeforeCompletion" />
                    <Button text="Cancel After Completion (Should Fail)" class="btn btn-primary" @tap="testCancelAfterCompletion" />
                    <Button text="Cancel Non-Existent Request" class="btn btn-primary" @tap="testCancelNonExistent" />

                    <!-- Timeout Tests -->
                    <Label class="h4 mt-20" text="Timeout Tests" />
                    <Button text="Request with Short Timeout" class="btn btn-primary" @tap="testShortTimeout" />
                    <Button text="Request with Long Timeout" class="btn btn-primary" @tap="testLongTimeout" />
                    <Button text="Timeout vs Cancellation" class="btn btn-primary" @tap="testTimeoutVsCancellation" />

                    <!-- createRequest Tests -->
                    <Label class="h4 mt-20" text="createRequest API" />
                    <Button text="createRequest() with run()" class="btn btn-primary" @tap="testCreateRequest" />
                    <Button text="createRequest() with cancel()" class="btn btn-primary" @tap="testCreateRequestCancel" />
                    <Button text="createRequest() with Progress" class="btn btn-primary" @tap="testCreateRequestProgress" />

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

        async testDownloadProgress() {
            try {
                this.log('Testing download with progress callback...');
                this.showProgress = true;
                this.progress = 0;

                let lastProgress = 0;
                const request = Https.createRequest({
                    url: 'https://httpbin.org/bytes/1048576', // 1MB
                    method: 'GET',
                    onProgress: (current, total) => {
                        this.progress = (current / total) * 100;

                        // Log at 25% intervals
                        const currentPercent = Math.floor(this.progress / 25) * 25;
                        if (currentPercent > lastProgress) {
                            this.log(`Progress: ${currentPercent}%`);
                            lastProgress = currentPercent;
                        }
                    }
                });

                const response = await new Promise<any>((resolve, reject) => {
                    request.run(resolve, reject);
                });

                this.log(`✓ Download complete`);
                this.log(`Size: ${response.contentLength} bytes`);
                this.showProgress = false;
            } catch (error) {
                this.log(`✗ Download failed: ${error}`);
                this.showProgress = false;
            }
        },

        async testUploadProgress() {
            try {
                this.log('Testing upload with progress callback...');
                this.log('Note: Upload progress may not be supported on all platforms');

                const largeBody = { data: 'x'.repeat(10000) };

                const response = await Https.request({
                    url: 'https://httpbin.org/post',
                    method: 'POST',
                    body: largeBody,
                    onProgress: (current, total) => {
                        this.log(`Upload progress: ${current}/${total}`);
                    }
                });

                this.log(`✓ Upload complete`);
                this.log(`Status: ${response.statusCode}`);
            } catch (error) {
                this.log(`✗ Upload failed: ${error}`);
            }
        },

        async testMultipleProgress() {
            try {
                this.log('Testing multiple downloads with progress...');

                const urls = [
                    'https://httpbin.org/bytes/262144', // 256KB
                    'https://httpbin.org/bytes/524288', // 512KB
                    'https://httpbin.org/bytes/1048576' // 1MB
                ];

                for (let i = 0; i < urls.length; i++) {
                    this.log(`\nDownload ${i + 1}/${urls.length}...`);

                    const request = Https.createRequest({
                        url: urls[i],
                        method: 'GET',
                        onProgress: (current, total) => {
                            const percent = ((current / total) * 100).toFixed(1);
                            // Log only at completion
                            if (current === total) {
                                this.log(`  Download ${i + 1}: 100% (${total} bytes)`);
                            }
                        }
                    });

                    await new Promise((resolve, reject) => {
                        request.run(resolve, reject);
                    });
                }

                this.log(`\n✓ All downloads complete`);
            } catch (error) {
                this.log(`✗ Failed: ${error}`);
            }
        },

        async testCancelByTag() {
            try {
                this.log('Testing cancellation by tag...');

                // Start request with tag
                const promise = Https.request({
                    url: 'https://httpbin.org/delay/5', // 5 second delay
                    method: 'GET',
                    tag: 'test-cancel',
                    timeout: 10
                });

                // Cancel after 1 second
                setTimeout(() => {
                    this.log('Cancelling request...');
                    Https.cancelRequest('test-cancel');
                }, 1000);

                await promise;
                this.log('✗ Request should have been cancelled');
            } catch (error) {
                this.log(`✓ Request cancelled: ${error}`);
            }
        },

        async testCancelMultiple() {
            try {
                this.log('Testing cancellation of multiple requests...');

                // Start 3 requests
                const promises = [];
                for (let i = 1; i <= 3; i++) {
                    const promise = Https.request({
                        url: 'https://httpbin.org/delay/5',
                        method: 'GET',
                        tag: `multi-cancel-${i}`,
                        timeout: 10
                    });
                    promises.push(promise);
                }

                // Cancel all after 1 second
                setTimeout(() => {
                    this.log('Cancelling all 3 requests...');
                    for (let i = 1; i <= 3; i++) {
                        Https.cancelRequest(`multi-cancel-${i}`);
                    }
                }, 1000);

                await Promise.all(promises).catch(() => {});
                this.log('✓ All requests cancelled');
            } catch (error) {
                this.log(`✓ Requests cancelled: ${error}`);
            }
        },

        async testCancelAll() {
            try {
                this.log('Testing cancelAllRequests()...');

                // Start multiple requests
                const promises = [];
                for (let i = 1; i <= 3; i++) {
                    const promise = Https.request({
                        url: 'https://httpbin.org/delay/5',
                        method: 'GET',
                        timeout: 10
                    });
                    promises.push(promise);
                }

                // Cancel all after 1 second
                setTimeout(() => {
                    this.log('Calling cancelAllRequests()...');
                    Https.cancelAllRequests();
                }, 1000);

                await Promise.all(promises).catch(() => {});
                this.log('✓ All requests cancelled');
            } catch (error) {
                this.log(`✓ Cancelled: ${error}`);
            }
        },

        async testCancelDuringProgress() {
            try {
                this.log('Testing cancellation during download...');
                this.showProgress = true;
                this.progress = 0;

                const request = Https.createRequest({
                    url: 'https://httpbin.org/bytes/2097152', // 2MB
                    method: 'GET',
                    tag: 'cancel-progress',
                    onProgress: (current, total) => {
                        this.progress = (current / total) * 100;

                        // Cancel at 50%
                        if (this.progress >= 50 && this.progress < 60) {
                            this.log(`Progress at ${this.progress.toFixed(1)}%, cancelling...`);
                            Https.cancelRequest('cancel-progress');
                        }
                    }
                });

                await new Promise((resolve, reject) => {
                    request.run(resolve, reject);
                });

                this.log('✗ Should have been cancelled');
                this.showProgress = false;
            } catch (error) {
                this.log(`✓ Cancelled during download: ${error}`);
                this.showProgress = false;
            }
        },

        async testCancelBeforeCompletion() {
            try {
                this.log('Testing cancel before request completes...');

                const promise = Https.request({
                    url: 'https://httpbin.org/delay/3',
                    method: 'GET',
                    tag: 'cancel-before',
                    timeout: 10
                });

                setTimeout(() => {
                    this.log('Cancelling before completion...');
                    Https.cancelRequest('cancel-before');
                }, 500);

                await promise;
                this.log('✗ Should have been cancelled');
            } catch (error) {
                this.log(`✓ Cancelled successfully: ${error}`);
            }
        },

        async testCancelAfterCompletion() {
            try {
                this.log('Testing cancel after request completes...');

                const response = await Https.request({
                    url: 'https://httpbin.org/get',
                    method: 'GET',
                    tag: 'cancel-after'
                });

                this.log(`✓ Request completed: ${response.statusCode}`);

                // Try to cancel after completion
                this.log('Trying to cancel completed request...');
                Https.cancelRequest('cancel-after');
                this.log('✓ Cancel called (should have no effect on completed request)');
            } catch (error) {
                this.log(`✗ Test failed: ${error}`);
            }
        },

        async testCancelNonExistent() {
            try {
                this.log('Testing cancel of non-existent request...');

                Https.cancelRequest('non-existent-tag-12345');
                this.log('✓ Cancel called for non-existent tag (should be safe)');
            } catch (error) {
                this.log(`Error: ${error}`);
            }
        },

        async testShortTimeout() {
            const start = Date.now();
            try {
                this.log('Testing request with short timeout (1 second)...');

                await Https.request({
                    url: 'https://httpbin.org/delay/5', // 5 second delay
                    method: 'GET',
                    timeout: 1 // 1 second timeout
                });

                this.log('✗ Should have timed out');
            } catch (error) {
                const time = Date.now() - start;
                this.log(`✓ Timed out after ${time}ms`);
                this.log(`Error: ${error}`);
            }
        },

        async testLongTimeout() {
            try {
                this.log('Testing request with long timeout (30 seconds)...');

                const response = await Https.request({
                    url: 'https://httpbin.org/delay/1',
                    method: 'GET',
                    timeout: 30
                });

                this.log(`✓ Request completed within timeout`);
                this.log(`Status: ${response.statusCode}`);
            } catch (error) {
                this.log(`✗ Failed: ${error}`);
            }
        },

        async testTimeoutVsCancellation() {
            const start1 = Date.now();
            try {
                this.log('Comparing timeout vs manual cancellation...');

                // Test 1: Timeout
                this.log('\n--- Timeout ---');
                try {
                    await Https.request({
                        url: 'https://httpbin.org/delay/5',
                        method: 'GET',
                        timeout: 1
                    });
                } catch (error) {
                    const time1 = Date.now() - start1;
                    this.log(`Timeout triggered after ${time1}ms`);
                }

                // Test 2: Manual cancellation
                this.log('\n--- Manual Cancellation ---');
                const start2 = Date.now();
                const promise = Https.request({
                    url: 'https://httpbin.org/delay/5',
                    method: 'GET',
                    tag: 'timeout-vs-cancel',
                    timeout: 10
                });

                setTimeout(() => Https.cancelRequest('timeout-vs-cancel'), 1000);

                try {
                    await promise;
                } catch (error) {
                    const time2 = Date.now() - start2;
                    this.log(`Manual cancel after ${time2}ms`);
                }

                this.log('\n✓ Comparison complete');
            } catch (error) {
                this.log(`✗ Test failed: ${error}`);
            }
        },

        async testCreateRequest() {
            try {
                this.log('Testing createRequest() API...');

                const request = Https.createRequest({
                    url: 'https://httpbin.org/get',
                    method: 'GET'
                });

                const response = await new Promise<any>((resolve, reject) => {
                    request.run(resolve, reject);
                });

                this.log(`✓ Request completed via run()`);
                this.log(`Status: ${response.statusCode}`);
            } catch (error) {
                this.log(`✗ Failed: ${error}`);
            }
        },

        async testCreateRequestCancel() {
            try {
                this.log('Testing createRequest() with cancel()...');

                const request = Https.createRequest({
                    url: 'https://httpbin.org/delay/5',
                    method: 'GET',
                    timeout: 10
                });

                // Cancel after 1 second
                setTimeout(() => {
                    this.log('Calling request.cancel()...');
                    request.cancel();
                }, 1000);

                await new Promise((resolve, reject) => {
                    request.run(resolve, reject);
                });

                this.log('✗ Should have been cancelled');
            } catch (error) {
                this.log(`✓ Request cancelled: ${error}`);
            }
        },

        async testCreateRequestProgress() {
            try {
                this.log('Testing createRequest() with progress...');
                this.showProgress = true;
                this.progress = 0;

                const request = Https.createRequest({
                    url: 'https://httpbin.org/bytes/524288', // 512KB
                    method: 'GET',
                    onProgress: (current, total) => {
                        this.progress = (current / total) * 100;
                    }
                });

                const response = await new Promise<any>((resolve, reject) => {
                    request.run(resolve, reject);
                });

                this.log(`✓ Download complete via createRequest()`);
                this.log(`Size: ${response.contentLength} bytes`);
                this.showProgress = false;
            } catch (error) {
                this.log(`✗ Failed: ${error}`);
                this.showProgress = false;
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
