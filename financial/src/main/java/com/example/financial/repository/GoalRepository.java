package com.example.financial.repository;

import com.example.financial.entity.Goal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface GoalRepository extends JpaRepository<Goal, Integer> {
    List<Goal> getGoalByUserUserId(String userId);
    Goal getGoalById(Integer id);

    // kiểm tra goal sắp hết hạn ngày hiện tại / ngày hiện tại + 3 ngày
    // goal trong khoảng đó
    List<Goal> findByUserUserIdAndDeadlineBetween(String userId, LocalDate from, LocalDate to);

}
