import {
  BlockCommingLeft,
  BlockCommingRight,
  BlockCommingSoon,
  BlockCommingTextBig,
  BlockCommingTextSmall,
  FarmContainer,
  RightTitle,
  RightTitleText,
} from "./styled";
import { useContext, useState } from "react";
import MyStake from "./MyStake";
import {
  ContentCaontainer,
  ContentLeft,
  ContentRight,
  LiquidityDetailsWrapper,
  TitleBox,
} from "../Liquidity/Details/styled";
import TabsSelector from "./TabsSelector";
import { Summary, KibTokent } from "./Summary";
import Stake from "./NewStake";
import Finished from "./Finished";
import ModalClaim from "./Finished/ModalClaim";
import Gift from "../../assets/gif/staking.gif";
import Comming from "../../assets/gif/comming.gif";
import { ContextProviderWrapper, KeyvisualCommon, ModalOverlay } from "@kibble-exchange/uikit";
import close from "../../assets/Dashboard/Common/close.svg";

const Farm = () => {
  const [leftSelected, setLeftSelected] = useState(1);
  const [rightSelected, setRightSelected] = useState(1);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [dataModal, setDataModal] = useState<any>();
  const { isMobile, theme }: any = useContext(ContextProviderWrapper);

  return (
    <FarmContainer>
      <LiquidityDetailsWrapper className={theme}>
        {!isMobile && (
          <TitleBox>
            <h1>your staking</h1>
            <p>High APR/APY rewards are awaiting you.</p>
          </TitleBox>
        )}
        {isMobile && (
          <KeyvisualCommon
            title="KIB Staking"
            description={"Earn rewards by providing liquidity"}
            image={isMobile ? Gift : <></>}
            buttonText="Stake now"
            buttonLink="#"
            buttonIcon={""}
          />
        )}
        <ContentCaontainer>
          {/* ---------Box-left---------------- */}
          <div className="content-left-main">
            <ContentLeft>
              <p className={`${theme} text-left`}>My summary</p>
              {/* <TabsSelector
                data={TabsListLeft}
                callBack={(item: any) => {
                  setLeftSelected(item.value);
                }}
                active={leftSelected}
              /> */}
              {leftSelected === 1 ? (
                <Summary/>
              ) : (
                <KibTokent/>
              )}
            </ContentLeft>
            {!isMobile && (
              <BlockCommingSoon className={theme}>
                <BlockCommingLeft>
                  <img src={Comming} alt="" />
                </BlockCommingLeft>
                <BlockCommingRight>
                  <BlockCommingTextBig className={theme}>
                    Waiting for our amazing staking feature.
                  </BlockCommingTextBig>
                  <BlockCommingTextSmall>Coming soon</BlockCommingTextSmall>
                </BlockCommingRight>
              </BlockCommingSoon>
            )}
          </div>

          {/* ---------Box-Right---------------- */}
          <ContentRight>
            <RightTitle>
              {!isMobile && (
                <RightTitleText className={theme}>EARN</RightTitleText>
              )}
              <div className="TabsBox" >
                {!isMobile && (
                  <TabsSelector
                    data={TabsListRight}
                    disabled
                    // callBack={(item: any) => {
                    //   setRightSelected(item.value);
                    // }}
                    active={rightSelected}
                  />
                )}
              </div>
            </RightTitle>
            {rightSelected === 1 && <Stake />}
            {rightSelected === 2 && (
              <MyStake
                setOpenConfirmModal={setOpenConfirmModal}
                setDataModal={setDataModal}
              />
            )}
            {rightSelected === 3 && <Finished />}
          </ContentRight>
          {isMobile && (
            <BlockCommingSoon className={theme}>
              <BlockCommingLeft>
                <img src={Comming} alt="" />
              </BlockCommingLeft>
              <BlockCommingRight>
                <BlockCommingTextBig className={theme}>
                  Waiting for our amazing staking feature.
                </BlockCommingTextBig>
                <BlockCommingTextSmall>Coming soon</BlockCommingTextSmall>
              </BlockCommingRight>
            </BlockCommingSoon>
          )}
          {isMobile && (
            <TabsSelector
              data={TabsListRight}
              // callBack={(item: any) => {
              //   setRightSelected(item.value);
              // }}
              active={rightSelected}
            />
          )}
        </ContentCaontainer>
      </LiquidityDetailsWrapper>
      <ModalOverlay
        component={<ModalClaim />}
        onClickParent={() => {
          setOpenConfirmModal(false);
        }}
        open={openConfirmModal}
        setOpen={setOpenConfirmModal}
        title={"claim rewards"}
        width="500px"
        closeIcon={close}
      />
    </FarmContainer>
  );
};

export default Farm;

const TabsListLeft = [
  {
    title: "My summary",
    value: 1,
  },
  // {
  //   title: "KIB Token",
  //   value: 2,
  // },
];
const TabsListRight = [
  {
    title: "New stake",
    value: 1,
  },
  {
    title: "My stakes",
    value: 2,
  },
  {
    title: "Finished",
    value: 3,
  },
];
