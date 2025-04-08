package com.example.financial.service.impl;

import com.example.financial.dto.request.CategoryRequest;
import com.example.financial.dto.response.CategoryResponse;
import com.example.financial.entity.Budget;
import com.example.financial.entity.Category;
import com.example.financial.entity.Transaction;
import com.example.financial.entity.User;
import com.example.financial.mapper.CategoryMapper;
import com.example.financial.repository.BudgetRepository;
import com.example.financial.repository.CategoryRepository;
import com.example.financial.repository.TransactionRepository;
import com.example.financial.repository.UserRepository;
import com.example.financial.service.ICategoryService;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryService implements ICategoryService {
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;
    private final CategoryMapper categoryMapper;
    private final BudgetRepository budgetRepository;
    private final TransactionRepository transactionRepository;
    @Override
    public List<CategoryResponse> getAllCategories(String userId) {
        List<Category> categories = categoryRepository.getAllCategory(userId,"1");
        return categories.stream().map(category -> {
            CategoryResponse categoryResponse = categoryMapper.toCategoryResponse(category);
            // tìm ngân sách có hiệu lực
            Optional<Budget> budget=budgetRepository.findByUserUserIdAndCategoryIdAndStartDateLessThanEqualAndEndDateGreaterThanEqual(
                    userId,categoryResponse.getId(), LocalDate.now(),LocalDate.now()
            );
            if(budget.isPresent()){
                Budget budget1 = budget.get();
                BigDecimal budgetLimit = budget1.getAmountLimit();
                BigDecimal spent = transactionRepository
                        .sumAmountByUserIdAndCategoryIdAndTransactionDateBetween(
                                userId,
                                category.getId(),
                                budget1.getStartDate(),
                                budget1.getEndDate()
                        );
                if (spent == null) spent = BigDecimal.ZERO;
                categoryResponse.setBudgetLimit(budgetLimit);
                categoryResponse.setBudgetSpent(spent);
                categoryResponse.setBudgetRemaining(budgetLimit.subtract(spent));
            }
            return categoryResponse;
        }).toList();
    }

    @Override
    public List<CategoryResponse> getAllCategoriesByUserId(String userId) {
        List<Category> categories = categoryRepository.getCategoryByUserUserId(userId);
        return categories.stream().map(categoryMapper::toCategoryResponse).toList();
    }

    @Override
    public CategoryResponse getCategoryById(Integer categoryId) {
        Category category = categoryRepository.getCategoryById(categoryId);
        return categoryMapper.toCategoryResponse(category);
    }

    @Override
    public boolean addCategory(CategoryRequest request) {
        User user = userRepository.findById(request.getUserId()).orElse(null);
        Category category = categoryMapper.toCategory(request);
        category.setUser(user);
        categoryRepository.save(category);
        return true;
    }

    @Override
    public boolean updateCategory(Integer categoryId, String userId, CategoryRequest request) {
        Optional<Category> optionalCategory = categoryRepository.findById(categoryId);
        if (optionalCategory.isPresent()) {
            Category category = optionalCategory.get();
            if (category.getUser() == null || !category.getUser().getUserId().equals(userId)) {
                return false;
            }
            User user = userRepository.findById(request.getUserId()).orElse(null);
            category.setUser(user);
            category.setCategoryName(request.getCategoryName());
            category.setCategoryType(request.getCategoryType());
            category.setDescription(request.getDescription());
            category.setIcon(request.getIcon());
            categoryRepository.save(category);
            return true;
        }
        return false;
    }

    @Override
    public boolean deleteCategory(Integer categoryId, String userId) {
        Optional<Category> optionalCategory = categoryRepository.findById(categoryId);
        if (optionalCategory.isPresent()) {
            Category category = optionalCategory.get();
            if (category.getUser() == null || !category.getUser().getUserId().equals(userId)) {
                return false;
            }
            categoryRepository.deleteById(categoryId);
            return true;
        }
        return false;
    }
}
