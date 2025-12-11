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
import okhttp3.Headers;

import org.json.JSONObject;

public class OkHttpResponse {
    private final static String TAG = "OkHttpResponse";
    static Handler mainHandler = null;
    static boolean RUN_ON_MAIN_THREAD = true;
    static boolean RUN_PROGRESS_ON_MAIN_THREAD = true;
    public static final int DOWNLOAD_CHUNK_SIZE = 2048; // Same as Okio Segment.SIZE

    private ResponseBody responseBody;
    public boolean runOnMainThread = OkHttpResponse.RUN_ON_MAIN_THREAD;
    public boolean runProgressOnMainThread = OkHttpResponse.RUN_PROGRESS_ON_MAIN_THREAD;
    public OkHttpResponseProgressCallback progressCallback = null;
    public OkHttpResponseCloseCallback closeCallback = null;

    public static class ProgressInputStream extends InputStream {
        private final InputStream inputStream;
        private final ProgressListener listener;
        private long totalBytesRead = 0;
        private long contentLength = 0;

        public interface ProgressListener {
            void update(long bytesRead, long contentLength, boolean done);
        }

        public ProgressInputStream(InputStream inputStream, ProgressListener listener, long contentLength) {
            this.inputStream = inputStream;
            this.listener = listener;
            this.contentLength = contentLength;
        }

        @Override
        public int read() throws IOException {
            int bytesRead = inputStream.read();
            if (bytesRead >= 0) {
                totalBytesRead++;
                listener.update(totalBytesRead, contentLength, totalBytesRead == contentLength);
            }
            return bytesRead;
        }

        @Override
        public int read(byte[] b, int off, int len) throws IOException {
            int bytesRead = inputStream.read(b, off, len);
            if (bytesRead >= 0) {
                totalBytesRead += bytesRead;
                listener.update(totalBytesRead, contentLength, totalBytesRead == contentLength);
            }
            return bytesRead;
        }

        @Override
        public void close() throws IOException {
            inputStream.close();
        }
    }

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
                NotifyRunnable runnable = new NotifyRunnable(handler, r);
                handler.post(runnable);
                while (!runnable.isFinished()) {
                    try {
                        handler.wait();
                    } catch (InterruptedException is) {
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

    private void runProgressCallback(final OkHttpResponseProgressCallback progressCallback, final long current,
            final long total) {
        if (progressCallback == null) {
            return;
        }
        if (runOnMainThread) {
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

    private void runCloseCallback(final OkHttpResponseCloseCallback closeCallback) {
        if (closeCallback == null) {
            return;
        }
        if (runOnMainThread) {
 
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

    private File responseBodyToFile(String filePath, OkHttpResponse response,
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

    private void closeResponseBody(ResponseBody responseBody, OkHttpResponseCloseCallback closeCallback) {
        responseBody.close();
        runCloseCallback(closeCallback);
    }

    static Bitmap responseBodyToBitmap(OkHttpResponse response, OkHttpResponseProgressCallback progressCallback)
            throws Exception {
        
        InputStream inputStream = null;
        try {

            long contentLength = response.responseBody.contentLength();
            inputStream = new ProgressInputStream(response.responseBody.byteStream(), new ProgressInputStream.ProgressListener() {
                @Override
                public void update(long bytesRead, long contentLength, boolean done) {
                    if (progressCallback != null) {
                        progressCallback.onProgress(bytesRead, contentLength);
                    }
                }
            }, contentLength);

            // Decode the bitmap
            return BitmapFactory.decodeStream(inputStream);
        } catch (Exception e) {
            throw e;
        } finally {
            if (inputStream != null) {
                inputStream.close();
            }
            response.closeResponseBody();
        }
    }

    public File toFile(String filePath) throws Exception {
        return responseBodyToFile(filePath, this, progressCallback);
    }

    public void toFileAsync(final String filePath, final OkHttpResponseAsyncCallback callback) {
        final OkHttpResponse fme = this;
        Thread thread = new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    // Log.d(TAG, "toFileAsync run ");
                    final File result = responseBodyToFile(filePath, fme, progressCallback);
                    if (runOnMainThread) {
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
                    if (runOnMainThread) {
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
                    if (runOnMainThread) {
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
                    if (runOnMainThread) {
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
                    if (runOnMainThread) {
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
                    if (runOnMainThread) {
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
        return responseBodyToString(this);
    }

    public void asStringAsync(final OkHttpResponseAsyncCallback callback) {
        final OkHttpResponse fme = this;
        Thread thread = new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    final String result = responseBodyToString(fme);
                    if (runOnMainThread) {
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
                    if (runOnMainThread) {
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
    public static ResponseBody getBody(Response response) {
        return response.body();
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