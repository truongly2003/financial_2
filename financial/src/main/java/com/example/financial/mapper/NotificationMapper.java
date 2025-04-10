package com.example.financial.mapper;

import com.example.financial.dto.response.NotifyResponse;
import com.example.financial.entity.Notification;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface NotificationMapper {
    @Mapping(source = "user.userId", target = "userId")
    @Mapping(source = "link", target = "link")
    @Mapping(source = "title", target = "title")
    @Mapping(source = "id", target = "id")
    @Mapping(source = "createdAt", target = "createdAt")
    NotifyResponse toNotifyResponse(Notification notification);
}
