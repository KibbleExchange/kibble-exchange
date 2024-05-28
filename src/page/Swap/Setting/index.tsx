import { Switch } from "antd";
import {
  SettingBody,
  SettingSwapContainer,
  SettingSwapHeader,
  SettingSwapLimit,
  SettingSwapList,
  SettingSwapWrapper,
} from "./styled";
import percent from "../../../assets/Dashboard/Common/percent.svg";
import { useContext } from "react";
import { ConfirmSwapButtons } from "../Confirm/styled";
import { ButtonCommon, ContextProviderWrapper, InputCommon, SwitchCommon } from "@kibble-exchange/uikit";

const SettingSwap = ({
  slippageTolerance,
  setSlippageTolerance,
  setActiveFilter,
  setSwitchState,
  switchState,
  setActiveTab,
}: any) => {
  const { theme, isMobile } = useContext(ContextProviderWrapper)!;
  const optionData = [0.1, 0.5, 1];
  const handleSwitch = (value: any) => {
    setSwitchState(value);
    if (switchState) {
      setSlippageTolerance(optionData[0]);
    }
  };
  const handleChangeImpact = (e: any) => {
    setSlippageTolerance(e.target.value);
  };

  return (
    <SettingSwapContainer>
      <SettingSwapWrapper className={theme}>
        <SettingSwapHeader className={theme}>
          <p>Slippage Tolerance</p>
        </SettingSwapHeader>
        <SettingBody>
          <InputCommon
            value={slippageTolerance}
            defaultValue={slippageTolerance}
            disabled={switchState ? false : true}
            suffix={<img src={percent} alt="percent" />}
            onChange={handleChangeImpact}
          />
          <SettingSwapList className={theme}>
            {optionData.map((item, index) => {
              return (
                <li
                  className={slippageTolerance === item ? "active" : ""}
                  onClick={() => {
                    setSlippageTolerance(item);
                  }}
                  key={index}
                >
                  {item}%
                </li>
              );
            })}
          </SettingSwapList>
        </SettingBody>
        <SettingSwapLimit className={theme}>
          <p>Custom price impact limit</p>
          <SwitchCommon className={theme}>
            <Switch checked={switchState} onChange={handleSwitch} />
          </SwitchCommon>
        </SettingSwapLimit>
        <p>
          By enabling this feature, you’ll see the candlestick chart instead of
          a line chart
        </p>
        <ConfirmSwapButtons>
          <ButtonCommon
            onClick={() => {
              isMobile ? setActiveTab(1) : setActiveFilter(1);
            }}
            background={theme === "light" ? "#EEEEF0" : "#32363f"}
            color={theme === "light" ? "#141518" : "#fff"}
          >
            <p>Back to swap</p>
          </ButtonCommon>
          <ButtonCommon
            onClick={() => {
              isMobile ? setActiveTab(1) : setActiveFilter(1);
            }}
          >
            <p>Save changes</p>
          </ButtonCommon>
        </ConfirmSwapButtons>
      </SettingSwapWrapper>
    </SettingSwapContainer>
  );
};

export default SettingSwap;
