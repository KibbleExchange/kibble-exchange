import { useContext, useState } from "react";
import {
  AmountItem,
  AmountList,
  AmountTitle,
  BlockAmount,
  BlockStakingAmount,
  BlockSummary,
  BlockTitle,
  ButtonListDuration,
  ContentDuration,
  ContentInnerLeft,
  ContentInnerRight,
  ContentRightInner,
  DurationHint,
} from "./styled";
import Duration from "../Duration";
import {
  ClickMaxAmount,
  SwapContent,
  SwapInput,
  SwapInputTitle,
  SwapInputValue,
  SwapInputWrapper,
} from "../../Swap/styled";
import { useMediaQuery } from "react-responsive";
import { useTonAddress } from "@tonconnect/ui-react";
import { Controller, useForm } from "react-hook-form";
import wallet_icon from "../../../assets/Staking/icn_wallet.svg";
import TitleCommon from "../../../components/Common/Title";
import lightning from "../../../assets/Dashboard/Stake/lightning.png";
import lightning_light from "../../../assets/Dashboard/Stake/lightning_light.png";
import { ButtonCommon, ContextProviderWrapper, InputCommon } from "@kibble-exchange/uikit";

const Stake = () => {
  // const [switchActive, setSwichActive] = useState(false);
  // const [showMore, setShowMore] = useState(true);
  const {theme} = useContext(ContextProviderWrapper)!
  const [activeDuration, setActiveDuration] = useState(1);
  const isMobile = useMediaQuery({ maxWidth: 500 });
  const address = useTonAddress();
  const { control } = useForm({ mode: "onChange" });

  // const handleSwitch = () => {
  //   setSwichActive(!switchActive);
  // };
  // const handleShowMore = () => {
  //   setShowMore(!showMore);
  // };
  return (
    <>
      <ContentRightInner>
        <ContentDuration>
          <ContentInnerLeft>
            <BlockStakingAmount>
              <SwapContent>
                <SwapInput>
                  <SwapInputTitle>
                    <p>Amount</p>
                    <ClickMaxAmount>
                      {!isMobile && "Available: "} 0.00 | <span>MAX</span>
                    </ClickMaxAmount>
                  </SwapInputTitle>
                  <SwapInputWrapper
                    style={{
                      cursor: address ? "pointer" : "not-allowed",
                    }}
                    active={1 > 0}
                  >
                    <Controller
                      name="fromAmount"
                      control={control}
                      render={({ field }: any) => (
                        <SwapInputValue>
                          <InputCommon
                            {...field}
                            disabled={address ? false : true}
                            // onChange={handleSendValue}
                            // onFocus={handleResetValueFrom}
                            placeHolder={"0"}
                          />
                        </SwapInputValue>
                      )}
                    />
                    {/* ---------- */}
                  </SwapInputWrapper>
                </SwapInput>
              </SwapContent>
            </BlockStakingAmount>
            <ButtonListDuration>
              <Duration
                data={duration}
                value={activeDuration}
                callback={(item: any) => {
                  setActiveDuration(item.value);
                }}
              />
            </ButtonListDuration>
            <DurationHint className={theme}>
              <figure>
                <img src={theme === "light" ? lightning_light : lightning} alt="lightning" />
              </figure>
              <p>
                You cannot unstake before the time you selected when staking.
              </p>
            </DurationHint>
            <ButtonCommon disabled>
              <p>Stake</p>
              <img
                width={17}
                height={17}
                style={{
                  marginLeft: "8px",
                }}
                src={wallet_icon}
                alt="wallet"
              />
            </ButtonCommon>
          </ContentInnerLeft>
          <ContentInnerRight>
            <BlockAmount>
              <TitleCommon text="Pool details" />
              <AmountList>
                {DataDurationList.map((item: any, index: number) => {
                  return (
                    activeDuration === item.id && (
                      <>
                        <AmountItem key={index}>
                          <span>{item.duration.title}</span>
                          <span>{item.duration.value}</span>
                        </AmountItem>
                        <AmountItem key={index}>
                          <span>{item.apy.title}</span>
                          <span>{item.apy.value}</span>
                        </AmountItem>
                        <AmountItem key={index}>
                          <span>{item.staked.title}</span>
                          <span>{item.staked.value}</span>
                        </AmountItem>
                        <AmountItem key={index}>
                          <span>{item.stakers.title}</span>
                          <span>{item.stakers.value}</span>
                        </AmountItem>
                        <AmountItem key={index}>
                          <span>{item.exchange.title}</span>
                          <span>{item.exchange.value}</span>
                        </AmountItem>
                        <AmountItem key={index}>
                          <span>{item.poolAddress.title}</span>
                          <span>{item.poolAddress.value}</span>
                        </AmountItem>
                      </>
                    )
                  );
                })}
              </AmountList>
            </BlockAmount>
            <BlockSummary>
              <BlockTitle>
                <AmountTitle>Summary</AmountTitle>
              </BlockTitle>
              <AmountList>
                {DataDurationList.map((item: any, index: number) => {
                  return (
                    activeDuration === item.id && (
                      <>
                        <AmountItem key={index}>
                          <span>{item.stakeDay.title}</span>
                          <span>{item.stakeDay.value}</span>
                        </AmountItem>
                        <AmountItem key={index}>
                          <span>{item.interestEndDay.title}</span>
                          <span>{item.interestEndDay.value}</span>
                        </AmountItem>
                        <AmountItem key={index}>
                          <span>{item.redemptionPeriod.title}</span>
                          <span>{item.redemptionPeriod.value}</span>
                        </AmountItem>
                      </>
                    )
                  );
                })}
              </AmountList>
            </BlockSummary>
          </ContentInnerRight>
        </ContentDuration>
      </ContentRightInner>
    </>
  );
};

