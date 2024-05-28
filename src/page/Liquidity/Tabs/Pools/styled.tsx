import styled from "styled-components";
import logo from "../../../../assets/Dashboard/Liquidity/logo.svg";
import { TableContainer } from "@kibble-exchange/uikit";

export const TabPoolsContainer = styled.div`
  ${TableContainer} {
    &.light {
      .ant-table-row {
        background-color: #fff;
        border-color: #92929e;
      }
    }
  }
  ${TableContainer} {
    table {
      .ant-table-thead {
        display: none;
      }
    }
  }
  .ant-table-cell {
    padding: 0 !important;
    &:last-child {
      width: 142px;
    }
    &.ant-table-cell-row-hover {
      background-color: unset !important;
    }
  }
  .ant-table-row {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    border-radius: 14px;
    border: 1px solid #43424a;
    background: #18191c;
    padding: 6px;
    cursor: pointer;
    transition: all 0.15s linear;
    &:hover {
      opacity: 0.7;
    }
  }
  .ant-table-tbody {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    ${TableContainer} {
      .ant-table-container .ant-table-cell {
        font-size: 13px;
      }
      .ant-table-cell {
        &:last-child {
          width: 100px;
        }
      }
    }
  }
  @media screen and (max-width: 767px) {
    ${TableContainer} {
      .ant-table-tbody {
        gap: 0;
      }
      .ant-table-row {
        border: 1px solid #43424a;
        flex-direction: unset;
        flex-wrap: wrap;
        &:not(:last-child) {
          margin-bottom: 10px;
        }
      }
      .ant-table-cell {
        &:last-child {
          width: 120px;
        }
        &:nth-child(2),
        &:nth-child(3),
        &:nth-child(4) {
          display: none;
        }
      }
    }
  }
`;
export const PoolsImage = styled.div`
  display: flex;
  align-items: center;
  width: 65px;
  padding: 15px 5px;
  border-radius: 10px;
  border: 1px solid #3a3a40;
  background: #3a3a40;
  figure {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    &:nth-child(1) {
      position: relative;
    }
    &:nth-child(2) {
      margin-left: -15px;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &.light {
    background: #e0e5fb;
    border-color: transparent;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    width: 35px;
    padding-top: 10px;
    padding-bottom: 10px;
    figure {
      width: 20px;
      height: 20px;
      &:nth-child(2) {
        margin-left: -5px;
      }
    }
  }
  @media screen and (max-width: 767px) {
    width: 50px;
    justify-content: center;
    background: #3a3a40;
    figure {
      width: 30px;
      height: 30px;
    }
  }
`;
export const PoolsInfo = styled.div`
  &.light {
    & > p {
      color: #43424a;
      font-family: DMMono-500;
    }
  }
  & > p {
    color: #fff;
    font-size: 14px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    & > p {
      font-size: 12px;
    }
  }
`;

export const PoolsFarmAndFee = styled.div`
  display: flex;
  gap: 10px;
`;
export const PoolsInfoFee = styled.div`
  color: #dddedf;
  text-align: center;
  font-size: 13px;
  font-weight: 500;
  border-radius: 6px;
  background: #52565b;
  padding: 0 6px;
  &.light {
    background-color: #D0F6E3;
    color: #000;
  }
  span {
    font-family: DMMono-400;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    font-size: 12px;
    padding: 0 5px;
  }
`;

export const PoolsInfoFarm = styled.div`
  color: #83d3b0;
  text-align: center;
  font-size: 13px;
  font-weight: 500;
  border-radius: 6px;
  background: #1f4c40;
  padding: 0 6px;
  span {
    font-family: DMMono-400;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    font-size: 12px;
    padding: 0 5px;
  }
`;
export const PoolInfoTitle = styled.span`
  display: block;
  color: #92929e !important;
  font-size: 14px;
  font-family: "Syne";
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    font-size: 12px;
  }
`;
export const MyLiquidityWrapper = styled.div`
  position: relative;
  border-radius: 12px;
  background: #121212;
  padding: 12px;
  & > p {
    font-family: DMMono-400;
  }
  &::before {
    content: "";
    position: absolute;
    bottom: 5px;
    right: 5px;
    background: url(${logo}) no-repeat center / 100% auto;
    width: 35px;
    height: 21px;
    opacity: 0.5;
  }
  &.light {
    background: #E4E9FF;
  }
`;

export const NoData = styled.div`
  text-align: center;
  color: #fff;
  font-family: "Syne";
  font-weight: 400;
  margin-top: 50px;
  &.light {
    .title-nodata {
      color: #5e5e6b;
    }
  }
  img {
    width: 170px;
    height: 170px;
    margin-bottom: 10px;
  }
  .title-nodata {
    font-size: 22px;
    margin-bottom: 5px;
  }
  .text-nodata {
    line-height: 17.28px;
    color: #5e5e6b;
    font-size: 16px;
  }
  @media screen and (max-width: 767px) {
    img {
      margin: 0 auto 50px;
    }
  }
`;
