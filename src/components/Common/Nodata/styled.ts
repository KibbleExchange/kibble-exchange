import { styled } from "styled-components";

export const NoDataContainer = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 50px;
`;

export const NoDataContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-width: 320px;
  margin: 0 auto;
  .img-nodata {
    max-width: 200px;
    img {
      width: 100%;
    }
  }
  h2 {
    color: var(--Stake-Text-Emtry);
    font-size: 26px;
    display: flex;
    gap: 16px;
    font-family: DirtyLine;
    text-transform: lowercase;
    text-align: center;
  }
  p {
    color: var(--Neutral-600, #5e5e6b);
    text-align: center;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 17.28px; /* 124.675% */
  }
`;
