package com.example.financial.repository;

import com.example.financial.entity.Wallet;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface WalletRepository extends JpaRepository<Wallet, Integer> {
    @Query("SELECT COALESCE(SUM(w.balance), 0) FROM Wallet w WHERE w.user.userId = :userId")
    BigDecimal getTotalBalance(@Param("userId") String userId);

    List<Wallet> findByUserUserId(String userId);
    boolean existsByUserUserId(String userId);

    @Modifying
    @Transactional
    @Query("UPDATE Wallet w SET w.balance = w.balance + :amount WHERE w.id = :walletId")
    void updateBalance(@Param("walletId") Integer walletId, @Param("amount") BigDecimal amount);
}
