package com.example.financial.mapper;

import com.example.financial.dto.request.BudgetRequest;
import com.example.financial.dto.response.BudgetResponse;
import com.example.financial.entity.Budget;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface BudgetMapper {
    @Mapping(source = "user.userId", target = "userId")
    @Mapping(source = "category.id", target = "categoryId")

    BudgetResponse toBudgetResponse(Budget budget);

    Budget toBudget(BudgetRequest budgetRequest);
}
