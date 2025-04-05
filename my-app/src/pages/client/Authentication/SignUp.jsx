import useNotification from "@/context/useNotification";
import { registerUser } from "@/services/UserService";
import {
  Google,
  Facebook,
  Twitter,
  LinkedIn,
  Email,
} from "@mui/icons-material";

import GppMaybeIcon from "@mui/icons-material/GppMaybe";
import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";

function SignUp() {
  const { notify } = useNotification();
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    email: "truong@gmail.com",
    password: "12345",
    confirmPassword: "",
  });
  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      notify("Nhập lại mật khẩu không đúng", "error");
      return;
    }
    try {
      const res = await registerUser(formData.email, formData.password);
      notify(res.message,res.code===200 ? "success" : "error");
      navigate("/login");
    } catch (err) {
      console.error(err);
      
    }
  };
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <div className="flex h-screen items-center justify-center bg-[#f9e4d4]">
      <div className="w-full max-w-md bg-[#ff6f61] p-6 rounded-lg shadow-md">
        <h2 className="text-center text-2xl font-semibold mb-4">Đăng Ký</h2>
        <div className="">
          <div className="mb-3">
            <div className="flex items-center border border-white rounded p-2 bg-[#fff5f0]">
              <Email className="text-[#ff6f61]" />
              <input
                name="email"
                type="email"
                className="ml-2 w-full outline-none bg-transparent text-dark placeholder-slate-900"
                placeholder="Email"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mb-3">
            <div className="flex items-center border border-white rounded p-2 bg-[#fff5f0]">
              <GppMaybeIcon className="text-[#ff6f61]" />
              <input
                name="password"
                type="password"
                className="ml-2 w-full outline-none bg-transparent text-dark placeholder-slate-900"
                placeholder="Nhập mật khẩu"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mb-3">
            <div className="flex items-center border border-white rounded p-2 bg-[#fff5f0]">
              <GppMaybeIcon className="text-[#ff6f61]" />
              <input
                name="confirmPassword"
                type="password"
                className="ml-2 w-full outline-none bg-transparent text-dark placeholder-slate-900"
                placeholder="Nhập lại mật khẩu"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center">
            <input type="checkbox" id="terms" className="mr-2" />
            <label htmlFor="terms" className="text-sm">
              Tôi đồng ý với các điều khoản
            </label>
          </div>
          <button
            className="w-full bg-[#fff5f0] text-black py-2 rounded-lg hover:bg-white mt-2"
            onClick={() => handleSubmit()}
          >
            Đăng ký
          </button>
        </div>
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="px-3 text-gray-800">Hoặc đăng nhập với</span>
          <hr className="flex-grow border-gray-300" />
        </div>
        <div className="flex justify-center space-x-3">
          <button className="p-2 bg-white text-[#ff6f61] rounded hover:bg-[#f9e4d4]">
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
        <div className="text-center mt-4">
          <span className="text-sm">
            Bạn đã có tài khoản?{" "}
            <Link to="/login" className="text-gray-500 hover:underline">
              Đăng nhập ngay
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
