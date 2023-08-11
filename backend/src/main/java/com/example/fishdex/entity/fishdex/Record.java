package com.example.fishdex.entity.fishdex;

import com.example.fishdex.dto.fishdex.RecordDto;
import com.example.fishdex.entity.user.User;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

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
    private String address;
    @CreationTimestamp
    private Timestamp createdAt;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fish_id")
    private Fish fish;

    public RecordDto toResponseDto(){
        return RecordDto.builder()
                .id(this.id)
                .imageUrl(this.imageUrl)
                .length(this.length)
                .longitude(this.longitude)
                .address(this.address)
//                .createdAt(this.createdAt)
                .nickname(this.user.getNickname())
                .species(this.fish.getSpecies())
                .build();
    }
}
