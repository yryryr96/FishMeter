package com.example.fishdex.repository.fishdex;

import com.example.fishdex.dto.fishdex.RecordResponseDto;
import com.example.fishdex.entity.fishdex.Fish;
import com.example.fishdex.entity.fishdex.Record;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Timestamp;
import java.util.List;

public interface RecordRepository extends JpaRepository<Record, Long> {
    @Query("SELECT r.fish FROM Record r WHERE r.user.id = :userId")
    List<Fish> findFishByUserId(@Param("userId") Long userId);

    @Query("SELECT r from Record r WHERE r.user.id = :userId and r.fish.id = :fishId")
    List<Record> findRecordsByFishId(@Param("userId") long userId, @Param("fishId") long fishId);

    @Query("SELECT r from Record r WHERE r.user.id = :userId and DATE(r.day.createdAt) = :date and r.id <> :recordId")
    List<Record> findImages(@Param("userId") long userId, @Param("recordId") long recordId, @Param("date")Timestamp date);
}
