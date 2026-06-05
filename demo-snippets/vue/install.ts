import Vue from 'nativescript-vue';
import Basic from './Basic.vue';
import CachingAndCookies from './CachingAndCookies.vue';
import BasicRequests from './BasicRequests.vue';
import ConditionalStreaming from './ConditionalStreaming.vue';
import EarlyResolution from './EarlyResolution.vue';
import ErrorHandling from './ErrorHandling.vue';
import FileOperations from './FileOperations.vue';
import ProgressAndCancellation from './ProgressAndCancellation.vue';
import SSLPinning from './SSLPinning.vue';
import * as Https from '@nativescript-community/https';
import * as fs from '@nativescript/core/file-system';

const folder = fs.knownFolders.temp().getFolder('cache');
const diskLocation = folder.path;
const cacheSize = 10 * 1024 * 1024;
Https.setCache({
    // forceCache: true,
    diskLocation,
    diskSize: cacheSize,
    memorySize: cacheSize
});

export function installPlugin() {}

export const demos = [
    { name: 'Basic', path: 'basic', component: Basic },
    { name: 'BasicRequests', path: 'BasicRequests', component: BasicRequests },
    { name: 'CachingAndCookies', path: 'CachingAndCookies', component: CachingAndCookies },
    { name: 'ConditionalStreaming', path: 'ConditionalStreaming', component: ConditionalStreaming },
    { name: 'EarlyResolution', path: 'EarlyResolution', component: EarlyResolution },
    { name: 'ErrorHandling', path: 'ErrorHandling', component: ErrorHandling },
    { name: 'FileOperations', path: 'FileOperations', component: FileOperations },
    { name: 'ProgressAndCancellation', path: 'ProgressAndCancellation', component: ProgressAndCancellation },
    { name: 'SSLPinning', path: 'SSLPinning', component: SSLPinning },
];
