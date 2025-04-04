package com.example.financial.repository;

import com.example.financial.entity.Category;
import com.example.financial.entity.Transaction;
import com.example.financial.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {
    List<Category> getCategoryByUserUserId(String userId);

    @Query("SELECT c FROM Category c WHERE c.user IS NULL OR c.user.userId = :userId")
    List<Category> getAllCategory(@Param("userId") String userId);

    Category getCategoryById(Integer id);
}
