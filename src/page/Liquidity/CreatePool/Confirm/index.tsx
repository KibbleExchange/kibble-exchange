import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import {
  CPHeader,
  CPInfoConfirmAsset,
  ConfirmAssetRow,
  CreatePoolConfirmContainer,
  WaitingPoolCreated,
} from "./styled";
import { KIBBLE_API } from "../../../../services/api";
import { useContext, useEffect, useRef, useState } from "react";
import { Coins } from "ton3-core";
import default_token_image from "../../../../assets/Dashboard/Common/default-token-image.png";
import {
  SwapDetail,
  SwapDetailBlock,
  SwapDetailRow,
} from "../../../Swap/styled";
import _ from "lodash";
import Loading from "../../../../components/Loading";
import { useNavigate } from "react-router-dom";
import LoadingSpin from "../../../../components/Common/Loading";
import { ButtonCommon, ContextProviderWrapper, convertFixed } from "@kibble-exchange/uikit";

const TON_ADDRESS: any = process.env.REACT_APP_TON_ADDRESS;

const CreatePoolConfirm = ({
  infoConfirm,
  token0Amount,
  token1Amount,
  asset0,
  asset1,
  confirmModal,
  pools,
  assets,
  loadingWaitPool,
  setLoadingWaitPool,
}: any) => {
  const [tonConnectUI] = useTonConnectUI();
  const walletAddress = useTonAddress();
  const [transactionData, setTransactionData] = useState<any>({});
  const [isLoadingConfirm, setIsLoadingConfirm] = useState(false);
  const { theme } = useContext(ContextProviderWrapper)!;

  const handleSubmitConfirm = async () => {
    const params = {
      user_wallet_address: walletAddress,
      token0_address:
        infoConfirm?.token_a ===
        "EQCM3B12QK1e4yZSf8GtBRT0aLMNyEsBc_DhVfRRtOEffLez"
          ? TON_ADDRESS
          : infoConfirm?.token_a,
      token1_address: infoConfirm?.token_b,
      token0_amount: infoConfirm?.token_a_units,
      token1_amount: infoConfirm?.token_b_units,
      min_lp_out: Number(infoConfirm?.token_a_units),
    };
    try {
      const res = await KIBBLE_API.confirmSimulateCreatePool(params);
      if (res.status === 200) {
        setTransactionData(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (confirmModal) {
      handleSubmitConfirm();
    }
  }, [confirmModal]);

  useEffect(() => {
    if (Object.keys(transactionData).length === 0) {
      setIsLoadingConfirm(true);
    } else {
      setIsLoadingConfirm(false);
    }
  }, [transactionData]);

  const handleConfirm = async () => {
    try {
      const respons = await tonConnectUI?.sendTransaction({
        validUntil: transactionData && transactionData.valid_until,
        messages: transactionData.messages.map((message: any) => ({
          address: message.to,
          amount: message.amount,
          payload: message.payload,
        })),
      });

      if (respons.boc) {
        setLoadingWaitPool(true);
      }
    } catch (e) {
      console.log(e);
      setLoadingWaitPool(false);
    }
  };

  const navigate = useNavigate();
  const handleCheckPoolExist = async () => {
    const params = {
      token0_address: asset0.contract_address,
      token1_address: asset1.contract_address,
    };
    try {
      const res = await KIBBLE_API.checkTokenInPools(params);
      if (res.status === 200) {
        const result = res.data.is_existed;
        if (result) {
          setLoadingWaitPool(false);
          navigate(
            `/liquidity/provide`
          );
        } else {
          setLoadingWaitPool(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const intervalRef: any = useRef(null);

  useEffect(() => {
    if (loadingWaitPool) {
      intervalRef.current = setInterval(() => {
        handleCheckPoolExist();
      }, 10000);
      document.body.style.pointerEvents = "none";
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        document.body.style.pointerEvents = "auto";
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        document.body.style.pointerEvents = "auto";
      }
    };
  }, [loadingWaitPool]);

  return (
    <CreatePoolConfirmContainer>
      {loadingWaitPool ? (
        <WaitingPoolCreated className={theme}>
          <LoadingSpin />
          <p>Please waiting until pool has been created</p>
        </WaitingPoolCreated>
      ) : (
        <>
          <CPHeader className={theme}>
            <p>
              {asset0?.symbol}/{asset1?.symbol} pool
            </p>
          </CPHeader>
          <CPInfoConfirmAsset className={theme}>
            <ConfirmAssetRow>
              <div>
                <figure>
                  <img
                    src={asset0?.image_url}
                    alt="icon"
                    onError={(e) => (e.currentTarget.src = default_token_image)}
                  />
                </figure>
                <div>
                  <p>{asset0?.symbol}</p>
                  <p>{asset0?.display_name}</p>
                </div>
              </div>
              <div>
                <p>
                  {infoConfirm ? (
                    <>
                      {convertFixed(
                        Number(
                          Coins.fromNano(
                            infoConfirm && infoConfirm?.token_a_units,
                            asset0?.decimals
                          )
                        )
                      )}
                    </>
                  ) : (
                    ""
                  )}
                </p>
              </div>
            </ConfirmAssetRow>
            <ConfirmAssetRow>
              <div>
                <figure>
                  <img
                    src={asset1?.image_url}
                    alt="icon"
                    onError={(e) => (e.currentTarget.src = default_token_image)}
                  />
                </figure>
                <div>
                  <p>{asset1?.symbol}</p>
                  <p>{asset1?.display_name}</p>
                </div>
              </div>
              <div>
                <p>
                  {infoConfirm ? (
                    <>
                      {convertFixed(
                        Number(
                          Coins.fromNano(
                            infoConfirm && infoConfirm?.token_b_units,
                            asset1?.decimals
                          )
                        )
                      )}
                    </>
                  ) : (
                    ""
                  )}
                </p>
              </div>
            </ConfirmAssetRow>
          </CPInfoConfirmAsset>
          <SwapDetail
            style={{
              marginBottom: "20px",
            }}
          >
            <SwapDetailBlock>
              <SwapDetailRow className={theme}>
                <p>1 {asset0?.symbol} price</p>
                <p>
                  {convertFixed(token1Amount / token0Amount)} {asset1?.symbol}
                </p>
              </SwapDetailRow>
              <SwapDetailRow className={theme}>
                <p>1 {asset1?.symbol} price</p>
                <p>
                  {convertFixed(token0Amount / token1Amount)} {asset0?.symbol}
                </p>
              </SwapDetailRow>
              <SwapDetailRow className={theme}>
                <p>Blockchain Fee:</p>
                <p>0.3-1.6 TON</p>
              </SwapDetailRow>
            </SwapDetailBlock>
          </SwapDetail>
          <ButtonCommon
            style={{
              pointerEvents: isLoadingConfirm ? "none" : "auto",
            }}
            disabled={isLoadingConfirm}
            onClick={() => {
              handleConfirm();
            }}
          >
            {isLoadingConfirm ? (
              <Loading status={true} content="Waiting" />
            ) : (
              "Confirm"
            )}
          </ButtonCommon>
        </>
      )}
    </CreatePoolConfirmContainer>
  );
};

export default CreatePoolConfirm;
