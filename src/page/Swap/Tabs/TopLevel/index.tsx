import { useContext, useState } from "react";
import { SwapTopLevelContainer, TopSwitch } from "./styled";
import TopPrice from "./Price";
import TopVolume from "./Volume";
import { ButtonReset } from "../../styled";
import { ContextProviderWrapper } from "@kibble-exchange/uikit";

const SwapTopLevel = ({ setActiveFilter }: any) => {
  const {theme} = useContext(ContextProviderWrapper)!
  const [tab, setTab] = useState(1);
  const handleChangeTabs = () => {
    switch (tab) {
      case 1:
        return <TopPrice />;
      case 2:
        return <TopVolume />;
      default:
        break;
    }
  };
  return (
    <SwapTopLevelContainer>
      <TopSwitch>
        {tabsData.map((item, index) => {
          return (
            <li
              className={tab === item.id ? "active" : ""}
              onClick={() => {
                setTab(item.id);
              }}
              key={index}
            >
              {item.text}
            </li>
          );
        })}
      </TopSwitch>
      {handleChangeTabs()}
      <ButtonReset
        className={theme}
        onClick={() => {
          setActiveFilter(1);
        }}
      >
        <p>Back To Swap</p>
      </ButtonReset>
    </SwapTopLevelContainer>
  );
};

const tabsData = [
  {
    id: 1,
    text: "Price change",
  },
  {
    id: 2,
    text: "Volume",
  },
];

export default SwapTopLevel;
