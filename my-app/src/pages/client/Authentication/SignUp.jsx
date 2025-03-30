import { Google, Facebook, Twitter, LinkedIn, Email } from '@mui/icons-material';
import Person2Icon from '@mui/icons-material/Person2';
import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import { Link } from 'react-router-dom';

function SignUp() {
    return (
        <div className="flex h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-center text-2xl font-semibold mb-4">Đăng Ký</h2>
                <form className="space-y-4">
                    <div className="flex items-center border rounded-lg overflow-hidden">
                        <span className="p-3 bg-gray-100">
                            <Person2Icon />
                        </span>
                        <input
                            type="text"
                            className="w-full p-3 focus:outline-none"
                            placeholder="Nhập họ tên"
                            name="username"
                            required
                        />
                    </div>
                    <div className="flex items-center border rounded-lg overflow-hidden">
                        <span className="p-3 bg-gray-100">
                            <Email />
                        </span>
                        <input
                            type="email"
                            className="w-full p-3 focus:outline-none"
                            placeholder="Nhập email"
                            name="email"
                            required
                        />
                    </div>
                    <div className="flex items-center border rounded-lg overflow-hidden">
                        <span className="p-3 bg-gray-100">
                            <GppMaybeIcon />
                        </span>
                        <input
                            type="password"
                            className="w-full p-3 focus:outline-none"
                            placeholder="Nhập mật khẩu"
                            name="password"
                            required
                        />
                    </div>
                    <div className="flex items-center border rounded-lg overflow-hidden">
                        <span className="p-3 bg-gray-100">
                            <GppMaybeIcon />
                        </span>
                        <input
                            type="password"
                            className="w-full p-3 focus:outline-none"
                            placeholder="Nhập lại mật khẩu"
                            name="repassword"
                            required
                        />
                    </div>
                    <div className="flex items-center">
                        <input type="checkbox" id="terms" className="mr-2" />
                        <label htmlFor="terms" className="text-sm">Tôi đồng ý với các điều khoản</label>
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                        Đăng ký
                    </button>
                </form>
                <div className="flex items-center my-4">
                    <hr className="flex-grow border-gray-300" />
                    <span className="px-3 text-gray-500">Hoặc đăng nhập với</span>
                    <hr className="flex-grow border-gray-300" />
                </div>
                <div className="flex justify-center space-x-3">
                    <button className="p-2 rounded-full border border-red-500 text-red-500 hover:bg-red-100">
                        <Google />
                    </button>
                    <button className="p-2 rounded-full border border-blue-500 text-blue-500 hover:bg-blue-100">
                        <Facebook />
                    </button>
                    <button className="p-2 rounded-full border border-cyan-500 text-cyan-500 hover:bg-cyan-100">
                        <Twitter />
                    </button>
                    <button className="p-2 rounded-full border border-gray-500 text-gray-500 hover:bg-gray-100">
                        <LinkedIn />
                    </button>
                </div>
                <div className="text-center mt-4">
                    <span className="text-sm">
                        Bạn đã có tài khoản?{' '}
                        <Link to="/login" className="text-blue-600 hover:underline">
                            Đăng nhập ngay
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
