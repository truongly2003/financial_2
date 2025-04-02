// import PropTypes from "prop-types";
// import { Wallet } from "lucide-react";

// function WalletCard({ title, subtitle, balance, currency }) {
//   return (
//     <div className="bg-white p-4 rounded-2xl shadow-md flex items-center gap-4 w-full max-w-sm">
//       {/* Icon ví */}
//       <div className="bg-[#e3dac9] p-2 rounded-lg">
//         <Wallet size={24} color="#8b5e3c" />
//       </div>

//       {/* Thông tin ví */}
//       <div className="flex-1">
//         <h2 className="text-md font-semibold">{title}</h2>
//         <p className="text-gray-500 text-sm">{subtitle}</p>
//         <p className="text-green-600 text-lg font-bold mt-1">
//           +{balance.toLocaleString()} {currency}
//         </p>
//       </div>
//     </div>
//   );
// }

// WalletCard.propTypes = {
//   title: PropTypes.string.isRequired,
//   subtitle: PropTypes.string.isRequired,
//   balance: PropTypes.number.isRequired,
//   currency: PropTypes.string.isRequired,
// };

// export default WalletCard;

import { Wallet } from "lucide-react";

function WalletCard() {
  return (
    <div className=" bg-white p-4  shadow-md flex items-center gap-4 w-full max-w-sm">
      {/* Icon ví */}
      <div className="bg-[#e3dac9] p-2 rounded-lg">
        <Wallet size={24} color="#8b5e3c" />
      </div>

      {/* Thông tin ví */}
      <div className="flex-1">
        <h2 className="text-md font-semibold">Ví</h2>
        <p className="text-gray-500 text-sm">Tính thanh khoản</p>
        <p className="text-green-600 text-lg font-bold mt-1">50000đ</p>
      </div>
    </div>
  );
}

export default WalletCard;
