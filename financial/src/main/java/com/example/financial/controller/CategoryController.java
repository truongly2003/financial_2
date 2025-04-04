package com.example.financial.controller;

import com.example.financial.dto.request.CategoryRequest;
import com.example.financial.dto.request.TransactionRequest;
import com.example.financial.dto.response.ApiResponse;
import com.example.financial.dto.response.CategoryResponse;
import com.example.financial.dto.response.TransactionResponse;
import com.example.financial.entity.User;
import com.example.financial.service.ICategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/category")
public class CategoryController {
    private final ICategoryService categoryService;

    public CategoryController(ICategoryService categoryService) {
        this.categoryService = categoryService;
    }
    @GetMapping
    public ResponseEntity<List<CategoryResponse>> getAllCategories(@RequestParam String userId) {
        List<CategoryResponse> categories = categoryService.getAllCategories(userId);
        return ResponseEntity.ok(categories);
    }
    @GetMapping("/category-detail")
    public ResponseEntity<ApiResponse<CategoryResponse>> getCategoryId(@RequestParam Integer categoryId) {
        return ResponseEntity.ok(new ApiResponse<>(200, "success", categoryService.getCategoryById(categoryId)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Boolean>> createCategory(@RequestBody CategoryRequest category) {
        try {
            boolean created = categoryService.addCategory(category);
            if (created) {
                return ResponseEntity.status(HttpStatus.CREATED)
                        .body(new ApiResponse<>(200, "Thêm danh mục thành công.", true));
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(new ApiResponse<>(400, "Thêm danh mục thất bại.", false));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(500, "Lỗi hệ thống: " + e.getMessage(), false));
        }
    }
    @PutMapping()
    public ResponseEntity<ApiResponse<Boolean>> updateCategory(@RequestParam Integer categoryId,@RequestParam String userId, @RequestBody CategoryRequest request) {
        try {
            boolean create = categoryService.updateCategory(categoryId,userId, request);
            if (create) {
                return ResponseEntity.ok(new ApiResponse<>(200, "Cập nhật danh mục thành công ", true));
            } else {
                return ResponseEntity.ok(new ApiResponse<>(201, "Cập nhật danh mục thất bại ", true));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(500, "Lỗi hệ thống: " + e.getMessage(), false));
        }
    }
    @DeleteMapping
    public ResponseEntity<ApiResponse<Boolean>> deleteCategory(@RequestParam Integer categoryId,@RequestParam String userId) {
        try {
            boolean isDeleted = categoryService.deleteCategory(categoryId,userId);
            if (isDeleted) {
                return ResponseEntity.ok(new ApiResponse<>(200, "Xóa danh mục thành công.", null));
            } else {
                return ResponseEntity.ok(new ApiResponse<>(201, "Xóa danh mục thất bại.", null));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(500, "Lỗi hệ thống: " + e.getMessage(), null));
        }
    }
}



