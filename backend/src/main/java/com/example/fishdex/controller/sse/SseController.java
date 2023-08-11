package com.example.fishdex.controller.sse;

import com.example.fishdex.service.sse.SseService;
import com.example.fishdex.service.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Slf4j
public class SseController {

    private final SseService sseService;
    private final UserService userService;

    private static final long TIMEOUT = 3*60*1000L;

    @GetMapping(value = "/sse/connect/", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter connect(@RequestHeader("userId") Long userId, HttpServletResponse response) throws Exception {
//        @RequestHeader("Authorization") String authorization
//        @AuthenticationPrincipal OAuth2User principal
        response.addHeader("X-Accel-Buffering", "no");
        SseEmitter sseEmitter = new SseEmitter(TIMEOUT);

        sseEmitter = sseService.subscribe(userId, sseEmitter);
        return sseEmitter;
    }
}
