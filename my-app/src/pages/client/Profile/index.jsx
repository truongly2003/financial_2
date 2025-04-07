import PasswordModal from "@/components/PasswordModal";
import PropTypes from "prop-types";
import useAuth from "@/context/useAuth";
import useNotification from "@/context/useNotification";
import { deleteUser, getUserById, updateUser } from "@/services/UserService";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function DeleteAccountModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Xác nhận xóa tài khoản
        </h2>
        <p className="text-gray-600 mb-4">
          Bạn có chắc chắn muốn xóa tài khoản không? Nếu xóa, toàn bộ dữ liệu
          của bạn (bao gồm thông tin cá nhân, lịch sử hoạt động, v.v.) sẽ bị mất
          hoàn toàn và không thể khôi phục.
        </p>
        <div className="flex justify-end gap-4">
          <button
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
            onClick={onClose}
          >
            Hủy
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            onClick={onConfirm}
          >
            Xóa tài khoản
          </button>
        </div>
      </div>
    </div>
  );
}
DeleteAccountModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};
function Profile() {
  const { userId } = useAuth();
  const { notify } = useNotification();
  const navigate=useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [user, setUser] = useState({
    userName: "",
    email: "",
    phoneNumber: "",
    createdAt: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getUserById(userId);
      console.log(res)
      setUser({
        userName: res.userName || "",
        email: res.email || "",
        phoneNumber: res.phoneNumber || "",
        createdAt: res.createdAt || "",
      });
    };
    fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await updateUser(userId, user);
      notify(res.message, res.code === 200 ? "success" : "error");
    } catch (err) {
      console.error(err);
    }
  };

  const confirmDeleteAccount = async() => {
    try {
         const response = await deleteUser(userId);
         notify(response.message, response.code === 200 ? "success" : "error");
         setIsDeleteModalOpen(false);
         navigate("/login");
       } catch (error) {
         console.log(error);
       }
  };
  

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Thông tin người dùng
      </h1>

      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Tên người dùng
            </label>
            <input
              type="text"
              name="userName"
              value={user.userName}
              onChange={handleChange}
              className="w-full p-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="w-full p-2 mt-1 border rounded-lg bg-gray-100 cursor-not-allowed"
              disabled
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Số điện thoại
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={user.phoneNumber}
              onChange={handleChange}
              className="w-full p-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Ngày tạo
            </label>
            <input
              type="text"
              value={new Date(user.createdAt).toLocaleDateString("vi-VN")}
              disabled
              className="w-full p-2 mt-1 border rounded-lg bg-gray-100 cursor-not-allowed"
            />
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex gap-4">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition"
              onClick={handleSubmit}
            >
              Lưu
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
              onClick={() => setIsModalOpen(true)}
            >
              Đổi mật khẩu
            </button>
          </div>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
            onClick={()=>setIsDeleteModalOpen(true)}
          >
            Xóa tài khoản
          </button>
        </div>
      </div>

      <PasswordModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
       
      />

      <DeleteAccountModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDeleteAccount}
      />
    </div>
  );
}

export default Profile;
