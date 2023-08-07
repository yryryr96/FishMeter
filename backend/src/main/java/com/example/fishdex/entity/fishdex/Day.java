package com.example.fishdex.entity.fishdex;

import com.example.fishdex.dto.fishdex.DayDto;
import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Setter
@Getter
public class Day {

    @Id
    @Column(name="day_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Timestamp createdAt;

    public Day(Timestamp day) {
        this.createdAt = day;
    }

    public DayDto toDto(){
        return DayDto.builder()
                .id(this.id)
                .createdAt(this.createdAt)
                .build();
    }
}
