import { StakeEmptyContainer } from "./styled";
import stake_empty from "../../../../assets/Dashboard/Stake/stake_empty.svg";

const StakeEmpty = () => {
  return (
    <StakeEmptyContainer>
      <figure>
        <img src={stake_empty} alt="icon" />
      </figure>
      <div>
        <p>We didn't find any stakes</p>
        <span>
          After staking your positions will be displayed in this section
        </span>
      </div>
    </StakeEmptyContainer>
  );
};

export default StakeEmpty;
