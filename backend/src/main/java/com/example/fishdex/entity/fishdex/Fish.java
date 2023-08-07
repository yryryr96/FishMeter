package com.example.fishdex.entity.fishdex;

import com.example.fishdex.dto.fishdex.FishDto;
import lombok.*;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@ToString
public class Fish {

    @Id
    @Column(name="fish_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String species;

    public FishDto toDto(){
        return FishDto.builder()
                .id(this.id)
                .species(this.species)
                .build();
    }
}
