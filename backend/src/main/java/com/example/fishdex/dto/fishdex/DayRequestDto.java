package com.example.fishdex.dto.fishdex;

import lombok.*;

import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
public class DayRequestDto {
    private long id;
    private Timestamp day;
}
