package com.example.financial.service;

import com.example.financial.dto.response.WalletResponse;

import java.util.List;

public interface IWalletService {
    void createDefaultWalletForUser(String userId);

    List<WalletResponse> getAllWallets(String userId);
}
