import { useState } from "react";
import { DataStakeList } from "../fakeData";
import { MyStakeContentBox, MyStakeContentScroll } from "../styled";
import ElmStakePage from "./ElmStakePage";
import DetailPage from "./DetailPakge";

const MyStep1 = () => {
  const [activeElm, setActiveElm] = useState<any>(null);
  const [isChangeDuration, setIsChangeDuration] = useState(false);
  const handleNextStep = () => {
    if (activeElm.isClaimed) {
      // openModalClaim()
    } else {
      setIsChangeDuration(true);
    }
  };
  return (
    <>
      <MyStakeContentScroll>
        {isChangeDuration ? (
          <></>
        ) : (
          DataStakeList.map((page: any) => {
            return (
              <ElmStakePage
                data={page}
                callback={(item: any) => {
                  setActiveElm(item);
                }}
              ></ElmStakePage>
            );
          })
        )}
      </MyStakeContentScroll>
      <MyStakeContentBox>
        {activeElm ? (
          <DetailPage data={activeElm} action={handleNextStep} />
        ) : (
          <>No data</>
        )}
      </MyStakeContentBox>
    </>
  );
};
export default MyStep1;
