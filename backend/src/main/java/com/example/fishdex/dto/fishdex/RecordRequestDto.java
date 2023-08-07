package com.example.fishdex.dto.fishdex;

import com.example.fishdex.entity.fishdex.Day;
import com.example.fishdex.entity.fishdex.Fish;
import com.example.fishdex.entity.user.User;
import lombok.*;

import com.example.fishdex.entity.fishdex.Record;
import org.springframework.web.multipart.MultipartFile;

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
    private Day day;
    private User user;
    private Fish fish;
    private long userId;
    private long fishId;
    private long dayId;
    private DayRequestDto dayRequestDto;
    MultipartFile image;

    public RecordRequestDto(double length, double latitude, double longitude, Timestamp createdAt, double temperature, String weather, double precipitation, int windDirection, double windSpeed, boolean favorite, String species) {
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
                .day(this.day)
                .user(this.user)
                .fish(this.fish)
                .build();
    }
}
