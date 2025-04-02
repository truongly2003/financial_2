package com.example.financial.service.impl;

import com.example.financial.repository.TransactionRepository;
import com.example.financial.repository.WalletRepository;
import com.example.financial.service.IOverviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class OverviewService implements IOverviewService {
    private final TransactionRepository transactionRepository;
    private final WalletRepository walletRepository;
    @Override
    public BigDecimal getTotalIncome(String userId) {
        return transactionRepository.getTotalIncome(userId);
    }

    @Override
    public BigDecimal getTotalExpenses(String userId) {
        return transactionRepository.getTotalExpense(userId);
    }

    @Override
    public BigDecimal getTotalBalance(String userId) {
        return walletRepository.getTotalBalance(userId);
    }
}
