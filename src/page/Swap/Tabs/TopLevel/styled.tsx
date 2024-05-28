import styled from "styled-components";
import { ButtonReset } from "../../styled";

export const SwapTopLevelContainer = styled.div`
  margin-top: 14px;
  ${ButtonReset} {
    width: 100%;
  }
`;
export const TopSwitch = styled.ul`
  border-radius: 10px;
  background: #141518;
  display: flex;
  align-items: center;
  padding: 6px;
  gap: 5px;
  margin-bottom: 8px;
  & > li {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    color: #d9d9de;
    font-size: 14px;
    font-weight: 500;
    padding: 6px 12px;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.15s linear;
    &.active {
      background: #3a3a40;
    }
    &:hover {
      background: #3a3a40;
    }
  }
`;
export const TopPriceList = styled.ul`
  position: relative;
  display: block;
  overflow-y: auto;
  height: 204px;
  border-radius: 4px;
  margin-bottom: 15px;
  & > li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border-radius: 4px;
    background: #28272c;
    font-size: 14px;
    &:not(:last-child) {
      margin-bottom: 5px;
    }
    & > div {
      display: flex;
      align-items: center;
      &:nth-child(1) {
        gap: 5px;
        & > figure {
          width: 22px;
          height: 22px;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        & > p {
          color: #fff;
          font-weight: 600;
        }
      }
      &:nth-child(2) {
        gap: 10px;
        & > p {
          &:nth-child(1) {
            font-size: 15px;
            color: #0FF586;
            font-family: DMMono-500;
          }
          &:nth-child(2) {
            font-size: 14px;
            color: #D9D9DE;
          }
        }
      }
    }
  }
`;
