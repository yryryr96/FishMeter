package com.example.fishdex.repository.fishdex;

import com.example.fishdex.entity.fishdex.Fish;
import com.example.fishdex.entity.fishdex.Record;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RecordRepository extends JpaRepository<Record, Long> {
    @Query("SELECT r.fish FROM Record r WHERE r.user.id = :userId")
    List<Fish> findFishByUserId(@Param("userId") Long userId);
}
