package com.example.financial.controller;

import com.example.financial.dto.request.BudgetRequest;
import com.example.financial.dto.response.ApiResponse;
import com.example.financial.dto.response.BudgetResponse;
import com.example.financial.service.IBudgetService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/budget")
public class BudgetController {
    private final IBudgetService budgetService;

    public BudgetController(IBudgetService budgetService) {
        this.budgetService = budgetService;
    }

    @GetMapping("/filter")
    public ResponseEntity<ApiResponse<List<BudgetResponse>>> getAllBudgetByUserId(@RequestParam String userId) {
        List<BudgetResponse> budgetResponses = budgetService.getAllBudgetByUserId(userId);
        return ResponseEntity.ok(new ApiResponse<>(200, "lấy danh sách ngân sách thành công", budgetResponses));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<BudgetResponse>> getBudgetById(@RequestParam Integer budgetId) {
        BudgetResponse budgetResponse = budgetService.getBudgetById(budgetId);
        return ResponseEntity.ok(new ApiResponse<>(200, "lấy ngân sách theo id", budgetResponse));
    }

    @PostMapping
    ResponseEntity<ApiResponse<Boolean>> addBudget(@RequestBody BudgetRequest budgetRequest) {
        try {
            boolean create = budgetService.addBudget(budgetRequest);
            if (create) {
                return ResponseEntity.ok(new ApiResponse<>(200, "Thêm ngân sách thành công", true));
            } else {
                return ResponseEntity.ok(new ApiResponse<>(200, "Thêm ngân sách thất bại", false));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(500, e.getMessage(), false));
        }
    }

    @PutMapping
    ResponseEntity<ApiResponse<Boolean>> updateBudget(@RequestParam Integer budgetId, @RequestBody BudgetRequest budgetRequest) {
        try {
            boolean update = budgetService.updateBudget(budgetId, budgetRequest);
            if (update) {
                return ResponseEntity.ok(new ApiResponse<>(200, "Cập nhật ngân sách thành công", true));

            } else {
                return ResponseEntity.ok(new ApiResponse<>(200, "Cập nhật ngân sách thất bại", false));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(500, e.getMessage(), false));
        }
    }

    @DeleteMapping
    ResponseEntity<ApiResponse<Boolean>> deleteBudget(@RequestParam Integer budgetId) {
        try {
            boolean delete = budgetService.deleteBudget(budgetId);
            if (delete) {
                return ResponseEntity.ok(new ApiResponse<>(201, "Xóa ngân sách thành công ", true));

            } else {
                return ResponseEntity.ok(new ApiResponse<>(201, "Xóa ngân sách thất bại ", false));

            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(500, "Lỗi hệ thống: " + e.getMessage(), false));
        }
    }
}
