package com.example.fishdex.controller.fishdex;

import com.example.fishdex.dto.fishdex.*;
import com.example.fishdex.service.fishdex.RecordService;
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

@RestController
@RequiredArgsConstructor
public class RecordController {
    private final RecordService recordService;

    @GetMapping("/fishes")
    public List<FishResponseDto> findAll(@AuthenticationPrincipal OAuth2User principal) {
        long userId  = principal.getAttribute("id");
        return recordService.findAll(userId);
    }

    @GetMapping("/fishes/{fishId}")
    public List<RecordResponseDto> findRecordsByFishId(@PathVariable("fishId") long fishId , @AuthenticationPrincipal OAuth2User principal) {

        long userId  = principal.getAttribute("id");
        List<RecordResponseDto> list = recordService.findRecordsByFishId(userId, fishId);
        return list;
    }

    @GetMapping("/records")
    public List<RecordResponseDto> findAllRecords() {
        List<RecordResponseDto> list = recordService.findAllRecords();
        return list;
    }

    @GetMapping("/image/{recordId}/{recordTime}")
    public List<RecordResponseDto> findImages(@PathVariable("recordId") long recordId, @PathVariable("recordTime") Timestamp date, @AuthenticationPrincipal OAuth2User principal){
        long userId  = principal.getAttribute("id");
        ImageRequestDto imageRequestDto = new ImageRequestDto(userId, recordId, date);
        List<RecordResponseDto> list = recordService.findImages(imageRequestDto);
        return list;
    }


    @PostMapping(value = "/records", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public void regist(@RequestPart RecordRequestDto recordRequestDto, @RequestPart MultipartFile image, @AuthenticationPrincipal OAuth2User principal) throws Exception {
        long userId  = principal.getAttribute("id");
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
