import {
  useTonAddress,
  useTonConnectUI,
  useTonWallet,
} from "@tonconnect/ui-react";
import TitleCommon from "../../../components/Common/Title";
import {
  useGetAssetsQuery,
  useGetWalletPoolsQuery,
} from "../../../store/api/dexApiSlice";
import {
  RLHeader,
  ReviewLiquidityContainer,
  ReviewLiquidityWrapper,
  ReviewListEmpty,
} from "./styled";
import { Tooltip } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import wallet_icon from "../../../assets/Dashboard/Swap/wallet_icon.svg";
import ReviewAccordion from "./Accordion";
import LoadingSpin from "../../../components/Common/Loading";
import empty from "../../../assets/Dashboard/Stake/stake_empty.svg";
import { ButtonSubmit, KeyvisualButton } from "@kibble-exchange/uikit";

const ReviewLiquidity = () => {
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();
  const address = useTonAddress();

  const { data: assets } = useGetAssetsQuery();
  const { data: pools, isLoading } = useGetWalletPoolsQuery(
    address?.toString() || "",
    {
      skip: address === "",
      pollingInterval: 1000 * 60,
    }
  );

  const poolsWithLpBalance = pools?.filter(
    (pool) =>
      (pool.lp_balance && pool.lp_balance > 0) ||
      pool.token0_balance > 0 ||
      pool.token1_balance > 0
  );

  return (
    <ReviewLiquidityContainer>
      <ReviewLiquidityWrapper>
        <RLHeader>
          <div>
            <TitleCommon text={"Your liquidity"} />
            <p>Add liquidity to earn from commissions</p>
          </div>
          <Tooltip title="When you add liquidity, you are given pool tokens that represent your share.">
            <QuestionCircleOutlined
              style={{
                color: "#fff",
              }}
            />
          </Tooltip>
        </RLHeader>
        <div>
          {wallet &&
          assets &&
          poolsWithLpBalance &&
          poolsWithLpBalance.length > 0 ? (
            poolsWithLpBalance.map((pool) => {
              const key = pool.address;
              return (
                <>
                  <ReviewAccordion
                    assets={assets}
                    pool={pool}
                    key={key}
                  />
                </>
              );
            })
          ) : (
            <ReviewListEmpty>
              {!isLoading ? (
                <>
                  <img
                  width={150}
                  height={150}
                    style={{
                      marginBottom: "20px",
                    }}
                    src={empty}
                    alt="empty"
                  />
                  <p>You didn't have any active liquidity before.</p>
                </>
              ) : (
                <>
                  <LoadingSpin />
                </>
              )}
            </ReviewListEmpty>
          )}
        </div>
        {!wallet ? (
          <>
            <ButtonSubmit
              onClick={() => {
                tonConnectUI.openModal();
              }}
              background={"#0387F5"}
              color={"#fff"}
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
            </ButtonSubmit>
          </>
        ) : (
          <>
            <KeyvisualButton to={"/liquidity/provide"}>
              <p>Add Liquidity</p>
            </KeyvisualButton>
          </>
        )}
      </ReviewLiquidityWrapper>
    </ReviewLiquidityContainer>
  );
};

export default ReviewLiquidity;
