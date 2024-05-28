import styled from "styled-components";
import BoxDurationBg from "../../assets/Staking/BoxDurationBg.svg";
import { useContext } from "react";
import { ContextProviderWrapper } from "@kibble-exchange/uikit";

const Duration = ({ data, callback, value, initial }: any) => {
  const {theme} = useContext(ContextProviderWrapper)!
  return (
    <DurationContainer>
      <h1>Duration</h1>
      {data &&
        data.map((duration: any) => (
          <DurationBox
            className={theme}
            key={duration.value}
            active={value === duration.value}
            onClick={() => {
              callback && callback(duration);
            }}
            dis={duration.value < initial}
          >
            <h3>{duration.title}</h3>
            <p>{duration.text}</p>
          </DurationBox>
        ))}
    </DurationContainer>
  );
};
export default Duration;

const DurationContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-bottom: 10px;
  h1 {
    width: 100%;
    color: var(--Stake-Text-countDown);
    font-family: Syne;
    font-size: 13px;
    font-weight: 400;
    line-height: 125%;
  }
`;
const DurationBox = styled.div<{ active?: boolean; dis?: boolean }>`
  width: calc(50% - 24px);
  padding: 10px;
  border-radius: 10.12px;
  cursor: pointer;
  background-color: ${({ active }) =>
    active ? "var(--Stake-duration-Bg-active)" : "var(--Stake-duration-Bg)"};
  background-image: url(${BoxDurationBg});
  background-size: cover;
  background-position: bottom left;
  opacity: ${({ dis }) => (dis ? 0.5 : 1)};
  border: 1px solid
    ${({ active }) =>
      active ? "var(--Neutral-400, #92929E)" : "rgba(0,0,0,0)"};
  transition: all 0.15s linear;
  &.light {
    &:hover {
      background-color: rgba(62, 61, 66,.1);
    }
  }
  &:hover {
    background-color: var(--Stake-duration-Bg-active)
  }
  h3 {
    color: var(--Stake-Text);
    text-align: center;
    font-family: DMMono-400;
    font-size: 16px;
    line-height: 20px;
    letter-spacing: -0.96px;
  }
  p {
    color: var(--Stake-Text-Day);
    text-align: center;
    font-family: DMMono-400;
    font-size: 12px;
    line-height: 125%;
  }
  h3,
  p {
    width: 100%;
    text-align: center;
  }
  @media screen and (max-width: 767px) {
    width: calc(50% - 26px);
  }
`;
