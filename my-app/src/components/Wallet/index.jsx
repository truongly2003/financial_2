import useWallet from "@/context/useWallet";
import { Link } from "react-router-dom";

function WalletCard() {
  const { wallets } = useWallet();
  return (
    <div className="">
      {/* <div className="rounded-lg bg-white p-2 shadow-md">
      
        <div className="flex justify-between items-center ">
          <h2 className="text-lg font-semibold">Ví</h2>
         
        </div>

    
        <div className="flex items-center gap-3">
          <div className="text-purple-500">
            <Wallet size={26}  />
          </div>
          <div className="flex-1">
            {wallets
              .filter((wallet) => wallet.walletType === "1")
              .map((wallet, index) => (
                <div key={index} className="">
                  <p className="text-gray-500 text-sm">{wallet.walletName}</p>
                  <p className="text-green-600 text-lg font-bold mt-1">
                    {wallet.balance.toLocaleString("vi-VN")} {wallet.currency}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div> */}
      <div className="bg-purple-500 p-4 rounded-xl">
        <div className="mb-3 flex justify-between content-center">
          <h2 className="text-white font-semibold text-lg ">My Wallet</h2>
          <Link to="/wallet" className="text-sm font-medium text-white">
            All wallet
          </Link>
        </div>
        <div className="bg-purple-400/50 rounded-xl flex items-center space-x-4 p-4">
          <div className="bg-purple-300 p-2 rounded-full">
            <svg
              className="w-8 h-8 text-blue-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M2 7c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v2H2V7zm0 4h20v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6zm14 2a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2h-2z" />
            </svg>
          </div>
          <div>
            {wallets
              .filter((wallet) => wallet.walletType === "1")
              .map((wallet, index) => (
                <div key={index} className="">
                  <p className="text-white font-medium">{wallet.walletName}</p>
                  <p className="text-white text-lg font-semibold">
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
