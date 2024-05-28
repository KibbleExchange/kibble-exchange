import styled from "styled-components";

export const AppContainer = styled.div<{ pathname: any }>`
  min-height: 100vh;
  background: #000;
  overflow: hidden;
  &.light {
    background: #F7F8FF;
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    min-height: calc(100vh - 100px);
  }
  @media screen and (max-width: 767px) {
    min-height: 100vh;
    &.is-kibble {
      background-color: #1a1a1d;
      &.light {
        background-color: #007AF5;
      }
    }
  }
`;
