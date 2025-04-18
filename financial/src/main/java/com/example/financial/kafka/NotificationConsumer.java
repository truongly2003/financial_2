//package com.example.financial.kafka;
//
//import com.example.financial.dto.NotificationEvent;
//import com.example.financial.entity.Notification;
//import com.example.financial.entity.User;
//import com.example.financial.repository.NotificationRepository;
//import com.example.financial.repository.UserRepository;
//import com.fasterxml.jackson.core.JsonProcessingException;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import lombok.RequiredArgsConstructor;
//import org.springframework.kafka.annotation.KafkaListener;
//import org.springframework.stereotype.Component;
//
//import java.time.LocalDateTime;
//
//@Component
//@RequiredArgsConstructor
//public class NotificationConsumer {
//    // nhân kafka
//    private final NotificationRepository notificationRepository;
//    private final ObjectMapper objectMapper;
//    private final UserRepository userRepository;
//    @KafkaListener(topics = "notifications", groupId = "notification-group")
//    public void listen(String json) throws JsonProcessingException {
//        NotificationEvent event = objectMapper.readValue(json, NotificationEvent.class);
//        User user = userRepository.findById(event.getUserId())
//                .orElseThrow(() -> new RuntimeException("User not found"));
//        Notification n = Notification.builder()
//                .user(user)
//                .title(event.getTitle())
//                .message(event.getMessage())
//                .type(event.getType())
//                .link(event.getLink())
//                .readStatus(false)
//                .createdAt(LocalDateTime.now())
//                .build();
//        notificationRepository.save(n);
//    }
//}
