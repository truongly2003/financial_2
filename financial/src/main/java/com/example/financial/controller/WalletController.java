package com.example.financial.controller;

import com.example.financial.dto.response.WalletResponse;
import com.example.financial.service.IWalletService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/wallet")
public class WalletController {
    private final IWalletService walletService;

    public WalletController(IWalletService walletService) {
        this.walletService = walletService;
    }

    @RequestMapping()
    public ResponseEntity<List<WalletResponse>> wallet(@RequestParam String userId) {
        List<WalletResponse> wallets=walletService.getAllWallets(userId);
        return ResponseEntity.ok(wallets);
    }

}
