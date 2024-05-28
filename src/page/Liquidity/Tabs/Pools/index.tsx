import {
  MyLiquidityWrapper,
  NoData,
  PoolInfoTitle,
  PoolsFarmAndFee,
  PoolsImage,
  PoolsInfo,
  PoolsInfoFee,
  TabPoolsContainer,
} from "./styled";
import default_token_image from "../../../../assets/Dashboard/Common/default-token-image.png";
import EmptyData from "../../../../assets/gif/empty.gif";
import { useContext } from "react";
// import { ContextProviderWrapper } from "../../../../components/Context";
import { ContextProviderWrapper, TableCommon, convertFixed } from "@kibble-exchange/uikit";

const TabPools = ({ assetsInfo, filteredPools, searchValue }: any) => {
  const { theme } = useContext(ContextProviderWrapper)!;
  const headingData = [
    {
      name: `Pool name`,
      dataIndex: "",
      key: "",
      render: ({ token0_address, token1_address, lp_fee }: any) => {
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <PoolsImage className={theme}>
              <figure>
                {assetsInfo ? (
                  <img
                    width={40}
                    height={40}
                    src={assetsInfo && assetsInfo[token0_address].image_url}
                    alt="icon"
                    onError={(e) => (e.currentTarget.src = default_token_image)}
                  />
                ) : (
                  <img
                    width={40}
                    height={40}
                    src={default_token_image}
                    alt="icon"
                    onError={(e) => (e.currentTarget.src = default_token_image)}
                  />
                )}
              </figure>
              <figure>
                {assetsInfo ? (
                  <img
                    width={40}
                    height={40}
                    src={assetsInfo && assetsInfo[token1_address].image_url}
                    alt="icon"
                    onError={(e) => (e.currentTarget.src = default_token_image)}
                  />
                ) : (
                  <img
                    width={40}
                    height={40}
                    src={default_token_image}
                    alt="icon"
                    onError={(e) => (e.currentTarget.src = default_token_image)}
                  />
                )}
              </figure>
            </PoolsImage>
            <PoolsInfo className={theme}>
              <p>
                {assetsInfo && assetsInfo[token0_address].symbol} /{" "}
                {assetsInfo && assetsInfo[token1_address].symbol}
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
    {
      name: `APR 24h`,
      dataIndex: "apy_1d",
      key: "apy_1d",
      render: (apy_1d: any) => {
        return (
          <p>
            <PoolInfoTitle>APR</PoolInfoTitle>
            {Number(convertFixed(Number(apy_1d * 100))).toFixed(2)}%
          </p>
        );
      },
    },
    {
      name: `Total value blocked`,
      dataIndex: "tvl",
      key: "tvl",
      render: (tvl: any) => {
        return (
          <p>
            <PoolInfoTitle>TVL</PoolInfoTitle>${convertFixed(Number(tvl))}
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
            ${convertFixed(Number(volume_24h_usd))}
          </p>
        );
      },
    },
    {
      name: `My liquidity`,
      dataIndex: "",
      key: "",
      render: () => {
        return (
          <MyLiquidityWrapper className={theme}>
            <PoolInfoTitle>My Liquidity</PoolInfoTitle>
            <p>$0</p>
          </MyLiquidityWrapper>
        );
      },
    },
  ];

  const moveToDetail = "/liquidity/details";

  return (
    <TabPoolsContainer>
      {filteredPools?.length > 0 ? (
        <TableCommon
          data={
            searchValue.length > 0
              ? filteredPools
                  .sort((a: any, b: any) => {
                    return b.volume_24h_usd - a.volume_24h_usd;
                  })
                  .filter((item: any) => {
                    const searchLower = searchValue.toLowerCase();
                    const token0Symbol =
                      assetsInfo[item.token0_address]?.symbol?.toLowerCase() ||
                      "";
                    const token1Symbol =
                      assetsInfo[item.token1_address]?.symbol?.toLowerCase() ||
                      "";
                    return (
                      // item.address?.toLowerCase().includes(searchLower) ||
                      // item.token0_address
                      //   ?.toLowerCase()
                      //   .includes(searchLower) ||
                      // item.token1_address
                      //   ?.toLowerCase()
                      //   .includes(searchLower) ||
                      token0Symbol.includes(searchLower) ||
                      token1Symbol.includes(searchLower)
                    );
                  })
              : filteredPools.sort((a: any, b: any) => {
                  return b.volume_24h_usd - a.volume_24h_usd;
                })
          }
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
    </TabPoolsContainer>
  );
};

export default TabPools;
