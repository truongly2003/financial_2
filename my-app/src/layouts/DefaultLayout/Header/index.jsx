import { ChevronDown, ChevronUp, Bell } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "@/context/useAuth";
import NotificationDropdown from "@/components/NotificationDropdown";
// import avatar from "@assets/avatar.jpg";
const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isShowNotifications, setIsShowNotifications] = useState(false);
  const toggleNotification = () => {
    setIsShowNotifications(!isShowNotifications);
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const { isAuthenticated, logout } = useAuth();
  return (
    <header className="flex justify-between items-center p-6  bg-[#ff6f61]">
      <div className=" font-bold">
        <Link to="/" className="text-3xl">
          $
          <span className="text-3xl">martmoney</span>
        </Link>
      </div>
      <nav className="flex items-center gap-8">
        <Link
          to="/"
          className="text-base text-[#333] hover:text-[#f7d794] transition-colors"
        >
          Trang chủ
        </Link>
        <Link
          to="/overview"
          className="text-base text-[#333] hover:text-[#f7d794] transition-colors"
        >
          Giao dịch
        </Link>
        <Link
          to=""
          className="text-base text-[#333] hover:text-[#f7d794] transition-colors"
        >
          Giới thiệu
        </Link>
        <Link
          to=""
          className="text-base text-[#333] hover:text-[#f7d794] transition-colors"
        >
          Kết nối
        </Link>
        {isAuthenticated() ? (
          <div>
            <div className="flex items-center space-x-4 cursor-pointer">
              {/* notify */}
              <div>
                <button
                  className="relative p-2 rounded-md text-[#333]"
                  onClick={toggleNotification}
                >
                  <Bell size={22} />
                  <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs text-black bg-red-50 rounded-full">
                    {/* {notificationsCount} */}5
                  </span>
                </button>
                {isShowNotifications && <NotificationDropdown />}
              </div>
              {/* user */}
              <div className="relative">
                <div className="flex space-x-2" onClick={toggleDropdown}>
                  <img
                    // src={avatar}
                    alt="Avatar"
                    className="w-8 h-8 rounded-full border"
                  />
                  <span className="text-gray-800 font-medium">Xin chao</span>
                  <span className="text-gray-500 text-sm">
                    {isDropdownOpen ? <ChevronUp /> : <ChevronDown />}
                  </span>
                </div>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                    <ul className="py-2">
                      <Link to="/profile">
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                          Cài đặt
                        </li>
                      </Link>

                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={logout}
                      >
                        Đăng xuất
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <Link
            to="/login"
            className="bg-[#f9e4d4] tex-[#333] px-5 py-2 rounded-full text-base hover:bg-[#f7d794] transition-colors"
          >
            Đăng Nhập
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
{
  /* <div>
<div className="flex items-center space-x-4 cursor-pointer">
  <div>
    <button
      className="relative p-2 rounded-md "
      onClick={toggleNotification}
    >
      <Bell size={22} />
      <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
    </button>
    {isShowNotifications && <NotificationDropdown />}
  </div>
  <div className="relative">
    <div className="flex space-x-2" onClick={toggleDropdown}>
      <img
        src="https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-1/479523821_1314393613115364_3584558195597252732_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=101&ccb=1-7&_nc_sid=e99d92&_nc_ohc=iSVhC4O65JQQ7kNvgFG_z6m&_nc_oc=Adgz8eg1_0Bo5o3IJY2XlhLLk3XGdAInKz2z5ECTqKvjyOzs9naBLs0RaK8Qya2LBEqTAnnPm9Jpcz2udPX4WFLs&_nc_zt=24&_nc_ht=scontent.fsgn2-4.fna&_nc_gid=A86Zh6m1o7BOt-SxBROM8gJ&oh=00_AYEjSgcRmSSsNuieagZ-bzVq_lHFyMpITVBIZFNM8kY1gw&oe=67DA3561"
        alt="Avatar"
        className="w-8 h-8 rounded-full"
      />
      <span className="text-gray-800 font-medium">đùa thôi</span>
      <span className="text-gray-500 text-sm">
        {isDropdownOpen ? <ChevronUp /> : <ChevronDown />}
      </span>
    </div>
    {isDropdownOpen && (
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
        <ul className="py-2">
          <Link to="/profile">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Cài đặt
            </li>
          </Link>

            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={logout}>
              Đăng xuất
            </li>

        </ul>
      </div>
    )}
  </div>
</div>
</div> */
}
