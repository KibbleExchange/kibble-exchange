import TitleCommon from "../../../components/Common/Title";
import {
  HistoryMain,
  HistoryStyle,
  HistoryTitle,
  HistoryTransactions,
  HistoryTransactionsList,
  TransactionsAction,
  TransactionsButton,
  TransactionsCount,
  TransactionsDetail,
  TransactionsDetailCouple,
  TransactionsDetailLine,
  TransactionsDetailStatus,
  TransactionsDetailTitle,
  TransactionsList,
  TransactionsTime,
  TransactionsTitle,
} from "./style";
import iconClose from "../../../assets/Dashboard/Swap/icon-close.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { useTonAddress } from "@tonconnect/ui-react";

export default function History({ onClose }: any) {
  const address = useTonAddress();
  const [indexShowDetailTx, setindexShowDetailTx] = useState<any>(-1);
  const [dataHistory, setDataHistory] = useState<any>([]);

  const handleGetHistory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/transactions?user_wallet=${address}&is_confirm=true`
      );
      setDataHistory(data);
    } catch (error) {
      console.log("errrr", error);
    }
  };

  useEffect(() => {
    handleGetHistory();
  }, []);

  return (
    <HistoryStyle>
      <HistoryMain>
        <HistoryTitle>
          <div className="img-close" onClick={onClose}>
            <img src={iconClose} alt="iconClose" />
          </div>
          <TitleCommon text={"Swap History"} />
        </HistoryTitle>
        <HistoryTransactionsList>
          {dataHistory.map((item: any, index: number) => {
            return (
              <HistoryTransactions
                key={index}
                style={{
                  height: indexShowDetailTx === index ? "230px" : "35px",
                }}
              >
                <TransactionsTitle>
                  <TransactionsTime>
                    <span>December, 15, 2024</span>
                    <h2>+ 1,097 KIB</h2>
                  </TransactionsTime>
                  <TransactionsAction>
                    <TransactionsCount>
                      <span>2 Transactions</span>
                    </TransactionsCount>
                    {indexShowDetailTx === index ? (
                      <TransactionsButton
                        onClick={() => {
                          setindexShowDetailTx(-1);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                        >
                          <rect
                            x="22"
                            y="22"
                            width="22"
                            height="22"
                            rx="11"
                            transform="rotate(-180 22 22)"
                            fill="#141518"
                          />
                          <path
                            d="M6.5481 12.3455L10.4753 8.41822C10.7651 8.12845 11.2349 8.12845 11.5247 8.41822L15.4519 12.3455"
                            stroke="#F7F7F8"
                            stroke-width="1.48397"
                            stroke-linecap="round"
                          />
                        </svg>
                      </TransactionsButton>
                    ) : (
                      <TransactionsButton
                        onClick={() => {
                          setindexShowDetailTx(index);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="23"
                          viewBox="0 0 22 23"
                          fill="none"
                        >
                          <rect
                            y="0.200043"
                            width="22"
                            height="22"
                            rx="11"
                            fill="#141518"
                          />
                          <path
                            d="M15.4519 9.85461L11.5247 13.7819C11.2349 14.0716 10.7651 14.0716 10.4753 13.7819L6.5481 9.85461"
                            stroke="#F7F7F8"
                            stroke-width="1.48397"
                            stroke-linecap="round"
                          />
                        </svg>
                      </TransactionsButton>
                    )}
                  </TransactionsAction>
                </TransactionsTitle>
                <TransactionsList>
                  <TransactionsDetail key={index}>
                    <TransactionsDetailTitle>
                      <TransactionsDetailCouple>
                        <div className="icon-1">
                          <img src="" alt="" />
                        </div>
                        <div className="icon-1">
                          <img src="" alt="" />
                        </div>
                        <h1>TON/KIB</h1>
                      </TransactionsDetailCouple>
                      <TransactionsDetailStatus>
                        <span>Succeed</span>
                      </TransactionsDetailStatus>
                    </TransactionsDetailTitle>

                    <TransactionsDetailTitle>
                      <span>Price impact</span>
                      <h2>0.00%</h2>
                    </TransactionsDetailTitle>
                    <TransactionsDetailTitle>
                      <span>Slippage</span>
                      <h2>0.00%</h2>
                    </TransactionsDetailTitle>
                    <TransactionsDetailTitle>
                      <span>Blockchain fee</span>
                      <h2>0.00%</h2>
                    </TransactionsDetailTitle>
                    <TransactionsDetailTitle>
                      <span>Trading fee</span>
                      <h2>0.00%</h2>
                    </TransactionsDetailTitle>
                    <TransactionsDetailLine>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="292"
                        height="2"
                        viewBox="0 0 292 2"
                        fill="none"
                      >
                        <path
                          d="M1 1.20004L291 1.20007"
                          stroke="#43424A"
                          stroke-linecap="round"
                          stroke-dasharray="5 5"
                        />
                      </svg>
                    </TransactionsDetailLine>
                    <TransactionsDetailTitle>
                      <p>05:52:39</p>
                      <h2>- 1,097 TON + 1,097 KIB</h2>
                    </TransactionsDetailTitle>
                  </TransactionsDetail>
                </TransactionsList>
              </HistoryTransactions>
            );
          })}
        </HistoryTransactionsList>
      </HistoryMain>
    </HistoryStyle>
  );
}
