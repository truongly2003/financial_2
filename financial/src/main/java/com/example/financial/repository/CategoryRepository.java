package com.example.financial.repository;

import com.example.financial.entity.Category;
import com.example.financial.entity.Transaction;
import com.example.financial.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {
    List<Category> getCategoryByUserUserId(String userId);

    @Query("SELECT c FROM Category c WHERE c.user.userId = :idDefault OR c.user.userId = :userId")
    List<Category> getAllCategory(@Param("userId") String userId,@Param("idDefault") String idDefault);

    Category getCategoryById(Integer id);

    @Query("SELECT c FROM Category c WHERE c.id = :id AND (c.user.userId = :userId OR c.user IS NULL)")
    Optional<Category> findByIdAndUserIdOrDefault(@Param("id") Integer id, @Param("userId") String userId);

    Optional<Category> findByIdAndUserUserId(Integer id, String userId);

}
