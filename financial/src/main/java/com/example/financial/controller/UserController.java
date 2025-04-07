package com.example.financial.controller;

import com.example.financial.dto.request.Auth.UpdatePasswordRequest;
import com.example.financial.dto.request.Auth.UserRegisterRequest;
import com.example.financial.dto.request.BudgetRequest;
import com.example.financial.dto.request.Password.ForgotPasswordRequest;
import com.example.financial.dto.request.Password.ResetPasswordRequest;
import com.example.financial.dto.request.UserRequest;
import com.example.financial.dto.response.ApiResponse;
import com.example.financial.dto.response.Auth.UserRegisterResponse;
import com.example.financial.dto.response.UserResponse;
import com.example.financial.service.IUserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private final IUserService userService;

    public UserController(IUserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<UserResponse>> getUserById(@RequestParam String userId) {
        return ResponseEntity.ok(new ApiResponse<>(200, "Lấy người dùng thành công", userService.getUserById(userId)));
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<UserRegisterResponse>> createUser(@RequestBody UserRegisterRequest userRequest) {
        UserRegisterResponse userResponse = userService.addUser(userRequest);
        if ("Email đã được đăng ký".equals(userResponse.getMessage())) {
            ApiResponse<UserRegisterResponse> response = new ApiResponse<>(201, "Email đã được đăng ký", null);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        }
        ApiResponse<UserRegisterResponse> response = new ApiResponse<>(200, "Đăng ký thành công", null);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping
    ResponseEntity<ApiResponse<Boolean>> updateUser(@RequestParam String userId, @RequestBody UserRequest request) {
        try {
            boolean update = userService.updateUser(userId, request);
            if (update) {
                return ResponseEntity.ok(new ApiResponse<>(200, "Cập nhật thông tin thành công", true));

            } else {
                return ResponseEntity.ok(new ApiResponse<>(201, "Cập nhật thông tin thất bại", false));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(500, e.getMessage(), false));
        }
    }

    @DeleteMapping
    ResponseEntity<ApiResponse<Boolean>> deleteUser(@RequestParam String userId) {
        try {
            boolean update = userService.deleteUser(userId);
            if (update) {
                return ResponseEntity.ok(new ApiResponse<>(200, "Xóa người dùng thành công", true));

            } else {
                return ResponseEntity.ok(new ApiResponse<>(201, "Xóa người dùng thất bại", false));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(500, e.getMessage(), false));
        }
    }

    @PutMapping("/change-password")
    ResponseEntity<ApiResponse<Boolean>> changePassword(@RequestParam String userId, @RequestBody UpdatePasswordRequest request) {
        try {
            boolean update = userService.changePassword(userId, request);
            if (update) {
                return ResponseEntity.ok(new ApiResponse<>(200, "Đổi mật khẩu thành công", true));

            } else {
                return ResponseEntity.ok(new ApiResponse<>(201, "Mật khẩu không chính xác", false));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(500, e.getMessage(), false));
        }
    }


    // Quên mật khẩu
    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponse<Boolean>> forgotPassword(@RequestBody ForgotPasswordRequest request) {
        try {
            boolean check = userService.forgotPassword(request);
            if (check) {
                return ResponseEntity.ok(new ApiResponse<>(200, "Kiểm tra email để xác nhận", true));

            } else {
                return ResponseEntity.ok(new ApiResponse<>(201, "Email không tồn tại", false));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(500, e.getMessage(), false));
        }
    }

    // Đặt lại mật khẩu
    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse<Boolean>> resetPassword(@RequestBody ResetPasswordRequest request) {
        try {
            boolean check = userService.resetPassword(request);
            if (check) {
                return ResponseEntity.ok(new ApiResponse<>(200, "Đặt lại mật khẩu thành công", true));

            } else {
                return ResponseEntity.ok(new ApiResponse<>(201, "Đặt lại mật khẩu Thất bại", false));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(500, e.getMessage(), false));
        }
    }
}
