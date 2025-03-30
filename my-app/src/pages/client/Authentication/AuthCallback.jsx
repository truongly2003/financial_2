import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");

    if (accessToken && refreshToken) {
      // Lưu token vào localStorage
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      // Chuyển hướng tới dashboard
      navigate("/dashboard");
    } else {
      setError("Không thể đăng nhập. Vui lòng thử lại.");
      setTimeout(() => {
        navigate("/");
      }, 3000); // Redirect về login sau 3 giây
    }
  }, [navigate, location]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
        {error ? (
          <>
            <h2 className="text-2xl font-bold text-red-600 mb-4">Lỗi đăng nhập</h2>
            <p className="text-gray-600">{error}</p>
            <p className="text-gray-500 mt-2">Đang chuyển hướng về trang đăng nhập...</p>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Đang xử lý...</h2>
            <p className="text-gray-600">Vui lòng chờ trong giây lát.</p>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthCallback;