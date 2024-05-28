import styled from "styled-components";
import { SwapInputTitle, SwapInputWrapper } from "../../Swap/styled";
import BoxDurationBg from "../../../assets/Staking/BoxDurationBg02.png";
import { TitleContainer } from "../../../components/Common/Title/styled";

export const ContentRightInner = styled.div`
  margin-top: 20px;
  @media screen and (max-width: 767px) {
    margin-top: 0;
  }
`;
export const ContentDuration = styled.div`
  display: flex;
  @media screen and (max-width: 767px) {
    display: block;
  }
`;
export const ContentInnerLeft = styled.div`
  border-right: solid 1px #3a3a40;
  width: 45%;
  padding-right: 10px;
  @media screen and (max-width: 767px) {
    width: 100%;
    border-right: unset;
    padding-right: 0;
    margin-bottom: 20px;
  }
`;
export const ButtonListDuration = styled.ul`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 5px;
`;
export const ButtonItemDay = styled.p`
  font-weight: 500;
  font-size: 18px;
  font-family: DMMono-500;
  span {
    &:first-child {
      margin-right: 7px;
    }
  }
`;
export const ButtonItemPercen = styled.p`
  font-family: DMMono-400;
  font-size: 14px;
  span {
    &:first-child {
      margin-right: 12px;
    }
  }
`;
export const ContentInnerRight = styled.div`
  margin-left: 10px;
  width: 55%;
  @media screen and (max-width: 767px) {
    width: auto;
    margin-left: 0;
  }
`;
export const BlockAmount = styled.div`
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px dashed #43424A;
  ${TitleContainer} {
    margin-bottom: 20px;
  }
`;
export const AmountTitle = styled.h3`
  color: var(--StakeText-des);
  font-size: 17px;
  margin-bottom: 3px;
`;
export const AmountList = styled.ul`
  overflow: hidden;
  transition: all 0.26s ease;
`;
export const AmountItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  &:not(:last-child) {
    margin-bottom: 5px;
  }
  span {
    &:nth-child(1) {
      color: #92929e;
      font-size: 15px;
      margin-right: 10px;
    }
    &:nth-child(2) {
      font-family: DMMono-400;
      color: var(--StakeText-des);
      font-size: 15px;
    }
  }
  @media screen and (max-width: 767px) {
    span {
    &:nth-child(2) {
      text-align: right;
    }
  }
  }
`;
export const BlockStaking = styled.div`
  border-bottom: 1px dashed #43424a;
  padding-bottom: 15px;
  margin-bottom: 15px;
`;
export const BlockTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 3px;
  span {
    color: #92929e;
    font-size: 14px;
    cursor: pointer;
  }
`;
export const TitleStaking = styled.h3`
  color: var(--StakeText-des);
  font-size: 17px;
`;
export const TextStaking = styled.p`
  color: #92929e;
  font-size: 15px;
  max-width: 80%;
`;
export const BlockSummary = styled.div``;
export const BlockLast = styled.div`
  margin-top: 30px;
`;
export const BlockLastItem = styled.div`
  span {
    &:nth-child(1) {
      color: var(--StakeText-des);
      font-size: 16px;
      margin-right: 7px;
    }
    &:nth-child(2) {
      color: #1eb0ff;
      font-size: 15px;
      font-family: DMMono-500;
    }
  }
`;
export const BlockStakingAmount = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  pointer-events: none;
  ${SwapInputTitle} {
    margin-bottom: 10px;
  }
  ${SwapInputWrapper} {
    input,
    div {
      width: 100%;
    }
  }
`;
export const BlockStakingRewards = styled.div`
  border-radius: 8px;
  color: var(--Stake-rewar-Text);
  padding: 15px;
  min-height: 46px;
  background: var(--Stake-rewar-Bg) url(${BoxDurationBg}) bottom right / contain
    no-repeat;
  margin-bottom: 10px;
`;
export const BlockStakingRewardsTitle = styled.p`
  font-size: 14px;
  margin-bottom: 10px;
`;
export const BlockStakingRewardsNumber = styled.p`
  text-align: right;
  font-family: DMMono-500;
  font-size: 17px;
  span {
    font-family: "Syne";
    margin-left: 10px;
  }
`;
export const DurationHint = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #000;
  padding: 8px 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  & > figure {
    width: 11px;
    height: 16px;
    flex-shrink: 0;
    img {
      width: 100%;
      height: 100%;
    }
  }
  & > p {
    font-size: 15px;
    color: #B8B8C1;
  }
  &.light {
    background-color: #EEEEF0;
    & > p {
      color: #6E6E7C;
    }
  }
`