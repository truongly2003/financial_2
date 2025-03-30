package com.example.financial.repository;

import com.example.financial.entity.Budget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BudgetRepository extends JpaRepository<Budget, Integer> {
    List<Budget> getBudgetsByUserUserId(String userId);
    Budget getBudgetById(Integer id);
}
