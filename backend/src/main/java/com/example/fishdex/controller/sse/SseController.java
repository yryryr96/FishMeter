package com.example.fishdex.controller.sse;

import com.example.fishdex.service.sse.SseService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequiredArgsConstructor
@Slf4j
public class SseController {

    private final SseService sseService;

    private static final long TIMEOUT = 3*60*1000L;

    @GetMapping(value = "/sse/connect/{id}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter connect(HttpServletResponse response, @PathVariable String id) {
        response.addHeader("X-Accel-Buffering", "no");
        SseEmitter sseEmitter = new SseEmitter(TIMEOUT);
        sseEmitter = sseService.subscribe(id, sseEmitter);
        return sseEmitter;
    }
}
