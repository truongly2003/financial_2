package com.example.financial.mapper;

import com.example.financial.dto.request.CategoryRequest;
import com.example.financial.dto.response.CategoryResponse;
import com.example.financial.entity.Category;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    @Mapping(source = "user.userId", target = "userId")
    CategoryResponse toCategoryResponse(Category category);
    @Mapping(target = "user", ignore = true)
    Category toCategory(CategoryRequest request);
}
