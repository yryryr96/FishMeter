package com.example.fishdex.service.fishdex;

import com.example.fishdex.dto.fishdex.DayRequestDto;
import com.example.fishdex.dto.fishdex.FishResponseDto;
import com.example.fishdex.dto.fishdex.RecordRequestDto;
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
}
