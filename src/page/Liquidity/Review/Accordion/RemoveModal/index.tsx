import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import { Pool } from "../../../../../store/api/dexApiTypes";
import { useRemoveLiquidityQuery } from "../../../../../store/api/dexApiSlice";
import {
  ConfirmHeader,
  ConfirmRemoveInfo,
  ConfirmRemovePrice,
  ConfirmWithdrawContent,
  ConfirmWithdrawInput,
  ConfirmWithdrawPercentage,
  RemoveWrapperButtons,
  ReviewLiquidityRemoveContainer,
  WithdrawContentRow,
} from "./styled";
import Loading from "../../../../../components/Loading";
import toast from "react-hot-toast";
import percent from "../../../../../assets/Dashboard/Common/percent.svg";
import { useContext, useEffect, useState } from "react";
import externalLink from "../../../../../assets/Dashboard/Common/external_link_blue.svg";
import { Link, useNavigate } from "react-router-dom";
import default_token_image from "../../../../../assets/Dashboard/Common/default-token-image.png";
import { Coins } from "ton3-core";
import { WaitingPoolCreated } from "../../../CreatePool/Confirm/styled";
import block_gif from "../../../../../assets/gif/block.gif";
import { CreatePoolHint } from "../../../Add/styled";
import { InfoCircleOutlined } from "@ant-design/icons";
import { ButtonCommon, ContextProviderWrapper, InputCommon, convertFixed } from "@kibble-exchange/uikit";

export interface RemoveLiquidityProps {
  pool: Pool;
  setModalConfirmRemove: any;
  modalConfirmRemove: boolean;
  token0Address?: any;
  token1Address?: any;
  infoNewToken?: any;
  isLoadingSearch?: any;
  assetsInfo?: any;
  ratio0_1?: any;
  ratio1_0?: any;
}

