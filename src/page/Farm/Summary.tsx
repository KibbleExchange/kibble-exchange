import styled from "styled-components";
import IconTokent from "../../assets/Staking/KibleIconTokent.png";
import kibLogo from "../../assets/Staking/kibleLogo.svg";

export const Summary = () => {
  return (
    <Container>
      <SummaryBox>
        <h1>
          Available <img src={IconTokent} /> to stake
        </h1>
        <h3>$0.00</h3>
      </SummaryBox>
      <SummaryBox>
        <h1>Minted reward</h1>
        <h3>$0.00</h3>
      </SummaryBox>
      <SummaryBox>
        <h1>
          My staked <img src={IconTokent} />
        </h1>
        <h3>$0.00</h3>
      </SummaryBox>
    </Container>
  );
};

export const KibTokent = () => {
  return (
    <Container>
      <SummaryBox>
        <h1>
          <img src={IconTokent} /> Total supply
        </h1>
        <h3>$ 98,792.7386</h3>
      </SummaryBox>
      <SummaryBox>
        <h1>Reward total supply</h1>
        <h3>$ 23.947</h3>
      </SummaryBox>
      <SummaryBox>
        <h1>
          Total staked <img src={IconTokent} />
        </h1>
        <h3>$ 192.153</h3>
      </SummaryBox>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  justify-content: space-between;
`;
const SummaryBox = styled.div`
  width: calc(50% - 26px);
  padding: 12px 12px 22px;
  border-radius: 12px;
  background: var(--Stake-Box, #3a3a40);
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  gap: 22px;
  &:last-child {
    width: 100%;
    justify-content: center;
    padding: 26px 12px;
    position: relative;
    h1,
    h3 {
      text-align: center;
      justify-content: center;
    }
    h3 {
      font-size: 20px;
    }
    &::before {
      width: 32px;
      height: 32px;
      background-image: url(${kibLogo});
      background-position: center;
      background-size: cover;
      position: absolute;
      top: 0px;
      content: "";
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      border-radius: 10px;
    }
  }
  h1 {
    display: flex;
    align-items: center;
    gap: 4px;
    color: var(--Stake-Text);
    font-family: Syne;
    font-size: 15px;
    font-weight: 400;
    line-height: 96%; /* 11.52px */
    text-align: left;
    justify-content: flex-start;
    width: 100%;
    img {
      width: 14px;
    }
  }
  h3 {
    width: 100%;
    color: var(--Stake-Text);
    font-family: DMMono-400;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 96%;
    letter-spacing: -1.28px;
    text-transform: lowercase;
  }
`;
