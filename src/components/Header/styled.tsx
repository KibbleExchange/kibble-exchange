import { Link } from "react-router-dom";
import styled from "styled-components";

export const HeaderBody = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 100;
`;
export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  max-width: 1440px;
  margin: 0 auto;
`;
export const HeaderLogo = styled(Link)``;
export const HeaderTitle = styled.div`
  img {
    width: 100%;
  }
  @media screen and (max-width: 767px) {
    width: 150px;
    margin-right: auto;
    margin-left: -15px;
  }
`;
export const HeaderButton = styled.div`
  a {
    display: block;
  }
  button {
    width: 170px;
    height: 50px;
    background-color: #141414;
    outline: none;
    border: none;
    border-radius: 11px;
    position: relative;
    overflow: hidden;
    padding: 0px;
    cursor: pointer;
    &::before,
    &::after {
      content: "";
      width: 100%;
      height: 100%;
      position: absolute;
      top: -50%;
      left: -50%;
      transform-origin: bottom right;
      animation: animationBtn 6s linear infinite;
    }
    &:before {
      background: linear-gradient(0deg, transparent, #0dd5b8);
    }
    &:after {
      background: linear-gradient(0deg, transparent, #0387f5);
      animation-delay: -3s;
    }
    span {
      width: calc(100% - 2px);
      height: calc(100% - 2px);
      background-color: #000;
      border-radius: 11px;
      position: absolute;
      z-index: 1;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      box-shadow: 0px 4.99532px 19.9813px rgba(104, 1, 255, 0.12);
      font-weight: 500;
      font-size: 14px;
      line-height: 128%;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  @keyframes animationBtn {
    0% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }
  @media screen and (max-width: 1023px) {
    margin-left: auto;
    button {
      width: 124px;
      height: 40px;
    }
  }
`;
