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
    private Long id;

    private String nickname;

    private String profile_image;

    @Builder
    private User(long id, String nickname, String profile_image) {
        this.profile_image = profile_image;
        this.id = id;
        this.nickname = nickname;
    }

    public UserDto toDto(){
        return UserDto.builder()
                .id(this.id)
                .nickname(this.nickname)
                .profile_image(this.profile_image)
                .build();
    }
}
