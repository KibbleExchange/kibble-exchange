import styled from "styled-components";

import { TabsContainer } from "../Farm/TabsSelector";
import { FillterBart } from "../Liquidity/styled";
import { FormInput, LabelForm } from "../../components/Footer/styled";
import { InputContainer, KeyvisualCommonContainer } from "@kibble-exchange/uikit";
export const LaunchpadWapper = styled.div`
  ${TabsContainer} {
    max-width: 400px;
    span {
      font-family: DMmono-400;
    }
  }
  ${FillterBart} {
    border: 1px solid var(--Gift-Border);
  }
  ${FormInput}{
    background: var(--Search-Input-Bg) !important;
  }
  ${LabelForm}{
    background: var(--Search-Input-Boder) !important;
  }
`;
export const LaunchpadContainer = styled.div`
  position: relative;
  &::before {
    content: "";
    position: absolute;
    bottom: -480px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 100%;
    background: linear-gradient(
      270deg,
      rgba(0, 56, 255, 0.25) 0%,
      rgba(0, 56, 255, 0) 100%
    );
    filter: blur(171px);
    pointer-events: none;
  }
  padding-bottom: 150px;
  @media screen and (max-width: 767px) {
    padding-bottom: 50px;
  }
`;
export const LaunchpadWrapper = styled.div`
  ${KeyvisualCommonContainer} {
    margin-bottom: 80px;
  }
  @media screen and (max-width: 767px) {
    ${KeyvisualCommonContainer} {
      margin-bottom: 40px;
    }
  }
`;
export const LaunchpadBody = styled.div`
  position: relative;
  max-width: 1325px;
  margin: 0 auto;
  padding: 0 10px;
`;
export const LaunchpadTabs = styled.ul`
  display: flex;
  align-items: center;
  gap: 10px;
  & > li {
    display: flex;
    align-items: center;
    gap: 10px;
    width: max-content;
    padding: 12px 24px;
    border-radius: 8px;
    transition: all 0.15s linear;
    font-size: 14px;
    cursor: pointer;
    & > p {
      font-weight: 600;
    }
    & > div {
      padding: 2px 8px;
      border-radius: 4px;
    }
  }
`;
export const TabItem = styled.li<{
  backgroundColor: any;
  numColor: any;
  colorText: any;
  backgroundActive: any;
  colorTextActive: any;
  numColorActive: any;
}>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ colorText }) => colorText};
  &:hover,
  &.active {
    background-color: ${({ backgroundActive }) => backgroundActive};
    color: ${({ colorTextActive }) => colorTextActive};
    & > div {
      background-color: ${({ numColorActive }) => numColorActive};
      color: ${({ colorTextActive }) => colorTextActive};
    }
  }
  & > div {
    background-color: ${({ numColor }) => numColor};
    color: ${({ colorText }) => colorText};
  }
`;
export const LaunchpadHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 40px;
  ${InputContainer} {
    border-radius: 8px;
    border: 1px solid #3c3d3e;
    background: #0d0e0f;
    .ant-input-affix-wrapper {
      padding: 0 10px 0 0;
    }
    input {
      width: 320px;
      font-size: 14px;
      padding: 16px;
    }
  }
  @media screen and (max-width: 767px) {
    flex-wrap: wrap;
    ${InputContainer} {
      width: 100%;
      input {
        width: 100%;
      }
    }
  }
`;
