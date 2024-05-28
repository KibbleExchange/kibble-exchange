import { Controller } from "react-hook-form";
import {
  ClickMaxAmount,
  DetailButtonHeader,
  RecTag,
  RecText,
  RoutesBottom,
  RoutesHeader,
  RoutesList,
  RoutesRecommended,
  RoutesTag,
  SwapChoose,
  SwapChooseDefault,
  SwapContent,
  SwapDetailButton,
  SwapExchangeIcon,
  SwapInput,
  SwapInputTitle,
  SwapInputValue,
  SwapInputWrapper,
  SwapRoutesCheck,
  SwapWrapperButtons,
} from "../../styled";
import { TextResult } from "../../ChooseToken/styled";
import { Checkbox } from "antd";
import {
  useTonAddress,
  useTonConnectUI,
  useTonWallet,
} from "@tonconnect/ui-react";
import default_token_image from "../../../../assets/Dashboard/Common/default-token-image.png";
import swap_exchange from "../../../../assets/Dashboard/Swap/swap_exchange.png";
import routes_icon from "../../../../assets/Dashboard/Swap/routes_icon.svg";
import routes_icon_light from "../../../../assets/Dashboard/Swap/routes_icon_light.svg";
import routes_icon_check from "../../../../assets/Dashboard/Swap/routes_icon_check.png";
import swap_btn_icon from "../../../../assets/Dashboard/Swap/swap_btn_icon.svg";
import wallet_icon from "../../../../assets/Dashboard/Swap/wallet_icon.svg";
import { useContext, useState } from "react";
import { useMediaQuery } from "react-responsive";
import SwapDetails from "../Details";
import { ButtonCommon, ContextProviderWrapper, InputCommon, convertFixed, toFixedWithoutRounding } from "@kibble-exchange/uikit";

const TON_ADDRESS: any = process.env.REACT_APP_TON_ADDRESS;

