package com.example.financial.service.impl;

import com.example.financial.dto.response.WalletResponse;
import com.example.financial.entity.User;
import com.example.financial.entity.Wallet;
import com.example.financial.mapper.WalletMapper;
import com.example.financial.repository.UserRepository;
import com.example.financial.repository.WalletRepository;
import com.example.financial.service.IWalletService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor

public class WalletService implements IWalletService {
    private final WalletRepository walletRepository;
    private final UserRepository userRepository;
    private final WalletMapper walletMapper;
    @Override
    public void createDefaultWalletForUser(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        Wallet defaultWallet = new Wallet();
        defaultWallet.setUser(user);
        defaultWallet.setWalletName("Ví mặc định");
        defaultWallet.setBalance(BigDecimal.ZERO);
        defaultWallet.setWalletType("1");
        defaultWallet.setCurrency("VND");
        walletRepository.save(defaultWallet);
    }

    @Override
    public List<WalletResponse> getAllWallets(String userId) {
        List<Wallet> wallets=walletRepository.findByUserUserId(userId);
        return wallets.stream().map(walletMapper::toWalletResponse).toList();
    }
}
