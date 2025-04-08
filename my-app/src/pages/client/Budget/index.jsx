import { useCallback, useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
// import BudgetForm from "@/components/BudgetForm";
import { getAllBudgetByUserId } from "@/services/BudgetService";
import { Link } from "react-router-dom";
import ProgressBar from "@/components/ProgressBar";
import BudgetForm from "@/components/BudgetForm";
import useAuth from "@/context/useAuth";
export default function Budget() {
  const { userId } = useAuth();
  const [budgets, setBudgets] = useState([]);
  const [showFormBudget, setShowFormBudget] = useState(false);
  const [statusFilter, setStatusFilter] = useState("active");
  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
  };
  const fetchBudgets = useCallback(async () => {
    try {
      const response = await getAllBudgetByUserId(userId);
      setBudgets(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [userId]);
  const filteredBudgets = budgets.filter((budget) => {
    const currentDate = new Date();
    const endDate = new Date(budget.endDate);
    const isActive = endDate > currentDate;
    const isExpired = endDate < currentDate;
    const isOverlimit = budget.totalSpent > budget.amountLimit;
    if (statusFilter === "active") return isActive && !isOverlimit;
    if (statusFilter === "expired") return isExpired;
    if (statusFilter === "overlimit") return isOverlimit;
    return true;
  });
  useEffect(() => {
    fetchBudgets();
  }, [fetchBudgets]);
  return (
    <div className="min-h-screen ">
      <button
        onClick={() => {
          setShowFormBudget(true);
        }}
        className="w-[180px] flex items-center gap-2 px-4 py-2 text-white bg-[#ff6f61] rounded-lg shadow "
      >
        <PlusCircle size={20} />
        <span>Thêm ngân sách</span>
      </button>
      <div className=" bg-[#f9e4d4] shadow-md rounded-lg mt-2  p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Lọc</h2>
        </div>
        <div className="grid grid-cols-3 gap-4  ">
          <div className="col-span-1 ">
            <label className="text-sm text-gray-600">Trạng thái</label>
            <select
              value={statusFilter}
              onChange={handleStatusChange}
              className=" border rounded p-2 w-full "
            >
              <option value="active">Đang hoạt động</option>
              <option value="expired">Hết hạn</option>
              <option value="overlimit">Vượt mức</option>
            </select>
          </div>
          <div className="col-span-1"></div>
        </div>
      </div>
      <div className="mt-6">
        <h3 className=" font-normal text-gray-700 mb-4">
          Ngân sách
        </h3>
        {filteredBudgets.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-xl mt-2">
            <p className="text-gray-500">Chưa có ngân sách nào</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {filteredBudgets.map((budget, index) => {
              const progress = (budget.totalSpent / budget.amountLimit) * 100;
              const progressColor =
                budget.totalSpent >= budget.amountLimit
                  ? "bg-red-500"
                  : "bg-green-500";

              return (
                <Link
                  key={index}
                  className="bg-[#f9e4d4] shadow-md rounded-lg p-4 cursor-pointer"
                  to={`/budget/budget-detail/${budget.id}`}
                >
                  <div className="space-y-2">
                    <div>
                      <p className="text-gray-500 text-xl font-bold">
                        {budget.budgetName}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {budget.walletName}
                      </p>
                      <p className="text-xl font-bold text-red-500">
                        Đã chi tiêu: {budget.totalSpent.toLocaleString()} đ
                      </p>
                      <p className="text-sm text-gray-900">
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
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {showFormBudget && (
        <BudgetForm
          onClose={() => setShowFormBudget(false)}
          onSuccess={fetchBudgets}
        />
      )}
    </div>
  );
}
