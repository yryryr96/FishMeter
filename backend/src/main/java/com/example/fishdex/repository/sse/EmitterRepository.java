package com.example.fishdex.repository.sse;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Repository
public class EmitterRepository {
    public final Map<Long, SseEmitter> sseEmitterMap = new ConcurrentHashMap<>();

    public SseEmitter save(Long id, SseEmitter sseEmitter){
        sseEmitterMap.put(id, sseEmitter);
        return sseEmitter;
    }

    public void deleteById(Long id){
        sseEmitterMap.remove(id);
    }

    public Map<Long, SseEmitter> getSseEmitterMap(){
        return sseEmitterMap;
    }

    public int getSseEmitterMapCount(){
        return sseEmitterMap.size();
    }
}
