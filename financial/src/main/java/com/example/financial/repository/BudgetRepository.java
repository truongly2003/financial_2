package com.example.financial.repository;

import com.example.financial.entity.Budget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface BudgetRepository extends JpaRepository<Budget, Integer> {
    List<Budget> getBudgetsByUserUserId(String userId);

    Budget getBudgetById(Integer id);

    // find byuserId and category Id
    // StartDateLessThanEqual(startDate)	Điều kiện: budget.startDate <= LocalDate.now()
//    EndDateGreaterThanEqual(endDate)	Điều kiện: budget.endDate >= LocalDate.now()
    Optional<Budget> findByUserUserIdAndCategoryIdAndStartDateLessThanEqualAndEndDateGreaterThanEqual(
            String userId, Integer categoryId, LocalDate startDate, LocalDate endDate);


    List<Budget> findByUserUserId(String userId);

    List<Budget> findByUserUserIdAndEndDateBetween(String userId, LocalDate now, LocalDate localDate);
}
