import { styled } from "styled-components";

export const TextBalanceStyle = styled.div`
  display: flex;
  align-items: center;
  .img-s {
    display: flex;
    align-items: center;
    width: 30px;
    margin-left: 10px;
    img {
      width: 100%;
    }
  }
  h1 {
    color: #f7f7f8 !important;
    text-align: right !important;
    font-family: DMMono-500 !important;
    font-size: 32px !important;
    font-style: normal !important;
    font-weight: 500 !important;
    line-height: 125% !important;
    letter-spacing: -2.24px !important;
  }
  h2 {
    color: #6e6e7c !important;
    font-family: DMMono-500 !important;
    font-size: 32px !important;
    font-weight: 300 !important;
    line-height: 125% !important;
    letter-spacing: -2.24px !important;
  }
  &.light {
    h1 {
      color: #000 !important;
    }
  }
`;
