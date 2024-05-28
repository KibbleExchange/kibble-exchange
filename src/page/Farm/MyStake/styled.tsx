import styled from "styled-components";
import { BlockStakingAmount, BlockStakingRewards } from "../NewStake/styled";
import { AddBtn, TradeBtn } from "../../Liquidity/Details/styled";
import { SwapInput } from "../../Swap/styled";
import { NoData } from "../Finished/styled";

export const MyStakeContainer = styled.div<{ activeElm?: any; ischange?: any }>`
  display: flex;
  align-items: flex-start;
  width: 100%;
  margin-top: 20px;
  gap: 20px;
  position: relative;
  min-height: 100px;
  &::after {
    width: 1px;
    height: 100%;
    content: "";
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    position: absolute;
    opacity: 0;
    background: var(--Stake-Box-affter, #3a3a40);
  }
  ${BlockStakingRewards} {
    min-height: unset;
  }
  @media only screen and (max-width: 768px) {
    flex-direction: column;
    ${BlockStakingAmount} {
      margin: 0px;
    }
    &::after {
      display: none;
    }
    ${NoData} {
      margin-top: -30px;
    }
  }
`;
export const MyStakeContentBox = styled.div<{ ischange?: any }>`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  @media only screen and (max-width: 768px) {
    width: 100%;
    display: ${({ ischange }) => (ischange ? "none" : "flex")};
  }
`;
export const MyStakeContentScroll = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 428px;
  .slick-arrow {
    display: none !important;
  }
  li {
    border-radius: 9px;
    background: var(--Neutral-600, #5e5e6b);
    width: 8px;
    height: 8px;
    padding: 0px;
    transition: all 0.3s linear;
    button {
      border-radius: 9px;
      background: var(--Neutral-600, #5e5e6b);
      width: 8px;
      height: 8px;
      padding: 0px;
      transition: all 0.3s linear;
      &::before {
        display: none;
      }
    }
  }
  .slick-dots {
    .slick-active {
      border-radius: 9px;
      background: var(--Neutral-200, #d9d9de);
      width: 24px;
      height: 8px;
      transition: all 0.3s linear;
      button {
        border-radius: 9px;
        background: var(--Neutral-200, #d9d9de);
        width: 24px;
        height: 8px;
        transition: all 0.3s linear;
      }
    }
  }
  @media only screen and (max-width: 768px) {
    width: 100%;
    padding-bottom: 35px;
  }
`;
export const MyBtnGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  ${TradeBtn} , ${AddBtn} {
    width: fit-content;
    padding: 8px 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    p {
      color: #fff;
      font-family: Syne;
      font-size: 12px;
      font-weight: 500;
      line-height: 125%; /* 15px */
    }
  }
  ${AddBtn} {
    flex: 1;
  }
`;
export const ActiveElmInfomation = styled.div`
  width: 50%;
  ${BlockStakingAmount} {
    margin-top: 0;
  }
  ${SwapInput} {
    height: 148px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  @media screen and (max-width: 767px) {
    width: 100%;
    ${SwapInput} {
      height: 80px;
      margin-bottom: 10px;
    }
  }
`;
export const ActiveElmDuration = styled.div`
  margin-bottom: 40px;
  & > p {
    color: #fff;
    font-size: 15px;
    margin-bottom: 10px;
  }
  &.light {
    & > p {
      color: #6e6e7c;
    }
  }
  @media screen and (max-width: 767px) {
    margin-bottom: 20px;
  }
`;
export const ActiveElmDurationBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 10px;
  background: #000;
  padding: 10px;
  & > p {
    &:nth-child(1) {
      font-family: DMMono-500;
      font-size: 16px;
    }
    &:nth-child(2) {
      font-family: DMMono-400;
      font-size: 14px;
    }
  }
  &.light {
    background-color: #eeeef0;
    & > p {
      color: #6e6e7c;
    }
  }
`;
export const ActiveElmButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
