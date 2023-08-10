package com.example.fishdex.controller.user;

import com.example.fishdex.service.user.CustomOAuth2UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final CustomOAuth2UserService userService;

    @GetMapping("/user/root")
    @ResponseStatus(code = HttpStatus.OK, reason = "OK")
    public void isOk() {
    }
    @GetMapping("/user")
    public Map<String, Object> user(@AuthenticationPrincipal OAuth2User principal) {
        Map<String, Object> attributes = principal.getAttributes();
        System.out.println("principal.getAttributes() = " + attributes);
        Map<String, Object> response = new HashMap<>();
        response.put("id", attributes.get("id"));
        Map<String, Object> properties = (Map<String, Object>) attributes.get("properties");
        response.put("nickname", properties.get("nickname"));
        response.put("profileImage", properties.get("profile_image"));
        return response;
    }
}
