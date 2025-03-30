package com.example.financial.controller;

import com.example.financial.dto.response.ApiResponse;
import com.example.financial.dto.response.UserResponse;
import com.example.financial.service.IUserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private final IUserService userService;

    public UserController(IUserService userService) {
        this.userService = userService;
    }
    @GetMapping
    public ResponseEntity<ApiResponse<UserResponse>> getUserById(@RequestParam String userId) {
        return ResponseEntity.ok(new ApiResponse<>(200,"Lấy người dùng thành công",userService.getUserById(userId)));
    }
}
