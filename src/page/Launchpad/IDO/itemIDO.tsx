import { useContext } from "react";
import { IDOBody, IDOImageParent, IDOReward, IDOTag } from "./styled";
import { ButtonCommon, ContextProviderWrapper } from "@kibble-exchange/uikit";

export default function ItemIDO({ data, onClaimReward }: any) {
  const {theme} = useContext(ContextProviderWrapper)!
  return (
    <li>
      <div>
        <IDOImageParent>
          <div className="img-tag">
            <img src={data.banner} alt="img" />
          </div>
          <IDOTag>
            {data.tag.map((tag: any, i: any) => {
              return <p key={i}>Upcoming</p>;
            })}
          </IDOTag>
        </IDOImageParent>
        <IDOBody className={theme}>
          <IDOTag
            style={{
              position: "relative",
              left: 0,
              top: 0,
            }}
            colorText={data.color}
            colorBg={data.background}
          >
            <p>{data.round}</p>
          </IDOTag>
          <h2>KIBBLE</h2>
          <p>{data.describe}</p>
        </IDOBody>
        <IDOReward>
          <div className="img-total-rasie">
            <img src={"/static/bg-total-raise.png"} alt="img" />
          </div>
          <p>Total raise</p>
          <h2>{data.totalRaise}</h2>
        </IDOReward>
        <ButtonCommon onClick={onClaimReward}>Join now</ButtonCommon>
      </div>
    </li>
  );
}
