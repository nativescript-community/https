import Vue from 'nativescript-vue';
import Basic from './Basic.vue';
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

export const demos = [{ name: 'Basic', path: 'basic', component: Basic }];
