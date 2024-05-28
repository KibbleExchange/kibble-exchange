import styled from "styled-components";
import { CreatePoolHint } from "../../../Add/styled";
import { WaitingPoolCreated } from "../../../CreatePool/Confirm/styled";
import { ButtonSubmit, InputContainer } from "@kibble-exchange/uikit";

export const ReviewLiquidityRemoveContainer = styled.div`
  color: #fff;
  & > p {
    font-size: 18px;
    margin-bottom: 30px;
  }
  ${WaitingPoolCreated} {
    padding-top: 20px;
    & > p {
      font-size: 16px;
    }
  }
  ${CreatePoolHint} {
    padding-left: 8px;
    text-indent: 0;
  }
`;
export const RemoveWrapperButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  ${ButtonSubmit} {
    width: 100%;
    padding: 15px;
  }
`;
export const ConfirmRemoveInfo = styled.div`
  color: #fff;
  margin-bottom: 10px;
  & > figure {
    width: 52px;
    height: 52px;
    margin: 0 auto 10px;
    img {
      width: 100%;
    }
  }
  & > p {
    font-size: 22px;
    font-weight: 600;
    letter-spacing: 0.146px;
    margin-bottom: 10px;
  }
  & > span {
    color: #fff;
    text-align: center;
    font-size: 18px;
    letter-spacing: 0.073px;
    line-height: 1.5;
  }
  &.light {
    color: #43424a;
  }
`;
export const ConfirmHeader = styled.div`
  margin-bottom: 10px;
`;
export const ConfirmWithdrawPercentage = styled.ul`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 10px;
  &.light {
    & > li {
      background-color: #e6e6e6;
      color: #43424a;
      &.active,
      &:hover {
        background: #0c88f5;
        color: #fff;
      }
    }
  }
  & > li {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 25%;
    padding: 10px;
    border-radius: 5px;
    background: #43424a;
    color: #f7f7f8;
    font-family: DMMono-500;
    font-size: 14px;
    border: 1px solid transparent;
    transition: all 0.15s linear;
    cursor: pointer;
    &:hover {
      border-color: #f7f7f8;
    }
    &.active {
      border-color: #f7f7f8;
    }
  }
`;
export const ConfirmWithdrawInput = styled.div`
  border-radius: 10px;
  background: #28272c;
  margin-bottom: 10px;
  &.light {
    background-color: #fff;
    border: 1px solid #43424a;
    ${InputContainer} {
      input {
        color: #43424a;
      }
    }
  }
  ${InputContainer} {
    input {
      color: #fff;
    }
  }
`;
export const ConfirmWithdrawContent = styled.div`
  border-bottom: 1px dashed #3a3a40;
  border-top: 1px dashed #3a3a40;
  padding: 10px 0;
  margin-bottom: 10px;
`;
export const WithdrawContentRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  &:not(:last-child) {
    margin-bottom: 10px;
  }
  & > div {
    display: flex;
    align-items: center;
    gap: 10px;
    figure {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
    & > div {
      p {
        font-size: 14px;
        &:nth-child(1) {
          font-family: DMMono-500;
        }
      }
    }
  }
  & > a {
    display: flex;
    width: 16px;
    height: 16px;
  }
`;
export const ConfirmRemovePrice = styled.div`
  margin-bottom: 25px;
  .number {
    font-family: DMMono-400;
    font-size: 14px;
  }
  & > div {
    display: flex;
    align-items: center;
    gap: 20px;
    justify-content: space-between;
    &:not(:last-child) {
      margin-bottom: 10px;
    }
    & > p {
      &:nth-child(1) {
        font-size: 14px;
        color: #92929e;
      }
    }
  }
  &.light {
    & > div {
      & > p {
        color: #92929e;
      }
    }
  }
`;
