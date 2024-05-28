import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../../../assets/Dashboard/Liquidity/logo.svg";
import logo_light from "../../../assets/Dashboard/Liquidity/logo_light.svg";
import dark from "../../../assets/Header/dark.svg";
import light from "../../../assets/Header/light.svg";

export const HeaderDashboardContainer = styled.header`
  position: relative;
  z-index: 200;
`;
export const HeaderDashboardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1500px;
  margin: 0 auto;
  padding: 20px;
`;
export const HDLogo = styled(Link)`
  display: flex;
  width: 150px;
  img {
    width: 100%;
  }
  @media screen and (max-width: 767px) {
    width: 100px;
  }
`;
export const HeaderAction = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  /* margin-right: 90px; */
  /* .select-language {
    width: 42px !important;
    height: 42px;
    border-radius: 50%;
    .ant-select-selector {
      padding: 0;
      border: 0;
      border-radius: 50%;
      text-align: center;
      background: rgba(217, 217, 217, 0.1);
      color: #fff;
    }
    .ant-select.ant-select-outlined.select-language.ant-select-focused.ant-select-single.ant-select-show-arrow.ant-select-open {
      .ant-select-selection-item {
        color: #fff;
      }
    }
    .ant-select-selection-item {
      color: #fff !important;
    }
    .ant-select-arrow {
      display: none;
    }
    .ant-select-selection-item {
      padding-right: 0;
    }
    .ant-select-item.ant-select-item-option.ant-select-item-option-active.ant-select-item-option-selected,
    .ant-select-item.ant-select-item-option {
      padding: 0;
      text-align: center;
    }
  } */
  @media screen and (max-width: 767px) {
    margin-right: 0;
    p {
      min-width: 100px;
    }
  }
`;
export const HeaderNavigation = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  & > p {
    font-family: DirtyLine;
    text-transform: lowercase;
    color: #edfaff;
    font-size: 19px;
    text-align: right;
  }
  &.light {
    & > p {
      color: #4d4d57;
    }
  }
  @media screen and (max-width: 767px) {
    display: none;
    p {
      min-width: auto;
    }
    .title-page {
      display: none;
    }
  }
`;
export const NavigationHamburger = styled.div`
  position: relative;
  cursor: pointer;
  &::before,
  &::after {
    content: "";
    position: absolute;
  }
  &::before {
    right: 50%;
    margin-right: -20px;
    width: 40px;
    height: 40px;
    background: #3a3a40;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.35s cubic-bezier(0.19, 1, 0.22, 1);
  }
  &::after {
    right: 20px;
    bottom: -190px;
    background: url(${logo}) no-repeat center / 100% auto;
    width: 80px;
    height: 48px;
    opacity: 0;
    transition: all 0.05s cubic-bezier(0.19, 1, 0.22, 1);
  }
  &.light {
    &::before {
      background: #d9d9de;
    }
    &::after {
      background-image: url(${logo_light});
    }
    & > div {
      & > span {
        background-color: #0e335d;
      }
    }
    & > ul {
      & > li {
        .active {
          color: #007af5 !important;
        }
      }
    }
    &.open {
      &::before {
        background-color: #fff;
        border: 1px solid #b8b8c1;
      }
      & > ul {
        & > li {
          a {
            color: #b8b8c1;
          }
        }
      }
      & > div {
        & > span {
          background-color: #6e6e7c;
        }
      }
    }
  }
  &.open {
    & > ul {
      visibility: visible;
    }
    &::before {
      width: 205px;
      height: 244px;
      border-radius: 10px;
      background: #141518;
    }
    &::after {
      opacity: 1;
      transition: all 1.5s;
    }
    & > div {
      & > span {
        &:nth-child(1) {
          width: 15px;
          transform: rotate(45deg);
          top: 6px;
        }
        &:nth-child(2) {
          width: 15px;
          margin-left: 0;
          transform: rotate(-45deg);
          top: -1px;
        }
      }
    }
  }
  & > div {
    position: relative;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    & > span {
      position: relative;
      display: block;
      height: 2px;
      background-color: #b5ebff;
      transition: all 0.15s linear;
      &:not(:last-child) {
        margin-bottom: 5px;
      }
      &:nth-child(1) {
        width: 15px;
      }
      &:nth-child(2) {
        width: 10px;
        margin-left: -5px;
      }
    }
  }
  & > ul {
    position: absolute;
    left: -140px;
    visibility: hidden;
    & > li {
      &:not(:last-child) {
        margin-bottom: 25px;
      }
      a {
        color: #edfaff;
        font-family: DirtyLine;
        font-size: 20px;
        font-weight: 400;
        line-height: 16px;
        text-transform: lowercase;
        &.active {
          text-decoration: underline;
          text-underline-offset: 2px;
        }
      }
    }
  }
  @media screen and (max-width: 767px) {
    display: none;
  }
