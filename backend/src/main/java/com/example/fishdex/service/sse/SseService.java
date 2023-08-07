package com.example.fishdex.service.sse;

import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@Service
@NoArgsConstructor
@Slf4j
public class SseService {
//    private static final AtomicLong counter = new AtomicLong();

    private final List<SseEmitter> emitters = new CopyOnWriteArrayList<>();

    @Async
    public SseEmitter add(){
        SseEmitter emitter = new SseEmitter(60*1000L); // 60분 설정

        this.emitters.add(emitter);
        log.info("new emitter added: {}", emitter);
        log.info("emitter list size: {}", emitters.size());
        log.info("emitter list: {}", emitters);
        emitter.onCompletion(() -> {
            log.info("onCompletion callback");
            this.emitters.remove(emitter);
            int userCount = emitters.size();
            sendData("count", userCount);
        });
        emitter.onTimeout(() -> {
            log.info("onTimeout callback");
            emitter.complete();
        });

        int userCount = emitters.size();
        sendData("count", userCount);

        return emitter;
    }

    private void sendData(String eventName, Object o){
        try{
            for(SseEmitter se : emitters) {
                se.send(SseEmitter.event()
                        .name(eventName)
                        .data(o));
            }
        }catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
