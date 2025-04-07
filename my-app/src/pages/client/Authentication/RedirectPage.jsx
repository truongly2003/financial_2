import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
// import LoadingModal from "@/components/LoadingModal";
import useNotification from "@/context/useNotification";
import { loginWithGoogle } from "@/services/AuthService";
import useAuth from "@/context/useAuth";

function RedirectPage() {
  const [searchParams] = useSearchParams();
  const { notify } = useNotification();
  const { login } = useAuth();
  const navigate = useNavigate();
  // const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const code = searchParams.get("code");

    // ✅ Tránh gọi lại nếu đã xử lý code trước đó
    if (!code || sessionStorage.getItem("google_oauth_handled") === "true") {
      return;
    }

    const handleGoogleCallback = async () => {
      try {
        const response = await loginWithGoogle(code);
        if (response) {
          notify("Login thành công", "success");

          login(response.accessToken);
          localStorage.setItem("accessToken", response.accessToken);
          localStorage.setItem("refreshToken", response.refreshToken);
          localStorage.setItem("userId", response.userId);

          // ✅ Ghi nhận là đã xử lý callback để không gọi lại
          sessionStorage.setItem("google_oauth_handled", "true");
          navigate("/");
        }
      } catch (error) {
        console.error("Error during Google login:", error);
        navigate("/login", { state: { error: "Đăng nhập thất bại" } });
      } finally {
        // setIsProcessing(false);
      }
    };

    handleGoogleCallback();
  }, [navigate, notify, searchParams, login]);

  // return <LoadingModal isProcessing={isProcessing} />;
  return <div>Đang xử lý đăng nhập...</div>;
}

export default RedirectPage;
