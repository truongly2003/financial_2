package com.example.financial.mapper;

import com.example.financial.dto.request.UserRequest;
import com.example.financial.dto.response.UserResponse;
import com.example.financial.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserResponse userToUserResponse(User user);
    User toUser(UserRequest userRequest);
}
