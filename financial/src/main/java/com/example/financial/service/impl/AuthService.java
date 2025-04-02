package com.example.financial.service.impl;

import com.example.financial.dto.request.Auth.LoginRequest;
import com.example.financial.dto.request.Auth.RefreshTokenRequest;
import com.example.financial.dto.request.UserRequest;
import com.example.financial.dto.response.Auth.AuthResponse;
import com.example.financial.dto.response.Auth.RefreshTokenResponse;
import com.example.financial.dto.response.UserResponse;
import com.example.financial.entity.RefreshToken;
import com.example.financial.entity.User;
import com.example.financial.repository.RefreshTokenRepository;
import com.example.financial.repository.UserRepository;
import com.example.financial.repository.WalletRepository;
import com.example.financial.security.JwtUtil;
import com.example.financial.service.IAuthService;
import com.example.financial.service.IWalletService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Value;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Map;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService implements IAuthService {
    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final WalletRepository walletRepository;
    private final JwtUtil jwtUtil;
    private final IWalletService walletService;
    @NonFinal
    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    protected String GOOGLE_CLIENT_ID;

    @NonFinal
    @Value("${spring.security.oauth2.client.registration.google.client-secret}")
    protected String GOOGLE_CLIENT_SECRET;



    @Override
    public UserResponse processOAuth2User(OAuth2User oAuth2User) {
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");
        String id = oAuth2User.getAttribute("sub");
        return UserResponse.builder()
                .id(id)
                .userName(name)
                .email(email)
                .accountType("GOOGLE")
                .build();
    }

    @Override
    public User addUser(UserRequest request) {
        User user = new User();
        user.setEmail(request.getEmail());
        return userRepository.save(user);
    }

    @Override
    public AuthResponse handleLogin(LoginRequest request) {
        Optional<User> emailExist = userRepository.findByEmail(request.getEmail());
        if (emailExist.isPresent()) {
            User user = emailExist.get();
            if (request.getPassword().equals(emailExist.get().getPassword())) {
                String accessToken = jwtUtil.generateAccessToken(user.getEmail(), user.getEmail());
                String refreshToken = jwtUtil.generateRefreshToken(user.getEmail(), user.getEmail());
                if (!walletRepository.existsByUserUserId(user.getUserId())) {
                    walletService.createDefaultWalletForUser(user.getUserId());
                }
                return new AuthResponse(true, accessToken, refreshToken,emailExist.get().getUserId());
            }

        }

        return new AuthResponse(false, "", "","");
    }

    @Override
    public RefreshTokenResponse refreshAccessToken(RefreshTokenRequest refreshToken) {
        String refreshTokenValue = refreshToken.getRefreshToken();
        if (jwtUtil.validateToken(refreshTokenValue)) {
            String email = jwtUtil.extractUsername(refreshTokenValue);
            if (email != null) {
                String newAccessToken = jwtUtil.generateAccessToken(email, email);
                return new RefreshTokenResponse("true", newAccessToken, refreshTokenValue);
            }
        }
        return new RefreshTokenResponse("false", "", "");
    }

    @Override
    public AuthResponse handleGoogleCallback(String code) {
        try {
            String googleAccessToken = getAccessTokenFromGoogle(code);
            UserRequest userRequest = getUserInfoFromGoogle(googleAccessToken);
            Optional<User> existingUser = userRepository.findByEmail(userRequest.getEmail());
            User user = existingUser.orElseGet(() -> addUser(userRequest));

            String accessToken = jwtUtil.generateAccessToken(user.getEmail(), user.getEmail());
            String refreshToken = jwtUtil.generateRefreshToken(user.getEmail(), user.getEmail());
            return AuthResponse.builder()
                    .accessToken(accessToken)
                    .refreshToken(refreshToken)
                    .build();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


    @Override
    public UserResponse getUser(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return new UserResponse(user.getUserId(), user.getUserName(), user.getPassword(), user.getEmail(), user.getPhoneNumber(), user.getAccountType());
    }

    private UserRequest getUserInfoFromGoogle(String accessToken) throws Exception {
        RestTemplate restTemplate = new RestTemplate();
        String userInfoUrl = "https://www.googleapis.com/oauth2/v3/userinfo";

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        HttpEntity<?> entity = new HttpEntity<>(headers);

        ResponseEntity<UserRequest> response = restTemplate.exchange(userInfoUrl, HttpMethod.GET, entity,
                UserRequest.class);

        if (!response.getStatusCode().is2xxSuccessful()) {
            throw new Exception("Failed to fetch user info");
        }

        return response.getBody();
    }

    private String getAccessTokenFromGoogle(String code) {
        String tokenUrl = "https://oauth2.googleapis.com/token";

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("code", code);
        params.add("client_id", GOOGLE_CLIENT_ID);
        params.add("client_secret", GOOGLE_CLIENT_SECRET);
        params.add("redirect_uri", "http://localhost:5173/oauth2/redirect");
        params.add("grant_type", "authorization_code");

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);
        ResponseEntity<Map> response = restTemplate.postForEntity(tokenUrl, request, Map.class);

        return response.getBody().get("access_token").toString();
    }


    //
    //
    //    @Transactional(readOnly = true)
    //    @Override
    //    public RefreshTokenResponse refreshAccessToken(String refreshToken) {
    //        try {
    //            return refreshTokenService.findByToken(refreshToken)
    //                    .map(refreshTokenService::verifyExpiration)
    //                    .map(RefreshToken::getUser)
    //                    .map(user -> {
    //                        String newAccessToken = jwtTokenProvider.generateToken(user.getEmail());
    //                        return RefreshTokenResponse.builder()
    //                                .accessToken(newAccessToken)
    //                                .refreshToken(refreshToken)
    //                                .build();
    //                    })
    //                    .orElseThrow(() -> new AuthException("Invalid refresh token"));
    //        } catch (Exception e) {
    //            log.error("Error refreshing token: {}", e.getMessage());
    //            throw new AuthException("Failed to refresh token", e);
    //        }
    //    }
}
