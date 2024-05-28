import {
  ExplorePoolsWapper,
  FillterBart,
  LiquidityContainer,
  SearchBox,
  StatusBar,
  LiquidityWrapper,
  ExplorePoolHeader,
  LiquidityBoxSearch,
  ExplorePool,
} from "./styled";
import { useContext, useEffect, useState } from "react";
import TabMyPool from "./Tabs/MyPool";
import TabPools from "./Tabs/Pools";
import search_icon from "../../assets/Dashboard/Common/search_icon.svg";
import { useGetAssetsQuery } from "../../store/api/dexApiSlice";
import { useTonAddress } from "@tonconnect/ui-react";
import _ from "lodash";
import { useSelector } from "react-redux";
import filter_gif from "../../assets/gif/liquidity_filter_gif.gif";
import { Controller, useForm } from "react-hook-form";
import { FormInput } from "../../components/Footer/styled";
import liquidity_img from "../../assets/Dashboard/Liquidity/liquidity_img.png";
import liquidity_img_light from "../../assets/Dashboard/Liquidity/liquidity_img_light.png";
import TabsSelector from "../Farm/TabsSelector";
import { ContextProviderWrapper, InputCommon, KeyvisualCommon } from "@kibble-exchange/uikit";

const Liquidity = () => {
  const [activeTab, setActiveTab] = useState(1);

  const { isMobile, theme } = useContext(ContextProviderWrapper)!;

  const { data: assetsInfo, isLoading: loadingAssets } = useGetAssetsQuery();

  const address = useTonAddress();

  const { allPools, poolsWallet }: any = useSelector(
    (state: any) => state.pool
  );

  const { allAssets }: any = useSelector((state: any) => state.assets);

  const { control } = useForm({ mode: "onChange" });

  const filteredPools =
    allPools &&
    _.filter(allPools, (pool) => {
      return (
        _.some(allAssets, { contract_address: pool.token0_address }) &&
        _.some(allAssets, { contract_address: pool.token1_address })
      );
    });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChangeTabs = () => {
    switch (activeTab) {
      case 1:
        return (
          <TabPools
            assetsInfo={assetsInfo}
            filteredPools={filteredPools}
            searchValue={searchValue}
          />
        );
      default:
        return (
          <TabMyPool
            poolsWithLpBalance={poolsWallet}
            assets={assetsInfo}
          />
        );
    }
  };

  const TABS = [
    {
      title: "All pools",
      value: 1,
      label: ``,
    },
    {
      title: "My pools",
      value: 2,
      label:
        !loadingAssets && address
          ? `${(poolsWallet && poolsWallet.length) || 0}`
          : "0",
    },
  ];

  // handle search pools by address
  const [searchValue, setSearchValue] = useState("");
  const handleSearchPools = (e: any) => {
    setSearchValue(e.target.value);
  };

  return (
    <LiquidityContainer>
      <KeyvisualCommon
        title="LIQUIDITY POOL"
        description={"Earn rewards by providing liquidity"}
        image={isMobile ? filter_gif : theme === "light" ? liquidity_img_light : liquidity_img}
        buttonText="Add liquidity"
        buttonLink="/liquidity/provide"
        buttonIcon={""}
      />
      <LiquidityWrapper>
        <ExplorePoolsWapper className={theme}>
          <ExplorePoolHeader className={theme}>
            {!isMobile && (
              <h1>
                EXPLORE POOLS
                <span> {!loadingAssets ? `${filteredPools.length}` : "0"}</span>
              </h1>
            )}
            <TabsSelector
              data={[...TABS]}
              callBack={(data: any) => {
                setActiveTab(data.value);
              }}
              active={activeTab}
            />
            {isMobile && (
              <LiquidityBoxSearch>
                <SearchBox className={theme}>
                  <FormInput
                    style={{
                      width: "100%",
                      background: theme === "light" ? "transparent" : "#28272c",
                      borderRadius: "6px",
                    }}
                  >
                    <Controller
                      name="search"
                      control={control}
                      render={({ field }: any) => (
                        <InputCommon
                          {...field}
                          placeHolder="Search by symbol"
                          allowClear={{
                            clearIcon: (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="17"
                                height="16"
                                viewBox="0 0 17 16"
                                fill="none"
                              >
                                <path
                                  d="M8.06915 7.34047L8.54055 7.81187L9.01196 7.34047L12.4464 3.90606L12.4464 3.90614L12.4545 3.8978C12.4668 3.88507 12.4815 3.87491 12.4978 3.86792L12.2346 3.25538L12.4978 3.86792C12.514 3.86093 12.5315 3.85726 12.5492 3.8571C12.5669 3.85695 12.5845 3.86032 12.6009 3.86703C12.6173 3.87373 12.6321 3.88363 12.6447 3.89615C12.6572 3.90867 12.6671 3.92355 12.6738 3.93994L13.29 3.68782L12.6738 3.93994C12.6805 3.95633 12.6839 3.97389 12.6837 3.99159C12.6836 4.00929 12.6799 4.02679 12.6729 4.04306C12.6659 4.05932 12.6557 4.07403 12.643 4.08633L12.6429 4.08626L12.6347 4.09446L9.20035 7.52886L8.72894 8.00026L9.20035 8.47166L12.6289 11.9002C12.6518 11.9251 12.6643 11.9577 12.6641 11.9916C12.6637 12.0265 12.6497 12.06 12.625 12.0847C12.6003 12.1094 12.5668 12.1235 12.5319 12.1238C12.498 12.1241 12.4654 12.1115 12.4405 12.0886L9.01196 8.66006L8.54055 8.18865L8.06915 8.66006L4.64057 12.0886C4.61571 12.1115 4.58307 12.1241 4.54922 12.1238C4.51426 12.1235 4.48082 12.1094 4.4561 12.0847C4.43138 12.06 4.41736 12.0265 4.41705 11.9916C4.41676 11.9577 4.42934 11.9251 4.45217 11.9002L7.88076 8.47166L8.35216 8.00026L7.88076 7.52886L4.44643 4.09453C4.44641 4.09451 4.44639 4.09449 4.44637 4.09446C4.42141 4.06947 4.40739 4.03559 4.40739 4.00026C4.40739 3.96491 4.42143 3.931 4.44643 3.90599C4.47142 3.88109 4.50526 3.8671 4.54055 3.8671C4.57587 3.8671 4.60975 3.88111 4.63475 3.90606C4.63477 3.90609 4.63479 3.90611 4.63482 3.90614L8.06915 7.34047Z"
                                  fill="black"
                                  stroke="#93989F"
                                  stroke-width="1.33333"
                                />
                              </svg>
                            ),
                          }}
                          onChange={handleSearchPools}
                        />
                      )}
                    />
                  </FormInput>
                </SearchBox>
              </LiquidityBoxSearch>
            )}
          </ExplorePoolHeader>
          {isMobile && (
            <ExplorePool className={theme}>
              <h1>
                EXPLORE POOLS
                <span> {!loadingAssets ? `${filteredPools.length}` : "0"}</span>
              </h1>
            </ExplorePool>
          )}
          <div
            style={{
              marginTop: "10px",
            }}
          >
            {handleChangeTabs()}
          </div>
        </ExplorePoolsWapper>
        {!isMobile && (
          <StatusBar>
            <FillterBart className={theme}>
              <figure>
                <img src={filter_gif} alt="gif" />
              </figure>
              {/* {activeTab === 1 && ( */}
                <SearchBox className={theme}>
                  <InputCommon
                    placeHolder="Search by symbol"
                    name="search"
                    suffix={<img src={search_icon} alt="icon" />}
                    onChange={handleSearchPools}
                  />
                  <span className="search">Search</span>
                </SearchBox>
              {/* )} */}
            </FillterBart>
          </StatusBar>
        )}
      </LiquidityWrapper>
    </LiquidityContainer>
  );
};

export default Liquidity;
