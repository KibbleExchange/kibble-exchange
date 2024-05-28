import React, { useContext } from "react";
import {
  BlockStakingRewards,
  BlockStakingRewardsNumber,
  BlockStakingRewardsTitle,
} from "../../NewStake/styled";
import { BlockInfo } from "./styled";
import { DetailPakgeTitle } from "../../MyStake/Step1/DetailPakge";
import TokentStyle2 from "../../../../assets/Staking/TokentStyle2.svg";
import { ButtonCommon, ContextProviderWrapper } from "@kibble-exchange/uikit";

const ModalClaim = () => {
  const {theme} = useContext(ContextProviderWrapper)!
  return (
    <>
      <DetailPakgeTitle style={{marginBottom:"8px"}} theme={theme}>
        <h3>You’ll receive</h3>
        <p>
        50568.1986 <img src={TokentStyle2} alt="icon"/>{" "}
        </p>
      </DetailPakgeTitle>
      <BlockStakingRewards>
        <BlockStakingRewardsTitle>Staking rewards</BlockStakingRewardsTitle>
        <BlockStakingRewardsNumber>
          1.9981423.6371<span>KIB</span>
        </BlockStakingRewardsNumber>
      </BlockStakingRewards>
      <BlockInfo className={theme}>
        <p>Token will be sent directly to your wallet</p>
      </BlockInfo>
      <ButtonCommon>
        <p>Claim rewards</p>
      </ButtonCommon>
    </>
  );
};

export default ModalClaim;
