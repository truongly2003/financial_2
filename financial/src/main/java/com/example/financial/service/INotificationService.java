package com.example.financial.service;

import com.example.financial.dto.response.NotifyResponse;
import com.example.financial.entity.Notification;

import java.util.List;

public interface INotificationService {
    List<NotifyResponse> getUserNotifications(String userId);
    Notification save(Notification notification);
    void markAsRead(String userId);
    void deleteOldReminders();

    void markAsReadDetail(Integer id);
}
