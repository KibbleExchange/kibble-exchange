import styled from "styled-components";

export const TitleContainer = styled.h2`
  position: relative;
  color: #fff;
  text-align: center;
  font-family: Dirtyline;
  font-size: 32px;
  font-weight: 400;
  white-space: pre-line;
  width: max-content;
  text-transform: lowercase;
  text-rendering: optimizeLegibility;
  &.light {
    color: #43424A;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    font-size: 35px;
  }
  @media screen and (max-width: 767px) {
    font-size: 27px;
    line-height: 35px;
    & > div {
      &::before {
        left: 50%;
        margin-left: -49px;
        top: -100px;
        transform: rotate(20deg);
      }
    }
    &::before,
    &::after {
      mix-blend-mode: darken;
    }
    &::before {
      z-index: 2;
    }
    &::after {
      content: none;
    }
  }
`;
export const TitleInner = styled.div`
  position: relative;
`;
