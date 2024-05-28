import styled from "styled-components";
import Bg from "../../assets/Dashboard/Liquidity/BgPanner.png";
import BgText from "../../assets/Dashboard/Liquidity/BgTitle.png";
import { TableMobileWapper } from "../../components/Common/Table/tableMobile";
import { TabsContainer } from "../Farm/TabsSelector";
import { InputContainer } from "@kibble-exchange/uikit";

export const LiquidityContainer = styled.div`
  position: relative;
  img {
    max-width: 100%;
    max-height: 100%;
  }
`;
export const LiquidityWrapper = styled.div`
  position: relative;
  z-index: 5;
  max-width: 1180px;
  margin: auto;
  padding: 15px;
  display: flex;
  align-items: flex-start;
  gap: 20px;
  ${TabsContainer} {
    max-width: 360px;
  }
  @media screen and (max-width: 767px) {
    padding-top: 0;
    flex-direction: column-reverse;
    padding-bottom: 120px;
    ${TabsContainer} {
      max-width: 100%;
    }
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    gap: 10px;
    ${TabsContainer} {
      max-width: 100%;
    }
  }
`;
export const LiquidityPanner = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 1;
  &::after {
    content: "";
    width: 100vw;
    top: 0px;
    left: 50%;
    transform: translateX(-50%);
    height: 100%;
    background-image: url(${Bg});
    background-size: cover;
    background-position: top center;
    position: absolute;
    z-index: -1;
  }
  @media only screen and (max-width: 768px) {
    flex-direction: column;
    padding: 16px 0px;
    gap: 16px;
  }
`;

export const LiquidityBoxSearch = styled.div`
  margin: 10px auto;
  @media screen and (max-width: 767px) {
    margin-top: 10px;
    margin-bottom: 0;
  }
`;

export const LiquidityBoxActions = styled.div`
  display: flex;
  gap: 10px;
`;

export const PannerText = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 40px;
  max-width: 513px;
  h1 {
    font-family: Astronomus;
    font-size: 58.936px;
    font-style: normal;
    font-weight: 400;
    line-height: 110%;
    background-image: url(${BgText});
    width: fit-content;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  p {
    color: #fff;
    font-size: 16px;
    font-weight: 500;
    line-height: 22px;
    letter-spacing: 0.32px;
  }
  @media only screen and (max-width: 768px) {
    width: 100%;
    max-width: 100%;
    h1 {
      font-size: 40.936px;
      background-size: cover;
    }
  }
`;
export const BtnAddLiquidity = styled.button`
  border-radius: 8px;
  background: #0488f5;
  display: flex;
  padding: 16px;
  align-items: center;
  gap: 9px;
  color: #fff;
  text-shadow: 0px 3.434px 7.181px rgba(255, 255, 255, 0.13);
  font-size: 16px;
  font-weight: 500;
  width: fit-content;
  border: none;
  opacity: 1;
  transition: opacity 0.3s linear;
  &:hover {
    opacity: 0.9;
  }
  &:active {
    transform: translateY(3%);
  }
`;
export const PannerImg = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  @media only screen and (max-width: 768px) {
    width: 100%;
    max-width: 100%;
  }
`;
export const ExplorePoolsWapper = styled.div`
  width: calc(100% - 292px);
  h1 {
    color: #fff;
    font-size: 26px;
    display: flex;
    gap: 16px;
    font-family: DirtyLine;
    text-transform: lowercase;
    span {
      color: #828282;
    }
  }
  ${TableMobileWapper} {
    display: none;
  }
  @media only screen and (min-width: 768px) and (max-width: 1023px) {
    width: calc(100% - 232px);
  }
  @media only screen and (max-width: 767px) {
    width: 100%;
    padding: 0;
    &.light {
      h1 {
        color: #43424a;
      }
    }
    h1 {
      font-size: 24px;
      span {
        position: relative;
        top: -2px;
      }
    }
    ${TableMobileWapper} {
      display: block;
    }
    .Tabble-Wapper {
      display: none;
    }
  }
`;
export const StatusBar = styled.div`
  width: 292px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media only screen and (max-width: 1280px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 32px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 232px;
  }
