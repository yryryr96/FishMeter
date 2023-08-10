package com.fishpjt;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

public class MyBroadcastReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        if ("com.fishpjt.ACTION_SEND_DATA".equals(intent.getAction())) {
            Bundle dataBundle = intent.getBundleExtra("dataBundle");
            if (dataBundle != null) {
                String message = dataBundle.getString("message");
                Log.d("Received Data", message);
                // 여기에서 수신한 데이터를 처리합니다.
            }
        }
    }
}