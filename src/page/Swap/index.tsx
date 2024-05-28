import TitleCommon from "../../components/Common/Title";
import {
  SwapBenifitTag,
  SwapBg,
  SwapChart,
  SwapChartFilter,
  SwapChartHeader,
  SwapChartTitle,
  SwapContainer,
  SwapExtension,
  SwapHeader,
  SwapInner,
  SwapSubTitle,
  SwapTop,
  SwapWrapper,
  SwapWrapperModal,
} from "./styled";
import chart from "../../assets/Dashboard/Swap/chart.svg";
import settings from "../../assets/Dashboard/Swap/settings.svg";
import chart_active from "../../assets/Dashboard/Swap/chart_active.svg";
import settings_active from "../../assets/Dashboard/Swap/settings_active.svg";
import chart_light from "../../assets/Dashboard/Swap/chart_light.svg";
import settings_light from "../../assets/Dashboard/Swap/settings_light.svg";
import { useTonAddress, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import ChooseToken from "./ChooseToken";
import { useContext, useEffect, useState } from "react";
import SettingSwap from "./Setting";
import { useSearchParams } from "react-router-dom";
import { useSimulateSwap } from "../../hooks/useSimulateSwap";
import { useGetAssetsQuery } from "../../store/api/dexApiSlice";
import { Coins } from "ton3-core";
import { useBalance } from "../../hooks/useBalance";
import { useForm } from "react-hook-form";
import { usePairBalances } from "../../hooks/usePairBalances";
import default_token_image from "../../assets/Dashboard/Common/default-token-image.png";
import ConfirmSwap from "./Confirm";
import change_icon from "../../assets/Dashboard/Swap/change_icon.png";
import change_icon_light from "../../assets/Dashboard/Swap/change_icon_light.png";
import SwapChartTable from "./Chart";
import SwapModal from "./Tabs/Modal";
import "./Chart/loading.css";
import { Loader } from "../../components/Loader";
import History from "./History";
import { debounce } from "lodash";
import { TabSelect } from "../Liquidity/styled";
import { ContextProviderWrapper, ModalOverlay, convertFixed, fieldNormalizer } from "@kibble-exchange/uikit";
import close from "../../assets/Dashboard/Common/close.svg";

const TON_ADDRESS: any = process.env.REACT_APP_TON_ADDRESS;
const KIBBLE_ADDRESS: any = process.env.REACT_APP_KIBBLE_ADDRESS;

export type SwapAction = "offer" | "ask";

const Swap = () => {
  const [isShowHistory, setIsShowHistory] = useState(false);
  const { theme, isMobile } = useContext(ContextProviderWrapper)!;
  const [searchParams] = useSearchParams();
  let from = searchParams.get("from");
  let to = searchParams.get("to");

  const [tonConnectUI] = useTonConnectUI();
  
  const getSelectedFromLocal = JSON.parse(
    localStorage.getItem("selectedTokens") || "{}"
  );
  
  const [fromAssetKey, setFromAssetKey] = useState(
    from || getSelectedFromLocal.from
  );

  const [toAssetKey, setToAssetKey] = useState(to || getSelectedFromLocal.to);
  if (from === to || !from || !to) {
    from = TON_ADDRESS;
    to = KIBBLE_ADDRESS;
  }
  
  useEffect(() => {
    if (!tonConnectUI.connector.connected && (fromAsset === undefined || toAsset === undefined)) {
      setFromAssetKey(TON_ADDRESS);
      setToAssetKey(KIBBLE_ADDRESS);
    }
  },[tonConnectUI.connector.connected])

  const [checkingToken, setCheckingToken] = useState(false);

  const [fromAmount, setFromAmount] = useState(0);
  const [toAmount, setToAmount] = useState(0);
  const [slippageTolerance, setSlippageTolerance] = useState(0.5);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    from = fromAssetKey;
    to = toAssetKey;
    const url = new URL(window.location.toString());
    url.searchParams.set("from", from || TON_ADDRESS);
    url.searchParams.set("to", to || KIBBLE_ADDRESS);
    // window.history.pushState({}, "", url);

    // Updated selectedTokens
    const selectedTokens = {
      from: fromAssetKey,
      to: toAssetKey,
    };

    localStorage.setItem("selectedTokens", JSON.stringify(selectedTokens));
  }, [fromAssetKey, toAssetKey]);

  const wallet = useTonWallet();
  const address: any = useTonAddress();

  const [openFromModal, setOpenFromModal] = useState(false);
  const [openToModal, setOpenToModal] = useState(false);

  // Count decimal
  const countDecimals = (value: any) => {
    const valueAsString = String(value);
    const splitValue = valueAsString.split(".");
    return splitValue.length > 1 ? splitValue[1].length : 0;
  };

  const handleSendValue = (e: any) => {
    const decimalsCount = countDecimals(e.target.value);
    fieldNormalizer(
      "fromAmount",
      e.target.value || "0",
      setValue,
      fromAsset?.decimals
    );
    if (fromAsset && decimalsCount <= fromAsset?.decimals) {
      debouncedUpdateFromAmount(parseFloat(e.target.value));
    }
  };

  const { data: assets } = useGetAssetsQuery(
    address ? address?.toString() : undefined
  );

  const { setValue, control } = useForm({ mode: "onChange" });

  const handleReceiveValue = (e: any) => {
    const decimalsCount = countDecimals(e.target.value);
    fieldNormalizer(
      "toAmount",
      e.target.value || "0",
      setValue,
      toAsset?.decimals
    );
    if (toAsset && decimalsCount <= toAsset?.decimals) {
      debouncedUpdateToAmount(parseFloat(e.target.value));
    }
  };

  const fromAsset = assets && assets[fromAssetKey];
  const toAsset = assets && assets[toAssetKey];

  const { tonBalance } = useBalance();
  const { token0Balance: fromAssetBalance, token1Balance: toAssetBalance } =
    usePairBalances({
      token0Address: fromAssetKey,
      token1Address: toAssetKey,
    });

  const [swapAction, setSwapAction] = useState<SwapAction>("offer");

  const fromAmountNano =
    fromAsset && fromAmount
      ? new Coins(fromAmount.toFixed(fromAsset?.decimals), {
          decimals: fromAsset?.decimals,
        }).toNano()
      : "0";

  const toAmountNano =
    toAsset && toAmount
      ? new Coins(toAmount.toFixed(toAsset?.decimals), {
          decimals: toAsset?.decimals,
        }).toNano()
      : "0";

  const simulateState = useSimulateSwap({
    swapAction: swapAction,
    offerAddress: fromAsset?.contract_address,
    askAddress: toAsset?.contract_address,
    fromUnits: fromAmountNano,
    toUnits: toAmountNano,
    slippageTolerance: slippageTolerance,
  });

  const realPrice = simulateState.swapRate > 0 ? 1 / simulateState.swapRate : 0;

  const minAskUnits = Number(
    Coins.fromNano(simulateState.minAskUnits, toAsset?.decimals)
  );
  const offerUnits = Number(
    Coins.fromNano(simulateState.offerUnits, fromAsset?.decimals)
  );
  const rate = Number(minAskUnits) / Number(offerUnits) || 0;

  const minReceived = toAsset
    ? Coins.fromNano(simulateState.minAskUnits, toAsset?.decimals)
    : new Coins(0);

  const updateFromAmount = (amount: number) => {
    if (typeof amount !== "number" || amount <= 0 || Number.isNaN(amount)) {
      amount = 0;
      setToAmount(0);
    }
    setSwapAction("offer");
    setFromAmount(amount);
  };

  const updateToAmount = (amount: number) => {
    if (typeof amount !== "number" || amount <= 0 || Number.isNaN(amount)) {
      amount = 0;
      setFromAmount(0);
    }
    setSwapAction("ask");
    setToAmount(amount);
  };

  const debouncedUpdateToAmount = debounce(updateToAmount, 500);

  const debouncedUpdateFromAmount = debounce(updateFromAmount, 500);

  useEffect(() => {
    if (!toAsset || !fromAsset) {
      return;
    }
    if (swapAction === "offer") {
      setToAmount(
        parseFloat(
          Coins.fromNano(simulateState?.askUnits, toAsset?.decimals).toString()
        )
      );
    } else {
      setFromAmount(
        parseFloat(
          Coins.fromNano(
            simulateState?.offerUnits,
            fromAsset?.decimals
          ).toString()
        )
      );
    }
  }, [simulateState]);

  const isEnoughTonBalance = (): boolean => {
    if (!wallet || !assets) {
      return false;
    }

    let requiredAmount = 0.3;

    if (fromAssetKey === TON_ADDRESS) {
      requiredAmount += fromAmount;
    }

    return tonBalance?.gte(
      new Coins(requiredAmount.toFixed(assets[TON_ADDRESS]?.decimals), {
        decimals: assets[TON_ADDRESS]?.decimals,
      }).add(
        Coins.fromNano(simulateState.tonFeeUnits, assets[TON_ADDRESS]?.decimals)
      )
    );
  };

  const isEnoughAssetBalance = (): boolean => {
    if (!wallet || !assets) {
      return false;
    }
    let enoughAssetBalance = true;
    if (Number(fromAmount.toString()) > Number(fromAssetBalance.toString())) {
      enoughAssetBalance = false;
    }
    return enoughAssetBalance;
  };

  useEffect(() => {
    setValue(
      "toAmount",
      new Coins(toAmount, { decimals: toAsset?.decimals }).toString()
    );
  }, [toAmount]);

  useEffect(() => {
    setValue(
      "fromAmount",
      new Coins(fromAmount, { decimals: fromAsset?.decimals }).toString()
    );
  }, [fromAmount]);

  const swapFromTo = () => {
    setFromAssetKey(toAssetKey);
    setToAssetKey(fromAssetKey);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
    setSwapAction((prev) => (prev === "offer" ? "ask" : "offer"));
  };

  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  useEffect(() => {
    if (simulateState.priceImpact > 30 && !showDetail) {
      setShowDetail(true);
    }
  }, [simulateState.priceImpact]);

  const [activeFilter, setActiveFilter] = useState(1);
  const [showDetail, setShowDetail] = useState(false);
  const [timeTarget, setTimeTarget] = useState(0);

  const handleResetValueFrom = (e: any) => {
    let { value } = e.target;
    if (value === 0 || value === "0") {
      fieldNormalizer("fromAmount", "", setValue, fromAsset?.decimals);
      debouncedUpdateFromAmount(parseFloat(e.target.value));
    }
  };

  const handleResetValueTo = (e: any) => {
    let { value } = e.target;
    if (value === 0 || value === "0") {
      fieldNormalizer("toAmount", "", setValue, fromAsset?.decimals);
      debouncedUpdateFromAmount(parseFloat(e.target.value));
    }
  };

  // handle switch tabs
  const [switchState, setSwitchState] = useState(false);

  const handleSwitchTabs = () => {
    switch (activeFilter) {
      case 1:
        return (
          <SwapModal
            fromAssetKey={fromAssetKey}
            fromAssetBalance={fromAssetBalance}
            assets={assets}
            fromAsset={fromAsset}
            debouncedUpdateFromAmount={debouncedUpdateFromAmount}
            fromAmount={fromAmount}
            setOpenFromModal={setOpenFromModal}
            control={control}
            handleSendValue={handleSendValue}
            swapFromTo={swapFromTo}
            toAssetKey={toAssetKey}
            toAssetBalance={toAssetBalance}
            toAsset={toAsset}
            debouncedUpdateToAmount={debouncedUpdateToAmount}
            toAmount={toAmount}
            setOpenToModal={setOpenToModal}
            handleReceiveValue={handleReceiveValue}
            simulateState={simulateState}
            setOpenConfirmModal={setOpenConfirmModal}
            isEnoughAssetBalance={isEnoughAssetBalance}
            isEnoughTonBalance={isEnoughTonBalance}
            realPrice={rate}
            slippageTolerance={slippageTolerance}
            minReceived={minReceived}
            setShowDetail={setShowDetail}
            showDetail={showDetail}
            handleResetValueFrom={handleResetValueFrom}
            handleResetValueTo={handleResetValueTo}
            checkingToken={checkingToken}
          />
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
        return (
          <SwapModal
            fromAssetKey={fromAssetKey}
            fromAssetBalance={fromAssetBalance}
            assets={assets}
            fromAsset={fromAsset}
            debouncedUpdateFromAmount={debouncedUpdateFromAmount}
            fromAmount={fromAmount}
            setOpenFromModal={setOpenFromModal}
            control={control}
            handleSendValue={handleSendValue}
            swapFromTo={swapFromTo}
            toAssetKey={toAssetKey}
            toAssetBalance={toAssetBalance}
            toAsset={toAsset}
            debouncedUpdateToAmount={debouncedUpdateToAmount}
            toAmount={toAmount}
            setOpenToModal={setOpenToModal}
            handleReceiveValue={handleReceiveValue}
            simulateState={simulateState}
            setOpenConfirmModal={setOpenConfirmModal}
            isEnoughAssetBalance={isEnoughAssetBalance}
            isEnoughTonBalance={isEnoughTonBalance}
            realPrice={rate}
            slippageTolerance={slippageTolerance}
            minReceived={minReceived}
            setShowDetail={setShowDetail}
            showDetail={showDetail}
            handleResetValueFrom={handleResetValueFrom}
            handleResetValueTo={handleResetValueTo}
            checkingToken={checkingToken}
          />
        );
    }
  };

  const [valueChanges, setValueChanges] = useState(0);
  const [isPending, setIsPending] = useState<any>(false);

  useEffect(() => {
    if (isPending) {
      setTimeout(() => {
        setIsPending(false);
      }, 4000);
    }
  }, [isPending]);

  const [textModalTransaction, setTextModalTransaction] =
    useState("Confirm Swap");

  const [openChart, setOpenChart] = useState(false);
  const [listFavorite, setListFavorite] = useState<any>([]);

  const benifitTags = [
    {
      title: "No Fee",
      color: theme === "light" ? "#01B85F" : "#0FF586",
    },
    {
      title: "Lighting fast",
      color: theme === "light" ? "#E6A519" : "#F0CC54",
    },
    {
      title: "Best rate",
      color: theme === "light" ? "#DC622E" : "#DC622E",
    },
  ];

  const listExtensions = [
    {
      id: 1,
      icon: theme === "dark" ? chart : chart_light,
      activeIcon: chart_active,
    },
    {
      id: 2,
      icon: theme === "dark" ? settings : settings_light,
      activeIcon: settings_active,
    },
  ];

  const [activeTab, setActiveTab] = useState(1);

  const handleSwitchTabsMobile = () => {
    switch (activeTab) {
      case 1:
        return (
          <>
            {
              <SwapWrapperModal>
                {!fromAsset ||
                !toAsset ||
                !fromAssetBalance ||
                !toAssetBalance ? (
                  <>
                    <SwapWrapper className={theme}>
                      {!isMobile && (
                        <SwapHeader>
                          <TitleCommon text={"SWAP"} />
                        </SwapHeader>
                      )}
                      <Loader />
                    </SwapWrapper>
                  </>
                ) : (
                  <SwapWrapper className={theme}>
                    {/* Content */}
                    <SwapModal
                      fromAssetKey={fromAssetKey}
                      fromAssetBalance={fromAssetBalance}
                      assets={assets}
                      fromAsset={fromAsset}
                      debouncedUpdateFromAmount={debouncedUpdateFromAmount}
                      fromAmount={fromAmount}
                      setOpenFromModal={setOpenFromModal}
                      control={control}
                      handleSendValue={handleSendValue}
                      swapFromTo={swapFromTo}
                      toAssetKey={toAssetKey}
                      toAssetBalance={toAssetBalance}
                      toAsset={toAsset}
                      debouncedUpdateToAmount={debouncedUpdateToAmount}
                      toAmount={toAmount}
                      setOpenToModal={setOpenToModal}
                      handleReceiveValue={handleReceiveValue}
                      simulateState={simulateState}
                      setOpenConfirmModal={setOpenConfirmModal}
                      isEnoughAssetBalance={isEnoughAssetBalance}
                      isEnoughTonBalance={isEnoughTonBalance}
                      realPrice={rate}
                      slippageTolerance={slippageTolerance}
                      minReceived={minReceived}
                      setShowDetail={setShowDetail}
                      showDetail={showDetail}
                      handleResetValueFrom={handleResetValueFrom}
                      handleResetValueTo={handleResetValueTo}
                      checkingToken={checkingToken}
                    />
                  </SwapWrapper>
                )}
              </SwapWrapperModal>
            }
          </>
        );
      case 3:
        return (
          <SwapWrapperModal>
            <SwapWrapper className={theme}>
              <SettingSwap
                slippageTolerance={slippageTolerance}
                setSlippageTolerance={setSlippageTolerance}
                setActiveFilter={setActiveFilter}
                setSwitchState={setSwitchState}
                switchState={switchState}
                setActiveTab={setActiveTab}
              />
            </SwapWrapper>
          </SwapWrapperModal>
        );
      default:
        return (
          <>
            {openChart && (
              <SwapWrapperModal>
                {!fromAsset ||
                !toAsset ||
                !fromAssetBalance ||
                !toAssetBalance ? (
                  <>
                    <SwapWrapper className={theme}>
                      {!isMobile && (
                        <SwapHeader>
                          <TitleCommon text={"SWAP"} />
                        </SwapHeader>
                      )}
                      <Loader />
                    </SwapWrapper>
                  </>
                ) : (
                  <SwapWrapper className={theme}>
                    {/* Content */}
                    <SwapModal
                      fromAssetKey={fromAssetKey}
                      fromAssetBalance={fromAssetBalance}
                      assets={assets}
                      fromAsset={fromAsset}
                      debouncedUpdateFromAmount={debouncedUpdateFromAmount}
                      fromAmount={fromAmount}
                      setOpenFromModal={setOpenFromModal}
                      control={control}
                      handleSendValue={handleSendValue}
                      swapFromTo={swapFromTo}
                      toAssetKey={toAssetKey}
                      toAssetBalance={toAssetBalance}
                      toAsset={toAsset}
                      debouncedUpdateToAmount={debouncedUpdateToAmount}
                      toAmount={toAmount}
                      setOpenToModal={setOpenToModal}
                      handleReceiveValue={handleReceiveValue}
                      simulateState={simulateState}
                      setOpenConfirmModal={setOpenConfirmModal}
                      isEnoughAssetBalance={isEnoughAssetBalance}
                      isEnoughTonBalance={isEnoughTonBalance}
                      realPrice={rate}
                      slippageTolerance={slippageTolerance}
                      minReceived={minReceived}
                      setShowDetail={setShowDetail}
                      showDetail={showDetail}
                      handleResetValueFrom={handleResetValueFrom}
                      handleResetValueTo={handleResetValueTo}
                      checkingToken={checkingToken}
                    />
                  </SwapWrapper>
                )}
              </SwapWrapperModal>
            )}
          </>
        );
    }
  };

  return (
    <SwapBg>
      <SwapContainer>
        {isShowHistory && (
          <History
            onClose={() => {
              setIsShowHistory(false);
            }}
          />
        )}
        <SwapTop>
          <TitleCommon text={"SWAP TOKEN WITH"} />
          <SwapBenifitTag className={theme}>
            {benifitTags.map((item, index) => {
              return (
                <li
                  style={{
                    color: item.color,
                  }}
                  key={index}
                >
                  <span
                    style={{
                      background: item.color,
                    }}
                  ></span>
                  {item.title}
                </li>
              );
            })}
          </SwapBenifitTag>
        </SwapTop>
        {isMobile && (
          <>
            <TabSelect className={theme} active={activeTab}>
              <button
                onClick={() => {
                  setActiveTab(1);
                  setOpenChart(true);
                }}
              >
                Swap modal
              </button>
              <button
                onClick={() => {
                  setActiveTab(2);
                  setOpenChart(false);
                }}
              >
                Statics
              </button>
              <button
                onClick={() => {
                  setActiveTab(3);
                  setOpenChart(true);
                }}
              >
                Settings
              </button>
            </TabSelect>
          </>
        )}
        <SwapInner className={openChart ? `active` : ``}>
          <SwapChart
            className={
              openChart && !isMobile
                ? `active ${theme}`
                : isMobile && activeTab !== 2
                ? `active ${theme}`
                : `${theme}`
            }
          >
            <SwapChartHeader>
              <SwapChartTitle className={theme} isDown={valueChanges < 0}>
                <img
                  style={{cursor: "pointer"}}
                  onClick={async () => {
                    swapFromTo();
                  }}
                  src={theme === "light" ? change_icon_light : change_icon}
                  alt="icon"
                />
                <div>
                  <figure>
                    <img
                      src={
                        fromAsset?.image_url
                          ? fromAsset?.image_url
                          : default_token_image
                      }
                      alt="icon"
                      onError={(e) =>
                        (e.currentTarget.src = default_token_image)
                      }
                    />
                  </figure>
                  <figure>
                    <img
                      src={
                        toAsset?.image_url
                          ? toAsset?.image_url
                          : default_token_image
                      }
                      alt="icon"
                      onError={(e) =>
                        (e.currentTarget.src = default_token_image)
                      }
                    />
                  </figure>
                </div>
                <div>
                  <p>{fromAsset?.symbol ? fromAsset?.symbol : "??"} / </p>
                  <p>{toAsset?.symbol ? toAsset?.symbol : "??"}</p>
                  <span>
                    {valueChanges > 0 ? "+" : ""}
                    {valueChanges?.toFixed(2)}%
                  </span>
                </div>
              </SwapChartTitle>
              <SwapChartFilter className={theme} ispending={isPending}>
                {chartFilter.map((item, index) => {
                  return (
                    <li
                      onClick={() => {
                        if (!isPending) {
                          setTimeTarget(index);
                          setIsPending(true);
                        }
                      }}
                      className={timeTarget === index ? "active" : ""}
                      key={index}
                    >
                      {item.text}
                    </li>
                  );
                })}
              </SwapChartFilter>
            </SwapChartHeader>
            {/* Chart */}
            <SwapChartTable
              assets={assets}
              setValueChanges={setValueChanges}
              valueChanges={valueChanges}
              fromSymbol={fromAsset?.symbol || "--"}
              toSymbol={toAsset?.symbol || "--"}
              fromAssetKey={fromAssetKey}
              toAssetKey={toAssetKey}
              timeTarget={timeTarget}
            />
          </SwapChart>

          {/* )} */}
          {isMobile && handleSwitchTabsMobile()}
          {!isMobile && (
            <SwapWrapperModal
              style={{
                height:
                  activeFilter === 1 || activeFilter === 2 ? "auto" : "405px",
              }}
            >
              {!fromAsset ||
              !toAsset ||
              !fromAssetBalance ||
              !toAssetBalance ? (
                <>
                  <SwapWrapper className={theme}>
                    <SwapHeader>
                      <TitleCommon text={"SWAP"} />
                    </SwapHeader>
                    <Loader />
                  </SwapWrapper>
                </>
              ) : (
                <>
                  <SwapWrapper className={theme}>
                    <SwapHeader>
                      <TitleCommon
                        text={activeFilter === 1 ? "SWAP" : "SWAP SETTINGS"}
                      />
                      <SwapExtension className={theme}>
                        {listExtensions.map((item, index) => {
                          return (
                            <li
                              onClick={() => {
                                setActiveFilter(item.id);
                                if (item.id === 1) {
                                  setOpenChart(!openChart);
                                }
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
                    {activeFilter === 1 ? (
                      <SwapSubTitle className={theme}>
                        <span>
                          {rate > 0 && (
                            <>
                              {`1 ${fromAsset?.symbol}`} = {convertFixed(rate)}{" "}
                              {toAsset?.symbol}
                            </>
                          )}
                        </span>
                      </SwapSubTitle>
                    ) : (
                      <SwapSubTitle className={theme}>
                        {/* Please carefully check the receipt below. */}
                      </SwapSubTitle>
                    )}
                    {/* Content */}
                    {!isMobile && handleSwitchTabs()}
                  </SwapWrapper>
                </>
              )}
            </SwapWrapperModal>
          )}
        </SwapInner>
      </SwapContainer>
      <ModalOverlay
        component={
          <ChooseToken
            isFromModal={true}
            otherCurrentAssetKey={toAssetKey}
            setCurrentAsset={setFromAssetKey}
            setOtherCurrentAsset={setToAssetKey}
            setOpenFromModal={setOpenFromModal}
            // set Amount
            setAmountFrom={setFromAmount}
            setAmountTo={setToAmount}
            // favorite
            setListFavorite={setListFavorite}
            listFavorite={listFavorite}
            //Checking token
            setCheckingToken={setCheckingToken}
            isModal={1}
          />
        }
        open={openFromModal}
        setOpen={setOpenFromModal}
        title={"Select a token"}
        width="400px"
        closeIcon={close}
      />
      <ModalOverlay
        component={
          <ChooseToken
            isFromModal={true}
            otherCurrentAssetKey={fromAssetKey}
            setCurrentAsset={setToAssetKey}
            setOpenFromModal={setOpenToModal}
            // set Amount
            setAmountFrom={setFromAmount}
            setAmountTo={setToAmount}
            // favorite
            setListFavorite={setListFavorite}
            listFavorite={listFavorite}
            //Checking token
            setCheckingToken={setCheckingToken}
            isModal={2}
          />
        }
        open={openToModal}
        setOpen={setOpenToModal}
        title={"Select a token"}
        width="400px"
        closeIcon={close}
      />
      <ModalOverlay
        component={
          <ConfirmSwap
            fromAsset={fromAsset}
            toAsset={toAsset}
            fromAmount={fromAmount}
            toAmount={toAmount}
            minReceived={minReceived}
            slippageTolerance={slippageTolerance}
            setOpenConfirmModal={setOpenConfirmModal}
            openConfirmModal={openConfirmModal}
            simulateState={simulateState}
            realPrice={realPrice}
            setFromAmount={setFromAmount}
            setToAmount={setToAmount}
            setTextModalTransaction={setTextModalTransaction}
            updateFromAmount={updateFromAmount}
            updateToAmount={updateToAmount}
          />
        }
        open={openConfirmModal}
        setOpen={setOpenConfirmModal}
        title={textModalTransaction}
        width="500px"
        closeIcon={close}
      />
    </SwapBg>
  );
};

const chartFilter = [
  {
    id: 1,
    value: 86400000,
    text: "24H",
  },
  {
    id: 2,
    value: 604800000,
    text: "1W",
  },
  // {
  //   id: 3,
  //   value: 2629743000,
  //   text: "1M",
  // },
];

export default Swap;
