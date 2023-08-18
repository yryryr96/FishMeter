package com.example.fishdex.service.user;

import com.example.fishdex.entity.user.User;
import com.example.fishdex.repository.user.UserRepository;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    public Map<String, String> getUserInfo(String token) throws Exception {
        Map<String, String> response = new HashMap<>();
        String reqURL = "https://kapi.kakao.com/v2/user/me";

        //access_token을 이용하여 사용자 정보 조회
        try {
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            conn.setRequestMethod("POST");
            conn.setDoOutput(true);
            conn.setRequestProperty("Authorization", "Bearer " + token); //전송할 header 작성, access_token전송

            //결과 코드가 200이라면 성공
            int responseCode = conn.getResponseCode();
            System.out.println("responseCode : " + responseCode);

            //요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }
            System.out.println("response body : " + result);

            //Gson 라이브러리로 JSON파싱
            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);

            long userId = element.getAsJsonObject().get("id").getAsLong();
            String nickname = element.getAsJsonObject().get("properties").getAsJsonObject().get("nickname").getAsString();
            String profile_image = element.getAsJsonObject().get("properties").getAsJsonObject().get("profile_image").getAsString();

            response.put("id", String.valueOf(userId));
            response.put("nickname", nickname);
            response.put("profileImage", profile_image);

            System.out.println("id : " + userId);
            br.close();

            if (!userRepository.existsById(userId)) {
                User user = User.builder()
                        .id(userId)
                        .nickname(nickname)
                        .profile_image(profile_image)
                        .build();

                userRepository.save(user);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return response;
    }
}
