import {
  AddBtn,
  BackToButton,
  BoxEarnDetail,
  BtnGroup,
  ContentCaontainer,
  ContentLeft,
  ContentLeftTitle,
  ContentRight,
  EarnBtnGroup,
  EarnBtnRights,
  EarnPrice,
  LiquidityDetailsContainer,
  LiquidityDetailsWrapper,
  PollFarm,
  PollTitle,
  PoolAprBox,
  PoolAprGroups,
  PoolImagePair,
  PoolReserve,
  RatesTabContainer,
  RatesTabSelect,
  RationPriceBox,
  RemoveBtn,
  TabsBtn,
  TitleBox,
  TokentRates,
  TradeBtn,
  ViewContract,
  VolumBox,
  VolumContainer,
} from "./styled";
import { Link, useNavigate, useParams } from "react-router-dom";
import { KIBBLE_API } from "../../../services/api";
import { useContext, useEffect, useState } from "react";
import { useGetAssetsQuery } from "../../../store/api/dexApiSlice";
import LinkBtn from "../../../assets/liquidity/LinkBtnIcon.svg";
import LinkBtn_light from "../../../assets/liquidity/LinkBtnIcon_light.svg";
import IconLink from "../../../assets/liquidity/IconLink.svg";
import AddIcon from "../../../assets/liquidity/Add-icon.svg";
import InfoCircle from "../../../assets/liquidity/InfoCircle.svg";
import default_token_image from "../../../assets/Dashboard/Common/default-token-image.png";
import { Coins } from "ton3-core";
import { LiquidityBg } from "../Add/styled";
import { useTonAddress } from "@tonconnect/ui-react";
import ReviewLiquidityRemove from "../Review/Accordion/RemoveModal";
import arrow from "../../../assets/Dashboard/Common/arrow_gray.svg";
import { LoaderLP } from "../../../components/Loader";
import { BackButton, ButtonCommon, ContextProviderWrapper, ModalOverlay, convertFixed } from "@kibble-exchange/uikit";
import close from "../../../assets/Dashboard/Common/close.svg";

