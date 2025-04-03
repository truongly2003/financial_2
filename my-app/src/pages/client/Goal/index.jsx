import GoalForm from "@/components/GoalForm";
import ProgressBar from "@/components/ProgressBar";
import useAuth from "@/context/useAuth";
import { getAllGoalByUserId } from "@/services/GoalService";
import { PlusCircle } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
function Goal() {
  const { userId } = useAuth();
  const [goal, setGoal] = useState([]);
  const [showFormGoal, setShowFormGoal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const filteredGoals = goal.filter((g) => {
    return (
      g.goalName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === "" ||
        (statusFilter === "completed" && g.currentAmount >= g.targetAmount) ||
        (statusFilter === "incomplete" && g.currentAmount < g.targetAmount))
    );
  });
  const fetchGoal = useCallback(async () => {
    try {
      const response = await getAllGoalByUserId(userId);
      setGoal(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [userId]);
  useEffect(() => {
    fetchGoal();
  }, [fetchGoal]);
  return (
    <div className="min-h-screen  ">
      <button
        className="w-[180px] flex items-center gap-2 px-4 py-2 text-white bg-[#ff6f61] rounded-lg shadow "
        onClick={() => setShowFormGoal(true)}
      >
        <PlusCircle size={20} />
        <span>Thêm mục tiêu</span>
      </button>
      <div className="bg-[#f9e4d4] shadow-md rounded-lg mt-2  p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Lọc</h2>
        </div>
        <div className="grid grid-cols-3 gap-4  ">
          <div className="col-span-1 ">
            <label className="text-sm text-gray-600">Tìm kiếm</label>
            <input
              placeholder="Tìm kiếm mục tiêu..."
              className="outline-none border rounded p-2 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="col-span-1 ">
            <label className="text-sm text-gray-600">Trạng thái</label>
            <select className=" border rounded p-2 w-full "   value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="incomplete">Chưa hoàn thành</option>
              <option value="completed">Hoàn thành</option>
            </select>
          </div>

          <div className="col-span-1"></div>
        </div>
      </div>
      <div className=" ">
        <div className="bg-white shadow-md rounded-lg mt-4 p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {filteredGoals.map((goal, index) => {
              const progress = Math.max(
                (goal.currentAmount / goal.targetAmount) * 100,
                1
              );

              console.log(progress);
              const progressColor =
                goal.targetAmount >= goal.currentAmount
                  ? "bg-red-500"
                  : "bg-green-500";

              return (
                <Link
                  key={index}
                  className="bg-white shadow-md rounded-lg p-4 cursor-pointer"
                  to={`/goal/goal-detail/${goal.id}`}
                >
                  <div className="space-y-2">
                    <div>
                      <p className="text-gray-500 text-xl font-bold">
                        {goal.goalName}
                      </p>
                      <p className="text-sm font-bold text-red-500">
                        Đã đạt được: {goal.currentAmount.toLocaleString()} đ
                      </p>
                      <p className="text-sm text-gray-900">
                        Mục tiêu: {goal.targetAmount.toLocaleString()} đ
                      </p>
                    </div>
                    {/* progress */}
                    <ProgressBar
                      progress={progress}
                      progressColor={progressColor}
                      startDate={goal.deadline}
                      endDate={goal.deadline}
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      {/* showFormGoal */}
      {showFormGoal && (
        <GoalForm
          onClose={() => setShowFormGoal(false)}
          onSuccess={fetchGoal}
        />
      )}
    </div>
  );
}

export default Goal;
//  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
// {filteredBudgets.map((budget, index) => {
//   const progress = (budget.totalSpent / budget.amountLimit) * 100;
//   const progressColor =
//     budget.totalSpent >= budget.amountLimit
//       ? "bg-red-500"
//       : "bg-green-500";

//   return (
//     <Link
//       key={index}
//       className="bg-white shadow-md rounded-lg p-4 cursor-pointer"
//       to={`/budget/budget-detail/${budget.id}`}
//     >
//       <div className="space-y-2">
//         <div>
//           <p className="text-gray-500 text-sm">{budget.walletName}</p>
//           <p className="text-xl font-bold text-red-500">
//             Đã chi tiêu: {budget.totalSpent.toLocaleString()} đ
//           </p>
//           <p className="text-sm text-gray-900">
//             Từ {budget.amountLimit.toLocaleString()} đ
//           </p>
//         </div>
//         {/* progress */}
//         <ProgressBar
//           progress={progress}
//           progressColor={progressColor}
//           startDate={budget.startDate}
//           endDate={budget.endDate}
//         />
//       </div>
//     </Link>
//   );
// })}
//         </div>

// <table className="w-full  ">
// <thead>
//   <tr className=" text-gray-500">
//     <th className="p-3 text-left">Mục tiêu</th>
//     <th className="p-3 text-left">Số tiền cần đạt</th>
//     <th className="p-3 text-left">Số tiền hiện có</th>
//     <th className="p-3 text-left">Hạn</th>
//     <th className="p-3 text-left">Trạng thái</th>
//     <th className="p-3 text-left">Hành động</th>
//   </tr>
// </thead>
// <tbody>
{
  /* {goal.map((item) => (
    <tr key={item.id} className="border-t border-gray-300">
      <td className="p-3 flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-500 flex items-center justify-center rounded-full text-white font-bold">
          {item.goalName.charAt(0).toUpperCase()}
        </div>
        {item.goalName}
      </td>
      <td className="p-3">
        {item.targetAmount.toLocaleString()} đ
      </td>
      <td className="p-3">
        {item.currentAmount.toLocaleString()} đ
      </td>
      <td className="p-3">{item.deadline}</td>
      <td className="p-3">
        <div
          className={`px-3 w-[100px] py-1 flex justify-center rounded-full text-xs font-bold ${
            item.status === "in_progress"
              ? "bg-yellow-500 text-black"
              : "bg-green-500 text-white"
          }`}
        >
          {item.status}
        </div>
      </td>
      <td className="p-3">
        <Link
          to={`/goal/goal-detail/${item.id}`}
          className=" text-gray-800 px-3 py-2 rounded-lg font-bold transition-all"
        >
          Chi tiết
        </Link>
      </td>
    </tr>
  ))}
</tbody>
</table> */
}
