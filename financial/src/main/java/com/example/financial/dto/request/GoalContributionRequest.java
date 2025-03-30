package com.example.financial.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class GoalContributionRequest {
    Integer goalId;
    String userId;
    BigDecimal amount;
    LocalDate contributionDate;
    String description;
}
