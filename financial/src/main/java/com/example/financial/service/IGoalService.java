package com.example.financial.service;

import com.example.financial.dto.request.BudgetRequest;
import com.example.financial.dto.request.GoalRequest;
import com.example.financial.dto.response.BudgetResponse;
import com.example.financial.dto.response.GoalResponse;

import java.util.List;

public interface IGoalService {
    List<GoalResponse> getAllGoalByUserId(String userId);

    GoalResponse getGoalById(Integer id);

    boolean addGoal(GoalRequest request);

    boolean updateGoal(Integer goalId, GoalRequest request);

    boolean deleteGoal(Integer goalId);
}
