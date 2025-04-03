import PropTypes from "prop-types";
import Header from "../DefaultLayout/Header";
import { AlignJustify, BarChart2, DollarSign, PieChart, Target } from "lucide-react"; 
import { NavLink } from "react-router-dom"; 
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
        <div className="w-[20%] flex flex-col gap-4">
          <WalletCard />
          <nav className="flex flex-col gap-2 p-4 bg-white border-2 shadow-sm rounded-lg">
            <NavLink
              to="/overview"
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
              Tổng quan
            </NavLink>
            <NavLink
              to="/transaction"
              className={({ isActive }) =>
                `flex items-center text-gray-700 font-medium px-4 py-2 rounded-md transition-colors duration-200 ${
                  isActive
                    ? "text-[#d55d2b] bg-[#f9e4d4] shadow-inner"
                    : "hover:text-[#d55d2b] hover:bg-gray-100"
                }`
              }
            >
              <DollarSign className="w-5 h-5 mr-2" /> 
              Giao dịch
            </NavLink>
            <NavLink
              to="/budget"
              className={({ isActive }) =>
                `flex items-center text-gray-700 font-medium px-4 py-2 rounded-md transition-colors duration-200 ${
                  isActive
                    ? "text-[#d55d2b] bg-[#f9e4d4] shadow-inner"
                    : "hover:text-[#d55d2b] hover:bg-gray-100"
                }`
              }
            >
              <PieChart className="w-5 h-5 mr-2" /> 
              Ngân sách
            </NavLink>
            <NavLink
              to="/goal"
              className={({ isActive }) =>
                `flex items-center text-gray-700 font-medium px-4 py-2 rounded-md transition-colors duration-200 ${
                  isActive
                    ? "text-[#d55d2b] bg-[#f9e4d4] shadow-inner"
                    : "hover:text-[#d55d2b] hover:bg-gray-100"
                }`
              }
            >
              <Target className="w-5 h-5 mr-2" /> 
              Mục tiêu
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

TransactionLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TransactionLayout;