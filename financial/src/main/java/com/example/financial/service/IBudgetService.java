package com.example.financial.service;

import com.example.financial.dto.request.BudgetRequest;
import com.example.financial.dto.response.BudgetResponse;

import java.util.List;

public interface IBudgetService {
    List<BudgetResponse> getAllBudgetByUserId(String userId);

    BudgetResponse getBudgetById(Integer id);

    boolean addBudget(BudgetRequest request);

    boolean updateBudget(Integer budgetId, BudgetRequest request);

    boolean deleteBudget(Integer budgetId);
}
