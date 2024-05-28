import styled from "styled-components";
import { ButtonReset } from "../styled";
import { ConfirmSwapButtons } from "../Confirm/styled";
import { ButtonCommon, InputContainer } from "@kibble-exchange/uikit";

export const SettingSwapContainer = styled.div``;
export const SettingSwapWrapper = styled.div`
  ${ConfirmSwapButtons} {
    position: relative;
    margin-top: 20px;
    gap: 10px;
    ${ButtonCommon} {
      &:nth-child(1) {
        width: max-content;
        flex-shrink: 0;
      }
    }
  }
  ${ButtonReset} {
    width: 100%;
    margin-top: 25px;
  }
  ${InputContainer} {
    border-radius: 8px;
    background: #444854;
    margin-bottom: 10px;
    .ant-input-affix-wrapper {
      padding: 5px 15px;
    }
    input {
      font-size: 16px !important;
    }
  }
  & > p {
    padding-right: 40px;
    color: #92929e;
    font-size: 16px;
    line-height: 125%;
  }
  &.light {
    & > p {
      color: #43424A;
    }
    ${InputContainer} {
      background: #f3f4f8;
      input {
        color: #5e5e6b !important;
      }
    }
  }
`;
export const SettingSwapHeader = styled.div`
  margin-bottom: 5px;
  p {
    color: #92929e;
    font-size: 16px;
  }
  &.light {
    p {
      color: #43424A;
    }
  }
`;
export const SettingBody = styled.div`
  padding-bottom: 15px;
  margin-bottom: 15px;
  border-bottom: 1px solid #4d4d57;
`;
export const SettingSwapList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  background: #141518;
  padding: 5px;
  border-radius: 10px;
  & > li {
    display: flex;
    align-items: center;
    justify-content: center;
    width: calc(33.33% - 8px);
    padding: 10px 24px;
    color: #fff;
    font-size: 16px;
    border-radius: 10px;
    transition: all 0.15s linear;
    font-family: DMMono-500;
    cursor: pointer;
    &:hover {
      background-color: #3a3a40;
    }
    &.active {
      background-color: #3a3a40;
    }
  }
  &.light {
    background: #f3f4f8;
    & > li {
      color: #5e5e6b;
      &:hover,
      &.active {
        color: #fff;
        background-color: #007af5;
      }
    }
  }
`;
export const SettingSwapLimit = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
  p {
    color: #fff;
    font-size: 16px;
    line-height: 20px;
  }
  &.light {
    p {
      color: #43424A;
    }
  }
`;
