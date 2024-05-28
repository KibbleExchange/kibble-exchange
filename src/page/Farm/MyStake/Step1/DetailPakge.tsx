import styled from "styled-components";
import BgDetail from "../../../../assets/Staking/BgDetail.svg";
import bgDetaileW from "../../../../assets/Staking/BgDetailW.svg";
import TokentStyle2 from "../../../../assets/Staking/KibleIconTokent.png";
import { CountDown } from "./ElmStakePage";
import { AddBtn, TradeBtn } from "../../../Liquidity/Details/styled";
import {
  AmountItem,
  AmountList,
  AmountTitle,
  BlockStakingRewards,
  BlockStakingRewardsNumber,
  BlockStakingRewardsTitle,
  BlockSummary,
  BlockTitle,
} from "../../NewStake/styled";
import { useContext, useState } from "react";
import { ButtonCommon, ContextProviderWrapper } from "@kibble-exchange/uikit";

const DetailPage = ({ data, action, setOpenConfirmModal }: any) => {
  const [showMore, setShowMore] = useState(true);
  const { theme }: any = useContext(ContextProviderWrapper);
  const handleShowMore = () => {
    setShowMore(!showMore);
  };
  return (
    <DetailContainer>
      <DetailPakgeTitle theme={theme} className={theme}>
        <h3>You staked</h3>
        <p>
          {data.values} <img src={TokentStyle2} alt="icon" />{" "}
        </p>
      </DetailPakgeTitle>
      <CountContainer>
        <h1>Your stake ends in:</h1> <CountDown time={data?.endTime} />
      </CountContainer>
      <BlockStakingRewards>
        <BlockStakingRewardsTitle>Staking rewards</BlockStakingRewardsTitle>
        <BlockStakingRewardsNumber>
          {data.values}
          <span>KIB</span>
        </BlockStakingRewardsNumber>
      </BlockStakingRewards>
      <BlockSummary>
        <BlockTitle>
          <AmountTitle>Summary</AmountTitle>
          <span onClick={handleShowMore}>Show less</span>
        </BlockTitle>
        <AmountList style={{ height: showMore ? "85px" : "0" }}>
          {DataSummaryList.map((item: any, index: number) => (
            <AmountItem key={index}>
              <span>{item.textLeft}</span>
              <span>{item.textRight}</span>
            </AmountItem>
          ))}
        </AmountList>
      </BlockSummary>
      <BtnGroup isclaimed={data.isClaimed} theme={theme} className={theme}>
        <ButtonCommon
          style={{
            pointerEvents: "none",
          }}
          background="#43424A"
          color="#9e9e9e"
          width="40%"
          className="button-unstake"
        >
          <p>Change Duration</p>
        </ButtonCommon>
        {data.endTime === 0 ? (
          <>
            <ButtonCommon width="60%">
              <p>Re-stake</p>
            </ButtonCommon>
          </>
        ) : (
          <>
            <ButtonCommon onClick={() => {
              setOpenConfirmModal(true)
            }} width="60%">
              <p>Claim reward</p>
            </ButtonCommon>
          </>
        )}
      </BtnGroup>
    </DetailContainer>
  );
};
export default DetailPage;

const DataSummaryList = [
  {
    textLeft: "Stake day:",
    textRight: "---",
  },
  {
    textLeft: "Interest end day:",
    textRight: "July 17, 2024 05:00AM",
  },
  {
    textLeft: "Redemption period:",
    textRight: "3 months",
  },
  {
    textLeft: "Redemption date:",
    textRight: "July 17, 2024 06:00AM",
  },
];

const DetailContainer = styled.div`
  width: 100%;
  ${AmountItem} {
    span {
      font-size: 14px;
    }
  }
`;
export const DetailPakgeTitle = styled.div<{ theme?: any }>`
  width: auto;
  padding: 12px 12px 20px;
  border-radius: 10.12px;
  background-image: url(${({ theme }) => theme !== "light" ? BgDetail : bgDetaileW});
  background-position: bottom right;
  background-size: cover;
  display: flex;
  flex-direction: column;
  gap: 10px;
  h3 {
    color: var(--Stake-Title);
    font-size: 15px;
    font-weight: 600;
  }
  p {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    color: var(--Stake-Title);
    text-align: center;
    font-family: DMMono-400;
    font-size: 20px;
  }
  img {
    border-radius: 50%;
  }
`;
const CountContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 9px 0;
  h1 {
    color: var(--Stake-Text);
    font-family: Dirtyline;
    font-size: 16px;
    text-transform: lowercase;
  }
`;
const BtnGroup = styled.div<{ isclaimed?: boolean; theme?: any }>`
  width: 100%;
  display: flex;
  gap: 10px;
  padding-top: 13px;
  margin-top: 13px;
  border-top: 1px dashed var(--Neutral-800, #43424a);
  ${TradeBtn} , ${AddBtn} {
    width: calc(50% - 5px);
    padding: 8px 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    p {
      color: #fff;
      font-size: 12px;
      font-weight: 500;
    }
  }
  ${({ isclaimed }) =>
    !isclaimed
      ? `${AddBtn}{opacity: 0.5 ; pointer-events: none;}`
      : `${TradeBtn}{opacity: 0.5 ; pointer-events: none;}`}
  &.light {
    .button-unstake {
      background-color: #EEEEF0;
      color: #141518;
    }
  }
`;
