import {
  useTonAddress,
  useTonConnectUI,
  useTonWallet,
} from "@tonconnect/ui-react";
import { useRouteAssets } from "../../../hooks/useRouteAssets";
import {
  useGetWalletPoolsQuery,
  useSimulateAddLiquidityQuery,
} from "../../../store/api/dexApiSlice";
import { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Coins } from "ton3-core";
import { useDebounce } from "../../../hooks/useDebounce";
import {
  BlockToolTip,
  ClickMaxAmount,
  ClickMaxAmountInner,
  ContentToolTip,
  SwapChoose,
  SwapChooseDefault,
  SwapContainer,
  SwapContent,
  SwapDetail,
  SwapDetailBlock,
  SwapDetailRow,
  SwapExchangeIcon,
  SwapExtension,
  SwapHeader,
  SwapInput,
  SwapInputAsset,
  SwapInputTitle,
  SwapInputWrapper,
  SwapWrapper,
} from "../../Swap/styled";
import TitleCommon from "../../../components/Common/Title";
import wallet_icon from "../../../assets/Dashboard/Swap/wallet_icon.svg";
import ChooseToken from "../../Swap/ChooseToken";
import SettingSwap from "../../Swap/Setting";
import { TextResult } from "../../Swap/ChooseToken/styled";
import default_token_image from "../../../assets/Dashboard/Common/default-token-image.png";
import { LiquidityBg, LiquidityHeader, SeparateBlock } from "./styled";
import ConfirmAddLiquidity from "./Confirm";
import { useBalance } from "../../../hooks/useBalance";
import Loading from "../../../components/Loading";
import doc_light from "../../../assets/Dashboard/Swap/doc_light.svg";
import settings_light from "../../../assets/Dashboard/Swap/settings_light.svg";
import settings_active from "../../../assets/Dashboard/Swap/settings_active.svg";
import doc_active from "../../../assets/Dashboard/Swap/doc_active.svg";
import close from "../../../assets/Dashboard/Common/close.svg";
import doc from "../../../assets/Dashboard/Swap/doc.svg";
import settings from "../../../assets/Dashboard/Swap/settings.svg";
import swap_exchange from "../../../assets/Dashboard/Swap/swap_exchange.png";
import { Loader } from "../../../components/Loader";
import icnToolTip from "../../../assets/Dashboard/Common/icn_tooltip.svg";
import { ButtonCommon, ContextProviderWrapper, InputCommon, ModalOverlay, convertFixed, fieldNormalizer, toFixedWithoutRounding } from "@kibble-exchange/uikit";

const TON_ADDRESS: any = process.env.REACT_APP_TON_ADDRESS;

export type SwapAction = "offer" | "ask";
const INPUT_DEBOUNCE = 1000;

