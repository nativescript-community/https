package com.nativescript.https;
import okhttp3.Interceptor;
import okhttp3.Request;
import okhttp3.Response;
import java.io.IOException;


public class CacheInterceptor {
    public static final Interceptor INTERCEPTOR = chain -> {
        Request originalRequest = chain.request();
        String cacheControlHeader = originalRequest.header("Cache-Control");
        Response originalResponse = chain.proceed(originalRequest);

        // Only touch GET responses
        if (!"GET".equalsIgnoreCase(originalRequest.method())) {
            return originalResponse;
        }

        String respCc = originalResponse.header("Cache-Control");
        // If server didn't provide caching or forbids it, add a safe fallback
        if (cacheControlHeader != null && (respCc == null || respCc.isEmpty() || respCc.contains("no-store") || respCc.contains("no-cache"))) {
            // revalidate on network (max-age=0) but allow stale fallback if error
            // stale-if-error may not be honored by everything but OkHttp will cache, enabling our fallback
            return originalResponse.newBuilder()
                    .removeHeader("Pragma")
                    .header("Cache-Control", cacheControlHeader)
                    .build();
        }
        return originalResponse;
    };
}