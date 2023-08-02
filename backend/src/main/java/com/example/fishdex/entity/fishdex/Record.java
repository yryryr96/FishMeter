package com.example.fishdex.entity.fishdex;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.sql.Timestamp;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)

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
    private Timestamp createdAt;
    private double temperature;
    private String weather;
    private double precipitation;
    private int windDirection;
    private double windSpeed;
    private boolean favorite;
    private int userId;
    private int fishId;
}
