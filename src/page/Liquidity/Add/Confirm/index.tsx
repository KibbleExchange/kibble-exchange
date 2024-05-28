import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import {
  Asset,
  Pool,
  SimulateAddLiquidityResponse,
  TransactionData,
} from "../../../../store/api/dexApiTypes";
import {
  AddConfirmButtons,
  AddConfirmList,
  ConfirmAddLiquidityContainer,
} from "./styled";
import { Coins } from "ton3-core";
import {
  useCompleteProvideLiquidityActivateQuery,
  useCompleteProvideLiquidityQuery,
  useProvideLiquidityQuery,
} from "../../../../store/api/dexApiSlice";
import {
  RAHeader,
  ReviewwAccordionHeader,
} from "../../Review/Accordion/styled";
import Loading from "../../../../components/Loading";
import default_token_image from "../../../../assets/Dashboard/Common/default-token-image.png";
import { ConfirmSwapHeader } from "../../../Swap/Confirm/styled";
import { useContext } from "react";
import { ButtonCommon, ContextProviderWrapper } from "@kibble-exchange/uikit";

export interface ConfirmLiquidityProps {
  token0Amount: number;
  token1Amount: number;
  asset0: Asset;
  asset1: Asset;
  minExpectedTokens: number;
  expectedTokens: number;
  estimatedShare: number;
  slippageTolerance: number;
  simulateData?: SimulateAddLiquidityResponse;
  pool?: Pool;
  openConfirmModal: any;
  setOpenConfirmModal: any;
}

export type ProvideAction =
  | "provide"
  | "provide_second"
  | "direct_add_provide"
  | "provide_additional_amount";

