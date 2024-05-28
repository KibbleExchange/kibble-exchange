import {
  ExplorePoolsWapper,
  FillterBart,
  LiquidityContainer,
  SearchBox,
  StatusBar,
  LiquidityWrapper,
  ExplorePoolHeader,
  LiquidityBoxSearch,
  LiquidityBoxActions,
} from "../Liquidity/styled";
import { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FormInput, LabelForm } from "../../components/Footer/styled";
import IDOLaunch from "./IDO";
import FairLaunch from "./FAIR";
import { LaunchpadWapper } from "./styled";
import TabsSelector from "../Farm/TabsSelector";
import { ButtonCommon, ContextProviderWrapper, InputCommon, KeyvisualCommon } from "@kibble-exchange/uikit";

const Liquidity = () => {
  const [activeTab, setActiveTab] = useState(1);

  const { isMobile, theme } = useContext(ContextProviderWrapper)!;

  const { setValue, control } = useForm({ mode: "onChange" });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChangeTabs = () => {
    switch (activeTab) {
      case 1:
        return <IDOLaunch />;
      default:
        return <FairLaunch />;
    }
  };

  // handle search pools by address
  const [searchValue, setSearchValue] = useState("");
  const handleSearchPools = (e: any) => {
    setSearchValue(e.target.value);
  };

  const [textValue, setTetxValue] = useState("");
  const handleChangeTextSearchPool = (e: any) => {
    setTetxValue(e.target.value);
    setValue("search", e.target.value);
  };

  const handleApplySearchPools = (text: any) => {
    setSearchValue(text);
    setValue("search", "");
  };

  return (
    <LaunchpadWapper>
      <LiquidityContainer>
        <KeyvisualCommon
          title="Kibble launchpad"
          description={
            isMobile
              ? "Exclusive support for the \nlaunch of base-TON projects"
              : "Exclusive support for the launch of base-TON projects"
          }
          image={
            isMobile
              ? "/static/gif-lauch.gif"
              : theme === "light"
              ? "/static/img-lauch-2.png"
              : "/static/img-lauch.png"
          }
          buttonText="Launch your project"
          buttonLink="#"
          buttonIcon={""}
        />
        <LiquidityWrapper>
          <ExplorePoolsWapper>
            <ExplorePoolHeader>
              {!isMobile && (
                <h1>
                  EXPLORE POOLS
                  <span>4</span>
                </h1>
              )}
              <TabsSelector
                data={TabsTitle}
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
                        borderRadius: "6px",
                      }}
                    >
                      {!isMobile && (
                        <LabelForm
                          style={{
                            left: "10px",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "15px",
                              fontFamily: "Syne",
                            }}
                          >
                            Search
                          </span>
                        </LabelForm>
                      )}
                      <Controller
                        name="search"
                        control={control}
                        render={({ field }: any) => (
                          <InputCommon
                            {...field}
                            placeHolder="Search by name"
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
                            onChange={handleChangeTextSearchPool}
                          />
                        )}
                      />
                    </FormInput>
                  </SearchBox>
                </LiquidityBoxSearch>
              )}
            </ExplorePoolHeader>
            <div
              style={{
                marginTop: "20px",
              }}
            >
              {handleChangeTabs()}
            </div>
          </ExplorePoolsWapper>
          {!isMobile && (
            <StatusBar>
              <FillterBart className={theme}>
                <figure>
                  <img src={"/static/gif-lauch.gif"} alt="gif" />
                </figure>
                <SearchBox
                  className={theme}
                  style={{
                    marginBottom: "10px",
                  }}
                >
                  <FormInput
                    style={{
                      width: "100%",
                      background: "#141518",
                      borderRadius: "6px",
                    }}
                  >
                    {/* <LabelForm
                      style={{
                        left: "10px",
                        background: "#141518",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "15px",
                          fontFamily: "Syne",
                        }}
                      >
                        Search
                      </span>
                    </LabelForm> */}
                    <Controller
                      name="search"
                      control={control}
                      render={({ field }: any) => (
                        <InputCommon
                          {...field}
                          placeHolder="Search by name"
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
                          onChange={handleChangeTextSearchPool}
                        />
                      )}
                    />
                  </FormInput>
                  <span className="search">Search</span>
                </SearchBox>
                <ButtonCommon
                  onClick={() => {
                    handleApplySearchPools(textValue);
                  }}
                >
                  <p
                    style={{
                      marginRight: "5px",
                    }}
                  >
                    Search{" "}
                  </p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path
                      d="M13.5039 12.7377L11.2123 10.4972L11.1586 10.4155C11.0587 10.3161 10.9221 10.2601 10.7796 10.2601C10.6371 10.2601 10.5005 10.3161 10.4007 10.4155C8.45315 12.2022 5.45226 12.2993 3.38817 10.6425C1.32407 8.98561 0.837275 6.08891 2.25062 3.87344C3.66396 1.65798 6.53888 0.811226 8.96873 1.89475C11.3986 2.97828 12.6294 5.65586 11.8448 8.15172C11.7883 8.33203 11.8345 8.52811 11.966 8.66611C12.0975 8.8041 12.2942 8.86304 12.4822 8.82072C12.6702 8.7784 12.8208 8.64126 12.8773 8.46095C13.8151 5.49909 12.3987 2.3117 9.54424 0.9607C6.68982 -0.390297 3.25406 0.500544 1.45953 3.05694C-0.33499 5.61333 0.0502822 9.06809 2.36612 11.1863C4.68195 13.3046 8.23335 13.4506 10.7229 11.5299L12.7519 13.5137C12.9615 13.7177 13.3003 13.7177 13.5098 13.5137C13.7192 13.3068 13.7192 12.9737 13.5098 12.7669L13.5039 12.7377Z"
                      fill="#F7F7F8"
                    />
                  </svg>
                </ButtonCommon>
              </FillterBart>
            </StatusBar>
          )}
        </LiquidityWrapper>
      </LiquidityContainer>
    </LaunchpadWapper>
  );
};

export default Liquidity;
const TabsTitle = [
  {
    title: "IDO",
    value: 1,
    label: `3`,
  },
  {
    title: "Fair launch",
    value: 2,
    label: `1`,
  },
];