const duration = [
  {
    title: "30 D",
    value: 1,
    text: "5.0% APY",
  },
  {
    title: "60 D",
    value: 2,
    text: "10.0% APY",
  },
  {
    title: "90 D",
    value: 3,
    text: "16.0% APY",
  },
  {
    title: "180 D",
    value: 4,
    text: "35.0% APY",
  },
];

const DataDurationList = [
  {
    id: 1,
    duration: {
      title: "Duration",
      value: "30 days",
    },
    apy: {
      title: "APY",
      value: "5.0%",
    },
    staked: {
      title: "Total staked",
      value: "--- TON",
    },
    stakers: {
      title: "Stakers",
      value: "--- TON",
    },
    exchange: {
      title: "Exchange rate",
      value: "TBA",
    },
    poolAddress: {
      title: "Pool address",
      value: "TBA",
    },
    stakeDay: {
      title: "Stake day",
      value: "---",
    },
    interestEndDay: {
      title: "Interest end day",
      value: "---",
    },
    redemptionPeriod: {
      title: "Redemption period",
      value: "30 days",
    },
  },
  {
    id: 2,
    duration: {
      title: "Duration",
      value: "60 days",
    },
    apy: {
      title: "APY",
      value: "10.0%",
    },
    staked: {
      title: "Total staked",
      value: "--- TON",
    },
    stakers: {
      title: "Stakers",
      value: "--- TON",
    },
    exchange: {
      title: "Exchange rate",
      value: "TBA",
    },
    poolAddress: {
      title: "Pool address",
      value: "TBA",
    },
    stakeDay: {
      title: "Stake day",
      value: "---",
    },
    interestEndDay: {
      title: "Interest end day",
      value: "---",
    },
    redemptionPeriod: {
      title: "Redemption period",
      value: "60 days",
    },
  },
  {
    id: 3,
    duration: {
      title: "Duration",
      value: "90 days",
    },
    apy: {
      title: "APY",
      value: "16.0%",
    },
    staked: {
      title: "Total staked",
      value: "--- TON",
    },
    stakers: {
      title: "Stakers",
      value: "--- TON",
    },
    exchange: {
      title: "Exchange rate",
      value: "TBA",
    },
    poolAddress: {
      title: "Pool address",
      value: "TBA",
    },
    stakeDay: {
      title: "Stake day",
      value: "---",
    },
    interestEndDay: {
      title: "Interest end day",
      value: "---",
    },
    redemptionPeriod: {
      title: "Redemption period",
      value: "90 days",
    },
  },
  {
    id: 4,
    duration: {
      title: "Duration",
      value: "180 days",
    },
    apy: {
      title: "APY",
      value: "35.0%",
    },
    staked: {
      title: "Total staked",
      value: "--- TON",
    },
    stakers: {
      title: "Stakers",
      value: "--- TON",
    },
    exchange: {
      title: "Exchange rate",
      value: "TBA",
    },
    poolAddress: {
      title: "Pool address",
      value: "TBA",
    },
    stakeDay: {
      title: "Stake day",
      value: "---",
    },
    interestEndDay: {
      title: "Interest end day",
      value: "---",
    },
    redemptionPeriod: {
      title: "Redemption period",
      value: "180 days",
    },
  },
];

export default Stake;
