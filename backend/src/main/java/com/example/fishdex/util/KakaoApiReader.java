package com.example.fishdex.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Getter
@Setter
@RequiredArgsConstructor
@Service
public class KakaoApiReader {
    @Value("${kakao.api}")
    private String REST_API_KEY;
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;
    private double latitude;
    private double longitude;

    public String getAddressName() throws Exception {

        double x = longitude;
        double y = latitude;
        String url = String.format("https://dapi.kakao.com/v2/local/geo/transcoord.json?x=%f&y=%f&input_coord=WTM&output_coord=WGS84", x, y);

        System.out.println(url);
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "KakaoAK " + REST_API_KEY);

        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        AddressInfo addressInfo = objectMapper.readValue(response.getBody(), AddressInfo.class);

        // documents 배열 중 첫 번째 document의 address_name 정보 반환
        String addressName = addressInfo.getDocuments()[0].getAddress().getAddress_name();
        return addressName;
    }
}

