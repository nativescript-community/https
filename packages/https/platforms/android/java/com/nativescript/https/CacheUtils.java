package com.nativescript.https;

import java.util.Iterator;
import okhttp3.Cache;

public class CacheUtils {
    public static void removeCachedResponse(String url, Cache cache) {
        Iterator<String> it;
        try {
          it = cache.urls();
        } catch (Exception e) {
          it = null;
        }

        if (it != null) {
            while (it.hasNext()) {
                String cacheUrl = it.next();

                if (cacheUrl.equals(url)) {
                    it.remove();
                    break;
                }
            }
        }
    }
}
