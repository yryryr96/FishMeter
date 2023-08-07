package com.example.fishdex.entity.fishdex;

import com.example.fishdex.dto.fishdex.RecordRequestDto;
import com.example.fishdex.dto.fishdex.RecordResponseDto;
import com.example.fishdex.entity.user.User;
import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;


@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Setter
@Getter
public class Record {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String imageUrl;
    private double length;
    private double latitude;
    private double longitude;
    private double temperature;
    private String weather;
    private double precipitation;
    private int windDirection;
    private double windSpeed;
    private boolean favorite;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "day_id")
    private Day day;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fish_id")
    private Fish fish;

    public RecordResponseDto toResponseDto(){
        return RecordResponseDto.builder()
                .id(this.id)
                .imageUrl(this.imageUrl)
                .length(this.length)
                .longitude(this.longitude)
                .temperature(this.temperature)
                .weather(this.weather)
                .precipitation(this.precipitation)
                .windDirection(this.windDirection)
                .windSpeed(this.windSpeed)
                .favorite(this.favorite)
                .day(this.day.toDto())
                .user(this.user.toDto())
                .fish(this.fish.toDto())
                .build();
    }
}
