package com.example.financial.service.impl;

import com.example.financial.dto.request.BudgetRequest;
import com.example.financial.dto.response.BudgetResponse;
import com.example.financial.entity.Budget;
import com.example.financial.entity.Category;
import com.example.financial.entity.User;
import com.example.financial.mapper.BudgetMapper;
import com.example.financial.repository.BudgetRepository;
import com.example.financial.repository.CategoryRepository;
import com.example.financial.repository.TransactionRepository;
import com.example.financial.repository.UserRepository;
import com.example.financial.service.IBudgetService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BudgetService implements IBudgetService {
    private final BudgetRepository budgetRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final BudgetMapper budgetMapper;
    private final TransactionRepository transactionRepository;

    @Override
    public List<BudgetResponse> getAllBudgetByUserId(String userId) {
        List<Budget> budgets = budgetRepository.getBudgetsByUserUserId(userId);
        return budgets.stream().map(budget -> {
            BigDecimal totalSpent = transactionRepository.getTotalSpentByBudget(
                    userId,
                    budget.getCategory().getId(),
                    "expense",
                    budget.getStartDate(),
                    budget.getEndDate()
            );
            BudgetResponse response = budgetMapper.toBudgetResponse(budget);
            response.setTotalSpent(totalSpent);

            Category category = categoryRepository.findById(budget.getCategory().getId()).orElse(null);
            if (category != null) {
                response.setCategoryName(category.getCategoryName());
            }

            return response;
        }).toList();
    }


    @Override
    public BudgetResponse getBudgetById(Integer id) {
        Budget budget = budgetRepository.getBudgetById(id);
        BudgetResponse response = budgetMapper.toBudgetResponse(budget);
        Category category = categoryRepository.findById(budget.getCategory().getId()).orElse(null);
        if (category != null) {
            response.setCategoryName(category.getCategoryName());
        }
        BigDecimal totalSpent = transactionRepository.getTotalSpentByBudget(
                budget.getUser().getUserId(),
                budget.getCategory().getId(),
                "expense",
                budget.getStartDate(),
                budget.getEndDate()
        );
        response.setTotalSpent(totalSpent);
        return response;

    }

    @Override
    public boolean addBudget(BudgetRequest request) {
        Category category = categoryRepository.findById(request.getCategoryId()).orElse(null);
        User user = userRepository.findById(request.getUserId()).orElse(null);
        Budget budget = budgetMapper.toBudget(request);
        budget.setCategory(category);
        budget.setUser(user);
        budgetRepository.save(budget);
        return true;
    }

    @Override
    public boolean updateBudget(Integer budgetId, BudgetRequest request) {
        Optional<Budget> budget = budgetRepository.findById(budgetId);
        if (budget.isPresent()) {
            Budget budget1 = budget.get();
            Category category = categoryRepository.findById(request.getCategoryId()).orElse(null);
            User user = userRepository.findById(request.getUserId()).orElse(null);
            budget1.setCategory(category);
            budget1.setUser(user);
            budget1.setStatus(request.getStatus());
            budget1.setStartDate(request.getStartDate());
            budget1.setEndDate(request.getEndDate());
            budget1.setAmountLimit(request.getAmountLimit());
            budget1.setBudgetName(request.getBudgetName());
            budgetRepository.save(budget1);
            return true;
        }
        return false;
    }

    @Override
    public boolean deleteBudget(Integer budgetId) {
        if (budgetRepository.existsById(budgetId)) {
            budgetRepository.deleteById(budgetId);
            return true;
        }
        return false;
    }
}
