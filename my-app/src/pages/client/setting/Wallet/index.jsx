import React, { useState } from 'react';

function Wallet() {
  // Sử dụng useState để lưu trữ thông tin số dư ví và danh sách giao dịch
  const [balance, setBalance] = useState(1000); // Số dư ví
  const [transactions, setTransactions] = useState([
    { id: 1, description: 'Thêm tiền', amount: 500 },
    { id: 2, description: 'Chi tiêu mua sắm', amount: -200 },
    { id: 3, description: 'Tiền lương', amount: 1500 },
  ]);
  
  return (
    <div className="w-full max-w-sm mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Ví Của Tôi</h2>
      
      {/* Số dư ví */}
      <div className="bg-green-500 text-white p-4 rounded-lg text-center mb-6">
        <h3 className="text-xl">Số dư hiện tại:</h3>
        <p className="text-2xl font-bold">{balance.toLocaleString()} VNĐ</p>
      </div>
      
      {/* Danh sách giao dịch */}
      <div className="mb-4">
        <h4 className="text-lg font-semibold text-gray-800 mb-2">Danh sách giao dịch</h4>
        <ul className="space-y-2">
          {transactions.map(transaction => (
            <li key={transaction.id} className={`p-3 rounded-lg ${transaction.amount > 0 ? 'bg-green-100' : 'bg-red-100'}`}>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">{transaction.description}</span>
                <span className={`font-bold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {transaction.amount > 0 ? '+' : ''}{transaction.amount.toLocaleString()} VNĐ
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Wallet;
