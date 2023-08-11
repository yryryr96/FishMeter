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
    public List<FishResponseDto> findAll(@RequestHeader("Authorization") String authorization) throws Exception {
        String accessToken = authorization.replace("Bearer ", "");
        Map<String, String> map = userService.getUserInfo(accessToken);
        long userId  = Long.parseLong(map.get("id"));
        return recordService.findAll(userId);
    }

    @GetMapping("/fishes/{fishId}")
    public List<RecordDto> findRecordsByFishId(@PathVariable("fishId") long fishId , @RequestHeader("Authorization") String authorization) throws Exception {

        String accessToken = authorization.replace("Bearer ", "");
        Map<String, String> map = userService.getUserInfo(accessToken);
        long userId  = Long.parseLong(map.get("id"));
        List<RecordDto> list = recordService.findRecordsByFishId(userId, fishId);
        return list;
    }

    @GetMapping("/records")
    public List<RecordDto> findAllRecords() {
        List<RecordDto> list = recordService.findAllRecords();
        return list;
    }

    @GetMapping("/image/{recordId}/{recordTime}")
    public List<RecordDto> findImages(@PathVariable("recordId") long recordId, @PathVariable("recordTime") Timestamp date, @RequestHeader("Authorization") String authorization) throws Exception {
        String accessToken = authorization.replace("Bearer ", "");
        Map<String, String> map = userService.getUserInfo(accessToken);
        long userId  = Long.parseLong(map.get("id"));
        ImageRequestDto imageRequestDto = new ImageRequestDto(userId, recordId, date);
        List<RecordDto> list = recordService.findImages(imageRequestDto);
        return list;
    }


    @PostMapping(value = "/records", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public void regist(@RequestPart RecordRequestDto recordRequestDto, @RequestPart MultipartFile image, @RequestHeader("Authorization") String authorization) throws Exception {
        String accessToken = authorization.replace("Bearer ", "");
        Map<String, String> map = userService.getUserInfo(accessToken);
        long userId  = Long.parseLong(map.get("id"));
        recordRequestDto.setUserId(userId);
        recordRequestDto.setImage(image);

        recordService.save(recordRequestDto);
    }

    @PutMapping("/records")
    public RecordDto updateRecord(@RequestBody RecordUpdateDto recordUpdateDto) {
        RecordDto recordResponseDto = recordService.update(recordUpdateDto);
        return recordResponseDto;
    }

    @DeleteMapping("/records/{recordId}")
    public void deleteRecord(@PathVariable("recordId") long recordId) {
        recordService.delete(recordId);
    }
}
