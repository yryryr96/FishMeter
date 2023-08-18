package com.fishpjt.ar;

import com.google.ar.sceneform.math.Vector3;

public class LengthMeasurer {

    public static double measureLength(Vector3 v1, Vector3 v2) {
        float x = v1.x - v2.x;
        float y = v1.y - v2.y;
        float z = v1.z - v2.z;

        return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
    }
}
