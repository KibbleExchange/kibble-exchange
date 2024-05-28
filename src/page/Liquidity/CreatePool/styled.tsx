import styled from "styled-components";
import { SwapHeader } from "../../Swap/styled";

export const CreatePoolHeader = styled.div`
  ${SwapHeader} {
    margin-bottom: 20px;
  }
`;
export const CreatePoolCondition = styled.div`
  padding: 20px;
  background: #32363f;
  border-radius: 10px;
  margin-bottom: 20px;
  &.light {
    background-color: #eeeef0;
    .ant-checkbox-wrapper {
      span {
        &:nth-child(2) {
          color: #6e6e7c;
        }
      }
    }
  }
  .ant-checkbox-wrapper {
    .ant-checkbox {
      margin-right: 15px;
    }
    span {
      &:nth-child(2) {
        padding: 0;
        color: #fff;
        font-size: 13px;
      }
    }
  }
  .ant-checkbox-inner {
    width: 20px;
    height: 20px;
    &::after {
      width: 9px;
      height: 10px;
    }
  }
`;
