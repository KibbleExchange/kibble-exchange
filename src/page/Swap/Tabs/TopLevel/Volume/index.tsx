import { TopPriceList } from "../styled";
import kib_logo from "../../../../../assets/Dashboard/Swap/kib_logo.png";

const TopVolume = () => {
  return (
    <TopPriceList>
      {data.map((item, index) => {
        return (
          <li key={index}>
            <div>
              <figure>
                <img src={item.icon} alt="icon" />
              </figure>
              <p>{item.name}</p>
            </div>
            <div>
              <p>{item.percentage}</p>
              <p>{item.trade}</p>
            </div>
          </li>
        );
      })}
    </TopPriceList>
  );
};

const data = [
  {
    icon: kib_logo,
    name: "AITECH (AITECH)",
    percentage: "+12%",
    trade: "trade",
  },
  {
    icon: kib_logo,
    name: "AITECH (AITECH)",
    percentage: "+12%",
    trade: "trade",
  },
  {
    icon: kib_logo,
    name: "AITECH (AITECH)",
    percentage: "+12%",
    trade: "trade",
  },
  {
    icon: kib_logo,
    name: "AITECH (AITECH)",
    percentage: "+12%",
    trade: "trade",
  },
  {
    icon: kib_logo,
    name: "AITECH (AITECH)",
    percentage: "+12%",
    trade: "trade",
  },
  {
    icon: kib_logo,
    name: "AITECH (AITECH)",
    percentage: "+12%",
    trade: "trade",
  },
];

export default TopVolume;
