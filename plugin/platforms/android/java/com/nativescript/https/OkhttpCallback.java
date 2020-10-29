package com.nativescript.https;
import okhttp3.Callback;

public class OkhttpCallback implements Callback {
    final String TAG = "OkhttpCallback";
    public void  onStringResponse(String responseString, int statusCode, okhttp3.Headers headers) {}
    public void onResponse(okhttp3.Call call, okhttp3.Response response ) throws java.io.IOException {
            String responseString = null;
            okhttp3.ResponseBody responseBody = response.body();
            responseString =  responseBody.string();
            responseBody.close();
            onStringResponse(responseString, response.code(), response.headers());
    }
    public void onFailure(okhttp3.Call call, java.io.IOException e) {}


}