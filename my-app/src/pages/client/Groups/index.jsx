import { Link } from "react-router-dom";

function Groups() {
    const groups = [
      { icon: "✈️", title: "Travel Group", members: 4, lastActive: "Today" },
      { icon: "🏠", title: "House Share", members: 3, lastActive: "Yesterday" },
      { icon: "🎮", title: "Gaming Squad", members: 6, lastActive: "2 days ago" },
      { icon: "🍽️", title: "Dinner Club", members: 5, lastActive: "3 days ago" },
      { icon: "📚", title: "Study Group", members: 4, lastActive: "1 week ago" },
    ];
  
    return (
      <div className="p-6 bg-gray-100">
       
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-purple-600">My Groups</h2>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
              Create New Group
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group, index) => (
              <Link
              to="/group-detail/1"
                key={index}
                className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:border-purple-300 transition"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="text-4xl mb-4">{group.icon}</div>
                  <h3 className="text-lg font-semibold text-purple-700 mb-2">{group.title}</h3>
                  <div className="flex items-center mb-4">
                    {/* Member avatars */}
                    {[...Array(group.memberAvatars)].map((_, i) => (
                      <div
                        key={i}
                        className="w-6 h-6 bg-gray-300 rounded-full -ml-1 border border-white"
                      ></div>
                    ))}
                    {group.members > group.memberAvatars && (
                      <div className="w-6 h-6 bg-gray-200 rounded-full -ml-1 border border-white flex items-center justify-center text-xs text-gray-600">
                        +{group.members - group.memberAvatars}
                      </div>
                    )}
                    <span className="ml-2 text-gray-600">{group.members} members</span>
                  </div>
                  <p className="text-gray-600 mb-2">
                    Total Spent: <span className="font-semibold">{group.totalSpent}</span>
                  </p>
                  <p className="text-red-500 font-semibold">
                    Your Share: {group.yourShare}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  export default Groups;


  