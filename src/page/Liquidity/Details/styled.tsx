import styled from "styled-components";
import { LiquidityBg } from "../Add/styled";
import BgBoxApr from "../../../assets/liquidity/BgBoxApr.svg";
import BgBoxApr2 from "../../../assets/liquidity/BgBoxAprLight.svg";
import { BackButtonWrapper, ButtonCommon, KeyvisualCommonContainer } from "@kibble-exchange/uikit";

export const LiquidityDetailsContainer = styled.div`
  position: relative;
  .ant-skeleton-title {
    background-color: #2b3245 !important;
  }
  .ant-skeleton-paragraph {
    & > li {
      background-color: #2b3245 !important;
    }
  }
  .ant-skeleton {
    margin-bottom: 20px;
  }
  ${LiquidityBg} {
    &::before {
      right: 50%;
      left: unset;
      transform: none;
      opacity: 0.5;
    }
  }
`;
export const LiquidityDetailsWrapper = styled.div`
  position: relative;
  max-width: 1350px;
  margin: 0 auto;
  padding: 44px 15px;
  color: #fff;
  z-index: 5;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 256px;
    height: 310px;
    background-color: #5255C6;
    mix-blend-mode: plus-lighter;
    filter: blur(173.25px);
    z-index: -1;
  }
  ${BackButtonWrapper} {
    margin-bottom: 20px;
  }
  ${KeyvisualCommonContainer} {
    padding: 0;
  }
  @media screen and (max-width: 767px) {
    padding: 20px 15px 100px;
    &::before {
      content: none;
    }
  }
  &.light {
    &:before {
      content: none;
    }
  }
`;

export const DetailsInfo = styled.div`
  display: flex;
  gap: 30px;
  margin-bottom: 60px;
  @media screen and (max-width: 767px) {
    display: block;
    margin-bottom: 40px;
  }
`;
export const InfoLeft = styled.div`
  width: calc(100% - 460px);
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: calc(100% - 400px);
  }
  @media screen and (max-width: 767px) {
    width: auto;
    margin-bottom: 40px;
  }
`;
export const DetailsHeader = styled.div`
  border-bottom: 1px solid #3c3d3e;
  padding-bottom: 20px;
  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &:last-child {
      margin-top: 10px;
      color: #828282;
      font-size: 14px;
      font-weight: 500;
    }
    & > div {
      display: flex;
    }
  }
`;
export const DetailsTitle = styled.h2`
  color: #fff;
  font-size: 32px;
  font-weight: 600;
  @media screen and (max-width: 767px) {
    font-size: 26px;
  }
`;
export const DetailsSubHeader = styled.div``;
export const DetailsBlock = styled.div`
  padding-bottom: 20px;
  border-bottom: 1px solid #3c3d3e;
  padding-top: 20px;
  & > p {
    color: #828282;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &:not(:last-child) {
      margin-bottom: 10px;
    }
    span {
      color: #fff;
      font-family: DMMono-400;
      font-size: 14px;
    }
  }
  @media screen and (max-width: 767px) {
    & > p {
      font-size: 14px;
    }
  }
`;
export const DetailsSubTitle = styled.h3`
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 15px;
  @media screen and (max-width: 767px) {
    font-size: 17px;
  }
`;
export const ListAPR = styled.div`
  display: flex;
  padding: 24px;
  justify-content: space-between;
  border-radius: 8px;
  border: 1px solid #3c3d3e;
  background: #0d0e0f;
  margin-bottom: 20px;
  & > div {
    p {
      font-weight: 500;
      &:nth-child(1) {
        color: #828282;
        font-size: 14px;
        margin-bottom: 10px;
      }
      &:nth-child(2) {
        color: #fff;
        font-size: 17px;
        font-family: DMMono-400;
      }
    }
  }
  @media screen and (max-width: 767px) {
    padding: 24px 12px;
    & > div {
      p {
        &:nth-child(2) {
          font-size: 17px;
        }
      }
    }
  }
`;
export const InfoRight = styled.div`
  max-width: 460px;
  width: 100%;
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    max-width: 400px;
  }
  @media screen and (max-width: 767px) {
    max-width: unset;
  }
`;
export const InfoHowItWork = styled.div`
  display: flex;
  align-items: center;
  padding: 24px;
  gap: 24px;
  border-radius: 8px;
  background: rgba(3, 136, 245, 0.25);
  margin-bottom: 20px;
  & > div {
    a {
      margin-top: 5px;
      color: #0488f5;
      font-size: 16px;
      font-weight: 500;
      transition: all 0.15s linear;
      &:hover {
        opacity: 0.7;
      }
    }
  }
  @media screen and (max-width: 767px) {
    padding: 24px 12px;
  }
`;
export const InfoRightButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 22px;
  a {
    display: block;
    width: 100%;
    transition: all 0.15s linear;
    &:hover {
      opacity: 0.7;
    }
    ${ButtonCommon} {
      img {
        margin-right: 5px;
      }
    }
  }
  @media screen and (max-width: 767px) {
    flex-direction: column;
    gap: 20px;
  }
