import ProgressBar from "@/components/ProgressBar";
import TransactionList from "@/components/TransactionList";
import ICONS from "@/components/Icons";
import { getBudgetById } from "@/services/BudgetService";
import { getAllTransactionByUserIdAndBudgetId } from "@/services/TransactionService";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import TransactionForm from "@/components/TransactionForm";
import BudgetForm from "@/components/BudgetForm";

function BudgetDetail() {
  const { id } = useParams();
  const [transactions, setTransactions] = useState([]);
  const [budget, setBudget] = useState(null);
  //
  const [showFormTransaction, setShowFormTransaction] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  //
  const [showFormBudget, setShowFormBudget] = useState(false);
  const [editingBudget, setEditingBudget] = useState(null);

  const fetchTransactions = useCallback(async () => {
    try {
      const response = await getAllTransactionByUserIdAndBudgetId(1, id);
      if (response.data) {
        setTransactions(response.data);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  }, [id]);
  const fetchBudgets = useCallback(async () => {
    const response = await getBudgetById(id);
    if (response.data) {
      setBudget(response.data);
    } else {
      console.error("Không tìm thấy dữ liệu ngân sách.");
    }
  }, [id]);
  useEffect(() => {
    fetchBudgets();
  }, [fetchBudgets]);
  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);
  const filter = "year";
  const groupedTransactions = transactions.reduce((acc, item) => {
    let dateKey;

    if (filter === "year") {
      dateKey = new Date(item.transactionDate).getFullYear().toString();
    }

    if (!acc[dateKey]) {
      acc[dateKey] = { transactions: [], totalExpense: 0, totalIncome: 0 };
    }

    acc[dateKey].transactions.push(item);

    if (item.categoryType === "expense") {
      acc[dateKey].totalExpense += item.amount;
    } else if (item.categoryType === "income") {
      acc[dateKey].totalIncome += item.amount;
    }

    return acc;
  }, {});

  if (!budget) {
    return <div>Đang tải dữ liệu...</div>;
  }
  const amountLimit = budget.amountLimit || 0;
  const totalSpent = budget.totalSpent || 0;
  const remainingAmount = amountLimit - totalSpent;
  const overspentAmount = totalSpent - amountLimit;

  return (
    <div className="min-h-screen mt-4  ">
      <div className="rounded-lg bg-white">
        <div className="flex items-center justify-between   p-4  ">
          {/* Thanh điều hướng */}
          <div className="flex items-center space-x-1">
            <Link to="/budget" className="text-gray-800">
              <ChevronLeft  />
            </Link>
            <p className="text-gray-600">Ngân sách</p>

            <p className="font-bold text-gray-800">{budget.budgetName}</p>
            <ChevronRight className="w-4 h-4 text-gray-500" />
            <p className="text-gray-500 text-sm">Tất cả ví</p>
          </div>

          {/* Nút thay đổi ngân sách */}
          <button
            className="bg-green-100 text-green-600 font-semibold py-1 px-3 rounded-lg hover:bg-green-200"
            onClick={() => {
              setShowFormBudget(true);
              setEditingBudget(budget);
            }}
          >
            Chỉnh sửa ngân sách
          </button>
        </div>

        <div className="flex space-x-4  p-2 justify-center">
          <div className="p-4 bg-white rounded-2xl shadow border text-center min-w-[250px]">
            <p className="text-gray-600 font-semibold">Ngân sách ban đầu</p>
            <p className="text-green-500 font-bold text-xl">
              {amountLimit.toLocaleString()} đ
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl shadow border text-center min-w-[250px]">
            <p className="text-gray-600 font-semibold">
              Đã chi tiêu cho đến nay
            </p>
            <p className="text-red-500 font-bold text-xl">
              {totalSpent.toLocaleString()} đ
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl shadow border text-center min-w-[250px]">
            <p className="text-gray-600 font-semibold">Tiền chi tiêu thêm</p>
            <p className="text-red-500 font-bold text-xl">
              {overspentAmount > 0
                ? `-${overspentAmount.toLocaleString()} đ`
                : "0 đ"}
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl shadow border text-center min-w-[250px]">
            <p className="text-gray-600 font-semibold">Bạn có thể chi tiêu</p>
            <p className="text-gray-700 font-bold text-xl">
              {remainingAmount > 0
                ? `${remainingAmount.toLocaleString()} đ`
                : "0 đ"}
            </p>
          </div>
        </div>
      </div>
      <div className="rounded-lg bg-white mt-4">
        <div className="p-4">
          <span className="text-gray-600">Tiến trình</span>
          <div className="flex justify-center">
            <span className="text-gray-600">Ngân sách đã vượt quá 5000</span>
          </div>
          <div className="flex justify-center w-full">
            <div className="w-full max-w-4xl">
              <ProgressBar
                progress={50}
                progressColor="bg-green-600"
                startDate={budget.startDate}
                endDate={budget.endDate}
              />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-gray-600 ">Danh sách giao dịch</span>
            <TransactionList
              transactionsToRender={groupedTransactions}
              setShowFormTransaction={setShowFormTransaction}
              setEditingTransaction={setEditingTransaction}
              ICONS={ICONS}
            />
          </div>
        </div>
      </div>
      {showFormTransaction && (
        <TransactionForm
          onClose={() => setShowFormTransaction(false)}
          initialTransaction={editingTransaction}
          onSuccess={fetchTransactions}
        />
      )}
      {showFormBudget && (
        <BudgetForm
          onClose={() => setShowFormBudget(false)}
          initialBudget={editingBudget}
          onSuccess={fetchBudgets}
        />
      )}
    </div>
  );
}

export default BudgetDetail;
