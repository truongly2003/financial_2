package com.example.financial.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.math.BigDecimal;
import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "wallets")
public class Wallet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "wallet_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "user_id", nullable = true)
    private User user;

    @Column(name = "wallet_name", nullable = true)
    private String walletName;

    @Lob
    @Column(name = "wallet_type", nullable = true)
    private String walletType;

    @ColumnDefault("'VND'")
    @Column(name = "currency", length = 10)
    private String currency;

    @ColumnDefault("0.00")
    @Column(name = "balance", precision = 15, scale = 2)
    private BigDecimal balance;

    @ColumnDefault("current_timestamp()")
    @Column(name = "created_at", nullable = true)
    private Instant createdAt;

}