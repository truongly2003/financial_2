package com.example.financial.controller.Authen;

import com.example.financial.dto.request.Auth.AuthCallbackRequest;
import com.example.financial.dto.request.Auth.LoginRequest;

import com.example.financial.dto.request.Auth.RefreshTokenRequest;
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
    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@RequestBody RefreshTokenRequest request) {
       return ResponseEntity.ok(authService.refreshAccessToken(request));
    }
}
