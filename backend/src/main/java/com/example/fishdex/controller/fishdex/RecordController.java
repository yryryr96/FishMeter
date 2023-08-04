package com.example.fishdex.controller.fishdex;

import com.example.fishdex.dto.fishdex.DayRequestDto;
import com.example.fishdex.dto.fishdex.FishResponseDto;
import com.example.fishdex.dto.fishdex.RecordRequestDto;
import com.example.fishdex.entity.fishdex.Day;
import com.example.fishdex.entity.fishdex.Fish;
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
    private final UserService userService;
    private final S3Uploader s3Uploader;

    @GetMapping("/fishes")
    public List<FishResponseDto> findAll(){
        long userId = 1;
        return recordService.findAll(userId);
    }

    @PostMapping(value = "/records", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public void regist(@RequestPart RecordRequestDto recordRequestDto, @RequestPart MultipartFile image) throws IOException {
//        , @AuthenticationPrincipal OAuth2User principal
//        long userId  = principal.getAttribute("id");
        long userId  = 1;
        System.out.println(recordRequestDto.getSpecies());
        DayRequestDto dayRequestDto = new DayRequestDto();
        dayRequestDto.setDay(recordRequestDto.getCreatedAt());

        Day day = recordService.getDay(dayRequestDto);
        recordRequestDto.setDay(day);

        User user = recordService.getUser(userId);
        recordRequestDto.setUser(user);
        Fish fish = recordService.getFish(recordRequestDto.getSpecies());
        recordRequestDto.setFish(fish);

        String imageUrl = s3Uploader.upload(image, "images");
        recordRequestDto.setImageUrl(imageUrl);

        recordService.save(recordRequestDto);
    }
}
