// import { googleConfig } from "@configs/loginConfig";
// const handleGoogleLogin = () => {
//   const { clientId, authUri } = googleConfig;

//   const targetUrl = `${authUri}?redirect_uri=http://localhost:5173/oauth2/redirect&response_type=code&client_id=${clientId}&scope=openid%20email%20profile`;
//   window.location.href = targetUrl;
// };
// function LoginPage() {
//   const GOOGLE_CLIENT_ID =
//     "353415826195-uce060j45p429f20puffnlnloh0jr909.apps.googleusercontent.com";
//   const REDIRECT_URI = "http://localhost:5173/oauth2/redirect";
//   const SCOPE = "email profile";

//   const handleGoogleLogin = () => {
//     const googleAuthUrl =
//       `https://accounts.google.com/o/oauth2/v2/auth?` +
//       `client_id=${GOOGLE_CLIENT_ID}` +
//       `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
//       `&response_type=code` +
//       `&scope=${encodeURIComponent(SCOPE)}` +
//       `&access_type=offline` +
//       `&prompt=select_account`; // Thêm tham số này
//     console.log("Generated Google Auth URL:", googleAuthUrl);
//     window.location.href = googleAuthUrl;
//   };
//   // 4/0AQSTgQFLQQDfSXk0MBhNMKVdYwWRVRPEOFeTrmUQienueQIIvQTMSecMcXJMs_z1yAlNdQ
//   const handleLogin=()=>{
    
//   }
//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       <h1>Đăng nhập bằng Google</h1>
//       <button onClick={handleGoogleLogin}>Đăng nhập với Google</button>
//       <div>
//         <div className="mb-3">
//           <div className="flex items-center border border-gray-300 rounded p-2">
//             <input
//               type="email"
//               className="ml-2 w-full outline-none"
//               placeholder="Email"
//               name="email"
//             />
//           </div>
//         </div>

//         <div className="mb-3">
//           <div className="flex items-center border border-gray-300 rounded p-2">
//             <input
//               type="password"
//               className="ml-2 w-full outline-none"
//               placeholder="Mật khẩu"
//               name="password"
//             />
//           </div>
//         </div>
//         <button onClick={handleLogin}>Login</button>
//       </div>
//     </div>
//   );
// }
import { useState } from 'react';
import axios from 'axios';

function LoginPage() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle login submission with Axios
  const handleLogin = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('YOUR_API_ENDPOINT/login', credentials, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Login successful:', response.data);
      // Handle successful login (e.g., store token, redirect, etc.)

    } catch (error) {
      console.error('Error during login:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className="mb-3">
          <div className="flex items-center border border-gray-300 rounded p-2">
            <input
              type="email"
              className="ml-2 w-full outline-none"
              placeholder="Email"
              name="email"
              value={credentials.email}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="mb-3">
          <div className="flex items-center border border-gray-300 rounded p-2">
            <input
              type="password"
              className="ml-2 w-full outline-none"
              placeholder="Mật khẩu"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <button onClick={handleLogin} disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
