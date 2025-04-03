package com.example.financial.mapper;

import com.example.financial.dto.request.WalletRequest;
import com.example.financial.dto.response.WalletResponse;
import com.example.financial.entity.Wallet;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")

public interface WalletMapper {
    @Mapping(source = "user.userId", target = "userId")
    WalletResponse toWalletResponse(Wallet wallet);
    Wallet toWallet(WalletRequest walletRequest);
}
