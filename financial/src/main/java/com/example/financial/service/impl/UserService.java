package com.example.financial.service.impl;

import com.example.financial.dto.request.Auth.UpdatePasswordRequest;
import com.example.financial.dto.request.Auth.UserRegisterRequest;
import com.example.financial.dto.request.UserRequest;
import com.example.financial.dto.response.Auth.UserRegisterResponse;
import com.example.financial.dto.response.UserResponse;
import com.example.financial.entity.Goal;
import com.example.financial.entity.User;
import com.example.financial.entity.Wallet;
import com.example.financial.mapper.UserMapper;
import com.example.financial.repository.UserRepository;
import com.example.financial.service.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {
    private  final UserRepository userRepository;
    private final UserMapper userMapper;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    @Override
    public UserResponse getUserById(String id) {
        User user = userRepository.findById(id).orElse(null);
        return userMapper.userToUserResponse(user);
    }

    @Override
    public UserRegisterResponse addUser(UserRegisterRequest request) {
        if(userRepository.existsByEmail(request.getEmail())) {
            return new UserRegisterResponse("","Email đã được đăng ký");
        }
        String encodePassword = passwordEncoder.encode(request.getPassword());
        User user=new User();
        user.setEmail(request.getEmail());
        user.setPassword(encodePassword);
        userRepository.save(user);
        return  new UserRegisterResponse(user.getEmail(), "Đăng ký thành công");
    }

    @Override
    public boolean updateUser(String userId,UserRequest userRequest) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            User user1 = user.get();
            user1.setUserName(userRequest.getUserName());
            user1.setPhoneNumber(userRequest.getPhoneNumber());
            userRepository.save(user1);
            return true;
        }
        return false;
    }

    @Override
    public boolean deleteUser(String id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public boolean changePassword(String userId,UpdatePasswordRequest request) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isEmpty()) {
            return false;
        }
        User user = optionalUser.get();
        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            return false;
        }
        String encodedNewPassword = passwordEncoder.encode(request.getNewPassword());
        user.setPassword(encodedNewPassword);
        userRepository.save(user);
        return true;
    }
}
