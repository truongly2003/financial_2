import { useCallback, useEffect, useState } from "react";
import { getAllCategory } from "@/services/CategoryService";
import ICONS from "@/components/Icons";
import useAuth from "@/context/useAuth";
import CategoryForm from "@/components/CategoryForm";

function Catalog() {
  const { userId } = useAuth();
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState("expense");
  const [showFormCategory, setShowFormCategory] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await getAllCategory(userId);
      setCategories(response);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, [userId]);
  // console.log(categories)
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const filteredCategories = categories.filter(
    (category) => category.categoryType === activeTab
  );

  return (
    <div className="min-h-screen">
      <h1>Danh mục tài chính</h1>
      <div className="bg-gray-100 shadow-md  mx-4 mt-4 p-4">
        {/* Tab Navigation */}
        <div className="flex border-b mb-4 justify-between">
          <div>
            <button
              className={`px-4 py-2 font-semibold ${
                activeTab === "expense"
                  ? "border-b-2 border-red-500 text-red-500"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("expense")}
            >
              Chi tiêu
            </button>
            <button
              className={`px-4 py-2 font-semibold ${
                activeTab === "income"
                  ? "border-b-2 border-green-500 text-green-500"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("income")}
            >
              Thu nhập
            </button>
          </div>
          <button
            className="bg-white text-black font-semibold py-2 px-3 rounded-sm "
            onClick={() => {
              setShowFormCategory(true);
              setEditingCategory(null);
            }}
          >
            Thêm danh mục
          </button>
        </div>

        {/* Content */}
        {filteredCategories.length === 0 ? (
          <p className="text-gray-500">
            {categories.length === 0
              ? "Đang tải dữ liệu..."
              : `Không có danh mục ${
                  activeTab === "income" ? "thu nhập" : "chi tiêu"
                }`}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCategories.map((category) => {
              const iconData = ICONS[category.icon] || {
                icon: "?",
                color: "bg-gray-400",
              };
              return (
                <div
                  key={category.id}
                  className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`text-2xl ${
                        category.categoryType === "income"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {iconData.icon ? iconData.icon : "?"}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">
                        {category.categoryName}
                      </h3>

                      <p className="text-sm text-gray-600">
                        {category.description}
                      </p>
                    </div>
                    <div>
                      <button
                        className="ms-6 rounded w-[80px] px-2 py-1 text-black bg-gradient-to-r bg-[#f9e4d4]  shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
                        onClick={() => {
                          setShowFormCategory(true);
                          setEditingCategory(category);
                        }}
                      >
                        Chi tiết
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-center content-center mt-2 space-x-2">
                    <span
                      className={`text-xs px-2 py-1 rounded-full inline-block ${
                        category.categoryType === "income"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {category.categoryType === "income"
                        ? "Thu nhập"
                        : "Chi tiêu"}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full  inline-block
                        ${
                          category.defaultCategory === true
                            ? "bg-blue-100 text-blue-800 font-medium"
                            : ""
                        }
                      `}
                    >
                      {category.defaultCategory === true ? "Mặc định" : ""}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {showFormCategory && (
        <CategoryForm
          initialCategory={editingCategory}
          onClose={() => setShowFormCategory(false)}
          onSuccess={fetchCategories}
        />
      )}
    </div>
  );
}

export default Catalog;
