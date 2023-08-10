package com.fishpjt;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Bundle;
import android.util.Base64;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableArray;

import com.fishpjt.ar.MainActivity;

import java.util.Arrays;

public class MyArCoreModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;
    private final String ACTION_SEND_DATA = "com.fishpjt.ACTION_SEND_DATA"; // 수정된 부분

    public MyArCoreModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        registerReceiver();
    }

    @Override
    public String getName() {
        return "MyArCoreModule";
    }

    @ReactMethod
    public void launchARCoreMeasurement() {
        try {
            // Launch ARCore Measurement activity
            Intent intent = new Intent(reactContext, MainActivity.class);
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
            intent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
            reactContext.startActivity(intent);
            Log.d("MyArCoreModule", "ARCore Measurement launched!");
        } catch (Exception e) {
            e.printStackTrace();
            Log.e("MyArCoreModule", "Failed to launch ARCore Measurement.");
        }
    }

    private void registerReceiver() {
        IntentFilter filter = new IntentFilter(ACTION_SEND_DATA);
        reactContext.registerReceiver(new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                Bundle dataBundle = intent.getBundleExtra("dataBundle");
                if (dataBundle != null) {
                    String category = dataBundle.getString("category");
                    String length = dataBundle.getString("length");
                    byte[] imageBytes = dataBundle.getByteArray("image");

                    Log.d("Received Data", "Category: " + category);
                    Log.d("Received Data", "Length: " + length);
                    Log.d("Received Data", "ImageBytes: " + (imageBytes != null ? imageBytes : 0) + " bytes");

                    // 데이터를 React Native로 전달
                    sendDataToReact(category, length, imageBytes);
                }
            }
        }, filter);
    }


    @ReactMethod
    public void sendDataToReact(String category, String length, byte[] imageBytes) {
        WritableMap params = Arguments.createMap();
        params.putString("category", category);
        params.putString("length", length);

        if (imageBytes != null) {
            String base64Image = Base64.encodeToString(imageBytes, Base64.DEFAULT);
            params.putString("imageArray", base64Image);
            Log.d("ImageBytes", "Image data sent successfully.");
        } else {
            params.putNull("imageArray");
            Log.d("ImageBytes", "No image data.");
        }

        sendEvent("ACTION_DATA_RECEIVED", params);
    }


    private void sendEvent(String eventName, WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }


}