package com.example.fishdex.service.fishdex;

import com.example.fishdex.dto.fishdex.*;
import com.example.fishdex.entity.fishdex.Day;
import com.example.fishdex.entity.fishdex.Fish;
import com.example.fishdex.entity.fishdex.Record;
import com.example.fishdex.entity.user.User;
import com.example.fishdex.repository.fishdex.DayRepository;
import com.example.fishdex.repository.fishdex.FishRepository;
import com.example.fishdex.repository.fishdex.RecordRepository;
import com.example.fishdex.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RecordService {
    private final RecordRepository recordRepository;
    private final FishRepository fishRepository;
    private final DayRepository dayRepository;
    private final UserRepository userRepository;

    public List<FishResponseDto> findAll(Long userId) {
        List<Fish> fishEntity = recordRepository.findFishByUserId(userId);
        List<FishResponseDto> fishResponseDto = fishEntity.stream()
                .map(fish -> new FishResponseDto(fish.getId(), fish.getSpecies()))
                .collect(Collectors.toList());
        return fishResponseDto;
    }

    public Day getDay(DayRequestDto dto) {
        Day day = new Day(dto.getDay());
        return dayRepository.save(day);
    }

    public void save(RecordRequestDto recordRequestDto) {
        Record record = recordRequestDto.toEntity();
        recordRepository.save(record);
    }

    public Fish getFish(String species) {
        return fishRepository.findBySpecies(species);
    }

    public User getUser(long userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        return optionalUser.orElse(null);    }

    public List<RecordResponseDto> findRecordsByFishId(long userId, long fishId) {
        List<Record> recordEntity = recordRepository.findRecordsByFishId(userId, fishId);
        List<RecordResponseDto> recordResponseDtos = recordEntity.stream()
                .map(record -> record.toResponseDto())
                .collect(Collectors.toList());
        return recordResponseDtos;
    }

    public List<RecordResponseDto> findAllRecords() {
        List<Record> recordEntity = recordRepository.findAll();
        List<RecordResponseDto> recordResponseDtos = recordEntity.stream()
                .map(record -> record.toResponseDto())
                .collect(Collectors.toList());
        return recordResponseDtos;
    }

    public RecordResponseDto update(RecordUpdateDto recordUpdateDto) {
        Optional<Record> optionalRecord = recordRepository.findById(recordUpdateDto.getId());
        if (optionalRecord.isPresent()) {
            Record existingRecord = optionalRecord.get();
            existingRecord.setLength(recordUpdateDto.getLength());
            Record updatedRecord = recordRepository.save(existingRecord);
            return updatedRecord.toResponseDto();
        } else {
            return null;
        }
    }

    public void delete(long recordId) {
        Optional<Record> optionalRecord = recordRepository.findById(recordId);
        if (optionalRecord.isPresent()) {
            Record existingRecord = optionalRecord.get();
            recordRepository.delete(existingRecord);
        } else {
            System.out.println("null");
        }
    }
}
