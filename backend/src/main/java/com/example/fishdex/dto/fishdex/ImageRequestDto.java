package com.example.fishdex.dto.fishdex;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.type.TimestampType;

import java.sql.Timestamp;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ImageRequestDto {
    long userId;
    long recordid;
    String createdAt;
}
