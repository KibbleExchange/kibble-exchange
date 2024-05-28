import styled from "styled-components";
import { TitleContainer } from "../../components/Common/Title/styled";
import bg from "../../assets/Dashboard/Swap/bg_swap.png";
import caret_down from "../../assets/Dashboard/Swap/caret_down.svg";
import caret_down_light from "../../assets/Dashboard/Swap/caret_down_light.svg";
import logo from "../../assets/Dashboard/Swap/logo.svg";
import coin_header from "../../assets/Dashboard/Swap/coin_header.png";
import coin_blur from "../../assets/Dashboard/Swap/coin_blur.png";
import { TabSelect } from "../Liquidity/styled";
import iconArrow from "../../assets/Dashboard/Common/icn_arrow_white.png";
import iconArrowBlack from "../../assets/Dashboard/Common/icn_arrow_black.png";
import { InputContainer } from "@kibble-exchange/uikit";

export const SwapBg = styled.div`
  &::before,
  &::after {
    content: "";
    position: absolute;
    pointer-events: none;
  }
  &::before {
    left: 53%;
    top: 10%;
    width: 202px;
    height: 320px;
    background-color: #5255c6;
    mix-blend-mode: plus-lighter;
    filter: blur(173px);
  }
  &::after {
    bottom: 0;
    left: 0;
    width: 100%;
    background: url(${bg}) no-repeat center / cover;
    height: 100%;
  }
  @media screen and (max-width: 767px) {
    &:before {
      content: none;
    }
  }
`;
export const SwapContainer = styled.div`
  position: relative;
  z-index: 5;
  max-width: 1300px;
  margin: 0 auto;
  padding: 60px 15px;
  .ant-input-disabled {
    color: #fff !important;
  }
  @media screen and (max-width: 767px) {
    padding-top: 20px;
    padding-bottom: 100px;
    ${TabSelect} {
      margin-bottom: 10px;
    }
  }
`;
export const SwapWrapper = styled.div`
  position: relative;
  padding: 20px 15px;
  border-radius: 12px;
  border: 2px solid #4d4d57;
  background: #1c1c1e;
  box-shadow: 0px 0px 85px 0px rgba(106, 126, 228, 0.15);
  overflow: hidden;
  height: calc(100% - 54px);
  &.light {
    background: #ffffff;
    border-color: #b8b8c1;
    &::before {
      opacity: 0;
    }
  }
  ${TitleContainer} {
    font-size: 24px;
  }
  &::before {
    content: "";
    position: absolute;
    bottom: -3px;
    right: 10px;
    background: url(${logo}) no-repeat center / 100% auto;
    width: 62px;
    height: 36px;
    opacity: 0.1;
  }
  @media screen and (max-width: 767px) {
    border: none;
  }
`;
export const SwapSubTitle = styled.p`
  color: #fff;
  font-size: 15px;
  margin-bottom: 15px;
  span {
    font-family: DMMono-400;
  }
  &.light {
    color: #6e6e7c;
  }
`;
export const SwapHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
  figure {
    width: 32px;
    height: 32px;
    cursor: pointer;
    transition: all 0.15s linear;
    &:hover {
      opacity: 0.7;
    }
    img {
      width: 100%;
    }
  }
`;
export const SwapContent = styled.div`
  position: relative;
`;
export const SwapInput = styled.div`
  position: relative;
  background-color: var(--Stake-Amount-Bg);
  padding: 15px;
  border-radius: 12px;
  &.light {
    background-color: #F3F4F8;
  }
  &:not(:last-child) {
    margin-bottom: 10px;
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
    background-color: transparent;
  }
  &:hover {
    transform: rotate(180deg);
  }
  img {
    width: 100%;
  }
`;
export const SwapInputAsset = styled.p`
  font-size: 16px;
`;
export const SwapInputTitle = styled.p`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  color: var(--Stake-Title);
  font-size: 16px;
  line-height: 20px;
  margin-bottom: 30px;
  & > p {
    font-weight: 600;
  }
  &.light {
    color: #43424a;
  }
