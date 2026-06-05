<template>
    <Page>
        <ActionBar title="File Operations" backgroundColor="#42b883" color="white">
            <NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="$navigateBack()" />
        </ActionBar>
        <GridLayout rows="auto,*">
            <StackLayout row="0" class="p-10 bg-light">
                <Label class="h3" text="File Upload & Download Tests" />
                <Label class="text-muted" text="Download to file, upload files, multipart form data" textWrap="true" />
            </StackLayout>
            <ScrollView row="1">
                <StackLayout class="p-20">
                    <!-- Download Tests -->
                    <Label class="h4 mt-20" text="Download to File" />
                    <Button text="Download Small File (toFile)" @tap="testDownloadSmallFile" class="btn btn-primary" />
                    <Button text="Download Medium File (toFile)" @tap="testDownloadMediumFile" class="btn btn-primary" />
                    <Button text="Download Large File (toFile)" @tap="testDownloadLargeFile" class="btn btn-primary" />
                    <Button text="Download with Progress" @tap="testDownloadWithProgress" class="btn btn-primary" />
                    <Progress v-if="showProgress" :value="progress" maxValue="100" class="mt-10" />
                    <Label v-if="showProgress" :text="`Progress: ${progress.toFixed(1)}%`" class="text-center" />
                    
                    <!-- Response Conversion Tests -->
                    <Label class="h4 mt-20" text="Response Conversion Methods" />
                    <Button text="toArrayBuffer() Test" @tap="testToArrayBuffer" class="btn btn-primary" />
                    <Button text="toString() Test" @tap="testToString" class="btn btn-primary" />
                    <Button text="toJSON() Test" @tap="testToJSON" class="btn btn-primary" />
                    <Button text="toImage() Test" @tap="testToImage" class="btn btn-primary" />
                    <Button text="toFile() Test" @tap="testToFile" class="btn btn-primary" />
                    
                    <!-- Async Methods -->
                    <Label class="h4 mt-20" text="Async Conversion Methods" />
                    <Button text="toArrayBufferAsync() Test" @tap="testToArrayBufferAsync" class="btn btn-primary" />
                    <Button text="toStringAsync() Test" @tap="testToStringAsync" class="btn btn-primary" />
                    <Button text="toJSONAsync() Test" @tap="testToJSONAsync" class="btn btn-primary" />
                    
                    <!-- File Upload Tests -->
                    <Label class="h4 mt-20" text="File Upload" />
                    <Button text="Create Test File" @tap="createTestFile" class="btn btn-secondary" />
                    <Button text="Upload File (POST)" @tap="testUploadFile" class="btn btn-primary" />
                    <Button text="Upload with Custom Headers" @tap="testUploadFileWithHeaders" class="btn btn-primary" />
                    
                    <!-- Multipart Form Data -->
                    <Label class="h4 mt-20" text="Multipart Form Data" />
                    <Button text="Multipart - Single File" @tap="testMultipartSingleFile" class="btn btn-primary" />
                    <Button text="Multipart - Multiple Files" @tap="testMultipartMultipleFiles" class="btn btn-primary" />
                    <Button text="Multipart - Files + Data" @tap="testMultipartFilesAndData" class="btn btn-primary" />
                    <Button text="Multipart - Complex Form" @tap="testMultipartComplexForm" class="btn btn-primary" />
                    
                    <!-- Binary Data -->
                    <Label class="h4 mt-20" text="Binary Data Handling" />
                    <Button text="Download Binary Data" @tap="testDownloadBinaryData" class="btn btn-primary" />
                    <Button text="Upload Binary Data" @tap="testUploadBinaryData" class="btn btn-primary" />
                    <Button text="Binary ArrayBuffer Test" @tap="testBinaryArrayBuffer" class="btn btn-primary" />
                    
                    <!-- Image Tests -->
                    <Label class="h4 mt-20" text="Image Handling" />
                    <Button text="Download Image (toImage)" @tap="testDownloadImage" class="btn btn-primary" />
                    <Button text="Download & Save Image" @tap="testDownloadAndSaveImage" class="btn btn-primary" />
                    
                    <!-- File Management -->
                    <Label class="h4 mt-20" text="File Management" />
                    <Button text="List Downloaded Files" @tap="listDownloadedFiles" class="btn btn-secondary" />
                    <Button text="Clean Up Test Files" @tap="cleanUpTestFiles" class="btn btn-secondary" />
                    
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
import { ImageSource, File } from '@nativescript/core';

