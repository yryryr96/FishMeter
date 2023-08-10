package com.fishpjt.ar;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.RectF;
import android.util.AttributeSet;
import android.view.View;

import androidx.annotation.Nullable;

public class BoundingBoxView extends View {

    private Paint paint;
    private RectF boundingBox;

    public BoundingBoxView(Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
        paint = new Paint();
        paint.setColor(Color.RED);
        paint.setStyle(Paint.Style.STROKE);
        paint.setStrokeWidth(5);
        boundingBox = new RectF();
    }

    public void setBoundingBox(float left, float top, float right, float bottom) {
        boundingBox.set(left, top, right, bottom);
        invalidate();
    }

    public void clearBoundingBox() {
        boundingBox.setEmpty();
        invalidate();
    }

    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);
        if (boundingBox != null) {
            canvas.drawRect(boundingBox, paint);
        }
    }
}