const SwapModal = ({
  fromAssetKey,
  fromAssetBalance,
  assets,
  fromAsset,
  debouncedUpdateFromAmount,
  fromAmount,
  setOpenFromModal,
  control,
  handleSendValue,
  swapFromTo,
  toAssetKey,
  toAssetBalance,
  toAsset,
  debouncedUpdateToAmount,
  toAmount,
  setOpenToModal,
  handleReceiveValue,
  simulateState,
  setOpenConfirmModal,
  isEnoughAssetBalance,
  isEnoughTonBalance,
  realPrice,
  slippageTolerance,
  minReceived,
  setShowDetail,
  showDetail,
  handleResetValueFrom,
  handleResetValueTo,
  checkingToken
}: any) => {
  const address = useTonAddress();
  const [tonConnectUI] = useTonConnectUI();
  const [expandRoutes, setExpandRoutes] = useState(true);
  const handleCheckMultiRoutes = (e: any) => {
    setExpandRoutes(e.target.checked);
  };
  const wallet = useTonWallet();
  const isMobile = useMediaQuery({ maxWidth: 500 });
  const { theme } = useContext(ContextProviderWrapper)!;

  return (
    <>
      <SwapContent>
        <SwapInput className={`exchange ${theme}`}>
          <SwapInputTitle className={theme}>
            <p>You send:</p>
            <ClickMaxAmount>
              {!isMobile && "Balance:"}{" "}
              {convertFixed(Number(fromAssetBalance.toString()))} |{" "}
              <span
                onClick={() => {
                  const result: any =
                    fromAssetKey ===
                    TON_ADDRESS
                      ? toFixedWithoutRounding(
                          Number(fromAssetBalance.toString()) - 0.31,
                          Number(assets && fromAsset?.decimals)
                        )
                      : toFixedWithoutRounding(
                          Number(fromAssetBalance.toString()),
                          Number(assets && fromAsset?.decimals)
                        );
                  debouncedUpdateFromAmount(parseFloat(result.toString()));
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
            active={fromAmount > 0}
          >
            <SwapChoose
              className={theme}
              onClick={() => {
                setOpenFromModal(true);
              }}
            >
              <SwapChooseDefault className={theme}>
                {fromAsset ? (
                  <>
                    <img
                      src={fromAsset?.image_url}
                      alt="icon"
                      onError={(e) =>
                        (e.currentTarget.src = default_token_image)
                      }
                    />
                    <p>{fromAsset?.symbol}</p>
                  </>
                ) : (
                  <TextResult>Loading...</TextResult>
                )}
              </SwapChooseDefault>
            </SwapChoose>
            {/* Input From */}
            <Controller
              name="fromAmount"
              control={control}
              render={({ field }: any) => (
                <SwapInputValue>
                  <InputCommon
                    {...field}
                    disabled={address && checkingToken ? false : true}
                    onChange={handleSendValue}
                    onFocus={handleResetValueFrom}
                    placeHolder={"0"}
                  />
                  <RoutesBottom>
                    <p>
                      ≈
                      {true
                        ? (
                            Number(fromAmount) *
                              Number(assets[fromAssetKey].dex_price_usd) || 0
                          ).toFixed(3)
                        : "0"}{" "}
                      USD
                    </p>
                  </RoutesBottom>
                </SwapInputValue>
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
        <SwapInput className={`exchange ${theme}`}>
          <SwapInputTitle className={theme}>
            <p>You receive:</p>
            <ClickMaxAmount>
              {!isMobile && "Balance:"}{" "}
              {convertFixed(Number(toAssetBalance.toString()))} |{" "}
              <span
                onClick={() => {
                  const result: any =
                    toAssetKey ===
                    TON_ADDRESS
                      ? toFixedWithoutRounding(
                          Number(toAssetBalance.toString()) - 0.31,
                          Number(assets && toAsset?.decimals)
                        )
                      : toFixedWithoutRounding(
                          Number(toAssetBalance.toString()),
                          Number(assets && toAsset?.decimals)
                        );
                  debouncedUpdateToAmount(parseFloat(result.toString()));
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
            active={toAmount > 0}
          >
            <SwapChoose
              className={theme}
              onClick={() => {
                setOpenToModal(true);
              }}
            >
              <SwapChooseDefault className={theme}>
                {fromAsset ? (
                  <>
                    <img
                      src={toAsset?.image_url}
                      alt="icon"
                      onError={(e) =>
                        (e.currentTarget.src = default_token_image)
                      }
                    />
                    <p>{toAsset?.symbol}</p>
                  </>
                ) : (
                  <TextResult>Loading...</TextResult>
                )}
              </SwapChooseDefault>
            </SwapChoose>
            {/* Input to */}
            <Controller
              name="toAmount"
              control={control}
              render={({ field }: any) => (
                <SwapInputValue>
                  <InputCommon
                    {...field}
                    disabled={address && checkingToken ? false : true}
                    onChange={handleReceiveValue}
                    onFocus={handleResetValueTo}
                    placeHolder={"0"}
                  />
                  <RoutesBottom>
                    <p>
                      ≈
                      {true
                        ? (
                            Number(toAmount) *
                              Number(assets[toAssetKey].dex_price_usd) || 0
                          ).toFixed(3)
                        : "0"}{" "}
                      USD
                    </p>
                  </RoutesBottom>
                </SwapInputValue>
              )}
            />
            {/* ------- */}
          </SwapInputWrapper>
        </SwapInput>
        <SwapRoutesCheck className={theme}>
          <Checkbox onChange={handleCheckMultiRoutes} checked={expandRoutes}>
            Route auto select
          </Checkbox>
          {expandRoutes && (
            <RoutesRecommended>
              <RecTag className={theme}>Recommend</RecTag>
              <RecText className={theme}>
                <p>{assets && assets[fromAssetKey].symbol}</p>
                <img
                  src={theme === "light" ? routes_icon_light : routes_icon}
                  alt="icon"
                />
                <p>{assets && assets[toAssetKey].symbol}</p>
              </RecText>
            </RoutesRecommended>
          )}
        </SwapRoutesCheck>
        <RoutesList
          className={theme}
          style={{
            height: !expandRoutes ? "155px" : "0",
            marginBottom: !expandRoutes ? "10px" : "0",
          }}
        >
          {routesSelected.map((item, index) => {
            return (
              <li
                key={index}
                style={{
                  pointerEvents: item.id === 2 ? "none" : "auto",
                  opacity: item.id === 2 ? ".5" : "1",
                }}
              >
                <RoutesHeader className={theme}>
                  <div>
                    <figure>
                      <img src={item.icon} alt="icon" />
                    </figure>
                    <p>{item.name}</p>
                  </div>
                  <p>{item.id === 1 ? toAmount : "0.00"}</p>
                </RoutesHeader>
                <RoutesBottom>
                  {item.tag && (
                    <RoutesTag className={theme}>Recommend</RoutesTag>
                  )}
                  <p>
                    ≈
                    {item.id === 1
                      ? (
                          Number(toAmount) *
                            Number(assets[toAssetKey].dex_price_usd) || 0
                        ).toFixed(3)
                      : "0"}{" "}
                    USD
                  </p>
                </RoutesBottom>
              </li>
            );
          })}
        </RoutesList>
        <SwapDetailButton
          className={showDetail ? `active ${theme}` : theme}
          onClick={() => {
            setShowDetail(!showDetail);
          }}
        >
          <DetailButtonHeader
            className={theme}
            style={{
              marginBottom: showDetail ? "10px" : "0",
            }}
          >
            <p>Show detail</p>
            <p>{showDetail ? "Show less" : "Show more"}</p>
          </DetailButtonHeader>
          <SwapDetails
            showDetail={showDetail}
            realPrice={realPrice}
            fromAsset={fromAsset}
            toAsset={toAsset}
            slippageTolerance={slippageTolerance}
            minReceived={minReceived}
            simulateState={simulateState}
          />
        </SwapDetailButton>
        {wallet ? (
          "error" in simulateState ? (
            <ButtonCommon className={theme} disabled>
              <p>Insufficient Pool Liquidity</p>
            </ButtonCommon>
          ) : (
            <>
              {simulateState.priceImpact <= 50 ? (
                <SwapWrapperButtons>
                  <ButtonCommon
                    className={theme}
                    onClick={() => {
                      setOpenConfirmModal(true);
                    }}
                    disabled={
                      fromAmount === 0 ||
                      toAmount === 0 ||
                      !address ||
                      !fromAsset ||
                      !toAsset ||
                      !isEnoughAssetBalance() ||
                      !isEnoughTonBalance() ||
                      !wallet ||
                      simulateState.swapRate === 0
                    }
                  >
                    {isEnoughAssetBalance() && isEnoughTonBalance() ? (
                      <>
                        <p>
                          {simulateState.priceImpact > 20
                            ? "Price impact is too high"
                            : "Swap"}
                        </p>
                        <img
                          style={{
                            marginLeft: "10px",
                          }}
                          src={swap_btn_icon}
                          alt="icon"
                        />
                      </>
                    ) : (
                      <>
                        <p>Insufficient Balance</p>
                      </>
                    )}
                  </ButtonCommon>
                </SwapWrapperButtons>
              ) : (
                <>
                  {" "}
                  <ButtonCommon className={theme} disabled
                    style={{backgroundColor: simulateState.priceImpact > 20 ? "#D83B3B": ""}}
                  >
                    Price impact is too high
                  </ButtonCommon>
                </>
              )}
            </>
          )
        ) : (
          <ButtonCommon
            className={theme}
            onClick={() => {
              !address ? tonConnectUI.openModal() : <></>;
            }}
          >
            <img
              width={17}
              height={17}
              style={{
                marginRight: "8px",
              }}
              src={wallet_icon}
              alt="wallet"
            />
            <p>Connect Wallet</p>
          </ButtonCommon>
        )}
      </SwapContent>
    </>
  );
};

const routesSelected = [
  {
    id: 1,
    icon: routes_icon_check,
    name: "Stonfi",
    tag: true,
    price: "12,322.1108178",
    usd: "~1232,3192 USD",
  },
  {
    id: 2,
    icon: routes_icon_check,
    name: "DeDust",
    tag: false,
    price: "0.00",
    usd: "-- USD",
  },
];

export default SwapModal;
