package com.example.financial.repository;

import com.example.financial.entity.RefreshToken;
import com.example.financial.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, String> {
    Optional<RefreshToken> findByToken(String token);
}
