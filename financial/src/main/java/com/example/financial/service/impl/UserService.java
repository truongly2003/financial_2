package com.example.financial.service.impl;

import com.example.financial.dto.request.UserRequest;
import com.example.financial.dto.response.UserResponse;
import com.example.financial.entity.User;
import com.example.financial.mapper.UserMapper;
import com.example.financial.repository.UserRepository;
import com.example.financial.service.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {
    private  final UserRepository userRepository;
    private final UserMapper userMapper;
    @Override
    public UserResponse getUserById(String id) {
        User user = userRepository.findById(id).orElse(null);
        return userMapper.userToUserResponse(user);
    }

    @Override
    public boolean addUser(UserRequest userRequest) {
        return false;
    }

    @Override
    public boolean updateUser(UserRequest userRequest) {
        return false;
    }

    @Override
    public boolean deleteUser(String id) {
        return false;
    }
}
