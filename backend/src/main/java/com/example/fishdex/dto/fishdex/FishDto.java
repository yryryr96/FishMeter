package com.example.fishdex.dto.fishdex;

import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@ToString
public class FishDto {
    private Long id;
    private String species;
}
