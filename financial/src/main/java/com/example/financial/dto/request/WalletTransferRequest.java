package com.example.financial.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class WalletTransferRequest {
    private Integer fromWalletId;
    private Integer toWalletId;
    private BigDecimal amount;
}
