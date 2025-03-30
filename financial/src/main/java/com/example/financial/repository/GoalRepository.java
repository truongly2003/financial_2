package com.example.financial.repository;

import com.example.financial.entity.Goal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GoalRepository extends JpaRepository<Goal, Integer> {
    List<Goal> getGoalByUserUserId(String userId);
    Goal getGoalById(Integer id);
}
