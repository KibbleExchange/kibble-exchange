import {
  FairLaunchContainer,
  FairLaunchWrapper,
  FairList,
} from "./styled";
import fair_kibble from "../../../assets/Dashboard/Launchpad/FAIR/kibble.png";
import NoData from "../../../components/Common/Nodata";
import { useNavigate } from "react-router-dom";
import ItemFair from "./itemFair";

const FairLaunch = () => {
  const navigate = useNavigate();

  const handleViewDetailProject = async () => {
    try {
      navigate("/launchpad/123?lauch");
    } catch (error) {
      console.log("view detai", error);
    }
  };

  return (
    <FairLaunchContainer>
      <FairLaunchWrapper>
        {fairLaunchData.length > 0 ? (
          <FairList>
            {fairLaunchData.map((item, index) => {
              return (
                <ItemFair
                  key={index}
                  data={item}
                  onViewDetailProject={handleViewDetailProject}
                />
              );
            })}
          </FairList>
        ) : (
          <NoData
            title="NO project available"
            content="There is no project available recently. Please wait for the next launch on Kibble."
          />
        )}
      </FairLaunchWrapper>
    </FairLaunchContainer>
  );
};

const fairLaunchData = [
  {
    icon: fair_kibble,
    title: "Kibble",
    countDown: "18 : 10: 48 : 20",
    tag: "Upcoming",
    joiner: 5,
    liq: 100,
    liquidity: 20,
    offered: 50000000,
    progress: 0,
    total: 22689.37,
    softCap: 225000,
    price: 0.009
  },
];

export default FairLaunch;
