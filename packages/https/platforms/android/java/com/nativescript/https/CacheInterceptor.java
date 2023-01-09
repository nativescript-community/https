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
        if (cacheControlHeader != null) {
            return originalResponse.newBuilder().header("Cache-Control", cacheControlHeader).build();
        } else {
            return originalResponse;
        }
    };
}