package com.shibuiwilliam.arcoremeasurement.api;

import java.util.List;

import okhttp3.MultipartBody;
import retrofit2.Call;
import retrofit2.http.Multipart;
import retrofit2.http.POST;
import retrofit2.http.Part;

public interface ApiInterface {

    @POST("/predict")
    @Multipart
    Call<List<List<Float>>> detectFish(@Part MultipartBody.Part image);
}
