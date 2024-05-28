import { NoDataContainer, NoDataContent } from "./styled";

type TypeOfNoData = {
  title: string;
  content: string;
};

export default function NoData({ title, content }: TypeOfNoData) {
  return (
    <NoDataContainer>
      <NoDataContent>
        <div className="img-nodata">
          <img src="/static/img-nodata.gif" alt="nodata" />
        </div>
        <h2>{title}</h2>
        <p>{content}</p>
      </NoDataContent>
    </NoDataContainer>
  );
}