`;
export const TabSelect = styled.div<{ active?: any }>`
  display: flex;
  align-items: center;
  gap: 5px;
  border-radius: 10px;
  background: #141518;
  padding: 4px;
  button {
    padding: 8px 14px;
    border: none;
    color: #5e5e6b;
    font-size: 16px;
    font-weight: 400;
    position: relative;
    background-color: transparent;
    transition: all 0.15s linear;
    cursor: pointer;
    font-family: "Syne";
    border-radius: 6px;
    span {
      padding: 0px 8px;
      margin-right: 6px;
      justify-content: center;
      align-items: center;
      gap: 4px;
      border-radius: 6px;
      background: var(--Neutral-700, #52565b);
      color: var(--Neutral-300, #dddedf) !important;
      text-align: center;
      font-family: DMMono-400;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 150%;
      min-width: 25px;
      height: 30px;
    }
    &:nth-child(${({ active }) => active}) {
      background: #3a3a40;
      color: #d9d9de;
      &::after {
        height: 4px;
      }
    }
    &:hover {
      background: #3a3a40;
      color: #d9d9de;
    }
  }
  &.light {
    border: solid 1px #D9D9DE;
    background-color: #fff;
    button {
      &:nth-child(${({ active }) => active}),
      &:hover {
        background-color: #007af5;
        color: #fff;
      }
    }
  }
  @media screen and (min-width: 767px) and (max-width: 1023px) {
    width: 100%;
  }
  @media screen and (max-width: 767px) {
    background-color: #121212;
    border-radius: 8px;
    padding: 5px;
    transition: unset;
    justify-content: space-between;
    button {
      width: 100%;
      padding: 10px;
    }
  }
  @media only screen and (max-width: 375px) {
    button {
      font-size: 14px;
    }
  }
`;
export const FillterBart = styled.div`
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #43424a;
  background: #141518;
  figure {
    margin-bottom: 10px;
  }
  &.light {
    background: #fff;
    border-color: #B8B8C1;
    box-shadow: 0px 0px 85.4px 0px rgba(106, 126, 228, 0.15);
  }
`;
export const FarmingAvailableBox = styled.div<{ active?: any }>`
  display: flex;
  align-items: center;
  gap: 8px;
  width: max-content;
  div {
    display: flex;
    align-items: center;
    width: max-content;
    gap: 8px;
    p {
      color: #fff;
      font-size: 16px;
      font-weight: 500;
      line-height: 125%;
    }
    span {
      color: #828282;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: 125%;
    }
  }
  button {
    width: 40px;
    height: 20px;
    border: none;
    padding: 2px;
    border-radius: 100px;
    border-radius: 100px;
    background: ${({ active }) => (active ? "#0488f5" : "#434343")};
    position: relative;
    transition: background 0.3s linear;
    &::after {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background-color: #fff;
      content: "";
      position: absolute;
      top: 2px;
      left: ${({ active }) => (!active ? "2px" : "22px")};
      transition: left 0.3s linear;
    }
  }
`;
export const SearchBox = styled.div`
  display: flex;
  align-items: center;
  border-radius: 8px;
  border: 1px solid #3c3d3e;
  background: #0d0e0f;
  gap: 16px;
  position: relative;
  .search {
    position: absolute;
    top: -8px;
    left: 10px;
    color: #6E6E7C;
    font-size: 13px;
    font-style: normal;
    background-color: #141518;
    padding: 0 5px;
    z-index: 2;
  }
  &.light {
    background-color: transparent;
    border-color: transparent;
    ${InputContainer} {
      .ant-input-affix-wrapper {
        border-color: #92929E;
        background: #fff;
        box-shadow: 0px -3px 0px 0px rgba(56, 56, 56, 0.25) inset;
      }
    }
    .search {
      background-color: #fff;
    }
  }
  ${InputContainer} {
    width: 100%;
    .ant-input-affix-wrapper {
      font-size: 12px;
      padding-left: 10px;
      padding-right: 10px;
      background-color: #141518;
    }
  }
  .ant-input {
    font-size: 16px !important;
    font-weight: 400 !important;
    font-family: Syne !important;
    color: #fff;
  }
`;

export const ExplorePool = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 15px;
  h1 {
    margin: 0;
  }
  span {
    display: flex;
    padding: 0px 8px;
    justify-content: center;
    align-items: center;
    gap: 4px;
    border-radius: 6px;
    background: #52565b;
    color: #dddedf !important;
    text-align: center;
    font-family: DMMono-500;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
  }
  &.light {
    span {
      background: #007af5;
      color: #fff !important;
    }
  }
`;

export const SelectBox = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #3c3d3e;
  background: #0d0e0f;
  gap: 16px;
  p {
    color: #fff;
    font-size: 16px;
    font-weight: 500;
    line-height: 20px;
  }
`;
export const TablesWapper = styled.div`
  width: 100%;
`;
export const BoxPoolName = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  h3 {
    color: #fff;
    font-size: 16px;
    font-weight: 500;
    line-height: 16px;
    margin-bottom: 8px;
  }
  p {
    color: #fff;
    font-size: 14px;
    font-weight: 500;
    line-height: 14px;
    border-radius: 8.6% / 36%;
    background: #01223d;
    padding: 4px;
    position: relative;
    &::after {
      content: "";
      width: calc(100% + 2px);
      height: calc(100% + 2px);
      position: absolute;
      top: -1px;
      left: -1px;
      border-radius: 8.6% / 36%;
      background: linear-gradient(to right, #0387f5, #0ed4b9);
      z-index: -1;
    }
  }
  @media only screen and (max-width: 768px) {
    margin: 0px 1px;
    gap: 4px;
    p {
      padding: 4px 16px;
      text-align: center;
    }
  }
`;
export const BoxImage = styled.div`
  display: flex;
  width: 70px;
  height: 40px;
  position: relative;
  img {
    position: absolute;
    width: 40px;
    height: 40px;
    top: 0px;
    left: 0px;
    z-index: 1;
    &:last-child {
      left: unset;
      right: 0px;
      z-index: 0;
    }
  }
  @media only screen and (max-width: 768px) {
    width: 35px;
    height: 20px;
    img {
      width: 20px;
      height: 20px;
    }
  }
`;
export const ExplorePoolHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  @media screen and (max-width: 1023px) {
    flex-direction: column;
    align-items: flex-start;
    button {
      width: 100% !important;
    }
  }
  @media screen and (max-width: 767px) {
    display: block;
  }
  h1 {
    line-height: 35px;
    color: var(--Stake-Title);
    span {
      display: flex;
      padding: 0px 8px;
      justify-content: center;
      align-items: center;
      gap: 4px;
      border-radius: 6px;
      background: #52565b;
      color: #dddedf !important;
      text-align: center;
      font-family: DMMono-500;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 150%;
      min-width: 25px;
      height: 30px;
    }
  }
  &.light {
    h1 {
      span {
        background: #007af5;
        color: #fff !important;
      }
    }
  }
`;
