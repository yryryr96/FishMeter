package  com.fishpjt.ar;

import android.graphics.ImageFormat;
import android.graphics.Rect;
import android.graphics.YuvImage;
import android.media.Image;
import android.media.Image.Plane;

import java.io.ByteArrayOutputStream;
import java.nio.ByteBuffer;

public class ImageConverter {

    public static byte[] convertYuvToJpeg(Image image) {
        int width = image.getWidth();
        int height = image.getHeight();
        byte[] nv = convertYuvToNv(image);
        return convertNvToJpeg(nv, width, height);
    }

    private static byte[] convertYuvToNv(Image image) {
        Plane[] planes = image.getPlanes();
        ByteBuffer yBuffer = planes[0].getBuffer();
        ByteBuffer uBuffer = planes[1].getBuffer();
        ByteBuffer vBuffer = planes[2].getBuffer();
        int ySize = yBuffer.remaining();
        int uSize = uBuffer.remaining();
        int vSize = vBuffer.remaining();

        byte[] nv = new byte[ySize + uSize + vSize];

        // U and V ard swapped
        yBuffer.get(nv, 0, ySize);
        vBuffer.get(nv, ySize, vSize);
        uBuffer.get(nv, ySize + vSize, uSize);
//        ByteBuffer[] byteBuffers = new ByteBuffer[3];
//        int[] sizes = new int[3];
//        for (int i = 0; i < 3; i++) {
//            byteBuffers[i] = planes[i].getBuffer();
//            sizes[i] = byteBuffers[i].remaining();
//        }
//        byte[] nv = new byte[sizes[0] + sizes[1] + sizes[2]];
//        int offset = 0;
//        for (int i = 0; i < 3; i++) {
//            byteBuffers[i].get(nv, offset, sizes[i]);
//            offset += sizes[i];
//        }
        return nv;
    }

    private static byte[] convertNvToJpeg(byte[] nv, int width, int height) {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        YuvImage yuv = new YuvImage(nv, ImageFormat.NV21, width, height, null);
        yuv.compressToJpeg(new Rect(0, 0, width, height), 100, baos);
        return baos.toByteArray();
    }
}
