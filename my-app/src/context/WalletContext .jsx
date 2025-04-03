import { createContext, useCallback, useEffect, useState } from "react";
import { getAllWallet } from "@/services/WalletService";
import useAuth from "@/context/useAuth";
import PropTypes from "prop-types";

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const { userId } = useAuth();
  const [wallets, setWallets] = useState([]);
  const [selectedWalletId, setSelectedWalletId] = useState(null);
  const fetchWallets = useCallback(async () => {
    if (!userId) return;
    const res = await getAllWallet(userId);
    if (res) {
      setWallets(res);
      const defaultWallet = res.find((wallet) => wallet.walletType === "1");
      if (defaultWallet) {
        setSelectedWalletId(defaultWallet.id);
      }
    }
  },[userId])
  useEffect(() => {
    fetchWallets();
  }, [fetchWallets]);

  return (
    <WalletContext.Provider
      value={{ wallets, selectedWalletId, setSelectedWalletId,fetchWallets }}
    >
      {children}
    </WalletContext.Provider>
  );
};
export default WalletContext;

WalletProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
