package com.example.financial.controller;

import com.example.financial.service.INotificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/notify")
public class NotificationController {
    private final INotificationService notificationService;

    public NotificationController(INotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping()
    public ResponseEntity<?> getByUser(@RequestParam String userId) {
        return ResponseEntity.ok(notificationService.getUserNotifications(userId));
    }

    @PostMapping("/mark-as-read")
    public ResponseEntity<?> markAsRead(@RequestParam String userId) {
        notificationService.markAsRead(userId);
        return ResponseEntity.ok("Marked as read");
    }
    @PostMapping("/mark-as-read/detail")
    public ResponseEntity<?> markAsReadDetail(@RequestParam Integer id) {
        notificationService.markAsReadDetail(id);
        return ResponseEntity.ok("Marked as read");
    }
}
