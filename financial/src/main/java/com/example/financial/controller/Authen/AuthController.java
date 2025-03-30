package com.example.financial.controller.Authen;

import com.example.financial.dto.request.Auth.AuthCallbackRequest;
import com.example.financial.dto.request.Auth.LoginRequest;

import com.example.financial.dto.response.UserResponse;
import com.example.financial.service.IAuthService;

import org.springframework.http.*;

import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("api/auth")
public class AuthController {
    private final IAuthService authService;
    public AuthController(IAuthService authService) {
        this.authService = authService;
    }
    @PostMapping("/login")
    public ResponseEntity<?> Login(@RequestBody LoginRequest requests){
        return ResponseEntity.ok(authService.handleLogin(requests));
    }
    @GetMapping("/user")
    public ResponseEntity<UserResponse> getUser(@RequestParam String userId) {
        return ResponseEntity.ok(authService.getUser(userId));
    }
    @PostMapping("/callback")
    public ResponseEntity<?> callback(@RequestBody AuthCallbackRequest request){
        return ResponseEntity.ok(authService.handleGoogleCallback(request.getCode()));
    }
//    @PostMapping("/refresh")
//    public ResponseEntity<?> refreshToken(@RequestBody RefreshTokenRequest request) {
//        String refreshToken = request.getRefreshToken();
//
//        if (jwtUtil.validateToken(refreshToken)) {
//            String email = jwtUtil.extractUsername(refreshToken);
//            String newAccessToken = jwtUtil.generateAccessToken(email);
//
//            Map<String, String> tokens = new HashMap<>();
//            tokens.put("accessToken", newAccessToken);
//            tokens.put("refreshToken", refreshToken); // Refresh token giữ nguyên
//
//            return ResponseEntity.ok(tokens);
//        } else {
//            return ResponseEntity.status(401).body("Invalid Refresh Token");
//        }
//    }



}
