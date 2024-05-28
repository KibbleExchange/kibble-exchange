import { useContext, useEffect, useState } from "react";
import {
  Info,
  TabInfo,
  WalletActions,
  WalletAddress,
  WalletAssetItem,
  WalletAssetToken,
  WalletAssets,
  WalletBalance,
  WalletInfoStyle,
  WalletList,
  WalletParent,
} from "./styled";
import CopyToClipboard from "react-copy-to-clipboard";
import { toast } from "react-hot-toast";
import { CopyOutlined } from "@ant-design/icons";
import TextBalance from "../../Common/TextBalance";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { Link } from "react-router-dom";
import { Coins } from "ton3-core";
import { useGetAssetsQuery } from "../../../store/api/dexApiSlice";
import { useBalance } from "../../../hooks/useBalance";
import Loading from "../../Loading";
import { ButtonCommon, ContextProviderWrapper, convertFixed, shortenAddress } from "@kibble-exchange/uikit";

const TABFILTER = [
  {
    id: 1,
    value: 0,
    text: "Wallet info",
  },
  {
    id: 2,
    value: 1,
    text: "Your assets",
  },
];
const TON_ADDRESS: any = process.env.REACT_APP_TON_ADDRESS;
export default function WalletInfo({ address, onCloseModal, balance }: any) {
  const {theme} = useContext(ContextProviderWrapper)!
  const { tonBalance } = useBalance();
  const [tabActive, setTabActive] = useState(0);
  const [balanceOfKibble, setValanceOfKibble] = useState(0);
  const [loading, setLoading] = useState(false);
  const [listAsset, setListAsset] = useState([]);
  const [tonConnectUI] = useTonConnectUI();
  const { data: assets }: any = useGetAssetsQuery(address?.toString() || "", {
    pollingInterval: 1000 * 60 * 10,
  });
  const handleDisconnect = async (e: any) => {
    e.stopPropagation();
    try {
      setLoading(true);
      await tonConnectUI.disconnect();
      setLoading(false);
      onCloseModal();
    } catch (error) {
      console.error("error", error);
    }
  };

  const handleInitModal = () => {
    if (!balance) return;
    const balanceKib = balance && balance[`${TON_ADDRESS}`];
    setValanceOfKibble(balanceKib);
    const listAssets: any = assets ? Object.entries(assets) : [];
    const updatedDisplayAssets = listAssets
      .map((asset: any) => {
        if (balance[asset[1].contract_address]) {
          return {
            ...asset[1],
            balance: balance[asset[1].contract_address] || 0,
          };
        }
      })
      .filter((item: any) => item)
      .sort((a: any, b: any) => b.balance - a.balance);
    setListAsset(updatedDisplayAssets);
  };

  useEffect(() => {
    handleInitModal();
  }, [balance]);

  return (
    <WalletInfoStyle>
      <TabInfo className={theme}>
        {TABFILTER.map((item, index) => {
          return (
            <li
              className={item.value === tabActive ? "active" : ""}
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setTabActive(item.value);
              }}
            >
              {item.text}
            </li>
          );
        })}
      </TabInfo>
      {tabActive === 0 ? (
        <Info>
          <WalletAddress className={theme}>
            <div>
              <h1>
                Address:<span>{shortenAddress(address)}</span>
              </h1>
            </div>
            <CopyToClipboard
              text={address}
              onCopy={() => {
                toast.success("Copied !!");
              }}
            >
              <div
                style={{
                  marginRight: "14px",
                  color: "#92929E",
                  cursor: "pointer",
                }}
              >
                <span>Copy</span>
                <CopyOutlined />
              </div>
            </CopyToClipboard>
          </WalletAddress>
          <WalletBalance>
            <h2>TON balance</h2>
            {/* {balanceOfKibble && (
              <TextBalance
                unit={"KIB"}
                balance={convertFixed(
                  Number(Coins.fromNano(balanceOfKibble, 9))
                )}
              />
            )} */}
            {tonBalance && (
              <TextBalance
                balance={convertFixed(Number(tonBalance))}
                isImage
              />
            )}
          </WalletBalance>
          <WalletActions>
            <ButtonCommon
              background="#E94A4A"
              onClick={handleDisconnect}
              disabled={loading}
            >
              <Loading status={loading} content="Disconnect" />
            </ButtonCommon>
            <ButtonCommon onClick={onCloseModal}>
              <Link to={"/swap"}>
                <span
                  style={{
                    color: "#fff",
                  }}
                >
                  Go to Swap
                </span>
              </Link>
            </ButtonCommon>
          </WalletActions>
        </Info>
      ) : (
        <WalletAssets>
          <WalletParent>
            <WalletList>
              {listAsset.map((item: any, index: number) => {
                return (
                  <WalletAssetItem key={index} className={theme}>
                    <WalletAssetToken>
                      <h1>{item.symbol}</h1>
                      <h2>
                        {convertFixed(
                          Number(Coins.fromNano(item.balance, item?.decimals))
                        )}
                      </h2>
                    </WalletAssetToken>
                    <h2>
                      ~$
                      {Number(
                        item?.dex_price_usd *
                          Number(Coins.fromNano(item.balance, item?.decimals))
                      ).toFixed(2)}
                    </h2>
                  </WalletAssetItem>
                );
              })}
            </WalletList>
          </WalletParent>
        </WalletAssets>
      )}
    </WalletInfoStyle>
  );
}
