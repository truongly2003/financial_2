package com.example.financial.controller;

import com.example.financial.dto.request.CategoryRequest;
import com.example.financial.dto.response.ApiResponse;
import com.example.financial.dto.response.CategoryResponse;
import com.example.financial.service.ICategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<ApiResponse<List<CategoryResponse>>> getCategories(@RequestParam String userId) {
        List<CategoryResponse> categories = categoryService.getAllCategoriesByUserId(userId);
        return ResponseEntity.ok(new ApiResponse<>(200, "Lấy danh sách danh mục thành công.", categories));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Boolean>> createCategory(@RequestBody CategoryRequest category) {
        try {
            boolean created = categoryService.addCategory(category);
            if (created) {
                return ResponseEntity.status(HttpStatus.CREATED)
                        .body(new ApiResponse<>(201, "Thêm danh mục thành công.", true));
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(new ApiResponse<>(400, "Thêm danh mục thất bại.", false));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(500, "Lỗi hệ thống: " + e.getMessage(), false));
        }
    }

    @DeleteMapping
    public ResponseEntity<ApiResponse<Boolean>> deleteCategory(@RequestParam Integer categoryId) {
        try {
            boolean isDeleted = categoryService.deleteCategory(categoryId);
            if (isDeleted) {
                return ResponseEntity.ok(new ApiResponse<>(200, "Xóa danh mục thành công.", null));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ApiResponse<>(404, "Không tìm thấy danh mục.", null));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(500, "Lỗi hệ thống: " + e.getMessage(), null));
        }
    }
}



