package com.example.fishdex.service.fishdex;

import com.example.fishdex.dto.fishdex.DayRequestDto;
import com.example.fishdex.dto.fishdex.FishResponseDto;
import com.example.fishdex.dto.fishdex.RecordRequestDto;
import com.example.fishdex.entity.fishdex.Day;
import com.example.fishdex.entity.fishdex.Fish;
import com.example.fishdex.entity.fishdex.Record;
import com.example.fishdex.repository.fishdex.DayRepository;
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
    private final DayRepository dayRepository;

    public List<FishResponseDto> findAll() {
        List<Fish> fishEntity = fishRepository.findAll();
        List<FishResponseDto> fishResponseDto = fishEntity.stream()
                .map(fish -> new FishResponseDto(fish.getId(), fish.getSpecies()))
                .collect(Collectors.toList());
        return fishResponseDto;
    }

    public long getDayId(DayRequestDto dto) {
        Day day = new Day(dto.getDay());
        Day saveDay =  dayRepository.save(day);
        return saveDay.getId();
    }

    public void save(RecordRequestDto recordRequestDto) {
        Record record = recordRequestDto.toEntity();
        recordRepository.save(record);
    }

    public long getFishId(String species) {
        Fish fish = fishRepository.findBySpecies(species);
        System.out.println(fish.toString());
        return fish.getId();
    }
}
