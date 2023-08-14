package com.example.fishdex.service.fishdex;

import com.example.fishdex.dto.fishdex.*;
import com.example.fishdex.dto.sse.RecentRecord;
import com.example.fishdex.entity.fishdex.Fish;
import com.example.fishdex.entity.fishdex.Record;
import com.example.fishdex.entity.user.User;
import com.example.fishdex.repository.fishdex.FishRepository;
import com.example.fishdex.repository.fishdex.RecordRepository;
import com.example.fishdex.repository.user.UserRepository;
import com.example.fishdex.service.sse.SseService;
import com.example.fishdex.util.Base64ToMultipartFileConverter;
import com.example.fishdex.util.KakaoApiReader;
import com.example.fishdex.util.S3Uploader;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.util.Base64Utils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RecordService {
    private final RecordRepository recordRepository;
    private final FishRepository fishRepository;
    private final UserRepository userRepository;
    private final S3Uploader s3Uploader;
    private final KakaoApiReader kakaoApiReader;
    private Base64ToMultipartFileConverter base64ToMultipartFileConverter;


    private final SseService sseService;

    public List<FishResponseDto> findAll(Long userId) {
        List<Fish> fishEntity = recordRepository.findFishByUserId(userId);
        List<FishResponseDto> fishResponseDto = fishEntity.stream()
                .map(fish -> new FishResponseDto(fish.getId(), fish.getSpecies()))
                .collect(Collectors.toList());
        return fishResponseDto;
    }

    @Async
    public void save(RecordRequestDto recordRequestDto) throws Exception {

        kakaoApiReader.setLatitude(recordRequestDto.getLatitude());
        kakaoApiReader.setLongitude(recordRequestDto.getLongitude());
        String address = kakaoApiReader.getAddressName();

        User user = userRepository.findById(recordRequestDto.getUserId()).orElseThrow();
        Fish fish = fishRepository.findById(recordRequestDto.getFishId()).orElseThrow();

        RecordDto recordDto = recordRequestDto.toRecordDto();
        recordDto.setAddress(address);

        String incodeBase64 = recordRequestDto.getBase64();
        String base64 = getBase64DecodeString(incodeBase64);
        MultipartFile image = base64ToMultipartFileConverter.base64ToMultipartFile(base64);

        String imageUrl = null;
        try {
            imageUrl = s3Uploader.upload(image, "images");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        recordDto.setImageUrl(imageUrl);

        Record record = recordDto.toEntity(user, fish);
        recordRepository.save(record);

        // sse
        RecentRecord recentRecord = RecentRecord.builder()
                .imageUrl(imageUrl)
                .length(recordRequestDto.getLength())
                .latitude(recordRequestDto.getLatitude())
                .longitude(recordRequestDto.getLongitude())
                .address(address)
                .nickName(user.getNickname())
                .species(fish.getSpecies())
                .build();

        ObjectMapper objectMapper = new ObjectMapper();

        sseService.sendDataToAll("update",objectMapper.writeValueAsString(recentRecord));
    }

    public Fish getFish(long fishId) {
        Optional<Fish> optionalFish = fishRepository.findById(fishId);
        return optionalFish.orElse(null);
    }

    public User getUser(long userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        return optionalUser.orElse(null);
    }

    public List<RecordDto> findRecordsByFishId(long userId, long fishId) {
        List<Record> recordEntity = recordRepository.findRecordsByFishId(userId, fishId);
        List<RecordDto> recordResponseDtos = recordEntity.stream()
                .map(record -> record.toResponseDto())
                .collect(Collectors.toList());
        return recordResponseDtos;
    }

    public List<RecordDto> findAllRecords() {
        List<Record> recordEntity = recordRepository.findAll();
        List<RecordDto> recordResponseDtos = recordEntity.stream()
                .map(record -> record.toResponseDto())
                .collect(Collectors.toList());
        return recordResponseDtos;
    }

    public RecordDto update(RecordUpdateDto recordUpdateDto) {
        long recordId = recordUpdateDto.getId();
        Optional<Record> optionalRecord = recordRepository.findById(recordId);
        if (optionalRecord.isPresent()) {
            Record existingRecord = optionalRecord.get();
            existingRecord.setLength(recordUpdateDto.getLength());
            Record updatedRecord = recordRepository.save(existingRecord);
            return updatedRecord.toResponseDto();
        } else {
            throw new NullPointerException("Record not found with id: " + recordId);
        }
    }

    public void delete(long recordId) {
        Optional<Record> optionalRecord = recordRepository.findById(recordId);
        if (optionalRecord.isPresent()) {
            Record record = optionalRecord.get();
            recordRepository.delete(record);
        } else {
            throw new IllegalArgumentException("Record not found with id: " + recordId);
        }
    }

    public List<RecordDto> findImages(ImageRequestDto imageRequestDto) throws ParseException {
        long userId = imageRequestDto.getUserId();
        long recordId = imageRequestDto.getRecordid();
        String date = imageRequestDto.getCreatedAt();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
        Date parsedDate = dateFormat.parse(date);
        Timestamp timestamp = new Timestamp(parsedDate.getTime());
        List<Record> recordEntity = recordRepository.findImages(userId, recordId, timestamp);
        List<RecordDto> recordResponseDtos = recordEntity.stream()
                .map(record -> record.toResponseDto())
                .collect(Collectors.toList());
        return recordResponseDtos;
    }

    public static String getBase64DecodeString(String content){
        return new String(Base64Utils.decode(content.getBytes())); //TODO Base64 복호화된 문자열값 반환
    }
}

