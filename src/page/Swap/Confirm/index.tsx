import {
  useTonAddress,
  useTonConnectUI,
  useTonWallet,
} from "@tonconnect/ui-react";
import {
  ConfirmSwapButtons,
  ConfirmSwapContainer,
  ConfirmSwapHeader,
} from "./styled";
import { useSwapQuery } from "../../../store/api/dexApiSlice";
import { Coins } from "ton3-core";
import default_token_image from "../../../assets/Dashboard/Common/default-token-image.png";
import Loading from "../../../components/Loading";
import SwapDetails from "../Tabs/Details";
import { useContext, useEffect, useRef, useState } from "react";
import {
  SuccessSwap,
  WaitingPoolCreated,
} from "../../Liquidity/CreatePool/Confirm/styled";
import { KIBBLE_API } from "../../../services/api";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { InfoCircleOutlined } from "@ant-design/icons";
import { CreatePoolHint } from "../../Liquidity/Add/styled";
import block_gif from "../../../assets/gif/block.gif";
import succcess_gif from "../../../assets/gif/liquidity_filter_gif.gif";
import { ButtonCommon, ContextProviderWrapper } from "@kibble-exchange/uikit";

const ConfirmSwap = ({
  fromAsset,
  toAsset,
  fromAmount,
  toAmount,
  minReceived,
  slippageTolerance,
  openConfirmModal,
  setOpenConfirmModal,
  simulateState,
  realPrice,
  setFromAmount,
  setToAmount,
  setTextModalTransaction,
}: any) => {
  const { theme } = useContext(ContextProviderWrapper)!;
  const wallet = useTonWallet();
  const [tonConnectUI] = useTonConnectUI();
  const address = useTonAddress();
  const { data: transactionData, isFetching } = useSwapQuery(
    {
      userWalletAddress: address?.toString() || "",
      offerJettonAddress: fromAsset && fromAsset?.contract_address,
      offerAmount:
        fromAsset &&
        new Coins(fromAmount.toFixed(fromAsset?.decimals), {
          decimals: fromAsset && fromAsset?.decimals,
        }).toNano(),
      askJettonAddress: toAsset && toAsset?.contract_address,
      minAskAmount: minReceived.toNano(),
    },
    {
      skip: !wallet || !address || !openConfirmModal,
      refetchOnMountOrArgChange: true,
    }
  );

  const intervalRef: any = useRef(null);

  const [loadingWaitSwap, setLoadingWaitSwap] = useState(false);

  const [successTransaction, setSucccessTransaction] = useState(false);
  const [transactionResponse, setTransactionResponse] = useState<any>({});
  const handleCheckStatusTransaction = async () => {
    const params = {
      wallet_address: address && address,
      query_id: transactionData?.query_id,
    };

    try {
      const res = await KIBBLE_API.checkStatusSwap(params);
      if (res) {
        setTransactionResponse(res.data);
      }
    } catch (error) {
      console.log(error);
      setSucccessTransaction(false);
    }
  };

  const handleConfirm = async () => {
    if (!wallet || !transactionData) {
      return;
    }
    try {
      const response = await tonConnectUI?.sendTransaction({
        validUntil: transactionData.valid_until,
        messages: transactionData.messages.map((message) => ({
          address: message.to,
          amount: message.amount,
          payload: message.payload,
        })),
      });
      if (response.boc) {
        setLoadingWaitSwap(true);
      }
    } catch (e) {
      console.log(e);
      setLoadingWaitSwap(false);
      toast.error("User has rejected confirm");
    }
  };

  useEffect(() => {
    if (loadingWaitSwap) {
      document.body.style.pointerEvents = "none";
      setTextModalTransaction("Transaction in progress");
      intervalRef.current = setInterval(() => {
        handleCheckStatusTransaction();
      }, 5000);
    }
  }, [loadingWaitSwap]);

  useEffect(() => {
    if (transactionResponse["@type"] !== "NotFound" && loadingWaitSwap && transactionResponse?.exit_code === "swap_ok") {
      setLoadingWaitSwap(false);
      setSucccessTransaction(true);
      document.body.style.pointerEvents = "auto";
      setTextModalTransaction("Successfully");
      return () => {
        clearInterval(intervalRef.current);
        document.body.style.pointerEvents = "auto";
      };
    }
  }, [transactionResponse]);

  // Reset all when close modal
  useEffect(() => {
    if (!openConfirmModal) {
      setLoadingWaitSwap(false);
      setSucccessTransaction(false);
      setTextModalTransaction("Confirm Swap");
      setTransactionResponse({});
      setFromAmount(0);
      setToAmount(0);
    }
  }, [openConfirmModal]);

  return (
    <ConfirmSwapContainer>
      {loadingWaitSwap && !successTransaction ? (
        <>
          <WaitingPoolCreated className={theme}>
            <figure>
              <img src={block_gif} alt="icon" />
            </figure>
            <p>Transaction in progress in your wallet application</p>
            <span>
              Swap <span>{fromAmount}</span> {fromAsset.symbol} to{" "}
              <span>{toAmount}</span> {toAsset.symbol}
            </span>
            <CreatePoolHint className={theme}>
              <InfoCircleOutlined
                style={{
                  marginRight: "10px",
                }}
              />
              Please waiting a moment, you cannot interacion anything until
              next progress
            </CreatePoolHint>
          </WaitingPoolCreated>
        </>
      ) : !loadingWaitSwap && successTransaction ? (
        <SuccessSwap className={theme}>
          <figure>
            <img src={succcess_gif} alt="icon" />
          </figure>
          <p style={{color: theme === "light" ? "#000": "#fff"}}>Swap successfuly</p>
          <span>
            Swap <span>{fromAmount}</span> {fromAsset.symbol} to{" "}
            <span>{toAmount}</span> {toAsset.symbol} successfully
          </span>
          <ConfirmSwapButtons>
            <ButtonCommon
              background={theme === "light" ? "#EEEEF0" : "#28272C"}
              color={theme === "light" ? "#141518" : "#000"}
            >
              <Link
                style={{
                  color: theme === "light" ? "#000" : "#fff",
                }}
                to={
                  transactionResponse?.tx_hash
                    ? `https://tonviewer.com/transaction/${transactionResponse?.tx_hash}`
                    : `https://tonviewer.com/${address}`
                }
                target="_blank"
                rel="noreferrer"
              >
                View on explorer
              </Link>
            </ButtonCommon>
            <ButtonCommon
              onClick={() => {
                setOpenConfirmModal(false);
                setSucccessTransaction(false);
                setLoadingWaitSwap(false);
                setFromAmount(0);
                setToAmount(0);
              }}
            >
              Got it
            </ButtonCommon>
          </ConfirmSwapButtons>
        </SuccessSwap>
      ) : (
        <>
          <ConfirmSwapHeader className={theme}>
            <div>
              <div>
                <p>You send</p>
                <div>
                  <figure>
                    <img
                      onError={(e) =>
                        (e.currentTarget.src = default_token_image)
                      }
                      src={fromAsset?.image_url}
                      width="48"
                      height="48"
                      alt={fromAsset?.display_name}
                    />
                  </figure>
                  <p>{`${fromAsset?.symbol}`}</p>
                </div>
              </div>
              <p>{`${fromAmount}`}</p>
            </div>
            <div>
              <div>
                <p>You receive</p>
                <div>
                  <figure>
                    <img
                      onError={(e) =>
                        (e.currentTarget.src = default_token_image)
                      }
                      src={toAsset?.image_url}
                      width="48"
                      height="48"
                      alt={toAsset?.display_name}
                    />
                  </figure>
                  <p>{`${toAsset?.symbol}`}</p>
                </div>
              </div>
              <p>{`${toAmount}`}</p>
            </div>
          </ConfirmSwapHeader>
          <SwapDetails
            showDetail={true}
            realPrice={realPrice}
            fromAsset={fromAsset}
            toAsset={toAsset}
            slippageTolerance={slippageTolerance}
            minReceived={minReceived}
            simulateState={simulateState}
          />
          <ConfirmSwapButtons>
            <ButtonCommon
              onClick={() => {
                setOpenConfirmModal(false);
              }}
              background={theme === "light" ? "#EEEEF0" : "#32363f"}
              color={theme === "light" ? "#141518" : "#8e8e8f"}
            >
              <p>Cancel</p>
            </ButtonCommon>
            <ButtonCommon onClick={handleConfirm} disabled={isFetching}>
              {isFetching ? (
                <Loading status={true} content="Waiting" />
              ) : (
                "Confirm & Swap"
              )}
            </ButtonCommon>
          </ConfirmSwapButtons>
        </>
      )}
    </ConfirmSwapContainer>
  );
};

export default ConfirmSwap;
