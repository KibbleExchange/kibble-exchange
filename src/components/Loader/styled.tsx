import styled from "styled-components";

export const ClickMaxAmount = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all 0.15s linear;
  font-size: 13px;
  font-family: DMMono-500;
  color: #92929e;
  span {
    color: #007af5;
    &:hover {
      cursor: pointer;
      color: rgba(3, 136, 246, 1);
    }
  }
`;
export const DetailButtonHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  transition: all 0.15s linear;
  p {
    font-weight: 600;
    &:nth-child(1) {
      color: #fff;
      font-size: 14px;
    }
    &:nth-child(2) {
      color: #92929e;
      font-size: 12px;
    }
  }
`;
export const SwapContent = styled.div`
  position: relative;
`;
export const SwapDetailButton = styled.div`
  padding: 10px;
  border-radius: 10px;
  background: #28272c;
  cursor: pointer;
  margin-bottom: 10px;
  &.light {
    background: #f3f4f8;
  }
`;
export const SwapExchangeIcon = styled.div`
  position: relative;
  margin: -30px auto 0;
  top: 10px;
  width: 29px;
  height: 29px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.15s linear;
  background-color: #252831;
  z-index: 3;
  &.light {
    background: #f3f4f8;
  }
  &:hover {
    transform: rotate(180deg);
  }
  img {
    width: 100%;
  }
`;
export const SwapInput = styled.div`
  position: relative;
  background-color: #28272c;
  padding: 15px;
  border-radius: 12px;
  &.light {
    background-color: #f3f4f8;
  }
  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;
export const SwapInputTitle = styled.p`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  color: #fff;
  font-size: 13px;
  line-height: 20px;
  margin-bottom: 30px;
  & > p {
    font-weight: 600;
  }
`;
export const ContentCaontainer = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  @media only screen and (max-width: 919px) {
    flex-direction: column;
    gap: 20px;
  }
`;
export const ContentLeft = styled.div`
  width: calc(35% - 5px);
  border-radius: 16px;
  border: 1.35px solid var(--Neutral-700, #4d4d57);
  background: #1c1c1e;
  padding: 26px 14px;
  align-self: stretch;
  box-sizing: border-box;
  &.light {
    background: #f3f4f8;
  }
  @media only screen and (max-width: 919px) {
    width: 100%;
  }
`;
export const TokentRates = styled.div`
  width: 100%;
  box-sizing: border-box;
  h1 {
    color: var(--Neutral-100, #eeeef0);
    font-family: Syne;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 125%; /* 15px */
    font-family: Syne;
  }
`;

export const RatesTabContainer = styled.div`
  border-radius: 8px;
  background: #28272c;
  padding: 6px;
  margin: 4px 0px;
  &.light {
    background: #f3f4f8;
  }
`;
export const RationPriceBox = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  justify-content: center;
  padding-bottom: 14px;
  position: relative;
  &::after {
    content: "";
    width: calc(100% + 12px);
    left: 50%;
    bottom: -1px;
    height: 1px;
    background: var(--Neutral-900, #3a3a40);
    position: absolute;
    transform: translateX(-50%);
  }
  p {
    color: var(--Neutral-300, #b8b8c1);
    font-family: DMMono-400;
    font-size: 20px;
    font-style: normal;
    font-weight: 300;
    line-height: 125%;
    letter-spacing: -1.4px;
    span {
      color: var(--Neutral-100, #eeeef0);
      text-align: center;
      font-family: DMMono-400;
      font-size: 20px;
      font-style: normal;
      font-weight: 500;
      line-height: 125%; /* 25px */
      letter-spacing: -1.4px;
    }
  }
  img {
    max-width: 26px;
    border-radius: 50%;
    border: 1px solid #fff;
  }
`;
export const ViewContract = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 10px 0px;
  a {
    display: flex;
    align-items: center;
    gap: 4px;
    color: var(--Neutral-400, #92929e);
    text-align: center;
    font-family: Syne;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 125%;
    img {
      width: 12px;
    }
  }
`;

export const VolumContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
  padding: 0px 0px 8px;
  &::after {
    content: "";
    position: absolute;
    height: 1px;
    width: 100%;
    bottom: -0px;
    left: 0px;
    background: var(--Neutral-900, #3a3a40);
  }
`;
export const VolumBox = styled.div`
  width: calc(50% - 4px);
  border-radius: 10.12px;
  background: #28272c;
  padding: 8px 10px;
  margin: 4px 0px;
  &.light {
    background: #f3f4f8;
  }
  h5 {
    color: var(--Neutral-400, #92929e);
    font-family: Syne;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 125%; /* 15px */
    margin-bottom: 5px;
  }
  h4 {
    color: var(--Neutral-100, #eeeef0);
    text-align: right;
    font-family: DMMono-400;
    font-size: 20px;
    font-weight: 500;
    line-height: 20px; /* 125% */
    letter-spacing: -1.28px;
    width: 100%;
  }
`;
export const ContentRight = styled.div`
  width: calc(65% - 5px);
  border-radius: 16px;
  border: 1.35px solid var(--Neutral-700, #4d4d57);
  background: #1c1c1e;
  align-self: stretch;
  padding: 24px 14px;
  &.light {
    background: #f3f4f8;
  }
  ${RatesTabContainer} {
    padding: 10px;
    margin-top: 8px;
  }
  
  box-sizing: border-box;
  @media only screen and (max-width: 919px) {
    width: 100%;
  }
`;
export const PoolAprGroups = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  margin-top: 5px;
`;
export const PoolAprBox = styled.div`
  border-radius: 10.12px;
  background: #28272c;
  padding: 12px;
  width: calc((100% - 16px) / 3);
  background-size: cover;
  background-position: bottom left;
  align-self: stretch;
  &.light {
    background: #f3f4f8;
  }
  p {
    color: var(--Neutral-400, #92929e);
    font-family: Syne;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 125%; /* 15px */
    padding-bottom: 5px;
  }
  h6 {
    color: var(--Neutral-White, #fff);
    text-align: right;
    font-family: DMMono-400;
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 83.333% */
    letter-spacing: -1.44px;
  }
  @media only screen and (max-width: 540px) {
    h6{
      font-size: 20px;
    }
  }
`;
export const EarnPrice = styled.h1`
  color: var(--Neutral-100, #eeeef0);
  text-align: center;
  font-family: DMmono-400;
  font-size: 38.917px;
  font-weight: 500;
  line-height: 125%; /* 48.646px */
  letter-spacing: -2.724px;
  padding-bottom: 20px;
  position: relative;
  margin-bottom: 10px;
  &::after {
    width: calc(100% + 20px);
    height: 1px;
    content: "";
    left: 50%;
    bottom: 0px;
    position: absolute;
    background-color: #4d4d57;
    transform: translateX(-50%);
  }
  @media only screen and (max-width: 768px) {
      font-size: 30px;
  }
`;
export const EarnBtnGroup = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 15px;
  justify-content: space-between;
  p {
    color: var(--Neutral-400, #92929e);
    text-align: center;
    font-family: Syne;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 125%;
    gap: 4px;
    display: flex;
    align-items: center;
  }
  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
  @media only screen and (max-width: 540px) {
    p {
      text-align: left;
      width: 100%;
    }
  }
`;
export const EarnBtnRights = styled.div`
  display: flex;
  gap: 4px;
 
  @media only screen and (max-width: 540px) {
    width: 100%;
    justify-content: flex-start;
    align-items: flex-start;
    
  }
`;
export const PollTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  h3 {
    color: #fff;
    font-size: 21px;
    font-family: DMMono-400;
  }
`;