import PropTypes from "prop-types";
import Header from "../DefaultLayout/Header";
import { AlignJustify } from "lucide-react";
import { NavLink } from "react-router-dom"; // Sử dụng NavLink
import WalletCard from "@/components/Wallet";

function TransactionLayout({ children }) {
  return (
    <div className="bg-[#f9e4d4] min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white">
        <Header icon={AlignJustify} />
      </div>
      <div className="flex w-full p-2 gap-4 max-w-7xl mx-auto">
        {/* Sidebar */}
        <div className="w-[20%]">
          <WalletCard />
        </div>
        {/* Main Content */}
        <div className="w-[80%] rounded-lg">
          <nav className="flex gap-6 p-4 bg-white border-b-2 shadow-sm">
            <div className="mx-2 flex gap-2">
              <NavLink
                to="/overview"
                className={({ isActive }) =>
                  `text-gray-700 font-medium px-4 py-2 rounded-md transition-colors duration-200 ${
                    isActive
                      ? "text-[#d55d2b] bg-[#f9e4d4] shadow-inner"
                      : "hover:text-[#d55d2b] hover:bg-gray-100"
                  }`
                }
                end // Đảm bảo khớp chính xác với "/overview"
              >
                Tổng quan
              </NavLink>
              <NavLink
                to="/transaction"
                className={({ isActive }) =>
                  `text-gray-700 font-medium px-4 py-2 rounded-md transition-colors duration-200 ${
                    isActive
                      ? "text-[#d55d2b] bg-[#f9e4d4] shadow-inner"
                      : "hover:text-[#d55d2b] hover:bg-gray-100"
                  }`
                }
              >
                Giao dịch
              </NavLink>
              <NavLink
                to="/budget"
                className={({ isActive }) =>
                  `text-gray-700 font-medium px-4 py-2 rounded-md transition-colors duration-200 ${
                    isActive
                      ? "text-[#d55d2b] bg-[#f9e4d4] shadow-inner"
                      : "hover:text-[#d55d2b] hover:bg-gray-100"
                  }`
                }
              >
                Ngân sách
              </NavLink>
              <NavLink
                to="/goal"
                className={({ isActive }) =>
                  `text-gray-700 font-medium px-4 py-2 rounded-md transition-colors duration-200 ${
                    isActive
                      ? "text-[#d55d2b] bg-[#f9e4d4] shadow-inner"
                      : "hover:text-[#d55d2b] hover:bg-gray-100"
                  }`
                }
              >
                Mục tiêu
              </NavLink>
            </div>
          </nav>
          <div className="bg-white p-4 shadow-md rounded-b-lg">{children}</div>
        </div>
      </div>
    </div>
  );
}

TransactionLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TransactionLayout;