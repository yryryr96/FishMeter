package com.example.fishdex.dto.fishdex;

import lombok.*;

import com.example.fishdex.entity.fishdex.Record;

import java.sql.Timestamp;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
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
    private String species;
    private String image;
    private long dayId;
    private long userId;
    private long fishId;

    public RecordRequestDto(double length, double latitude, double longitude, Timestamp createdAt, double temperature, String weather, double precipitation, int windDirection, double windSpeed, boolean favorite, String species, String image) {
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
        this.species = species;
        this.image = image;
    }

    public Record toEntity(){
        return Record.builder()
                .imageUrl(this.imageUrl)
                .length(this.length)
                .longitude(this.longitude)
                .temperature(this.temperature)
                .weather(this.weather)
                .precipitation(this.precipitation)
                .windDirection(this.windDirection)
                .windSpeed(this.windSpeed)
                .favorite(this.favorite)
                .dayId(this.dayId)
                .userId(this.userId)
                .fishId(this.fishId)
                .build();
    }
}
