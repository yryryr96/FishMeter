package com.example.fishdex.service.sse;

import lombok.NoArgsConstructor;
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
@NoArgsConstructor
@Slf4j
public class SseService {

    private final List<SseEmitter> emitters = new CopyOnWriteArrayList<>();

    @Async
    public SseEmitter add(){
        SseEmitter emitter = new SseEmitter(3*60*1000L); // 1분 설정

        emitters.add(emitter);
        log.info("new emitter added: {}", emitter);
        log.info("emitter list size: {}", emitters.size());
        log.info("emitter list: {}", emitters);
        emitter.onCompletion(() -> {
            log.info("onCompletion callback");
            emitters.remove(emitter);
        });
        emitter.onTimeout(() -> {
            log.info("onTimeout callback");
            emitters.remove(emitter);
        });

        sendCount();

        return emitter;
    }

    private void sendCount(){

        AtomicInteger count = new AtomicInteger();
        count.set(emitters.size());
        for(SseEmitter emitter : emitters){
            try{
                emitter.send(SseEmitter.event()
                        .name("count")
                        .data(count));
            }catch(IOException e){
                log.info("message sending error");
            }
        }
    }

    @Scheduled(fixedDelay = 5*1000) //5초
    public void ping(){
        List<SseEmitter> errorList = new ArrayList<>();

        for(SseEmitter emitter : emitters){
            try{
                emitter.send(SseEmitter.event()
                        .name("ping")
                        .data(0));
            }catch(IOException e){
                errorList.add(emitter);
            }
        }
        for(SseEmitter emitter : errorList){
            emitters.remove(emitter);
        }

        if(!errorList.isEmpty()){
            sendCount();
        }
    }
}

