import { Controller, useForm } from "react-hook-form";
import EmptyData from "../../../assets/gif/empty.gif";
import {
  ClickMaxAmount,
  SwapContent,
  SwapInput,
  SwapInputTitle,
  SwapInputValue,
  SwapInputWrapper,
} from "../../Swap/styled";
import {
  ActiveElmButtons,
  ActiveElmDuration,
  ActiveElmDurationBlock,
  ActiveElmInfomation,
  MyBtnGroup,
  MyStakeContainer,
  MyStakeContentBox,
  MyStakeContentScroll,
} from "../MyStake/styled";
import {
  BlockStakingAmount,
  BlockStakingRewards,
  BlockStakingRewardsNumber,
  BlockStakingRewardsTitle,
  DurationHint,
} from "../NewStake/styled";
import { NoData } from "./styled";
// @ts-ignore
import Slider from "react-slick";
import { AddBtn, TradeBtn } from "../../Liquidity/Details/styled";
import ElmStakePage from "../MyStake/Step1/ElmStakePage";
import DetailPage from "../MyStake/Step1/DetailPakge";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useTonAddress } from "@tonconnect/ui-react";
import { DataStakeListFinished } from "../MyStake/fakeData";
import { ButtonCommon, InputCommon } from "@kibble-exchange/uikit";

const Finished = () => {
  const [activeElm, setActiveElm] = useState<any>(null);
  const [stakeState, setStakeState] = useState(false);
  const [isChangeDuration, setIsChangeDuration] = useState(false);
  const [DurationChange, setDurationChange] = useState<any>();
  const [oldDuration, setOldDuration] = useState(1);
  const isMobile = useMediaQuery({ maxWidth: 500 });
  const isMinIpad = useMediaQuery({ maxWidth: 768 });
  const address = useTonAddress();
  const { control } = useForm({ mode: "onChange" });

  const handleNextStep = () => {
    if (activeElm.isClaimed) {
      // setOpenConfirmModal(true);
      // setDataModal(activeElm);
    } else {
      setIsChangeDuration(true);
    }
  };
  const handleCancel = () => {
    setIsChangeDuration(false);
  };

  useEffect(() => {
    if (isChangeDuration) {
      setOldDuration(activeElm?.TimeLine);
      setDurationChange(activeElm?.TimeLine);
    }
  }, [isChangeDuration]);

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "10px",
    slidesToShow: 1,
    speed: 500,
    dots: true,
  };

  return (
    <MyStakeContainer activeElm={activeElm} ischange={isChangeDuration}>
      {stakeState && activeElm ? (
        <>
          <ActiveElmInfomation>
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
            {/* <DurationHint>
              <figure>
                <img src={lightning} alt="lightning" />
              </figure>
              <p>Stake more, earn more every day.</p>
            </DurationHint> */}
            <ActiveElmDuration>
              <p>Duration</p>
              <ActiveElmDurationBlock>
                <p>90 D</p>
                <p>42.25% APY</p>
              </ActiveElmDurationBlock>
            </ActiveElmDuration>
            <ActiveElmButtons>
              <ButtonCommon
                onClick={() => {
                  setStakeState(false);
                }}
                background="#43424A"
                color="#fff"
                width="30%"
              >
                <p>Cancel</p>
              </ButtonCommon>
              <ButtonCommon width="70%">
                <p>Stake</p>
              </ButtonCommon>
            </ActiveElmButtons>
          </ActiveElmInfomation>
        </>
      ) : (
        <>
          <MyStakeContentScroll>
            {isChangeDuration ? (
              <>
                {/* <Duration
                  data={duration}
                  value={DurationChange}
                  callback={(item: any) => {
                    if (item.value >= oldDuration) {
                      setDurationChange(item.value);
                    }
                  }}
                  initial={oldDuration}
                /> */}
                <BlockStakingAmount>
                  <SwapContent>
                    <SwapInput>
                      <SwapInputTitle>
                        <p>Amount</p>
                        <ClickMaxAmount>
                          {!isMobile && "Available: "} 23,129.12343 |{" "}
                          <span>MAX</span>
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
                                placeHolder={"0"}
                              />
                            </SwapInputValue>
                          )}
                        />
                      </SwapInputWrapper>
                    </SwapInput>
                  </SwapContent>
                </BlockStakingAmount>
                <BlockStakingRewards>
                  <BlockStakingRewardsTitle>
                    Staking rewards
                  </BlockStakingRewardsTitle>
                  <BlockStakingRewardsNumber>
                    0.00<span>KIB</span>
                  </BlockStakingRewardsNumber>
                </BlockStakingRewards>
                <MyBtnGroup>
                  <TradeBtn onClick={handleCancel}>
                    <p>Cancel</p>
                  </TradeBtn>
                  <AddBtn>
                    <p>Save changes</p>
                  </AddBtn>
                </MyBtnGroup>
              </>
            ) : isMinIpad ? (
              <div className="slider-container">
                <Slider {...settings}>
                  {DataStakeListFinished.map((page: any) => {
                    return (
                      <ElmStakePage
                        data={page}
                        callback={(item: any) => {
                          setActiveElm(item);
                        }}
                        // handleClaim={(item: any) => {
                        //   setOpenConfirmModal(true);
                        //   setDataModal(item);
                        // }}
                        setStakeState={setStakeState}
                      ></ElmStakePage>
                    );
                  })}
                </Slider>
              </div>
            ) : (
              DataStakeListFinished.map((page: any) => {
                return (
                  <ElmStakePage
                    data={page}
                    callback={(item: any) => {
                      setActiveElm(item);
                    }}
                    // handleClaim={(item: any) => {
                    //   setOpenConfirmModal(true);
                    //   setDataModal(item);
                    // }}
                    setStakeState={setStakeState}
                  ></ElmStakePage>
                );
              })
            )}
          </MyStakeContentScroll>
        </>
      )}
      <MyStakeContentBox ischange={isChangeDuration}>
        {activeElm ? (
          <DetailPage data={activeElm} action={handleNextStep} />
        ) : (
          <NoData>
            <img src={EmptyData} alt="No Data" />
            <p className="title-nodata">We didn’t find any finished stakes</p>
            <p className="text-nodata">
              After unstaking your positions will be displayed in this section
            </p>
          </NoData>
        )}
      </MyStakeContentBox>
    </MyStakeContainer>
  );
};

export default Finished;
