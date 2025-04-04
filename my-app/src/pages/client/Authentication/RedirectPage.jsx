// import { useEffect } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import axios from "axios";

// function RedirectPage() {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
  
//   useEffect(() => {
//     const handleGoogleCallback = async () => {
//       const code = searchParams.get("code");
//       console.log(code)
//       if (code) {
//         try {
//           // Gửi code đến backend để lấy token
//           const response = await axios.post(
//             "http://localhost:8080/api/auth/callback",
//             { code },
//             { headers: { "Content-Type": "application/json" } }
//           );
//           console.log(response.data)
//           // Lưu token vào localStorage hoặc context/redux
//           console.log(response)
//           // const { token, user } = response.data;
//           // localStorage.setItem("token", token);
//           // localStorage.setItem("user", JSON.stringify(user));

//           // Chuyển hướng đến trang chính
//           navigate("/dashboard");
//         } catch (error) {
//           console.error("Error during Google login:", error);
//           navigate("/loginPage", { state: { error: "Đăng nhập thất bại" } });
//         }
//       }
//     };
//     handleGoogleCallback();
//   }, [searchParams, navigate]);

//   return <div>Đang xử lý đăng nhập...</div>;
// }

// export default RedirectPage;
// // {
// //   "accessToken": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0cnVvbmdseWtob25nMjAwM0BnbWFpbC5jb20iLCJyb2xlIjoidHJ1b25nbHlraG9uZzIwMDNAZ21haWwuY29tIiwiaWF0IjoxNzQzMTQ0MTEzLCJleHAiOjE3NDMxNDc3MTN9.Zn5_bCQmt2Mnpw5erpAHPnCym-xVpRN4or3QYBQClCI",
// //   "refreshToken": "cc2c8891-4e6a-44a6-9cbd-b8dc192ea907"
// // }

