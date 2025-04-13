"# financial_2" 
# 💰 Ứng dụng Quản Lý Tài Chính Cá Nhân

Ứng dụng giúp người dùng quản lý thu nhập, chi tiêu, ngân sách, ví tiền, mục tiêu tiết kiệm, và thống kê chi tiêu một cách trực quan và hiệu quả.

## 🚀 Tính năng chính

### 1. Đăng ký / Đăng nhập
- Đăng nhập bằng Google, Facebook.
- Đăng ký bằng email & mật khẩu (gửi link xác nhận qua email).
- Quên mật khẩu: gửi link tạo mật khẩu mới qua email.

### 2. Quản lý người dùng
- Đổi mật khẩu.
- Sửa thông tin cá nhân.
- Xóa tài khoản (toàn bộ dữ liệu liên quan sẽ bị xóa).

### 3. Danh mục thu nhập & chi tiêu
- Danh mục mặc định (không thể sửa/xóa).
- Thêm, sửa, xóa, xem danh mục riêng của người dùng.

### 4. Quản lý ví
- Xem tổng số dư tất cả các ví.
- Thêm, sửa, xóa, xem chi tiết ví.
- Đặt ví mặc định làm ví chi tiêu.
- Chuyển tiền giữa các ví (trừ ví mặc định ban đầu không thể xóa).

### 5. Thống kê chi tiêu
- Tổng quan: tổng số dư, thu nhập và chi tiêu từ tất cả các ví.
- So sánh thu nhập và chi tiêu.
- Biểu đồ theo danh mục, thời gian.
- Bộ lọc theo mốc thời gian hoặc khoảng thời gian.

### 6. Giao dịch (thu nhập & chi tiêu)
- Thêm, sửa, xóa, xem chi tiết giao dịch.
- Lọc theo tên, loại giao dịch, danh mục, mốc thời gian, khoảng thời gian.
- Tự động kiểm tra ngân sách trước khi thêm chi tiêu.

### 7. Ngân sách theo danh mục
- Danh sách ngân sách và lọc theo trạng thái (đang hoạt động, hết hạn, vượt mức).
- Thêm, sửa, xóa, xem chi tiết ngân sách (bao gồm tiến trình & các giao dịch liên quan).

### 8. Mục tiêu tiết kiệm
- Danh sách mục tiêu: lọc theo tên, trạng thái (đã hoàn thành/chưa hoàn thành).
- Thêm, sửa, xóa, xem chi tiết mục tiêu (tiến độ & đóng góp).
- Quản lý danh sách các khoản đóng góp.

### 9. Thông báo
- Danh sách thông báo, đánh dấu đã xem từng thông báo hoặc toàn bộ.
- Các loại thông báo bao gồm:
  - Nhắc chi tiêu hàng ngày.
  - Cảnh báo chi tiêu sắp vượt ngân sách.
  - Ngân sách sắp hết hạn.
  - Mục tiêu sắp đến hạn kết thúc.


# Hướng dẫn cài đặt
## 1. Cài đặt Frontend
1. Mở terminal.
2. Clone dự án từ GitHub:
    ```bash
    git clone https://github.com/truongly2003/financial_2.git
    ```
3. Chuyển vào thư mục frontend:
    ```bash
    cd my-app
    ```
4. Cài đặt các thư viện cần thiết:
    ```bash
    npm install
    ```
5. Chạy chương trình:
    ```bash
    npm run dev
    ```
## 2. Cài đặt Backend
1. Mở XAMPP và bật MySQL.
2. Tạo cơ sở dữ liệu MySQL cho backend.
3. Mở terminal trong thư mục `source` của backend.
4. Tải và cài đặt IntelliJ IDEA.
5. Chuyển vào thư mục backend:
    ```bash
    cd financial
    ```
6. Mở IntelliJ IDEA:
    ```bash
    idea .
    ```
7. Tạo các biến môi trường:
   - **Email password**: ``
   - **Email username**: ``
   - **Google client id**: `
   - **Google client secret**: 
   - **Secret**: ``
   - **Facebook client id**: ``
   - **Facebook client secret**: ``
8. Mở terminal trong IntelliJ IDEA và chạy lệnh:
    ```bash
    mvn spring-boot:run
## Giao diện người dùng

## 🛠️ Công nghệ sử dụng

- **Frontend**: ReactJS, Tailwind CSS, Axios
- **Backend**: Spring Boot, Spring Security, Spring Data Jpa, Spring kafka  
- **Database**: MySQL   
- **Authentication**: JWT, OAuth2  
- **Tool**: Postman, IntelliJ IDEA, VS Code
