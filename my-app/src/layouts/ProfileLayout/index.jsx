import PropTypes from "prop-types";
import {
  BarChart2,
  DollarSign,
  AlignJustify,
  ChevronLeft,
  Wallet
} from "lucide-react";
import { NavLink } from "react-router-dom";
import Header from "../DefaultLayout/Header";
function ProfileLayout({ children }) {
  return (
    <div className="bg-[#f9e4d4] min-h-screen">
      <div className="sticky top-0 z-20 bg-white">
        <Header icon={AlignJustify} />
      </div>
      <div className="flex w-full p-2 gap-4 max-w-7xl mx-auto">
        <div className="w-[20%] flex flex-col gap-4">
          <nav className="flex flex-col gap-2 p-4 bg-white border-2 shadow-sm rounded-lg">
            <NavLink to="/overview" className="text-gray-800 flex content-center">
              <ChevronLeft /> Quay lại
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `flex items-center text-gray-700 font-medium px-4 py-2 rounded-md transition-colors duration-200 ${
                  isActive
                    ? "text-[#d55d2b] bg-[#f9e4d4] shadow-inner"
                    : "hover:text-[#d55d2b] hover:bg-gray-100"
                }`
              }
              end
            >
              <BarChart2 className="w-5 h-5 mr-2" />
              Tài khoản
            </NavLink>
            <NavLink
              to="/catalog"
              className={({ isActive }) =>
                `flex items-center text-gray-700 font-medium px-4 py-2 rounded-md transition-colors duration-200 ${
                  isActive
                    ? "text-[#d55d2b] bg-[#f9e4d4] shadow-inner"
                    : "hover:text-[#d55d2b] hover:bg-gray-100"
                }`
              }
            >
              <DollarSign className="w-5 h-5 mr-2" />
              Danh mục
            </NavLink>
            <NavLink
              to="/wallet"
              className={({ isActive }) =>
                `flex items-center text-gray-700 font-medium px-4 py-2 rounded-md transition-colors duration-200 ${
                  isActive
                    ? "text-[#d55d2b] bg-[#f9e4d4] shadow-inner"
                    : "hover:text-[#d55d2b] hover:bg-gray-100"
                }`
              }
            >
              <Wallet className="w-5 h-5 mr-2" />
              Ví
            </NavLink>
          </nav>
        </div>
        {/* Main Content */}
        <div className="w-[80%] rounded-lg">
          <div className="bg-white p-4 shadow-md rounded-lg">{children}</div>
        </div>
      </div>
    </div>
  );
}
ProfileLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default ProfileLayout;
