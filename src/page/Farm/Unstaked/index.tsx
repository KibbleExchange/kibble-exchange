import StakeEmpty from "../../../components/Common/Stake/Empty";
import { UnstakeContainer } from "./styled";

const Unstaked = () => {
  const data = [];
  return (
    <UnstakeContainer>
      {data.length < 0 ? <></> : <StakeEmpty />}
    </UnstakeContainer>
  );
};

export default Unstaked;
