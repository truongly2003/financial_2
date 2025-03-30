import Header from "../DefaultLayout/Header";
import { AlignJustify } from "lucide-react";
import PropTypes from "prop-types";
import Sidebar from "./SideBar";

function ProfileLayout({ children }) {
  return (
    <div className=" bg-gray-200 h-screen">
      {/* Header cố định trên cùng */}
      <div className="sticky top-0 z-50 bg-white ">
        <Header icon={AlignJustify} />
      </div>

      {/* Nội dung bên dưới Header */}
      <div className="container mx-auto  md:max-w-3xl lg:max-w-6xl">
        <div className="flex">
          <div className="w-1/4">
            <Sidebar />
          </div>
          <div className="flex-1 ">{children}</div>
        </div>
      </div>
    </div>
  );
}
ProfileLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default ProfileLayout;
