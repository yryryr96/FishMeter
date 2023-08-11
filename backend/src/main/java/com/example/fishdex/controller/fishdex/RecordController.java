package com.example.fishdex.controller.fishdex;

import com.example.fishdex.dto.fishdex.*;
import com.example.fishdex.repository.user.UserRepository;
import com.example.fishdex.service.fishdex.RecordService;
import com.example.fishdex.service.user.UserService;
import lombok.RequiredArgsConstructor;
//import org.springframework.security.core.annotation.AuthenticationPrincipal;
//import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Timestamp;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class RecordController {
    private final RecordService recordService;
    private final UserService userService;

    @GetMapping("/fishes")
    public List<FishResponseDto> findAll(@RequestHeader("userId") String userId) {
        long id  = Long.parseLong(userId);
        return recordService.findAll(id);
    }

    @GetMapping("/fishes/{fishId}")
    public List<RecordDto> findRecordsByFishId(@PathVariable("fishId") long fishId , @RequestHeader("userId") String userId) {
        long id  = Long.parseLong(userId);
        List<RecordDto> list = recordService.findRecordsByFishId(id, fishId);
        return list;
    }

    @GetMapping("/records")
    public List<RecordDto> findAllRecords() {
        List<RecordDto> list = recordService.findAllRecords();
        return list;
    }

    @GetMapping("/image/{recordId}/{recordTime}")
    public List<RecordDto> findImages(@PathVariable("recordId") long recordId, @PathVariable("recordTime") Timestamp date, @RequestHeader("userId") String userId) throws Exception {
        long id  = Long.parseLong(userId);
        ImageRequestDto imageRequestDto = new ImageRequestDto(id, recordId, date);
        List<RecordDto> list = recordService.findImages(imageRequestDto);
        return list;
    }


    @PostMapping(value = "/records", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public void regist(@RequestPart RecordRequestDto recordRequestDto, @RequestPart MultipartFile image, @RequestHeader("userId") String userId) throws Exception {
        long id  = Long.parseLong(userId);
        recordRequestDto.setUserId(id);
        recordRequestDto.setImage(image);

        recordService.save(recordRequestDto);
    }

    @PutMapping("/records")
    public RecordDto updateRecord(@RequestBody RecordUpdateDto recordUpdateDto) {
        return recordService.update(recordUpdateDto);
    }

    @DeleteMapping("/records/{recordId}")
    public void deleteRecord(@PathVariable("recordId") long recordId) {
        recordService.delete(recordId);
    }
}
