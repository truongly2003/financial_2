package com.example.financial.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "users")
public class User {
    @Id
    @ColumnDefault("uuid()")
    @Column(name = "user_id", nullable = true, length = 36)
    private String userId;

    @Column(name = "user_name", nullable = true)
    private String userName;

    @Column(name = "email", nullable = true)
    private String email;

    @Column(name = "phone_number", length = 20)
    private String phoneNumber;

    @Column(name = "password", nullable = true)
    private String password;

    @ColumnDefault("'individual'")
    @Lob
    @Column(name = "account_type")
    private String accountType;

    @ColumnDefault("current_timestamp()")
    @Column(name = "created_at", nullable = true)
    private Instant createdAt;

    @ColumnDefault("current_timestamp()")
    @Column(name = "updated_at", nullable = true)
    private Instant updatedAt;
    @PrePersist
    public void generateUUID() {
        if (this.userId == null) {
            this.userId = UUID.randomUUID().toString();
        }
        if (this.createdAt == null) {
            this.createdAt = OffsetDateTime.now(ZoneOffset.UTC).toInstant();
        }
    }

}