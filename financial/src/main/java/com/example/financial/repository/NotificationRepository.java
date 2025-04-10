package com.example.financial.repository;

import com.example.financial.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;
@Repository
public interface NotificationRepository extends JpaRepository<Notification, Integer> {
    List<Notification> findByUserUserIdAndReadStatusOrderByCreatedAtDesc(String userId,Boolean readStatus);
    List<Notification> findByTypeAndCreatedAtBefore(String type, LocalDateTime createdAt);
}
