import {
  Google,
  Facebook,
  Twitter,
  LinkedIn,
  Email,
} from "@mui/icons-material";

import { Link } from "react-router-dom";
// import GppMaybeIcon from "@mui/icons-material/GppMaybe";
function Login() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-center text-xl font-semibold mb-4">Đăng nhập</h2>
        <form>
          <div className="mb-3">
            <div className="flex items-center border border-gray-300 rounded p-2">
              <Email className="text-gray-500" />
              {/* <GoogleIcon/> */}
              {/* <FacebookIcon/> */}
              <input
                type="email"
                className="ml-2 w-full outline-none"
                placeholder="Email"
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <div className="flex items-center border border-gray-300 rounded p-2">
              {/* <GppMaybeIcon className="text-gray-500" /> */}
              <input
                type="password"
                className="ml-2 w-full outline-none"
                placeholder="Mật khẩu"
                required
              />
            </div>
          </div>

          <div className="flex justify-between text-sm">
            <label>
              <input type="checkbox" className="mr-2" /> Nhớ mật khẩu
            </label>
            <Link to="/forgot-password" className="text-blue-500">
              Quên mật khẩu?
            </Link>
          </div>

          <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded">
            Đăng nhập
          </button>

          <div className="mt-4 text-center text-sm">
            <p>Hoặc đăng nhập với</p>
            <div className="flex justify-center gap-3 mt-2">
              <button className="p-2 bg-red-500 text-white rounded">
                <Google />
              </button>
              <button className="p-2 bg-blue-500 text-white rounded">
                <Facebook />
              </button>
              <button className="p-2 bg-blue-400 text-white rounded">
                <Twitter />
              </button>
              <button className="p-2 bg-gray-600 text-white rounded">
                <LinkedIn />
              </button>
            </div>
          </div>

          <div className="mt-4 text-center text-sm">
            Bạn chưa có tài khoản?{" "}
            <Link to="/signup" className="text-blue-500">
              Đăng ký ngay
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
