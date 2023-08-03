package com.example.fishdex.repository.fishdex;

import com.example.fishdex.entity.fishdex.Fish;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FishRepository extends JpaRepository<Fish, Long> {
    Fish findBySpecies(String species);
}
