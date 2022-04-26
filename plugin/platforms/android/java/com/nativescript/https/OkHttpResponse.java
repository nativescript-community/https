package com.nativescript.https;

import java.io.BufferedInputStream;
import java.io.OutputStream;
import java.io.FileOutputStream;
import java.io.PipedOutputStream;
import java.io.PipedInputStream;
import java.io.InputStream;
import java.io.File;
import java.io.IOException;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;

import okhttp3.ResponseBody;
import okhttp3.Response;

public class OkHttpResponse {
    private final static String TAG = "OkHttpResponse";
    private ResponseBody responseBody;
    static Handler mainHandler = null;
    static boolean RUN_ON_MAIN_THREAD = true;
    public static final int DOWNLOAD_CHUNK_SIZE = 2048; // Same as Okio Segment.SIZE
    public OkHttpResponseProgressCallback progressCallback = null;
    public OkHttpResponseCloseCallback closeCallback = null;

    public static interface OkHttpResponseAsyncCallback {
        void onException(final Exception exc);

        void onFile(File file);

        void onBitmap(Bitmap bitmap);

        void onByteArray(java.nio.ByteBuffer buffer);

        void onString(String result);
    }

    public static interface OkHttpResponseProgressCallback {
        void onProgress(final long current, final long total);
    }

    public static interface OkHttpResponseCloseCallback {
        void onClose();
    }
    private static class NotifyRunnable implements Runnable {
        private final Runnable mRunnable;
        private final Handler mHandler;
        private boolean mFinished = false;

        public  NotifyRunnable(final Handler handler, final Runnable r) {
            mRunnable = r;
            mHandler = handler;
        }

        public boolean isFinished() {
            return mFinished;
        }

        @Override
        public void run() {
            synchronized (mHandler) {
                Log.d("JS", "NotifyRunnable run");
                mRunnable.run();
                mFinished = true;
                mHandler.notifyAll();
            }
        }
    }
    
    public static void postAndWait(final Handler handler, final Runnable r) {

        if (handler.getLooper() == Looper.myLooper()) {
            r.run();
        } else {
            synchronized (handler) {
                Log.d("JS", "postAndWait1");
                NotifyRunnable runnable = new NotifyRunnable(handler, r);
                handler.post(runnable);
                Log.d("JS", "postAndWait2");
                while (!runnable.isFinished()) {
                    Log.d("JS", "postAndWait3");
                    try {
                        handler.wait();
                    } catch (InterruptedException is) {
                        Log.d("JS", "postAndWait4", is);
                        // ignore
                    }
                }
            }
        }
    }

    public OkHttpResponse(ResponseBody body) {
        responseBody = body;
    }

    private boolean cancelled = false;

    public void cancel() {
        cancelled = true;
    }
    public long contentLength() {
        return responseBody.contentLength();
    }

    private static Handler getMainHandler() {
        if (mainHandler == null) {
            mainHandler = new Handler(android.os.Looper.getMainLooper());
        }
        return mainHandler;
    }

    static void runProgressCallback(final OkHttpResponseProgressCallback progressCallback, final long current,
            final long total) {
        if (progressCallback == null) {
            return;
        }
        if (RUN_ON_MAIN_THREAD) {
            getMainHandler().post(new Runnable() {
                @Override
                public void run() {
                    progressCallback.onProgress(current, total);
                }
            });
        } else {
            progressCallback.onProgress(current, total);
        }
    }

    static void runCloseCallback(final OkHttpResponseCloseCallback closeCallback) {
        if (closeCallback == null) {
            return;
        }
        if (RUN_ON_MAIN_THREAD) {
 
            getMainHandler().post(new Runnable() {
                @Override
                public void run() {
                    closeCallback.onClose();
                }
            });
        } else {
            closeCallback.onClose();
        }
    }

