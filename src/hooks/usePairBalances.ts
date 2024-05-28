import { useTonAddress, useTonWallet } from "@tonconnect/ui-react";
import {
  useGetAssetsQuery,
  useGetBalancesQuery,
} from "../store/api/dexApiSlice";
import { Coins } from "ton3-core";

export interface PairData {
  token0Address?: string;
  token1Address?: string;
}

export interface usePairBalancesData {
  token0Balance: Coins;
  token1Balance: Coins;
}

export const usePairBalances = (data: PairData) => {
  const wallet = useTonWallet();
  const walletAddress = useTonAddress();

  const { data: assets } = useGetAssetsQuery();

  const { data: balances } = useGetBalancesQuery(walletAddress, {
    pollingInterval: 1000 * 20,
    skip: !wallet,
  });

  if (!balances || !assets) {
    return {
      token0Balance: Coins.fromNano(0, 9),
      token1Balance: Coins.fromNano(0, 9),
    };
  }

  if (
    !data.token0Address ||
    !data.token1Address ||
    !balances ||
    !assets
    // &&
    // !addedToken
  ) {
    return {
      token0Balance: Coins.fromNano(0, 9),
      token1Balance: Coins.fromNano(0, 9),
    };
  } else if (data.token0Address && !data.token1Address) {
    return {
      token0Balance: Coins.fromNano(
        balances[data.token0Address] ?? 0,
        assets[data.token0Address]?.decimals
      ),
      token1Balance: Coins.fromNano(0, 9),
    };
  } else if (!data.token0Address && data.token1Address) {
    return {
      token0Balance: Coins.fromNano(0, 9),
      token1Balance: Coins.fromNano(
        balances[data.token1Address] ?? 0,
        assets[data.token1Address]?.decimals
      ),
    };
  }

  const getBalance = (address?: string) => {
    if (!address) {
      return Coins.fromNano(0, 9);
    }
    const balance = balances[address] ?? 0;
    const decimals = assets[address]?.decimals ?? 9;
    return Coins.fromNano(balance, decimals);
  };

  const token0Balance = getBalance(data.token0Address);
  const token1Balance = getBalance(data.token1Address);

  return {
    token0Balance,
    token1Balance,
  };
};
