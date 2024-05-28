import { TextBalanceStyle } from "./style";
import iconTon from "../../../assets/Dashboard/Swap/ton.png";
import { useContext } from "react";
import { ContextProviderWrapper } from "@kibble-exchange/uikit";

export default function TextBalance({ balance , isImage }: any) {
  const balanceTexts = balance ? balance.split(".") : ["--", "--"];
  const { theme } = useContext(ContextProviderWrapper)!;

  return (
    <TextBalanceStyle className={theme}>
      <h1>{balanceTexts[0]}</h1>
      <h2>{balanceTexts[1] && `.${balanceTexts[1]}`}</h2>
      {isImage && <div className="img-s">
        <img src={iconTon} alt="iconS" />
      </div>}
    </TextBalanceStyle>
  );
}
