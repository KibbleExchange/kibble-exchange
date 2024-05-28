import { ContextProviderWrapper } from "@kibble-exchange/uikit";
import { useContext } from "react";
import styled from "styled-components";

const TabsSelector = ({ data, callBack, active }: any) => {
  const { theme } = useContext(ContextProviderWrapper)!;
  return (
    <TabsContainer className={theme}>
      {data &&
        data.map((item: any) => {
          return (
            <TabsBtn
              className={theme}
              choose={active === item.value}
              key={item.value}
              onClick={() => {
                callBack && callBack(item);
              }}
              numberList={data?.lenght || 0}
            >
              {item.title}
              {item.label && <span>{`(${item.label})`}</span>}
            </TabsBtn>
          );
        })}
    </TabsContainer>
  );
};
export default TabsSelector;

export const TabsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  padding: 5px;
  background: var(--tabsBar, #141518);
  box-sizing: border-box;
  width: 100%;
  gap: 5px;
  border: 1px solid transparent;
  &.light {
    border-color: #D9D9DE;
    background-color: #fff;
  }
`;
const TabsBtn = styled.button<{ numberList?: any; choose?: boolean }>`
  width: ${({ numberList }) => (numberList ? 100 / numberList : 100)}%;
  box-sizing: border-box;
  background: ${({ choose }) =>
    choose ? "var(--tabsBtn, #43424A)" : "transparent"};
  border-radius: 6px;
  border: none;
  padding: 6px 12px;
  transition: all 0.15s linear;
  color: ${({ choose }) =>
    choose ? "var(--tabsTitleActive, #D9D9DE)" : "#5E5E6B"};
  font-size: 15px;
  font-weight: 400;
  line-height: 150%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-family: "Syne";
  gap: 6px;
  &.light {
    &:hover {
      background-color: #007af5 !important;
      color: #fff;
      /* span {
        background-color: #fff;
        color: #43424a;
      } */
    }
  }
  &:hover {
    background-color: #43424a;
    color: #D9D9DE;
  }
  span {
    border-radius: 6px;
    /* background: var(--Stake-noti);
    background: ${({ choose }) => (choose ? "#fff" : "#6E6E7C")}; */
    display: flex;
    aspect-ratio: 1;
    justify-content: center;
    align-items: center;
    height: fit-content;
    line-height: 100%;
    min-width: 18px;
    /* color: var(--Stake-Title);
    color: ${({ choose }) => (choose ? "#43424A" : "#fff")}; */
    font-family: DMmono-500;
    font-size: 12.5px;
    position: relative;
    top: 1px;
  }
  @media screen and (max-width: 767px) {
    font-size: 14px;
  }
`;
