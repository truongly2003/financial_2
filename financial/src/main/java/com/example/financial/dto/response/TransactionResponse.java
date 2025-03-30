package com.example.financial.dto.response;

import com.example.financial.entity.Transaction;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TransactionResponse {
    Integer id;
    String userId;
    BigDecimal amount;
    String description;
    LocalDate transactionDate;
    Integer categoryId;
    String categoryName;
    String categoryType;
    String transactionType;
    Integer walletId;
    String paymentMethod;
    String transactionStatus;
    String icon;
    Timestamp createdAt;
    Timestamp updatedAt;

    public TransactionResponse(Transaction transaction) {
    }
}
