package com.example.financial.controller.Authen;

import lombok.RequiredArgsConstructor;
import lombok.experimental.NonFinal;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("api/google")
@RequiredArgsConstructor
public class GoogleAuthController {

    @NonFinal
    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    protected String GOOGLE_CLIENT_ID;

    @NonFinal
    @Value("${spring.security.oauth2.client.registration.google.client-secret}")
    protected String GOOGLE_CLIENT_SECRET;
    String googleRedirectUri="http://localhost:5173/oauth2/redirect";
    @GetMapping("/getlogin")
    public ResponseEntity<Map<String, String>> getGoogleAuthUrl() {
        String googleAuthUrl = "https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=" + GOOGLE_CLIENT_ID +
                "&scope=email profile&redirect_uri=" + googleRedirectUri+"&access_type=offline&prompt=select_account";

        Map<String, String> response = new HashMap<>();
        response.put("authUrl", googleAuthUrl);
        return ResponseEntity.ok(response);
    }
}
