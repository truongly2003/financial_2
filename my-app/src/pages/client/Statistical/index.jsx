import {
  ResponsiveContainer,
  YAxis,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import { useEffect, useState } from "react";
import { getAllTransactionsByUserIdAndFilterRange } from "@/services/TransactionService";
const balanceCards = [
  { amount: "96,800,000", label: "Số dư", color: "bg-red-400" },
  { amount: "68,000,000", label: "Chi tiêu", color: "bg-blue-400" },
  { amount: "64,000,000", label: "Thu nhập", color: "bg-green-400" },
];
const fetchSpendingDate = async (startDate, endDate, setData) => {
  try {
    const response = await getAllTransactionsByUserIdAndFilterRange(
      1,
      startDate,
      endDate
    );
    const result = response.data.map((item) => ({
      day: item.transactionDate,
      expense: item.categoryType === "expense" ? parseFloat(item.amount) : 0,
      income: item.categoryType === "income" ? parseFloat(item.amount) : 0,
    }));
    setData(result);
  } catch (error) {
    console.log(error);
  }
};

const tabs = ["Ngày", "Tuần", "Tháng", "Năm", "Khoảng thời gian"];
function Statistical() {
  const [activeTab, setActiveTab] = useState("Ngày");
  const [maxValue, setMaxValue] = useState(0);

  const [customRange, setCustomRange] = useState({ from: "", to: "" });
  const [data, setData] = useState([]);
  useEffect(() => {
    const today = new Date();
    let startDate, endDate;

    switch (activeTab) {
      case "Ngày":
        startDate = endDate = today.toISOString().split("T")[0];
        break;
      case "Tuần":
        startDate = new Date(today.setDate(today.getDate() - today.getDay()))
          .toISOString()
          .split("T")[0];
        endDate = new Date().toISOString().split("T")[0];
        break;
      case "Tháng":
        startDate = new Date(today.getFullYear(), today.getMonth(), 1)
          .toISOString()
          .split("T")[0];
        endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0)
          .toISOString()
          .split("T")[0];
        break;
      case "Năm":
        startDate = `${today.getFullYear()}-01-01`;
        endDate = `${today.getFullYear()}-12-31`;
        break;
      case "Khoảng thời gian":
        startDate = customRange.from;
        endDate = customRange.to;
        break;
      default:
        return;
    }
    if (startDate && endDate) {
      // fetchSpendingDate("2025-03-05", "2025-03-05", setData);
      fetchSpendingDate(startDate, endDate, setData);
    }
  }, [activeTab, customRange]);
  useEffect(() => {
    if (data.length > 0) {
      const maxValue = Math.max(
        ...data.map((item) => item.income + item.expense + 50000)
      );
      setMaxValue(maxValue);
    }
  }, [data]);

  return (
    // min-h-screen
    <div className="min-h-screen">
      <div className="mt-4 ">
        {/* Thống kê tổng quan */}
        <div className="bg-white text-white flex rounded-lg     ">
          <div className="flex  gap-3 p-4">
            {balanceCards.map((card, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg shadow-md text-white ${card.color}`}
              >
                <p className="text-sm">{card.label}</p>
                <p className="text-xl font-bold">{card.amount}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-6 border-b-2  mt-4 bg-white text-white rounded-lg h-[80px]     ">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`text-gray-500 relative px-2 pb-1 ${
                activeTab === tab ? "text-green-600 font-semibold" : ""
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-green-600"></div>
              )}
            </button>
          ))}

          {/* Chọn khoảng thời gian */}
          {activeTab === "Khoảng thời gian" && (
            <div className="">
              <label>Từ ngày: </label>
              <input
                type="date"
                value={customRange.from}
                onChange={(e) =>
                  setCustomRange({ ...customRange, from: e.target.value })
                }
                className="border p-2 rounded text-black"
              />
              <label className="ml-4">Đến ngày: </label>
              <input
                type="date"
                value={customRange.to}
                onChange={(e) =>
                  setCustomRange({ ...customRange, to: e.target.value })
                }
                className="border p-2 rounded text-black"
              />
            </div>
          )}
        </div>

        {/* end */}
        <div className="grid grid-cols-2 gap-4 ">
          <div className="col-span-2 bg-white shadow-md p-4 rounded-lg">
            <h3 className="text-lg font-semibold ">
              So sánh Thu nhập & Chi tiêu
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <YAxis domain={[0, maxValue]} />
                <XAxis dataKey="day" />

                <Tooltip />
                <Legend />
                <Bar dataKey="income" fill="#4CAF50" name="Thu nhập" />
                <Bar dataKey="expense" fill="#FF5733" name="Chi tiêu" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistical;
