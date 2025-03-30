import PropTypes from "prop-types";
import Header from "./Header";
// import Sidebar from "./SideBar";
import { AlignJustify } from "lucide-react";
function DefaultLayout({ children }) {
  return (
    <div className=" bg-gray-200 min-h-screen">
      {/* Header cố định trên cùng */}
      <div className="sticky top-0 z-10 bg-white ">
        <Header icon={AlignJustify} />
      </div>

      {/* Nội dung bên dưới Header */}
      <div className="w-full">
        <div className="  max-w-6xl mx-auto px-4    ">
          <div className="w-full">{children}</div>
        </div>
      </div>
    </div>
  );
}
DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default DefaultLayout;
