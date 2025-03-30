import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ChevronDown } from "lucide-react";
import { getAllCategory } from "@/services/CategoryService";
import ICONS from "../Icons";
export default function CategoryDropdown({
  onSelectCategory,
  initialCategoryId,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("expense");
  const [categories, setCategories] = useState({ expense: [], income: [] });
  const [selectedCategory, setSelectedCategory] = useState(null);
  const userId = 1;

  useEffect(() => {
    async function fetchCategories() {
      try {
        const result = await getAllCategory(userId);
        if (result.data) {
          const expenseCategories = result.data.filter(
            (cat) => cat.categoryType === "expense"
          );
          const incomeCategories = result.data.filter(
            (cat) => cat.categoryType === "income"
          );
          setCategories({
            expense: expenseCategories,
            income: incomeCategories,
          });
          // gán cateogry ID
          const foundCategory = result.data.find(
            (cat) => cat.id === initialCategoryId
          );
          if (foundCategory) setSelectedCategory(foundCategory);
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh mục:", error);
      }
    }
    fetchCategories();
  }, [userId,initialCategoryId]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelectType = (type) => {
    setSelectedType(type);
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setIsOpen(false);
    onSelectCategory(category);
  };

  return (
    <div className="relative ">
      {/* Nút chọn danh mục */}
      <button
        className="w-full flex justify-between items-center px-4 py-2 border rounded-lg bg-white"
        onClick={toggleDropdown}
      >
       
        {selectedCategory ? (
          <span>{selectedCategory.categoryName}</span>
        ) : (
         <span className="flex items-center"> Chọn danh mục <ChevronDown /></span> 
        )}
      </button>

      {/* Dropdown danh mục */}
      {isOpen && (
        <div className="absolute w-full bg-white border rounded-lg shadow-lg mt-2">
          {/* Tabs Chi phí / Thu nhập */}
          <div className="flex">
            <button
              className={`flex-1 px-4 py-2 ${
                selectedType === "expense"
                  ? "bg-red-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => handleSelectType("expense")}
            >
              Chi phí
            </button>
            <button
              className={`flex-1 px-4 py-2 ${
                selectedType === "income"
                  ? "bg-green-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => handleSelectType("income")}
            >
              Thu nhập
            </button>
          </div>

          {/* Danh sách danh mục */}
          <div className="max-h-60 overflow-y-auto">
            {categories[selectedType].map((category) => {
              const iconData = ICONS[category.icon] || {
                icon: "?",
                color: "bg-gray-400",
              };
              return (
                <div
                  key={category.id}
                  className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelectCategory(category)}
                >
                  <span className="mr-2">{iconData.icon}</span>{" "}
                  {category.categoryName}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

CategoryDropdown.propTypes = {
  // userId: PropTypes.string.isRequired,
  onSelectCategory: PropTypes.func.isRequired,
  initialCategoryId : PropTypes.number,
};
