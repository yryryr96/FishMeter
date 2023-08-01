package com.example.fishdex.repository.fishdex;

import com.example.fishdex.entity.fishdex.Record;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecordRepository extends JpaRepository<Record, Long> {
}
