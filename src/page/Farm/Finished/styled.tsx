import styled from "styled-components";

export const NoData = styled.div`
  text-align: center;
  min-height: 438px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  img {
    width: 170px;
  }
  .title-nodata {
    color: var(--Stake-Text-Emtry);
    font-family: Dirtyline;
    font-size: 21.6px;
    text-transform: lowercase;
    margin-bottom: 5px;
  }
  .text-nodata {
    color: #5E5E6B;
    font-size: 13.86px;
  }
  @media screen and (max-width: 767px) {
    min-height: 250px;
  }
`