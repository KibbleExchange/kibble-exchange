import styled from "styled-components";
import { ButtonSubmit, ModalHeader, ModalOverlayInner, TableContainer } from "@kibble-exchange/uikit";

export const TabMyPoolContainer = styled.div`
  ${ModalHeader} {
    margin-bottom: 0;
  }
  ${ModalOverlayInner} {
    padding: 20px;
  }
  ${TableContainer} {
    table {
      .ant-table-thead {
        display: none;
      }
    }
  }
  ${TableContainer} {
    &.light {
      .ant-table-row {
        background-color: #fff;
        border-color: #92929e;
      }
    }
    .ant-table-cell {
      padding: 0 !important;
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
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    ${TableContainer} {
      .ant-table-container .ant-table-cell {
        font-size: 13px;
      }
    }
  }
  @media screen and (max-width: 767px) {
    ${TableContainer} {
      .ant-table-tbody {
        gap: 0;
      }
      .ant-table-row {
        flex-direction: unset;
        flex-wrap: wrap;
        &:not(:last-child) {
          margin-bottom: 10px;
        }
      }
      .ant-table-cell {
        &:nth-child(2),
        &:nth-child(3) {
          display: none;
        }
      }
    }
  }
  @media screen and (min-width: 540px) and (max-width: 767px) {
    ${TableContainer} {
      .ant-table-tbody {
        flex-direction: unset;
        flex-wrap: wrap;
        justify-content: space-evenly;
      }
    }
  }
`;
export const MyPoolFigure = styled.div`
  figure {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;
export const MyPoolAction = styled.div`
  ${ButtonSubmit} {
    padding: 10px 0;
  }
`;
export const MyPoolPosition = styled.div`
  &.light {
    span {
      color: #43424a;
    }
  }
  & > div {
    display: flex;
    align-items: center;
    gap: 10px;
    &:not(:last-child) {
      margin-bottom: 15px;
    }
    img {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      object-fit: cover;
    }
  }
`;
export const ButtonDelete = styled.figure`
  display: flex;
  align-items: center;
  justify-content: center;
  width: max-content;
  padding: 8px 20px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.15);
  transition: all 0.15s linear;
  img {
    width: 16px;
    height: 16px;
  }
  &:hover {
    opacity: 0.7;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    padding-left: 10px;
    padding-right: 10px;
  }
`;
