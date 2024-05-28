import styled from "styled-components";

export const LoadingSpinContainer = styled.div`
  text-align: center;
  .ant-spin {
    margin-bottom: 20px;
  }
  .ant-spin-dot-item {
    background-color: #0dd5b8;
  }
  & > p {
    color: #fff;
    font-size: 20px;
    line-height: 20px;
    animation: AnimOpacity 2s linear infinite;
  }
  @keyframes AnimOpacity {
    0% {
      opacity: 0.5;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.5;
    }
  }
`;
