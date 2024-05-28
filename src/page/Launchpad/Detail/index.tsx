import { useContext, useEffect, useRef, useState } from "react";
import { ExplorePoolHeader, TabSelect } from "../../Liquidity/styled";
import default_token_image from "../../../assets/Dashboard/Common/default-token-image.png";
import fair_kibble from "../../../assets/Dashboard/Launchpad/FAIR/kibble.png";

import {
  BlockImage,
  BlockLeft,
  BlockLeftAboutProject,
  BlockLeftAboutToken,
  BlockLeftAboutTokenCard,
  BlockLeftAboutTokenCardContent,
  BlockListSocial,
  BlockRight,
  BlockRightBox,
  BlockRightCard,
  BlockRightReward,
  BlockRightRow,
  BlockRightStatus,
  BlockRow,
  BlockSteps,
  BlockStepsTitle,
  BlockStepsTitleItem,
  BlockTable,
  BlockTableBox,
  BlockTableRow,
  BlockTableRowClaim,
  BlockTableRowClaimImage,
  BlockTableRowItemRight,
  BlockText,
  BlockTitle,
  DetailContainer,
  RowDetail,
} from "./styled";
import arrow from "../../../assets/Dashboard/Common/arrow_gray.svg";
import {
  FairBox,
  FairEndIn,
  FairHeader,
  FairProgress,
  FairProgressBar,
  FairProgressHeader,
  FairProgressPercent,
  FairStatus,
  FairTags,
  FairTime,
} from "../FAIR/styled";
import {
  RoutesBottom,
  SwapChoose,
  SwapChooseDefault,
  SwapInputValue,
  SwapInputWrapper,
} from "../../Swap/styled";
import { TextResult } from "../../Swap/ChooseToken/styled";
import { Controller, useForm } from "react-hook-form";
import { useTonAddress } from "@tonconnect/ui-react";
import { useDebounce } from "../../../hooks/useDebounce";
import { Coins } from "ton3-core";
import { SwapAction } from "../../Swap";
import { useSimulateSwap } from "../../../hooks/useSimulateSwap";
import { useGetAssetsQuery } from "../../../store/api/dexApiSlice";
import ChooseToken from "../../Swap/ChooseToken";
import { useLocation, useNavigate } from "react-router-dom";
import TabsSelector from "../../Farm/TabsSelector";
import { BackToButton } from "../../Liquidity/Details/styled";
import { BackButton, ButtonCommon, ContextProviderWrapper, InputCommon, ModalOverlay, fieldNormalizer } from "@kibble-exchange/uikit";
import close from "../../../assets/Dashboard/Common/close.svg";

const CONTENT_ROADMAP = [
  {
    title: "Phase 1",
    content:
      "Build website,Build community,Platform development,Onboarding partners",
  },
  {
    title: "Phase 2",
    content:
      "Launch of Kibble AMM, Launch of Kibble DEX platform,Launch of Liquidity Pool,Launch of Staking & Farming,Seed round and ICO",
  },
  {
    title: "Phase 3",
    content:
      "Release DEX aggregation router,Launch of Kibble Launchpad,    Launch of DEX on Mini App,    Add trading pairs in DEX,    Listing $KIB token,    Kibble bridge",
  },
  {
    title: "Phase 4",
    content:
      "Launch of Lending and Borrowing,Release trading bot, DAO Governance,Release margin trading",
  },
];

const STEPS = [
  {
    title: "Waiting for pool start",
    description: "No one can purchase",
  },
  {
    title: "Pool Start",
    description: "TBA (UTC)",
  },
  {
    title: "Pool Ended",
    description: "TBA (UTC)",
  },
  {
    title: "Claim tokens",
    description: "TBA (UTC)",
  },
];

const STEPS_CLAIM = [
  {
    title: "Upcoming",
    description: "No one can purchase",
  },
  {
    title: "Invest",
    description: "Start investing",
  },
  {
    title: "Claim rewards",
    description: "Claim rewards when IDO ended",
  },
];

const TABS = [
  {
    label: "Introduce",
    value: 1,
  },
  {
    label: "About",
    value: 2,
  },
  {
    label: "Token info",
    value: 3,
  },
  {
    label: "Your invest",
    value: 4,
  },
];

