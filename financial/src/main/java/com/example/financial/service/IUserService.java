package com.example.financial.service;

import com.example.financial.dto.request.Auth.UpdatePasswordRequest;
import com.example.financial.dto.request.Auth.UserRegisterRequest;
import com.example.financial.dto.request.Password.ForgotPasswordRequest;
import com.example.financial.dto.request.Password.ResetPasswordRequest;
import com.example.financial.dto.request.UserRequest;
import com.example.financial.dto.response.Auth.UserRegisterResponse;
import com.example.financial.dto.response.UserResponse;
import org.hibernate.sql.Update;

public interface IUserService {
    UserResponse getUserById(String id);
    UserRegisterResponse addUser(UserRegisterRequest request);
    boolean updateUser(String userId,UserRequest userRequest);
    boolean deleteUser(String id);
    boolean changePassword(String userId,UpdatePasswordRequest request);
    boolean forgotPassword(ForgotPasswordRequest request);
    boolean resetPassword(ResetPasswordRequest request);
}
