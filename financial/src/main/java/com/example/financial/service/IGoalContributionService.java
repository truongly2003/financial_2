package com.example.financial.service;

import com.example.financial.dto.request.GoalContributionRequest;
import com.example.financial.dto.response.GoalContributionResponse;

import java.math.BigDecimal;
import java.util.List;

public interface IGoalContributionService {
    List<GoalContributionResponse> getAllGoalByGoalIdAndUserId(Integer goalId,String userId);

    GoalContributionResponse getGoalContributionById(Integer id);

    boolean addContribute(GoalContributionRequest request);

    boolean updateContribute(Integer contributeId, GoalContributionRequest request);

    boolean deleteContribute(Integer contributeId);

    // kiểm tra số dư trong ví
    boolean  hasBalance(Integer goalId, String userId, BigDecimal amount);
}
