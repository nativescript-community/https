import { ImageSource } from '@nativescript/core';
import { request } from './request';
import type { HttpsRequestOptions } from './request';
export * from './request';

/**
 * Downloads the content from the specified URL as a string.
 * @param arg either The URL to request from or HttpsRequestOptions options.
 */
export async function getString(arg: string | HttpsRequestOptions): Promise<string> {
    const r = await request(typeof arg === 'string' ? { url: arg, method: 'GET' } : arg);
    return r.content.toString();
}

/**
 * Downloads the content from the specified URL as a string and returns its JSON.parse representation.
 * @param arg either The URL to request from or HttpsRequestOptions options.
 */
export async function getJSON<T>(arg: string | HttpsRequestOptions): Promise<T> {
    const r = await request(typeof arg === 'string' ? { url: arg, method: 'GET' } : arg);
    return r.content.toJSON();
}

/**
 * Downloads the content from the specified URL and attempts to decode it as an image.
 * @param arg either The URL to request from or HttpsRequestOptions options.
 */
export async function getImage(arg: string | HttpsRequestOptions): Promise<ImageSource> {
    const r = await request(typeof arg === 'string' ? { url: arg, method: 'GET' } : arg);
    return r.content.toImage();
}

/**
 * Downloads the content from the specified URL and attempts to save it as file.
 * @param arg either The URL to request from or HttpsRequestOptions options.
 * @param destinationFilePath Optional. The downloaded file path.
 */
export async function getFile(arg: string | HttpsRequestOptions, destinationFilePath?: string): Promise<any> {
    const r = await request(typeof arg === 'string' ? { url: arg, method: 'GET' } : arg);
    return r.content.toFile(destinationFilePath);
}

/**
 * Downloads the content from the specified URL as binary and returns an ArrayBuffer.
 * @param arg either The URL to request from or HttpsRequestOptions options.
 */
export async function getBinary(arg: string | HttpsRequestOptions): Promise<ArrayBuffer> {
    const r = await request(typeof arg === 'string' ? { url: arg, method: 'GET' } : arg);
    return r.content.toArrayBuffer();
}
