package com.example.financial.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "goals")
public class Goal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "goal_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "goal_name", nullable = false)
    private String goalName;

    @Column(name = "target_amount", nullable = false, precision = 15, scale = 2)
    private BigDecimal targetAmount;

    @ColumnDefault("0.00")
    @Column(name = "current_amount", precision = 15, scale = 2)
    private BigDecimal currentAmount;

    @Column(name = "deadline")
    private LocalDate deadline;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "wallet_id", nullable = false)
    private Wallet wallet;

    @ColumnDefault("'in_progress'")
    @Lob
    @Column(name = "status")
    private String status;

    @ColumnDefault("current_timestamp()")
    @Column(name = "created_at", nullable = true)
    private Instant createdAt;

    @ColumnDefault("current_timestamp()")
    @Column(name = "updated_at", nullable = true)
    private Instant updatedAt;

    @Lob
    @Column(name = "description")
    private String description;

}