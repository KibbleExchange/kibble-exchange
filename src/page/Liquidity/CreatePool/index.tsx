import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import {
  useGetAssetsQuery,
  useGetPoolsQuery,
  useGetWalletPoolsQuery,
} from "../../../store/api/dexApiSlice";
import { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ClickMaxAmount,
  ClickMaxAmountInner,
  SwapChoose,
  SwapChooseDefault,
  SwapContainer,
  SwapContent,
  SwapDetail,
  SwapDetailBlock,
  SwapDetailRow,
  SwapExchangeIcon,
  SwapHeader,
  SwapInput,
  SwapInputAsset,
  SwapInputTitle,
  SwapInputWrapper,
  SwapWrapper,
} from "../../Swap/styled";
import TitleCommon from "../../../components/Common/Title";
import ChooseToken from "../../Swap/ChooseToken";
import { TextResult } from "../../Swap/ChooseToken/styled";
import default_token_image from "../../../assets/Dashboard/Common/default-token-image.png";
import { InfoCircleOutlined, NotificationOutlined } from "@ant-design/icons";
import { CreatePoolHint, LiquidityBg } from "../Add/styled";
import { KIBBLE_API } from "../../../services/api";
import CreatePoolConfirm from "./Confirm";
import { CreatePoolCondition, CreatePoolHeader } from "./styled";
import { usePairBalances } from "../../../hooks/usePairBalances";
import { useSearchParams } from "react-router-dom";
import { Pool } from "../../../store/api/dexApiTypes";
import { Checkbox } from "antd";
import { Coins } from "ton3-core";
import swap_exchange from "../../../assets/Dashboard/Swap/swap_exchange.png";
import { Loader } from "../../../components/Loader";
import Loading from "../../../components/Loading";
import { ButtonCommon, ContextProviderWrapper, InputCommon, ModalOverlay, convertFixed } from "@kibble-exchange/uikit";
import close from "../../../assets/Dashboard/Common/close.svg";

const TON_ADDRESS: any = process.env.REACT_APP_TON_ADDRESS;
const KIBBLE_ADDRESS: any = process.env.REACT_APP_KIBBLE_ADDRESS;

export type SwapAction = "offer" | "ask";

