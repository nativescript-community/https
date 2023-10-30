import { knownFolders, path } from '@nativescript/core';

export function getFilenameFromUrl(url: string) {
    const slashPos = url.lastIndexOf('/') + 1;
    const questionMarkPos = url.lastIndexOf('?');

    let actualFileName: string;
    if (questionMarkPos !== -1) {
        actualFileName = url.substring(slashPos, questionMarkPos);
    } else {
        actualFileName = url.substring(slashPos);
    }

    const result = path.join(knownFolders.documents().path, actualFileName);

    return result;
}

export function parseJSON(source: string): any {
    const src = source.trim();
    if (src.lastIndexOf(')') === src.length - 1) {
        return JSON.parse(src.substring(src.indexOf('(') + 1, src.lastIndexOf(')')));
    }

    return JSON.parse(src);
}

export const interceptors = [];

export function addInterceptor(interceptor) {
    interceptors.push(interceptor);
}

export const networkInterceptors = [];

export function addNetworkInterceptor(interceptor) {
    networkInterceptors.push(interceptor);
}
