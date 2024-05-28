import { Controller, useForm } from "react-hook-form";
import {
  ChooseTokenContainer,
  ChooseTokenExternalLink,
  ChooseTokenSearch,
  ChooseTokenWrapper,
  FavoriteToken,
  FavoriteWrapper,
  LikeButton,
  LikeRemove,
  TokenAction,
  TokenList,
  TokenNewInfo,
} from "./styled";
import { useContext, useEffect, useRef, useState } from "react";
import {
  useGetAssetsQuery,
  useGetBalancesQuery,
  useGetPoolsQuery,
} from "../../../store/api/dexApiSlice";
import { Asset, Pool } from "../../../store/api/dexApiTypes";
import search_icon from "../../../assets/Dashboard/Common/search_icon.svg";
import LoadingSpin from "../../../components/Common/Loading";
import { KIBBLE_API } from "../../../services/api";
import toast from "react-hot-toast";
import default_token_image from "../../../assets/Dashboard/Common/default-token-image.png";
import { useTonAddress, useTonWallet } from "@tonconnect/ui-react";
import { Coins } from "ton3-core";
import { Link, useNavigate } from "react-router-dom";
import external_link_white from "../../../assets/Dashboard/Common/external_link_white.svg";
import clear from "../../../assets/Dashboard/Common/clear.svg";
import _ from "lodash";
import { ContextProviderWrapper, InputCommon, convertFixed } from "@kibble-exchange/uikit";

export type TokenModalProps = {
  setCurrentAsset: (x: string) => void;
  otherCurrentAssetKey: string;
  setOtherCurrentAsset?: (x: string) => void;
  isFromModal?: boolean;
  setOpenFromModal?: any;
  setAmountFrom?: any;
  setAmountTo?: any;
  // For liq page
  isLiq?: any;
  isModal?: any;
  // Favorite
  listFavorite?: any;
  setListFavorite?: any;
  // Checking token
  setCheckingToken?: any;
};

type FormValuesProps = {
  search: string;
};

