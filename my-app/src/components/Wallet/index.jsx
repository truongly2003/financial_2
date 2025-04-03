import useWallet from "@/context/useWallet";
import { Wallet } from "lucide-react";
function WalletCard() {
  const { wallets } = useWallet();
  return (
    <div className="rounded-lg bg-white p-4  shadow-md flex items-center gap-4 w-full max-w-sm">
      <div className="bg-[#e3dac9] p-2 rounded-lg">
        <Wallet size={24} color="#8b5e3c" />
      </div>
      <div className="flex-1">
        {wallets
          .filter((wallet) => wallet.walletType === "1")
          .map((wallet, index) => (
            <div key={index}>
              <h2 className="text-md font-semibold">Ví</h2>
              <p className="text-gray-500 text-sm">{wallet.walletName}</p>
              <p className="text-green-600 text-lg font-bold mt-1">
                {wallet.balance.toLocaleString("vi-VN")} {wallet.currency}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default WalletCard;
