import styled from "styled-components";
import like from "../../../assets/Dashboard/Common/like.svg";
import like_light from "../../../assets/Dashboard/Common/like_light.svg";
import like_active from "../../../assets/Dashboard/Common/like_active.svg";
import { InputContainer } from "@kibble-exchange/uikit";

export const ChooseTokenContainer = styled.div`
  font-family: DMMono-400;
`;
export const ChooseTokenWrapper = styled.div`
  ${InputContainer} {
    margin-bottom: 10px;
    border-radius: 10px;
    border: 1px solid #4d4d57;
    input {
      font-size: 16px;
      font-weight: 400;
    }
    .ant-input-affix-wrapper {
      padding: 4px 15px;
    }
  }
  &.light {
    ${InputContainer} {
      border-color: #b8b8c1;
      input {
        color: #6e6e7c !important;
      }
    }
  }
`;
export const TokenList = styled.ul`
  max-height: 380px;
  overflow: hidden auto;
  &.light {
    & > li {
      background: #f3f4f8;
      & > p {
        color: #43424a;
      }
      & > div {
        & > div {
          p,
          span {
            color: #43424a;
          }
        }
      }
    }
  }
  & > li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 10px;
    transition: all 0.15s linear;
    border-radius: 10px;
    border: 1px solid transparent;
    cursor: pointer;
    background: #28272c;
    &:hover {
      border-color: #92929e;
    }
    &:not(:last-child) {
      margin-bottom: 5px;
    }
    & > p {
      color: #fff;
      font-size: 14px;
    }
    & > div {
      display: flex;
      align-items: center;
      gap: 12px;
      & > div {
        font-weight: 500;
        p {
          color: #fff;
          font-size: 16px;
          line-height: 16px;
          margin-bottom: 5px;
          font-family: "Syne";
          display: flex;
          align-items: center;
          gap: 5px;
          & > a {
            display: flex;
          }
        }
        span {
          color: #989898;
          font-size: 14px;
          line-height: 14px;
        }
      }
    }
    figure {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      overflow: hidden;
      flex-shrink: 0;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
`;
export const TextResult = styled.p`
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  line-height: 20px;
  text-align: center;
`;
export const TokenNewInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 16px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.15s linear;
  &:not(:last-child) {
    margin-bottom: 5px;
  }
  &:hover {
    background-color: #444854;
  }
  & > div {
    display: flex;
    align-items: center;
    gap: 12px;
    color: #fff;
    & > div {
      & > p {
        font-weight: 500;
        &:nth-child(1) {
          color: #fff;
          font-size: 18px;
        }
        &:nth-child(2) {
          color: #989898;
          font-size: 16px;
        }
      }
    }
    figure {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  & > p {
    color: #2ad844;
    font-size: 16px;
    font-weight: 600;
    line-height: 20px;
    transition: all 0.15s linear;
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }
  }
`;
export const RecentlyAddedToken = styled.div`
  color: #fff;
  margin-bottom: 5px;
  & > p {
    margin-bottom: 10px;
  }
`;
export const ChooseTokenExternalLink = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all 0.15s linear;
  &:hover {
    opacity: 0.7;
  }
  a {
    display: flex;
    img {
      width: 100%;
      height: 100%;
    }
  }
`;
export const LikeButton = styled.div`
  position: relative;
  width: 18px;
  height: 18px;
  &.light {
    &::before {
      background-image: url(${like_light});
    }
  }
  &.active {
    &::before {
      opacity: 0;
    }
    &::after {
      opacity: 1;
    }
  }
  &::before,
  &::after {
    content: "";
    left: 0;
    top: 0;
    position: absolute;
    background: no-repeat center / 100% auto;
    width: 18px;
    height: 18px;
    transition: all 0.15s linear;
  }
  &::before {
    background-image: url(${like});
  }
  &::after {
    background-image: url(${like_active});
    opacity: 0;
  }
  &:hover {
    &::before {
      opacity: 0;
    }
    &::after {
      opacity: 1;
    }
  }
`;
export const TokenAction = styled.div`
  & > div {
    &:nth-child(1) {
      & > p {
        font-size: 15px;
        justify-content: flex-end;
        &:nth-child(1) {
          font-family: DMMono-500;
          color: #eeeef0;
        }
        &:nth-child(2) {
          font-family: DMMono-400;
          color: #5e5e6b;
          margin-bottom: 0;
        }
      }
    }
  }
  &.light {
    & > div {
      &:nth-child(1) {
        & > p {
          &:nth-child(1) {
            color: #43424a !important;
          }
        }
      }
    }
  }
`;
export const ChooseTokenSearch = styled.div`
  position: relative;
  .ant-input-affix-wrapper {
    .ant-input-prefix {
      margin-inline-end: 10px;
    }
  }
  & > p {
    position: absolute;
    top: -10px;
    left: 15px;
    color: #6e6e7c;
    font-size: 16px;
    font-weight: 400;
    background: #1c1c1e;
    &::before {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      background: #232324;
      height: 5px;
      width: 100%;
    }
    span {
      position: relative;
    }
  }
  &.light {
    & > p {
      color: #6e6e7c;
      background: #fff;
      &::before {
        background: #fff;
      }
    }
  }
`;
export const FavoriteWrapper = styled.div`
  margin-bottom: 20px;
  border-bottom: 1px dashed #3a3a40;
  & > p {
    color: #d9d9de;
    font-size: 17px;
    margin-bottom: 5px;
    &:nth-child(2) {
      font-size: 14px;
      color: #6e6e7c;
    }
  }
  &.light {
    border-color: #d9d9de;
    & > p {
      color: #6e6e7c;
    }
  }
`;
export const LikeRemove = styled.div`
  position: absolute;
  top: -5px;
  right: -5px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 15px;
  height: 15px;
  border-radius: 5px;
  background: #942020;
  color: #f7f7f8;
  font-family: DMMono-500;
  font-size: 13px;
  transition: all 0.15s linear;
  opacity: 0;
`;
export const FavoriteToken = styled.ul`
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
  padding-bottom: 8px;
  & > li {
    position: relative;
    display: flex;
    gap: 5px;
    padding: 5px 8px;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    background: #43424a;
    color: #f7f7f8;
    font-size: 16px;
    cursor: pointer;
    &:hover {
      ${LikeRemove} {
        opacity: 1;
      }
    }
    figure {
      display: flex;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  &.light {
    & > li {
      background: #f3f4f8;
      color: #43424a;
    }
  }
`;
