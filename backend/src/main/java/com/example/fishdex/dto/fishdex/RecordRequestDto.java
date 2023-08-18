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
    private String base64;

    public RecordRequestDto(double length, double latitude, double longitude, long fishId, String base64) {
        this.length = length;
        this.latitude = latitude;
        this.longitude = longitude;
        this.fishId = fishId;
        this.base64 = base64;
    }

    public RecordDto toRecordDto(){
        return RecordDto.builder()
                .length(this.length)
                .longitude(this.longitude)
                .latitude(this.latitude)
                .build();
    }
}
