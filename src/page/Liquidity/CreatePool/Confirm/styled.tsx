import styled from "styled-components";
import { LoadingSpinContainer } from "../../../../components/Common/Loading/styled";
import { CreatePoolHint } from "../../Add/styled";
import logo from "../../../../assets/Dashboard/Liquidity/logo.svg";

export const CreatePoolConfirmContainer = styled.div``;
export const CPHeader = styled.div`
  padding-bottom: 20px;
  p {
    font-family: DMMono-400;
    color: #fff;
  }
  &.light {
    p {
      color: #34344a;
    }
  }
`;
export const CPInfoConfirmAsset = styled.div`
  position: relative;
  padding: 10px;
  margin-bottom: 20px;
  color: #fff;
  background-color: #28272c;
  border-radius: 10px;
  overflow: hidden;
  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    right: -15px;
    width: 90px;
    height: 50px;
    background: url(${logo}) no-repeat center / 100% auto;
    opacity: 0.3;
  }
  &.light {
    background-color: #F0F2F8;
    color: #34344a;
  }
`;
export const ConfirmAssetRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  &:not(:last-child) {
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px dashed #43424a;
  }
  & > div {
    display: flex;
    gap: 10px;
    & > figure {
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
  }
  p {
    position: relative;
    font-family: DMMono-400;
  }
`;
export const WaitingPoolCreated = styled.div`
  padding: 40px 0 0;
  text-align: center;
  font-size: 20px;
  color: #fff;
  &.light {
    & > p {
      color: #3A3A40;
    }
    & > span {
      color: #92929E;
    }
  }
  figure {
    width: 250px;
    height: 250px;
    margin: 0 auto;
    img {
      width: 100%;
    }
  }
  ${LoadingSpinContainer} {
    p {
      display: none;
    }
  }
  & > p {
    animation: opacityLoading 1s linear infinite;
    text-align: center;
    margin-bottom: 10px;
    color: #eeeef0;
    font-size: 18px;
    line-height: 125%;
  }
  & > span {
    display: block;
    margin-bottom: 15px;
    color: #6e6e7c;
    font-size: 14px;
    & > span {
      font-family: DMMono-400;
    }
  }
  ${CreatePoolHint} {
    margin: 0 auto;
  }
  @keyframes opacityLoading {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
`;
export const SuccessSwap = styled.div`
  figure {
    width: 250px;
    height: 250px;
    margin: 0 auto;
    img {
      width: 100%;
    }
  }
  & > p {
    text-align: center;
    margin-bottom: 10px;
    color: #eeeef0;
    font-size: 20px;
    line-height: 125%;
  }
  & > span {
    display: block;
    margin-bottom: 15px;
    text-align: center;
    color: #6e6e7c;
    font-size: 16px;
    & > span {
      font-family: DMMono-400;
    }
  }
  &.light {
    & > p {
      color: #3A3A40;
    }
    & > span {
      color: #92929E;
    }
  }
`;
