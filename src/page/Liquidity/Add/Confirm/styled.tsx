import styled from "styled-components";
import { ReviewwAccordionHeader } from "../../Review/Accordion/styled";
import { ConfirmSwapHeader } from "../../../Swap/Confirm/styled";

export const ConfirmAddLiquidityContainer = styled.div`
  &.light {
    color: #43424a;
  }
  color: #fff;
  & > p {
    margin-bottom: 15px;
    & > span {
      color: #03b5fc;
      font-weight: 500;
      font-family: DMMono-500;
    }
  }
  ${ReviewwAccordionHeader} {
    margin-bottom: 15px;
    width: 100%;
    &::before {
      content: none;
    }
  }
  ${ConfirmSwapHeader} {
    width: 100%;
    margin-bottom: 0;
  }
`;
export const AddConfirmList = styled.div`
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 20px;
  & > ul {
    & > li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      &:not(:last-child) {
        margin-bottom: 5px;
      }
      span {
        &:nth-child(1) {
          color: #92929E;
          font-size: 15px;
          line-height: 25px;
        }
        &:nth-child(2) {
          font-family: DMMono-400;
          font-weight: 400;
        }
      }
    }
  }
`;
export const AddConfirmButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`;