    static File responseBodyToFile(String filePath, OkHttpResponse response,
            OkHttpResponseProgressCallback progressCallback) throws Exception {
        BufferedInputStream input = null;
        OutputStream output = null;
        try {
            InputStream is = response.responseBody.byteStream();

            input = new BufferedInputStream(is);

            final File file = new File(filePath);
            output = new FileOutputStream(file);

            byte[] data = new byte[1024];
            long contentLength = response.responseBody.contentLength();
            // Log.d(TAG, "responseBodyToFile: " + filePath + ", " + contentLength + ", "
            // + (progressCallback != null ? "progress" : ""));
            long total = 0;
            int count = 0;
            runProgressCallback(progressCallback, total, contentLength);

            while ((count = input.read(data)) != -1 && !response.cancelled) {
                total += count;
                output.write(data, 0, count);
                // Log.d(TAG, "write: " + count);
                runProgressCallback(progressCallback, total, contentLength);
            }
            if (response.cancelled && total != contentLength) {
                throw new Exception("cancelled");
            }
            // Log.d(TAG, "responseBodyToFile done: " + filePath + ", " + contentLength + ",
            // " + total);
            return file;
        } catch (Exception e) {
            throw e;
        } finally {
            if (output != null) {
                output.flush();
                output.close();
            }
            if (input != null) {
                input.close();
            }
            input.close();
            response.closeResponseBody();
        }
    }

    private void closeResponseBody() {
        closeResponseBody(responseBody, closeCallback);
    }

    private static void closeResponseBody(ResponseBody responseBody, OkHttpResponseCloseCallback closeCallback) {
        responseBody.close();
        runCloseCallback(closeCallback);
    }

    static Bitmap responseBodyToBitmap(OkHttpResponse response, OkHttpResponseProgressCallback progressCallback)
            throws Exception {
        
        BufferedInputStream input = null;
        OutputStream output = null;
        try {
            PipedInputStream in = new PipedInputStream();
            InputStream is = response.responseBody.byteStream();

            input = new BufferedInputStream(is);

            output = new PipedOutputStream(in);

            byte[] data = new byte[1024];
            long contentLength = response.responseBody.contentLength();

            long total = 0;
            int count = 0;
            if (progressCallback != null) {
                progressCallback.onProgress(total, contentLength);
            }
            while ((count = input.read(data)) != -1 && !response.cancelled) {
                total += count;
                output.write(data, 0, count);
                if (progressCallback != null) {
                    progressCallback.onProgress(total, contentLength);
                }
            }
            if (response.cancelled && total != contentLength) {
                throw new Exception("cancelled");
            }
            return BitmapFactory.decodeStream(in);
        } catch (Exception e) {
            throw e;
        } finally {
            if (output != null) {
                output.flush();
                output.close();
            }
            if (input != null) {
                input.close();
            }
            input.close();
            response.closeResponseBody();
        }
    }

    public File toFile(String filePath) throws Exception {
        return responseBodyToFile(filePath, this, progressCallback);
    }

