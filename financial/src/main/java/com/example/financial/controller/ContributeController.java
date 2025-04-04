package com.example.financial.controller;

import com.example.financial.dto.request.GoalContributionRequest;
import com.example.financial.dto.request.GoalRequest;
import com.example.financial.dto.response.ApiResponse;
import com.example.financial.dto.response.GoalContributionResponse;
import com.example.financial.dto.response.GoalResponse;
import com.example.financial.service.IGoalContributionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contribute")
public class ContributeController {
    final IGoalContributionService goalContribution;

    public ContributeController(IGoalContributionService goalContribution) {
        this.goalContribution = goalContribution;
    }
    @GetMapping("/filter")
    public ResponseEntity<ApiResponse<List<GoalContributionResponse>>> getAllContributeByUserIdAndGoalId(@RequestParam Integer goalId, @RequestParam String userId) {
        List<GoalContributionResponse> contributeResponse = goalContribution.getAllGoalByGoalIdAndUserId(goalId,userId);
        return ResponseEntity.ok(new ApiResponse<>(200, "lấy danh sách đóng góp thành công", contributeResponse));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<GoalContributionResponse>> getContributeById(@RequestParam Integer contributeId) {
        GoalContributionResponse contributeResponse = goalContribution.getGoalContributionById(contributeId);
        return ResponseEntity.ok(new ApiResponse<>(200, "lấy đóng góp theo id", contributeResponse));
    }

    @PostMapping
    ResponseEntity<ApiResponse<Boolean>> addContribute(@RequestBody GoalContributionRequest contributeRequest) {
        try {
            boolean create = goalContribution.addContribute(contributeRequest);
            if (create) {
                return ResponseEntity.ok(new ApiResponse<>(200, "Thêm đóng góp thành công", true));
            } else {
                return ResponseEntity.ok(new ApiResponse<>(201, "Thêm đóng góp thất bại", false));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(500, e.getMessage(), false));
        }
    }

    @PutMapping
    ResponseEntity<ApiResponse<Boolean>> updateContribute(@RequestParam Integer contributeId, @RequestBody GoalContributionRequest contributeRequest) {
        try {
            boolean update = goalContribution.updateContribute(contributeId, contributeRequest);
            if (update) {
                return ResponseEntity.ok(new ApiResponse<>(200, "Cập nhật đóng góp thành công", true));

            } else {
                return ResponseEntity.ok(new ApiResponse<>(201, "Cập nhật đóng góp thất bại", false));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(500, e.getMessage(), false));
        }
    }

    @DeleteMapping
    ResponseEntity<ApiResponse<Boolean>> deleteContribute(@RequestParam Integer contributeId) {
        try {
            boolean delete = goalContribution.deleteContribute(contributeId);
            if (delete) {
                return ResponseEntity.ok(new ApiResponse<>(200, "Xóa đóng góp thành công ", true));

            } else {
                return ResponseEntity.ok(new ApiResponse<>(201, "Xóa đóng góp thất bại ", false));

            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(500, "Lỗi hệ thống: " + e.getMessage(), false));
        }
    }
}
