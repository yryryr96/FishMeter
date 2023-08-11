package com.example.fishdex.dto.sse;

import com.example.fishdex.dto.fishdex.DayDto;
import com.example.fishdex.dto.fishdex.FishDto;
import com.example.fishdex.dto.fishdex.UserDto;
import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecentRecord {
    private Long id;
    private String imageUrl;
    private double length;
    private double latitude;
    private double longitude;
    private String address;
    private DayDto day;
    private UserDto user;
    private FishDto fish;
}
