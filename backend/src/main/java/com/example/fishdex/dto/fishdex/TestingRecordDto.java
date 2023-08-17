package com.example.fishdex.dto.fishdex;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class TestingRecordDto {

    private String address;
    private String imageUrl;
    private double latitude;
    private double length;
    private double longitude;
    private long fishId;
    private long userId;

    public RecordDto toRecordDto(){
        return RecordDto.builder()
                .length(this.length)
                .longitude(this.longitude)
                .latitude(this.latitude)
                .build();
    }
}