`;
export const SwapInputWrapper = styled.div<{ active: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  border-radius: 12px;
  transition: all 0.15s linear;
  &.light {
    ${InputContainer} {
      input {
        border-radius: unset;
        color: ${({ active }) => active && "#3A3A40"} ;
      }
      .ant-input-disabled {
        color: #34324a !important;
      }
    }
  }
  ${InputContainer} {
    input {
      text-align: right;
      font-size: 22px;
      height: 30px;
      padding-top: 0;
      padding-bottom: 0;
      padding-right: 0;
      border: none;
      color: ${({ active }) => active && "#fff"};
      font-family: ${({ active }) => (active ? "DMMono-500" : "DMMono-400")};
    }
  }
  @media screen and (max-width: 767px) {
    display: flex;
    justify-content: space-between;
    ${InputContainer} {
      margin-right: 0;
    }
  }
`;
export const SwapChoose = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  border-radius: 8px;
  padding: 6px;
  border: 1px solid #4d4d57;
  cursor: pointer;
  transition: all 0.25s linear;
  &.light {
    border-color: #92929e;
    &::before {
      background-image: url(${caret_down_light});
    }
  }
  &:hover {
    opacity: 0.7;
  }
  &::before {
    content: "";
    position: absolute;
    right: 10px;
    top: 50%;
    margin-top: -6px;
    background: url(${caret_down}) no-repeat center / 100% auto;
    width: 12px;
    height: 12px;
  }
  @media screen and (max-width: 767px) {
    position: relative;
    width: 115px;
    top: 0;
    right: 0;
  }
`;
export const SwapChooseDefault = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding-right: 20px;
  &.light {
    p {
      color: #4d4d57;
    }
  }
  p {
    color: #fff;
    font-size: 15px;
    white-space: nowrap;
  }
  img {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    object-fit: cover;
  }
  @media screen and (max-width: 767px) {
    p {
      font-size: 14px;
    }
    img {
      width: 25px;
      height: 25px;
    }
  }
`;
export const SwapDetailHeader = styled.p`
  position: relative;
  color: #fff;
  font-size: 20px;
  line-height: 20px;
  margin-bottom: 24px;
  cursor: pointer;
  transition: all 0.15s linear;
  &:hover {
    opacity: 0.7;
  }
  &.open {
    &::before {
      transform: rotate(0);
    }
  }
  &::before {
    content: "";
    position: absolute;
    right: 0;
    top: 50%;
    margin-top: -12px;
    background: url(${caret_down}) no-repeat center / 100% auto;
    width: 24px;
    height: 24px;
    transform: rotate(180deg);
    transition: all 0.15s linear;
  }
`;
export const SwapDetailBlock = styled.div``;
export const SwapDetailRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 25px;
  .icn-tooltip {
    position: relative;
    top: 2px;
    cursor: pointer;
    z-index: 1;
  }
  &.light {
    & > p {
      &:nth-child(1) {
        color: #6e6e7c;
      }
      &:nth-child(2) {
        color: #5e5e6b;
      }
    }
  }
  & > p {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 16px;
    font-weight: 400;
    &.increase {
      color: #008c16 !important;
    }
    &:nth-child(1) {
      color: #92929e;
    }
    &:nth-child(2) {
      color: #f7f7f8;
      font-family: DMMono-400;
    }
  }
`;
export const ContentToolTip = styled.div`
  position: absolute;
  top: -97px;
  left: -16px;
  opacity: 0;
  transition: opacity 0.26s ease;
  background-color: #fff;
  color: #000;
  padding: 8px;
  font-family: Syne;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: -0.08px;
  width: 200px;
  border-radius: 12px;
  z-index: 1;
  pointer-events: none;
  &:before {
    position: absolute;
    content: "";
    top: 98%;
    left: 13px;
    background: url(${iconArrow}) center / contain no-repeat;
    width: 22px;
    height: 8px;
  }
  @media screen and (max-width: 374px) {
    width: 160px;
    p {
      font-size: 11px;
    }
  }
`;
export const BlockToolTip = styled.div`
  position: relative;
  &:hover {
    ${ContentToolTip} {
      opacity: 1;
    }
  }
  &.light {
    ${ContentToolTip} {
      background-color: rgba(0, 0, 0, 1);
      color: #fff;
      &:before {
        background-image: url(${iconArrowBlack});
      }
    }
  }
