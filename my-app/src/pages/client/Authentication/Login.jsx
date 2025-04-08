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

// import { googleConfig } from "@/configs/loginConfig";
import axios from "axios";

function Login() {
  // const { clientId } = googleConfig;
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
  const handleLoginWithGoogle = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/oauth/google"
      );
      
      window.location.href = response.data.authUrl;
    } catch (error) {
      console.error("Lỗi khi gọi backend để đăng nhập với Google", error);
    }
  };
  // // login facebook
  const handleLoginWithFacebook = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/oauth/facebook"
      );

      const { authUrl } = response.data;
      window.location.href = authUrl;
    } catch (error) {
      console.error("Lỗi khi gọi backend để đăng nhập với Facebook", error);
    }
  };

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
              <button
                className="p-2 bg-white text-[#ff6f61] rounded hover:bg-[#f9e4d4]"
                onClick={handleLoginWithFacebook}
              >
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
