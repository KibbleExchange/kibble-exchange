import styled from "styled-components";

export const DashboardContainer = styled.div`
  position: relative;
  min-height: calc(100vh - 250px);
  padding-top: 50px;
  // z-index: 201;
  @media screen and (max-width: 1023px) {
    min-height: calc(100vh - 400px);
    padding-top: 25px;
  }
`;
