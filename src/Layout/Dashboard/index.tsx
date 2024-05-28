import { Outlet } from "react-router-dom";
import HeaderDashboard from "../../components/Header/Dashboard";
import { DashboardContainer } from "./styled";
import { useAuth } from "../../hooks/useAuth";
import { useDispatch } from "../../store/store";
import { useEffect, useState } from "react";
import { KIBBLE_API } from "../../services/api";
import {
  getDataAllPools,
  getDataPoolsWallet,
} from "../../store/features/poolsSlice";
import { getDataAllAssets } from "../../store/features/assetsSlice";
import { useTonAddress } from "@tonconnect/ui-react";
import { useGetPoolsQuery, useGetWalletPoolsQuery } from "../../store/api/dexApiSlice";

const TON_ADDRESS: any = process.env.REACT_APP_TON_ADDRESS;
const KIBBLE_ADDRESS: any = process.env.REACT_APP_KIBBLE_ADDRESS;

const LayoutDashboard = () => {

  useAuth();

  const address = useTonAddress();
  const dispatch = useDispatch();

  const [assets, setAssets] = useState([]);
  const handleGetAllAsset = async () => {
    try {
      const res = await KIBBLE_API.getAllAssets(false);
      if (res.status === 200) {
        setAssets(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [allPools, setAllPools] = useState<any>([]);
  const {
    data: pools,
    isLoading: loadingPools,
  } = useGetPoolsQuery();

  useEffect(() => {
    if (allPools.length < 1 && pools) {
      setAllPools(pools)
    }
  },[loadingPools])

  const { data: poolsWallet, isLoading: loadingPoolsWallet } =
    useGetWalletPoolsQuery(address?.toString() || "", {
      skip: address === "",
      pollingInterval: 1000 * 60,
    });

  useEffect(() => {
    handleGetAllAsset();
  }, []);

  useEffect(() => {
    if (allPools.length > 0) {
      dispatch(getDataAllPools(allPools));
    }
  }, [allPools]);

  useEffect(() => {
    if (assets.length > 0) {
      dispatch(getDataAllAssets(assets));
    }
  }, [assets]);

  useEffect(() => {
    if (!loadingPoolsWallet) {
      dispatch(getDataPoolsWallet(poolsWallet));
    }
  }, [loadingPoolsWallet]);

  useEffect(() => {
    // Save from and to to localStorage
    const getSelectedFromLocal = JSON.parse(
      localStorage.getItem("selectedTokens") || "{}"
    );
    const selectedTokens = {
      from: getSelectedFromLocal.from || TON_ADDRESS,
      to: getSelectedFromLocal.to || KIBBLE_ADDRESS,
    };
    localStorage.setItem("selectedTokens", JSON.stringify(selectedTokens));
  }, []);

  return (
    <>
      <HeaderDashboard />
      <DashboardContainer>
        <Outlet />
      </DashboardContainer>
    </>
  );
};
export default LayoutDashboard;
