import PasswordModal from "@/components/PasswordModal";
import { useState } from "react";

function Profile() {
  const [user, setUser] = useState({
    user_name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone_number: "0912345678",
    created_at: "2025-02-27 13:40:51",
  });
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    console.log("Profile updated:", user);
  };

  const handlePasswordSave = (passwordData) => {
    console.log("Password updated:", passwordData);
  };

  return (
    <div className="min-h-screen">
      <h1>Thông tin người dùng</h1>
    
      <form onSubmit={handleProfileSubmit}>
        <div className="bg-gray-100 shadow-md mx-4 mt-4 p-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium">
                Tên người dùng
              </label>
              <input
                type="text"
                name="user_name"
                value={user.user_name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                disabled
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">
                Số điện thoại
              </label>
              <input
                type="text"
                name="phone_number"
                value={user.phone_number}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Ngày tạo</label>
              <input
                type="text"
                value={user.created_at}
                disabled
                className="w-full px-3 py-2 border rounded-lg bg-gray-100"
              />
            </div>
          </div>

          <div className="mt-4 flex gap-4">
            <button
              type="submit"
              className="bg-green-500 w-[80px] text-white px-4 py-2 rounded-sm shadow-md hover:bg-green-600"
            >
              Lưu
            </button>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-500 w-[150px] text-white px-4 py-2 rounded-sm shadow-md hover:bg-blue-600"
            >
              Đổi mật khẩu
            </button>
          </div>
        </div>
      </form>

      <PasswordModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handlePasswordSave}
      />
    </div>
  );
}

export default Profile;