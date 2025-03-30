import GoalForm from "@/components/GoalForm";
import { getAllGoalByUserId } from "@/services/GoalService";
import { PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function Goal() {
  const [goal, setGoal] = useState([]);
  const [showFormGoal, setShowFormGoal] = useState(false);
  const fetchGoal = async () => {
    try {
      const response = await getAllGoalByUserId(1);
      setGoal(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchGoal();
  }, []);
  return (
    <div className="min-h-screen mt-4 ">
      <button
        className="w-[180px] flex items-center gap-2 px-4 py-2 text-white bg-emerald-500 rounded-lg shadow hover:bg-emerald-600"
        onClick={() => setShowFormGoal(true)}
      >
        <PlusCircle size={20} />
        <span>Thêm mục tiêu</span>
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
              placeholder="Tìm kiếm mục tiêu..."
              className="outline-none border rounded p-2 w-full"
            />
          </div>
          <div className="col-span-1"></div>
        </div>
      </div>
      <div className=" ">
        <div className="bg-white shadow-md rounded-lg mt-4 p-4">
          <table className="w-full  text-dark">
            <thead>
              <tr className=" text-gray-800">
                <th className="p-3 text-left">Mục tiêu</th>
                <th className="p-3 text-left">Số tiền cần đạt</th>
                <th className="p-3 text-left">Số tiền hiện có</th>
                <th className="p-3 text-left">Hạn</th>
                <th className="p-3 text-left">Trạng thái</th>
                <th className="p-3 text-left">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {goal.map((item) => (
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
          </table>
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
