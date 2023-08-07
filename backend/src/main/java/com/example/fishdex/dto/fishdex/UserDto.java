package com.example.fishdex.dto.fishdex;


import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Setter
public class UserDto {
    private Long id;
    private String email;
    private String password;
    private String name;
    private String nickname;
    private String profile_image;
}
