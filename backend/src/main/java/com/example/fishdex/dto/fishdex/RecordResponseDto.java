package com.example.fishdex.dto.fishdex;

import com.example.fishdex.entity.fishdex.Day;
import com.example.fishdex.entity.fishdex.Fish;
import com.example.fishdex.entity.user.User;
import lombok.*;

import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Setter
@Getter
public class RecordResponseDto {
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
    private String address;
    private DayDto day;
    private UserDto user;
    private FishDto fish;
}