`;
export const LiquidityBlock = styled.div`
  &:not(:last-child) {
    margin-bottom: 65px;
  }
  ${DetailsTitle} {
    margin-bottom: 10px;
  }
  & > p {
    margin-bottom: 20px;
    color: #828282;
    font-size: 16px;
    font-weight: 500;
  }
  & > div {
    display: flex;
    align-items: center;
    gap: 30px;
  }
  @media screen and (max-width: 767px) {
    &:not(:last-child) {
      margin-bottom: 40px;
    }
    & > div {
      display: block;
    }
  }
`;
export const EarnTotal = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  min-height: 100px;
  border-radius: 8px;
  background: #222;
  & > p {
    &:nth-child(1) {
      font-size: 14px;
      color: #828282;
      margin-bottom: 10px;
      font-weight: 500;
    }
    &:nth-child(2) {
      font-weight: 600;
      font-size: 20px;
      color: #fff;
    }
  }
  @media screen and (max-width: 767px) {
    margin-bottom: 20px;
  }
`;
export const EarnList = styled.ul`
  width: 460px;
  & > li {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 24px;
    color: #fff;
    font-size: 16px;
    font-weight: 500;
    padding-left: 20px;
    border-bottom: 1px solid #3c3d3e;
    &:not(:last-child) {
      margin-bottom: 10px;
    }
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 50%;
      margin-top: -18px;
      width: 11px;
      height: 11px;
      border-radius: 50%;
    }
    &:nth-child(1) {
      &::before {
        background: #0dd5b8;
      }
    }
    &:nth-child(2) {
      &::before {
        background: #0488f5;
      }
    }
    p {
      font-weight: 500;
      font-size: 16px;
      &:nth-child(1) {
        color: #fff;
      }
      &:nth-child(2) {
        color: #828282;
      }
    }
  }
  @media screen and (max-width: 767px) {
    width: auto;
  }
`;
export const FarmBlock = styled.div`
  padding: 32px;
  border-radius: 8px;
  background: rgba(3, 136, 245, 0.25);
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    padding: 16px;
  }
  @media screen and (max-width: 767px) {
    padding: 15px;
  }
`;
export const FarmInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  figure {
    flex-shrink: 0;
    width: 42px;
    height: 42px;
    img {
      width: 100%;
    }
  }
  p,
  span {
    font-size: 16px;
  }
  p {
    margin-bottom: 5px;
    color: #fff;
    font-weight: 600;
  }
  span {
    color: #828282;
    font-weight: 500;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    p,
    span {
      font-size: 14px;
    }
  }
  @media screen and (max-width: 767px) {
    display: block;
    margin-bottom: 20px;
    figure {
      width: 90px;
      height: 90px;
      margin-bottom: 10px;
    }
  }
