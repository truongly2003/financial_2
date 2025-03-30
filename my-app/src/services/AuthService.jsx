import axios from 'axios';
export const loginWithOAuth =async (provider,token) => {
  try {
    const response = await axios.get(`/auth/${provider}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    
    // const { accessToken, refreshToken, email } = response.data;
    // localStorage.setItem("accessToken", accessToken);
    // localStorage.setItem("refreshToken", refreshToken);
    // localStorage.setItem("email", email);
    return response.data;
  } catch (error) {
    return { 
      success: false, 
      message: error.response?.data?.errorMessage || `Đăng nhập với ${provider} thất bại.` 
    };
  }
}
// const AuthService = {
 

//   refreshToken: async (refreshToken) => {
//     const response = await axios.post('/auth/refresh', {
//       refreshToken,
//     });
//     return response.data;
//   },

//   getUserInfo: async (token) => {
//     const response = await axios.get('/auth/me', {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     return response.data;
//   },
// };

// export default AuthService;