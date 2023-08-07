package com.example.fishdex.entity.user;

import com.example.fishdex.dto.fishdex.UserDto;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 20)
    private String email;

    @Column(nullable = false, length = 20)
    private String password;

    private String name;

    private String nickname;

    private String profile_image;

    @Builder
    private User(String email, String password, String name, String nickname) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.nickname = nickname;
    }

    public UserDto toDto(){
        return UserDto.builder()
                .id(this.id)
                .email(this.email)
                .password(this.password)
                .name(this.name)
                .nickname(this.nickname)
                .profile_image(this.profile_image)
                .build();
    }
}