const CreatePoolLiquidity = () => {
  const walletAddress = useTonAddress();
  const [open0Modal, setOpen0Modal] = useState(false);
  const [open1Modal, setOpen1Modal] = useState(false);
  const address: any = useTonAddress();
  const [loadingWaitPool, setLoadingWaitPool] = useState(false);

  const { data: assets } = useGetAssetsQuery(
    address ? address?.toString() : undefined
  );
  const { data: pools } = useGetPoolsQuery(undefined, {});

  const [searchParams] = useSearchParams();
  let t0 = searchParams.get("t0");
  let t1 = searchParams.get("t1");

  const getSelectedFromLocal = JSON.parse(
    localStorage.getItem("selectedTokens") || "{}"
  );

  const [token0Address, setToken0Address] = useState(
    t0 || getSelectedFromLocal.from
  );
  const [token1Address, setToken1Address] = useState(
    t1 || getSelectedFromLocal.to
  );

  const [token0Amount, setToken0Amount] = useState(0);
  const [token1Amount, setToken1Amount] = useState(0);

  const { token0Balance, token1Balance } = usePairBalances({
    token0Address: token0Address,
    token1Address: token1Address,
  });

  const poolByAssetsAddressesHashMap = new Map<string, Map<string, Pool>>();
  for (const pool of pools || []) {
    if (!poolByAssetsAddressesHashMap.has(pool.token0_address)) {
      poolByAssetsAddressesHashMap.set(pool.token0_address, new Map());
    }
    if (!poolByAssetsAddressesHashMap.has(pool.token1_address)) {
      poolByAssetsAddressesHashMap.set(pool.token1_address, new Map());
    }
    poolByAssetsAddressesHashMap
      .get(pool.token0_address)
      ?.set(pool.token1_address, pool);
    poolByAssetsAddressesHashMap
      .get(pool.token1_address)
      ?.set(pool.token0_address, pool);
  }

  useEffect(() => {
    t0 = token0Address;
    t1 = token1Address;
    const url = new URL(window.location.toString());
    url.searchParams.set("t0", t0 || TON_ADDRESS);
    url.searchParams.set("t1", t1 || KIBBLE_ADDRESS);
  
    // Updated selectedTokens
    const selectedTokens = {
      from: token0Address,
      to: token1Address,
    };

    localStorage.setItem("selectedTokens", JSON.stringify(selectedTokens));
  }, [token0Address, token1Address]);

  const { data: poolsWithBalance } = useGetWalletPoolsQuery(
    address?.toString() || "",
    {
      skip: address === "",
    }
  );

  const asset0: any = assets && assets[token0Address];

  const asset1: any = assets && assets[token1Address];

  let poolWithBalance = null;
  for (const pool of poolsWithBalance ?? []) {
    if (
      (pool.token0_address === asset0?.contract_address &&
        pool.token1_address === asset1?.contract_address) ||
      (pool.token0_address === asset1?.contract_address &&
        pool.token1_address === asset0?.contract_address)
    ) {
      poolWithBalance = pool;
      break;
    }
  }

  const pool =
    poolWithBalance ??
    poolByAssetsAddressesHashMap
      .get(asset0?.contract_address ?? "")
      ?.get(asset1?.contract_address ?? "");

  const needsCompletion =
    pool && (pool.token0_balance > 0 || pool.token1_balance > 0);

  const { setValue, control } = useForm({ mode: "onChange" });

  setValue("token0", token0Amount);
  setValue("token1", token1Amount);

  const covertValueInput = (normValue: any) => {
    normValue = normValue.replaceAll(",", ".");
    normValue = normValue.replace(/[^0-9\.]+/g, "");
    normValue = normValue.replace(/^0+/, "0");
    normValue = normValue.replace(/\.+$/, ".");
    normValue = normValue.replace(/^\./, "0.");
    normValue = normValue.replace(/^0(\d+)/, "$1");
    if (normValue.split(".").length - 1 > 1) {
      normValue = normValue.replace(".", ",");
      normValue = normValue.replaceAll(".", "");
      normValue = normValue.replace(",", ".");
    }
    return normValue;
  };

  const handleSendValue = (e: any) => {
    if (
      e.target.value &&
      typeof Number(e.target.value) === "number" &&
      Number(e.target.value) >= 0
    ) {
      let { value } = e.target;
      value = covertValueInput(value);
      setToken0Amount(value);
    } else {
      setToken0Amount(0);
    }
  };

  const handleReceiveValue = (e: any) => {
    if (
      e.target.value &&
      typeof Number(e.target.value) === "number" &&
      Number(e.target.value) >= 0
    ) {
      let { value } = e.target;
      value = covertValueInput(value);
      setToken1Amount(value);
    }
  };

  // const handle Create Pool
  const [infoConfirm, setInfoConfirm] = useState<any>({});
  const [confirmState, setConfirmState] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [agreeCondition, setAgreeCondition] = useState(false);

  const handleCreatePoolConfirm = async () => {
    setLoading(true);
    const params = {
      wallet_address: walletAddress,
      token_a:
        token0Address === TON_ADDRESS
          ? "EQCM3B12QK1e4yZSf8GtBRT0aLMNyEsBc_DhVfRRtOEffLez"
          : token0Address,
      token_a_units: (token0Amount * Math.pow(10, asset0?.decimals)).toString(),
      token_b: token1Address,
      token_b_units: (token1Amount * Math.pow(10, asset1?.decimals)).toString(),
    };
    try {
      const res = await KIBBLE_API.simulateCreatePool(params);
      if (res.status === 200 && res) {
        setInfoConfirm(res.data.result);
        setConfirmState(true);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (token0Amount > 0 && token1Amount > 0) {
      handleCreatePoolConfirm();
    } else {
      setConfirmState(false);
      setAgreeCondition(false);
    }
  }, [token0Amount, token1Amount]);

  const handleAgreeCondition = (e: any) => {
    setAgreeCondition(e.target.checked);
  };

  // Check balance
  const [tonConnectUI] = useTonConnectUI();
  const isEnoughBalance = () => {
    if (!asset0 || !asset1 || !tonConnectUI.connected) {
      return false;
    }

    let minRequiredTonBalance;
    if (needsCompletion) minRequiredTonBalance = 0.3;
    else minRequiredTonBalance = 0.6;

    if (TON_ADDRESS === asset0.contract_address) {
      minRequiredTonBalance += token0Amount;
    } else if (TON_ADDRESS === asset1.contract_address) {
      minRequiredTonBalance += token1Amount;
    }

    let enoughToken0Balance = true;
    let enoughToken1Balance = true;

    if (
      token0Amount &&
      Number(token0Amount.toString()) > Number(token0Balance.toString())
    ) {
      enoughToken0Balance = false;
    }
    if (
      token1Amount &&
      Number(token1Amount.toString()) > Number(token1Balance.toString())
    ) {
      enoughToken1Balance = false;
    }

    return enoughToken0Balance && enoughToken1Balance;
  };
  const { isMobile, theme } = useContext(ContextProviderWrapper)!;

  const [listFavorite, setListFavorite] = useState<any>([]);

  const swapFromTo = () => {
    setToken0Address(token1Address);
    setToken1Address(token0Address);
    setToken0Amount(token1Amount);
    setToken1Amount(token0Amount);
  };

  return (
    <LiquidityBg>
      <SwapContainer id="create-pool">
        {false ? (
          <>
            <SwapWrapper className={theme}>
              <SwapHeader>
                <TitleCommon text={"Initialize pool"} />
              </SwapHeader>
              <Loader />
            </SwapWrapper>
          </>
        ) : (
          <>
            <SwapWrapper className={theme}>
              <CreatePoolHeader>
                <SwapHeader>
                  <TitleCommon text={"Initialize pool"} />
                </SwapHeader>
                <CreatePoolHint className={theme}>
                  <InfoCircleOutlined
                    style={{
                      marginRight: "10px",
                    }}
                  />
                  Set the tokens ratio to see the pair price for new pool
                </CreatePoolHint>
              </CreatePoolHeader>
              <SwapContent>
                <SwapInput className="exchange">
                  <SwapInputTitle>
                    <SwapInputAsset>Asset 1</SwapInputAsset>
                    <ClickMaxAmount>
                      {!isMobile && "Balance:"}{" "}
                      {convertFixed(Number(token0Balance.toString()))} |{" "}
                      <span
                        onClick={() => {
                          setToken0Amount(Number(token0Balance.toString()));
                        }}
                      >
                        MAX
                      </span>
                    </ClickMaxAmount>
                  </SwapInputTitle>
                  <SwapInputWrapper
                    className={theme}
                    style={{
                      cursor: address ? "pointer" : "not-allowed",
                    }}
                    active={token0Amount > 0}
                  >
                    <SwapChoose
                      className={theme}
                      onClick={() => {
                        setOpen0Modal(true);
                      }}
                    >
                      <SwapChooseDefault className={theme}>
                        {asset0 ? (
                          <>
                            <img
                              src={asset0?.image_url}
                              alt="icon"
                              onError={(e) =>
                                (e.currentTarget.src = default_token_image)
                              }
                            />
                            <p>{asset0?.symbol}</p>
                          </>
                        ) : (
                          <TextResult>Loading...</TextResult>
                        )}
                      </SwapChooseDefault>
                    </SwapChoose>
                    {/* Input 0 */}
                    <Controller
                      name="token0"
                      control={control}
                      render={({ field }: any) => (
                        <InputCommon
                          {...field}
                          disabled={
                            address ? false : needsCompletion ? true : true
                          }
                          type="number"
                          onChange={handleSendValue}
                          value={token0Amount || ""}
                          placeHolder="0"
                        />
                      )}
                    />
                    {/* ---------- */}
                  </SwapInputWrapper>
                </SwapInput>
                <SwapExchangeIcon
                  className={theme}
                  onClick={async () => {
                    swapFromTo();
                  }}
                >
                  <img src={swap_exchange} alt="exchange" />
                </SwapExchangeIcon>
                <SwapInput>
                  <SwapInputTitle>
                    <SwapInputAsset>Asset 2</SwapInputAsset>
                    <ClickMaxAmount>
                      <ClickMaxAmountInner>
                        {!isMobile && "Balance:"}{" "}
                        <span>
                          {convertFixed(Number(token1Balance.toString()))} |
                        </span>
                      </ClickMaxAmountInner>
                      <span
                        onClick={() => {
                          setToken1Amount(Number(token1Balance.toString()));
                        }}
                      >
                        MAX
                      </span>
                    </ClickMaxAmount>
                  </SwapInputTitle>
                  <SwapInputWrapper
                    className={theme}
                    style={{
                      cursor: address ? "pointer" : "not-allowed",
                    }}
                    active={token1Amount > 0}
                  >
                    <SwapChoose
                      className={theme}
                      onClick={() => {
                        setOpen1Modal(true);
                      }}
                    >
                      <SwapChooseDefault className={theme}>
                        {asset1 ? (
                          <>
                            <img
                              src={asset1?.image_url}
                              alt="icon"
                              onError={(e) =>
                                (e.currentTarget.src = default_token_image)
                              }
                            />
                            <p>{asset1?.symbol}</p>
                          </>
                        ) : (
                          <TextResult>Loading...</TextResult>
                        )}
                      </SwapChooseDefault>
                    </SwapChoose>
                    {/* Input 1 */}
                    <Controller
                      name="token1"
                      control={control}
                      render={({ field }: any) => (
                        <InputCommon
                          {...field}
                          disabled={
                            address ? false : needsCompletion ? true : true
                          }
                          onChange={handleReceiveValue}
                          value={token1Amount || ""}
                          placeHolder="0"
                          type="number"
                        />
                      )}
                    />
                    {/* ------- */}
                  </SwapInputWrapper>
                </SwapInput>
                {confirmState && infoConfirm !== undefined && (
                  <SwapDetail
                    style={{
                      marginBottom: "20px",
                    }}
                  >
                    <SwapDetailBlock>
                      <SwapDetailRow className={theme}>
                        <p>Min {asset0?.symbol}</p>
                        <p>
                          {token0Amount > 0 && infoConfirm !== undefined
                            ? convertFixed(
                                Number(
                                  Coins.fromNano(
                                    infoConfirm && infoConfirm?.token_a_units,
                                    asset0 && asset0?.decimals
                                  )
                                )
                              )
                            : ""}{" "}
                          {asset0?.symbol}
                        </p>
                      </SwapDetailRow>
                      <SwapDetailRow className={theme}>
                        <p>Min {asset1?.symbol}</p>
                        <p>
                          {token1Amount > 0 && infoConfirm !== undefined
                            ? convertFixed(
                                Number(
                                  Coins.fromNano(
                                    infoConfirm && infoConfirm?.token_b_units,
                                    asset1 && asset1?.decimals
                                  )
                                )
                              )
                            : ""}{" "}
                          {asset1?.symbol}
                        </p>
                      </SwapDetailRow>
                      <SwapDetailRow className={theme}>
                        <p>Blockchain Fee:</p>
                        <p>0.3-1.6 TON</p>
                      </SwapDetailRow>
                    </SwapDetailBlock>
                  </SwapDetail>
                )}
                <CreatePoolHint className={theme}>
                  <NotificationOutlined
                    style={{
                      color: "#92929E",
                      fontWeight: "bold",
                      fontSize: "16px",
                      marginRight: "10px",
                      position: "relative",
                      top: "1px",
                    }}
                  />
                  You create a pool with {asset0 && asset0?.symbol} and{" "}
                  {asset1 && asset1?.symbol} at your own risk. Anyone can create
                  an asset, including fake versions of existing assets
                </CreatePoolHint>
                <>
                  {confirmState && (
                    <CreatePoolCondition className={theme}>
                      <Checkbox onChange={handleAgreeCondition}>
                        I accept that all amount in the following steps never be
                        returned due to pool initialization
                      </Checkbox>
                    </CreatePoolCondition>
                  )}
                  {isEnoughBalance() ? (
                    <>
                      <ButtonCommon
                        disabled={
                          !agreeCondition ||
                          !address ||
                          isLoading ||
                          !asset0 ||
                          !asset1
                        }
                        onClick={() => {
                          setConfirmModal(true);
                        }}
                      >
                        <Loading
                          status={isLoading}
                          content={
                            isLoading ? "Calculating" : "Initialize pool"
                          }
                        />
                      </ButtonCommon>
                    </>
                  ) : (
                    <>
                      <ButtonCommon disabled>
                        insufficient {asset0?.symbol} or {asset1?.symbol}{" "}
                        balance
                      </ButtonCommon>
                    </>
                  )}
                </>
              </SwapContent>
            </SwapWrapper>
          </>
        )}
      </SwapContainer>
      <ModalOverlay
        component={
          <ChooseToken
            isFromModal={true}
            otherCurrentAssetKey={token1Address}
            setCurrentAsset={setToken0Address}
            setOtherCurrentAsset={setToken1Address}
            setOpenFromModal={setOpen0Modal}
            // set Amount
            setAmountFrom={setToken0Amount}
            setAmountTo={setToken1Amount}
            // Check add liq
            isLiq={true}
            isModal={1}
            // favorite
            setListFavorite={setListFavorite}
            listFavorite={listFavorite}
          />
        }
        open={open0Modal}
        setOpen={setOpen0Modal}
        title={"Select a token"}
        width="400px"
        closeIcon={close}
      />
      <ModalOverlay
        component={
          <ChooseToken
            isFromModal={true}
            otherCurrentAssetKey={token0Address}
            setCurrentAsset={setToken1Address}
            setOpenFromModal={setOpen1Modal}
            // set Amount
            setAmountFrom={setToken0Amount}
            setAmountTo={setToken1Amount}
            // Check add liq
            isLiq={true}
            isModal={2}
            // favorite
            setListFavorite={setListFavorite}
            listFavorite={listFavorite}
          />
        }
        open={open1Modal}
        setOpen={setOpen1Modal}
        title={"Select a token"}
        width="400px"
        closeIcon={close}
      />
      <ModalOverlay
        component={
          <CreatePoolConfirm
            pools={pools}
            assets={assets}
            infoConfirm={confirmState && infoConfirm}
            token0Amount={token0Amount}
            token1Amount={token1Amount}
            asset0={asset0}
            asset1={asset1}
            confirmModal={confirmModal}
            setLoadingWaitPool={setLoadingWaitPool}
            loadingWaitPool={loadingWaitPool}
          />
        }
        open={confirmModal}
        setOpen={setConfirmModal}
        title={"Creating Pool"}
        width="450px"
        closeIcon={close}
      />
    </LiquidityBg>
  );
};

export default CreatePoolLiquidity;
