import { useContext } from "react";
import {
  ClickMaxAmount,
  ContentCaontainer,
  ContentLeft,
  ContentRight,
  DetailButtonHeader,
  EarnBtnGroup,
  EarnBtnRights,
  EarnPrice,
  PollTitle,
  PoolAprBox,
  PoolAprGroups,
  RatesTabContainer,
  RationPriceBox,
  SwapContent,
  SwapDetailButton,
  SwapExchangeIcon,
  SwapInput,
  SwapInputTitle,
  TokentRates,
  ViewContract,
  VolumBox,
  VolumContainer,
} from "./styled";
import { Skeleton } from "antd";
import { ContextProviderWrapper } from "@kibble-exchange/uikit";

export const Loader = () => {
  const { theme } = useContext(ContextProviderWrapper)!;
  return (
    <>
      <SwapContent className={theme}>
        <SwapInput className={`exchange ${theme}`}>
          <SwapInputTitle>
            <p>
              <Skeleton.Input active size={"small"} />
            </p>
            <ClickMaxAmount>
              <Skeleton.Button active size={"small"} />
            </ClickMaxAmount>
          </SwapInputTitle>
          <Skeleton.Input active />
        </SwapInput>
        <SwapExchangeIcon className={theme}>
          <Skeleton.Avatar active />
        </SwapExchangeIcon>
        <SwapInput className={theme}>
          <SwapInputTitle>
            <p>
              <Skeleton.Input active size={"small"} />
            </p>
            <ClickMaxAmount>
              <Skeleton.Button active size={"small"} />
            </ClickMaxAmount>
          </SwapInputTitle>
          <Skeleton.Input active />
        </SwapInput>
        <SwapDetailButton className={theme}>
          <DetailButtonHeader>
            <Skeleton active paragraph={{ rows: 3 }} />
          </DetailButtonHeader>
        </SwapDetailButton>
      </SwapContent>
    </>
  );
};
export const LoaderLP = () => {
  const { theme } = useContext(ContextProviderWrapper)!;
  return (
    <>
      <ContentCaontainer>
        <ContentLeft className={theme}>
          <TokentRates>
            <RatesTabContainer className={theme}>
              <RationPriceBox>
                <Skeleton.Input active block={true} />
              </RationPriceBox>
              <ViewContract>
                <Skeleton.Input active block={true} />
              </ViewContract>
            </RatesTabContainer>
            <RatesTabContainer className={theme}>
              <RationPriceBox>
                <Skeleton.Input active block={true} />
              </RationPriceBox>
              <ViewContract>
                <Skeleton.Input active block={true} />
              </ViewContract>
            </RatesTabContainer>
            <VolumContainer>
              <VolumBox className={theme}>
                <Skeleton.Button active block={true} />
              </VolumBox>
              <VolumBox className={theme}>
                <Skeleton.Button active block={true} />
              </VolumBox>
            </VolumContainer>
          </TokentRates>
        </ContentLeft>
        <ContentRight className={theme}>
          <PollTitle></PollTitle>
          <PoolAprGroups>
            <PoolAprBox className={theme}>
              <Skeleton.Button active block={true} />
            </PoolAprBox>
            <PoolAprBox className={theme}>
              <Skeleton.Button active block={true} />
            </PoolAprBox>
            <PoolAprBox className={theme}>
              <Skeleton.Button active block={true} />
            </PoolAprBox>
          </PoolAprGroups>
          <RatesTabContainer className={theme}>
            <EarnPrice>
              <Skeleton.Input active block={true} />
            </EarnPrice>
            <EarnBtnGroup>
              <Skeleton.Input active block={true} />
              <EarnBtnRights></EarnBtnRights>
            </EarnBtnGroup>
          </RatesTabContainer>
          <PoolAprGroups>
            <PoolAprBox className={theme}>
              <Skeleton.Button active block={true} />
            </PoolAprBox>
            <PoolAprBox className={theme}>
              <Skeleton.Button active block={true} />
            </PoolAprBox>
            <PoolAprBox className={theme}>
              <Skeleton.Button active block={true} />
            </PoolAprBox>
          </PoolAprGroups>
        </ContentRight>
      </ContentCaontainer>
    </>
  );
};

export default { Loader, LoaderLP };
