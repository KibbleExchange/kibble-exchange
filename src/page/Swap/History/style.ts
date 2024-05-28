import { styled } from "styled-components";

export const HistoryStyle = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgb(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  padding: 0 15px;
  opacity: 1;
  visibility: visible;
  transition: all 0.15s ease-in-out;
  z-index: 99999;
`;

export const HistoryMain = styled.div`
  display: inline-flex;
  height: calc(100vh);
  padding: 12px 12px 40.8px 12px;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  border-radius: 12px;
  background: var(--Neutral-950, #141518);
  width: 300px;
  overflow: scroll;
  position: absolute;
  right: 15px;
  padding-top: 80px;
  visibility: visible;
  transition: all 0.15s ease-in-out;
`;

export const HistoryTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  h2 {
    font-size: 16px;
  }
  .img-close {
    width: 30px;
    img {
      width: 100%;
    }
  }
`;
export const HistoryTransactionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
`;

export const HistoryTransactions = styled.div`
  display: flex;
  padding: 8px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border-radius: 12px;
  background: var(--Neutral-900, #3a3a40);
  overflow: hidden;
  transition: all.3s;
`;

export const TransactionsTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
`;

export const TransactionsTime = styled.div`
  span {
    color: var(--Neutral-400, #92929e);
    font-family: Syne;
    font-size: 11px;
    font-style: normal;
    font-weight: 400;
    line-height: 125%; /* 13.75px */
  }
  h2 {
    color: var(--Neutral-50, #f7f7f8);
    font-family: DMMono-500;
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: 125%; /* 16.25px */
    letter-spacing: -1.04px;
  }
`;

export const TransactionsAction = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const TransactionsCount = styled.div`
  display: flex;
  padding: 2px 8px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  border-radius: 6px;
  background: var(--Indigo-100, #e5edff);
  span {
    color: var(--Indigo-800, #42389d);
    text-align: center;
    font-family: "DMMono-500";
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%; /* 18px */
  }
`;

export const TransactionsButton = styled.div`
  cursor: pointer;
`;

export const TransactionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  width: 100%;
`;

export const TransactionsDetail = styled.div`
  display: flex;
  padding: 8px 10px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
  border-radius: 8px;
  background: var(--Neutral-950, #141518);
  h1 {
    color: var(--Neutral-White, #fff);
    font-family: Syne;
    font-size: 12.6px;
    font-style: normal;
    font-weight: 500;
    line-height: 125%; /* 15.75px */
  }
`;

export const TransactionsDetailTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  span {
    color: var(--Neutral-400, #92929e);
    font-family: Syne;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 125%; /* 13.75px */
  }
  h2 {
    color: var(--Neutral-50, #f7f7f8);
    font-family: "DMMono-400";
    font-size: 14px;
    font-style: normal;
    line-height: 125%; /* 15px */
  }
  p {
    color: var(--Neutral-400, #92929e);
    font-family: "DMMono-400";
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 125%; /* 13.75px */
  }
`;

export const TransactionsDetailCouple = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

export const TransactionsDetailStatus = styled.div`
  display: flex;
  padding: 0px 8px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  border-radius: 6px;
  background: var(--Spring-Green-950, #00341d);
  span {
    color: var(--Spring-Green-500, #0ff586);
    text-align: center;
    font-family: Syne;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%; /* 18px */
  }
`;

export const TransactionsDetailLine = styled.div`
  margin-top: -10px;
  svg {
    width: 100%;
  }
`;
