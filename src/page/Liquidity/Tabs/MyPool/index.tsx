import { MyPoolPosition, TabMyPoolContainer } from "./styled";
import { useContext, useEffect, useState } from "react";
import { NoData, PoolInfoTitle, PoolsFarmAndFee, PoolsImage, PoolsInfo, PoolsInfoFee } from "../Pools/styled";
import default_token_image from "../../../../assets/Dashboard/Common/default-token-image.png";
import { KIBBLE_API } from "../../../../services/api";
import { useTonAddress } from "@tonconnect/ui-react";
import EmptyData from "../../../../assets/gif/empty.gif";
import { ContextProviderWrapper, TableCommon, convertFixed } from "@kibble-exchange/uikit";

const TabMyPool = ({ poolsWithLpBalance, assets }: any) => {
  const { isMobile, isTablet, theme } = useContext(ContextProviderWrapper)!;
  const walletAddress = useTonAddress();

  const [loadingApi, setLoadingApi] = useState(false);
  const [undefinedAddress, setUndefinedAddress] = useState<any>([]);
  const [arrayUndefinedAddress, setArrayUndefinedAddress] = useState<any>([]);
  const handleGetInfoToken = async () => {
    setLoadingApi(true);
    const params = {
      wallet_address: walletAddress,
      addresses: undefinedAddress,
    };
    try {
      const res = await KIBBLE_API.searchToken(params);
      if (res.status === 200) {
        const { assets } = res.data;
        setArrayUndefinedAddress(assets);
        setLoadingApi(false);
      }
    } catch (error) {
      console.log(error);
      setLoadingApi(false);
    }
  };

  useEffect(() => {
    const arrayUndefined: any = [];
    if (poolsWithLpBalance?.length > 0) {
      poolsWithLpBalance?.map((item: any) => {
        if (
          assets[item.token0_address] !== undefined &&
          assets[item.token1_address] === undefined
        ) {
          arrayUndefined.push(item.token1_address);
        } else if (
          assets[item.token0_address] === undefined &&
          assets[item.token1_address] !== undefined
        ) {
          arrayUndefined.push(item.token0_address);
        }
      });
    }
    setUndefinedAddress(arrayUndefined);
  }, [poolsWithLpBalance]);

  useEffect(() => {
    if (undefinedAddress?.length > 0 && !loadingApi) {
      handleGetInfoToken();
    }
  }, [undefinedAddress]);

  const headingData = [
    {
      name: `Pool name`,
      dataIndex: "",
      key: "",
      render: ({ token0_address, token1_address,lp_fee }: any) => {
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              width: isMobile ? "auto" : isTablet ? "130px" : "180px",
            }}
          >
            <PoolsImage className={theme}>
              <figure>
                {!loadingApi ? (
                  <>
                    {assets[token0_address] === undefined ? (
                      <>
                        {arrayUndefinedAddress?.map((item: any, index: any) => {
                          if (item.contract_address === token0_address) {
                            return (
                              <>
                                <img
                                  key={index}
                                  width={40}
                                  height={40}
                                  src={item.image_url}
                                  alt="icon"
                                  onError={(e) =>
                                    (e.currentTarget.src = default_token_image)
                                  }
                                />
                              </>
                            );
                          }
                        })}
                      </>
                    ) : (
                      <>
                        <img
                          width={40}
                          height={40}
                          src={assets && assets[token0_address]?.image_url}
                          alt="icon"
                          onError={(e) =>
                            (e.currentTarget.src = default_token_image)
                          }
                        />
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <img
                      width={40}
                      height={40}
                      src={default_token_image}
                      alt="icon"
                    />
                  </>
                )}
              </figure>
              <figure>
                {!loadingApi ? (
                  <>
                    {assets[token1_address] === undefined ? (
                      <>
                        {arrayUndefinedAddress?.map((item: any, index: any) => {
                          if (item.contract_address === token1_address) {
                            return (
                              <img
                                key={index}
                                width={40}
                                height={40}
                                src={item.image_url}
                                alt="icon"
                                onError={(e) =>
                                  (e.currentTarget.src = default_token_image)
                                }
                              />
                            );
                          }
                        })}
                      </>
                    ) : (
                      <>
                        <img
                          width={40}
                          height={40}
                          src={assets && assets[token1_address]?.image_url}
                          alt="icon"
                          onError={(e) =>
                            (e.currentTarget.src = default_token_image)
                          }
                        />
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <img
                      width={40}
                      height={40}
                      src={default_token_image}
                      alt="icon"
                    />
                  </>
                )}
              </figure>
            </PoolsImage>
            <PoolsInfo className={theme}>
              <p>
                {!loadingApi ? (
                  <>
                    {assets[token0_address] === undefined ? (
                      <>
                        {arrayUndefinedAddress.map((item: any) => {
                          if (item.contract_address === token0_address) {
                            return <>{item.symbol || "???"}</>;
                          }
                        })}
                      </>
                    ) : (
                      <>{assets && (assets[token0_address]?.symbol || "???")}</>
                    )}{" "}
                    /{" "}
                    {assets[token1_address] === undefined ? (
                      <>
                        {arrayUndefinedAddress.map((item: any) => {
                          if (item.contract_address === token1_address) {
                            return <>{item.symbol || "???"}</>;
                          }
                        })}
                      </>
                    ) : (
                      <>{assets && (assets[token1_address]?.symbol || "???")}</>
                    )}
                  </>
                ) : (
                  <>???</>
                )}
              </p>
              <PoolsFarmAndFee>
                {/* <PoolsInfoFarm>
                  Farm <span>{lp_fee / 100}</span>%
                </PoolsInfoFarm> */}
                <PoolsInfoFee className={theme}>
                  LP Fee <span>{lp_fee / 100}</span>%
                </PoolsInfoFee>
              </PoolsFarmAndFee>
            </PoolsInfo>
          </div>
        );
      },
    },
    // {
    //   name: `Position`,
    //   dataIndex: "",
    //   key: "",
    //   render: ({
    //     reserve0,
    //     reserve1,
    //     token0_address,
    //     token1_address,
    //     lp_balance,
    //     lp_total_supply,
    //   }: any) => {
    //     const asset0 = assets[token0_address];
    //     const asset1 = assets[token1_address];
    //     const sharePercent = ((lp_balance ?? 0) / lp_total_supply) * 100;
    //     const token0Position = Coins.fromNano(
    //       ((reserve0 * sharePercent) / 100).toFixed(0),
    //       asset0?.decimals
    //     );
    //     const token1Position = Coins.fromNano(
    //       ((reserve1 * sharePercent) / 100).toFixed(),
    //       asset1?.decimals
    //     );
    //     return (
    //       <MyPoolPosition className={theme}>
    //         <PoolInfoTitle>Position</PoolInfoTitle>
    //         <div>
    //           <Value value={Number(token0Position)} />
    //           {!loadingApi ? (
    //             <>
    //               {assets[token0_address] === undefined ? (
    //                 <>
    //                   {arrayUndefinedAddress.map((item: any, index: any) => {
    //                     if (item.contract_address === token0_address) {
    //                       return (
    //                         <img
    //                           key={index}
    //                           width={40}
    //                           height={40}
    //                           src={item.image_url}
    //                           alt="icon"
    //                           onError={(e) =>
    //                             (e.currentTarget.src = default_token_image)
    //                           }
    //                         />
    //                       );
    //                     }
    //                   })}
    //                 </>
    //               ) : (
    //                 <>
    //                   <img
    //                     width={40}
    //                     height={40}
    //                     src={assets && assets[token0_address]?.image_url}
    //                     alt="icon"
    //                     onError={(e) =>
    //                       (e.currentTarget.src = default_token_image)
    //                     }
    //                   />
    //                 </>
    //               )}
    //             </>
    //           ) : (
    //             <>
    //               <img
    //                 width={40}
    //                 height={40}
    //                 src={default_token_image}
    //                 alt="icon"
    //                 onError={(e) => (e.currentTarget.src = default_token_image)}
    //               />
    //             </>
    //           )}
    //           /
    //           {!loadingApi ? (
    //             <>
    //               {assets[token1_address] === undefined ? (
    //                 <>
    //                   {arrayUndefinedAddress.map((item: any, index: any) => {
    //                     if (item.contract_address === token1_address) {
    //                       return (
    //                         <img
    //                           key={index}
    //                           width={40}
    //                           height={40}
    //                           src={item.image_url}
    //                           alt="icon"
    //                           onError={(e) =>
    //                             (e.currentTarget.src = default_token_image)
    //                           }
    //                         />
    //                       );
    //                     }
    //                   })}
    //                 </>
    //               ) : (
    //                 <>
    //                   <img
    //                     width={40}
    //                     height={40}
    //                     src={assets && assets[token1_address]?.image_url}
    //                     alt="icon"
    //                     onError={(e) =>
    //                       (e.currentTarget.src = default_token_image)
    //                     }
    //                   />
    //                 </>
    //               )}
    //             </>
    //           ) : (
    //             <>
    //               <img
    //                 width={40}
    //                 height={40}
    //                 src={default_token_image}
    //                 alt="icon"
    //                 onError={(e) => (e.currentTarget.src = default_token_image)}
    //               />
    //             </>
    //           )}
    //           <Value value={Number(token1Position)} />
    //         </div>
    //       </MyPoolPosition>
    //     );
    //   },
    // },
    {
      name: `APR`,
      dataIndex: "apy_1d",
      key: "apy_1d",
      render: (apy_1d: any) => {
        return (
          <p>
            <PoolInfoTitle>APR</PoolInfoTitle>
            {Number(apy_1d * 100).toFixed(2)}%
          </p>
        );
      },
    },
    // {
    //   name: `Share in pool`,
    //   dataIndex: "",
    //   key: "",
    //   render: ({ lp_balance, lp_total_supply }: any) => {
    //     const sharePercent = ((lp_balance ?? 0) / lp_total_supply) * 100;
    //     return (
    //       <p>
    //         <PoolInfoTitle>Share in pool</PoolInfoTitle>
    //         <span>{`${sharePercent.toFixed(2)}%`}</span>
    //       </p>
    //     );
    //   },
    // },
    {
      name: `Total value blocked`,
      dataIndex: "tvl",
      key: "tvl",
      render: (tvl: any) => {
        return (
          <p>
            <PoolInfoTitle>TVL</PoolInfoTitle>${Number.isNaN(Number(tvl)) ? 0 : convertFixed(Number(tvl))}
          </p>
        );
      },
    },
    {
      name: `Volume 24h`,
      dataIndex: "volume_24h_usd",
      key: "volume_24h_usd",
      render: (volume_24h_usd: any) => {
        return (
          <p>
            <PoolInfoTitle>
              Volume <span className="font-DMMono">24</span>h
            </PoolInfoTitle>
            ${Number.isNaN(Number(volume_24h_usd)) ? 0 : convertFixed(Number(volume_24h_usd))}
          </p>
        );
      },
    },
  ];

  const moveToDetail = "/liquidity/details";

  return (
    <TabMyPoolContainer>
      {poolsWithLpBalance?.length > 0 ? (
        <TableCommon
          data={poolsWithLpBalance}
          heading={headingData}
          moveTo={moveToDetail}
        />
      ) : (
        <NoData className={theme}>
          <img src={EmptyData} alt="No Data" />
          <p className="title-nodata">No data</p>
          <p className="text-nodata">
            You haven't added Liquidity yet. Please add it to your preferred
            token pairs
          </p>
        </NoData>
      )}
    </TabMyPoolContainer>
  );
};

export default TabMyPool;
