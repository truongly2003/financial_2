package com.example.financial.service.impl;

import com.example.financial.dto.request.Auth.UpdatePasswordRequest;
import com.example.financial.dto.request.Auth.UserRegisterRequest;
import com.example.financial.dto.request.Password.ForgotPasswordRequest;
import com.example.financial.dto.request.Password.ResetPasswordRequest;
import com.example.financial.dto.request.UserRequest;
import com.example.financial.dto.response.Auth.UserRegisterResponse;
import com.example.financial.dto.response.UserResponse;
import com.example.financial.email.EmailService;
import com.example.financial.entity.EmailVerificationToken;
import com.example.financial.entity.User;
import com.example.financial.mapper.UserMapper;
import com.example.financial.repository.EmailVerificationTokenRepository;
import com.example.financial.repository.UserRepository;
import com.example.financial.service.IUserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService implements IUserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final EmailVerificationTokenRepository emailVerificationTokenRepository;
    private final EmailService emailService;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Override
    public UserResponse getUserById(String id) {
        User user = userRepository.findById(id).orElse(null);
        return userMapper.userToUserResponse(user);
    }

    // đăng ký
    @Override
    public UserRegisterResponse addUser(UserRegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            return new UserRegisterResponse("", "Email đã được đăng ký");
        }
        String encodePassword = passwordEncoder.encode(request.getPassword());
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(encodePassword);
        userRepository.save(user);

        String token = UUID.randomUUID().toString();
        EmailVerificationToken verificationToken = new EmailVerificationToken();
        verificationToken.setUser(user);
        verificationToken.setToken(token);
        verificationToken.setExpiryDate(LocalDateTime.now().plusHours(1));
        emailVerificationTokenRepository.save(verificationToken);
        emailService.sendVerificationEmail(user, token);
        return new UserRegisterResponse(user.getEmail(), "Đăng ký thành công");
    }

    // token của email
    @Transactional
    public void verifyToken(String token) {
        EmailVerificationToken verificationToken = emailVerificationTokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Token không hợp lệ hoặc đã bị xóa."));
        if (verificationToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            emailVerificationTokenRepository.delete(verificationToken);
            userRepository.delete(verificationToken.getUser());
            throw new RuntimeException("Token đã hết hạn, tài khoản đã bị xóa. Vui lòng đăng ký lại.");
        }
        User user = verificationToken.getUser();
        if (user.isActive()) {
            emailVerificationTokenRepository.delete(verificationToken);
            return;
        }
        user.setActive(true);
        userRepository.save(user);
        emailVerificationTokenRepository.delete(verificationToken);
    }


    @Override
    public boolean updateUser(String userId, UserRequest userRequest) {
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
    public boolean changePassword(String userId, UpdatePasswordRequest request) {
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


    // password
    @Override
    public boolean forgotPassword(ForgotPasswordRequest request) {
        Optional<User> userOptional=userRepository.findByEmail(request.getEmail());
        if(userOptional.isEmpty()){
            return false;
        }
        String token = UUID.randomUUID().toString();
        User user= userOptional.get();
        user.setResetPasswordToken(token);
        userRepository.save(user);
        emailService.sendPasswordResetEmail(user, token);
      return true;
    }

    @Override
    public boolean resetPassword(ResetPasswordRequest request) {
        Optional<User> userOptional = userRepository.findByResetPasswordToken(request.getToken());
        if (userOptional.isEmpty()) {
            return false;
        }
        User user = userOptional.get();
        String encodePassword = passwordEncoder.encode(request.getPassword());
        user.setPassword(encodePassword);
        user.setResetPasswordToken(null);
        userRepository.save(user);
        return true;
    }
}
