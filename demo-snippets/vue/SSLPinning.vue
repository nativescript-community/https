<template>
    <Page>
        <ActionBar title="SSL Pinning Tests" backgroundColor="#42b883" color="white">
            <NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="$navigateBack()" />
        </ActionBar>
        <GridLayout rows="auto,auto,*">
            <StackLayout row="0" class="p-10 bg-light">
                <Label class="h3" text="SSL Certificate Pinning" />
                <Label class="text-muted" text="Test SSL pinning with valid and invalid certificates" textWrap="true" />
            </StackLayout>
            <StackLayout row="1" class="p-10" :class="pinningEnabled ? 'bg-success' : 'bg-warning'">
                <Label :text="pinningEnabled ? '🔒 SSL Pinning: ENABLED' : '🔓 SSL Pinning: DISABLED'" 
                       class="text-center font-weight-bold" :color="pinningEnabled ? 'green' : 'orange'" />
                <Label v-if="currentHost" :text="`Host: ${currentHost}`" class="text-center text-small" />
            </StackLayout>
            <ScrollView row="2">
                <StackLayout class="p-20">
                    <!-- Enable/Disable SSL Pinning -->
                    <Label class="h4 mt-20" text="SSL Pinning Control" />
                    <Button text="Enable - httpbin.org (Valid Cert)" @tap="enableSSLPinningValid" class="btn btn-success" />
                    <Button text="Enable - httpbin.org (Expired Cert)" @tap="enableSSLPinningExpired" class="btn btn-warning" />
                    <Button text="Disable SSL Pinning" @tap="disableSSLPinning" class="btn btn-danger" />
                    
                    <!-- Test Requests with SSL Pinning -->
                    <Label class="h4 mt-20" text="Test Requests" />
                    <Button text="GET httpbin.org/get" @tap="testHttpbinGet" class="btn btn-primary" />
                    <Button text="POST httpbin.org/post" @tap="testHttpbinPost" class="btn btn-primary" />
                    <Button text="GET httpbin.org/json" @tap="testHttpbinJSON" class="btn btn-primary" />
                    
                    <!-- Test Different Hosts -->
                    <Label class="h4 mt-20" text="Test Different Hosts" />
                    <Button text="Test Different Host (Should Fail)" @tap="testDifferentHost" class="btn btn-primary" />
                    <Button text="Test Unpinned Host (Should Work)" @tap="testUnpinnedHost" class="btn btn-primary" />
                    
                    <!-- Certificate Scenarios -->
                    <Label class="h4 mt-20" text="Certificate Scenarios" />
                    <Button text="Test with Valid Certificate" @tap="testValidCertificate" class="btn btn-primary" />
                    <Button text="Test with Expired Certificate" @tap="testExpiredCertificate" class="btn btn-primary" />
                    <Button text="Test Certificate Mismatch" @tap="testCertificateMismatch" class="btn btn-primary" />
                    
                    <!-- Advanced Tests -->
                    <Label class="h4 mt-20" text="Advanced SSL Tests" />
                    <Button text="Multiple Pinned Hosts" @tap="testMultiplePinnedHosts" class="btn btn-primary" />
                    <Button text="Re-enable After Disable" @tap="testReEnable" class="btn btn-primary" />
                    <Button text="Common Name Validation" @tap="testCommonNameValidation" class="btn btn-primary" />
                    
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
            pinningEnabled: false,
            currentHost: ''
        };
    },
    methods: {
        log(message: string) {
            const timestamp = new Date().toLocaleTimeString();
            this.results = `[${timestamp}] ${message}\n\n${this.results}`;
            console.log(message);
        },
        
        enableSSLPinningValid() {
            try {
                this.log('Enabling SSL pinning for httpbin.org with valid certificate...');
                
                const dir = fs.knownFolders.currentApp().getFolder('assets');
                const certificate = dir.getFile('httpbin.org.cer').path;
                
                Https.enableSSLPinning({
                    host: 'httpbin.org',
                    commonName: 'httpbin.org',
                    certificate
                });
                
                this.pinningEnabled = true;
                this.currentHost = 'httpbin.org';
                this.log('✓ SSL Pinning enabled with valid certificate');
                this.log(`Host: ${this.currentHost}`);
                this.log(`Certificate: ${certificate}`);
            } catch (error) {
                this.log(`✗ Failed to enable SSL pinning: ${error}`);
            }
        },
        
        enableSSLPinningExpired() {
            try {
                this.log('Enabling SSL pinning for httpbin.org with EXPIRED certificate...');
                this.log('⚠️ This should cause requests to fail');
                
                const dir = fs.knownFolders.currentApp().getFolder('assets');
                const certificate = dir.getFile('httpbin.org.expired.cer').path;
                
                Https.enableSSLPinning({
                    host: 'httpbin.org',
                    certificate
                });
                
                this.pinningEnabled = true;
                this.currentHost = 'httpbin.org (expired cert)';
                this.log('✓ SSL Pinning enabled with expired certificate');
                this.log('Requests should now fail due to certificate mismatch');
            } catch (error) {
                this.log(`✗ Failed to enable SSL pinning: ${error}`);
            }
        },
        
        disableSSLPinning() {
            try {
                this.log('Disabling SSL pinning...');
                
                Https.disableSSLPinning();
                
                this.pinningEnabled = false;
                this.currentHost = '';
                this.log('✓ SSL Pinning disabled');
                this.log('All requests will now use standard SSL validation');
            } catch (error) {
                this.log(`✗ Failed to disable SSL pinning: ${error}`);
            }
        },
        
        async testHttpbinGet() {
            try {
                this.log(`Testing GET request to httpbin.org...`);
                this.log(`SSL Pinning: ${this.pinningEnabled ? 'ENABLED' : 'DISABLED'}`);
                
                const response = await Https.request({
                    url: 'https://httpbin.org/get',
                    method: 'GET',
                    timeout: 10
                });
                
                this.log(`✓ Request successful`);
                this.log(`Status: ${response.statusCode}`);
                this.log(`Response: ${response.content.toString().substring(0, 100)}...`);
            } catch (error) {
                this.log(`✗ Request failed: ${error}`);
                this.log(`This is expected if using expired/invalid certificate`);
            }
        },
        
        async testHttpbinPost() {
            try {
                this.log(`Testing POST request to httpbin.org...`);
                this.log(`SSL Pinning: ${this.pinningEnabled ? 'ENABLED' : 'DISABLED'}`);
                
                const response = await Https.request({
                    url: 'https://httpbin.org/post',
                    method: 'POST',
                    body: {
                        test: 'SSL pinning test',
                        timestamp: new Date().toISOString()
                    },
                    timeout: 10
                });
                
                this.log(`✓ POST successful`);
                this.log(`Status: ${response.statusCode}`);
                const data = response.content.toJSON();
                this.log(`Posted data: ${JSON.stringify(data.json)}`);
            } catch (error) {
                this.log(`✗ Request failed: ${error}`);
            }
        },
        
        async testHttpbinJSON() {
            try {
                this.log(`Testing JSON endpoint...`);
                this.log(`SSL Pinning: ${this.pinningEnabled ? 'ENABLED' : 'DISABLED'}`);
                
                const response = await Https.request({
                    url: 'https://httpbin.org/json',
                    method: 'GET',
                    timeout: 10
                });
                
                this.log(`✓ Request successful`);
                this.log(`Status: ${response.statusCode}`);
                const data = response.content.toJSON();
                this.log(`JSON keys: ${Object.keys(data).join(', ')}`);
            } catch (error) {
                this.log(`✗ Request failed: ${error}`);
            }
        },
        
        async testDifferentHost() {
            try {
                this.log(`Testing request to different host...`);
                this.log(`Current pinning: ${this.currentHost || 'None'}`);
                this.log(`Trying to access: mockbin.com`);
                
                const response = await Https.request({
                    url: 'https://mockbin.com/request',
                    method: 'GET',
                    timeout: 10
                });
                
                this.log(`✓ Request successful (pinning doesn't affect other hosts)`);
                this.log(`Status: ${response.statusCode}`);
            } catch (error) {
                this.log(`✗ Request failed: ${error}`);
            }
        },
        
        async testUnpinnedHost() {
            try {
                this.log(`Testing unpinned host (should always work)...`);
                
                const response = await Https.request({
                    url: 'https://jsonplaceholder.typicode.com/todos/1',
                    method: 'GET',
                    timeout: 10
                });
                
                this.log(`✓ Unpinned host works normally`);
                this.log(`Status: ${response.statusCode}`);
                const data = response.content.toJSON();
                this.log(`Data: ${JSON.stringify(data)}`);
            } catch (error) {
                this.log(`✗ Request failed: ${error}`);
            }
        },
        
        async testValidCertificate() {
            this.log('Testing with valid certificate...');
            this.log('1. Enabling SSL pinning with valid cert');
            this.enableSSLPinningValid();
            
            await new Promise(resolve => setTimeout(resolve, 500));
            
            this.log('2. Making request to pinned host');
            await this.testHttpbinGet();
        },
        
        async testExpiredCertificate() {
            this.log('Testing with expired certificate...');
            this.log('1. Enabling SSL pinning with expired cert');
            this.enableSSLPinningExpired();
            
            await new Promise(resolve => setTimeout(resolve, 500));
            
            this.log('2. Making request (should fail)');
            await this.testHttpbinGet();
        },
        
        async testCertificateMismatch() {
            this.log('Testing certificate mismatch...');
            
            // Enable pinning for httpbin.org
            this.log('1. Enable pinning for httpbin.org');
            this.enableSSLPinningValid();
            
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Try to access httpbin (should work)
            this.log('2. Access httpbin.org (should work)');
            await this.testHttpbinGet();
            
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Try to access different host (should work - no pinning)
            this.log('3. Access different host (should work - no pinning)');
            await this.testDifferentHost();
        },
        
        async testMultiplePinnedHosts() {
            this.log('Testing multiple pinned hosts scenario...');
            this.log('Note: This implementation supports one host at a time');
            
            // Pin first host
            this.log('1. Pin httpbin.org');
            this.enableSSLPinningValid();
            await this.testHttpbinGet();
            
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Note: To pin another host, you'd need to call enableSSLPinning again
            this.log('To pin additional hosts, call enableSSLPinning for each');
        },
        
        async testReEnable() {
            this.log('Testing re-enable after disable...');
            
            // Enable
            this.log('1. Enable SSL pinning');
            this.enableSSLPinningValid();
            await this.testHttpbinGet();
            
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Disable
            this.log('2. Disable SSL pinning');
            this.disableSSLPinning();
            await this.testHttpbinGet();
            
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Re-enable
            this.log('3. Re-enable SSL pinning');
            this.enableSSLPinningValid();
            await this.testHttpbinGet();
        },
        
        async testCommonNameValidation() {
            try {
                this.log('Testing with common name validation...');
                
                const dir = fs.knownFolders.currentApp().getFolder('assets');
                const certificate = dir.getFile('httpbin.org.cer').path;
                
                Https.enableSSLPinning({
                    host: 'httpbin.org',
                    commonName: 'httpbin.org',  // Explicit common name
                    certificate
                });
                
                this.pinningEnabled = true;
                this.currentHost = 'httpbin.org';
                this.log('✓ SSL Pinning enabled with commonName validation');
                
                await this.testHttpbinGet();
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
.btn-success {
    background-color: #28a745;
}
.btn-warning {
    background-color: #ffc107;
    color: #333;
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
.text-small {
    font-size: 12;
}
.bg-light {
    background-color: #f8f9fa;
}
.bg-success {
    background-color: #d4edda;
}
.bg-warning {
    background-color: #fff3cd;
}
.font-weight-bold {
    font-weight: bold;
}
</style>