`;
export const SwapConvert = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  p {
    color: #fff;
    font-size: 20px;
    line-height: 20px;
  }
  img {
    width: 24px;
    height: 24px;
  }
  @media screen and (max-width: 767px) {
    margin-bottom: 40px;
    p {
      font-size: 15px;
    }
  }
`;
export const ClickMaxAmount = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all 0.15s linear;
  font-size: 14px;
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
export const ClickMaxAmountInner = styled.div`
  span {
    color: #92929e !important;
  }
`;
export const SwapTop = styled.div`
  position: relative;
  margin-bottom: 40px;
  ${TitleContainer} {
    font-size: 36px;
    margin-bottom: 10px;
    line-height: normal;
    position: relative;
    padding-right: 100px;
    &::before {
    content: "";
    position: absolute;
    right: 0;
    top: -30px;
    background: url(${coin_header}) no-repeat center / 100% auto;
    width: 61px;
    height: 60px;
  }
  }
  @media screen and (max-width: 767px) {
    margin-bottom: 20px;
    &::before {
      top: -70px;
      background: unset;
    }
  }
`;
export const SwapInner = styled.div`
  display: flex;
  gap: 10px;
  align-items: flex-start;
  &.active {
    justify-content: center;
  }
  @media screen and (max-width: 767px) {
    display: block;
  }
`;
export const SwapChart = styled.div`
  width: calc(100% - 490px);
  padding: 20px 20px 0px;
  border-radius: 12px;
  background: rgba(50, 50, 50, 0.21);
  backdrop-filter: blur(122px);
  border: 2px solid #4d4d57;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-self: stretch;
  max-height: 515px;
  box-shadow: 0px 0px 85.4px 0px rgba(106, 126, 228, 0.15);
  transition: all 0.2s linear;
  &.active {
    width: 0px;
    padding: 0;
    overflow: hidden;
    border: none;
    opacity: 0;
    height: 0;
  }
  &.light {
    background: #fff;
    box-shadow: none;
    border-color: #b8b8c1;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: calc(100% - 380px);
    padding: 20px;
  }
  @media screen and (min-width: 768px) and (max-width: 900px) {
    width: calc(100% - 430px);
    padding: 15px;
  }
  @media screen and (max-width: 767px) {
    width: auto;
    padding: 20px 10px;
    transition: unset;
    border: none;
    background-color: #1c1c1e;
    backdrop-filter: unset;
  }
`;
export const SwapWrapperModal = styled.div`
  position: relative;
  max-width: 430px;
  width: 100%;
  flex-shrink: 0;
  &::before {
    content: "";
    position: absolute;
    right: -100px;
    bottom: -100px;
    background: url(${coin_blur}) no-repeat center / 100% auto;
    width: 138px;
    height: 140px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    max-width: 380px;
    flex-shrink: unset;
  }
  @media screen and (max-width: 767px) {
    max-width: 600px;
    margin: 0 auto;
  }
`;
export const SwapBenifitTag = styled.ul`
  display: flex;
  align-items: center;
  gap: 5px;
  &.light {
    & > li {
      background: #e8ebf8;
    }
  }
  & > li {
    display: flex;
    width: max-content;
    gap: 10px;
    padding: 8px 16px;
    align-items: center;
    border-radius: 41px;
    background: #141518;
    font-size: 15px;
    font-weight: 500;
    span {
      display: block;
      border-radius: 50%;
      width: 8px;
      height: 8px;
    }
  }
  @media screen and (max-width: 767px) {
    justify-content: center;
    & > li {
      padding: 8px;
    }
  }
`;
export const SwapExtension = styled.ul`
  display: flex;
  align-items: center;
  padding: 10px;
  gap: 10px;
  border-radius: 5px;
  border: 1px solid #141518;
  background: #43424a;
  box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.25),
    0px 3px 0px 0px rgba(186, 186, 186, 0.33) inset;
  &.light {
    border-color: #6e6e7c;
    background: #eeeef0;
    box-shadow: 0px 0px 3px 0px rgba(162, 162, 162, 0.25),
      0px 2px 0px 0px rgba(186, 186, 186, 0.33) inset;
  }
  & > li {
    width: 20px;
    height: 20px;
    transition: all 0.15s linear;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
    }
    &:hover {
      opacity: 0.7;
    }
  }
`;
export const SwapWrapperButtons = styled.div`
  display: flex;
  gap: 5px;
`;
export const ButtonReset = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  width: max-content;
  flex-shrink: 0;
  padding: 10px 20px;
  justify-content: center;
  border-radius: 8px;
  border: 2px solid #141518;
  background: #43424a;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25),
    0px 3px 0px 0px rgba(186, 186, 186, 0.33) inset;
  cursor: pointer;
  transition: all 0.15s linear;
  &.light {
    border-color: #3a3a40;
    background: #fff;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25),
      0px 3px 0px 0px rgba(186, 186, 186, 0.33) inset;
    p {
      color: #141518;
    }
  }
  &:hover {
    opacity: 0.7;
  }
  p {
    color: #fff;
    font-size: 14px;
    font-weight: 500;
  }
  img {
    margin-left: 10px;
  }
