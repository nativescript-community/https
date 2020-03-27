package com.nativescript.https;
import android.util.Log;
import okhttp3.Callback;

public class OkhttpCallback implements okhttp3.Callback {
    final String TAG = "OkhttpCallback";
    public void  onStringResponse(String responseString, int statusCode, okhttp3.Headers headers) {}
    public void onResponse(okhttp3.Call call, okhttp3.Response response ) throws java.io.IOException {
            String responseString = null;
            Log.d(TAG, "onResponse1: " + ((android.os.Looper.getMainLooper().getThread() == java.lang.Thread.currentThread()) ? "1" : "0"));
            okhttp3.ResponseBody responseBody = response.body();
            responseString =  responseBody.string();
            responseBody.close();
            Log.d(TAG, "onResponse2");
            onStringResponse(responseString, response.code(), response.headers());
    }
    public void onFailure(okhttp3.Call call, java.io.IOException e) {}
}