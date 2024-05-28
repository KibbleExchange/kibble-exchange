import styled from "styled-components";
import { TabsContainer } from "../../Farm/TabsSelector";
import { BackToButton } from "../../Liquidity/Details/styled";
import { ExplorePoolHeader, TabSelect } from "../../Liquidity/styled";
import { ButtonCommon } from "@kibble-exchange/uikit";

export const DetailContainer = styled.div`
  position: relative;
  max-width: 1180px;
  padding-bottom: 50px;
  margin: auto;
  * {
    box-sizing: border-box;
  }
  ${TabsContainer} {
    max-width: 420px;
  }
  @media screen and (max-width: 767px) {
    padding: 0 10px 100px;
  }
  ${BackToButton} {
    margin-bottom: 20px;
  }
  ${ExplorePoolHeader} {
    background-color: transparent;
    padding: 0;
    ${TabSelect} {
      button {
        white-space: nowrap;
      }
    }
  }
`;

export const RowDetail = styled.div`
  display: flex;
  gap: 25px;
  padding: 0 20px;
  @media screen and (max-width: 767px) {
    flex-direction: column;
    padding: 0;
  }
`;

export const BlockLeft = styled.div`
  position: relative;
  width: calc(100% - 405px);
  @media screen and (max-width: 1023px) {
    width: calc(100% - 205px);
  }
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`;
export const BlockLeftAboutProject = styled.div`
  position: relative;
`;

export const BlockLeftAboutToken = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
  @media screen and (max-width: 767px) {
    flex-direction: column;
  }
`;

export const BlockLeftAboutTokenCard = styled.div`
  border-radius: 8px;
  background: var(--tabsBar2);
  padding: 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 12px;
  h1 {
    color: #fff;
    font-size: 20px;
    display: flex;
    gap: 16px;
    font-family: DirtyLine;
    text-transform: lowercase;
  }
  .img-info {
    max-width: 220px;
    margin: 0 auto;
    width: 100%;
    img {
      width: 100%;
    }
  }
`;

export const BlockLeftAboutTokenCardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  h2 {
    color: var(--Neutral-500, #6e6e7c);
    font-family: Syne;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 125% */
  }

  span {
    color: var(--StakeText-des);
    font-family: DMMono-400;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
  }
`;

export const BlockTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border-radius: 16px;
  background: var(--Barkbucks-Lp-Bg);
  padding: 0 24px;
  .img-banner-kibble {
    max-width: 100%;
    img {
      width: 100%;
    }
  }
  @media screen and (max-width: 767px) {
    flex-direction: column-reverse;
    margin-top: 10px;
    padding: 20px 15px;
  }
