import { Spin } from "antd";
import { LoadingSpinContainer } from "./styled";

const LoadingSpin = () => {
  return (
    <LoadingSpinContainer>
      <Spin size="large" />
      <p>Please wait a sec...</p>
    </LoadingSpinContainer>
  );
};

export default LoadingSpin;
