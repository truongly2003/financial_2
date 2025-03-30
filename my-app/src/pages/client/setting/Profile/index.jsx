import { useState } from "react";

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    user_name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone_number: "0912345678",
    created_at: "2025-02-27 13:40:51",
  });
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="bg-white shadow-md rounded-lg mx-4 mt-4 p-4">
        {/* Grid chia làm 2 cột */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium">Tên người dùng</label>
            <input
              type="text"
              name="user_name"
              value={user.user_name}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300 disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300 disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Số điện thoại</label>
            <input
              type="text"
              name="phone_number"
              value={user.phone_number}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300 disabled:bg-gray-100"
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

        {/* Nút Sửa / Lưu */}
        <div className="mt-4 flex  gap-4">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
            >
              Sửa
            </button>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600"
              >
                Lưu
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-500"
              >
                Hủy
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
