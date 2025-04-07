import { useState } from "react";
import { useSearchParams,useNavigate } from "react-router-dom";
import useNotification from "@/context/useNotification";
import { resetPassword } from "@/services/UserService";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  console.log(token);
  const navigate = useNavigate();
  const { notify } = useNotification();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      notify("Mật khẩu không khớp", "error");
      return;
    }
    try {
      const response = await resetPassword({ token, password });
      notify(response.message, response.code === 200 ? "success" : "error");
      navigate("/login");
    } catch (error) {
      console.log(error);
      notify("Có lỗi xảy ra, vui lòng thử lại.", "error");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#f9e4d4]">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-center text-xl font-semibold mb-4">
          Đặt lại mật khẩu
        </h2>
        <div>
          <div className="mb-3">
            <input
              type="password"
              className="w-full p-2 border rounded"
              placeholder="Nhập mật khẩu mới"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="w-full p-2 border rounded"
              placeholder="Xác nhận mật khẩu"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            onClick={handleSubmit}
            className="w-full py-2 bg-[#ff6f61] text-white rounded hover:bg-[#ff4a38]"
          >
            Đặt lại mật khẩu
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