`;

export const BlockText = styled.div`
  max-width: 380px;
  h1 {
    color: var(--Stake-Title);
    font-size: 24px;
    display: flex;
    gap: 16px;
    font-family: DirtyLine;
    text-transform: lowercase;
  }
  p {
    margin-top: 12px;
    color: var(--Neutral-500, #6e6e7c);
    font-family: Syne;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 120%; /* 16.8px */
  }
  @media screen and (max-width: 767px) {
    max-width: 100%;
    padding-left: 0;
  }
`;

export const BlockListSocial = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
`;

export const BlockImage = styled.div<{ bgImg: any }>`
  .img-lauch {
    max-width: 200px;
    img {
      width: 100%;
    }
  }
  @media screen and (max-width: 767px) {
    .img-lauch {
      max-width: 100%;
      /* min-height: 320px; */
      background: ${({ bgImg }) =>
        bgImg ? 'url("/static/img-banner-kibble.png") no-repeat center' : ""};
      background-size: cover;
      border-radius: 8px;
      margin-bottom: 10px;
      img {
        max-width: 100%;
        opacity: ${({ bgImg }) => (bgImg ? 0 : 1)};
        border-radius: 8px;
      }
    }
  }
`;

export const BlockTable = styled.div`
  margin-top: 20px;
  h1 {
    color: var(--Stake-Text);
    font-family: DirtyLine;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: 96%; /* 23.04px */
    text-transform: lowercase;
  }
`;

export const BlockTableBox = styled.div`
  margin-top: 10px;
  display: flex;
  padding: 12px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
  border-radius: 8px;
  background: var(--tabsBar2);
  padding-bottom: 30px;
  &.light {
    h1,
    h2 {
      color: #43424a;
    }
    p,
    li {
      color: #92929e;
    }
  }
  h1 {
    color: var(--Neutral-50, #f7f7f8);
    font-family: Syne;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 16px; /* 100% */
    text-transform: uppercase;
    margin-bottom: 12px;
  }
  h2 {
    color: var(--Neutral-500, #6e6e7c);
    font-family: Syne;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 125% */
  }

  p {
    color: var(--Blue--Pri-500, #1eb0ff);
    font-family: DMMono-400;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
    span {
      color: var(--Neutral-800, #43424a);
      font-family: Syne;
      font-size: 15px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px; /* 142.857% */
    }
  }

  span {
    color: var(--StakeText-des);
    font-family: DMMono-400;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
  }
`;

export const BlockTableRowClaim = styled.div`
  margin-bottom: 10px;
  h2 {
    color: var(--Neutral-50, #f7f7f8);
    font-family: Syne;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 14px; /* 93.333% */
  }
  p {
    color: var(--Neutral-300, #b8b8c1);
    font-family: Syne;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    margin-top: 3px;
  }
  ul {
    list-style: disc;
    padding-left: 15px;
    margin-top: 5px;
  }
  li {
    color: var(--Neutral-300, #b8b8c1);
    font-family: Syne;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    margin-top: 3px;
  }
  a {
    color: #3f88f7;
    font-weight: 600;
  }
`;

export const BlockTableRowClaimImage = styled.div`
  /* background-image: url("/static/bg-info.png"); */
  /* background-position: center;
  background-repeat: no-repeat;
  background-size: cover; */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  .img-info {
    max-width: 100%;
    img {
      width: 100%;
    }
  }
`;

export const BlockTableRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  h1 {
    color: var(--Stake-Text-Day);
  }
  @media screen and (max-width: 767px) {
    /* flex-direction: column; */
  }
`;

export const BlockRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  ${ButtonCommon} {
    &:nth-child(1) {
      & > svg {
        transform: rotate(180deg);
      }
    }
  }
`;

export const BlockTableRowItemRight = styled.div`
  width: auto;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const BlockRight = styled.div`
  position: relative;
  width: 380px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  @media screen and (max-width: 1023px) {
    width: 300px;
  }
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`;

export const BlockRightCard = styled.div`
  display: flex;
  padding: 16px 14px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
  border-radius: 12px;
  border: 1px solid var(--Stake-Border-Style2);
  background: var(--Stake-Bg);
  backdrop-filter: blur(32.20338821411133px);
  padding: 12px;
`;

export const BlockRightRow = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
  margin-bottom: 8px;
  position: relative;
  h2 {
    color: var(--Neutral-400, #92929e);
    font-family: Syne;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 16px; /* 114.286% */
    margin-bottom: 5px;
  }
  p {
    color: var(--Neutral-600, #5e5e6b);
    font-family: Syne;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 14px; /* 100% */
  }
  .img-dot {
    height: 12px;
    width: 12px;
    border-radius: 50%;
    background-color: #6a6a6a;
    position: relative;
    z-index: 2;
  }
  .action-dot {
    height: 12px;
    width: 12px;
    border-radius: 50%;
    background-color: #0488f5;
    fill: var(--Pri-2, #0488f5);
    filter: drop-shadow(0px 0px 18.2px #54e5ff);
    position: relative;
    z-index: 2;
  }
  .line {
    position: absolute;
    left: 5px;
    height: 50px;
    width: 2px;
    border-radius: 50%;
    background-color: #6a6a6a;
    top: 2px;
  }
  .action-line {
    position: absolute;
    left: 5px;
    height: 50px;
    width: 2px;
    border-radius: 50%;
    background-color: #0488f5;
    top: 2px;
  }
`;

export const BlockSteps = styled.div`
  position: relative;
  margin-top: 10px;
  .hidden-step {
    .line,
    .action-line {
      display: none;
    }
  }
`;

export const BlockStepsTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  p {
    color: #fff;
    font-size: 16px;
    line-height: 16px;
  }
  &.light {
    & > p {
      color: #43424a;
    }
  }
`;

export const BlockStepsTitleItem = styled.div<{ active?: any }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ active }) =>
    active ? "#0E335D" : "rgba(217, 217, 217, 0.10)"};
  p {
    color: ${({ active }) => (active ? "#1EB0FF" : "#92929e")};
    font-size: 14px;
    line-height: 125%;
    font-family: DMMono-400;
  }
  &.light {
    background: ${({ active }) =>
      active ? "#D6F3FF" : "rgba(217, 217, 217, 0.6)"};
    p {
      color: ${({ active }) => (active ? "#1EB0FF" : "#92929E")};
    }
  }
`;

export const BlockRightStatus = styled.div`
  width: 100%;
  margin-top: -8px;
  h2 {
    color: var(--Neutral-600, #5e5e6b);
    font-family: Syne;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 25px; /* 142.857% */
  }
  h1 {
    color: var(--Stake-Text);
    font-family: Syne;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
  }
  p {
    color: var(--Stake-Text);
    text-align: right;
    font-family: DMMono-500;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
  }
  h3 {
    color: var(--Stake-Text);
    color: var(--Neutral-800, #43424a);
    text-align: right;
    font-family: DMMono-500;
    font-size: 14px;
    font-style: normal;
    line-height: 20px; /* 142.857% */
  }
`;

export const BlockRightBox = styled.div`
  margin-top: 6px;
  border-radius: 10.12px;
  background: var(--Input-Amout-style2);
  padding: 12px;
  h1 {
    color: var(--Neutral-White, #fff);
    text-align: right;
    font-family: DMMono-500;
    font-size: 22px;
    font-style: normal;
    font-weight: 500;
    line-height: 125%; /* 27.5px */
    letter-spacing: -1.54px;
  }
  h2 {
    color: var(--Stake-Text);
    font-family: Syne;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 125%; /* 15px */
  }
  span {
    color: var(--Neutral-400, #92929e);
    font-family: DMMono-500;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 125%;
    letter-spacing: -0.66px;
    &:nth-child(2) {
      color: #fff;
      padding: 0 5px;
    }
    &:nth-child(3) {
      color: #007af5;
    }
  }
`;

export const BlockRightReward = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  p {
    color: var(--Neutral-500, #6e6e7c);
    text-align: center;
    font-family: DMMono-400;
    font-size: 13px;
    font-style: normal;
    font-weight: 300;
    line-height: 125%; /* 13.75px */
    letter-spacing: -0.33px;
  }
  h1 {
    color: var(--Neutral-100, #eeeef0);
    text-align: center;
    font-family: DMMono-500;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 125%; /* 25px */
    letter-spacing: -1.4px;
  }
  span {
    color: var(--Neutral-500, #6e6e7c);
    font-family: DMMono-400;
    font-size: 20px;
    font-style: normal;
    font-weight: 300;
    line-height: 125%;
    letter-spacing: -1.4px;
  }
`;