export default Vue.extend({
    data() {
        return {
            results: 'Test results will appear here...',
            showProgress: false,
            progress: 0,
            testFilePath: ''
        };
    },
    methods: {
        log(message: string) {
            const timestamp = new Date().toLocaleTimeString();
            this.results = `[${timestamp}] ${message}\n\n${this.results}`;
            console.log(message);
        },
        
        async testDownloadSmallFile() {
            try {
                this.log('Downloading small file to disk...');
                
                const response = await Https.request({
                    url: 'https://httpbin.org/bytes/10240', // 10KB
                    method: 'GET'
                });
                
                const tempDir = fs.knownFolders.temp();
                const filePath = fs.path.join(tempDir.path, 'small-test.bin');
                
                const file = await response.content.toFile(filePath);
                this.log(`✓ File downloaded: ${file.path}`);
                this.log(`File size: ${file.size} bytes`);
                this.log(`File exists: ${fs.File.exists(filePath)}`);
            } catch (error) {
                this.log(`✗ Download failed: ${error}`);
            }
        },
        
        async testDownloadMediumFile() {
            try {
                this.log('Downloading medium file to disk...');
                
                const response = await Https.request({
                    url: 'https://httpbin.org/bytes/524288', // 512KB
                    method: 'GET'
                });
                
                const tempDir = fs.knownFolders.temp();
                const filePath = fs.path.join(tempDir.path, 'medium-test.bin');
                
                const file = await response.content.toFile(filePath);
                this.log(`✓ File downloaded: ${file.path}`);
                this.log(`File size: ${file.size} bytes (${(file.size / 1024).toFixed(2)} KB)`);
            } catch (error) {
                this.log(`✗ Download failed: ${error}`);
            }
        },
        
        async testDownloadLargeFile() {
            try {
                this.log('Downloading large file to disk...');
                this.log('This may take a moment...');
                
                const response = await Https.request({
                    url: 'https://httpbin.org/bytes/2097152', // 2MB
                    method: 'GET'
                });
                
                const tempDir = fs.knownFolders.temp();
                const filePath = fs.path.join(tempDir.path, 'large-test.bin');
                
                const file = await response.content.toFile(filePath);
                this.log(`✓ File downloaded: ${file.path}`);
                this.log(`File size: ${file.size} bytes (${(file.size / 1024 / 1024).toFixed(2)} MB)`);
            } catch (error) {
                this.log(`✗ Download failed: ${error}`);
            }
        },
        
        async testDownloadWithProgress() {
            try {
                this.log('Downloading with progress tracking...');
                this.showProgress = true;
                this.progress = 0;
                
                const tempDir = fs.knownFolders.temp();
                const filePath = fs.path.join(tempDir.path, 'progress-test.bin');
                
                const request = Https.createRequest({
                    url: 'https://httpbin.org/bytes/1048576', // 1MB
                    method: 'GET',
                    onProgress: (current, total) => {
                        this.progress = (current / total) * 100;
                        if (current === total) {
                            this.log(`Download progress: 100% (${total} bytes)`);
                        }
                    }
                });
                
                const response = await new Promise<any>((resolve, reject) => {
                    request.run(resolve, reject);
                });
                
                const file = await response.content.toFile(filePath);
                this.log(`✓ Download complete: ${file.path}`);
                this.log(`File size: ${file.size} bytes`);
                
                this.showProgress = false;
            } catch (error) {
                this.log(`✗ Download failed: ${error}`);
                this.showProgress = false;
            }
        },
        
        async testToArrayBuffer() {
            try {
                this.log('Testing toArrayBuffer()...');
                
                const response = await Https.request({
                    url: 'https://httpbin.org/bytes/1024',
                    method: 'GET'
                });
                
                const buffer = response.content.toArrayBuffer();
                this.log(`✓ ArrayBuffer obtained`);
                this.log(`Type: ${buffer.constructor.name}`);
                this.log(`Length: ${buffer.byteLength} bytes`);
                
                // Show first few bytes
                const view = new Uint8Array(buffer);
                const firstBytes = Array.from(view.slice(0, 16)).map(b => b.toString(16).padStart(2, '0')).join(' ');
                this.log(`First 16 bytes: ${firstBytes}`);
            } catch (error) {
                this.log(`✗ Test failed: ${error}`);
            }
        },
        
        async testToString() {
            try {
                this.log('Testing toString()...');
                
                const response = await Https.request({
                    url: 'https://httpbin.org/uuid',
                    method: 'GET'
                });
                
                const str = response.content.toString();
                this.log(`✓ String obtained`);
                this.log(`Type: ${typeof str}`);
                this.log(`Length: ${str.length} characters`);
                this.log(`Content: ${str.substring(0, 200)}${str.length > 200 ? '...' : ''}`);
            } catch (error) {
                this.log(`✗ Test failed: ${error}`);
            }
        },
        
        async testToJSON() {
            try {
                this.log('Testing toJSON()...');
                
                const response = await Https.request({
                    url: 'https://httpbin.org/json',
                    method: 'GET'
                });
                
                const json = response.content.toJSON();
                this.log(`✓ JSON parsed`);
                this.log(`Type: ${typeof json}`);
                this.log(`Keys: ${Object.keys(json).join(', ')}`);
                this.log(`Data: ${JSON.stringify(json).substring(0, 200)}...`);
            } catch (error) {
                this.log(`✗ Test failed: ${error}`);
            }
        },
        
        async testToImage() {
            try {
                this.log('Testing toImage()...');
                
                // Download a small image
                const response = await Https.request({
                    url: 'https://httpbin.org/image/jpeg',
                    method: 'GET'
                });
                
                const image = await response.content.toImage();
                this.log(`✓ Image loaded`);
                this.log(`Type: ${image.constructor.name}`);
                this.log(`Dimensions: ${image.width}x${image.height}`);
            } catch (error) {
                this.log(`✗ Test failed: ${error}`);
            }
        },
        
        async testToFile() {
            try {
                this.log('Testing toFile()...');
                
                const response = await Https.request({
                    url: 'https://httpbin.org/json',
                    method: 'GET'
                });
                
                const tempDir = fs.knownFolders.temp();
                const filePath = fs.path.join(tempDir.path, 'test-tofile.json');
                
                const file = await response.content.toFile(filePath);
                this.log(`✓ File saved`);
                this.log(`Path: ${file.path}`);
                this.log(`Size: ${file.size} bytes`);
                this.log(`Exists: ${fs.File.exists(filePath)}`);
                
                // Read and verify
                const fileContent = fs.File.fromPath(filePath);
                const text = await fileContent.readText();
                this.log(`Content: ${text.substring(0, 100)}...`);
            } catch (error) {
                this.log(`✗ Test failed: ${error}`);
            }
        },
        
        async testToArrayBufferAsync() {
            try {
                this.log('Testing toArrayBufferAsync()...');
                
                const response = await Https.request({
                    url: 'https://httpbin.org/bytes/2048',
                    method: 'GET'
                });
                
                const buffer = await response.content.toArrayBufferAsync();
                this.log(`✓ ArrayBuffer obtained (async)`);
                this.log(`Length: ${buffer.byteLength} bytes`);
            } catch (error) {
                this.log(`✗ Test failed: ${error}`);
            }
        },
        
        async testToStringAsync() {
            try {
                this.log('Testing toStringAsync()...');
                
                const response = await Https.request({
                    url: 'https://httpbin.org/get',
                    method: 'GET'
                });
                
                const str = await response.content.toStringAsync();
                this.log(`✓ String obtained (async)`);
                this.log(`Length: ${str.length} characters`);
                this.log(`Content: ${str.substring(0, 150)}...`);
            } catch (error) {
                this.log(`✗ Test failed: ${error}`);
            }
        },
        
        async testToJSONAsync() {
            try {
                this.log('Testing toJSONAsync()...');
                
                const response = await Https.request({
                    url: 'https://httpbin.org/json',
                    method: 'GET'
                });
                
                const json = await response.content.toJSONAsync();
                this.log(`✓ JSON parsed (async)`);
                this.log(`Data: ${JSON.stringify(json).substring(0, 200)}...`);
            } catch (error) {
                this.log(`✗ Test failed: ${error}`);
            }
        },
        
        async createTestFile() {
            try {
                this.log('Creating test file...');
                
                const tempDir = fs.knownFolders.temp();
                const filePath = fs.path.join(tempDir.path, 'upload-test.txt');
                
                const file = fs.File.fromPath(filePath);
                await file.writeText('This is a test file for upload.\nCreated at: ' + new Date().toISOString());
                
                this.testFilePath = filePath;
                this.log(`✓ Test file created: ${filePath}`);
                this.log(`File size: ${file.size} bytes`);
            } catch (error) {
                this.log(`✗ Failed to create file: ${error}`);
            }
        },
        
        async testUploadFile() {
            if (!this.testFilePath || !fs.File.exists(this.testFilePath)) {
                this.log('⚠️ Please create a test file first');
                return;
            }
            
            try {
                this.log('Uploading file...');
                
                const file = fs.File.fromPath(this.testFilePath);
                
                const response = await Https.request({
                    url: 'https://httpbin.org/post',
                    method: 'POST',
                    body: file
                });
                
                this.log(`✓ File uploaded`);
                this.log(`Status: ${response.statusCode}`);
                const data = response.content.toJSON();
                this.log(`Response: ${JSON.stringify(data).substring(0, 200)}...`);
            } catch (error) {
                this.log(`✗ Upload failed: ${error}`);
            }
        },
        
        async testUploadFileWithHeaders() {
            if (!this.testFilePath || !fs.File.exists(this.testFilePath)) {
                this.log('⚠️ Please create a test file first');
                return;
            }
            
            try {
                this.log('Uploading file with custom headers...');
                
                const file = fs.File.fromPath(this.testFilePath);
                
                const response = await Https.request({
                    url: 'https://httpbin.org/post',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'text/plain',
                        'X-File-Name': 'upload-test.txt',
                        'X-Upload-Time': new Date().toISOString()
                    },
                    body: file
                });
                
                this.log(`✓ File uploaded with headers`);
                this.log(`Status: ${response.statusCode}`);
                const data = response.content.toJSON();
                this.log(`Headers sent: ${JSON.stringify(data.headers)}`);
            } catch (error) {
                this.log(`✗ Upload failed: ${error}`);
            }
        },
        
        async testMultipartSingleFile() {
            if (!this.testFilePath || !fs.File.exists(this.testFilePath)) {
                this.log('⚠️ Please create a test file first');
                return;
            }
            
            try {
                this.log('Uploading multipart with single file...');
                
                const file = fs.File.fromPath(this.testFilePath);
                const content = await file.readText();
                
                const response = await Https.request({
                    url: 'https://httpbin.org/post',
                    method: 'POST',
                    headers:{
                        'Content-Type': 'multipart/form-data'
                    },
                    body: [
                        {
                            data: content,
                            parameterName: 'file',
                            fileName: 'test.txt',
                            contentType: 'text/plain'
                        }
                    ]
                });
                
                this.log(`✓ Multipart upload successful`);
                this.log(`Status: ${response.statusCode}`);
                const data = response.content.toJSON();
                this.log(`Files: ${JSON.stringify(data.files)}`);
            } catch (error) {
                this.log(`✗ Upload failed: ${error}`);
            }
        },
        
        async testMultipartMultipleFiles() {
            try {
                this.log('Creating and uploading multiple files...');
                
                const tempDir = fs.knownFolders.temp();
                
                // Create test files
                const file1Path = fs.path.join(tempDir.path, 'file1.txt');
                const file2Path = fs.path.join(tempDir.path, 'file2.txt');
                
                await fs.File.fromPath(file1Path).writeText('Content of file 1');
                await fs.File.fromPath(file2Path).writeText('Content of file 2');
                
                const content1 = await fs.File.fromPath(file1Path).readText();
                const content2 = await fs.File.fromPath(file2Path).readText();
                
                const response = await Https.request({
                    url: 'https://httpbin.org/post',
                    method: 'POST',
                    headers:{
                        'Content-Type': 'multipart/form-data'
                    },
                    body: [
                        {
                            data: content1,
                            parameterName: 'file1',
                            fileName: 'file1.txt',
                            contentType: 'text/plain'
                        },
                        {
                            data: content2,
                            parameterName: 'file2',
                            fileName: 'file2.txt',
                            contentType: 'text/plain'
                        }
                    ]
                });
                
                this.log(`✓ Multiple files uploaded`);
                this.log(`Status: ${response.statusCode}`);
                const data = response.content.toJSON();
                this.log(`Files uploaded: ${Object.keys(data.files || {}).length}`);
            } catch (error) {
                this.log(`✗ Upload failed: ${error}`);
            }
        },
        
        async testMultipartFilesAndData() {
            if (!this.testFilePath || !fs.File.exists(this.testFilePath)) {
                this.log('⚠️ Please create a test file first');
                return;
            }
            
            try {
                this.log('Uploading multipart with files and form data...');
                
                const file = fs.File.fromPath(this.testFilePath);
                const content = await file.readText();
                
                const response = await Https.request({
                    url: 'https://httpbin.org/post',
                    method: 'POST',
                    headers:{
                        'Content-Type': 'multipart/form-data'
                    },
                    body: [
                        {
                            data: content,
                            parameterName: 'file',
                            fileName: 'test.txt',
                            contentType: 'text/plain'
                        },
                        {
                            data: 'John Doe',
                            parameterName: 'name'
                        },
                        {
                            data: 'john@example.com',
                            parameterName: 'email'
                        }
                    ]
                });
                
                this.log(`✓ Multipart upload with data successful`);
                const data = response.content.toJSON();
                this.log(`Form data: ${JSON.stringify(data.form)}`);
                this.log(`Files: ${JSON.stringify(data.files)}`);
            } catch (error) {
                this.log(`✗ Upload failed: ${error}`);
            }
        },
        
        async testMultipartComplexForm() {
            try {
                this.log('Testing complex multipart form...');
                
                const response = await Https.request({
                    url: 'https://httpbin.org/post',
                    method: 'POST',
                    headers:{
                        'Content-Type': 'multipart/form-data'
                    },
                    body: [
                        { data: 'Test User', parameterName: 'username' },
                        { data: 'test@example.com', parameterName: 'email' },
                        { data: '25', parameterName: 'age' },
                        { data: 'true', parameterName: 'active' },
                        { data: 'Hello World!', parameterName: 'message', contentType: 'text/plain' }
                    ]
                });
                
                this.log(`✓ Complex form uploaded`);
                const data = response.content.toJSON();
                this.log(`Form data: ${JSON.stringify(data.form)}`);
            } catch (error) {
                this.log(`✗ Upload failed: ${error}`);
            }
        },
        
        async testDownloadBinaryData() {
            try {
                this.log('Downloading binary data...');
                
                const response = await Https.request({
                    url: 'https://httpbin.org/bytes/256',
                    method: 'GET'
                });
                
                const buffer = response.content.toArrayBuffer();
                const view = new Uint8Array(buffer);
                
                this.log(`✓ Binary data downloaded`);
                this.log(`Size: ${buffer.byteLength} bytes`);
                this.log(`First 32 bytes: ${Array.from(view.slice(0, 32)).map(b => b.toString(16).padStart(2, '0')).join(' ')}`);
            } catch (error) {
                this.log(`✗ Download failed: ${error}`);
            }
        },
        
        async testUploadBinaryData() {
            try {
                this.log('Uploading binary data...');
                
                // Create binary data
                const buffer = new ArrayBuffer(128);
                const view = new Uint8Array(buffer);
                for (let i = 0; i < view.length; i++) {
                    view[i] = i % 256;
                }
                
                // Note: This may require platform-specific handling
                this.log('Binary upload test - implementation depends on platform');
                this.log(`Created buffer: ${buffer.byteLength} bytes`);
            } catch (error) {
                this.log(`✗ Upload failed: ${error}`);
            }
        },
        
        async testBinaryArrayBuffer() {
            try {
                this.log('Testing ArrayBuffer operations...');
                
                const response = await Https.request({
                    url: 'https://httpbin.org/bytes/512',
                    method: 'GET'
                });
                
                const buffer = response.content.toArrayBuffer();
                const view = new Uint8Array(buffer);
                
                this.log(`✓ ArrayBuffer obtained`);
                this.log(`Size: ${buffer.byteLength} bytes`);
                
                // Calculate some statistics
                let sum = 0;
                for (let i = 0; i < view.length; i++) {
                    sum += view[i];
                }
                const avg = sum / view.length;
                
                this.log(`Average byte value: ${avg.toFixed(2)}`);
                this.log(`First byte: 0x${view[0].toString(16).padStart(2, '0')}`);
                this.log(`Last byte: 0x${view[view.length - 1].toString(16).padStart(2, '0')}`);
            } catch (error) {
                this.log(`✗ Test failed: ${error}`);
            }
        },
        
        async testDownloadImage() {
            try {
                this.log('Downloading image with toImage()...');
                
                const response = await Https.request({
                    url: 'https://httpbin.org/image/png',
                    method: 'GET'
                });
                
                const image = await response.content.toImage();
                this.log(`✓ Image loaded`);
                this.log(`Width: ${image.width}px`);
                this.log(`Height: ${image.height}px`);
                this.log(`Type: ${image.constructor.name}`);
            } catch (error) {
                this.log(`✗ Download failed: ${error}`);
            }
        },
        
        async testDownloadAndSaveImage() {
            try {
                this.log('Downloading and saving image...');
                
                const response = await Https.request({
                    url: 'https://httpbin.org/image/jpeg',
                    method: 'GET'
                });
                
                const tempDir = fs.knownFolders.temp();
                const filePath = fs.path.join(tempDir.path, 'test-image.jpg');
                
                const file = await response.content.toFile(filePath);
                this.log(`✓ Image saved: ${file.path}`);
                this.log(`File size: ${file.size} bytes (${(file.size / 1024).toFixed(2)} KB)`);
                
                // Load as image
                const image = await response.content.toImage();
                this.log(`Image dimensions: ${image.width}x${image.height}`);
            } catch (error) {
                this.log(`✗ Download failed: ${error}`);
            }
        },
        
        listDownloadedFiles() {
            try {
                this.log('Listing files in temp directory...');
                
                const tempDir = fs.knownFolders.temp();
                const entities = tempDir.getEntitiesSync();
                
                let fileCount = 0;
                let totalSize = 0;
                
                entities.forEach(entity => {
                    if (entity instanceof fs.File) {
                        if (entity.name.includes('test') || entity.name.includes('download')) {
                            fileCount++;
                            totalSize += entity.size;
                            this.log(`- ${entity.name} (${entity.size} bytes)`);
                        }
                    }
                });
                
                this.log(`\n✓ Found ${fileCount} test files`);
                this.log(`Total size: ${totalSize} bytes (${(totalSize / 1024).toFixed(2)} KB)`);
            } catch (error) {
                this.log(`✗ Failed to list files: ${error}`);
            }
        },
        
        cleanUpTestFiles() {
            try {
                this.log('Cleaning up test files...');
                
                const tempDir = fs.knownFolders.temp();
                const entities = tempDir.getEntitiesSync();
                
                let deletedCount = 0;
                let freedSpace = 0;
                
                entities.forEach(entity => {
                    if (entity instanceof fs.File) {
                        if (entity.name.includes('test') || entity.name.includes('download') || 
                            entity.name.includes('upload') || entity.name.includes('progress') ||
                            entity.name.includes('early') || entity.name.includes('file1') || 
                            entity.name.includes('file2') || entity.name.includes('image')) {
                            freedSpace += entity.size;
                            entity.removeSync();
                            deletedCount++;
                            this.log(`Deleted: ${entity.name}`);
                        }
                    }
                });
                
                this.log(`✓ Cleaned up ${deletedCount} files`);
                this.log(`Freed space: ${freedSpace} bytes (${(freedSpace / 1024).toFixed(2)} KB)`);
                
                this.testFilePath = '';
            } catch (error) {
                this.log(`✗ Cleanup failed: ${error}`);
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
.btn-secondary {
    background-color: #6c757d;
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
