import styled from "styled-components";

export const IDOLaunchContainer = styled.div``;
export const IDOLaunchWrapper = styled.div``;
export const IDOList = styled.ul`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  & > li {
    width: calc(33.33% - 11px);
    padding: 16px;
    border-radius: 16px;
    border: 1px solid var(--Ido-Cart-Boder);
    background: var(--Stake-Bg);
    transition: all 0.25s linear;
    cursor: pointer;
    &:hover {
      border: 1px solid var(--Ido-Cart-Boder-hover);
    }
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    & > li {
      width: calc(50% - 11px);
    }
  }
  @media screen and (max-width: 767px) {
    flex-wrap: nowrap;
    overflow-x: scroll;
    scrollbar-color: transparent transparent;
    scrollbar-width: thin;
    -ms-overflow-style: none;
    /* width */
    & > li {
      width: 100%;
      min-width: 75%;
      &:hover {
        border: 1px solid var(--Ido-Cart-Boder);
      }
    }
  }
  * {
    box-sizing: border-box;
  }
`;
export const IDOImageParent = styled.div`
  position: relative;
  .img-tag {
    border-radius: 8px;
    overflow: hidden;
    img {
      transition: all.3s;
      border-radius: 8px;
      width: 100%;
    }
  }
`;
export const IDOTag = styled.div<{ colorBg?: any; colorText?: any }>`
  position: absolute;
  top: 10px;
  right: 10px;
  display: inline-flex;
  padding: 0px 10px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  border-radius: 6px;
  background: ${({ colorBg }) => (colorBg ? colorBg : "#1f4c40")};
  p {
    color: ${({ colorText }) =>
      colorText ? `${colorText} !important` : "#83d3b0 !important"};
    text-align: center;
    font-family: Syne;
    font-size: 13px;
    font-style: normal;
    font-weight: 300;
    line-height: 150%; /* 16.5px */
  }
`;

export const IDOBody = styled.div`
  position: relative;
  margin-top: 10px;
  &.light {
    h2 {
      color: #43424a;
    }
  }
  h2 {
    color: #fff;
    text-align: center;
    font-family: Dirtyline;
    font-size: 16px;
    font-weight: 400;
    white-space: pre-line;
    width: max-content;
    text-transform: lowercase;
    text-rendering: optimizeLegibility;
    margin: 5px 0;
  }
  p {
    color: var(--Neutral-400, #92929e);
    font-family: Syne;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 125%; /* 15px */
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    line-clamp: 5;
    -webkit-box-orient: vertical;
  }
`;

export const IDOReward = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  border-radius: 8px;
  background: var(--Total-Raise);
  padding: 15px 10px;
  margin: 10px 0;
  margin-bottom: 10px;
  position: relative;
  overflow: hidden;
  .img-total-rasie {
    max-width: 200px;
    position: absolute;
    right: 0;
  }
  p {
    color: var(--Total-Raise-Text);
    font-family: Syne;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 125%; /* 15px */
  }
  h2 {
    color: var(--Total-Raise-Text);
    text-align: right;
    font-family: DMMono-400;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 125%; /* 18.75px */
  }
`;

export const LaunchpadBody = styled.div`
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
`;
export const LaunchpadListEmpty = styled.div`
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  padding: 50px 30px;
  margin-bottom: 20px;
  & > span {
    margin-bottom: 20px;
    svg {
      width: 100px;
      height: 100px;
    }
  }
  p {
    color: #fff;
    font-size: 15px;
    font-weight: 700;
    line-height: 20px;
  }
`;
