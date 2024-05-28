import styled from "styled-components";
// Image
import {
  AddBtn,
  ContentCaontainer,
  ContentLeft,
  ContentRight,
  LiquidityDetailsWrapper,
  TitleBox,
} from "../Liquidity/Details/styled";

export const BlockCommingSoon = styled.div`
  border-radius: 12px;
  border: 1px solid var(--Blue--Pri-900, #0d549b);
  background: #10101c;
  display: flex;
  align-items: center;
  padding: 0 8px;
  margin-top: 8px;
  &.light {
    border-color: #b8b8c1;
    background-color: #fff;
  }
  @media screen and (max-width: 767px) {
    margin-top: 0;
    margin-bottom: 0 !important;
    order: 1;
  }
`;
export const FarmContainer = styled.div`
  .content-left-main {
    width: 27.86%;
  }
  ${LiquidityDetailsWrapper} {
    max-width: 1250px;
  }
  ${ContentCaontainer} {
    gap: 10px;
    overflow: hidden;
  }
  ${ContentLeft} {
    width: calc(100% - 24px);
    padding: 16px 10px;
    align-self: flex-start;
  }
  ${ContentRight} {
    width: calc(72.14% - 12px);
    padding: 16px 10px;
    align-self: flex-start;
  }
  ${TitleBox} {
    margin-bottom: 20px;
    ${AddBtn} {
      display: none;
      width: fit-content;
      padding: 14px 48px;
      p {
        color: #fff;
      }
    }
  }
  @media screen and (max-width: 1280px) {
    .content-left-main {
      width: 33%;
    }
    ${ContentRight} {
      width: calc(67% - 12px);
    }
  }
  @media screen and (max-width: 919px) {
    ${ContentLeft},
    ${ContentRight},
    .content-left-main {
      width: 100%;
      box-sizing: border-box;
    }
    .content-left-main {
      display: flex;
      flex-direction: column-reverse;
    }
    ${BlockCommingSoon} {
      margin-top: 0;
      margin-bottom: 10px;
    }
  }
  @media screen and (max-width: 767px) {
    padding-bottom: 105px;
    .content-left-main {
      width: 100%;
    }
    ${ContentCaontainer} {
      position: relative;
      flex-direction: column-reverse;
    }
    ${LiquidityDetailsWrapper} {
      padding: 0px 15px;
    }
    ${TitleBox} {
      h1 {
        font-size: 28px;
      }
      p {
        font-size: 13px;
      }
    }

    ${TitleBox} {
      ${AddBtn} {
        display: flex;
      }
    }
  }
`;
export const PannerStaking = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  img {
    flex: 1;
    max-height: 100%;
    max-width: 140px;
  }
  @media screen and (min-width: 768px) {
    img {
      display: none;
    }
  }
`;
export const RightTitle = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  h1 {
    color: var(--Stake-Text);
    font-family: Dirtyline;
    font-size: 21px;
    font-style: normal;
    font-weight: 400;
    line-height: 96%; /* 20.16px */
    text-transform: lowercase;
  }
  .TabsBox {
    width: 50%;
  }
  @media screen and (max-width: 1280px) {
    .TabsBox {
      width: 70%;
    }
  }
  @media screen and (max-width: 540px) {
    display: block;
    .TabsBox {
      width: 100%;
    }
  }
`;
export const RightTitleText = styled.h2`
  color: #FFF;
  font-family: Dirtyline;
  font-size: 21px;
  text-transform: lowercase;
  margin-top: 6px;
  &.light {
    color: #43424a;
  }
`
export const BlockCommingLeft = styled.div`
  margin-right: 10px;
  img {
    width: 62px;
    height: 62px;
  }
`;
export const BlockCommingRight = styled.div``;
export const BlockCommingTextBig = styled.p`
  color: #f7f7f8;
  font-size: 14px;
  line-height: 19.2px;
  &.light {
    color: #43424A;
  }
`;
export const BlockCommingTextSmall = styled.p`
  color: #1eb0ff;
  font-family: Syne;
  font-size: 14px;
  line-height: 96%;
`;
