import {
  Google,
  Facebook,
  Twitter,
  LinkedIn,
  Email,
} from "@mui/icons-material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { loginWithEmail } from "@/services/AuthService";
import useAuth from "@/context/useAuth";
import useNotification from "@/context/useNotification";

import { googleConfig } from "@/configs/loginConfig";
import axios from "axios";

function Login() {
  const { clientId } = googleConfig;
  // authUri
  const { login } = useAuth();
  const { notify } = useNotification();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
 
  const navigate = useNavigate();
  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleLogin = async () => {
    try {
      const response = await loginWithEmail(data);
      if (response.status) {
        notify("Đăng nhập thành công! 🎉", "success");
        login(response.accessToken);
        localStorage.setItem("accessToken", response.accessToken);
        localStorage.setItem("refreshToken", response.refreshToken);
        localStorage.setItem("userId", response.userId);
        navigate("/");
      } else {
        notify("email hoặc mật khẩu không đúng 🎉", "error");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // login google
  const handleLoginWithGoogle = async() => {
    // const REDIRECT_URI = "http://localhost:5173/oauth2/redirect";
    // const SCOPE = "email profile";
    // const googleAuthUrl =
    //   `https://accounts.google.com/o/oauth2/v2/auth?` +
    //   `client_id=${clientId}` +
    //   `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
    //   `&response_type=code` +
    //   `&scope=${encodeURIComponent(SCOPE)}` +
    //   `&access_type=offline` +
    //   `&prompt=select_account`;
    // console.log("Generated Google Auth URL:", googleAuthUrl);
    try {
      // Gọi backend của bạn để lấy URL Google OAuth2
      const response = await axios.get("http://localhost:8080/api/google/getlogin");
      console.log(response)

      // Chuyển hướng người dùng đến URL OAuth2 của Google
      window.location.href = response.data.authUrl;
  } catch (error) {
      console.error("Lỗi khi gọi backend để đăng nhập với Google", error);
  }
    // window.location.href = googleAuthUrl;
  };
  // login facebook
  return (
    <div className="flex h-screen items-center justify-center bg-[#f9e4d4]">
      <div className="w-full max-w-md bg-[#ff6f61] p-6 rounded-lg shadow-md">
        <h2 className="text-center text-xl font-semibold mb-4 text-black">
          Đăng nhập
        </h2>
        <div>
          <div className="mb-3">
            <div className="flex items-center border border-white rounded p-2 bg-[#fff5f0]">
              <Email className="text-[#ff6f61]" />
              <input
                type="email"
                className="ml-2 w-full outline-none bg-transparent text-dark placeholder-slate-500"
                placeholder="Email"
                name="email"
                value={data.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-3">
            <div className="flex items-center border border-white rounded p-2 bg-[#fff5f0]">
              <input
                type="text"
                className="ml-2 w-full outline-none bg-transparent text-dark placeholder-slate-500"
                placeholder="Mật khẩu"
                name="password"
                value={data.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex justify-between text-sm text-black">
            <label>
              <input type="checkbox" className="mr-2 accent-white" /> Nhớ mật
              khẩu
            </label>
            <Link to="/forgot-password" className="text-blac hover:underline">
              Quên mật khẩu?
            </Link>
          </div>

          <button
            className="mt-4 w-full bg-[#fff5f0] text-black py-2 rounded font-semibold hover:bg-white"
            onClick={handleLogin}
          >
            Đăng nhập
          </button>

          <div className="mt-4 text-center text-sm text-black">
            <p>Hoặc đăng nhập với</p>
            <div className="flex justify-center gap-3 mt-2">
              <button
                className="p-2 bg-white text-[#ff6f61] rounded hover:bg-[#f9e4d4]"
                onClick={handleLoginWithGoogle}
              >
                <Google />
              </button>
              <button className="p-2 bg-white text-[#ff6f61] rounded hover:bg-[#f9e4d4]">
                <Facebook />
              </button>
              <button className="p-2 bg-white text-[#ff6f61] rounded hover:bg-[#f9e4d4]">
                <Twitter />
              </button>
              <button className="p-2 bg-white text-[#ff6f61] rounded hover:bg-[#f9e4d4]">
                <LinkedIn />
              </button>
            </div>
          </div>

          <div className="mt-4 text-center text-sm text-black">
            Bạn chưa có tài khoản?{" "}
            <Link to="/signup" className="text-blac hover:underline">
              Đăng ký ngay
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
