import { styled } from "styled-components";

export const WalletInfoStyle = styled.div`
  position: relative;
  width: 100%;
`;

export const Info = styled.div`
  position: relative;
  width: 100%;
  height: 210px;
`;

export const WalletAssets = styled.div`
  position: relative;
  width: 100%;
`;

export const WalletParent = styled.div`
  overflow-y: scroll;
  height: 210px;
  margin-top: 10px;
`;

export const WalletList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const WalletAssetItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px;
  align-self: stretch;
  border-radius: 10px;
  background: #28272c;
  &.light {
    background-color: #f3f4f8;
    h1 {
      color: #92929e;
    }
  }
  h2 {
    color: #92929e;
    font-family: DMMono-500;
    font-size: 15px;
  }
  h1 {
    color: #f7f7f8;
    font-family: DMMono-400;
    font-size: 14px;
  }
`;

export const WalletAssetToken = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const TabInfo = styled.ul`
  border-radius: 10px;
  background: #141518;
  padding: 4px;
  width: max-content;
  display: flex;
  align-items: center;
  gap: 5px;
  width: 100%;
  &.light {
    background-color: #f3f4f8;
    & > li {
      color: #92929e;
      &:hover,
      &.active {
        background-color: #007af5;
        color: #fff;
      }
    }
  }
  & > li {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    padding: 6px 0;
    border-radius: 6px;
    transition: all 0.15s linear;
    color: #fff;
    cursor: pointer;
    position: relative;
    svg {
      max-width: 20px;
    }
    &:hover {
      background: #43424a;
      &::before {
        opacity: 1;
      }
    }
    &.active {
      background: #43424a;
      pointer-events: none;
      &::before {
        display: none;
      }
    }
    @keyframes pending {
      0% {
        width: 100%;
      }
      100% {
        width: 0%;
      }
    }
  }
  @media screen and (max-width: 767px) {
    margin: 0 auto;
    & > li {
      font-size: 13px;
    }
  }
`;

export const WalletAddress = styled.div`
  padding: 14px 0;
  border-radius: 10.12px;
  background: #28272c;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  &.light {
    background-color: #f3f4f8;
    h1 {
      color: #28272c;
    }
  }
  h1 {
    color: #f7f7f8;
    margin-left: 14px;
  }
  span {
    padding-left: 10px;
    color: #92929e;
  }
`;

export const WalletBalance = styled.div`
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h2 {
    color: var(--Neutral-400, #92929e);
    text-align: center;
    font-family: Syne;
    font-size: 15px;
    font-weight: 400;
    line-height: 125%;
  }
  h1 {
    color: var(--Neutral-50, #f7f7f8);
    text-align: right;
    font-family: DMMono-500;
    font-size: 32px;
    font-weight: 500;
    line-height: 125%;
    letter-spacing: -2.24px;
  }
`;

export const WalletActions = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 25px;
`;
