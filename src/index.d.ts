/* eslint-disable @typescript-eslint/unified-signatures */
/* eslint-disable no-redeclare */
import { ImageSource } from '@nativescript/core';
import { HttpsRequestOptions } from './request';

export * from './request';

/**
 * Downloads the content from the specified URL as a string.
 * @param url The URL to request from.
 */
export function getString(url: string): Promise<string>;

/**
 * Downloads the content from the specified URL as a string.
 * @param options An object that specifies various request options.
 */
export function getString(options: HttpsRequestOptions): Promise<string>;

/**
 * Downloads the content from the specified URL as a string and returns its JSON.parse representation.
 * @param url The URL to request from.
 */
export function getJSON<T>(url: string): Promise<T>;

/**
 * Downloads the content from the specified URL as a string and returns its JSON.parse representation.
 * @param options An object that specifies various request options.
 */
export function getJSON<T>(options: HttpsRequestOptions): Promise<T>;

/**
 * Downloads the content from the specified URL and attempts to decode it as an image.
 * @param url The URL to request from.
 */
export function getImage(url: string): Promise<ImageSource>;

/**
 * Downloads the content from the specified URL and attempts to decode it as an image.
 * @param options An object that specifies various request options.
 */
export function getImage(options: HttpsRequestOptions): Promise<ImageSource>;

/**
 * Downloads the content from the specified URL and attempts to save it as file.
 * @param url The URL to request from.
 * @param destinationFilePath Optional. The downloaded file path.
 */
export function getFile(url: string, destinationFilePath?: string): Promise<File>;

/**
 * Downloads the content from the specified URL and attempts to save it as file.
 * @param options An object that specifies various request options.
 * @param destinationFilePath Optional. The downloaded file path.
 */
export function getFile(options: HttpsRequestOptions, destinationFilePath?: string): Promise<File>;

/**
 * Downloads the content from the specified URL as binary and returns an ArrayBuffer.
 * @param url The URL to request from.
 */
export function getBinary(url: string): Promise<ArrayBuffer>;

/**
 * Downloads the content from the specified URL as binary and returns an ArrayBuffer.
 * @param options An object that specifies various request options.
 */
export function getBinary(options: HttpsRequestOptions): Promise<ArrayBuffer>;
