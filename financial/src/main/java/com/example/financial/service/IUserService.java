package com.example.financial.service;

import com.example.financial.dto.request.UserRequest;
import com.example.financial.dto.response.UserResponse;

public interface IUserService {
    UserResponse getUserById(String id);
    boolean addUser(UserRequest userRequest);
    boolean updateUser(UserRequest userRequest);
    boolean deleteUser(String id);
}
