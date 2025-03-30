// import { useState } from "react";
import {
  addBudget,
  deleteBudget,
  updateBudget,
} from "@/services/BudgetService";
import { CircleX } from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";

export default function BudgetForm({ onClose, onSuccess, initialBudget }) {
  const [budget, setBudget] = useState(
    initialBudget || {
      userId: 1,
      categoryId: "",
      budgetName: "",
      amountLimit: "",
      startDate: "",
      endDate: "",
      status: "",
    }
  );
  const handleChangeBudget = (e) => {
    setBudget({
      ...budget,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async () => {
    try {
      let response;
      if (budget.id) {
        response = await updateBudget(budget.id, budget);
      } else {
        response = await addBudget(budget);
      }
      alert(response.message);
      onClose();
      onSuccess();
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async () => {
    if (!confirm("Bạn có chắc chắn xóa ngân sách  này không")) return;
    try {
      const response = await deleteBudget(budget.id);
      alert(response.message);
      onClose();
      onSuccess();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="fixed inset-0   flex items-center justify-center bg-gray-900 bg-opacity-50  z-[50]">
      <div className="bg-white p-6 rounded-lg shadow-lg w-200 relative">
        {/* Thông tin chung */}
        <div className="">
          <div className="flex gap-2 mt-2">
            <div className="flex-1">
              <label className=" text-sm text-gray-600 ">Tên Ngân sách</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                name="budgetName"
                value={budget.budgetName}
                onChange={handleChangeBudget}
              />
            </div>
            <div className="flex-1">
              <label className="text-sm text-gray-600">Số lượng</label>
              <input
                type="number"
                className="w-full p-2 border rounded-md"
                name="amountLimit"
                value={budget.amountLimit}
                onChange={handleChangeBudget}
              />
            </div>
          </div>
          <div className="flex gap-2 mt-2"></div>
        </div>

        {/* Lọc ngân sách */}
        <div className="">
          <div className="flex gap-2 ">
            <div className="flex-1">
              <label className="text-sm text-gray-600">Chọn danh mục</label>
              <select className="w-full p-2 border rounded-md">
                <option>Tất cả các danh mục</option>
              </select>
            </div>
            <div className="flex-1"></div>
          </div>
        </div>
        {/* ngày */}
        <div className="">
          <div className="flex gap-2 ">
            <div className="flex-1">
              <label className="text-sm text-gray-600">Ngày bắt đầu</label>
              <input
                type="date"
                className="w-full p-2 border rounded-md"
              
                name="startDate"
                value={budget.startDate}
                onChange={handleChangeBudget}
              />
            </div>
            <div className="flex-1">
              <label className="text-sm text-gray-600">Ngày kết thúc</label>
              <input
                type="date"
                className="w-full p-2 border rounded-md"
              
                name="endDate"
                value={budget.endDate}
                onChange={handleChangeBudget}
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end mt-4 gap-2">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            Lưu
          </button>
          {budget.id && (
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={handleDelete}
            >
              Xóa ngân sách
            </button>
          )}
        
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Hủy bỏ
          </button>
          <button
            className="absolute top-1 right-1 text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <CircleX />
          </button>
        </div>
      </div>
    </div>
  );
}

BudgetForm.propTypes = {
  initialBudget: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};