`;
export const FarmRewards = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 50px;
  width: 438px;
  flex-shrink: 0;
  padding-left: 24px;
  margin-left: auto;
  border-left: 2px solid rgba(4, 136, 245, 0.5);
  & > div {
    width: max-content;
    p {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      color: #828282;
      font-size: 16px;
      font-weight: 600;
      &:not(:last-child) {
        margin-bottom: 5px;
      }
      span {
        color: #fff;
      }
    }
  }
  ${ButtonCommon} {
    max-width: 162px;
    &:hover {
      opacity: 0.7;
    }
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    gap: 20px;
    width: 378px;
    & > div {
      p {
        font-size: 14px;
      }
    }
  }
  @media screen and (max-width: 767px) {
    width: auto;
    display: block;
    border-left: none;
    padding-left: 0;
    & > div {
      width: 100%;
      margin-bottom: 20px;
      & > p {
        &:not(:last-child) {
          margin-bottom: 15px;
        }
      }
    }
    ${ButtonCommon} {
      width: 100%;
      max-width: unset;
    }
  }
`;
export const PoolImagePair = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
  figure {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    overflow: hidden;
    &:nth-child(1) {
      position: relative;
    }
    &:nth-child(2) {
      margin-left: -10px;
    }
    img {
      width: 100%;
      height: 100%;   
      object-fit: cover;
    }
  }
  @media screen and (max-width: 767px) {
    margin-left: 0;
  }
`;

//////////////////////////////////////// New UI 4/20/2014 //////////////////////////////////////
export const ContentCaontainer = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  .Mobile{
    display: none;
  }
  @media only screen and (max-width: 919px) {
    flex-direction: column;
    gap: 20px;
  }
  @media only screen and (max-width: 768px){
    .Mobile{
      display: flex;
    }
  }
`;
export const ContentLeft = styled.div`
  width: calc(35% - 5px);
  border-radius: 16px;
  border: 1.35px solid var(--Stake-border, #4d4d57);
  background: var(--Stake-Bg,  #1c1c1e);
  padding: 26px 14px;
  align-self: stretch;
  /* box-sizing: border-box; */
  .text-left {
    text-align: center;
    color: var(--Neutral-200, #D9D9DE);
    font-size: 15px;
    font-weight: 500;
    margin-bottom: 5px;
    &.light {
      color: #43424a;
    }
  }
  @media only screen and (max-width: 919px) {
    width: auto;
  }
`;

export const ContentLeftTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  a {
    border-radius: 6px;
    width: 35px;
    height: 35px;
    background-color: transparent;
    img {
      width: 100%;
      height: 100%;
    }
  }
