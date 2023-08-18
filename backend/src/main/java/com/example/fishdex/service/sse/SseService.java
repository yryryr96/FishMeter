package com.example.fishdex.service.sse;

import com.example.fishdex.repository.sse.EmitterRepository;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.atomic.AtomicInteger;

@Service
@RequiredArgsConstructor
@Slf4j
public class SseService {

    private final EmitterRepository emitterRepository;

    public SseEmitter subscribe(long id, SseEmitter sseEmitter){
        sseEmitter = emitterRepository.save(id, sseEmitter);

        sendCount();

        try {
            sseEmitter.send(SseEmitter.event()
                    .name("recentRecord")
                    .data("dummy"));
        } catch (IOException e) {
            emitterRepository.deleteById(id);
        }

        sseEmitter.onCompletion(()-> {
            emitterRepository.deleteById(id);
            sendCount();
        });
        sseEmitter.onTimeout(sseEmitter::complete);
        return sseEmitter;
    }

    private void sendCount(){
        emitterRepository.getSseEmitterMap().forEach((key, emitter)->{
            try {
                emitter.send(SseEmitter.event()
                        .name("count")
                        .data(emitterRepository.getSseEmitterMapCount()));
            } catch (IOException e) {
                emitterRepository.deleteById(key);
            }
        });
    }

    public void sendDataToAll(String name, Object o){
        emitterRepository.getSseEmitterMap().forEach((key, emitter)->{
            try {
                emitter.send(SseEmitter.event()
                        .name(name)
                        .data(o));
            } catch (IOException e) {
                emitterRepository.deleteById(key);
            }
        });
    }
}

