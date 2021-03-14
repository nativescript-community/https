package com.nativescript.https;
import okhttp3.Interceptor;
import okhttp3.Request;
import okhttp3.Response;
import java.io.IOException;

public class CacheInterceptor implements Interceptor {
    final String TAG = "CacheInterceptor";

    public Response intercept(Interceptor.Chain chain ) throws IOException {
        Request originalRequest = chain.request();
        String cacheControlHeader = originalRequest.header("Cache-Control");
        Response originalResponse = chain.proceed(originalRequest);
        return originalResponse.newBuilder().header("Cache-Control", cacheControlHeader).build();
    }


}