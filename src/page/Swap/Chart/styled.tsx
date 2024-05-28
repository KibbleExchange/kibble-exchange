import styled from "styled-components";

export const SwapChartContainer = styled.div`
  @media screen and (max-width: 767px) {
    margin-bottom: -40px;
  }
`;
export const SwapChartEmpty = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  height: 365px;
  figure {
    width: 170px;
    margin: 0 auto;
    img {
      width: 100%;
    }
  }
  p {
    color: #eeeef0;
    font-family: Dirtyline;
    font-size: 22px;
    text-transform: lowercase;
    margin-bottom: 5px;
  }
  span {
    color: #5e5e6b;
    font-size: 16px;
    line-height: 17.28px;
  }
`;
export const ChartWapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  .apexcharts-gridline {
    display: none !important;
  }
  .apexcharts-area {
    stroke-width: 1.5px;
  }
`;
export const ChartTimeTab = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;
export const TimBox = styled.div`
  color: #fff;
  padding: 10px;
`;
