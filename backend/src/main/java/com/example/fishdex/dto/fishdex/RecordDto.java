package com.example.fishdex.dto.fishdex;

import com.example.fishdex.entity.fishdex.Fish;
import com.example.fishdex.entity.fishdex.Record;
import com.example.fishdex.entity.user.User;
import lombok.*;

import java.sql.Timestamp;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Setter
@Getter
public class RecordDto {
    private Long id;
    private String imageUrl;
    private double length;
    private double latitude;
    private double longitude;
    private String address;
    private Timestamp createdAt;
    private String nickname;
    private String species;

    public Record toEntity(User user, Fish fish){
        return Record.builder()
                .id(this.id)
                .imageUrl(this.imageUrl)
                .length(this.length)
                .latitude(this.latitude)
                .longitude(this.longitude)
                .address(this.address)
                .createdAt(this.createdAt)
                .user(user)
                .fish(fish)
                .build();
    }
}