const LiquidityDetails = () => {
  const { id } = useParams();
  const address: any = useTonAddress();
  const [poolDetails, setPoolDetails] = useState<any>(null);
  const { theme }: any = useContext(ContextProviderWrapper);
  const [modalConfirmRemove, setModalConfirmRemove] = useState(false);
  const navigate = useNavigate();
  const { data: assetsInfo, isFetching: loadingAssets } = useGetAssetsQuery(
    address ? address?.toString() : undefined
  );

  const token0Address: any =
    assetsInfo && assetsInfo[poolDetails?.token0_address];
  const token1Address: any =
    assetsInfo && assetsInfo[poolDetails?.token1_address];

  // Check tokenAddress undefined
  useEffect(() => {
    if (poolDetails && token0Address === undefined) {
      handleGetInfoToken(poolDetails?.token0_address);
    }
  }, [token0Address, poolDetails]);

  useEffect(() => {
    if (poolDetails && token1Address === undefined) {
      handleGetInfoToken(poolDetails?.token1_address);
    }
  }, [token1Address, poolDetails]);

  const [infoNewToken, setInfoNewToken] = useState<any>({});
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);

  const handleGetInfoToken = async (tokenAddress: any) => {
    setIsLoadingSearch(true);

    const params = {
      wallet_address: address,
      addresses: [tokenAddress],
    };
    try {
      const res = await KIBBLE_API.searchToken(params);
      if (res.status === 200) {
        const { assets } = res.data;
        setInfoNewToken(assets[0]);
        setIsLoadingSearch(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  ///////////////////////////////////////////

  const handleGetPoolDetail = async () => {
    try {
      const res = await KIBBLE_API.getPoolDetail(id, address);
      if (res.status === 200) {
        setPoolDetails(res.data.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      handleGetPoolDetail();
    }
  }, [address, id]);

  // Catch from and to for saving in localStorage when click button add liquidity go to page add liquidity with from and to token the same at detail page
  useEffect(() => {
    const selectedTokens = {
      from: poolDetails?.token0_address,
      to: poolDetails?.token1_address,
    };
    if (!loadingAssets && poolDetails && Object.keys(poolDetails).length > 0) {
      localStorage.setItem("selectedTokens", JSON.stringify(selectedTokens));
    }
    if (poolDetails) {
      setRatio0_1(
        Number(
          Coins?.fromNano(poolDetails?.reserve0, token0Address?.decimals)
        ) /
          Number(
            Coins?.fromNano(poolDetails?.reserve1, token1Address?.decimals)
          )
      );
      setRatio1_0(
        Number(
          Coins?.fromNano(poolDetails?.reserve1, token1Address?.decimals)
        ) /
          Number(
            Coins?.fromNano(poolDetails?.reserve0, token0Address?.decimals)
          )
      );
    }
  }, [poolDetails]);

  const [tabActive, setTabActive] = useState(1);
  const [ratio0_1, setRatio0_1] = useState(0);
  const [ratio1_0, setRatio1_0] = useState(0);
  const [tabActiveEarn, setTabActiveEarn] = useState(1);

  const sharePercent =
    ((poolDetails?.lp_balance ?? 0) / poolDetails?.lp_total_supply) * 100;
  const token0Position = Coins.fromNano(
    ((poolDetails?.reserve0 * sharePercent) / 100).toFixed(0),
    token0Address?.decimals
  );
  const token1Position = Coins.fromNano(
    ((poolDetails?.reserve1 * sharePercent) / 100).toFixed(0),
    token1Address?.decimals
  );

  const hasPositions =
    poolDetails?.token0_balance > 0 ||
    poolDetails?.token1_balance > 0 ||
    (poolDetails?.lp_balance && poolDetails?.lp_balance > 0);

  return (
    <>
      <LiquidityDetailsContainer>
        <LiquidityBg className={theme}>
          <LiquidityDetailsWrapper className={theme}>
          <BackButton text="Back to pool" icon={arrow}/>
            <TitleBox>
              <h1>liquidity pool</h1>
              <p>Earn rewards by providing liquidity</p>
            </TitleBox>
            {poolDetails ? (
              <>
                <ContentCaontainer>
                  <ContentLeft>
                    <ContentLeftTitle>
                      <PollTitle>
                        <h3>
                          {isLoadingSearch ? (
                            <>
                              <span>?? / ??</span>
                            </>
                          ) : (
                            <>
                              {Object.keys(infoNewToken).length > 0 &&
                              token0Address === undefined
                                ? infoNewToken?.symbol
                                : token0Address?.symbol}
                              /
                              {Object.keys(infoNewToken).length > 0 &&
                              token1Address === undefined
                                ? infoNewToken?.symbol
                                : token1Address?.symbol}
                            </>
                          )}
                        </h3>
                        <PoolImagePair>
                          {isLoadingSearch ? (
                            <>
                              <figure>
                                <img
                                  src={default_token_image}
                                  alt="icon"
                                  onError={(e) =>
                                    (e.currentTarget.src = default_token_image)
                                  }
                                />
                              </figure>
                              <figure>
                                <img
                                  src={default_token_image}
                                  alt="icon"
                                  onError={(e) =>
                                    (e.currentTarget.src = default_token_image)
                                  }
                                />
                              </figure>
                            </>
                          ) : (
                            <>
                              <figure>
                                <img
                                  src={
                                    Object.keys(infoNewToken).length > 0 &&
                                    token0Address === undefined
                                      ? default_token_image
                                      : token0Address?.image_url
                                  }
                                  alt="icon"
                                  onError={(e) =>
                                    (e.currentTarget.src = default_token_image)
                                  }
                                />
                              </figure>
                              <figure>
                                <img
                                  src={
                                    Object.keys(infoNewToken).length > 0 &&
                                    token1Address === undefined
                                      ? default_token_image
                                      : token1Address?.image_url
                                  }
                                  alt="icon"
                                  onError={(e) =>
                                    (e.currentTarget.src = default_token_image)
                                  }
                                />
                              </figure>
                            </>
                          )}
                        </PoolImagePair>
                      </PollTitle>
                      <Link
                        target="_blank"
                        to={`https://tonviewer.com/${poolDetails?.address}`}
                      >
                        <img
                          src={theme === "light" ? LinkBtn_light : LinkBtn}
                          alt="icon"
                        />
                      </Link>
                    </ContentLeftTitle>
                    <PollFarm className={theme}>
                      <div>
                        <h6>
                          LP fee{" "}
                          <span>{Number(poolDetails?.lp_fee) / 100}%</span>
                        </h6>
                      </div>
                    </PollFarm>
                    <TokentRates>
                      <h1>Token rates</h1>
                      <RatesTabContainer>
                        <RatesTabSelect>
                          <TabsBtn
                            onClick={() => {
                              setTabActive(1);
                            }}
                            active={tabActive === 1}
                          >
                            {isLoadingSearch ? (
                              <>
                                <img
                                  src={default_token_image}
                                  alt="icon"
                                  onError={(e) =>
                                    (e.currentTarget.src = default_token_image)
                                  }
                                />
                              </>
                            ) : (
                              <>
                                <img
                                  src={
                                    Object.keys(infoNewToken).length > 0 &&
                                    token0Address === undefined
                                      ? default_token_image
                                      : token0Address?.image_url
                                  }
                                  alt="icon"
                                  onError={(e) =>
                                    (e.currentTarget.src = default_token_image)
                                  }
                                />
                              </>
                            )}
                            <h3>
                              {isLoadingSearch ? (
                                <>??</>
                              ) : (
                                <>
                                  {Object.keys(infoNewToken).length > 0 &&
                                  token0Address === undefined
                                    ? infoNewToken?.symbol
                                    : token0Address?.symbol}
                                </>
                              )}
                            </h3>
                          </TabsBtn>
                          <TabsBtn
                            onClick={() => {
                              setTabActive(2);
                            }}
                            active={tabActive === 2}
                          >
                            {isLoadingSearch ? (
                              <>
                                <img
                                  src={default_token_image}
                                  alt="icon"
                                  onError={(e) =>
                                    (e.currentTarget.src = default_token_image)
                                  }
                                />
                              </>
                            ) : (
                              <>
                                <img
                                  src={
                                    Object.keys(infoNewToken).length > 0 &&
                                    token1Address === undefined
                                      ? default_token_image
                                      : token1Address?.image_url
                                  }
                                  alt="icon"
                                  onError={(e) =>
                                    (e.currentTarget.src = default_token_image)
                                  }
                                />
                              </>
                            )}
                            <h3>
                              {isLoadingSearch ? (
                                <>??</>
                              ) : (
                                <>
                                  {Object.keys(infoNewToken).length > 0 &&
                                  token1Address === undefined
                                    ? infoNewToken?.symbol
                                    : token1Address?.symbol}
                                </>
                              )}
                            </h3>
                          </TabsBtn>
                        </RatesTabSelect>
                        <RationPriceBox>
                          <p>
                            <span>
                              ~
                              {tabActive !== 1
                                ? `${Math.floor(ratio0_1)}`
                                : `${Math.floor(ratio1_0)}`}
                            </span>
                            {tabActive !== 1
                              ? `.${ratio0_1
                                  .toFixed(2)
                                  .toString()
                                  .split(".")[1]
                                  .slice(0, 2)}
                                  `
                              : `.${ratio1_0
                                  .toFixed(2)
                                  .toString()
                                  .split(".")[1]
                                  .slice(0, 2)}
                                  `}
                          </p>
                          {isLoadingSearch ? (
                            <>
                              <img
                                src={default_token_image}
                                alt="icon"
                                onError={(e) =>
                                  (e.currentTarget.src = default_token_image)
                                }
                              />
                            </>
                          ) : (
                            <>
                              <img
                                src={
                                  tabActive === 2
                                    ? token0Address?.image_url
                                    : tabActive === 2 &&
                                      token1Address === undefined
                                    ? default_token_image
                                    : tabActive === 1 &&
                                      token0Address === undefined
                                    ? default_token_image
                                    : tabActive === 1
                                    ? token1Address?.image_url
                                    : default_token_image
                                }
                                alt="icon"
                                onError={(e) =>
                                  (e.currentTarget.src = default_token_image)
                                }
                              />
                            </>
                          )}
                        </RationPriceBox>
                        <ViewContract>
                          <Link
                            target="_blank"
                            to={`https://tonviewer.com/${
                              tabActive === 1
                                ? token0Address?.contract_address
                                : token1Address?.contract_address
                            }`}
                          >
                            <img src={IconLink} alt="icon" /> View contract
                          </Link>
                        </ViewContract>
                      </RatesTabContainer>
                      <VolumContainer>
                        <VolumBox>
                          <h5>TVL</h5>
                          <h4>
                            $
                            {poolDetails?.tvl &&
                              convertFixed(Number(poolDetails?.tvl))}
                          </h4>
                        </VolumBox>
                        <VolumBox>
                          <h5>Volume <span className="font-DMMono">24</span>h</h5>
                          <h4>
                            $
                            {poolDetails?.volume_24h_usd &&
                              convertFixed(Number(poolDetails?.volume_24h_usd))}
                          </h4>
                        </VolumBox>
                      </VolumContainer>
                    </TokentRates>
                    <PoolReserve>
                      <h1>Pool reserve</h1>
                      <h3 className="no-border">
                        {Object.keys(infoNewToken).length > 0 &&
                        token0Address === undefined
                          ? infoNewToken.symbol
                          : token0Address?.symbol}
                        <span>
                          {Number(
                            Coins?.fromNano(
                              poolDetails?.reserve0,
                              Object.keys(infoNewToken).length > 0 &&
                                token0Address === undefined
                                ? infoNewToken.decimals
                                : token0Address?.decimals
                            )
                          ) &&
                            convertFixed(
                              Number(
                                Coins?.fromNano(
                                  poolDetails?.reserve0,
                                  Object.keys(infoNewToken).length > 0 &&
                                    token0Address === undefined
                                    ? infoNewToken.decimals
                                    : token0Address?.decimals
                                )
                              )
                            )}
                        </span>
                      </h3>
                      <h3>
                        {Object.keys(infoNewToken).length > 0 &&
                        token1Address === undefined
                          ? infoNewToken.symbol
                          : token1Address?.symbol}
                        <span>
                          {Number(
                            Coins?.fromNano(
                              poolDetails?.reserve1,
                              Object.keys(infoNewToken).length > 0 &&
                                token1Address === undefined
                                ? infoNewToken.decimals
                                : token1Address?.decimals
                            )
                          ) &&
                            convertFixed(
                              Number(
                                Coins?.fromNano(
                                  poolDetails?.reserve1,
                                  Object.keys(infoNewToken).length > 0 &&
                                    token1Address === undefined
                                    ? infoNewToken.decimals
                                    : token1Address?.decimals
                                )
                              )
                            )}
                        </span>
                      </h3>
                    </PoolReserve>
                    <BtnGroup>
                      <ButtonCommon width="30%" background="var(--Btn-LP)">
                        <Link
                          to={`/swap?from=${token0Address?.contract_address}&to=${token1Address?.contract_address}`}
                        >
                          <p style={{ color: "var(--Progress-Text)" }}>Trade</p>
                        </Link>
                      </ButtonCommon>
                      <ButtonCommon width="70%">
                        <Link
                          style={{
                            display: "flex",
                          }}
                          to="/liquidity/provide"
                        >
                          Add liquidity{" "}
                          <img
                            style={{
                              marginLeft: "5px",
                            }}
                            width={22}
                            src={AddIcon}
                            alt="icon"
                          />
                        </Link>
                      </ButtonCommon>
                    </BtnGroup>
                  </ContentLeft>
                  <ContentRight className={theme}>
                    <PollTitle>
                      <h3>MY POOL</h3>
                    </PollTitle>
                    <PoolAprGroups>
                      <PoolAprBox theme={theme}>
                        <p>Pool APR <span className="font-DMMono">24</span>h</p>
                        <h6>
                          {Number(poolDetails?.apy_1d * 100) &&
                            convertFixed(Number(poolDetails?.apy_1d * 100))}
                          %
                        </h6>
                      </PoolAprBox>
                      <PoolAprBox theme={theme}>
                        <p>Pool APR <span className="font-DMMono">7</span>d</p>
                        <h6>
                          {Number(poolDetails?.apy_7d * 100) &&
                            convertFixed(Number(poolDetails?.apy_7d * 100))}
                          %
                        </h6>
                      </PoolAprBox>
                      <PoolAprBox theme={theme}>
                        <p>Pool APR <span className="font-DMMono">30</span>d</p>
                        <h6>
                          {Number(poolDetails?.apy_30d * 100) &&
                            convertFixed(Number(poolDetails?.apy_30d * 100))}
                          %
                        </h6>
                      </PoolAprBox>
                    </PoolAprGroups>
                    <RatesTabContainer>
                      <RatesTabSelect>
                        <TabsBtn
                          onClick={() => {
                            setTabActiveEarn(1);
                          }}
                          active={tabActiveEarn === 1}
                        >
                          <h3>Liquidity Pool</h3>
                        </TabsBtn>
                        <TabsBtn
                          // onClick={() => {
                          //   setTabActiveEarn(2);
                          // }}
                          active={tabActiveEarn === 2}
                        >
                          <h3>Earn Farm</h3>
                        </TabsBtn>
                      </RatesTabSelect>
                      <EarnPrice>
                        $
                        {Number(poolDetails?.lp_value_usd || 0) &&
                          convertFixed(Number(poolDetails?.lp_value_usd || 0))}
                      </EarnPrice>
                      <EarnBtnGroup>
                        <p>
                          <img src={InfoCircle} alt="" />{" "}
                          {tabActiveEarn === 1
                            ? "Liquidity that you provided in the pool"
                            : "Liquidity that you deposited in the pool farms"}
                        </p>
                        <EarnBtnRights>
                          {tabActiveEarn === 1 ? (
                            <>
                              {hasPositions && (
                                <ButtonCommon
                                  onClick={() => {
                                    setModalConfirmRemove(true);
                                  }}
                                  background="#43424A"
                                >
                                  Withdraw
                                </ButtonCommon>
                              )}
                              <ButtonCommon>
                                <Link to="/liquidity/provide">Add more</Link>
                              </ButtonCommon>
                            </>
                          ) : (
                            <>
                              <RemoveBtn>
                                <Link to="">
                                  <p>Remove</p>
                                </Link>
                              </RemoveBtn>
                              <TradeBtn>
                                <Link to={``}>
                                  <p>Claim rewards</p>
                                </Link>
                              </TradeBtn>
                              <AddBtn>
                                <Link to="">
                                  <p>Add from LP</p>
                                </Link>
                              </AddBtn>
                            </>
                          )}
                        </EarnBtnRights>
                      </EarnBtnGroup>
                    </RatesTabContainer>
                    <BoxEarnDetail>
                      <p>
                        <span>Pool share</span>{" "}
                        <span style={{ color: "var(--detail-Liquidity)" }}>
                          {sharePercent?.toFixed(2)}%
                        </span>
                      </p>
                      <p>
                        <span>
                          {Object.keys(infoNewToken).length > 0 &&
                          token0Address === undefined
                            ? infoNewToken?.symbol
                            : token0Address?.symbol}{" "}
                          provided
                        </span>{" "}
                        <span>{Number(token0Position)}</span>
                      </p>
                      <p>
                        <span>
                          {Object.keys(infoNewToken).length > 0 &&
                          token1Address === undefined
                            ? infoNewToken?.symbol
                            : token1Address?.symbol}{" "}
                          provided
                        </span>{" "}
                        <span>{Number(token1Position)}</span>
                      </p>
                      <p>
                        <span>LP tokens</span>{" "}
                        <span>
                          {poolDetails?.lp_balance ? (
                            <>{convertFixed(Number(poolDetails?.lp_balance))}</>
                          ) : (
                            "--"
                          )}
                        </span>
                      </p>
                    </BoxEarnDetail>
                  </ContentRight>
                </ContentCaontainer>
              </>
            ) : (
              <>
                <LoaderLP />
              </>
            )}
          </LiquidityDetailsWrapper>
        </LiquidityBg>
      </LiquidityDetailsContainer>
      <ModalOverlay
        component={
          <ReviewLiquidityRemove
            pool={poolDetails}
            assetsInfo={assetsInfo}
            setModalConfirmRemove={setModalConfirmRemove}
            modalConfirmRemove={modalConfirmRemove}
            token0Address={token0Address}
            token1Address={token1Address}
            infoNewToken={Object.keys(infoNewToken).length > 0 && infoNewToken}
            isLoadingSearch={isLoadingSearch}
            ratio0_1={ratio0_1}
            ratio1_0={ratio1_0}
          />
        }
        open={modalConfirmRemove}
        setOpen={setModalConfirmRemove}
        title={"Withdraw liquidity"}
        width="400px"
        closeIcon={close}
      />
    </>
  );
};

export default LiquidityDetails;
