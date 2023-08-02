package com.example.fishdex.service.fishdex;

import com.example.fishdex.dto.fishdex.FishResponseDto;
import com.example.fishdex.entity.fishdex.Fish;
import com.example.fishdex.repository.fishdex.FishRepository;
import com.example.fishdex.repository.fishdex.RecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RecordService {
    private final RecordRepository recordRepository;
    private final FishRepository fishRepository;

    public List<FishResponseDto> findList() {
        List<Fish> fishEntity = fishRepository.findAll();
        List<FishResponseDto> fishResponseDto = fishEntity.stream()
                .map(fish -> new FishResponseDto(fish.getId(), fish.getSpecies()))
                .collect(Collectors.toList());
        return fishResponseDto;
    }
}
