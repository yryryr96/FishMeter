package com.example.fishdex.dto.sse;

import com.example.fishdex.dto.fishdex.DayDto;
import com.example.fishdex.dto.fishdex.FishDto;
import com.example.fishdex.dto.fishdex.UserDto;
import com.example.fishdex.entity.fishdex.Day;
import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecentRecord {
    private String imageUrl;
    private double length; // front
    private double latitude; // front
    private double longitude; // front
    private String address;
    private String nickName;
    private String species; // front
}
