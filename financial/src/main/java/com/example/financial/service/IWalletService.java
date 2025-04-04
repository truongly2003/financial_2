package com.example.financial.service;

import com.example.financial.dto.request.BudgetRequest;
import com.example.financial.dto.request.WalletRequest;
import com.example.financial.dto.response.BudgetResponse;
import com.example.financial.dto.response.WalletResponse;
import com.example.financial.entity.Wallet;

import java.util.List;

public interface IWalletService {
    void createDefaultWalletForUser(String userId);

    List<WalletResponse> getAllWallets(String userId);

    Wallet setDefaultWallet(String userId, Integer walletId);
    //    crud
    WalletResponse getWalletById(Integer id);

    boolean addWallet(WalletRequest request);

    boolean updateWallet(Integer walletId, WalletRequest request);

    boolean deleteWallet(Integer budgetId);
}
