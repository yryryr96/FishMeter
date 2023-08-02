package com.example.fishdex.dto.fishdex;

import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
public class RecordRequestDto {

    private String imageUrl;
    private double length;
    private double latitude;
    private double longitude;
    private Timestamp createdAt;
    private double temperature;
    private String weather;
    private double precipitation;
    private int windDirection;
    private double windSpeed;
    private boolean favorite;
    private int userId;
    private int fishId;

    public RecordRequestDto(double length, double latitude, double longitude, Timestamp createdAt, double temperature, String weather, double precipitation, int windDirection, double windSpeed, boolean favorite, int fishId) {
        this.length = length;
        this.latitude = latitude;
        this.longitude = longitude;
        this.createdAt = createdAt;
        this.temperature = temperature;
        this.weather = weather;
        this.precipitation = precipitation;
        this.windDirection = windDirection;
        this.windSpeed = windSpeed;
        this.favorite = favorite;
        this.fishId = fishId;
    }
}
