import {
  Google,
  Facebook,
  Twitter,
  LinkedIn,
  Email,
} from "@mui/icons-material";

import GppMaybeIcon from "@mui/icons-material/GppMaybe";
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <div className="flex h-screen items-center justify-center bg-[#f9e4d4]">
      <div className="w-full max-w-md bg-[#ff6f61] p-6 rounded-lg shadow-md">
        <h2 className="text-center text-2xl font-semibold mb-4">Đăng Ký</h2>
        <form className="">
          <div className="mb-3">
            <div className="flex items-center border border-white rounded p-2 bg-[#fff5f0]">
              <Email className="text-[#ff6f61]" />
              <input
                type="email"
                className="ml-2 w-full outline-none bg-transparent text-dark placeholder-slate-900"
                placeholder="Email"
                required
              />
            </div>
          </div>
          <div className="mb-3">
            <div className="flex items-center border border-white rounded p-2 bg-[#fff5f0]">
              <GppMaybeIcon className="text-[#ff6f61]" />
              <input
                type="password"
                className="ml-2 w-full outline-none bg-transparent text-dark placeholder-slate-900"
                placeholder="Nhập mật khẩu"
                required
              />
            </div>
          </div>
          <div className="mb-3">
            <div className="flex items-center border border-white rounded p-2 bg-[#fff5f0]">
              <GppMaybeIcon className="text-[#ff6f61]" />
              <input
                type="password"
                className="ml-2 w-full outline-none bg-transparent text-dark placeholder-slate-900"
                placeholder="Nhập lại mật khẩu"
                required
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
            type="submit"
            className="w-full bg-[#fff5f0] text-black py-2 rounded-lg hover:bg-white mt-2"
          >
            Đăng ký
          </button>
        </form>
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
