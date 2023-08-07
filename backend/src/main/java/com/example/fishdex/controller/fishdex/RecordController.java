package com.example.fishdex.controller.fishdex;

import com.example.fishdex.dto.fishdex.*;
import com.example.fishdex.entity.fishdex.Day;
import com.example.fishdex.entity.fishdex.Fish;
import com.example.fishdex.entity.fishdex.Record;
import com.example.fishdex.entity.user.User;
import com.example.fishdex.service.fishdex.RecordService;
import com.example.fishdex.service.user.UserService;
import com.example.fishdex.util.S3Uploader;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
//import org.springframework.security.core.annotation.AuthenticationPrincipal;
//import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class RecordController {
    private final RecordService recordService;

    @GetMapping("/fishes")
    public List<FishResponseDto> findAll() {
//        , @AuthenticationPrincipal OAuth2User principal
//        long userId  = principal.getAttribute("id");
        System.out.println("here");
        long userId = 1;
        return recordService.findAll(userId);
    }

    @GetMapping("/fishes/{fishId}")
    public List<RecordResponseDto> findRecordsByFishId(@PathVariable("fishId") long fishId) {
        //        , @AuthenticationPrincipal OAuth2User principal
        //    long userId  = principal.getAttribute("id");
        long userId = 1;
        List<RecordResponseDto> list = recordService.findRecordsByFishId(userId, fishId);
        return list;
    }

    @GetMapping("/records")
    public List<RecordResponseDto> findAllRecords() {
        List<RecordResponseDto> list = recordService.findAllRecords();
        return list;
    }

    @PostMapping(value = "/records", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public void regist(@RequestPart RecordRequestDto recordRequestDto, @RequestPart MultipartFile image) {
//        , @AuthenticationPrincipal OAuth2User principal
//        long userId  = principal.getAttribute("id");
        long userId = 1;

        recordRequestDto.setUserId(userId);
        recordRequestDto.setImage(image);

        recordService.save(recordRequestDto);
    }

    @PutMapping("/records")
    public RecordResponseDto updateRecord(@RequestBody RecordUpdateDto recordUpdateDto) {
        RecordResponseDto recordResponseDto = recordService.update(recordUpdateDto);
        return recordResponseDto;
    }

    @DeleteMapping("/records/{recordId}")
    public void deleteRecord(@PathVariable("recordId") long recordId) {
        recordService.delete(recordId);
    }
}
