package com.example.fishdex.controller.fishdex;

import com.example.fishdex.dto.fishdex.DayRequestDto;
import com.example.fishdex.dto.fishdex.FishResponseDto;
import com.example.fishdex.dto.fishdex.RecordRequestDto;
import com.example.fishdex.service.fishdex.RecordService;
import com.example.fishdex.util.S3Uploader;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
//import org.springframework.security.core.annotation.AuthenticationPrincipal;
//import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class RecordController {
    private final RecordService recordService;
    private final S3Uploader s3Uploader;

    @GetMapping("/fishes")
    public List<FishResponseDto> findAll(){
        return recordService.findAll();
    }

    @PostMapping("/records")
    public void regist(@RequestBody RecordRequestDto recordRequestDto) throws IOException {
//        , @AuthenticationPrincipal OAuth2User principal
//        long id  = principal.getAttribute("id");
        System.out.println(recordRequestDto.getSpecies());
        DayRequestDto dayRequestDto = new DayRequestDto();
        dayRequestDto.setDay(recordRequestDto.getCreatedAt());
        long dayId = recordService.getDayId(dayRequestDto);
        recordRequestDto.setDayId(dayId);
        long userId = 1;
        long fishId = recordService.getFishId(recordRequestDto.getSpecies());
        recordRequestDto.setFishId(fishId);


        String imageUrl = s3Uploader.upload(image, "images");
        recordRequestDto.setImageUrl(imageUrl);
        recordRequestDto.setUserId(userId);

        recordService.save(recordRequestDto);
    }
}