`;

export const NavigationMobileMain = styled.div`
  display: none;
  @media screen and (max-width: 767px) {
    position: fixed;
    display: flex;
    width: 100%;
    bottom: 0;
    left: 0;
    z-index: 100;
  }
`;

export const NavigationMobile = styled.div`
  width: 100%;
  margin: 0 auto;
  height: 70px;
  display: flex;
  padding: 10px 28px;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #2D2E34;
  background: #000;
  a {
    display: block;
    &:nth-child(3) {
      background: #fff;
      padding: 7px 11px;
      border-radius: 91px;
      p {
        color: #141518 !important;
      }
      img {
        filter: unset !important;
      }
    }
  }
  &.light {
    background-color: #fff;
    border-color: #EEEEF0;
    a {
      &:nth-child(3) {
        background: #4176FA;
        p {
          color: #EEEEF0 !important;
        }
      }
    }
  }
  @media screen and (max-width: 767px) {
    padding: 10px;
    a {
      width: 71px;
      &:nth-child(3) {
        width: unset;
      }
    }
  }
  @media screen and (max-width: 374px) {
    a {
      width: 60px;
      p {
        font-size: 11px;
      }
    }
  }
`;

export const NavigationMobileItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    color: #92929e;
    text-align: center;
    font-size: 13px;
    font-weight: 500;
    line-height: 20px;
  }
  figure {
    width: 24px;
    height: 24px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  img {
    filter: contrast(0.1);
  }
  &:hover {
    p {
      color: #b5ebff;
    }
    img {
      filter: unset;
    }
  }
`;

export const ActionSocial = styled.ul`
  display: flex;
  align-items: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: rgba(217, 217, 217, 0.1);
  overflow: hidden;
  transition: all 0.15s linear;
  cursor: pointer;
  .icon-social {
    max-width: 20px;
    img {
      width: 100%;
    }
  }
  &.light {
    background: rgba(197, 213, 255, 0.59);
  }
  &:hover {
    width: 120px;
    border-radius: 50px;
  }
  & > li {
    display: flex;
    width: 42px;
    justify-content: center;
    flex-shrink: 0;
    margin-left: -2px;
    a {
      display: flex;
      width: 20px;
      img {
        width: 100%;
      }
    }
  }
  @media screen and (max-width: 767px) {
    display: none;
  }
`;
export const ActionConnect = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  border-radius: 53px;
  background: rgba(217, 217, 217, 0.1);
  padding: 12px;
  cursor: pointer;
  figure {
    display: flex;
    width: 22px;
    height: 22px;
    img {
      width: 100%;
    }
  }
  p {
    color: #f7f7f8;
    font-size: 16px;
  }
  &.light {
    background: rgba(197, 213, 255, 0.59);
    p {
      color: #43424a;
    }
  }
`;
export const ActionTheme = styled.div`
  position: relative;
  border-radius: 50%;
  width: 42px;
  height: 42px;
  background: rgba(217, 217, 217, 0.1);
  transition: all 0.35s linear;
  overflow: hidden;
  /* pointer-events: none; */
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
  &.light {
    background: rgba(197, 213, 255, 0.59);
    &::before {
      transform: translateX(0);
    }
    &::after {
      transform: translateY(-40px);
    }
  }
  &::before,
  &::after {
    content: "";
    position: absolute;
    background: no-repeat center / 100% auto;
    width: 25px;
    height: 25px;
    top: 50%;
    left: 50%;
    margin-top: -13px;
    margin-left: -13px;
    transition: all 0.35s linear;
  }
  &::before {
    background-image: url(${dark});
    transform: translateY(-40px);
    z-index: 2;
  }
  &::after {
    background-image: url(${light});
  }
`;
