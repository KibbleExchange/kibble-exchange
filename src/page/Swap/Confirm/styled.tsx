import styled from "styled-components";
import { SwapDetail, SwapDetailRow } from "../styled";
import { ButtonCommon } from "@kibble-exchange/uikit";

export const ConfirmSwapContainer = styled.div`
  & > p {
    margin-bottom: 20px;
    color: #fff;
    font-size: 16px;
    font-weight: 500;
    line-height: 1.6;
    span {
      color: #0257f5;
      font-weight: bold;
    }
  }
  ${SwapDetailRow} {
    &:not(:last-child) {
      margin-bottom: 5px;
    }
  }
  ${SwapDetail} {
    height: auto !important;
    margin-bottom: 10px;
  }
`;
export const ConfirmSwapButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  @media screen and (max-width: 767px) {
    ${ButtonCommon},
    ${ButtonCommon} a p {
      font-size: 14px;
    }
  }
`;
export const ConfirmSwapHeader = styled.div`
  color: #fff;
  margin-bottom: 10px;
  background-color: #28272c;
  padding: 10px;
  border-radius: 10px;
  &.light {
    background-color: #F3F4F8;
    color: #43424A;
  }
  & > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    & > p {
      font-family: DMMono-400;
      margin-top: 30px;
    }
    &:not(:last-child) {
      margin-bottom: 12px;
      padding-bottom: 8px;
      border-bottom: 1px dashed #43424a;
    }
    & > div {
      display: flex;
      flex-direction: column;
      & > p {
        margin-bottom: 10px;
      }
      & > div {
        display: flex;
        align-items: center;
        gap: 5px;
        figure {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        p {
          font-size: 20px;
          font-weight: 600;
        }
      }
    }
  }
`;
export const ConfirmSwapInfo = styled.div`
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #33363f;
  padding: 20px 10px;
  margin-bottom: 20px;
  border-radius: 8px;
  & > p {
    &:nth-child(1) {
      font-weight: 600;
    }
    &:nth-child(2) {
      font-weight: 500;
    }
  }
`;
