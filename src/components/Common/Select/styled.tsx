import styled from "styled-components";

export const SelectContainer = styled.div`
  .ant-select {
    border: 1px solid transparent;
    border-radius: 8px;
    background: #434343;
    height: 42px;
    .ant-select-arrow {
      opacity: 1;
    }
    .ant-select-selector {
      background-color: transparent;
      color: #fff;
      border-color: #0dd5b8;
      border: none;
    }
    .ant-select-selection-item {
      color: #fff;
      div {
        display: flex;
        align-items: center;
        gap: 5px;
      }
    }
  }
  .ant-select-dropdown {
    background-color: #1b1c20;
    .ant-select-item-option-content {
      color: #fff;
      div {
        display: flex;
        align-items: center;
        gap: 5px;
      }
    }
    .ant-select-item-option-active {
      background-color: #0dd5b8 !important;
    }
    .ant-select-item-option.ant-select-item-option-selected {
      background-color: transparent;
    }
  }
  .ant-select-selection-placeholder {
    color: #fff;
  }
  .select-text {
    color: #FFF;
    font-size: 20px;
    line-height: 24px;
    margin-left: 5px;
  }
`;
