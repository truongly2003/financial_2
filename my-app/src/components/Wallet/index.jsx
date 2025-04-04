import useWallet from "@/context/useWallet";
import { Wallet } from "lucide-react";
import { Link } from "react-router-dom";

function WalletCard() {
  const { wallets } = useWallet();
  return (
    <div className="w-full max-w-sm">
      <div className="rounded-lg bg-white p-5 shadow-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Ví</h2>
          <Link to="/wallet" className="text-sm font-medium text-blue-600">
            Xem tất cả
          </Link>
        </div>

        {/* Wallet Info */}
        <div className="flex items-center gap-3">
          <div className="bg-[#e3dac9] p-3 rounded-lg">
            <Wallet size={26} color="#8b5e3c" />
          </div>
          <div className="flex-1">
            {wallets
              .filter((wallet) => wallet.walletType === "1")
              .map((wallet, index) => (
                <div key={index} className="mb-2">
                  <p className="text-gray-500 text-sm">{wallet.walletName}</p>
                  <p className="text-green-600 text-lg font-bold mt-1">
                    {wallet.balance.toLocaleString("vi-VN")} {wallet.currency}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WalletCard;
