package com.nativescript.https;

import okhttp3.Cache;

public class CacheUtils {
    public static void removeCachedResponse(String url, Cache cache) {
        final Iterator<String> it = cache.urls();

        while (it.hasNext()) {
            String cacheUrl = it.next();
            
            if (cacheUrl.equals(url)) {
                it.remove();
                break;
            }
        }
    }
}