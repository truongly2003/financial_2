package com.example.financial.service.impl;

import com.example.financial.dto.response.NotifyResponse;
import com.example.financial.entity.Notification;
import com.example.financial.mapper.NotificationMapper;
import com.example.financial.repository.NotificationRepository;
import com.example.financial.service.INotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService implements INotificationService {
    private final NotificationRepository notificationRepository;
    private final NotificationMapper notificationMapper;
    @Override
    public List<NotifyResponse> getUserNotifications(String userId) {
        List<Notification> notifications=notificationRepository.findByUserUserIdAndReadStatusOrderByCreatedAtDesc(userId,false);
        return notifications.stream().map(notificationMapper::toNotifyResponse).toList();
    }

    @Override
    public Notification save(Notification notification) {
        return notificationRepository.save(notification);
    }

    @Override
    public void markAsRead(String userId) {
        List<Notification> notifications=notificationRepository.findByUserUserIdAndReadStatusOrderByCreatedAtDesc(userId,false);
        if (!notifications.isEmpty()) {
            for (Notification notification : notifications) {
                notification.setReadStatus(true);
            }
            notificationRepository.saveAll(notifications);
        }
    }

    @Override
    public void deleteOldReminders() {
        LocalDateTime limit = LocalDateTime.now().minusHours(10);
        List<Notification> reminders = notificationRepository.findByTypeAndCreatedAtBefore("reminder", limit);
        notificationRepository.deleteAll(reminders);
    }

    @Override
    public void markAsReadDetail(Integer id) {
        notificationRepository.findById(id).ifPresent(notification -> {
            notification.setReadStatus(true);
            notificationRepository.save(notification);
        });
    }
}