`;
export const SwapDetail = styled.div`
  transition: all 0.15s linear;
  overflow: hidden;
  ${ButtonReset} {
    width: 100%;
  }
`;
export const SwapRoutesCheck = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  justify-content: space-between;
  margin-bottom: 10px;
  &.light {
    span {
      &:nth-child(2) {
        color: #5e5e6b;
      }
    }
    .ant-checkbox-wrapper {
      .ant-checkbox-inner {
        border-color: #6e6e7c !important;
        background: #eeeef0 !important;
        &::after {
          border-color: #43424a;
        }
      }
    }
  }
  span {
    &:nth-child(2) {
      color: #92929e;
      font-size: 14px;
      line-height: 125%;
    }
  }
  .ant-checkbox-wrapper {
    .ant-checkbox-inner {
      border: 1px solid #eeeef0;
      background: #3a3a40;
    }
  }
  @media screen and (max-width: 767px) {
    flex-wrap: wrap;
    gap: 10px;
    span {
      &:nth-child(2) {
        font-size: 12px;
        flex-shrink: 0;
      }
    }
  }
`;
export const RoutesRecommended = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
export const RecTag = styled.div`
  padding: 5px 8px;
  border-radius: 12px;
  background: #0d549b;
  color: #1eb0ff;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  &.light {
    background: #BEDFFB;
    color: #255488;
  }
`;
export const RecText = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: #f7f7f8;
  font-size: 15px;
  font-weight: 600;
  & > p {
    white-space: nowrap;
  }
  &.light {
    color: #5e5e6b;
  }
`;
export const SwapChartTitle = styled.div<{ isDown?: any }>`
  display: flex;
  align-items: center;
  gap: 5px;
  &.light {
    & > div {
      p {
        color: #43424a;
      }
    }
  }
  & > img {
    width: 29px;
    height: 29px;
    transition: transform 0.26s ease;
    &:hover {
      transform: rotate(180deg);
    }
  }
  & > div {
    display: flex;
    align-items: center;
    figure {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      &:nth-child(2) {
        position: relative;
        margin-left: -10px;
      }
    }
    p {
      position: relative;
      top: 1px;
      color: #fff;
      font-size: 18px;
      font-weight: 500;
    }
    span {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 10px;
      border-radius: 15px;
      background: ${({ isDown }) => (isDown ? "#f50f48" : "#0a5d37")};
      padding: 5px 10px;
      color: ${({ isDown }) => (isDown ? "#e6a7a0" : "#0ff586")};
      font-size: 12px;
      font-family: DMMono-400;
    }
  }
  @media screen and (max-width: 767px) {
    margin-bottom: 10px;
  }
