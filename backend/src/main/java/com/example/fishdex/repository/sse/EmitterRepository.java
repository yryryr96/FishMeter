package com.example.fishdex.repository.sse;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Repository
public class EmitterRepository {
    public final Map<String, SseEmitter> sseEmitterMap = new ConcurrentHashMap<>();

    public SseEmitter save(String id, SseEmitter sseEmitter){
        sseEmitterMap.put(id, sseEmitter);
        return sseEmitter;
    }

    public void deleteById(String id){
        sseEmitterMap.remove(id);
    }

    public Map<String, SseEmitter> getSseEmitterMap(){
        return sseEmitterMap;
    }

    public int getSseEmitterMapCount(){
        return sseEmitterMap.size();
    }
}