    public void toFileAsync(final String filePath, final OkHttpResponseAsyncCallback callback) {
        final OkHttpResponse fme = this;
        // Log.d(TAG, "toFileAsync");
        Thread thread = new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    // Log.d(TAG, "toFileAsync run ");
                    final File result = responseBodyToFile(filePath, fme, progressCallback);
                    if (RUN_ON_MAIN_THREAD) {
                        getMainHandler().post(new Runnable() {
                            @Override
                            public void run() {
                                callback.onFile(result);
                            }
                        });
                    } else {
                        callback.onFile(result);
                    }
                } catch (final Exception exc) {
                    if (RUN_ON_MAIN_THREAD) {
                        getMainHandler().post(new Runnable() {
                            @Override
                            public void run() {
                                callback.onException(exc);
                            }
                        });
                    } else {
                        callback.onException(exc);
                    }
                }
            }
        });
        thread.start();
    }

    // static Bitmap responseBodyToBitmap(ResponseBody responseBody) throws
    // IOException {
    // InputStream inputStream = responseBody.byteStream();
    // Bitmap bitmap = BitmapFactory.decodeStream(inputStream);
    // // https://github.com/square/okhttp/issues/3152 ?
    // responseBody.source.skip(Long.MAX_VALUE);
    // inputStream.close();
    // responseBody.close();
    // return bitmap;
    // }

    public Bitmap toImage() throws Exception {
        return responseBodyToBitmap(this, progressCallback);
    }

    public void toImageAsync(final OkHttpResponseAsyncCallback callback) {
        final OkHttpResponse fme = this;
        Thread thread = new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    final Bitmap result = responseBodyToBitmap(fme, progressCallback);
                    if (RUN_ON_MAIN_THREAD) {
                        getMainHandler().post(new Runnable() {
                            @Override
                            public void run() {
                                callback.onBitmap(result);
                            }
                        });
                    } else {
                        callback.onBitmap(result);
                    }
                } catch (final Exception exc) {
                    if (RUN_ON_MAIN_THREAD) {
                        getMainHandler().post(new Runnable() {
                            @Override
                            public void run() {
                                callback.onException(exc);
                            }
                        });
                    } else {
                        callback.onException(exc);
                    }
                }
            }
        });
        thread.start();
    }

    static java.nio.ByteBuffer responseBodyToByteArray(OkHttpResponse response) throws IOException {
        
        final byte[] result = response.responseBody.bytes();
        response.closeResponseBody();
        return java.nio.ByteBuffer.wrap(result);
    }

    public java.nio.ByteBuffer toByteArray() throws IOException {
        return responseBodyToByteArray(this);
    }

    public void toByteArrayAsync(final OkHttpResponseAsyncCallback callback) {
        final OkHttpResponse fme = this;
        Thread thread = new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    final java.nio.ByteBuffer result = responseBodyToByteArray(fme);
                    if (RUN_ON_MAIN_THREAD) {
                        getMainHandler().post(new Runnable() {
                            @Override
                            public void run() {
                                callback.onByteArray(result);
                            }
                        });
                    } else {
                        callback.onByteArray(result);
                    }
                } catch (final Exception exc) {
                    if (RUN_ON_MAIN_THREAD) {
                        getMainHandler().post(new Runnable() {
                            @Override
                            public void run() {
                                callback.onException(exc);
                            }
                        });
                    } else {
                        callback.onException(exc);
                    }
                }
            }
        });
        thread.start();
    }

    static String responseBodyToString(OkHttpResponse response) throws IOException {
        
        final String responseString = response.responseBody.string();
        response.closeResponseBody();
        return responseString;
    }

    public String asString() throws IOException {
        // if (getMainHandler().getLooper() != Looper.myLooper()) {
                // try {
            return responseBodyToString(this);
            // } catch (final Exception ex) {
            //         Log.d("JS", "RuntimeException "  + ex);
            //         return null;
            //     }
        // }
        // final Object[] arr = new Object[1];
        // Log.d("JS", "test asString");
        // postAndWait(getMainHandler(), new Runnable() {
        //     @Override
        //     public void run() {
        //             Log.d("JS", "test asString runnable");
        //         try {
        //             arr[1] = responseBodyToString(OkHttpResponse.this);
        //             Log.d("JS", "test asString runnable result "  + (String)arr[1]);
        //         } catch (final Exception ex) {
        //             Log.d("JS", "RuntimeException "  + ex);
        //             // throw new RuntimeException(ex);
        //         }
        //     }
        // });
        // Log.d("JS", "test asString result "  + (String)arr[1]);
        // return (String)arr[1];
    }

    public void asStringAsync(final OkHttpResponseAsyncCallback callback) {
        final OkHttpResponse fme = this;
        Thread thread = new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    final String result = responseBodyToString(fme);
                    if (RUN_ON_MAIN_THREAD) {
                        getMainHandler().post(new Runnable() {
                            @Override
                            public void run() {
                                callback.onString(result);
                            }
                        });
                    } else {
                        callback.onString(result);
                    }
                } catch (final Exception exc) {
                    if (RUN_ON_MAIN_THREAD) {
                        getMainHandler().post(new Runnable() {
                            @Override
                            public void run() {
                                callback.onException(exc);
                            }
                        });
                    } else {
                        callback.onException(exc);
                    }
                }
            }
        });
        thread.start();
    }

    public static int getStatusCode(Response response) {
        return response.code();
    }
    
    public static String getMessage(Response response) {
        return response.message();
    }

    public static String getHeaders(Response response) throws Exception {
        JSONObject obj = new JSONObject();
        Headers headers = response.headers();
        for (int i = 0; i < headers.size(); i++)
        {  
            obj.put(headers.name(i), headers.value(i));
        }  
        return obj.toString();
    }
}