export default function NotificationDropdown() {
  const notifications = [
    { id: 1, message: "Bạn đã nhận được 500.000đ từ tài khoản ACB" },
    { id: 2, message: "Hóa đơn điện nước đến hạn thanh toán" },
    { id: 3, message: "Mục tiêu tiết kiệm 'Mua MacBook' còn 2.000.000đ nữa!" },
 
  ];

  return (
    <div className="relative">
      {/* Dropdown */}
      <div className="absolute right-0  w-64 bg-white rounded-md shadow-lg overflow-hidden transition-opacity duration-300">
        <div className="p-2 font-semibold text-gray-700 text-center bg-gray-100">
          Thông báo
        </div>
        <ul className="max-h-60 overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((notif) => (
              <li
                key={notif.id}
                className="px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer"
              >
                {notif.message}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-500">Không có thông báo mới</li>
          )}
        </ul>
      </div>
    </div>
  );
}
