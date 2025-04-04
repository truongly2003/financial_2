package com.example.financial.service;

import com.example.financial.dto.request.CategoryRequest;
import com.example.financial.dto.response.CategoryResponse;
import com.example.financial.entity.User;

import java.util.List;

public interface ICategoryService {
    List<CategoryResponse> getAllCategories(String userId);
    List<CategoryResponse> getAllCategoriesByUserId(String userId);
    CategoryResponse getCategoryById(Integer categoryId);
    boolean addCategory(CategoryRequest categoryRequest);

    boolean updateCategory(Integer categoryId,String userId, CategoryRequest categoryRequest);

    boolean deleteCategory(Integer categoryId,String userId);
}
