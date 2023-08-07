package com.example.fishdex.dto.fishdex;

import lombok.*;

import java.sql.Timestamp;

@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Setter
@Getter
public class DayDto {
    private Long id;
    private Timestamp createdAt;
}
