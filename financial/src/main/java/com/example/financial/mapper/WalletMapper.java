package com.example.financial.mapper;

import com.example.financial.dto.request.WalletRequest;
import com.example.financial.dto.response.WalletResponse;
import com.example.financial.entity.Wallet;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")

public interface WalletMapper {
    WalletResponse toWalletResponse(Wallet wallet);
    Wallet toWallet(WalletRequest walletRequest);
}
