import styled from "styled-components";

const Table = ({ data, keyObj }: any) => {
  return (
    <TableContainer className="Tabble-Wapper">
      <table>
        <thead>
          <tr>
            {keyObj &&
              keyObj.map((item: any, index: number) => {
                return <th key={`${item.th}${index}`}>{item.th}</th>;
              })}
          </tr>
        </thead>
        <tbody>
          {data && data.length ? (
            keyObj &&
            data.map((_item: any, index: number) => (
              <tr key={`tr${index}`}>
                {keyObj.map((key: any, _index: number) => (
                  <td key={`td${index}${_index}`}>
                    {key.th === "No"
                      ? index + 1
                      : key.callback
                      ? key.callback(_item)
                      : _item[key.key]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={keyObj.length}>
                <div className="row-nodata">
                  <img src="../images/CommonImg/no-data-6.png" alt="icon"/>
                  <p>No data</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </TableContainer>
  );
};
export default Table;

export const TableContainer = styled.div`
  width: 100%;
  border-radius: 8px;
  padding: 0px 14px;
  overflow-x: auto;
  .row-nodata {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    img {
      max-width: 100px;
    }
  }
  table {
    width: 100%;
    min-width: max-content;
    th,
    td {
      padding: 15px;
      text-align: center;
    }
    th {
      color: #828282;
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: 20px; /* 125% */
    }
    td {
      color: #fff;
      font-size: 14px;
      font-weight: 500;
      line-height: 110%; /* 15.4px */
      letter-spacing: 0.14px;
    }
    tr {
      th,
      td {
        &:last-child {
          text-align: right;
        }
        &:first-child {
          text-align: left;
        }
      }
    }
  }
`;
