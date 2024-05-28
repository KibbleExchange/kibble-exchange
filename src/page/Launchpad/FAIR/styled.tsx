import styled from "styled-components";
import { SwapChooseDefault, SwapInputValue } from "../../Swap/styled";

export const FairLaunchContainer = styled.div``;
export const FairLaunchWrapper = styled.div``;
export const FairList = styled.ul`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  & > li {
    width: calc(33.33% - 11px);
    padding: 16px;
    border-radius: 16px;
    border: 1px solid #4d4d57;
    background: var(--Stake-Bg);
    transition: all 0.25s linear;
    cursor: pointer;
    &:hover {
      border: 1px solid #f7f7f8;
    }
    &.light {
      &:hover {
        border: 1px solid #000;
      }
    }
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    & > li {
      width: calc(50% - 11px);
    }
  }
  @media screen and (max-width: 767px) {
    flex-wrap: nowrap;
    overflow-x: scroll;
    scrollbar-color: transparent transparent;
    scrollbar-width: thin;
    -ms-overflow-style: none;
    /* width */
    & > li {
      width: 100%;
    }
  }
  * {
    box-sizing: border-box;
  }
`;
export const FairHeader = styled.div`
  display: flex;
  gap: 8px;
  /* justify-content: space-between; */
  margin-bottom: 10px;
  .img-header {
    width: 44px;
    img {
      border-radius: 6px;
      width: 100%;
    }
  }
`;
export const FairTags = styled.div`
  h2 {
    color: var(--Stake-Title);
    font-size: 18px;
    display: flex;
    gap: 16px;
    font-family: DirtyLine;
    text-transform: lowercase;
  }
`;
export const FairStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  div {
    &:nth-child(1) {
      width: 70px;
      display: flex;
      padding: 0px 8px;
      justify-content: center;
      align-items: center;
      gap: 4px;
      border-radius: 6px;
      background: var(--Sale-live-Bg);
      p {
        color: var(--Sale-live-text);
        text-align: center;
        font-family: Syne;
        font-size: 13px;
        font-style: normal;
        font-weight: 500;
        line-height: 150%; /* 16.5px */
      }
    }
    &:nth-child(2) {
      width: 90px;
      display: flex;
      padding: 0px 8px;
      justify-content: center;
      align-items: center;
      gap: 4px;
      border-radius: 6px;
      border-radius: 6px;
      background: var(--LP-fee-Bg);
      p {
        color: var(--LP-fee-text);
        text-align: center;
        font-family: Syne;
        font-size: 13px;
        font-style: normal;
        font-weight: 500;
        line-height: 150%; /* 16.5px */
      }
    }
  }
`;

export const FairBox = styled.div`
  padding: 8px;
  border-radius: 8px;
  background: var(--Fair-Box);
  margin-top: 8px;
  width: 100%;
  ${SwapInputValue} , ${SwapChooseDefault} {
    p {
      color: var(--Stake-Text);
    }
    .ant-input-outlined{
        color: var(--Stake-Text) ;
    }
    ${SwapInputValue} {
      input {
        color: var(--Stake-Text);
      }
    }
  }
`;
export const FairBoxRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
  p {
    color: var(--Neutral-400, #92929e);
    font-family: Syne;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 125%; /* 13.75px */
  }
  h2 {
    color: var(--Stake-Text-Day);
    font-family: DMMono-400;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: 125%; /* 15px */
  }
`;
export const FairProgress = styled.div`
  width: 100%;
`;
export const FairProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
  p {
    color: var(--Progress-Text);
    font-size: 16px;
    font-weight: 500;
    span {
      margin-left: 5px;
      color: #828282;
      font-size: 14px;
      font-weight: 500;
    }
    &:nth-child(2) {
      display: flex;
      padding: 0px 8px;
      justify-content: center;
      align-items: center;
      gap: 4px;
      border-radius: 6px;
      background: var(--Sale-live-Bg);
      span {
        color: var(--Sale-live-text);
        text-align: center;
        font-family: DMMono-500;
        font-size: 12px;
        font-style: normal;
        font-weight: 500;
        line-height: 150%; /* 16.5px */
      }
    }
  }
`;
export const FairProgressBar = styled.div<{ Progress: any }>`
  background: rgba(105, 105, 105, 0.25);
  border-radius: 4px;
  span {
    position: relative;
    display: block;
    width: ${({ Progress }) => Progress}%;
    height: 7px;
    border-radius: 4px;
    background: var(--Progress-Thumnail);
    &::before {
      content: "";
      position: absolute;
      right: 0;
      top: 50%;
      margin-top: -11px;
      width: 18px;
      height: 18px;
      border-radius: 44.382px;
      background: var(--Progress-Blur);
      filter: blur(12px);
    }
  }
`;

export const FairProgressPercent = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 6px;
  span {
    text-align: right;
    font-family: DMMono-400;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 125%; /* 15px */
    &:nth-child(1) {
      color: var(--Stake-Text-Day);
    }
    &:nth-child(2) {
      color: var(--Neutral-500, #6e6e7c);
    }
  }
`;

export const FairProgressCompare = styled.div`
  display: flex;
  padding: 4px 8px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  align-self: stretch;
  border-radius: 6px;
  background: var(--Progress-Price);
  margin-top: 6px;
  p {
    color: var(--Progress-Compare);
    font-family: Syne;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 125%;
    text-align: center;
    span {
      color: var(--Progress-Compare);
      text-align: center;
      font-family: DMMono-500;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 125%; /* 15px */
    }
  }
`;

export const FairEndIn = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
  margin-bottom: 10px;
  width: 100%;
  p {
    color: var(--Stake-Text-Emtry);
    font-family: Syne;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 125%; /* 15px */
  }
`;

export const FairTime = styled.div`
  display: flex;
  align-items: center;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4.493px;
    border: 0.749px solid var(--Neutral-700, #4d4d57);
    background: var(--Stake-Bg-countDown);
    width: 30px;
    height: 30px;
  }
  p,
  span {
    color: var(--Neutral-100, #eeeef0);
    text-align: center;
    font-family: DMMono-500;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 125%; /* 12.5px */
  }
`;
