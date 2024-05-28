import styled from "styled-components";
import { KeyvisualButton, TitleContainer } from "@kibble-exchange/uikit";

export const ReviewLiquidityContainer = styled.div`
  padding: 60px 15px;
`;
export const ReviewLiquidityWrapper = styled.div`
  max-width: 730px;
  margin: 0 auto;
  padding: 40px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  overflow: hidden;
  ${TitleContainer} {
    font-size: 30px;
    &::before,
    &::after {
      content: none;
    }
  }
  ${KeyvisualButton} {
    width: calc(100% - 30px);
  }
`;
export const RLHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  & > div {
    p {
      color: #fff;
      font-size: 15px;
      line-height: 20px;
    }
  }
`;
export const ReviewListEmpty = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  padding: 30px;
  margin-bottom: 20px;
  & > span {
    margin-bottom: 20px;
    svg {
      width: 100px;
      height: 100px;
    }
  }
  p {
    color: #fff;
    font-size: 15px;
    font-weight: 700;
    line-height: 20px;
  }
`;