const ConfirmAddLiquidity = ({
  token0Amount,
  token1Amount,
  asset0,
  asset1,
  expectedTokens,
  slippageTolerance,
  simulateData,
  pool,
  setOpenConfirmModal,
  openConfirmModal,
}: ConfirmLiquidityProps) => {
  const {theme} = useContext(ContextProviderWrapper)!
  const [tonConnectUI] = useTonConnectUI();
  const address = useTonAddress();
  const needsCompletion = simulateData?.action !== "provide";
  const needsActivation = simulateData?.action === "direct_add_provide";
  const [token0PoolBalance, token1PoolBalance] =
    asset0 && asset0.contract_address === pool?.token0_address
      ? [pool?.token0_balance, pool?.token1_balance]
      : [pool?.token1_balance, pool?.token0_balance];

  const token0ToCompleteAmount = new Coins(token0Amount, {
    decimals: asset0 && asset0?.decimals,
  }).sub(Coins.fromNano(token0PoolBalance ?? 0, asset0 && asset0?.decimals));
  const token1ToCompleteAmount = new Coins(token1Amount, {
    decimals: asset1 && asset1?.decimals,
  }).sub(Coins.fromNano(token1PoolBalance ?? 0, asset1 && asset1?.decimals));

  const {
    data: provideTransactionData,
    isFetching: fetchingProvideTransactionData,
  } = useProvideLiquidityQuery(
    {
      user_wallet_address: address,
      token0_address: asset0 && asset0.contract_address,
      token1_address: asset1 && asset1.contract_address,
      token0_amount: simulateData?.token0_amount?.toString() ?? "0",
      token1_amount: simulateData?.token1_amount?.toString() ?? "0",
      min_lp_out: simulateData?.min_expected_tokens?.toString() ?? "0",
    },
    {
      skip:
        address === "" || needsCompletion || !simulateData || !openConfirmModal,
      refetchOnMountOrArgChange: true,
    }
  );

  const secondTokenAddress =
    simulateData?.send_token_address === pool?.token0_address
      ? pool?.token1_address
      : pool?.token0_address;

  const {
    data: additionalProvideTransactionData,
    isFetching: fetchingAdditionalProvide,
  } = useCompleteProvideLiquidityQuery(
    {
      user_wallet_address: address,
      token_address: simulateData?.send_token_address ?? "",
      second_token_address: secondTokenAddress ?? "",
      token_amount: simulateData?.send_amount?.toString() ?? "0",
      min_lp_out: simulateData?.min_expected_tokens.toString() ?? "0",
    },
    {
      skip:
        !needsCompletion ||
        needsActivation ||
        address === "" ||
        !simulateData ||
        !simulateData.send_amount ||
        !simulateData.send_token_address ||
        !secondTokenAddress ||
        !openConfirmModal,
      refetchOnMountOrArgChange: true,
    }
  );

  const { data: activateTransactionData } =
    useCompleteProvideLiquidityActivateQuery(
      {
        token0_amount: simulateData?.token0_amount?.toString() ?? "0",
        token1_amount: simulateData?.token1_amount?.toString() ?? "0",
        min_lp_out: simulateData?.min_expected_tokens?.toString() ?? "0",
        lp_account_address: pool?.lp_account_address ?? "",
      },
      {
        skip: !needsActivation || !simulateData || !pool || !openConfirmModal,
        refetchOnMountOrArgChange: true,
      }
    );

  const [transactionData, action]: [
    TransactionData | undefined,
    ProvideAction
  ] = needsActivation
      ? [activateTransactionData, "direct_add_provide"]
      : !needsCompletion
        ? [provideTransactionData, "provide"]
        : [additionalProvideTransactionData, "provide_additional_amount"];

  const handleConfirm = async () => {
    setOpenConfirmModal(false);
    if (!transactionData) {
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
    } catch (e) {
      console.log(e);
      // TODO: Transaction is canceled. Show Transaction canceled Modal.
    }
  };

  return (
    <ConfirmAddLiquidityContainer className={theme}>
      <ReviewwAccordionHeader className={theme}>
        <ConfirmSwapHeader className={theme}>
          <div>
            <div>
              <p>You send</p>
              <div>
                <figure>
                  <img
                    onError={(e) => (e.currentTarget.src = default_token_image)}
                    src={asset0 && asset0.image_url}
                    width="48"
                    height="48"
                    alt={asset0 && asset0.symbol}
                  />
                </figure>
                <p>{`${asset0 && asset0.symbol}`}</p>
              </div>
            </div>
            <p>{`${token0Amount}`}</p>
          </div>
          <div>
            <div>
              <p>You send</p>
              <div>
                <figure>
                  <img
                    onError={(e) => (e.currentTarget.src = default_token_image)}
                    src={asset1 && asset1.image_url}
                    width="48"
                    height="48"
                    alt={asset1 && asset1.symbol}
                  />
                </figure>
                <p>{`${asset1 && asset1.symbol}`}</p>
              </div>
            </div>
            <p>{`${token1Amount}`}</p>
          </div>
          <div>
            <div>
              <p>You receive</p>
              <div>
                <RAHeader>
                  <img
                    src={asset0 && asset0.image_url}
                    alt={asset0 && asset0.symbol}
                    style={{ width: "28px", height: "28px" }}
                    onError={(e) => (e.currentTarget.src = default_token_image)}
                  />
                  <img
                    src={asset1 && asset1.image_url}
                    alt={asset1 && asset1.symbol}
                    style={{ width: "28px", height: "28px" }}
                    onError={(e) => (e.currentTarget.src = default_token_image)}
                  />
                </RAHeader>
                <p>LP tokens</p>
              </div>
            </div>
            <p>{Coins.fromNano(expectedTokens, 9).toString()}</p>
          </div>
        </ConfirmSwapHeader>
      </ReviewwAccordionHeader>
      <p>
        The result is an orienteer. If the price changes by more than{" "}
        <span className="color-blue">{`${slippageTolerance}%`}</span>, the
        transaction will be returned.
      </p>
      <AddConfirmList>
        <ul>
          {!!token0PoolBalance && (
            <li>
              <span>Already Provided:</span>
              <span>
                {Coins.fromNano(
                  token0PoolBalance ?? 0,
                  asset0?.decimals ?? 9
                ).toString()}{" "}
                {asset0 && asset0?.symbol}
              </span>
            </li>
          )}
          {!!token1PoolBalance && (
            <li>
              <span>Already Provided:</span>
              <span>
                {Coins.fromNano(
                  token1PoolBalance ?? 0,
                  asset1?.decimals ?? 9
                ).toString()}{" "}
                {asset1 && asset1?.symbol}
              </span>
            </li>
          )}
          {!token0ToCompleteAmount.isZero() && (
            <li>
              <span>Provide to complete:</span>
              <span>
                {token0ToCompleteAmount.toString()} {asset1 && asset0?.symbol}
              </span>
            </li>
          )}
          {!token1ToCompleteAmount.isZero() && (
            <li>
              <span>Provide to complete:</span>
              <span>
                {token1ToCompleteAmount.toString()} {asset1 && asset1?.symbol}
              </span>
            </li>
          )}
          <li>
            <span>Min received:</span>
            <span>
              {Coins.fromNano(
                simulateData?.min_expected_tokens ?? "0",
                9
              ).toString()}
            </span>
          </li>
          <li>
            <span>Your share in the pool:</span>
            <span>+{simulateData?.estimated_share_of_pool.toFixed(2)}%</span>
          </li>
        </ul>
      </AddConfirmList>
      <AddConfirmButtons>
        <ButtonCommon
          onClick={() => {
            setOpenConfirmModal(false);
          }}
          background={theme === "light" ? "#EEEEF0" : "#32363f"}
          color={theme === "light" ? "#141518" : "#fff"}
        >
          <p>Cancel</p>
        </ButtonCommon>
        <ButtonCommon
          style={{
            cursor:
              !fetchingProvideTransactionData && !fetchingAdditionalProvide
                ? "pointer"
                : "not-allowed",
          }}
          onClick={handleConfirm}
          disabled={
            fetchingProvideTransactionData && fetchingProvideTransactionData
              ? true
              : false
          }
        >
          {!fetchingProvideTransactionData && !fetchingAdditionalProvide ? (
            "Confirm"
          ) : (
            <Loading status={true} content="Waiting" />
          )}
        </ButtonCommon>
      </AddConfirmButtons>
    </ConfirmAddLiquidityContainer>
  );
};

export default ConfirmAddLiquidity;
