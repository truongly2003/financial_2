package com.example.financial.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "refresh_tokens")
public class RefreshToken {
    @Id
    @Column(name = "token", nullable = false)
    private String token;

    @Column(name = "user_id", length = 36)
    private String userId;
    @Column(name = "expiry_date")
    private Instant expiryDate;


}