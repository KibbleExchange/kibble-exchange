import { useTonAddress, useTonWallet } from "@tonconnect/ui-react";
import { Coins } from "ton3-core";
import {
  useGetAssetsQuery,
  useGetBalancesQuery,
} from "../store/api/dexApiSlice";

const TON_ADDRESS: any = process.env.REACT_APP_TON_ADDRESS;
const KIB_ADDRESS: any = process.env.REACT_APP_KIBBLE_ADDRESS;

export interface Balance {
  tonBalance: Coins;
  tgrBalance: Coins;
}

export const useBalance = () => {
  const wallet = useTonWallet();
  const walletAddress = useTonAddress();

  const { data: assets } = useGetAssetsQuery();

  const { data: balances } = useGetBalancesQuery(walletAddress, {
    pollingInterval: 1000 * 20,
    skip: !wallet,
  });

  if (!balances || !assets) {
    return {
      tonBalance: Coins.fromNano(0, 9),
      tgrBalance: Coins.fromNano(0, 9),
    };
  }

  return {
    tonBalance: Coins.fromNano(
      balances[TON_ADDRESS] ?? 0,
      assets[TON_ADDRESS]?.decimals
    ),
    tgrBalance: Coins.fromNano(
      balances[KIB_ADDRESS] ?? 0,
      assets[KIB_ADDRESS]?.decimals ?? 9
    ),
  };
};
