import styled from "styled-components";
// Image
import icn01 from "../../assets/Kibble/kibble_icn_01.svg";
import icn02 from "../../assets/Kibble/kibble_icn_02.svg";
import {
  FooterSocial,
  FormInput,
  LabelForm,
  SubscribeForm,
} from "../../components/Footer/styled";
import { InputContainer } from "@kibble-exchange/uikit";

export const KibbleContainer = styled.div`
  color: #fff;
  position: relative;
`;
export const KibbleWrapper = styled.div`
  padding: 283px 10px 30px;
  background-color: #000;
  border-radius: 0 0 34px 34px;
  position: relative;
  z-index: 1;
`;
export const KibbleContentVideo = styled.div`
  width: 150%;
  margin-left: auto;
  position: absolute;
  z-index: 10;
  right: -190px;
  top: -80px;
  max-width: 645px;
  video {
    width: 100%;
  }
`;
export const KibbleContentTop = styled.div``;
export const KibbleTitle = styled.h2`
  font-family: Dirtyline;
  font-size: 36px;
  line-height: 96%; /* 34.56px */
  margin-bottom: 10px;
  .text-left {
    text-transform: lowercase;
  }
  .text-right {
    font-family: DMMono-400;
    font-size: 36px;
    line-height: 96%;
  }
  .text-small {
    font-family: Dirtyline;
  }
`;
export const KibbleText = styled.p`
  color: var(--Neutral-200, #d9d9de);
  font-family: Syne;
  font-size: 24px;
  line-height: 120%; /* 28.8px */
  letter-spacing: -0.072px;
  margin-bottom: 32px;
  .is-yellow {
    color: #eab325;
  }
  .is-blue {
    color: #b5ebff;
  }
`;
export const KibbleListButton = styled.ul`
  display: flex;
  align-items: center;
  gap: 12px;
`;
export const KibbleItemButton = styled.li`
  font-family: DMMono-500;
  font-size: 16px;
  line-height: 125%; /* 20px */
  padding: 7px 10px;
  background-color: #fff;
  border-radius: 50px;
  min-width: 107px;
  text-align: center;
  &:nth-child(1) {
    color: var(--Spring-Green-600, #01b85f);
    span {
      &:before {
        background-image: url(${icn01});
      }
    }
  }
  &:nth-child(2) {
    color: var(--Blue--Pri-500, #1eb0ff);
    span {
      &:before {
        background-image: url(${icn02});
      }
    }
  }
  .is-text {
    font-family: Syne;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 125%;
  }
  .inner {
    position: relative;
    padding-left: 28px;
    &:before {
      position: absolute;
      content: "";
      top: 0;
      left: 0;
      background: center / contain no-repeat;
      width: 20px;
      height: 20px;
    }
  }
`;

export const KibbleContentBottom = styled.div`
  background-color: #1a1a1d;
  padding: 20px 10px 100px;
  ${LabelForm},
  ${InputContainer} {
    background-color: #1a1a1d;
  }
  ${LabelForm} {
    left: 11px;
  }
  ${InputContainer} {
    min-width: unset;
  }
  ${SubscribeForm} {
    width: 100%;
    gap: 10px;
    justify-content: space-between;
  }
  ${FormInput} {
    width: calc(100% - 125px);
  }
  ${FooterSocial} {
    border-bottom: none;
    margin-bottom: 30px;
    max-width: unset;
    li {
      background-color: #43424a;
      padding-left: 18px;
      padding-right: 18px;
      width: 19.5%;
      min-height: 1.3rem;
      &:nth-child(1) {
        left: -34%;
      }
      &:nth-child(2) {
        left: -14%;
        top: 5.5rem;
      }
      &:nth-child(3) {
        top: 2.4rem;
        right: -10%;
        transform: rotate(24deg);
      }
      &:nth-child(4) {
        top: 53px;
        right: -7%;
      }
      &:nth-child(5) {
        top: 15px;
        right: -35%;
        left: unset;
      }
    }
    a {
      font-size: 18px;
    }
  }
`;

export const FooterLogo = styled.div`
  text-align: center;
  a {
    display: block;
    width: 26.83%;
    margin: 0 auto;
  }
  img {
    width: 100%;
  }
`;