`;
export const PollTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  h3 {
    color: var(--Stake-Title);
    font-size: 21px;
    font-family: DMMono-400;
  }
`;
export const PollFarm = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 16px;
  div {
    border-radius: 6px;
    background: var(--Neutral-700, #52565b);
    padding: 0px 8px;
    h6 {
      color: var(--Neutral-300, #dddedf);
      text-align: center;
      font-family: Syne;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 150%; /* 16.5px */
      span {
        color: var(--Neutral-300, #dddedf);
        font-family: DMMono-400;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 150%;
      }
    }
  }
  &.light {
    div {
      background-color: #D0F6E3;
    }
    h6,
    span {
      color: #306959;
    }
  }
`;
export const TokentRates = styled.div`
  width: 100%;
  box-sizing: border-box;
  h1 {
    color: var(--Stake-Text-countDown);
    font-family: Syne;
    font-size: 16px;
    font-weight: 400;
    line-height: 125%;
  }
`;
export const RatesTabWapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 6px 6px 8px;
  justify-content: space-between;
  box-sizing: border-box;
`;
export const RatesTabContainer = styled.div`
  border-radius: 8px;
  background: var(--Stake-Box, #3a3a40);;
  padding: 6px;
  margin: 4px 0px;
`;
export const RatesTabSelect = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 4px;
  background: var(--tabsBar2);
  padding: 4px;
  margin-bottom: 14px;
`;
export const TabsBtn = styled.button<{ active?: boolean }>`
  border-radius: 3px;
  background: ${({ active }) =>
    active ? "var(--tabsBtn, #43424A)" : "rgba(255, 255, 255,0)"};
  width: 50%;
  border: none;
  outline: none;
  display: flex;
  padding: 8px 12px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  transition: all 0.2s linear;
  cursor: pointer;
  img {
    max-width: 20px;
    max-height: 20px;
    border-radius: 50%;
  }
  h3 {
    color: ${({ active }) =>
      active ? "#f7f7f8" : "#92929E"};
    text-align: center;
    font-size: 16px;
    font-weight: 500;
    line-height: 125%;
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
    background: var(--Stake-Box, #3a3a40);
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
      color: var(--Stake-Text-countDown);
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
  }
  @media screen and (max-width: 767px) {
    padding-bottom: 10px;
  }
`;
export const ViewContract = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 10px 0px 0;
  a {
    display: flex;
    align-items: center;
    gap: 4px;
    color: var(--Neutral-400, #92929e);
    text-align: center;
    font-family: Syne;
    font-size: 15px;
    font-weight: 400;
    line-height: 125%;
    img {
      width: 15px;
      height: 15px;
    }
  }
  @media screen and (max-width: 767px) {
    border-top: solid 1px #3A3A40;
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
    background: var(--Stake-Box, #3a3a40);
  }
`;
export const VolumBox = styled.div`
  width: calc(50% - 4px);
  border-radius: 10.12px;
  background: var(--Stake-Box);
  padding: 8px 10px;
  margin: 4px 0px;
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
    color: var(--Stake-Text-countDown);
    text-align: right;
    font-family: DMMono-400;
    font-size: 20px;
    font-weight: 500;
    line-height: 20px; /* 125% */
    letter-spacing: -1.28px;
    width: 100%;
  }
  @media screen and (max-width: 767px) {
    h5 {
      font-size: 12px;
    }
    h4 {
      font-size: 17px;
    }
  }
`;
export const PoolReserve = styled.div`
  width: 100%;
  margin-top: 12px;
  h1 {
    color: var(--Stake-Text-countDown);
    font-family: Syne;
    font-size: 16px;
    font-weight: 400;
    line-height: 125%; /* 15px */
    margin-bottom: 8px;
  }
  h3 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--Neutral-400, #92929e);
    font-family: Syne;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 125%; /* 15px */
    span {
      color: var(--Stake-Text-Day);
      font-family: DMMono-400;
      font-size: 17px;
      font-style: normal;
      font-weight: 500;
      line-height: 125%; /* 17.5px */
    }
  }
  @media screen and (max-width: 767px) {
    h3 {
      &:not(:first-child) {
        border-top: solid 1px #3A3A40;
        margin-top: 5px;
        padding-top: 5px;
      }
      &.no-border {
        padding-top: 0;
        border-top: 0;
      }
    }
  }
`;

export const BtnGroup = styled.div`
  width: 100%;
  align-items: center;
  margin-top: 22px;
  display: flex;
  gap: 4px;
  button {
    align-self: stretch;
    padding: 0;
    a {
      padding: 10px 20px;
      display: block;
      width: 100%;
      justify-content: center;
    }
  }
`;
export const AddBtn = styled.button`
  width: calc(68% - 2px);
  border-radius: 7px;
  border: 1px solid #3A3A40;
  background: var(--Blue--Pri-700, #007af5);
  box-shadow: 0px 3.6px 3.6px 0px rgba(0, 0, 0, 0.25),
    0px 2.7px 0px 0px rgba(186, 186, 186, 0.33) inset;
  box-sizing: border-box;
  a {
    width: 100%;
    box-sizing: border-box;
    height: 100%;
    color: var(--Stake-Text);
    font-family: Syne;
    font-size: 14.6px;
    font-style: normal;
    font-weight: 500;
    line-height: 125%; /* 15.75px */
    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: center;
    padding: 9px 18px;
    img {
      height: 16px;
    }
  }
`;
export const TradeBtn = styled.button`
  width: calc(32% - 2px);
  border-radius: 7px;
  border: 1px solid var(--Neutral-950, #3A3A40);
  background: var(--Stake-Bg-countDown);
  box-shadow: 0px 3.6px 3.6px 0px rgba(0, 0, 0, 0.25),
    0px 2.7px 0px 0px rgba(186, 186, 186, 0.33) inset;
  cursor: pointer;
  a {
    color: var(--Stake-Text);
    font-size: 14.6px;
    font-weight: 500;
    padding: 9px 18px;
  }
`;
export const ContentRight = styled.div`
  width: calc(65% - 5px);
  border-radius: 16px;
  border: 1.35px solid var(--Stake-border, #4d4d57);
  background: var(--Stake-Bg1,  #1c1c1e);
  align-self: stretch;
  padding: 24px 14px;
  ${RatesTabContainer} {
    padding: 10px;
    margin-top: 8px;
  }
  ${TabsBtn} {
    h3 {
      font-size: 16px;
    }
  }
  box-sizing: border-box;
  @media only screen and (max-width: 919px) {
    width: 100%;
    ${TabsBtn} {
    h3 {
      font-size: 13px;
    }
  }
  }
  &.light {
    background-color: #fff;
  }
`;
export const PoolAprGroups = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  margin-top: 5px;
`;
export const PoolAprBox = styled.div<{theme:any}>`
  border-radius: 10.12px;
  background: var(--Stake-duration-Bg-active);
  padding: 12px;
  width: calc((100% - 16px) / 3);
  background-image: url(${({ theme }) => theme !== "light" ? BgBoxApr : BgBoxApr2});
  background-size: cover;
  background-position: bottom left;
  align-self: stretch;
  p {
    color: var(--Neutral-400, #92929e);
    font-family: Syne;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 125%; /* 15px */
    padding-bottom: 5px;
  }
  h6 {
    color: var(--Stake-Text);
    text-align: right;
    font-family: DMMono-400;
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 83.333% */
    letter-spacing: -1.44px;
  }
  @media only screen and (max-width: 767px) {
    p {
      font-size: 12px;
    }
  }
  @media only screen and (max-width: 540px) {
    h6{
      font-size: 20px;
    }
  }
`;
export const EarnPrice = styled.h1`
  color: var(--Stake-Text-countDown);
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
    width: 100%;
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
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 125%;
    gap: 4px;
    display: flex;
    align-items: center;
    img {
      width: 20px;
      height: 20px;
      margin-right: 2px;
    }
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
export const RemoveBtn = styled.div`
  border-radius: 7.2px;
  border: 1.35px solid var(--Neutral-950, #141518);
  background: var(--Red-600, #d83b3b);
  box-shadow: 0px 3.6px 3.6px 0px rgba(0, 0, 0, 0.25),
    0px 2.7px 0px 0px rgba(186, 186, 186, 0.33) inset;
`;
export const EarnBtnRights = styled.div`
  display: flex;
  gap: 4px;
  ${TradeBtn} , ${AddBtn} , ${RemoveBtn} {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0px;
    width: fit-content;
    box-sizing: border-box;
    padding: 9px 18px;
    align-self: stretch;
    a {
      padding: 0px;
      height: fit-content;
      line-height: 100%;
      box-sizing: border-box;
      font-size: 14.6px;
      line-height: 100%;
      p {
        color: var(--Stake-Text);
        font-family: Syne;
        font-size: 14.6px;
        font-style: normal;
        font-weight: 500;
        line-height: 125%;
        text-align: center;
      }
    }
  }
  @media only screen and (max-width: 540px) {
    width: 100%;
    justify-content: flex-start;
    align-items: flex-start;
    ${TradeBtn} , ${AddBtn} , ${RemoveBtn} {
      padding: 8px 16px;
      a {
        font-size: 12.6px;
        p {
          font-size: 12.6px;
        }
      }
    }
  }
`;
export const BoxEarnDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 30px;
  p {
    color: var(--Stake-Text-Day);
    font-family: DMMono-400;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 125%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
      color: var(--Neutral-400, #92929e);
      font-family: DMMono-400;
      font-size: 16px;
      line-height: 125%;
    }
  }
`;
export const BackToButton = styled.div`
  display: flex;
  color: #92929e;
  margin-bottom: 30px;
  cursor: pointer;
  img {
    width: 20px;
    height: 20px;
  }
`
export const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 30px;
  h1 {
    color: var(--Stake-Title, #fff);
    font-size: 32px;
    font-style: normal;
    font-family: Dirtyline;
    font-weight: 400;
    line-height: 96%; /* 30.72px */
    text-transform: lowercase;
  }
  p {
    color: var(--Neutral-400, #92929e);
    font-size: 16px;
    font-weight: 400;
    line-height: 19.2px;
  }
`;