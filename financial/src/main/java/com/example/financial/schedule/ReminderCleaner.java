package com.example.financial.schedule;

import com.example.financial.entity.Notification;
import com.example.financial.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
public class ReminderCleaner {
    private final NotificationRepository notificationRepository;
    @Scheduled(fixedRate = 60 * 60 * 1000) // mỗi giờ
    public void clean() {
        LocalDateTime cutoff = LocalDateTime.now().minusHours(10);
        List<Notification> oldReminders = notificationRepository.findByTypeAndCreatedAtBefore("reminder", cutoff);
        notificationRepository.deleteAll(oldReminders);
    }
}
