import { Link } from "react-router-dom";
import styled from "styled-components";
import { ButtonReset } from "../../page/Swap/styled";
import { InputContainer } from "@kibble-exchange/uikit";

export const FooterContainer = styled.div`
  position: relative;
  z-index: 5;
  overflow: hidden;
  padding: 30px;
  background-color: #000;
  border-top: 1px solid #141518;
  &.light {
    background-color: #FFF;
    border-color: #F3F4F8;
  }
`;
export const FooterWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  gap: 40px;
  @media screen and (max-width: 767px) {
    flex-wrap: wrap;
    gap: 20px;
  }
`;
export const FooterMain = styled.div`
  max-width: 280px;
  p {
    color: #6e6e7c;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: 0.28px;
  }
`;
export const FooterLogo = styled(Link)`
  max-width: 150px;
  display: block;
  img {
    width: 100%;
  }
`;
export const FooterNav = styled.ul`
  display: flex;
  align-items: flex-start;
  gap: 60px;
  &.light {
    & > li {
      & > h2 {
        color: #5E5E6B;
      }
    }
  }
  & > li {
    & > h2 {
      margin-bottom: 10px;
      color: #fff;
      font-size: 20px;
      line-height: 20px;
      letter-spacing: 0.4px;
    }
    & > ul {
      & > li {
        &:not(:last-child) {
          margin-bottom: 5px;
        }
        a {
          display: block;
          color: #848484;
          font-size: 16px;
          line-height: 29px;
          letter-spacing: 0.28px;
          white-space: nowrap;
        }
      }
    }
  }
  @media screen and (min-width: 768px) and (max-width: 1250px) {
    gap: 40px;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    & > li {
      & > ul {
        & > li {
          a {
            font-size: 12px;
          }
        }
      }
    }
  }
  @media screen and (max-width: 767px) {
    flex-wrap: wrap;
    gap: 40px;
    justify-content: space-between;
  }
`;
export const CommunityList = styled.ul`
  display: flex;
  align-items: center;
  margin-top: 15px;
  gap: 15px;
  & > li {
    a {
      display: block;
    }
  }
`;
export const FooterSocial = styled.ul`
  max-width: 580px;
  width: 100%;
  border-bottom: 1px solid #3a3a40;
  margin-left: auto;
  &.light {
    border-color: #D9D9DE;
    & > li {
      background: #fff;
      &:nth-child(4) {
        background-color: #F3F4F8;
      }
    }
  }
  & > li {
    position: relative;
    width: max-content;
    margin: 0 auto;
    text-align: center;
    padding: 10px 22px;
    border-radius: 41px;
    background: #141518;
    padding-bottom: 5px;
    & > a {
      color: #fff;
      font-family: DirtyLine;
      font-size: 24px;
      font-weight: 400;
      text-transform: lowercase;
    }
    &:nth-child(1) {
      top: 155px;
      left: -135px;
      transform: rotate(9deg);
      background-color: rgb(30, 176, 255);
    }
    &:nth-child(2) {
      top: 77px;
      transform: rotate(-3deg);
      left: -30px;
      background-color: rgb(0, 0, 0);
    }
    &:nth-child(3) {
      top: 22px;
      right: -85px;
      transform: rotate(22deg);
      background-color: rgb(88, 101, 242);
    }
    &:nth-child(4) {
      top: 36px;
      right: -70px;
      transform: rotate(4deg);
      background-color: rgb(247, 247, 248);
      a {
        color: #000;
      }
    }
    &:nth-child(5) {
      top: -7px;
      right: -208px;
      transform: rotate(-5deg);
      background-color: rgb(216, 59, 59);
    }
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    & > li {
      & > p {
        font-size: 16px;
      }
    }
  }
  @media screen and (max-width: 767px) {
    margin-left: 0;
    margin-top: -30px;
    & > li {
      &:nth-child(1) {
        left: -105px;
      }
      &:nth-child(5) {
        top: -85px;
        right: unset;
        transform: rotate(-5deg);
        left: -105px;
      }
    }
  }
`;
export const FooterSubscribe = styled.div`
  position: relative;
  z-index: 5;
  border-top: 1px solid #141518;
  border-bottom: 1px solid #141518;
  background: #000;
  &.light {
    background: #F3F4F8;
    border-color: #CECECE;
  }
`;
export const SubscribeWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px;
  & > p {
    color: #fff;
    font-family: DirtyLine;
    font-size: 24px;
    text-transform: lowercase;
  }
  &.light {
    & > p {
      color: #5E5E6B;
    }
  }
  @media screen and (max-width: 845px) {
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
    padding: 30px;
  }
`;
export const SubscribeForm = styled.div`
  display: flex;
  align-items: center;
  &.light {
    & > p {
      color: #6E6E7C;
    }
    ${InputContainer} {
      border-radius: 6px;
      border-color: #92929E;
      background: linear-gradient(180deg, #F7F7F8 0%, #ECECF7 77.43%);
      box-shadow: 0px -3px 0px 0px rgba(56, 56, 56, 0.25) inset;
      input {
        color: #B8B8C1 !important;
      }
    }
  }
  & > p {
    color: #92929e;
    font-size: 17px;
    line-height: 19.2px;
  }
  ${InputContainer} {
    width: 400px;
    border-radius: 6px;
    border: 1px solid #4d4d57;
    background: #000;
    box-shadow: 0px -3px 0px 0px rgba(56, 56, 56, 0.25) inset;
    margin-left: 40px;
    margin-right: 15px;
    .ant-input-affix-wrapper {
      padding: 12px 10px;
      font-size: 16px;
    }
  }
  ${ButtonReset} {
    padding-top: 16px;
    padding-bottom: 16px;
  }

  @media screen and (min-width: 1024px) and (max-width: 1100px) {
    ${InputContainer} {
      width: 300px;
    }
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    & > p {
      font-size: 13px;
    }
    ${InputContainer} {
      margin-left: 10px;
    }
  }
  @media screen and (min-width: 846px) and (max-width: 1023px) {
    ${InputContainer} {
      width: 250px;
    }
  }
  @media screen and (max-width: 845px) {
    .sm {
      display: none;
    }
    width: 100%;
  }
  @media screen and (max-width: 767px) {
    flex-wrap: wrap;
    gap: 20px;
    ${InputContainer} {
      margin-left: 0;
      margin-right: 0;
      width: 100%;
      min-width: 300px;
    }
  }
`;

export const FormInput = styled.div`
  position: relative;
`;
export const LabelForm = styled.div`
  position: absolute;
  background-color: #000;
  left: 55px;
  top: -10px;
  padding: 0 3px;
  border-radius: 6px;
  span {
    color: #6e6e7c;
    font-size: 12px;
    font-weight: 400;
    line-height: 125%;
  }
  &.light {
    background-color: #F7F7F8;
  }
`;
