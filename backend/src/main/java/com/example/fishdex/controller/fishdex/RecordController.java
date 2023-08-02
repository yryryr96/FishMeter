package com.example.fishdex.controller.fishdex;

import com.example.fishdex.dto.fishdex.FishResponseDto;
import com.example.fishdex.dto.fishdex.RecordRequestDto;
import com.example.fishdex.service.fishdex.RecordService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class RecordController {
    private final RecordService recordService;

    @GetMapping("/fishes")
    public List<FishResponseDto> findList(){
        return recordService.findList();
    }

    @PostMapping("/records")
    public void regist(@RequestBody RecordRequestDto recordRequestDto , @AuthenticationPrincipal OAuth2User principal){
        long id  = principal.getAttribute("id");
    }

}
