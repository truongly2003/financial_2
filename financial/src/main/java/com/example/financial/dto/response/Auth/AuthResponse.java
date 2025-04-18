package com.example.financial.dto.response.Auth;

import com.example.financial.dto.response.UserResponse;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AuthResponse {
    boolean status;
    String accessToken;
    String refreshToken;
    String userId;

}
