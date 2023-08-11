package com.example.fishdex.dto.sse;

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
