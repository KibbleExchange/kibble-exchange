import { ButtonSubmit } from "@kibble-exchange/uikit";
import styled from "styled-components";

export const ReviewAccordionContainer = styled.div`
  margin-bottom: 40px;
  padding-bottom: 40px;
  border-bottom: 2px solid #0488f5;
  @media screen and (max-width: 767px) {
    padding-bottom: 20px;
    margin-bottom: 20px;
  }
`;
export const ReviewwAccordionHeader = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 20px;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  width: 300px;
  cursor: pointer;
  flex-shrink: 0;
  &.light {
    color: #43424a;
  }
  @media screen and (max-width: 767px) {
    margin-bottom: 20px;
  }
`;
export const RAHeader = styled.div`
  position: relative;
  img {
    position: relative;
    border-radius: 50%;
    border: 2px solid #fff;
    &:nth-child(1) {
      z-index: 5;
    }
    &:nth-child(2) {
      margin-left: -15px;
    }
  }
`;
export const ReviewAccordionDetails = styled.div`
  color: #fff;
  font-size: 18px;
  overflow: hidden;
  transition: all 0.25s linear;
  width: 100%;
  &.active {
    height: 0;
    margin-top: 0;
    padding: 0;
  }
  img {
    border-radius: 50%;
  }
  & > div {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    gap: 20px;
    ${ButtonSubmit} {
      padding: 10px;
    }
    & > div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-direction: column;
      gap: 10px;
      width: calc(33.33% - 10px);
      & > div {
        display: flex;
        align-items: center;
        gap: 10px;
      }
    }
  }
  .share-pool {
    color: #0488f5;
  }
  ${ButtonSubmit} {
    width: max-content;
    margin: 0 auto;
  }
  @media screen and (max-width: 1023px) {
    & > div {
      flex-wrap: wrap;
    }
  }
  @media screen and (max-width: 767px) {
    font-size: 15px;
    & > div {
      flex-direction: column;
      align-items: flex-start;
      & > div {
        width: 100%;
        flex-direction: row;
        justify-content: space-between;
      }
    }
  }
`;
export const ReviewAccordionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 30px;
  @media screen and (max-width: 1023px) {
    flex-wrap: wrap;
  }
  @media screen and (max-width: 767px) {
    gap: 0;
  }
`;
