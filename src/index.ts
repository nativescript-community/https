import { ImageSource } from '@nativescript/core';
import { request } from './request';
export * from './request';

export async function getString(arg: any): Promise<string> {
    const r = await request(typeof arg === 'string' ? { url: arg, method: 'GET' } : arg);
    return r.content.toString();
}

export async function getJSON<T>(arg: any): Promise<T> {
    const r = await request(typeof arg === 'string' ? { url: arg, method: 'GET' } : arg);
    return r.content.toJSON();
}

export async function getImage(arg: any): Promise<ImageSource> {
    const r = await request(typeof arg === 'string' ? { url: arg, method: 'GET' } : arg);
    return r.content.toImage();
}

export async function getFile(arg: any, destinationFilePath?: string): Promise<any> {
    const r = await request(typeof arg === 'string' ? { url: arg, method: 'GET' } : arg);
    return r.content.toFile(destinationFilePath);
}

export async function getBinary(arg: any): Promise<ArrayBuffer> {
    const r = await request(typeof arg === 'string' ? { url: arg, method: 'GET' } : arg);
    return r.content.toArrayBuffer();
}
