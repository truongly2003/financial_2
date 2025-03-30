package com.example.financial.controller;

import com.example.financial.dto.request.GoalRequest;
import com.example.financial.dto.response.ApiResponse;

import com.example.financial.dto.response.GoalResponse;
import com.example.financial.service.IGoalService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/goal")
public class GoalController {
    private final IGoalService goalService;

    public GoalController(IGoalService goalService) {
        this.goalService = goalService;
    }

    @GetMapping("/filter")
    public ResponseEntity<ApiResponse<List<GoalResponse>>> getAllBudgetByUserId(@RequestParam String userId) {
        List<GoalResponse> goalResponses = goalService.getAllGoalByUserId(userId);
        return ResponseEntity.ok(new ApiResponse<>(200, "lấy danh sách ngân sách thành công", goalResponses));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<GoalResponse>> getBudgetById(@RequestParam Integer goalId) {
        GoalResponse goalResponse = goalService.getGoalById(goalId);
        return ResponseEntity.ok(new ApiResponse<>(200, "lấy ngân sách theo id", goalResponse));
    }

    @PostMapping
    ResponseEntity<ApiResponse<Boolean>> addBudget(@RequestBody GoalRequest goalRequest) {
        try {
            boolean create = goalService.addGoal(goalRequest);
            if (create) {
                return ResponseEntity.ok(new ApiResponse<>(200, "Thêm mục tiêu thành công", true));
            } else {
                return ResponseEntity.ok(new ApiResponse<>(200, "Thêm mục tiêu thất bại", false));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(500, e.getMessage(), false));
        }
    }

    @PutMapping
    ResponseEntity<ApiResponse<Boolean>> updateBudget(@RequestParam Integer goalId, @RequestBody GoalRequest goalRequest) {
        try {
            boolean update = goalService.updateGoal(goalId, goalRequest);
            if (update) {
                return ResponseEntity.ok(new ApiResponse<>(200, "Cập nhật mục tiêu thành công", true));

            } else {
                return ResponseEntity.ok(new ApiResponse<>(200, "Cập nhật mục tiêu thất bại", false));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(500, e.getMessage(), false));
        }
    }

    @DeleteMapping
    ResponseEntity<ApiResponse<Boolean>> deleteBudget(@RequestParam Integer goalId) {
        try {
            boolean delete = goalService.deleteGoal(goalId);
            if (delete) {
                return ResponseEntity.ok(new ApiResponse<>(201, "Xóa mục tiêu thành công ", true));

            } else {
                return ResponseEntity.ok(new ApiResponse<>(201, "Xóa mục tiêu thất bại ", false));

            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(500, "Lỗi hệ thống: " + e.getMessage(), false));
        }
    }
}