const LIST_SOCIAL = [
  {
    image: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="17"
        viewBox="0 0 16 17"
        fill="none"
      >
        <path
          d="M0.847144 6.51774C0.488742 6.60207 0.266562 6.96097 0.350892 7.31937C0.435222 7.67778 0.794128 7.89996 1.15253 7.81563L0.847144 6.51774ZM5.33317 8.83334L5.96563 9.04416L5.33317 8.83334ZM4.73689 14.8685C4.57223 15.1978 4.70571 15.5983 5.03503 15.763C5.36435 15.9276 5.7648 15.7941 5.92946 15.4648L4.73689 14.8685ZM3.18855 2.51588C2.82913 2.59575 2.60251 2.95187 2.68238 3.31129C2.76225 3.67071 3.11837 3.89733 3.47779 3.81746L3.18855 2.51588ZM7.99984 3.83334L7.58337 4.35392L7.99984 3.83334ZM14.3306 5.07884C14.6503 4.89617 14.7613 4.48893 14.5787 4.16925C14.396 3.84957 13.9888 3.73851 13.6691 3.92118L14.3306 5.07884ZM9.55129 8.69936L9.45701 8.0394L9.55129 8.69936ZM11.9998 9.83335L12.6188 10.0809L11.9998 9.83335ZM8.21795 11.366L7.60519 11.6286L8.21795 11.366ZM14.6665 8.50001C14.6665 12.1819 11.6817 15.1667 7.99984 15.1667V16.5C12.4181 16.5 15.9998 12.9183 15.9998 8.50001H14.6665ZM7.99984 15.1667C4.31794 15.1667 1.33317 12.1819 1.33317 8.50001H-0.00016278C-0.00016278 12.9183 3.58156 16.5 7.99984 16.5V15.1667ZM1.33317 8.50001C1.33317 4.81811 4.31794 1.83334 7.99984 1.83334V0.500005C3.58156 0.500005 -0.00016278 4.08173 -0.00016278 8.50001H1.33317ZM7.99984 1.83334C11.6817 1.83334 14.6665 4.81811 14.6665 8.50001H15.9998C15.9998 4.08173 12.4181 0.500005 7.99984 0.500005V1.83334ZM1.15253 7.81563C2.07712 7.59808 3.24906 7.44262 4.05558 7.58926C4.46113 7.66299 4.6474 7.79036 4.72046 7.89059C4.77006 7.95865 4.86068 8.14262 4.70072 8.62252L5.96563 9.04416C6.20566 8.32405 6.19072 7.64414 5.79797 7.10526C5.42866 6.59855 4.83577 6.37592 4.29409 6.27743C3.20617 6.07963 1.81144 6.29084 0.847144 6.51774L1.15253 7.81563ZM4.70072 8.62252C4.45165 9.36971 4.27784 9.91123 4.17237 10.3165C4.06925 10.7127 4.01064 11.0508 4.04558 11.3653C4.08393 11.7104 4.22693 11.9528 4.34886 12.1444C4.46977 12.3344 4.58988 12.5041 4.73689 12.7981L5.92946 12.2019C5.74312 11.8292 5.57157 11.5823 5.47374 11.4285C5.37692 11.2764 5.37408 11.2479 5.37076 11.218C5.36403 11.1575 5.36792 11.0165 5.46272 10.6523C5.55516 10.2971 5.71469 9.79697 5.96563 9.04416L4.70072 8.62252ZM4.73689 12.7981C5.14325 13.6109 4.90425 14.5338 4.73689 14.8685L5.92946 15.4648C6.20653 14.9107 6.58976 13.5225 5.92946 12.2019L4.73689 12.7981ZM3.47779 3.81746C3.9219 3.71877 4.69068 3.62554 5.49506 3.68172C6.31129 3.73873 7.06967 3.94296 7.58337 4.35392L8.4163 3.31276C7.59667 2.65705 6.52172 2.41684 5.58795 2.35163C4.64233 2.28558 3.74444 2.39235 3.18855 2.51588L3.47779 3.81746ZM7.58337 4.35392C7.93476 4.63503 8.17896 4.94786 8.47075 5.30021C8.74197 5.62772 9.08631 6.0324 9.59097 6.26989C10.1257 6.52153 10.7419 6.54655 11.4933 6.35418C12.2301 6.16557 13.145 5.75634 14.3306 5.07884L13.6691 3.92118C12.5214 4.57701 11.7279 4.91779 11.1626 5.0625C10.612 5.20347 10.3323 5.14516 10.1587 5.06346C9.95504 4.96762 9.77854 4.78896 9.49767 4.4498C9.23738 4.13548 8.89825 3.69832 8.4163 3.31276L7.58337 4.35392ZM9.64557 9.35933C10.2424 9.27407 10.7061 9.20253 11.079 9.16483C11.4739 9.12492 11.6511 9.13818 11.7153 9.15675C11.7303 9.16109 11.6792 9.14932 11.6254 9.08606C11.5996 9.05572 11.5825 9.02402 11.5724 8.99682C11.5628 8.97107 11.5618 8.95554 11.5619 8.95672C11.5652 8.99986 11.5459 9.1731 11.3809 9.58576L12.6188 10.0809C12.7871 9.66026 12.9201 9.23341 12.8914 8.8556C12.8753 8.64383 12.8066 8.41688 12.6412 8.22241C12.4789 8.03146 12.2727 7.93002 12.0858 7.87595C11.7462 7.77769 11.3321 7.79913 10.945 7.83826C10.5359 7.87961 10.0268 7.95799 9.45701 8.0394L9.64557 9.35933ZM8.83072 11.1034C8.69714 10.7917 8.61426 10.3516 8.70416 10.0113C8.74499 9.85687 8.81872 9.72998 8.93908 9.62819C9.06215 9.52411 9.27447 9.41234 9.64557 9.35933L9.45701 8.0394C8.89478 8.11971 8.4321 8.31073 8.07808 8.61012C7.72136 8.9118 7.51593 9.28907 7.41508 9.67071C7.22165 10.4027 7.40543 11.1625 7.60519 11.6286L8.83072 11.1034ZM11.3809 9.58576C11.2381 9.94268 11.0237 10.3927 10.7657 10.8167C10.5029 11.2487 10.2202 11.6116 9.95255 11.8324C9.67844 12.0585 9.5459 12.0411 9.49537 12.0243C9.40406 11.9938 9.14189 11.8295 8.83072 11.1034L7.60519 11.6286C7.96069 12.4581 8.42721 13.0734 9.07329 13.289C9.76014 13.5183 10.3737 13.2134 10.801 12.8609C11.2348 12.5031 11.6088 11.9962 11.9048 11.5097C12.2057 11.0151 12.4521 10.4977 12.6188 10.0809L11.3809 9.58576Z"
          fill="#D9D9DE"
        />
      </svg>
    ),
    link: "https://kibble.exchange/",
    name: "🌐 Website",
  },
  {
    image: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="15"
        viewBox="0 0 14 15"
        fill="none"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12.0028 0.884858C12.4595 0.752007 12.9541 0.880161 13.2895 1.22168C13.6248 1.56253 13.7488 2.05971 13.6122 2.51999L12.7795 5.32125C12.7001 5.58762 12.4228 5.73859 12.1574 5.65942C11.8928 5.57957 11.7421 5.29911 11.8214 5.03341L12.6541 2.23148C12.7008 2.07447 12.6175 1.96846 12.5795 1.93021C12.5415 1.8913 12.4348 1.80676 12.2808 1.85171L1.55308 4.97101C1.3824 5.02066 1.34507 5.16358 1.33707 5.22262C1.32974 5.28166 1.32707 5.42928 1.47907 5.52321L3.73649 6.9121C3.97183 7.05703 4.0465 7.36701 3.90183 7.60453C3.80782 7.75885 3.64382 7.84473 3.47514 7.84473C3.38647 7.84473 3.29647 7.82125 3.21514 7.77093L0.957723 6.38137C0.510375 6.10627 0.2757 5.61111 0.345702 5.08843C0.415705 4.56508 0.772384 4.14975 1.27573 4.00348L12.0028 0.884858ZM11.0185 7.73275C11.0985 7.4657 11.3765 7.31407 11.6412 7.39458C11.9059 7.47443 12.0565 7.75489 11.9772 8.02126L10.4291 13.2306C10.2791 13.7345 9.86445 14.0888 9.34644 14.1552C9.28843 14.1632 9.2311 14.1666 9.17376 14.1666C8.72175 14.1666 8.3084 13.9344 8.06772 13.5359L5.3343 9.00958C5.21496 8.81098 5.24496 8.55601 5.4083 8.3923L9.2891 4.48664C9.48444 4.29005 9.80045 4.29005 9.99579 4.48664C10.1911 4.68323 10.1911 5.00193 9.99579 5.19853L6.393 8.82507L8.92242 13.0132C9.01442 13.1655 9.1591 13.1642 9.2191 13.1575C9.27777 13.1494 9.41977 13.1132 9.47044 12.9428L11.0185 7.73275Z"
          fill="#D9D9DE"
        />
      </svg>
    ),
    link: "https://t.me/KibbleAnnouncement",
    name: "📱 Telegram Channel",
  },
  {
    image: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="15"
        viewBox="0 0 16 15"
        fill="none"
      >
        <g clip-path="url(#clip0_312_26305)">
          <path
            d="M12.5944 0.5H15.0361L9.70281 6.63655L16 14.9578H11.0522L7.19679 9.91366L2.76305 14.9578H0.321285L6.04016 8.40361L0 0.5H5.07631L8.57831 5.12651L12.5944 0.5ZM11.7269 13.4799H13.0763L4.33735 1.88153H2.85944L11.7269 13.4799Z"
            fill="#D9D9DE"
          />
        </g>
        <defs>
          <clipPath id="clip0_312_26305">
            <rect
              width="16"
              height="14.4578"
              fill="white"
              transform="translate(0 0.5)"
            />
          </clipPath>
        </defs>
      </svg>
    ),
    link: "https://twitter.com/KibbleExchange",
    name: "❌ Twitter",
  },
];

