import styled from "styled-components";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { AddBtn, TradeBtn } from "../../../Liquidity/Details/styled";
import { ContextProviderWrapper } from "@kibble-exchange/uikit";

const ElmStakePage = ({ data, callback, setStakeState }: any) => {
  const { theme }: any = useContext(ContextProviderWrapper);
  return (
    <ElmContainer
      className={theme}
      onClick={(e) => {
        callback && callback(data);
        e.stopPropagation();
      }}
    >
      <ElmTitle>
        <img src={data.img} alt="icon" />
        <div>
          <h1>{data.name}</h1>
          <p>{moment.unix(data.endTime).format("ll")}</p>
        </div>
      </ElmTitle>
      <ElmBox>
        <h1>
          <span>{data.endTime === 0 ? "Claimed" : "Stake"}</span> {data.values}
        </h1>{" "}
      </ElmBox>
      <ElmBoxTimeOur>
        <CountDown time={data.endTime} />
        {data.endTime === 0 ? (
          <>
            <BtnGroup theme={theme}>
              <TradeBtn
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <p>Re-stake</p>
              </TradeBtn>
            </BtnGroup>
          </>
        ) : (
          <>
            <BtnGroup theme={theme}>
              <TradeBtn
                onClick={(e) => {
                  e.stopPropagation();
                  setStakeState(true);
                  callback && callback(data);
                }}
              >
                <p>Stake more</p>
              </TradeBtn>
            </BtnGroup>
          </>
        )}
      </ElmBoxTimeOur>
    </ElmContainer>
  );
};
export default ElmStakePage;

export const CountDown = ({ time }: any) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(time));
  const { theme } = useContext(ContextProviderWrapper)!;
  function calculateTimeLeft(time: any) {
    const now = moment();
    const endDate = moment.unix(time);
    const duration = moment.duration(endDate.diff(now));

    let timeLeft: any = {};
    if (duration.asSeconds() >= 0) {
      timeLeft = {
        M: duration.months(),
        d: duration.days(),
        h: duration.hours(),
        m: duration.minutes(),
        // s: duration.seconds(),
      };
    }
    return timeLeft;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(time));
    }, 1000);

    return () => clearInterval(timer);
  });

  const timerComponents: any = [];
  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) return;
    timerComponents.push(
      <>
        <p key={interval}>
          {timeLeft[interval]}
          {interval}
        </p>
        <span>{" : "}</span>
      </>
    );
  });

  return (
    <CountDownBox className={theme}>
      {timerComponents.length ? (
        timerComponents
      ) : (
        <>
          <p>0M</p>
          <span>:</span>
          <p>0D</p>
          <span>:</span>
          <p>0H</p>
          <span>:</span>
          <p>0M</p>
          <span>:</span>
        </>
      )}
    </CountDownBox>
  );
};

const ElmContainer = styled.div`
  width: auto;
  padding: 10px;
  border-radius: 8px;
  background: #3a3a40;
  display: flex;
  flex-direction: column;
  gap: 7px;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.15s linear;
  &:hover {
    border-color: #afafaf;
  }
  &.light {
    background-color: #fff;
    border-color: #eeeef0;
  }
  @media only screen and (max-width: 768px) {
    width: auto;
    margin: 0px 5px;
  }
`;
const ElmTitle = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 6px;
  img {
    width: 40px;
  }
  h1 {
    color: #92929e;
    font-size: 16px;
    font-weight: 400;
  }
  p {
    color: var(--Stake-Text-Day);
    font-size: 14px;
    font-family: DMMono-400;
  }
`;
const ElmBox = styled.div`
  width: 100%;
  padding-bottom: 5px;
  border-bottom: 1px dashed var(--Neutral-800, #43424a);
  h1 {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--Stake-Text-Value);
    text-align: right;
    font-family: DMMono-400;
    font-size: 14px;
    span {
      color: #92929e;
      font-size: 15px;
    }
  }
`;
const ElmBoxTimeOur = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 768px) {
    margin-top: 13px;
  }
  @media screen and (max-width: 430px) {
    flex-direction: column;
    gap: 10px;
  }
`;
const CountDownBox = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  &.light {
    p {
      color: #4d4d57;
      background-color: #eeeef0;
      border-color: transparent;
    }
  }
  p {
    max-height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: var(--Stake-Text-countDown);
    text-align: center;
    font-family: DMMono-400;
    font-size: 12px;
    border-radius: 6px;
    border: 1px solid #4d4d57;
    background: var(--Stake-Bg-countDown);
    padding: 8.5px 8.334px 8.5px 8.666px;
    text-transform: uppercase;
  }
  span {
    &:last-child {
      display: none;
    }
  }
`;
export const BtnGroup = styled.div<{ theme?: any }>`
  ${TradeBtn} , ${AddBtn} {
    width: fit-content;
    padding: 8px 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    p {
      color: var(--Stake-Btn-Text-detail);
      font-size: 14px;
      font-weight: 500;
    }
  }
  ${TradeBtn} {
    ${({ theme }) =>
      theme === "light" &&
      `background: rgba( 0,0,0,0)  ; img{filter: brightness(0.4);}`}
  }
  ${AddBtn} {
    ${({ theme }) =>
      theme === "light" &&
      `p{
        color: #fff;
      }`}
  }
  @media screen and (max-width: 430px) {
    width: 100%;
    ${TradeBtn} ,  ${AddBtn} {
      width: 100%;
      img {
        display: none;
      }
    }
  }
`;
