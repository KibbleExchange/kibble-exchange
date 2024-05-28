import { useContext } from "react";
import {
  FairBox,
  FairBoxRow,
  FairEndIn,
  FairHeader,
  FairProgress,
  FairProgressBar,
  FairProgressCompare,
  FairProgressHeader,
  FairProgressPercent,
  FairStatus,
  FairTags,
  FairTime,
} from "./styled";
import { ButtonCommon, ContextProviderWrapper, convertFixed } from "@kibble-exchange/uikit";

export default function ItemFair({ data, onViewDetailProject }: any) {
  const { theme } = useContext(ContextProviderWrapper)!;
  return (
    <li className={theme}>
      <FairHeader>
        <div className="img-header">
          <img src={data.icon} alt="icon" />
        </div>
        <FairTags>
          <h2>{data.title}</h2>
          <FairStatus>
            <div>
              <p>Upcoming</p>
            </div>
            <div>
              <p>LP fee 0.2%</p>
            </div>
          </FairStatus>
        </FairTags>
      </FairHeader>
      <FairBoxRow>
        <p>Soft cap</p>
        <h2>{convertFixed(data.softCap)} TON</h2>
      </FairBoxRow>
      <FairBoxRow>
        <p>Liquidity</p>
        <h2>TBA</h2>
      </FairBoxRow>
      <FairBoxRow>
        <p>Offered</p>
        <h2>{convertFixed(data.offered)} KIB</h2>
      </FairBoxRow>
      <FairBox>
        <FairProgress>
          <FairProgressHeader>
            <p>Progress</p>
            <p>
              <span>{data.progress}%</span>
            </p>
          </FairProgressHeader>
          <FairProgressBar Progress={data.progress}>
            <span></span>
          </FairProgressBar>
          <FairProgressPercent>
            <span>0</span>
            <span> /{convertFixed(data.softCap)}</span>
          </FairProgressPercent>
          <FairProgressCompare>
            <p>
              <span>1</span> KIB = <span>{data.price} TON</span>
            </p>
          </FairProgressCompare>
        </FairProgress>
      </FairBox>
      <FairEndIn>
        <p>End in</p>
        <FairTime>
          <div>
            <p>--</p>
          </div>
          <span>:</span>
          <div>
            <p>--</p>
          </div>
          <span>:</span>
          <div>
            <p>--</p>
          </div>
          <span>:</span>
          <div>
            <p>--</p>
          </div>
        </FairTime>
      </FairEndIn>
      <ButtonCommon
        onClick={onViewDetailProject}
      >
        <span
          style={{
            paddingRight: "10px",
          }}
        >
          View project
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="13"
          height="11"
          viewBox="0 0 13 11"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M7.16829 0.484618C6.95593 0.701617 6.95593 1.05221 7.16975 1.26773L9.59665 3.72041L9.65268 3.76996C9.86701 3.93505 10.1729 3.91785 10.3676 3.71894C10.4737 3.61044 10.5268 3.46946 10.5268 3.32849C10.5268 3.18603 10.4737 3.04432 10.3661 2.93582L7.93993 0.483142L7.88388 0.433767C7.66946 0.269239 7.36296 0.286379 7.16829 0.484618ZM0.977064 4.7726C0.708215 4.80678 0.5 5.03979 0.5 5.32185C0.5 5.62742 0.744364 5.87542 1.04545 5.87542H10.6338L7.16982 9.37619L7.12082 9.43273C6.95747 9.64921 6.9737 9.96039 7.16836 10.1593C7.38073 10.3756 7.72618 10.3763 7.93927 10.1608L12.3393 5.71378L12.3878 5.65809C12.4616 5.5607 12.5 5.44179 12.5 5.32185C12.5 5.25025 12.4862 5.17866 12.4585 5.11076C12.3742 4.90335 12.1756 4.76828 11.9545 4.76828H1.04545L0.977064 4.7726Z"
            fill="#F7F7F8"
          />
        </svg>
      </ButtonCommon>
    </li>
  );
}
