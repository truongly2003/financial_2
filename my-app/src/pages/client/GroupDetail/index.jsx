import { useState } from "react";
import { Link } from "react-router-dom";
import { MoveLeft } from "lucide-react";

function GroupDetail() {
  const [activeTab, setActiveTab] = useState("Chat");

  const messages = [
    {
      sender: "Ly Truong",
      avatar: "https://via.placeholder.com/40",
      time: "10:30 AM",
      content:
        "Hey everyone! I just added the dinner expense from last night. Please check and let me know if the split looks correct.",
      isCurrentUser: true,
    },
    {
      sender: "John Doe",
      avatar: "https://via.placeholder.com/40",
      time: "10:32 AM",
      content: "Thanks! I'll check it now.",
      isCurrentUser: false,
    },
    {
      sender: "Jane Smith",
      avatar: "https://via.placeholder.com/40",
      time: "10:35 AM",
      content: "Looks good to me! Thanks for organizing everything.",
      isCurrentUser: false,
    },
    {
      sender: "Ly Truong",
      avatar: "https://via.placeholder.com/40",
      time: "10:38 AM",
      content: "Great! I'll add the taxi expenses later today.",
      isCurrentUser: true,
    },
    {
      sender: "John Doe",
      avatar: "https://via.placeholder.com/40",
      time: "10:40 AM",
      content: "Sounds good! Let me know when it's added.",
      isCurrentUser: false,
    },
    {
      sender: "Jane Smith",
      avatar: "https://via.placeholder.com/40",
      time: "10:42 AM",
      content: "Can we also split the hotel bill soon?",
      isCurrentUser: false,
    },
    {
      sender: "Ly Truong",
      avatar: "https://via.placeholder.com/40",
      time: "10:45 AM",
      content: "Sure, I'll add that tomorrow.",
      isCurrentUser: true,
    },
  ];

  const tabs = ["Overview", "Transactions", "Members", "Chat", "Settings"];

  const renderTabContent = () => {
    switch (activeTab) {
      case "Overview":
        return (
          <div className="p-6 space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-purple-50 rounded-lg p-4">
                <h4 className="text-gray-600">Total Spent</h4>
                <p className="text-2xl font-semibold text-gray-800">12,500,000 đ</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <h4 className="text-gray-600">Your Share</h4>
                <p className="text-2xl font-semibold text-red-500">3,125,000 đ</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <h4 className="text-gray-600">Members</h4>
                <div className="flex items-center">
                  <div className="flex -space-x-2">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="w-6 h-6 bg-gray-300 rounded-full border border-white"
                      ></div>
                    ))}
                    <div className="w-6 h-6 bg-gray-200 rounded-full border border-white flex items-center justify-center text-xs text-gray-600">
                      +1
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Spending by Category */}
            <div>
              <h3 className="text-lg font-semibold text-purple-700 mb-4">Spending by Category</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-2">🍽️</span>
                    <h4 className="text-gray-800 font-semibold">Food & Dining</h4>
                  </div>
                  <p className="text-gray-600">6 transactions</p>
                  <p className="text-gray-600 mt-1">Total Spent: 5,500,000 đ</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: "60%" }}></div>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-2">🚗</span>
                    <h4 className="text-gray-800 font-semibold">Transportation</h4>
                  </div>
                  <p className="text-gray-600">4 transactions</p>
                  <p className="text-gray-600 mt-1">Total Spent: 3,200,000 đ</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: "40%" }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h3 className="text-lg font-semibold text-purple-700 mb-4">Recent Activity</h3>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-2xl mr-2">🍽️</span>
                    <div>
                      <p className="text-gray-800 font-semibold">Group Dinner</p>
                      <p className="text-gray-600 text-sm">Added by Ly Truong • Today, 19:30</p>
                    </div>
                  </div>
                  <p className="text-red-500 font-semibold">-850,000 đ</p>
                </div>
              </div>
            </div>
          </div>
        );
      case "Transactions":
        return (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-purple-700 mb-4">
              Recent Transactions
            </h3>
            <ul className="space-y-4">
              <li className="flex justify-between">
                <span>Dinner Expense</span>
                <span>2,000,000 đ</span>
              </li>
              <li className="flex justify-between">
                <span>Taxi Fare</span>
                <span>500,000 đ</span>
              </li>
            </ul>
          </div>
        );
      case "Members":
        return (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-purple-700 mb-4">
              Group Members
            </h3>
            <ul className="space-y-4">
              {["Ly Truong", "John Doe", "Jane Smith", "Alex Brown"].map(
                (member, index) => (
                  <li key={index} className="flex items-center">
                    <img
                      src="https://via.placeholder.com/40"
                      alt={member}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <span>{member}</span>
                  </li>
                )
              )}
            </ul>
          </div>
        );
      case "Chat":
        return (
          <div className="flex flex-col h-[calc(100vh-340px)]">
            <div className="flex-1 overflow-y-auto p-6">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex mb-4 ${
                    message.isCurrentUser ? "justify-end" : "justify-start"
                  }`}
                >
                  {!message.isCurrentUser && (
                    <img
                      src={message.avatar}
                      alt={message.sender}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                  )}
                  <div className="flex flex-col max-w-[70%]">
                    <div className="flex items-center">
                      {!message.isCurrentUser && (
                        <span className="text-sm font-semibold text-gray-800 mr-2">
                          {message.sender}
                        </span>
                      )}
                      <span className="text-xs text-gray-500">
                        {message.time}
                      </span>
                    </div>
                    <div
                      className={`p-3 rounded-lg ${
                        message.isCurrentUser
                          ? "bg-purple-100 text-gray-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                  {message.isCurrentUser && (
                    <img
                      src={message.avatar}
                      alt={message.sender}
                      className="w-10 h-10 rounded-full ml-3"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      case "Settings":
        return (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-purple-700 mb-4">
              Group Settings
            </h3>
            <p className="text-gray-600">Group Name: Travel Group</p>
            <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
              Edit Group
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-200 ">
      <div className="rounded-lg shadow-md p-6 border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <div className="  w-full">
            <div className="bg-white rounded-lg  border border-gray-200 w-full p-6">
              {/* Header */}

              <div className="flex  space-x-1 justify-between mb-6">
                <Link
                  to="/groups"
                  className="text-gray-600 hover:text-purple-600 space-x-4 flex items-center"
                >
                  <MoveLeft className="text-gray-400" /> Back to goals
                </Link>
                <h2 className="text-xl font-semibold text-purple-600">
                  {/* {goal.goalName} */}dfd
                </h2>
                <div className="space-x-4">
                  <button className=" bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 ">
                    Edit Group
                  </button>
                </div>
              </div>
              {/* Tabs */}
              <div className="flex border-b border-gray-200">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 text-gray-600 hover:text-purple-700 ${
                      activeTab === tab
                        ? "border-b-2 border-purple-700 text-purple-700"
                        : ""
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              {renderTabContent()}

              {/* Message Input (only for Chat tab) */}
              {activeTab === "Chat" && (
                <div className="p-6 border-t border-gray-200 flex items-center ">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-700"
                  />
                  <button className="ml-3 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                    Send
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupDetail;
