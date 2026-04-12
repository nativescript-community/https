<template>
    <Page>
        <ActionBar title="Basic HTTP Methods" backgroundColor="#42b883" color="white">
            <NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="$navigateBack()" />
        </ActionBar>
        <GridLayout rows="auto,*">
            <StackLayout row="0" class="p-10 bg-light">
                <Label class="h3" text="Test Basic HTTP Methods" />
                <Label class="text-muted" text="GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS" textWrap="true" />
            </StackLayout>
            <ScrollView row="1">
                <StackLayout class="p-20">
                    <!-- GET Requests -->
                    <Label class="h4 mt-20" text="GET Requests" />
                    <Button text="GET - Simple Request" class="btn btn-primary" @tap="testGet" />
                    <Button text="GET - With Query Params" class="btn btn-primary" @tap="testGetWithParams" />
                    <Button text="GET - With Headers" class="btn btn-primary" @tap="testGetWithHeaders" />
                    <Button text="GET - JSON Response" class="btn btn-primary" @tap="testGetJSON" />

                    <!-- POST Requests -->
                    <Label class="h4 mt-20" text="POST Requests" />
                    <Button text="POST - JSON Body" class="btn btn-primary" @tap="testPostJSON" />
                    <Button text="POST - Form Data" class="btn btn-primary" @tap="testPostForm" />
                    <Button text="POST - With UTF-8" class="btn btn-primary" @tap="testPostUTF8" />

                    <!-- Other Methods -->
                    <Label class="h4 mt-20" text="Other HTTP Methods" />
                    <Button text="PUT Request" class="btn btn-primary" @tap="testPut" />
                    <Button text="PATCH Request" class="btn btn-primary" @tap="testPatch" />
                    <Button text="DELETE Request" class="btn btn-primary" @tap="testDelete" />
                    <Button text="HEAD Request" class="btn btn-primary" @tap="testHead" />
                    <Button text="OPTIONS Request" class="btn btn-primary" @tap="testOptions" />

                    <!-- Response Format Tests -->
                    <Label class="h4 mt-20" text="Response Format Tests" />
                    <Button text="Test toString()" class="btn btn-primary" @tap="testToString" />
                    <Button text="Test toJSON()" class="btn btn-primary" @tap="testToJSON" />
                    <Button text="Test toArrayBuffer()" class="btn btn-primary" @tap="testToArrayBuffer" />

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
            results: 'Test results will appear here...'
        };
    },
    methods: {
        log(message: string) {
            const timestamp = new Date().toLocaleTimeString();
            this.results = `[${timestamp}] ${message}\n\n${this.results}`;
            console.log(message);
        },

        async testGet() {
            try {
                this.log('Testing GET request...');
                const response = await Https.request({
                    url: 'https://httpbin.org/get',
                    method: 'GET'
                });
                this.log(`✓ GET success: ${response.statusCode}`);
                this.log(`Response: ${response.content.toString().substring(0, 200)}...`);
            } catch (error) {
                this.log(`✗ GET failed: ${error}`);
            }
        },

        async testGetWithParams() {
            try {
                this.log('Testing GET with query params...');
                const response = await Https.request({
                    url: 'https://httpbin.org/get',
                    method: 'GET',
                    params: {
                        foo: 'bar',
                        test: 123,
                        active: true
                    }
                });
                this.log(`✓ GET with params success: ${response.statusCode}`);
                const data = response.content.toJSON();
                this.log(`Query params: ${JSON.stringify(data.args)}`);
            } catch (error) {
                this.log(`✗ GET with params failed: ${error}`);
            }
        },

        async testGetWithHeaders() {
            try {
                this.log('Testing GET with custom headers...');
                const response = await Https.request({
                    url: 'https://httpbin.org/get',
                    method: 'GET',
                    headers: {
                        'X-Custom-Header': 'test-value',
                        'X-API-Key': 'dummy-key-123',
                        Accept: 'application/json'
                    }
                });
                this.log(`✓ GET with headers success: ${response.statusCode}`);
                const data = response.content.toJSON();
                this.log(`Custom headers received: ${JSON.stringify(data.headers)}`);
            } catch (error) {
                this.log(`✗ GET with headers failed: ${error}`);
            }
        },

        async testGetJSON() {
            try {
                this.log('Testing GET JSON endpoint...');
                const response = await Https.request({
                    url: 'https://httpbin.org/json',
                    method: 'GET'
                });
                this.log(`✓ GET JSON success: ${response.statusCode}`);
                const data = response.content.toJSON();
                this.log(`JSON data: ${JSON.stringify(data).substring(0, 200)}...`);
            } catch (error) {
                this.log(`✗ GET JSON failed: ${error}`);
            }
        },

        async testPostJSON() {
            try {
                this.log('Testing POST with JSON body...');
                const response = await Https.request({
                    url: 'https://httpbin.org/post',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: {
                        name: 'Test User',
                        email: 'test@example.com',
                        age: 25,
                        active: true
                    }
                });
                this.log(`✓ POST JSON success: ${response.statusCode}`);
                const data = response.content.toJSON();
                this.log(`Posted data: ${JSON.stringify(data.json)}`);
            } catch (error) {
                this.log(`✗ POST JSON failed: ${error}`);
            }
        },

        async testPostForm() {
            try {
                this.log('Testing POST with form data...');
                const response = await Https.request({
                    url: 'https://httpbin.org/post',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: {
                        username: 'testuser',
                        password: 'secret123'
                    }
                });
                this.log(`✓ POST form success: ${response.statusCode}`);
                const data = response.content.toJSON();
                this.log(`Form data: ${JSON.stringify(data.form)}`);
            } catch (error) {
                this.log(`✗ POST form failed: ${error}`);
            }
        },

        async testPostUTF8() {
            try {
                this.log('Testing POST with UTF-8 characters...');
                const response = await Https.request({
                    url: 'https://httpbin.org/post',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    },
                    body: {
                        message: 'Hello 世界 🌍',
                        emoji: '🚀💻📱',
                        special: 'Ñoño, Zürich, Москва'
                    }
                });
                this.log(`✓ POST UTF-8 success: ${response.statusCode}`);
                const data = response.content.toJSON();
                this.log(`UTF-8 data: ${JSON.stringify(data.json)}`);
            } catch (error) {
                this.log(`✗ POST UTF-8 failed: ${error}`);
            }
        },

        async testPut() {
            try {
                this.log('Testing PUT request...');
                const response = await Https.request({
                    url: 'https://httpbin.org/put',
                    method: 'PUT',
                    body: {
                        id: 123,
                        updated: true
                    }
                });
                this.log(`✓ PUT success: ${response.statusCode}`);
                this.log(`Response: ${response.content.toString().substring(0, 100)}...`);
            } catch (error) {
                this.log(`✗ PUT failed: ${error}`);
            }
        },

        async testPatch() {
            try {
                this.log('Testing PATCH request...');
                const response = await Https.request({
                    url: 'https://httpbin.org/patch',
                    method: 'PATCH',
                    body: {
                        field: 'value'
                    }
                });
                this.log(`✓ PATCH success: ${response.statusCode}`);
                this.log(`Response: ${response.content.toString().substring(0, 100)}...`);
            } catch (error) {
                this.log(`✗ PATCH failed: ${error}`);
            }
        },

        async testDelete() {
            try {
                this.log('Testing DELETE request...');
                const response = await Https.request({
                    url: 'https://httpbin.org/delete',
                    method: 'DELETE'
                });
                this.log(`✓ DELETE success: ${response.statusCode}`);
                this.log(`Response: ${response.content.toString().substring(0, 100)}...`);
            } catch (error) {
                this.log(`✗ DELETE failed: ${error}`);
            }
        },

        async testHead() {
            try {
                this.log('Testing HEAD request...');
                const response = await Https.request({
                    url: 'https://httpbin.org/get',
                    method: 'HEAD'
                });
                this.log(`✓ HEAD success: ${response.statusCode}`);
                this.log(`Headers: ${JSON.stringify(response.headers)}`);
                this.log(`Content-Length: ${response.contentLength}`);
            } catch (error) {
                this.log(`✗ HEAD failed: ${error}`);
            }
        },

        async testOptions() {
            try {
                this.log('Testing OPTIONS request...');
                const response = await Https.request({
                    url: 'https://httpbin.org/get',
                    method: 'OPTIONS'
                });
                this.log(`✓ OPTIONS success: ${response.statusCode}`);
                this.log(`Headers: ${JSON.stringify(response.headers)}`);
            } catch (error) {
                this.log(`✗ OPTIONS failed: ${error}`);
            }
        },

        async testToString() {
            try {
                this.log('Testing toString() method...');
                const response = await Https.request({
                    url: 'https://httpbin.org/get',
                    method: 'GET'
                });
                const str = response.content.toString();
                this.log(`✓ toString() success`);
                this.log(`String length: ${str.length}`);
                this.log(`First 100 chars: ${str.substring(0, 100)}...`);
            } catch (error) {
                this.log(`✗ toString() failed: ${error}`);
            }
        },

        async testToJSON() {
            try {
                this.log('Testing toJSON() method...');
                const response = await Https.request({
                    url: 'https://httpbin.org/json',
                    method: 'GET'
                });
                const json = response.content.toJSON();
                this.log(`✓ toJSON() success`);
                this.log(`JSON type: ${typeof json}`);
                this.log(`JSON data: ${JSON.stringify(json).substring(0, 200)}...`);
            } catch (error) {
                this.log(`✗ toJSON() failed: ${error}`);
            }
        },

        async testToArrayBuffer() {
            try {
                this.log('Testing toArrayBuffer() method...');
                const response = await Https.request({
                    url: 'https://httpbin.org/bytes/1024',
                    method: 'GET'
                });
                const buffer = response.content.toArrayBuffer();
                this.log(`✓ toArrayBuffer() success`);
                this.log(`Buffer length: ${buffer.byteLength} bytes`);
            } catch (error) {
                this.log(`✗ toArrayBuffer() failed: ${error}`);
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
