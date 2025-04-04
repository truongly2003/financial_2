package com.example.financial.controller;

import com.example.financial.dto.request.SetDefaultWalletRequest;
import com.example.financial.dto.request.WalletRequest;
import com.example.financial.dto.response.ApiResponse;
import com.example.financial.dto.response.WalletResponse;
import com.example.financial.entity.Wallet;
import com.example.financial.service.IWalletService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wallet")
public class WalletController {
    private final IWalletService walletService;

    public WalletController(IWalletService walletService) {
        this.walletService = walletService;
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<WalletResponse>> wallet(@RequestParam String userId) {
        List<WalletResponse> wallets=walletService.getAllWallets(userId);
        return ResponseEntity.ok(wallets);
    }
    @PutMapping("/default")
    public ResponseEntity<?> setDefaultWallet(
            @RequestBody SetDefaultWalletRequest request) {
        Wallet updatedWallet = walletService.setDefaultWallet(request.getUserId(), request.getWalletId());
        return ResponseEntity.ok(updatedWallet);
    }

//    crud

    @GetMapping
    public ResponseEntity<ApiResponse<WalletResponse>> getBudgetById(@RequestParam Integer walletId) {
        WalletResponse walletResponse= walletService.getWalletById(walletId);
        return ResponseEntity.ok(new ApiResponse<>(200, "lấy ví theo id", walletResponse));
    }

    @PostMapping
    ResponseEntity<ApiResponse<Boolean>> addBudget(@RequestBody WalletRequest walletRequest) {
        try {
            boolean create = walletService.addWallet(walletRequest);
            if (create) {
                return ResponseEntity.ok(new ApiResponse<>(200, "Thêm ví thành công", true));
            } else {
                return ResponseEntity.ok(new ApiResponse<>(201, "Thêm ví thất bại", false));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(500, e.getMessage(), false));
        }
    }

    @PutMapping
    ResponseEntity<ApiResponse<Boolean>> updateBudget(@RequestParam Integer walletId, @RequestBody WalletRequest walletRequest) {
        try {
            boolean update = walletService.updateWallet(walletId, walletRequest);
            if (update) {
                return ResponseEntity.ok(new ApiResponse<>(200, "Cập nhật ví thành công", true));

            } else {
                return ResponseEntity.ok(new ApiResponse<>(201, "Cập nhật ví thất bại", false));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(500, e.getMessage(), false));
        }
    }

    @DeleteMapping
    ResponseEntity<ApiResponse<Boolean>> deleteBudget(@RequestParam Integer walletId) {
        try {
            boolean delete = walletService.deleteWallet(walletId);
            if (delete) {
                return ResponseEntity.ok(new ApiResponse<>(200, "Xóa ví thành công ", true));

            } else {
                return ResponseEntity.ok(new ApiResponse<>(201, "Xóa ví thất bại ", false));

            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(500, "Lỗi hệ thống: " + e.getMessage(), false));
        }
    }
}
