package com.example.financial.dto;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor

@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class NotificationEvent {
    private String userId;
    private String message;
    private String type;
    private String link;
}
