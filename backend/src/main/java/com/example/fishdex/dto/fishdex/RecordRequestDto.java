package com.example.fishdex.dto.fishdex;

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

    private double length;
    private double latitude;
    private double longitude;
    private long userId;
    private long fishId;
    MultipartFile image;

    public RecordRequestDto(double length, double latitude, double longitude, long fishId) {
        this.length = length;
        this.latitude = latitude;
        this.longitude = longitude;
        this.fishId = fishId;
    }

    public RecordDto toRecordDto(){
        return RecordDto.builder()
                .length(this.length)
                .longitude(this.longitude)
                .latitude(this.latitude)
                .build();
    }
}