const AddLiquidity = () => {
  const [tonConnectUI] = useTonConnectUI();
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const wallet = useTonWallet();
  const [open0Modal, setOpen0Modal] = useState(false);
  const [open1Modal, setOpen1Modal] = useState(false);

  const {
    token0Address,
    setToken0Address,
    token1Address,
    setToken1Address,
    token0Balance,
    token1Balance,
    token0Amount,
    setToken0Amount,
    token1Amount,
    setToken1Amount,
    assets,
    poolByAssetsAddressesHashMap,
  } = useRouteAssets();

  const address = useTonAddress();

  const { data: poolsWithBalance } = useGetWalletPoolsQuery(
    address?.toString() || "",
    {
      skip: address === "",
    }
  );

  const [share, setShare] = useState(0);
  const [minExpectedTokens, setMinExpectedTokens] = useState(0);
  const [expectedTokens, setExpectedTokens] = useState(0);

  const [slippageTolerance, setSlippageTolerance] = useState(0.5);

  const [lastUpdated, setLastUpdated] = useState<"token0" | "token1">("token0");
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

  const token0PoolBalance = Coins.fromNano(
    (pool?.token0_address === asset0?.contract_address
      ? pool?.token0_balance ?? 0
      : pool?.token1_balance) ?? 0,
    asset0?.decimals ?? 9
  ).toString();

  const token1PoolBalance = Coins.fromNano(
    (pool?.token1_address === asset1?.contract_address
      ? pool?.token1_balance ?? 0
      : pool?.token0_balance) ?? 0,
    asset1?.decimals ?? 9
  ).toString();

  setValue("token0", token0Amount);
  setValue("token1", token1Amount);

  const {
    data: simulateData,
    isLoading,
    isFetching,
  } = useSimulateAddLiquidityQuery(
    {
      token0_address: asset0?.contract_address ?? "",
      token1_address: asset1?.contract_address ?? "",
      token0_amount:
        lastUpdated === "token0"
          ? new Coins(needsCompletion ? token0PoolBalance : token0Amount, {
              decimals: asset0?.decimals || 9,
            })
              .toNano()
              .toString()
          : "0",
      token1_amount:
        lastUpdated === "token1"
          ? new Coins(needsCompletion ? token1PoolBalance : token1Amount, {
              decimals: asset1?.decimals || 9,
            })
              .toNano()
              .toString()
          : "0",
      slippage_tolerance: slippageTolerance,
      user_wallet_address: address,
      lp_account_address: pool?.lp_account_address,
    },
    {
      skip: !asset0 || !asset1,
      // (token0Amount === 0 && token1Amount === 0 && !needsCompletion),
      // pollingInterval: 10000,
    }
  );

  const currentShareOfPool =
    pool && pool.lp_balance && pool.lp_total_supply
      ? (pool?.lp_balance / pool?.lp_total_supply) * 100
      : 0;

  const updateAmounts = (asset: "token0" | "token1", amount: number) => {
    if (typeof amount !== "number" || amount <= 0 || Number.isNaN(amount)) {
      amount = 0;
      setToken0Amount(0);
      setToken1Amount(0);
    }
    if (asset === "token0") {
      setLastUpdated("token0");
      setToken0Amount(Number(amount.toFixed(asset0?.decimals ?? 6)));
    } else {
      setLastUpdated("token1");
      setToken1Amount(Number(amount.toFixed(asset1?.decimals ?? 6)));
    }
  };
  const debouncedUpdateAmounts = useDebounce(updateAmounts, INPUT_DEBOUNCE);

  useEffect(() => {
    if (!simulateData) {
      return;
    }

    setToken0Amount(
      Number(
        Coins.fromNano(simulateData?.token0_amount, asset0?.decimals).toString()
      )
    );
    setToken1Amount(
      Number(
        Coins.fromNano(simulateData?.token1_amount, asset1?.decimals).toString()
      )
    );
    setShare(simulateData?.estimated_share_of_pool);
    setMinExpectedTokens(simulateData?.min_expected_tokens);
    setExpectedTokens(simulateData?.expected_tokens);
  }, [simulateData]);

  const handleSendValue = (e: any) => {
    fieldNormalizer(
      "token0",
      e.target.value || "0",
      setValue,
      asset0?.decimals
    );
    debouncedUpdateAmounts("token0", parseFloat(e.target.value));
  };

  const handleResetValueFrom = (e: any) => {
    let { value } = e.target;
    if (value === 0 || value === "0") {
      fieldNormalizer("token0", "", setValue, asset0?.decimals);
      debouncedUpdateAmounts("token0", parseFloat(e.target.value));
    }
  };

  const handleReceiveValue = (e: any) => {
    fieldNormalizer(
      "token1",
      e.target.value || "0",
      setValue,
      asset1?.decimals
    );
    debouncedUpdateAmounts("token1", parseFloat(e.target.value));
  };

  const handleResetValueReceive = (e: any) => {
    let { value } = e.target;
    if (value === 0 || value === "0") {
      fieldNormalizer("token1", "", setValue, asset1?.decimals);
      debouncedUpdateAmounts("token1", parseFloat(e.target.value));
    }
  };

  // Check enough balance
  const { tonBalance } = useBalance();
  const needsActivation = simulateData?.action === "direct_add_provide";
  const isEnoughBalance = () => {
    if (!asset0 || !asset1 || !tonConnectUI.connected) {
      return false;
    }

    let minRequiredTonBalance;
    if (needsActivation || needsCompletion) minRequiredTonBalance = 0.3;
    else minRequiredTonBalance = 0.6;

    if (TON_ADDRESS === asset0.contract_address) {
      minRequiredTonBalance += token0Amount;
    } else if (TON_ADDRESS === asset1.contract_address) {
      minRequiredTonBalance += token1Amount;
    }

    const enoughTonBalance = tonBalance.gte(
      new Coins(minRequiredTonBalance.toFixed(9), {
        decimals: 9,
      })
    );

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

    if (needsActivation) return enoughTonBalance;
    if (needsCompletion)
      return (
        enoughTonBalance &&
        (asset0.contract_address === simulateData?.send_token_address
          ? enoughToken0Balance
          : enoughToken1Balance)
      );

    return enoughTonBalance && enoughToken0Balance && enoughToken1Balance;
  };

  const [activeFilter, setActiveFilter] = useState(1);
  const { isMobile, theme } = useContext(ContextProviderWrapper)!;
  const listExtensions = [
    {
      id: 1,
      icon: theme === "light" ? doc_light : doc_active,
      activeIcon: doc,
    },
    {
      id: 2,
      icon: theme === "light" ? settings_light : settings,
      activeIcon: settings_active,
    },
  ];

  const [switchState, setSwitchState] = useState(false);

  const handleSwitchTabs = () => {
    switch (activeFilter) {
      case 1:
        return (
          <SwapContent>
            <SwapInput className={`exchange ${theme}`}>
              <SwapInputTitle className={theme}>
                <SwapInputAsset>
                  Asset <span className="font-DMMono">1</span>
                </SwapInputAsset>
                <ClickMaxAmount>
                  {!isMobile && "Balance:"}{" "}
                  {convertFixed(Number(token0Balance.toString()))} |{" "}
                  <span
                    onClick={() => {
                      setToken0Amount(Number(token0Balance.toString()));
                      const result: any =
                        token0Address ===
                        TON_ADDRESS
                          ? toFixedWithoutRounding(
                              Number(token0Balance.toString()) - 0.6,
                              Number(assets && asset0?.decimals)
                            )
                          : toFixedWithoutRounding(
                              Number(token0Balance.toString()) - 0.31,
                              Number(assets && asset0?.decimals)
                            );
                      debouncedUpdateAmounts(
                        "token0",
                        parseFloat(result.toString())
                      );
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
                        !address || !token0Balance
                          ? true
                          : needsCompletion
                          ? true
                          : isFetching
                          ? true
                          : false
                      }
                      onChange={handleSendValue}
                      onFocus={handleResetValueFrom}
                      placeHolder={"0"}
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
            <SwapInput className={theme}>
              <SwapInputTitle>
                <SwapInputAsset>
                  Asset <span className="font-DMMono">2</span>
                </SwapInputAsset>
                <ClickMaxAmount>
                  <ClickMaxAmountInner>
                    {!isMobile && "Balance:"}{" "}
                    {convertFixed(Number(token1Balance.toString()))} |
                  </ClickMaxAmountInner>
                  <span
                    onClick={() => {
                      setToken1Amount(Number(token1Balance.toString()));
                      const result: any =
                        token1Address ===
                        TON_ADDRESS
                          ? toFixedWithoutRounding(
                              Number(token1Balance.toString()) - 0.6,
                              Number(assets && asset1?.decimals)
                            )
                          : toFixedWithoutRounding(
                              Number(token1Balance.toString()) - 0.31,
                              Number(assets && asset1?.decimals)
                            );
                      debouncedUpdateAmounts(
                        "token1",
                        parseFloat(result.toString())
                      );
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
                        !address || !token0Balance
                          ? true
                          : needsCompletion
                          ? true
                          : isFetching
                          ? true
                          : false
                      }
                      onChange={handleReceiveValue}
                      onFocus={handleResetValueReceive}
                      placeHolder={"0"}
                    />
                  )}
                />
                {/* ------- */}
              </SwapInputWrapper>
            </SwapInput>
            <SwapDetail
              style={{
                marginBottom: "20px",
                overflow: "unset",
              }}
            >
              <SwapDetailBlock>
                <SwapDetailRow className={theme}>
                  <p>
                    APR <span className="font-DMMono">24h</span>
                    <BlockToolTip className={theme}>
                      <span className="icn-tooltip">
                        <img src={icnToolTip} width={15} alt="Tooltip" />
                      </span>
                      <ContentToolTip>
                        <p>
                        Annual percentage rate for 24 hours
                        </p>
                      </ContentToolTip>
                    </BlockToolTip>
                  </p>
                  <p>{`${((pool?.apy_30d ?? 0) * 100).toFixed(2)}%`}</p>
                </SwapDetailRow>
                <SwapDetailRow className={theme}>
                  <p>Slippage:</p>
                  <p>{slippageTolerance}%</p>
                </SwapDetailRow>
                <SwapDetailRow className={theme}>
                  <p>Min. receive
                  <BlockToolTip className={theme}>
                      <span className="icn-tooltip">
                        <img src={icnToolTip} width={15} alt="Tooltip" />
                      </span>
                      <ContentToolTip>
                        <p>
                        Your transaction will revert if there is a large, unfavorable price movement before it is confirmed
                        </p>
                      </ContentToolTip>
                    </BlockToolTip>
                  </p>
                  <p>{Coins.fromNano(minExpectedTokens, 9).toString()}</p>
                </SwapDetailRow>
                <SwapDetailRow className={theme}>
                  <p>Blockchain fee:</p>
                  <p>0.26-0.6 TON</p>
                </SwapDetailRow>
                <SwapDetailRow className={theme}>
                  <p>Estimated share of pool:</p>
                  <p>+{`${share.toFixed(2)}%`}</p>
                </SwapDetailRow>
                {!!currentShareOfPool && (
                  <SeparateBlock>
                    <SwapDetailRow className={theme}>
                      <p>Your Share In The Pool:</p>
                      <p>{`${currentShareOfPool.toFixed(2)}%`}</p>
                    </SwapDetailRow>
                    <SwapDetailRow className={theme}>
                      <p>Your pool tokens:</p>
                      <p>
                        {Coins.fromNano(pool?.lp_balance ?? 0, 9).toString()}
                      </p>
                    </SwapDetailRow>
                  </SeparateBlock>
                )}
              </SwapDetailBlock>
            </SwapDetail>
            {wallet ? (
              <>
                {isLoading ? (
                  <>
                    <div className="btn btn-primary text-center fs-16 w-100 rounded-8 disabled">
                      <ButtonCommon disabled>
                        <Loading status={true} content="Calculating..." />
                      </ButtonCommon>
                    </div>
                  </>
                ) : (
                  <>
                    {isEnoughBalance() ? (
                      <ButtonCommon
                        onClick={() => {
                          setOpenConfirmModal(true);
                        }}
                        disabled={
                          token0Amount === 0 ||
                          token1Amount === 0 ||
                          !asset0 ||
                          !asset1
                        }
                      >
                        Add liquidity
                      </ButtonCommon>
                    ) : (
                      <>
                        <ButtonCommon disabled>
                          insufficient {asset0?.symbol} or {asset1?.symbol}{" "}
                          balance
                        </ButtonCommon>
                      </>
                    )}
                  </>
                )}
              </>
            ) : (
              <>
                <ButtonCommon
                  onClick={() => {
                    tonConnectUI.openModal();
                  }}
                >
                  <>
                    <img
                      width={17}
                      height={17}
                      style={{
                        marginRight: "8px",
                      }}
                      src={wallet_icon}
                      alt="wallet"
                    />
                    Connect Wallet
                  </>
                </ButtonCommon>
              </>
            )}
          </SwapContent>
        );
      case 2:
        return (
          <SettingSwap
            slippageTolerance={slippageTolerance}
            setSlippageTolerance={setSlippageTolerance}
            setActiveFilter={setActiveFilter}
            setSwitchState={setSwitchState}
            switchState={switchState}
          />
        );
      default:
        break;
    }
  };

  const [listFavorite, setListFavorite] = useState<any>([]);

  const swapFromTo = () => {
    setToken0Address(token1Address);
    setToken1Address(token0Address);
    setToken0Amount(token1Amount);
    setToken1Amount(token0Amount);
  };

  return (
    <LiquidityBg>
      <SwapContainer id="add-liquidity">
        <LiquidityHeader className={theme}>
          <h2>liquidity pool</h2>
          <p>Earn rewards by providing liquidity</p>
        </LiquidityHeader>
        {!asset0 || !asset1 || !token0Balance || !token1Balance ? (
          <>
            <SwapWrapper>
              <SwapHeader>
                <TitleCommon text={"PROVIDE LIQUIDITY"} />
              </SwapHeader>
              <Loader />
            </SwapWrapper>
          </>
        ) : (
          <>
            <SwapWrapper className={theme}>
              <SwapHeader>
                <TitleCommon text={"PROVIDE LIQUIDITY"} />
                <SwapExtension className={theme}>
                  {listExtensions.map((item, index) => {
                    return (
                      <li
                        onClick={() => {
                          setActiveFilter(item.id);
                        }}
                        key={index}
                      >
                        <img
                          src={
                            activeFilter === item.id
                              ? item.icon
                              : item.activeIcon
                          }
                          alt="icon"
                        />
                      </li>
                    );
                  })}
                </SwapExtension>
              </SwapHeader>
              {handleSwitchTabs()}
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
            // setCheckingToken={<></>}
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
            // setCheckingToken={<></>}
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
          <ConfirmAddLiquidity
            token0Amount={token0Amount}
            token1Amount={token1Amount}
            asset0={asset0}
            asset1={asset1}
            minExpectedTokens={minExpectedTokens}
            expectedTokens={expectedTokens}
            estimatedShare={share}
            slippageTolerance={slippageTolerance}
            simulateData={simulateData}
            pool={pool}
            setOpenConfirmModal={setOpenConfirmModal}
            openConfirmModal={openConfirmModal}
          />
        }
        open={openConfirmModal}
        setOpen={setOpenConfirmModal}
        title={" Confirm Add Liquidity"}
        width="500px"
        closeIcon={close}
      />
    </LiquidityBg>
  );
};

export default AddLiquidity;
