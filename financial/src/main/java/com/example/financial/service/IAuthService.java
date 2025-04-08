package com.example.financial.service;

import com.example.financial.dto.request.Auth.LoginRequest;
import com.example.financial.dto.request.Auth.RefreshTokenRequest;
import com.example.financial.dto.request.UserRequest;
import com.example.financial.dto.response.Auth.AuthResponse;
import com.example.financial.dto.response.Auth.RefreshTokenResponse;
import com.example.financial.dto.response.UserResponse;
import com.example.financial.entity.User;
import org.springframework.security.oauth2.core.user.OAuth2User;

public interface IAuthService {

//    AuthResponse refreshToken(String refreshToken);

    UserResponse processOAuth2User(OAuth2User oAuth2User);

    User addUser(UserRequest request);

    AuthResponse handleLogin(LoginRequest request);

    AuthResponse handleGoogleCallback(String code);

    RefreshTokenResponse refreshAccessToken(RefreshTokenRequest refreshToken);

    UserResponse getUser(String userId);
    AuthResponse handleFacebookCallback(String code);

}