const INPUT_DEBOUNCE = 200;

const TON_ADDRESS: any = process.env.REACT_APP_TON_ADDRESS;
const KIBBLE_ADDRESS: any = process.env.REACT_APP_KIBBLE_ADDRESS;

const IDODetail = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [fromAssetKey, setFromAssetKey] = useState<any>(TON_ADDRESS);
  const [toAssetKey, setToAssetKey] = useState<any>(KIBBLE_ADDRESS);

  const [fromAmount, setFromAmount] = useState(0);
  const [toAmount, setToAmount] = useState(0);
  const [slippageTolerance, setSlippageTolerance] = useState(0.5);
  const [isInReward, setIsInReward] = useState(false);
  const [listFavorite, setListFavorite] = useState<any>([]);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsInReward(location.search.search("ido") !== -1);
  }, []);

  const address: any = useTonAddress();

  const [openFromModal, setOpenFromModal] = useState(false);

  const handleSendValue = (e: any) => {
    fieldNormalizer(
      "fromAmount",
      e.target.value || "0",
      setValue,
      fromAsset?.decimals
    );
    debouncedUpdateFromAmount(parseFloat(e.target.value));
  };

  const handelRouteTo = (link: any) => {
    window.open(`${link}`, "_blank");
  };

  const { data: assets } = useGetAssetsQuery(
    address ? address?.toString() : undefined
  );

  const { setValue, control } = useForm({ mode: "onChange" });

  const { isMobile, theme } = useContext(ContextProviderWrapper)!;

  const fromAsset = assets && assets[fromAssetKey];
  const toAsset = assets && assets[toAssetKey];

  const [swapAction, setSwapAction] = useState<SwapAction>("offer");

  const fromAmountNano =
    fromAsset && fromAmount
      ? new Coins(fromAmount.toFixed(fromAsset?.decimals), {
          decimals: fromAsset?.decimals,
        }).toNano()
      : "0";

  const toAmountNano =
    toAsset && toAmount
      ? new Coins(toAmount.toFixed(toAsset?.decimals), {
          decimals: toAsset?.decimals,
        }).toNano()
      : "0";

  const simulateState = useSimulateSwap({
    swapAction: swapAction,
    offerAddress: fromAsset?.contract_address,
    askAddress: toAsset?.contract_address,
    fromUnits: fromAmountNano,
    toUnits: toAmountNano,
    slippageTolerance: slippageTolerance,
  });

  const updateFromAmount = (amount: number) => {
    if (typeof amount !== "number" || amount <= 0 || Number.isNaN(amount)) {
      amount = 0;
      setToAmount(0);
    }
    setSwapAction("offer");
    setFromAmount(amount);
  };

  const updateToAmount = (amount: number) => {
    if (typeof amount !== "number" || amount <= 0 || Number.isNaN(amount)) {
      amount = 0;
      setFromAmount(0);
    }
    setSwapAction("ask");
    setToAmount(amount);
  };

  const debouncedUpdateFromAmount = useDebounce(
    updateFromAmount,
    INPUT_DEBOUNCE
  );

  useEffect(() => {
    if (!toAsset || !fromAsset) {
      return;
    }
    if (swapAction === "offer") {
      setToAmount(
        parseFloat(
          Coins.fromNano(simulateState?.askUnits, toAsset?.decimals).toString()
        )
      );
    } else {
      setFromAmount(
        parseFloat(
          Coins.fromNano(
            simulateState?.offerUnits,
            fromAsset?.decimals
          ).toString()
        )
      );
    }
  }, [simulateState]);

  useEffect(() => {
    setValue(
      "toAmount",
      new Coins(toAmount, { decimals: toAsset?.decimals }).toString()
    );
  }, [toAmount]);

  useEffect(() => {
    setValue(
      "fromAmount",
      new Coins(fromAmount, { decimals: fromAsset?.decimals }).toString()
    );
  }, [fromAmount]);

  const swapFromTo = () => {
    setFromAssetKey(toAssetKey);
    setToAssetKey(fromAssetKey);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
    setSwapAction((prev: any) => (prev === "offer" ? "ask" : "offer"));
  };

  useEffect(() => {
    if (simulateState.priceImpact > 30 && !showDetail) {
      setShowDetail(true);
    }
  }, [simulateState.priceImpact]);

  const [showDetail, setShowDetail] = useState(false);

  const handleResetValueFrom = (e: any) => {
    let { value } = e.target;
    if (value === 0 || value === "0") {
      fieldNormalizer("fromAmount", "", setValue, fromAsset?.decimals);
      debouncedUpdateFromAmount(parseFloat(e.target.value));
    }
  };

  const handleSelectTab = (value: number) => {
    const elm = document.getElementById("tab-mobile");
    elm?.scrollTo({
      left: value < activeTab ? -200 : 200,
      behavior: "smooth",
    });
    setActiveTab(value);
  };

  return (
    <DetailContainer>
      <BackButton text="Back to IDO" icon={arrow}/>
      <ModalOverlay
        component={
          <ChooseToken
            isFromModal={true}
            otherCurrentAssetKey={toAssetKey}
            setCurrentAsset={setFromAssetKey}
            setOtherCurrentAsset={setToAssetKey}
            setOpenFromModal={setOpenFromModal}
            // set Amount
            setAmountFrom={setFromAmount}
            setAmountTo={setToAmount}
            setListFavorite={setListFavorite}
            listFavorite={listFavorite}
            // setCheckingToken={<></>}
          />
        }
        open={openFromModal}
        setOpen={setOpenFromModal}
        title={"Select a token"}
        width="400px"
        closeIcon={close}
      />
      {isMobile && (
        <ExplorePoolHeader>
          <TabSelect
            className={theme}
            style={{
              overflowX: "scroll",
              width: "100%",
              scrollbarColor: "transparent transparent",
              scrollbarWidth: "none",
              justifyContent: "flex-start",
              paddingBottom: "5px",
            }}
            active={activeTab}
            id="tab-mobile"
          >
            {TABS.map((item: any, index: number) => {
              return (
                <button
                  key={index}
                  onClick={() => {
                    handleSelectTab(item.value);
                  }}
                >
                  {item.label}
                </button>
              );
            })}
          </TabSelect>
        </ExplorePoolHeader>
      )}
      <RowDetail>
        <BlockLeft>
          {!isMobile || (isMobile && activeTab === 1) ? (
            !isInReward || (isMobile && activeTab === 1) ? (
              <>
                <BlockTitle>
                  <BlockText>
                    {isMobile ? (
                      <BlockRow
                        style={{
                          alignItems: "center",
                          gap: "10px",
                          justifyContent: "unset",
                        }}
                      >
                        <h1>Kibble FairLaunch</h1>
                        <FairStatus>
                          <div
                            style={{
                              marginBottom: "5px",
                            }}
                          >
                            <p
                              style={{
                                marginTop: "2px",
                              }}
                            >
                              Sale live
                            </p>
                          </div>
                        </FairStatus>
                      </BlockRow>
                    ) : (
                      <h1>Kibble FairLaunch</h1>
                    )}
                    <p>
                      Kibble - your premier DeFi Hub on TON, provides all you
                      need for the best trading experience and optimal advances
                      on TON Blockchain
                    </p>
                    <BlockRow>
                      {isMobile && (
                        <ButtonCommon
                          className={theme}
                          style={{
                            background:
                              theme === "light" ? "#5d5c63" : "#43424A",
                            width: "max-content",
                            boxShadow: "unset",
                            padding: "7px 10px",
                          }}
                          onClick={() => {
                            navigate(-1);
                          }}
                        >
                          <span
                            style={{
                              paddingRight: "10px",
                              color: theme === "light" ? "#fff" : "#fff",
                            }}
                          >
                            {" "}
                            Invest now
                          </span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="10"
                            viewBox="0 0 12 10"
                            fill="none"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M11.5229 5.54918C11.7918 5.515 12 5.28199 12 4.99993C12 4.69436 11.7556 4.44636 11.4545 4.44636L1.86618 4.44636L5.33018 0.945591L5.37918 0.889051C5.54253 0.672564 5.5263 0.361391 5.33164 0.162476C5.11927 -0.0537853 4.77382 -0.0545225 4.56073 0.161L0.160727 4.608L0.112205 4.66369C0.0383838 4.76107 0 4.87999 0 4.99993C0 5.07152 0.0138182 5.14312 0.0414545 5.21102C0.125818 5.41843 0.324364 5.5535 0.545455 5.5535L11.4545 5.5535L11.5229 5.54918ZM5.33171 9.83716C5.54407 9.62016 5.54407 9.26957 5.33025 9.05404L2.90335 6.60137L2.84732 6.55182C2.63299 6.38673 2.3271 6.40393 2.13244 6.60284C2.02625 6.71134 1.97316 6.85232 1.97316 6.99329C1.97316 7.13574 2.02625 7.27746 2.13389 7.38596L4.56007 9.83864L4.61612 9.88801C4.83054 10.0525 5.13704 10.0354 5.33171 9.83716Z"
                              fill="#F7F7F8"
                            />
                          </svg>
                        </ButtonCommon>
                      )}
                      <BlockListSocial>
                        {LIST_SOCIAL.map((item: any, index: number) => {
                          return (
                            <ButtonCommon
                              key={index}
                              style={{
                                background:
                                  theme === "light" ? "#5d5c63" : "#3A3A40",
                                padding: "8px 0",
                                width: "40px",
                              }}
                              onClick={() => {
                                handelRouteTo(item.link);
                              }}
                            >
                              {item.image}
                            </ButtonCommon>
                          );
                        })}
                      </BlockListSocial>
                    </BlockRow>
                  </BlockText>
                  <BlockImage
                    bgImg={isInReward ? "/static/img-banner-kibble.png" : ""}
                  >
                    <div className="img-lauch">
                      <img
                        src={
                          isMobile && !isInReward
                            ? "../detail-kibble.png"
                            : isMobile && isInReward
                            ? "/static/img-banner-kibble.png"
                            : "/static/gif-lauch.gif"
                        }
                        alt="lauch"
                      />
                    </div>
                  </BlockImage>
                </BlockTitle>
              </>
            ) : (
              <>
                <BlockTitle
                  style={{
                    padding: 0,
                  }}
                >
                  <div className="img-banner-kibble">
                    <img src="/static/img-banner-kibble.png" alt="kibble" />
                  </div>
                </BlockTitle>
              </>
            )
          ) : (
            <></>
          )}
          <BlockTable>
            {!isMobile && (
              <ExplorePoolHeader>
                {/* <ButtonCommon
                  style={{
                    minWidth: "160px",
                    width: "max-content",
                    boxShadow: "unset",
                  }}
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  Back to projects
                </ButtonCommon> */}
                <TabsSelector
                  data={TabsTitle}
                  callBack={(data: any) => {
                    setActiveTab(data.value);
                  }}
                  active={activeTab}
                />
              </ExplorePoolHeader>
            )}
            {(!isMobile && activeTab === 1) || (isMobile && activeTab === 2) ? (
              <BlockLeftAboutProject>
                {!isInReward ? (
                  <BlockTableBox>
                    {isMobile && (
                      <BlockRow
                        style={{
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <h1 style={{ marginBottom: "0px" }}>
                          Kibble FairLaunch
                        </h1>
                        <FairStatus>
                          <div
                            style={{
                              marginBottom: "5px",
                            }}
                          >
                            <p
                              style={{
                                marginTop: "2px",
                              }}
                            >
                              Sale live
                            </p>
                          </div>
                        </FairStatus>
                      </BlockRow>
                    )}
                    <BlockTableRow>
                      <h2>Presale Address</h2>
                      <BlockTableRowItemRight>
                        <span>TBA</span>
                      </BlockTableRowItemRight>
                    </BlockTableRow>
                    <BlockTableRow>
                      <h2>Token Name</h2>
                      <span>KIBBLE</span>
                    </BlockTableRow>
                    <BlockTableRow>
                      <h2>Token Symbol</h2>
                      <span>KIB</span>
                    </BlockTableRow>
                    <BlockTableRow>
                      <h2>Token Decimals</h2>
                      <span>9</span>
                    </BlockTableRow>
                    <BlockTableRow>
                      <h2>Token Address</h2>
                      <BlockTableRowItemRight>
                        <span>TBA</span>
                      </BlockTableRowItemRight>
                    </BlockTableRow>
                    <BlockTableRow
                      style={{
                        marginTop: "-4px",
                      }}
                    >
                      <h2></h2>
                      <p>
                        <span>(Do not send TON to the token address!)</span>
                      </p>
                    </BlockTableRow>
                    <BlockTableRow>
                      <h2>Total Supply</h2>
                      <span>1,000,000,000 KIB</span>
                    </BlockTableRow>
                    <BlockTableRow>
                      <h2>Tokens For Presale</h2>
                      <span>50,000,000 KIB</span>
                    </BlockTableRow>
                    <BlockTableRow>
                      <h2>Tokens For Liquidity</h2>
                      <span>48,000,000 KIB</span>
                    </BlockTableRow>
                    <BlockTableRow>
                      <h2>Initial Market Cap (estimate)</h2>
                      <span>3,244,500 USDT</span>
                    </BlockTableRow>
                    <BlockTableRow>
                      <h2>Soft Cap</h2>
                      <span>225,000 TON</span>
                    </BlockTableRow>
                    <BlockTableRow>
                      <h2>Limit per user</h2>
                      <span>TBA TON</span>
                    </BlockTableRow>
                    <BlockTableRow>
                      <h2>Presale Start Time</h2>
                      <span>TBA (UTC)</span>
                    </BlockTableRow>
                    <BlockTableRow>
                      <h2>Presale End Time</h2>
                      <span>TBA (UTC)</span>
                    </BlockTableRow>
                    <BlockTableRow>
                      <h2>Listing On</h2>
                      <BlockTableRowItemRight>
                        <a
                          href="https://kibble.exchange/"
                          target="_blank"
                          rel="noreferrer"
                          style={{ display: "flex" }}
                        >
                          <p>Kibble.exchange</p>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                          >
                            <path
                              d="M8.3335 3.33334H5.00016C4.55814 3.33334 4.13421 3.50894 3.82165 3.8215C3.50909 4.13406 3.3335 4.55798 3.3335 5.00001V15C3.3335 15.442 3.50909 15.866 3.82165 16.1785C4.13421 16.4911 4.55814 16.6667 5.00016 16.6667H15.0002C15.4422 16.6667 15.8661 16.4911 16.1787 16.1785C16.4912 15.866 16.6668 15.442 16.6668 15V11.6667M10.0002 10L16.6668 3.33334M16.6668 3.33334V7.50001M16.6668 3.33334H12.5002"
                              stroke="#1EB0FF"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </a>
                      </BlockTableRowItemRight>
                    </BlockTableRow>
                    <BlockTableRow>
                      <h2>Liquidity Percent</h2>
                      <span>TBA</span>
                    </BlockTableRow>
                  </BlockTableBox>
                ) : (
                  <BlockTableBox className={theme}>
                    <h1>KIBBLE</h1>
                    <BlockTableRowClaim>
                      <h2>Product</h2>
                      <p>
                        Kibble is the comprehensive DeFi Hub that provides all
                        you need for the best trading experience and optimal
                        advances on TON. With the combination of DeFi platforms
                        and a Telegram user-driven approach, we establish a
                        benchmark for user experience, safety, and seamless
                        navigation into the DeFi realm, we establish a benchmark
                        for user experience, safety, and seamless navigation
                        into the DeFi realm.
                      </p>
                    </BlockTableRowClaim>
                    <BlockTableRowClaim>
                      <h2>Problem</h2>
                      <p>Web<span style={{color: "#92929E"}} className="font-DMMono">3</span> users are facing with problems include </p>
                      <ul>
                        <li>
                          Limited Accessibility: The process of swapping,
                          buying, and selling tokens often faces
                          oversubscription, restricting access for holders and
                          hindering timely trades.
                        </li>
                        <li>
                          Inefficiencies: High slippage rates and transaction
                          fees result in unexpected costs and reduced returns,
                          discouraging active participation in the market.
                        </li>
                        <li>
                          Interoperability Challenges: The inability to directly
                          swap tokens from other blockchains to TON complicates
                          transactions and limits liquidity flow between
                          ecosystems.
                        </li>
                        <li>
                          Transition Hurdles: Many Web<span style={{color: "#92929E"}} className="font-DMMono">2</span> users on Telegram
                          encounter difficulties transitioning to Web<span style={{color: "#92929E"}} className="font-DMMono">3</span>, impeding
                          their exploration of decentralized applications and
                          blockchain services.
                        </li>
                      </ul>
                    </BlockTableRowClaim>
                    <BlockTableRowClaim>
                      <h2>Solution</h2>
                      <p>
                        To solve all the problems that are mentioned above,
                        Kibble is proving product with
                      </p>
                      <ul>
                        <li>
                          AMM: Providing efficient pricing with low to zero
                          slippage and facilitating smoother and lightning-fast
                          transactions
                        </li>
                        <li>
                          Kibble Mini-App: With its close ties to Telegram’s
                          users, it seamlessly guides Web<span style={{color: "#92929E"}} className="font-DMMono">2</span> users onto Web<span style={{color: "#92929E"}} className="font-DMMono">3</span> in in
                          the fastest and most effective way
                        </li>
                        <li>
                          Kibble Bridge: Kibble Bridge seamlessly connects over
                          <span style={{color: "#92929E"}} className="font-DMMono"> 20</span> blockchains to Kibble DEX, enabling direct token
                          swaps to TON from any supported chain.
                        </li>
                      </ul>
                    </BlockTableRowClaim>
                    <BlockTableRowClaimImage>
                      <div className="img-info">
                        <img src="/static/img-phone.png" alt="phone" />
                      </div>
                    </BlockTableRowClaimImage>
                    <p
                      style={{
                        color: "#92929E",
                        textAlign: "center",
                        width: "100%",
                        fontFamily: "Syne",
                        fontSize: "14px",
                      }}
                    >
                      Kibble - Your Premier DeFi Hub On TON
                    </p>
                    <BlockTableRowClaim>
                      <h2>Business Model</h2>
                      <p>Revenue-share model with partners.</p>
                    </BlockTableRowClaim>
                    <BlockTableRowClaim>
                      <h2>Key Feature</h2>
                      <ul>
                        <li>Kibble AMM</li>
                        <li>Add Liquidity & Farming</li>
                        <li>Staking</li>
                        <li>Kibble Bots</li>
                        <li>DEX in Mini-App</li>
                        <li>Launchpad</li>
                      </ul>
                    </BlockTableRowClaim>
                    <BlockTableRowClaim>
                      <h2>Core team</h2>
                      <p>
                        CEO: Smith John -
                        <a
                          href="https://www.linkedin.com/in/longliu0209/"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {" "}
                          Linkedin
                        </a>
                      </p>

                      <ul>
                        <li>
                          With over a decade in Blockchain and Web<span style={{color: "#92929E"}} className="font-DMMono">3.0</span>, he is now
                          working as CTO at Meta Tech company
                        </li>
                        <li>
                          He focus on DeFi, NFT and Metaverse product
                          development
                        </li>
                        <li>Integrating AI into Web<span style={{color: "#92929E"}} className="font-DMMono">3.0</span></li>
                      </ul>
                      <p>
                        CTO: Zhiqi Ou -
                        <a
                          href="https://www.linkedin.com/in/ouzhiqi/"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {" "}
                          Linkedin
                        </a>
                      </p>
                      <ul>
                        <li>Launched his first blockchain startup in 2016</li>
                        <li>
                          Developed projects based on a range of Web<span style={{color: "#92929E"}} className="font-DMMono">3</span> technology
                          including the EVM, Hyperledger Fabric and
                          Decentralized Identifies
                        </li>
                      </ul>
                      <p>
                        CMO: Michael Krützfeldt -
                        <a
                          href="https://www.linkedin.com/in/michael-kr%C3%BCtzfeldt-2a299518b/"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {" "}
                          Linkedin
                        </a>
                      </p>
                      <ul>
                        <li>
                          Co-founder of Ankhlabs - one of the leading Marketing
                          agencies
                        </li>
                        <li>
                          Has worked with over 300 projects including top brands
                          like Bitget, BIC, Portalcoin, Seedify,...
                        </li>
                      </ul>
                      <p>
                        BDM: Artem Sharikov -
                        <a
                          href="https://www.linkedin.com/in/artem-sharikov-007658241/"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {" "}
                          Linkedin
                        </a>
                      </p>
                      <ul>
                        <li>
                          More than 8 years of experience in the crypto market
                        </li>
                        <li>
                          Worked as Business Development Manager at Huobi, MEXC
                          and OKX
                        </li>
                      </ul>
                      <p>
                        Business Developer: Kengan -
                        <a
                          href="https://twitter.com/Kenganton"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {" "}
                          Twitter
                        </a>
                      </p>
                      <ul>
                        <li>
                          Joined in the market 4 years as Business Developer
                        </li>
                        <li>
                          A core member in projects that are invented by Binance
                          Labs, Playventures, DeFiance Capital
                        </li>
                      </ul>
                    </BlockTableRowClaim>
                    <BlockTableRowClaim>
                      <h2>Roadmap</h2>
                      {CONTENT_ROADMAP.map((item: any, index: number) => {
                        return (
                          <div key={index}>
                            <p>{item.title}</p>
                            <ul>
                              {item.content
                                .split(",")
                                .map((text: any, jdex: number) => (
                                  <li key={jdex}>{text}</li>
                                ))}
                            </ul>
                          </div>
                        );
                      })}
                    </BlockTableRowClaim>
                    <BlockTableRowClaim>
                      <h2>Token Utilities</h2>
                      <ul>
                        <li>
                          Staking & Farming: Offering users the opportunity to
                          earn rewards and passive earnings
                        </li>
                        <li>
                          Liquidity Provision: Use your $KIB to provide
                          liquidity on our platform, earning a share of trading
                          fees in return
                        </li>
                        <li>
                          Trading: $KIB serves as gas fee, with users receiving
                          up to a 10% discount on trading fees
                        </li>
                        <li>
                          Presale & IDOs: Use $KIB to join pre-launches and
                          IDOs, with tier eligibility based on token holdings
                        </li>
                        <li>
                          Governance: With $KIB, users can engage in Kibble's
                          governance by voting on big decisions of projects
                        </li>
                        <li>
                          Protocols & Aggregators: $KIB serves as collateral for
                          borrowing, lending, and payments on various platforms
                        </li>
                      </ul>
                    </BlockTableRowClaim>
                  </BlockTableBox>
                )}
              </BlockLeftAboutProject>
            ) : !isMobile || (isMobile && activeTab === 3) ? (
              <BlockLeftAboutToken>
                <BlockLeftAboutTokenCard>
                  <h1>tokenomics</h1>
                  <div className="img-info">
                    <img src={theme === "light" ? "/static/Tokenomics_02.svg" :  "/static/Tokenomics.svg"} alt="tokennomic" />
                  </div>
                  <BlockLeftAboutTokenCardContent>
                    <BlockTableRow>
                      <h2>Angel Investor</h2>
                      <span>5%</span>
                    </BlockTableRow>
                    <BlockTableRow>
                      <h2>Seed Round</h2>
                      <span>8%</span>
                    </BlockTableRow>
                    <BlockTableRow>
                      <h2>Public Sale</h2>
                      <span>5%</span>
                    </BlockTableRow>
                    <BlockTableRow>
                      <h2>Liquidity</h2>
                      <span>24%</span>
                    </BlockTableRow>
                    {/* <BlockTableRow>
                      <h2>Airdrop</h2>
                      <span>7%</span>
                    </BlockTableRow> */}
                    <BlockTableRow>
                      <h2>Advisor & Incubator</h2>
                      <span>6%</span>
                    </BlockTableRow>
                    <BlockTableRow>
                      <h2>Marketing</h2>
                      <span>17%</span>
                    </BlockTableRow>
                    <BlockTableRow>
                      <h2>Team</h2>
                      <span>10%</span>
                    </BlockTableRow>
                    <BlockTableRow>
                      <h2>Incentives</h2>
                      <span>25%</span>
                    </BlockTableRow>
                  </BlockLeftAboutTokenCardContent>
                </BlockLeftAboutTokenCard>
                <BlockLeftAboutTokenCard>
                  <h1>Token info</h1>
                  <div className="img-info">
                    <img src="/static/gif-token-info.gif" alt="token" />
                  </div>
                  <BlockLeftAboutTokenCardContent>
                    <BlockTableRow>
                      <h2>Token name</h2>
                      <span>KIBBLE</span>
                    </BlockTableRow>
                    <BlockTableRow>
                      <h2>Token symbol</h2>
                      <span>KIB</span>
                    </BlockTableRow>
                    <BlockTableRow>
                      <h2>Total supply</h2>
                      <span>1,000,000,000</span>
                    </BlockTableRow>
                    <BlockTableRow>
                      <h2>Decimals</h2>
                      <span>9</span>
                    </BlockTableRow>
                    <BlockTableRow>
                      <h2>Network</h2>
                      <span>TON BLOCKCHAIN</span>
                    </BlockTableRow>
                    <BlockTableRow>
                      <h2>Token address</h2>
                      <span>TBA</span>
                    </BlockTableRow>
                  </BlockLeftAboutTokenCardContent>
                </BlockLeftAboutTokenCard>
              </BlockLeftAboutToken>
            ) : (
              <></>
            )}
          </BlockTable>
        </BlockLeft>
        {(isMobile && activeTab === 4) || !isMobile ? (
          <BlockRight>
            {!isInReward ? (
              <>
                <BlockRightCard>
                  <FairHeader>
                    <div className="img-header">
                      <img src={fair_kibble} alt="icon" />
                    </div>
                    <FairTags>
                      <h2>Kibble FairLaunch</h2>
                      <FairStatus>
                        <div>
                          <p>Upcoming</p>
                        </div>
                        <div>
                          <p>LP fee 0.2%</p>
                        </div>
                      </FairStatus>
                    </FairTags>
                  </FairHeader>
                  <FairBox>
                    <FairProgress>
                      <FairProgressHeader>
                        <p>Progress</p>
                        <p>
                          <span>{0}%</span>
                        </p>
                      </FairProgressHeader>
                      <FairProgressBar Progress={0}>
                        <span></span>
                      </FairProgressBar>
                      <FairProgressPercent>
                        <span>0</span>
                        <span> /225,000</span>
                      </FairProgressPercent>
                    </FairProgress>
                    <BlockRightBox
                      style={{
                        padding: isInReward ? "24px" : "12px",
                      }}
                    >
                      {!isInReward ? (
                        <>
                          <BlockTableRow>
                            <h2>Asset <span style={{color: '#fff'}} className="font-DMMono">1</span></h2>
                            <div>
                              <span>Available: 0.00</span>
                              <span>|</span>
                              <span>MAX</span>
                            </div>
                          </BlockTableRow>
                          <SwapInputWrapper
                            style={{
                              cursor: address ? "pointer" : "not-allowed",
                            }}
                            active={fromAmount > 0}
                          >
                            <SwapChoose
                              onClick={() => {
                                setOpenFromModal(true);
                              }}
                              style={{
                                pointerEvents: "none",
                              }}
                            >
                              <SwapChooseDefault>
                                {fromAsset ? (
                                  <>
                                    <img
                                      src={fromAsset?.image_url}
                                      alt="icon"
                                      onError={(e) =>
                                        (e.currentTarget.src =
                                          default_token_image)
                                      }
                                    />
                                    <p>{fromAsset?.symbol}</p>
                                  </>
                                ) : (
                                  <TextResult>Loading...</TextResult>
                                )}
                              </SwapChooseDefault>
                            </SwapChoose>
                            {/* Input From */}
                            <Controller
                              name="fromAmount"
                              control={control}
                              render={({ field }: any) => (
                                <SwapInputValue>
                                  <InputCommon
                                    {...field}
                                    // disabled={address ? false : true}
                                    disabled
                                    onChange={handleSendValue}
                                    onFocus={handleResetValueFrom}
                                    placeHolder={"0"}
                                  />
                                  <RoutesBottom>
                                    {assets && (
                                      <p>
                                        ≈
                                        {true
                                          ? (
                                              Number(fromAmount) *
                                                Number(
                                                  assets[fromAssetKey]
                                                    .dex_price_usd
                                                ) || 0
                                            ).toFixed(3)
                                          : "0"}{" "}
                                        USD
                                      </p>
                                    )}
                                  </RoutesBottom>
                                </SwapInputValue>
                              )}
                            />
                            {/* ---------- */}
                          </SwapInputWrapper>
                        </>
                      ) : (
                        <BlockRightReward>
                          <BlockTableRowItemRight
                            style={{
                              gap: 0,
                              alignItems: "flex-end",
                            }}
                          >
                            <h1>
                              3,430<span>.58</span>
                            </h1>
                            <span>KIB</span>
                          </BlockTableRowItemRight>
                          <p>~12 TON</p>
                        </BlockRightReward>
                      )}
                    </BlockRightBox>
                  </FairBox>
                  <FairEndIn>
                    <p>Presale ends in</p>
                    <FairTime>
                      <div>
                        <p>--</p>
                      </div>
                      <span>:</span>
                      <div>
                        <p>--</p>
                      </div>
                      <span>:</span>
                      <div>
                        <p>--</p>
                      </div>
                      <span>:</span>
                      <div>
                        <p>--</p>
                      </div>
                    </FairTime>
                  </FairEndIn>
                  <ButtonCommon
                  >
                    <span>
                      {isInReward ? "Claim reward" : "Connect wallet"}{" "}
                    </span>
                  </ButtonCommon>
                </BlockRightCard>
                <BlockRightCard>
                  <FairProgress>
                    <FairProgressBar Progress={0}>
                      <span></span>
                    </FairProgressBar>
                  </FairProgress>
                  <BlockStepsTitle>
                    <BlockStepsTitleItem active={true} className={theme}>
                      <p>01</p>
                    </BlockStepsTitleItem>
                    <BlockStepsTitleItem className={theme}>
                      <p>02</p>
                    </BlockStepsTitleItem>
                    <p style={{color: theme === "dark" ? '#EEEEF0' : '#007AF5'}}>Pool Start</p>
                    <BlockStepsTitleItem className={theme}>
                      <p>03</p>
                    </BlockStepsTitleItem>
                    <BlockStepsTitleItem className={theme}>
                      <p>04</p>
                    </BlockStepsTitleItem>
                  </BlockStepsTitle>
                  <BlockSteps>
                    {STEPS.map((item: any, index: number) => {
                      return (
                        <BlockRightRow
                          key={index}
                          className={
                            index === STEPS.length - 1 ? "hidden-step" : ""
                          }
                        >
                          <div
                            className={index < 1 ? "action-dot" : "img-dot"}
                          ></div>
                          <div
                            className={index < 0 ? "action-line" : "line"}
                          ></div>
                          <div>
                            <h2
                              style={{
                                color: index < 1 ? "var(--Stake-Title)" : "",
                              }}
                            >
                              {item.title}
                            </h2>
                            <p>{item.description}</p>
                          </div>
                        </BlockRightRow>
                      );
                    })}
                  </BlockSteps>
                  <BlockRightStatus>
                    <FairBox>
                      <BlockTableRow>
                        <h2>Status</h2>
                        <h1>Upcoming</h1>
                      </BlockTableRow>
                      <BlockTableRow>
                        <h2>Sale Type</h2>
                        <h1 style={{ color: "#1EB0FF" }}>Public</h1>
                      </BlockTableRow>

                      <BlockTableRow>
                        <h2> Current Rate </h2>
                        <p> 1 KIB = 0.009 TON </p>
                      </BlockTableRow>
                      <BlockTableRow>
                        <h2>Total Contributors</h2>
                        <p>0</p>
                      </BlockTableRow>
                      <BlockTableRow>
                        <h2>Your Contribution</h2>
                        <p>0 TON</p>
                      </BlockTableRow>
                    </FairBox>
                  </BlockRightStatus>
                </BlockRightCard>
              </>
            ) : (
              <>
                <BlockRightCard>
                  <FairBox>
                    <FairProgress>
                      <FairProgressHeader>
                        <p>Funding goal</p>
                        <p>
                          <span>{0}%</span>
                        </p>
                      </FairProgressHeader>
                      <FairProgressBar Progress={0}>
                        <span></span>
                      </FairProgressBar>
                      <FairProgressPercent>
                        <span>$0.00</span>
                        {/* <span> /$1,000,000</span> */}
                      </FairProgressPercent>
                    </FairProgress>
                  </FairBox>
                  <ButtonCommon
                    style={{
                      background: "#007AF5",
                      color: "#fff",
                    }}
                  >
                    <p>Invest</p>
                  </ButtonCommon>
                </BlockRightCard>
                <BlockRightCard>
                  <BlockStepsTitle className={theme}>
                    <BlockStepsTitleItem className={theme} active={true}>
                      <p>01</p>
                    </BlockStepsTitleItem>
                    <BlockStepsTitleItem className={theme}>
                      <p>02</p>
                    </BlockStepsTitleItem>
                    <p style={{color: theme === "light" ? "#007AF5" : '#fff'}}>Invest</p>
                    <BlockStepsTitleItem className={theme}>
                      <p>03</p>
                    </BlockStepsTitleItem>
                  </BlockStepsTitle>
                  <BlockSteps>
                    {STEPS_CLAIM.map((item: any, index: number) => {
                      return (
                        <BlockRightRow
                          key={index}
                          className={
                            index === STEPS_CLAIM.length - 1
                              ? "hidden-step"
                              : ""
                          }
                        >
                          <div
                            className={index < 1 ? "action-dot" : "img-dot"}
                          ></div>
                          <div
                            className={index < 1 - 1 ? "action-line" : "line"}
                          ></div>
                          <div>
                            <h2
                              style={{
                                color:
                                  index < 1 && theme === "dark"
                                    ? "#fff"
                                    : index < 1 && theme === "light"
                                    ? "#43424A"
                                    : "",
                              }}
                            >
                              {item.title}
                            </h2>
                            <p>{item.description}</p>
                          </div>
                        </BlockRightRow>
                      );
                    })}
                  </BlockSteps>
                  <FairEndIn>
                    <p>Ends in</p>
                    <FairTime>
                      <div>
                        <p>--</p>
                      </div>
                      <span>:</span>
                      <div>
                        <p>--</p>
                      </div>
                      <span>:</span>
                      <div>
                        <p>--</p>
                      </div>
                      <span>:</span>
                      <div>
                        <p>--</p>
                      </div>
                    </FairTime>
                  </FairEndIn>
                  <BlockRightStatus>
                    <FairBox>
                      <BlockTableRow>
                        <h2>Status</h2>
                        <h1>Upcoming</h1>
                      </BlockTableRow>
                      <BlockTableRow>
                        <h2>Sale Type</h2>
                        <h1 style={{ color: "#1EB0FF" }}>Public</h1>
                      </BlockTableRow>
                      <BlockTableRow>
                        <h2>Current Rate</h2>
                        <h1>TON</h1>
                      </BlockTableRow>
                      <BlockTableRow>
                        <h2>Total Contributors</h2>
                        <p>--</p>
                      </BlockTableRow>
                      <BlockTableRow>
                        <h2>Your Contribution</h2>
                        <p>0 TON</p>
                      </BlockTableRow>
                    </FairBox>
                  </BlockRightStatus>
                </BlockRightCard>
              </>
            )}
          </BlockRight>
        ) : (
          <></>
        )}
      </RowDetail>
    </DetailContainer>
  );
};

export default IDODetail;

const TabsTitle = [
  {
    title: "About this project",
    value: 1,
  },
  {
    title: "Token info",
    value: 2,
  },
];
