import { Link, useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { getGoalById } from "@/services/GoalService";
import ProgressBar from "@/components/ProgressBar";
import ContributionForm from "@/components/ContributionForm";
import { getAllContributeByGoalIdAndUserId } from "@/services/Goal-Contribute";
import GoalForm from "@/components/GoalForm";
import useAuth from "@/context/useAuth";
export default function GoalDetail() {
  const { userId } = useAuth();
  const { id } = useParams();
  const [goal, setGoal] = useState(null);
  const [contributes, setContributes] = useState([]);
  console.log(contributes);
  const [showFormContribution, setShowFormContribution] = useState(false);
  const [editingContribute, setEditingContribute] = useState(null);
  //
  const [showFormGoal, setShowFormGoal] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const fetchData = useCallback(async () => {
    try {
      const goalResponse = await getGoalById(id);
      if (goalResponse.data) {
        setGoal(goalResponse.data);
        const contributeResponse = await getAllContributeByGoalIdAndUserId(
          goalResponse.data.id,
          userId
        );
        console.log(contributeResponse);
        if (contributeResponse.data) {
          setContributes(contributeResponse.data);
        }
      }
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu:", error);
    }
  }, [id, userId]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (!goal) {
    return <div>Đang tải dữ liệu...</div>;
  }

  const progress = (goal.currentAmount / goal.targetAmount) * 100;
  const progressColor =
    goal.targetAmount >= goal.currentAmount ? "bg-red-500" : "bg-green-500";

  return (
    <div className="min-h-screen ">
      <div className="rounded-lg bg-white">
        <div className="flex items-center justify-between     ">
          {/* Thanh điều hướng */}
          <div className="flex items-center space-x-1">
            <Link to="/goal" className="text-gray-800">
              <ChevronLeft />
            </Link>
            <p className="text-gray-600">Mục tiêu</p>

            <p className="font-bold text-gray-800">{goal.goalName}</p>
            <ChevronRight className="w-4 h-4 text-gray-500" />
            <p className="text-gray-500 text-sm">Tất cả ví</p>
          </div>
          <div className="space-x-4">
            <button
              className="w-[180px] bg-green-500 text-black font-semibold py-2 px-3 rounded-lg"
              onClick={() => {
                setShowFormGoal(true);
                setEditingGoal(goal);
              }}
            >
              Chỉnh sửa mục tiêu
            </button>
            <button
              className="w-[180px] bg-green-500 text-black font-semibold py-2 px-3 rounded-lg"
              onClick={() => {
                setShowFormContribution(true);
                setEditingContribute(null);
              }}
            >
              Thêm đóng góp
            </button>
          </div>
        </div>

        <div className="flex space-x-1 mt-4 justify-center">
          <div className="p-4 bg-white rounded-2xl shadow border text-center min-w-[225px]">
            <p className="text-gray-600 font-semibold">Số tiền cần đạt</p>
            <p className="text-green-500 font-bold text-xl">
              {goal.targetAmount.toLocaleString()} đ
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl shadow border text-center min-w-[225px]">
            <p className="text-gray-600 font-semibold">Số tiền hiện có</p>
            <p className="text-red-500 font-bold text-xl">
              {goal.currentAmount.toLocaleString()} đ
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl shadow border text-center min-w-[225px]">
            <p className="text-gray-600 font-semibold">Số tiền còn thiếu</p>
            <p className="text-red-500 font-bold text-xl">
              {(goal.targetAmount - goal.currentAmount).toLocaleString()} đ
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl shadow border text-center min-w-[225px]">
            <p className="text-gray-600 font-semibold">Bạn có thể tiết kiệm</p>
            <p className="text-gray-700 font-bold text-xl">
              {(goal.targetAmount - goal.currentAmount).toLocaleString()} đ
            </p>
          </div>
        </div>
      </div>
      <div className="rounded-lg bg-white mt-4">
        <div className="p-4">
          <span className="text-gray-600">Tiến trình</span>
          <div className="flex justify-center">
            <span className="text-gray-600">
              Số tiền còn thiếu{" "}
              {(goal.targetAmount - goal.currentAmount).toLocaleString()} đ{" "}
            </span>
          </div>
          <div className="flex justify-center w-full">
            <div className="w-full max-w-4xl">
              <ProgressBar
                progress={progress}
                progressColor={progressColor}
                endDate={goal.deadline}
              />
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Danh sách giao dịch đã đóng góp
            </h3>

            {contributes.length > 0 ? (
              <div className="mt-2 space-y-3">
                {contributes.map((item,index) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm 
                    cursor-pointer hover:shadow-md transition-all duration-200 
                    border border-gray-100 hover:border-gray-200"
                    onClick={() => {
                      setShowFormContribution(true);
                      setEditingContribute(item);
                    }}
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-50 
                          flex items-center justify-center"
                      >
                        <span className="text-blue-600 font-medium">
                          {index+1}
                        </span>
                      </div>
                      <div>
                        <p className="text-gray-800 font-medium">
                          {new Date(item.contributionDate).toLocaleDateString(
                            "vi-VN"
                          )}
                        </p>
                        <p className="text-gray-600 text-sm">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <span
                      className="text-red-500 font-semibold bg-red-50 px-3 py-1 
                         rounded-full text-sm"
                    >
                      + {item.amount.toLocaleString()} đ
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-xl mt-2">
                <p className="text-gray-500">Chưa có giao dịch nào</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div></div>
      {/* form goal */}
      {showFormGoal && (
        <GoalForm
          initialGoal={editingGoal}
          onClose={() => setShowFormGoal(false)}
          onSuccess={fetchData}
        />
      )}
      {/* form contribution */}
      {showFormContribution && (
        <ContributionForm
          initialContribute={editingContribute}
          onClose={() => setShowFormContribution(false)}
          onSuccess={fetchData}
        />
      )}
    </div>
  );
}
