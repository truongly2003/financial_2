import { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
// import BudgetForm from "@/components/BudgetForm";
import { getAllBudgetByUserId } from "@/services/BudgetService";
import { Link } from "react-router-dom";
import ProgressBar from "@/components/ProgressBar";
import BudgetForm from "@/components/BudgetForm";
export default function Budget() {
  const [budgets, setBudgets] = useState([]);
  const [showFormBudget, setShowFormBudget] = useState(false);
  // const [editingBudget, setEditingBudget] = useState(null);

  const fetchBudgets = async () => {
    try {
      const response = await getAllBudgetByUserId(1);
      setBudgets(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchBudgets();
  }, []);
  return (
    <div className="min-h-screen mt-4">
      <button
        onClick={() => {
          setShowFormBudget(true);
          // setEditingBudget(null);
        }}
        className="w-[180px] flex items-center gap-2 px-4 py-2 text-white bg-emerald-500 rounded-lg shadow hover:bg-emerald-600"
      >
        <PlusCircle size={20} />
        <span>Thêm ngân sách</span>
      </button>
      <div className="bg-white shadow-md rounded-lg mt-2  p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Lọc</h2>
        </div>
        <div className="grid grid-cols-6 gap-4  ">
          <div className="col-span-1 ">
            <label className="text-sm text-gray-600">Trạng thái</label>
            <select className=" border rounded p-2 w-full ">
              <option value="expense">Đang hoạt động</option>
              <option value="income">Hết hạn</option>
              <option value="income">Vượt mức</option>
            </select>
          </div>
          <div className="col-span-1 ">
            <label className="text-sm text-gray-600">Tìm kiếm</label>
            <input
              placeholder="Tìm kiếm ngân sách..."
              className="outline-none border rounded p-2 w-full"
            />
          </div>
          <div className="col-span-1"></div>
        </div>
      </div>
      <div className="mt-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {budgets.map((budget, index) => {
            const progress = (budget.totalSpent / budget.amountLimit) * 100;
            const progressColor =
              budget.totalSpent >= budget.amountLimit
                ? "bg-red-500"
                : "bg-green-500";

            return (
              <Link
                key={index}
                className="bg-white shadow-md rounded-lg p-4 cursor-pointer"
                to={`/budget/budget-detail/${budget.id}`}
              >
                <div className="space-y-2">
                  <div>
                    <p className="text-gray-500 text-sm">{budget.walletName}</p>
                    <p className="text-xl font-bold text-red-500">
                      {budget.totalSpent.toLocaleString()} đ đã chi tiêu nhiều
                      hơn
                    </p>
                    <p className="text-sm text-gray-500">
                      Từ {budget.amountLimit.toLocaleString()} đ
                    </p>
                  </div>
                  {/* progress */}
                  <ProgressBar
                    progress={progress}
                    progressColor={progressColor} 
                    startDate={budget.startDate} 
                    endDate={budget.endDate} 
                  />
                  {/* <div className="progress">
                    <div className="w-full bg-gray-200 rounded-full h-6 mt-2">
                      <div
                        className={`${progressColor} h-full rounded-full text-white text-xs flex items-center justify-center`}
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      >
                        {progress.toFixed(2)}%
                      </div>
                    </div>

                    <div className="text-sm text-gray-500 flex justify-between mt-2">
                      <span>{budget.startDate}</span>
                      <span>{budget.endDate}</span>
                    </div>
                  </div> */}
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {showFormBudget && (
        <BudgetForm
          onClose={() => setShowFormBudget(false)}
          // initialBudget={editingBudget}
          onSuccess={fetchBudgets}
        />
      )}
    </div>
  );
}

// <div className="flex justify-between mb-4">
// <div className="p-4 bg-white rounded-lg shadow border text-center">
//   <p className="text-gray-600">Ngân sách ban đầu</p>
//   <p className="text-green-500 font-bold">+34,00 €</p>
// </div>
// <div className="p-4 bg-white rounded-lg shadow border text-center">
//   <p className="text-gray-600">Đã chi tiêu cho đến nay</p>
//   <p className="text-red-500 font-bold">-4,333.00 EUR</p>
// </div>
// <div className="p-4 bg-white rounded-lg shadow border text-center">
//   <p className="text-gray-600">Tiền chi tiêu thêm</p>
//   <p className="text-red-500 font-bold">-4,299.00 €</p>
// </div>
// <div className="p-4 bg-white rounded-lg shadow border text-center">
//   <p className="text-gray-600">Bạn có thể chi tiêu</p>
//   <p className="text-gray-700 font-bold">0,00 EUR/Ngày</p>
// </div>
// </div>
