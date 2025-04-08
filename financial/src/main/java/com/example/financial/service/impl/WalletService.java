package com.example.financial.service.impl;

import com.example.financial.dto.request.WalletRequest;
import com.example.financial.dto.response.BudgetResponse;
import com.example.financial.dto.response.WalletResponse;
import com.example.financial.entity.Budget;
import com.example.financial.entity.Category;
import com.example.financial.entity.User;
import com.example.financial.entity.Wallet;
import com.example.financial.mapper.WalletMapper;
import com.example.financial.repository.UserRepository;
import com.example.financial.repository.WalletRepository;
import com.example.financial.service.IWalletService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

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
        List<Wallet> wallets = walletRepository.findByUserUserId(userId);
        return wallets.stream().map(walletMapper::toWalletResponse).toList();
    }

    @Override
    public Wallet setDefaultWallet(String userId, Integer walletId) {
        List<Wallet> wallets = walletRepository.findByUserUserId(userId);
        Optional<Wallet> selectedWallet = wallets.stream()
                .filter(wallet -> wallet.getId().equals(walletId))
                .findFirst();
        if (selectedWallet.isEmpty()) {
            throw new IllegalArgumentException("Ví không tồn tại hoặc không thuộc về người dùng này");
        }
        wallets.forEach(wallet -> wallet.setWalletType("0"));
        walletRepository.saveAll(wallets);
        Wallet defaultWallet = selectedWallet.get();
        defaultWallet.setWalletType("1");
        return walletRepository.save(defaultWallet);
    }

    @Override
    public WalletResponse getWalletById(Integer id) {
        Wallet wallet = walletRepository.getWalletById(id);
        return walletMapper.toWalletResponse(wallet);
    }

    @Override
    public boolean addWallet(WalletRequest request) {
        User user = userRepository.findById(request.getUserId()).orElse(null);
        Wallet wallet = walletMapper.toWallet(request);
        wallet.setWalletName(wallet.getWalletName());
        wallet.setBalance(wallet.getBalance());
        wallet.setWalletType(wallet.getWalletType());
        wallet.setCurrency(wallet.getCurrency());
        wallet.setUser(user);
        walletRepository.save(wallet);
        return true;
    }

    @Override
    public boolean updateWallet(Integer walletId, WalletRequest request) {
        Optional<Wallet> wallet = walletRepository.findById(walletId);
        if (wallet.isPresent()) {
            Wallet walletNew = wallet.get();
            User user = userRepository.findById(request.getUserId()).orElse(null);
            walletNew.setUser(user);
            walletNew.setWalletName(request.getWalletName());
            walletNew.setBalance(request.getBalance());
            walletNew.setWalletType(request.getWalletType());
            walletNew.setCurrency(request.getCurrency());
            walletRepository.save(walletNew);
            return true;
        }
        return false;
    }

    @Override
    public boolean deleteWallet(Integer budgetId) {
        if (walletRepository.existsById(budgetId)) {
            walletRepository.deleteById(budgetId);
            return true;
        }
        return false;
    }

    @Override
    public void transfer(Integer fromWalletId, Integer toWalletId, BigDecimal amount) {
        Wallet fromWallet = walletRepository.findById(fromWalletId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Không tìm thấy ví nguồn"));
        Wallet toWallet = walletRepository.findById(toWalletId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Không tìm thấy ví đích"));
        if(fromWallet.getBalance().compareTo(toWallet.getBalance()) < 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Số dư trong ví không đủ");
        }
        fromWallet.setBalance(fromWallet.getBalance().subtract(amount));
        toWallet.setBalance(toWallet.getBalance().add(amount));
        walletRepository.save(fromWallet);
        walletRepository.save(toWallet);
    }
}
