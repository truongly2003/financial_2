import { Phone, MapPin, Mail } from "lucide-react";
const Footer = () => {
  return (
    <footer className=" bg-[#ff6f61]  py-8">
      {/* Phần thông tin liên hệ */}
      <div className="flex justify-around items-center  ">
        <div className="flex items-center space-x-3">
          <MapPin />
          <div>
            <p className="text-[#333]">Địa Chỉ</p>
            <p>2003 SGU</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Phone />
          <div>
            <p className="text-[#333]">Số Điện Thoại</p>
            <p>444-666-22222</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Mail />
          <div>
            <p className="text-[#333]"> Mail</p>
            <p>info@smart.com</p>
          </div>
        </div>
      </div>

      {/* Phần Menu và Dịch vụ */}
      <div className="flex justify-around py-8">
        {/* Menu */}
        <div>
          {" "}
          <h3 className="text-xl font-bold text-gray-900">
            Quản Lý Chi Tiêu Smart
          </h3>
        </div>
        <div>
          <ul className="mt-2 flex flex-row space-x-4">
            <li>
              <a href="#" className="hover:text-[#f7d794] transition-colors">
                Giới thiệu
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#f7d794] transition-colors">
                Giao dịch
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#f7d794] transition-colors">
                Kết nối
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#f7d794] transition-colors">
                Tất cả
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Phần bản quyền và chính sách */}
      <div className="flex justify-between items-center border-t border-gray-700 pt-6 px-8">
        <p className="text-[#333]">
          L2003 Quản Chi Tiêu Smart. All rights reserved.
        </p>
        <div className="space-x-4">
          <a
            href="#"
            className="text-[#333] hover:text-[#f7d794] transition-colors"
          >
            Điều Khoản
          </a>
          <a
            href="#"
            className="text-[#333] hover:text-[#f7d794] transition-colors"
          >
           Chính sách sử dụng
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