const ChooseToken = ({
  isFromModal = false,
  otherCurrentAssetKey,
  setCurrentAsset,
  setOtherCurrentAsset,
  setOpenFromModal,
  setAmountFrom,
  setAmountTo,
  isLiq,
  isModal,
  listFavorite,
  setListFavorite,
  setCheckingToken,
}: TokenModalProps) => {
  const { theme } = useContext(ContextProviderWrapper)!;
  const defaultValues = {
    search: "",
  };

  const methods = useForm<FormValuesProps>({
    defaultValues,
    mode: "onChange",
  });
  const wallet = useTonWallet();
  const walletAddress: any = useTonAddress();
  const { control, watch, reset } = methods;

  const {
    data: pools,
    isLoading: loadingPools,
    // isFetching: isFetchingPools,
  } = useGetPoolsQuery();
  const {
    data: assets,
    isLoading: loadingAssets,
    // isFetching: isFetchingAssets,
    refetch: refetchAssets,
  } = useGetAssetsQuery(walletAddress ? walletAddress?.toString() : undefined);

  const [displayAssets, setDisplayAssets] = useState<Asset[]>([]);
  const poolByAssetsAddressesHashMap = new Map<string, Map<string, Pool>>();
  const search = useRef("");
  search.current = watch("search", "value");
  const { data: balances, isLoading: loadingBalances } = useGetBalancesQuery(
    walletAddress,
    {
      skip: !wallet,
    }
  );

  for (const pool of pools || []) {
    if (!poolByAssetsAddressesHashMap.has(pool.token0_address)) {
      poolByAssetsAddressesHashMap.set(pool.token0_address, new Map());
    }
    if (!poolByAssetsAddressesHashMap.has(pool.token1_address)) {
      poolByAssetsAddressesHashMap.set(pool.token1_address, new Map());
    }
    poolByAssetsAddressesHashMap
      .get(pool.token0_address)
      ?.set(pool.token1_address, pool);
    poolByAssetsAddressesHashMap
      .get(pool.token1_address)
      ?.set(pool.token0_address, pool);
  }

  useEffect(() => {
    let newDisplayAssets: Asset[] = [];

    if (isFromModal) {
      newDisplayAssets = Object.values(assets ?? {});
    } else {
      for (const asset_key in assets) {
        const asset = assets[asset_key];
        if (asset.contract_address === otherCurrentAssetKey) {
          continue;
        }
        if (
          (poolByAssetsAddressesHashMap.has(asset_key) && isFromModal) ||
          poolByAssetsAddressesHashMap.get(asset_key)?.has(otherCurrentAssetKey)
        ) {
          newDisplayAssets.push(asset);
        }
       
      }
    }

    if (search.current) {
      newDisplayAssets = newDisplayAssets.filter(
        (asset) =>
          asset.display_name
            ?.toLowerCase()
            .includes(search.current.toLowerCase()) ||
          asset.symbol.toLowerCase().includes(search.current.toLowerCase()) ||
          asset.contract_address
            .toLowerCase()
            .includes(search.current.toLowerCase())
      );
    }

    setDisplayAssets(newDisplayAssets);
  }, [pools, assets, search.current, otherCurrentAssetKey, isFromModal]);

  const [loadingState, setLoadingState] = useState(true);

  useEffect(() => {
    if (!loadingPools && !loadingAssets) {
      setLoadingState(false);
    }
  }, [loadingPools, loadingAssets]);

  const changeSelected = async (assetContractAddress: string) => {
    setCurrentAsset(assetContractAddress);
    const getSelectedFromLocal = JSON.parse(
      localStorage.getItem("selectedTokens") || "{}"
    );
    const selectedTokens = {
      from: isModal === 1 ? assetContractAddress : getSelectedFromLocal.from,
      to: isModal === 2 ? assetContractAddress : getSelectedFromLocal.to,
    };
    localStorage.setItem("selectedTokens", JSON.stringify(selectedTokens));
    handleCheckExistToken();
    setOpenFromModal(false);
    setAmountFrom(0);
    setAmountTo(0);
  };

  // Handle add new Info Token
  const [infoNewToken, setInfoNewToken] = useState<any>({});
  const [loadingApi, setLoadingApi] = useState(false);
  const handleGetInfoToken = async () => {
    setLoadingApi(true);
    const params = {
      wallet_address: walletAddress,
      addresses: [search.current],
    };
    try {
      const res = await KIBBLE_API.searchToken(params);
      if (res.status === 200) {
        const { assets } = res.data;
        setInfoNewToken(assets[0]);
        setLoadingApi(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Please check again your contract", { id: "InfoToken" });
      setLoadingApi(false);
    }
  };

  const handleCheckTokenExist = () => {
    const checkTokenExist = displayAssets.filter((item: any) => {
      return item.contract_address === search.current;
    });
    if (checkTokenExist.length > 0) {
      return;
    } else {
      handleGetInfoToken();
      setInfoNewToken({});
    }
  };

  const [saveSearch, setSaveSearch] = useState("");

  useEffect(() => {
    if (
      search.current.length > 47 &&
      // saveSearch !== search.current &&
      assets &&
      assets[search.current] === undefined
    ) {
      handleCheckTokenExist();
      setSaveSearch(search.current);
    } else {
      setInfoNewToken({});
    }
  }, [search.current, saveSearch]);

  // Handle add new token
  const handleAddNewToken = async () => {
    const params = {
      wallet_address: walletAddress,
      token_address: search.current,
    };
    try {
      const res = await KIBBLE_API.addNewAssetToken(params);
      if (res.status === 200) {
        refetchAssets();
        reset();
        setOpenFromModal(false);
        changeSelected(search.current);
      }
    } catch (error) {
      console.log(error);
      setLoadingApi(false);
      toast.error("Add token error");
    }
  };

  const navigate = useNavigate();
  const handleCheckExistToken = async () => {
    const getSelectedFromLocal = JSON.parse(
      localStorage.getItem("selectedTokens") || "{}"
    );
    const params = {
      token0_address: getSelectedFromLocal.from,
      token1_address: getSelectedFromLocal.to,
    };
    try {
      const res = await KIBBLE_API.checkTokenInPools(params);
      if (res.status === 200) {
        const result = res.data.is_existed;
        if (!isLiq) {
          setCheckingToken(result);
        }
        if (!result && !isLiq && walletAddress) {
          toast.error("Token didn't exists in pool, you cannot swap", {
            id: "notExist",
          });
        }
        if (isLiq) {
          if (result) {
            navigate(
              `/liquidity/provide`
            );
          } else {
            navigate(
              `/liquidity/init`
            );
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isModal === 1) {
      handleCheckExistToken();
    }
  }, []);

  // Map balance from data into displayAssets
  const updatedDisplayAssets = displayAssets.map((asset) => {
    const updatedAsset = { ...asset };
    if (balances && !loadingBalances) {
      updatedAsset.balance = balances[asset.contract_address] || 0;
    }
    return updatedAsset;
  });

  // remove same item in listFavorite
  const uniqueFavorites = listFavorite?.filter(
    (item: any, index: any, self: any) =>
      index ===
      self.findIndex((t: any) => t.contract_address === item.contract_address)
  );

  useEffect(() => {
    const storedFavorites: any = JSON.parse(
      localStorage.getItem("listFavorite") || "[]"
    );
    if (storedFavorites.length > 0 && setListFavorite) {
      setListFavorite(storedFavorites);
    }
  }, []);

  useEffect(() => {
    if (uniqueFavorites?.length > 0) {
      localStorage.setItem("listFavorite", JSON.stringify(listFavorite));
    }
  }, [listFavorite]);

  // Handle favorite token
  const handleAddToFavorites = (asset: any) => {
    const updatedFavorites = [
      ...uniqueFavorites,
      { ...asset, is_favorite: true },
    ];
    localStorage.setItem("listFavorite", JSON.stringify(updatedFavorites));
    setListFavorite(updatedFavorites);
  };

  const handleRemoveFromFavorites = (contractAddress: any) => {
    const updatedFavorites = uniqueFavorites.filter(
      (item: any) => item.contract_address !== contractAddress
    );
    localStorage.setItem("listFavorite", JSON.stringify(updatedFavorites));
    setListFavorite(updatedFavorites);
  };

  return (
    <ChooseTokenContainer>
      <ChooseTokenWrapper className={theme}>
        <FavoriteWrapper className={theme}>
          <p>Favorite</p>
          {uniqueFavorites?.length < 1 ? (
            <p>You don't have any favorite token</p>
          ) : (
            <FavoriteToken className={theme}>
              {uniqueFavorites.map((asset: any, index: any) => {
                return (
                  <li
                    onClick={() => {
                      changeSelected(asset.contract_address);
                    }}
                    key={index}
                  >
                    <figure>
                      <img
                        src={asset.image_url}
                        alt="icon"
                        onError={(e) =>
                          (e.currentTarget.src = default_token_image)
                        }
                      />
                    </figure>
                    <p>{asset.symbol}</p>
                    <LikeRemove
                      onClick={(e) => {
                        handleRemoveFromFavorites(asset.contract_address);
                        e.stopPropagation();
                      }}
                    >
                      -
                    </LikeRemove>
                  </li>
                );
              })}
            </FavoriteToken>
          )}
        </FavoriteWrapper>
        <ChooseTokenSearch className={theme}>
          <Controller
            name="search"
            control={control}
            render={({ field }: any) => (
              <InputCommon
                {...field}
                disabled={loadingState ? true : false}
                placeHolder="Search by symbol or name..."
                name="search"
                allowClear={{ clearIcon: <img src={clear} alt="icon" /> }}
                prefix={<img src={search_icon} alt="icon" />}
              />
            )}
          />
          <p>
            <span>Search token</span>
          </p>
        </ChooseTokenSearch>
        {/* Loading for waiting until assets and pools api done */}
        {displayAssets.length < 1 && loadingApi && loadingState && (
          <LoadingSpin />
        )}
        {/* Loading for waiting when search contract */}
        {displayAssets.length < 1 &&
          loadingApi &&
          search.current.length === 48 && <LoadingSpin />}
        {Object.keys(infoNewToken).length > 0 ? (
          <>
            <TokenNewInfo>
              <div>
                <figure>
                  <img
                    src={infoNewToken.image_url}
                    alt={infoNewToken.display_name}
                    onError={(e) => (e.currentTarget.src = default_token_image)}
                  />
                </figure>
                <div>
                  <p>{infoNewToken.display_name}</p>
                  <p>{infoNewToken.symbol}</p>
                </div>
              </div>
              <p onClick={handleAddNewToken}>Add</p>
            </TokenNewInfo>
          </>
        ) : (
          <></>
        )}
        {loadingState ? (
          <LoadingSpin />
        ) : (
          <>
            <TokenList className={theme}>
              {search.current.length === 48 ? (
                <>
                  {Object.values(updatedDisplayAssets || {})
                    .filter((item) => item.contract_address === search.current)
                    .map((asset, index) => {
                      return (
                        <li
                          onClick={() => {
                            changeSelected(asset.contract_address);
                          }}
                          key={index}
                        >
                          <div>
                            <figure>
                              <img
                                src={asset.image_url}
                                alt="icon"
                                onError={(e) =>
                                  (e.currentTarget.src = default_token_image)
                                }
                              />
                            </figure>
                            <div>
                              <p>{asset.symbol}</p>
                              <span>{asset.display_name}</span>
                            </div>
                          </div>
                          <TokenAction className={theme}>
                            <div>
                              <p>
                                {convertFixed(
                                  Number(
                                    Coins.fromNano(
                                      asset.balance,
                                      asset?.decimals
                                    )
                                  )
                                )}
                              </p>
                              <p>
                                $
                                {Number(
                                  asset?.dex_price_usd *
                                    Number(
                                      Coins.fromNano(
                                        asset.balance,
                                        asset?.decimals
                                      )
                                    )
                                ).toFixed(2)}
                              </p>
                            </div>
                          </TokenAction>
                        </li>
                      );
                    })}
                </>
              ) : (
                <>
                  {Object.values(updatedDisplayAssets || {})
                    .filter(
                      (item) => item.contract_address !== otherCurrentAssetKey
                    )
                    .sort((a, b) => {
                      if (a.balance > 0 && b.balance === 0) {
                        return -1;
                      } else if (a.balance === 0 && b.balance > 0) {
                        return 1;
                      }
                      return b.balance - a.balance;
                    })
                    .map((asset, index) => {
                      return (
                        <li
                          onClick={() => {
                            changeSelected(asset.contract_address);
                          }}
                          key={index}
                        >
                          <div>
                            <figure>
                              <img
                                src={asset.image_url}
                                alt="icon"
                                onError={(e) =>
                                  (e.currentTarget.src = default_token_image)
                                }
                              />
                            </figure>
                            <div>
                              <p>
                                {asset.symbol}
                                <Link
                                  target="_blank"
                                  to={`https://tonviewer.com/${asset.contract_address}`}
                                >
                                  <img src={external_link_white} alt="icon" />
                                </Link>
                              </p>
                              <ChooseTokenExternalLink
                                onClick={(e: any) => e.stopPropagation()}
                              >
                                <span>{asset.display_name}</span>
                              </ChooseTokenExternalLink>
                            </div>
                          </div>
                          <TokenAction className={theme}>
                            <div>
                              <p>
                                {convertFixed(
                                  Number(
                                    Coins.fromNano(
                                      asset.balance,
                                      asset?.decimals
                                    )
                                  )
                                )}
                              </p>
                              <p>
                                $
                                {Number(
                                  asset?.dex_price_usd *
                                    Number(
                                      Coins.fromNano(
                                        asset.balance,
                                        asset?.decimals
                                      )
                                    )
                                ).toFixed(2)}
                              </p>
                            </div>
                            <LikeButton
                              className={
                                uniqueFavorites?.some(
                                  (item: any) =>
                                    item.is_favorite &&
                                    item.contract_address ===
                                      asset.contract_address
                                )
                                  ? `active ${theme}`
                                  : theme
                              }
                              onClick={(e) => {
                                if (
                                  JSON.parse(
                                    localStorage.getItem("listFavorite") || "[]"
                                  ).some(
                                    (item: any) =>
                                      item.contract_address ===
                                      asset.contract_address
                                  )
                                ) {
                                  handleRemoveFromFavorites(
                                    asset.contract_address
                                  );
                                } else {
                                  handleAddToFavorites(asset);
                                }
                                e.stopPropagation();
                              }}
                            />
                          </TokenAction>
                        </li>
                      );
                    })}
                </>
              )}
            </TokenList>
          </>
        )}
      </ChooseTokenWrapper>
    </ChooseTokenContainer>
  );
};

export default ChooseToken;
