import { useContext, useEffect, useState } from "react";
import Duration from "../Duration";
import {
  ActiveElmButtons,
  ActiveElmDuration,
  ActiveElmDurationBlock,
  ActiveElmInfomation,
  MyBtnGroup,
  MyStakeContainer,
  MyStakeContentBox,
  MyStakeContentScroll,
} from "./styled";
import { DataStakeList } from "./fakeData";
import ElmStakePage from "./Step1/ElmStakePage";
import DetailPage from "./Step1/DetailPakge";
import {
  ClickMaxAmount,
  SwapContent,
  SwapInput,
  SwapInputTitle,
  SwapInputValue,
  SwapInputWrapper,
} from "../../Swap/styled";
// @ts-ignore
import Slider from "react-slick";
import { useMediaQuery } from "react-responsive";
import {
  BlockStakingAmount,
  BlockStakingRewards,
  BlockStakingRewardsNumber,
  BlockStakingRewardsTitle,
  DurationHint,
} from "../NewStake/styled";
import { Controller, useForm } from "react-hook-form";
import { useTonAddress } from "@tonconnect/ui-react";
import { AddBtn, TradeBtn } from "../../Liquidity/Details/styled";
import { NoData } from "../Finished/styled";
import EmptyData from "../../../assets/gif/empty.gif";
import lightning from "../../../assets/Dashboard/Stake/lightning.png";
import lightning_light from "../../../assets/Dashboard/Stake/lightning_light.png";
import { ButtonCommon, ContextProviderWrapper, InputCommon } from "@kibble-exchange/uikit";

const MyStake = ({ setOpenConfirmModal, setDataModal }: any) => {
  const [activeElm, setActiveElm] = useState<any>(null);
  const [stakeState, setStakeState] = useState(false);
  const [isChangeDuration, setIsChangeDuration] = useState(false);
  const [DurationChange, setDurationChange] = useState<any>();
  const [oldDuration, setOldDuration] = useState(1);
  const isMobile = useMediaQuery({ maxWidth: 500 });
  const isMinIpad = useMediaQuery({ maxWidth: 768 });
  const address = useTonAddress();
  const { control } = useForm({ mode: "onChange" });
  const { theme } = useContext(ContextProviderWrapper)!;

  const handleNextStep = () => {
    if (activeElm.isClaimed) {
      setOpenConfirmModal(true);
      setDataModal(activeElm);
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
            <DurationHint className={theme}>
              <figure>
                <img
                  src={theme === "light" ? lightning_light : lightning}
                  alt="lightning"
                />
              </figure>
              <p>Stake more, earn more every day.</p>
            </DurationHint>
            <ActiveElmDuration className={theme}>
              <p>Duration</p>
              <ActiveElmDurationBlock className={theme}>
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
                <Duration
                  data={duration}
                  value={DurationChange}
                  callback={(item: any) => {
                    if (item.value >= oldDuration) {
                      setDurationChange(item.value);
                    }
                  }}
                  initial={oldDuration}
                />
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
                  {DataStakeList.map((page: any) => {
                    return (
                      <ElmStakePage
                        data={page}
                        callback={(item: any) => {
                          setActiveElm(item);
                        }}
                        handleClaim={(item: any) => {
                          setOpenConfirmModal(true);
                          setDataModal(item);
                        }}
                        setStakeState={setStakeState}
                      ></ElmStakePage>
                    );
                  })}
                </Slider>
              </div>
            ) : (
              DataStakeList.map((page: any) => {
                return (
                  <ElmStakePage
                    data={page}
                    callback={(item: any) => {
                      setActiveElm(item);
                    }}
                    handleClaim={(item: any) => {
                      setOpenConfirmModal(true);
                      setDataModal(item);
                    }}
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
          <DetailPage data={activeElm} action={handleNextStep} setOpenConfirmModal={setOpenConfirmModal} />
        ) : (
          <NoData>
            <img src={EmptyData} alt="No Data" />
            <p className="title-nodata">Choose a stake</p>
            <p className="text-nodata">Select one to see details.</p>
          </NoData>
        )}
      </MyStakeContentBox>
    </MyStakeContainer>
  );
};

export default MyStake;

const duration = [
  {
    title: "90 D",
    value: 1,
    text: "42.25% APY",
  },
  {
    title: "180 D",
    value: 2,
    text: "42.25% APY",
  },
  {
    title: "360 D",
    value: 3,
    text: "42.25% APY",
  },
  {
    title: "720 D",
    value: 4,
    text: "42.25% APY",
  },
];
