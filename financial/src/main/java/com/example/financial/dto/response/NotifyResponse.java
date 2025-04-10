package com.example.financial.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class NotifyResponse {
    Integer id;
    String userId;
    String title;
    String message;
    String readStatus;
    String type;
    String link;
    LocalDateTime createdAt;
}
