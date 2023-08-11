package com.example.fishdex.controller.user;

import com.example.fishdex.service.user.CustomOAuth2UserService;
import com.example.fishdex.service.user.UserService;
import com.nimbusds.openid.connect.sdk.claims.UserInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticatedPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/")
//    @ResponseStatus(code = HttpStatus.OK, reason = "OK")
    public void isOk() {
    }

    @GetMapping("/user")
    public Map<String, String> getUserInfo(@RequestHeader("Authorization") String authorization) throws Exception {
        String accessToken = authorization.replace("Bearer ", "");
        Map<String, String> map = userService.getUserInfo(accessToken);
        return map;
    }
}