const ReviewLiquidityRemove = ({
  pool,
  assetsInfo,
  setModalConfirmRemove,
  modalConfirmRemove,
  token0Address,
  token1Address,
  infoNewToken,
  isLoadingSearch,
  ratio0_1,
  ratio1_0,
}: RemoveLiquidityProps) => {
  const [tonConnectUI] = useTonConnectUI();
  const address = useTonAddress();
  const [inputValue, setInputValue] = useState(100);
  const { theme } = useContext(ContextProviderWrapper)!;
  const {
    data: transactionData,
    isFetching: isLoading,
    refetch,
    status,
  } = useRemoveLiquidityQuery(
    {
      user_wallet_address: address,
      token0_address: pool?.token0_address,
      token1_address: pool?.token1_address,
      lp_tokens_amount: (((pool?.lp_balance || 0) * inputValue) / 100)
        .toFixed(0)
        .toString(),
    },
    {
      skip: !pool?.lp_balance || address === "" || !modalConfirmRemove,
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    if (status === "rejected") {
      toast.error("Progress error, please try again");
      setModalConfirmRemove(false);
    }
  }, [status]);

  const navigate = useNavigate();

  const [progressStatus, setProgressStatus] = useState(false);
  const handleConfirm = async () => {
    setModalConfirmRemove(false);
    if (!transactionData) {
      return;
    }

    try {
      const res = await tonConnectUI?.sendTransaction({
        validUntil: transactionData?.valid_until,
        messages: transactionData?.messages.map((message) => ({
          address: message.to,
          amount: message.amount,
          payload: message.payload,
        })),
      });

      if (res.boc) {
        toast.success("Withdraw successfully, please hang on a sec");
        navigate("/liquidity");
      }
    } catch (error) {
      console.log(error);
      setProgressStatus(false);
      toast.error("User has rejected confirm");
    }
  };

  const percentageWithdraw = [20, 50, 75, 100];
  const handleChangeInputValue = (e: any) => {
    setInputValue(e.target.value);
    refetch();
  };

  return (
    <ReviewLiquidityRemoveContainer>
      {progressStatus ? (
        <>
          <WaitingPoolCreated className={theme}>
            <figure>
              <img src={block_gif} alt="icon" />
            </figure>
            <p>Confirm transaction in your wallet application</p>
            <span>
              Withdraw{" "}
              <span>
                {Object.keys(infoNewToken)?.length > 0 &&
                token0Address === undefined &&
                !isLoadingSearch &&
                assetsInfo &&
                pool ? (
                  <>
                    {convertFixed(
                      Number(
                        Coins?.fromNano(
                          (
                            (Number(pool?.reserve0) * inputValue) /
                            100
                          ).toString(),
                          Number(infoNewToken?.decimals)
                        )
                      )
                    )}
                  </>
                ) : Object.keys(infoNewToken)?.length < 1 ? (
                  <>--</>
                ) : (
                  <>
                    {convertFixed(
                      Number(
                        Coins?.fromNano(
                          (
                            (Number(pool?.reserve0) * inputValue) /
                            100
                          ).toString(),
                          Number(token0Address?.decimals)
                        )
                      )
                    )}
                  </>
                )}
              </span>{" "}
              {token0Address === undefined
                ? infoNewToken?.symbol
                : token0Address?.symbol}{" "}
              ,{" "}
              <span>
                {Object.keys(infoNewToken)?.length > 0 &&
                token1Address === undefined &&
                !isLoadingSearch &&
                assetsInfo &&
                pool ? (
                  <>
                    {convertFixed(
                      Number(
                        Coins?.fromNano(
                          (
                            (Number(pool?.reserve1) * inputValue) /
                            100
                          ).toString(),
                          Number(infoNewToken?.decimals)
                        )
                      )
                    )}
                  </>
                ) : Object.keys(infoNewToken)?.length < 1 ? (
                  <>--</>
                ) : (
                  <>
                    {convertFixed(
                      Number(
                        Coins?.fromNano(
                          (
                            (Number(pool?.reserve1) * inputValue) /
                            100
                          ).toString(),
                          Number(token1Address?.decimals)
                        )
                      )
                    )}
                  </>
                )}
              </span>{" "}
              {token1Address === undefined
                ? infoNewToken?.symbol
                : token1Address?.symbol}
            </span>
            <CreatePoolHint className={theme}>
              <InfoCircleOutlined
                style={{
                  marginRight: "5px",
                }}
              />
              You can also turn this pop up off while confirm your transaction.
            </CreatePoolHint>
          </WaitingPoolCreated>
        </>
      ) : (
        <>
          <ConfirmRemoveInfo className={theme}>
            <ConfirmHeader>
              <p>
                {Object.keys(infoNewToken)?.length > 0 &&
                token0Address === undefined
                  ? infoNewToken?.symbol
                  : token0Address?.symbol}{" "}
                /{" "}
                {Object.keys(infoNewToken)?.length > 0 &&
                token1Address === undefined
                  ? infoNewToken?.symbol
                  : token1Address?.symbol}{" "}
                Pool
              </p>
            </ConfirmHeader>
            <ConfirmWithdrawInput className={theme}>
              <InputCommon
                suffix={<img src={percent} alt="percent" />}
                placeHolder="0"
                type="number"
                value={inputValue}
                onChange={handleChangeInputValue}
                disabled={isLoading ? true : false}
              />
            </ConfirmWithdrawInput>
            <ConfirmWithdrawPercentage className={theme}>
              {percentageWithdraw.map((item, index) => {
                return (
                  <li
                    style={{
                      pointerEvents: isLoading ? "none" : "auto",
                    }}
                    className={inputValue === item ? "active" : ""}
                    onClick={() => {
                      setInputValue(item);
                    }}
                    key={index}
                  >
                    {item === 100 ? "MAX" : item}
                  </li>
                );
              })}
            </ConfirmWithdrawPercentage>
            <ConfirmWithdrawContent>
              <WithdrawContentRow>
                <div>
                  <figure>
                    <img
                      src={
                        token0Address === undefined
                          ? default_token_image
                          : token0Address?.image_url
                      }
                      alt="icon"
                      onError={(e) =>
                        (e.currentTarget.src = default_token_image)
                      }
                    />
                  </figure>
                  <div>
                    <p>
                      {Object.keys(infoNewToken)?.length > 0 &&
                      token0Address === undefined &&
                      !isLoadingSearch &&
                      assetsInfo &&
                      pool ? (
                        <>
                          {convertFixed(
                            Number(
                              Coins?.fromNano(
                                (
                                  (Number(pool?.reserve0) * inputValue) /
                                  100
                                ).toString(),
                                Number(infoNewToken?.decimals)
                              )
                            )
                          )}
                        </>
                      ) : Object.keys(infoNewToken)?.length < 1 &&
                        token0Address === undefined ? (
                        <>--</>
                      ) : (
                        <>
                          {convertFixed(
                            Number(
                              Coins?.fromNano(
                                (
                                  (Number(pool?.reserve0) * inputValue) /
                                  100
                                ).toString(),
                                Number(token0Address?.decimals)
                              )
                            )
                          )}
                        </>
                      )}
                    </p>
                    <p>
                      {token0Address === undefined
                        ? infoNewToken?.symbol
                        : token0Address?.symbol}
                    </p>
                  </div>
                </div>
                <Link
                  target="_blank"
                  rel="noreferrer"
                  to={`https://tonviewer.com/${pool?.token0_address}`}
                >
                  <img src={externalLink} alt="icon" />
                </Link>
              </WithdrawContentRow>
              <WithdrawContentRow>
                <div>
                  <figure>
                    <img
                      src={
                        token1Address === undefined
                          ? default_token_image
                          : token1Address?.image_url
                      }
                      alt="icon"
                      onError={(e) =>
                        (e.currentTarget.src = default_token_image)
                      }
                    />
                  </figure>
                  <div>
                    <p>
                      {Object.keys(infoNewToken)?.length > 0 &&
                      token1Address === undefined &&
                      !isLoadingSearch &&
                      assetsInfo &&
                      pool ? (
                        <>
                          {convertFixed(
                            Number(
                              Coins?.fromNano(
                                (
                                  (Number(pool?.reserve1) * inputValue) /
                                  100
                                ).toString(),
                                Number(infoNewToken?.decimals)
                              )
                            )
                          )}
                        </>
                      ) : Object.keys(infoNewToken)?.length < 1 &&
                        token1Address === undefined ? (
                        <>--</>
                      ) : (
                        <>
                          {convertFixed(
                            Number(
                              Coins?.fromNano(
                                (
                                  (Number(pool?.reserve1) * inputValue) /
                                  100
                                ).toString(),
                                Number(token1Address?.decimals)
                              )
                            )
                          )}
                        </>
                      )}
                    </p>
                    <p>
                      {token1Address === undefined
                        ? infoNewToken?.symbol
                        : token1Address?.symbol}
                    </p>
                  </div>
                </div>
                <Link
                  target="_blank"
                  rel="noreferrer"
                  to={`https://tonviewer.com/${pool?.token1_address}`}
                >
                  <img src={externalLink} alt="icon" />
                </Link>
              </WithdrawContentRow>
            </ConfirmWithdrawContent>
          </ConfirmRemoveInfo>
          <ConfirmRemovePrice className={theme}>
            <div>
              <p>Price</p>
              <p>
                <span className="number">1</span>
                {token0Address === undefined
                  ? infoNewToken?.symbol
                  : token0Address?.symbol}
                <span className="number">
                  {" "}
                  ~ {Number(ratio0_1).toFixed(2)}
                </span>{" "}
                {token1Address === undefined
                  ? infoNewToken?.symbol
                  : token1Address?.symbol}
              </p>
            </div>
            <div>
              <p>Blockchain fee</p>
              <p>
                <span className="number">0.1-0.5</span>TON
              </p>
            </div>
          </ConfirmRemovePrice>
          <RemoveWrapperButtons>
            <ButtonCommon
              onClick={() => {
                setModalConfirmRemove(false);
              }}
              background={"#32363f"}
              color={"#fff"}
            >
              <p>Cancel</p>
            </ButtonCommon>
            <ButtonCommon
              style={{
                cursor: !isLoading ? "pointer" : "not-allowed",
              }}
              onClick={() => {
                !isLoading ? handleConfirm() : <></>;
              }}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loading status={true} content="Waiting" />
              ) : (
                "Withdraw"
              )}
            </ButtonCommon>
          </RemoveWrapperButtons>
        </>
      )}
    </ReviewLiquidityRemoveContainer>
  );
};

export default ReviewLiquidityRemove;
