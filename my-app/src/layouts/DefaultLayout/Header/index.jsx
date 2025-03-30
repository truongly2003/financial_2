import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ChevronDown, ChevronUp, Bell } from "lucide-react";

import NotificationDropdown from "@/components/NotificationDropdown";

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isShowNotifications, setIsShowNotifications] = useState(false);
  const toggleNotification = () => {
    setIsShowNotifications(!isShowNotifications);
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const getNavClass = ({ isActive }) =>
    isActive
      ? "font-semibold text-yellow-600"
      : "text-black font-semibold hover:text-yellow-600";

  return (
    <header className="p-3 flex items-center justify-between mx-8">
      {/* Logo + Title */}
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200">
          <span className="text-green-600 font-bold">$</span>
        </div>
        {/* <h1 className="text-gray-800 font-semibold">Danh mục tiền mặt</h1> */}
      </div>

      {/* Navigation */}
      <nav className="flex space-x-6">
        <NavLink to="/" className={getNavClass}>
          Giao dịch
        </NavLink>
        <NavLink to="/budget" end={false} className={getNavClass}>
          Ngân sách
        </NavLink>
        <NavLink to="/goal" end={false} className={getNavClass}>
          Mục tiêu
        </NavLink>
        <NavLink to="/statistical" className={getNavClass}>
          Thống kê
        </NavLink>
      </nav>

      {/* User Avatar */}
      <div>
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
                  <Link to="/logout">
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      Đăng xuất
                    </li>
                  </Link>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
