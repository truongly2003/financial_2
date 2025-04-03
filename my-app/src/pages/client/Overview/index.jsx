
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { useState, useEffect } from "react";
import { getBalance } from "@/services/Overview";
import { getAllTransactionsByUserIdAndFilterRange } from "@/services/TransactionService";
import useAuth from "@/context/useAuth";
import { Input } from "@/components/ui/input";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
);


const Card = ({ children }) => {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        marginBottom: "20px",
      }}
    >
     
      {children}
    </div>
  );
};
import PropTypes from "prop-types";
Card.propTypes = {

  children: PropTypes.node.isRequired,
};
const Overview = () => {
  const { userId } = useAuth();
  const [balance, setBalance] = useState({
    totalBalance: 0,
    totalIncome: 0,
    totalExpense: 0,
  });
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState("month");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const balanceResponse = await getBalance(userId);
        setBalance({
          totalBalance: balanceResponse.totalBalance || 0,
          totalIncome: balanceResponse.totalIncome || 0,
          totalExpense: balanceResponse.totalExpense || 0,
        });

        const today = new Date();
        let start = startDate;
        let end = endDate;

        if (!startDate || !endDate) {
          switch (filter) {
            case "day":
              start = end = today.toISOString().split("T")[0];
              break;
            case "week":
              start = new Date(today.setDate(today.getDate() - 7))
                .toISOString()
                .split("T")[0];
              end = new Date().toISOString().split("T")[0];
              break;
            case "month":
              start = new Date(today.setMonth(today.getMonth() - 1))
                .toISOString()
                .split("T")[0];
              end = new Date().toISOString().split("T")[0];
              break;
            case "year":
              start = new Date(today.setFullYear(today.getFullYear() - 1))
                .toISOString()
                .split("T")[0];
              end = new Date().toISOString().split("T")[0];
              break;
          }
        }

        const transactionResponse =
          await getAllTransactionsByUserIdAndFilterRange(userId, start, end);
        setTransactions(transactionResponse.data || []);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [userId, filter, startDate, endDate]);

  const getChartData = () => {
    let groupByKey;
    let formatLabel;

    switch (filter) {
      case "year":
        groupByKey = (t) => new Date(t.transactionDate).getFullYear();
        formatLabel = (key) => `${key}`;
        break;
      case "month":
        groupByKey = (t) => {
          const d = new Date(t.transactionDate);
          return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
            2,
            "0"
          )}`;
        };
        formatLabel = (key) => key;
        break;
      case "week":
        groupByKey = (t) => {
          const d = new Date(t.transactionDate);
          const startOfWeek = new Date(d.setDate(d.getDate() - d.getDay()));
          return `${startOfWeek.getFullYear()}-${String(
            startOfWeek.getMonth() + 1
          ).padStart(2, "0")}-${String(startOfWeek.getDate()).padStart(
            2,
            "0"
          )}`;
        };
        formatLabel = (key) => `Tuần bắt đầu ${key}`;
        break;
      case "day":
      default:
        groupByKey = (t) => t.transactionDate;
        formatLabel = (key) => key;
    }

    const groupedData = transactions.reduce((acc, t) => {
      const key = groupByKey(t);
      if (!acc[key]) {
        acc[key] = { income: 0, expense: 0 };
      }
      if (t.categoryType === "income") {
        acc[key].income += t.amount;
      } else if (t.categoryType === "expense") {
        acc[key].expense += t.amount;
      }
      return acc;
    }, {});

    const labels = Object.keys(groupedData).sort().map(formatLabel);
    const incomeData = Object.keys(groupedData)
      .sort()
      .map((key) => groupedData[key].income);
    const expenseData = Object.keys(groupedData)
      .sort()
      .map((key) => groupedData[key].expense);

    const incomeExpenseData = {
      labels,
      datasets: [
        {
          label: "Thu nhập",
          data: incomeData,
          backgroundColor: "#4caf50",
        },
        {
          label: "Chi tiêu",
          data: expenseData,
          backgroundColor: "#f44336",
        },
      ],
    };

    const categoryTotals = transactions
      .filter((t) => t.categoryType === "expense")
      .reduce((acc, t) => {
        acc[t.categoryName] = (acc[t.categoryName] || 0) + t.amount;
        return acc;
      }, {});

    const categoryData = {
      labels: Object.keys(categoryTotals),
      datasets: [
        {
          data: Object.values(categoryTotals),
          backgroundColor: [
            "#ff6384",
            "#36a2eb",
            "#ffce56",
            "#4bc0c0",
            "#9966ff",
          ],
        },
      ],
    };

    // Calculate totals for the filtered period
    const filteredTotals = transactions.reduce(
      (acc, t) => {
        if (t.categoryType === "income") {
          acc.income += t.amount;
        } else if (t.categoryType === "expense") {
          acc.expense += t.amount;
        }
        return acc;
      },
      { income: 0, expense: 0 }
    );

    return { incomeExpenseData, categoryData, filteredTotals };
  };

  const { incomeExpenseData, categoryData, filteredTotals } = getChartData();

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <div className="flex space-x-4 p-4 bg-gray-100">
        <div className="bg-[#ff6f61] shadow-md rounded-lg p-4 w-64 text-center">
          <p className="text-white">Tổng số dư</p>
          <p className="text-white text-xl font-semibold">
            {balance.totalBalance.toLocaleString()}đ
          </p>
        </div>
        <div className="bg-[#ff6f61] shadow-md rounded-lg p-4 w-64 text-center">
          <p className="text-white">Tổng chi tiêu</p>
          <p className="text-yellow-300 text-xl font-semibold">
           - {balance.totalExpense.toLocaleString()}đ
          </p>
        </div>
        <div className="bg-[#ff6f61] shadow-md rounded-lg p-4 w-64 text-center">
          <p className="text-white">Tổng thu nhập</p>
          <p className="text-green-300 text-xl font-semibold">
            +{balance.totalIncome.toLocaleString()}đ
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 p-4">
        <div className="col-span-1">
          <label className="text-sm text-gray-600">Theo mốc thời gian</label>
          <select
            className="border rounded p-2 w-full"
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setStartDate("");
              setEndDate("");
            }}
          >
            <option value="day">Ngày</option>
            <option value="week">Tuần</option>
            <option value="month">Tháng</option>
            <option value="year">Năm</option>
          </select>
        </div>
        <div className="col-span-2">
          <label className="text-sm text-gray-600">Theo khoảng thời gian</label>
          <div className="flex gap-4 items-center">
            <Input
              type="date"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                setFilter("");
              }}
            />
            <Input
              type="date"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
                setFilter("");
              }}
            />
          </div>
        </div>
      </div>

      <Card title="Thống Kê Thu & Chi">
      <h2 className="text-2xl font-bold text-gray-800">
          Thu nhập và chi tiêu
        </h2>
        <div className="p-4">
          <p className="text-green-600 font-semibold">
            Thu nhập: {filteredTotals.income.toLocaleString()}đ
          </p>
          <p className="text-red-600 font-semibold">
            Chi tiêu: {filteredTotals.expense.toLocaleString()}đ
          </p>
        </div>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <Bar
            data={incomeExpenseData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "top" },
                tooltip: {
                  callbacks: {
                    label: (context) =>
                      `${
                        context.dataset.label
                      }: ${context.parsed.y.toLocaleString()}đ`,
                  },
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: "Số tiền (VNĐ)",
                  },
                  ticks: {
                    callback: (value) => value.toLocaleString(),
                  },
                },
                x: {
                  title: {
                    display: true,
                    text:
                      filter === "year"
                        ? "Năm"
                        : filter === "month"
                        ? "Tháng"
                        : filter === "week"
                        ? "Tuần"
                        : "Ngày",
                  },
                },
              },
            }}
          />
        </div>
      </Card>

      <Card className="p-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Chi Tiêu Theo Danh Mục
        </h2>
        <div className="flex flex-wrap items-center gap-6">
          {/* Pie Chart Container */}
          <div className="w-[300px] flex-shrink-0">
            <Pie
              data={categoryData}
              options={{ responsive: true }}
              className="w-full h-full"
            />
          </div>

          {/* Transaction List */}
          <div className="flex-1 min-w-[300px]">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Danh sách giao dịch
            </h3>
            <ul className="max-h-[300px] overflow-y-auto space-y-3 pr-2">
              {transactions
                .filter((t) => t.categoryType === "expense")
                .map((t, index) => (
                  <li
                    key={index}
                    className="pb-3 border-b border-gray-200 last:border-b-0 flex justify-between items-center"
                  >
                    <div>
                      <strong className="text-gray-800">
                        {t.categoryName}:
                      </strong>
                      <span className="ml-2 text-gray-600">
                        {t.amount.toLocaleString()}đ
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {t.transactionDate}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </Card>
        
    </div>
  );
};

export default Overview;