`;
export const SwapChartHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 5px;
  @media screen and (min-width: 768px) and (max-width: 900px) {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 10px;
  }
  @media screen and (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 10px;
  }
`;
export const SwapChartFilter = styled.ul<{ ispending: any }>`
  border-radius: 10px;
  background: #141518;
  padding: 4px;
  width: max-content;
  display: flex;
  align-items: center;
  gap: 5px;
  &.light {
    background: #EEEEF0;
    & > li {
      color: #b8b8c1;
      &:hover,
      &.active {
        color: #fff;
        background: #007af5;
      }
    }
  }
  & > li {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    padding: 6px 0;
    border-radius: 6px;
    transition: all 0.15s linear;
    font-family: DMMono-400;
    color: #fff;
    cursor: pointer;
    position: relative;
    svg {
      max-width: 20px;
    }
    &:hover {
      background: #43424a;
      &::before {
        opacity: 1;
      }
    }
    &.active {
      background: #43424a;
      pointer-events: none;
      &::before {
        display: none;
      }
    }
    @keyframes pending {
      0% {
        width: 100%;
      }
      100% {
        width: 0%;
      }
    }
  }
  @media screen and (max-width: 767px) {
    & > li {
      font-size: 13px;
    }
  }
`;
export const SwapChartPrice = styled.div`
  color: #fff;
  font-family: DMMono-500;
  & > p {
    font-size: 28px;
  }
  & > span {
    color: #6e6e7c;
    font-size: 15px;
    letter-spacing: -0.45px;
  }
  &.light {
    color: #43424a;
    & > span {
      color: #6e6e7c;
    }
  }
  @media screen and (min-width: 768px) and (max-width: 900px) {
    margin-bottom: 20px;
    p {
      font-size: 23px;
    }
    span {
      font-size: 13px;
    }
  }
  @media screen and (max-width: 767px) {
    margin-bottom: 15px;
    p {
      font-size: 20px;
    }
    span {
      font-size: 13px;
    }
  }
`;
export const RoutesList = styled.ul`
  margin-bottom: 15px;
  transition: all 0.15s linear;
  overflow: hidden;
  & > li {
    padding: 12px 18px;
    background-color: #28272c;
    border-radius: 10px;
    transition: all 0.15s linear;
    color: #fff;
    border: 1px solid transparent;
    cursor: pointer;
    &:hover {
      border-color: #92929e;
      background: #43424a;
    }
    &:not(:last-child) {
      margin-bottom: 5px;
    }
    figure {
      width: 17px;
      height: 20px;
      img {
        width: 100%;
      }
    }
  }
  &.light {
    & > li {
      background-color: #f3f4f8;
      &:hover {
        border-color: #007af5;
        background: #f7f8ff;
      }
    }
  }
`;
export const RoutesHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
  & > div {
    display: flex;
    align-items: center;
    gap: 5px;
    p {
      font-size: 15px;
      font-weight: 500;
    }
  }
  & > p {
    font-family: DMMono-500;
    font-size: 18px;
  }
  &.light {
    & > div {
      p {
        color: #43424a;
      }
    }
    & > p {
      color: #43424a;
    }
  }
`;
export const RoutesBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > p {
    margin-left: auto;
    font-family: DMMono-400;
    color: #6e6e7c;
    font-size: 13px;
  }
`;
export const RoutesTag = styled.div`
  border-radius: 6px;
  background: #4d4d57;
  display: flex;
  padding: 4px 8px;
  justify-content: center;
  align-items: center;
  color: #dddedf;
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  &.light {
    background: #bedffb;
    color: #255488;
  }
`;
export const DetailButtonHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  transition: all 0.15s linear;
  &.light {
    p {
      &:nth-child(1) {
        color: #43424a;
      }
      &:nth-child(2) {
        color: #0693ff;
      }
    }
  }
  p {
    font-weight: 600;
    &:nth-child(1) {
      color: #fff;
      font-size: 16px;
    }
    &:nth-child(2) {
      color: #92929e;
      font-size: 16px;
    }
  }
`;
export const SwapDetailButton = styled.div`
  padding: 10px;
  border-radius: 10px;
  background: #28272c;
  cursor: pointer;
  margin-bottom: 10px;
  &.light {
    background: #fff;
  }
  &.active.light {
    background: #f3f4f8;
  }
`;

export const SwapInputValue = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
`;
