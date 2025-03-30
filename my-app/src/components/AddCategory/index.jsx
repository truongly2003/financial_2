import PropTypes from "prop-types";
import { useState } from "react";
import ICONS from "../Icons";
import Select from "react-select";
import { addCategory } from "@/services/CategoryService";

function AddCategory({ onClose, onSuccess, userId = 1 }) {
  const [categorys, setCategorys] = useState({
    userId,
    categoryName: "",
    categoryType: "expense",
    description: "",
    icon: Object.keys(ICONS)[0], // Mặc định icon đầu tiên
  });

  // Hàm cập nhật state chung
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategorys((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async() => {
        try {
            const response=await addCategory(categorys) 
            alert(response.message)
            onClose()
            onSuccess();
        } catch (error) {
            console.error(error)
        }
  };

  const options = Object.keys(ICONS).map((icon) => ({
    value: icon,
    label: (
      <div className="flex items-center gap-2">
        <span>{ICONS[icon]?.icon}</span>
        <span>{icon}</span>
      </div>
    ),
  }));

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4 text-gray-800">Thêm danh mục</h2>

        {/* Nhập tên danh mục */}
        <input
          type="text"
          name="categoryName"
          value={categorys.categoryName}
          onChange={handleChange}
          placeholder="Nhập tên danh mục..."
          className="w-full p-2 border rounded mb-2"
        />

        {/* Nhập mô tả */}
        <input
          type="text"
          name="description"
          value={categorys.description}
          onChange={handleChange}
          placeholder="Mô tả..."
          className="w-full p-2 border rounded mb-2"
        />

        {/* Chọn loại danh mục */}
        <div className="mb-2">
          <label className="block mb-1 text-sm font-semibold">
            Loại danh mục
          </label>
          <select
            name="categoryType"
            value={categorys.categoryType}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="expense">Chi tiêu</option>
            <option value="income">Thu nhập</option>
            <option value="transfer">Chuyển khoản</option>
          </select>
        </div>

        {/* Chọn Icon */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-semibold">Chọn Icon</label>
          <Select
            options={options}
            value={options.find((opt) => opt.value === categorys.icon)}
            onChange={(selected) =>
              setCategorys((prev) => ({ ...prev, icon: selected.value }))
            }
            className="w-full"
          />
        </div>

        {/* Nút thao tác */}
        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            onClick={onClose}
          >
            Hủy
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleSave}
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}

AddCategory.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  userId: PropTypes.number,
};

export default AddCategory;
