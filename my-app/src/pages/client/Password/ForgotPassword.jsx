import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import LoadingModal from "@/components/LoadingModal";
import useNotification from "@/context/useNotification";
import { forgotPassword } from "@/services/UserService";

function ForgotPassword() {
  const [email, setEmail] = useState("truonglykhong2003@gmail.com");
  const { notify } = useNotification();
  // const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async () => {
   
    if (!email) {
      notify("Vui lòng nhập email", "error");
      return;
    }
    setIsProcessing(true);
    try {
      const response = await forgotPassword({ email });
      notify(response.message, response.code === 200 ? "success" : "error");
    } catch (error) {
      console.log(error);
      notify("Có lỗi xảy ra, vui lòng thử lại.", "error");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#f9e4d4]">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-center text-xl font-semibold mb-4">
          Quên mật khẩu
        </h2>
        <div>
          <div className="mb-3">
            <input
              type="email"
              className="w-full p-2 border rounded"
              placeholder="Nhập email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            onClick={ handleSubmit}
            className="w-full py-2 bg-[#ff6f61] text-white rounded hover:bg-[#ff4a38]"
          >
            Gửi yêu cầu
          </button>
        </div>
      </div>

      <LoadingModal isProcessing={isProcessing} />
    </div>
  );
}

export default ForgotPassword;
