import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const TableMobile = ({ data, keyList, collaps }: any) => {
  return (
    <TableMobileWapper>
      {data && data.length && keyList ? (
        data.map((item: any, index: number) => {
          return (
            <CartCommon
              item={item}
              keyList={keyList}
              collaps={collaps}
              key={`cart${index}`}
            />
          );
        })
      ) : (
        <Nodata className="row-nodata">
          <img src="../images/CommonImg/no-data-6.png" alt="icon"/>
          <p>No data</p>
        </Nodata>
      )}
    </TableMobileWapper>
  );
};
export default TableMobile;
const CartCommon = ({ item, keyList, collaps }: any) => {
  const [isShow, setIsShow] = useState(true);
  const [height, setHeight] = useState<any>("fit-content");
  const elementRef = useRef<any>(null);

  useEffect(() => {
    if (elementRef.current) {
      const { height } = elementRef.current.getBoundingClientRect();
      setHeight(height);
    }
  }, []);
  return (
    <CardBox>
      {keyList?.title && (
        <CartTitles
          onClick={() => {
            collaps && setIsShow(!isShow);
          }}
        >
          {keyList?.title?.map((_item: any, _index: number) => (
            <CartTitlesBox>
              <h3>{_item.name && _item.name}</h3>
              <span>
                {_item.callback ? _item.callback(item) : item[_item.value]}
              </span>
              {collaps && keyList?.title?.length - 1 === _index && (
                <button>
                  <img src="./../images/staking/arrow-square-down.svg" alt="" />
                </button>
              )}
            </CartTitlesBox>
          ))}
        </CartTitles>
      )}

      <CartBody isshow={isShow} ref={elementRef} height={height}>
        {keyList?.body?.map((i_Body: any, i_index: number) => (
          <>
            {i_Body.customRow ? (
              i_Body.customRow(item)
            ) : (
              <CartBodyRow key={`${i_Body.name}${i_index}`}>
                <CartBodyRowName>{i_Body.name}</CartBodyRowName>
                {i_Body.callback ? (
                  i_Body.callback(item)
                ) : (
                  <CartBodyRowValue>{item[i_Body.value]}</CartBodyRowValue>
                )}
              </CartBodyRow>
            )}
          </>
        ))}
      </CartBody>
    </CardBox>
  );
};

export const TableMobileWapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  @media screen and (max-width: 767px) {
    width: auto;
  }
`;
const CardBox = styled.div`
  padding: 12px;
  width: 100%;
  border-radius: 12px;
  border: 1px solid rgba(226, 232, 255, 0.2);
  margin-bottom: 8px;
  @media screen and (max-width: 767px) {
    width: calc(100% - 24px);
  }
`;
const CartTitles = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 7px;
  border-bottom: 1px solid rgba(226, 232, 255, 0.2);
  width: 100%;
`;
const CartTitlesBox = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  h3 {
    color: #fff;
    font-size: 14px;
    font-weight: 500;
    line-height: 110%; /* 15.4px */
    letter-spacing: 0.14px;
  }
  span {
    color: #a4a7bb;
    font-size: 12px;
    font-weight: 300;
    line-height: 110%; /* 13.2px */
  }
`;
const CartBody = styled.div<{ isshow?: any; height?: any }>`
  display: flex;
  flex-direction: column;
  gap: 7px;
  padding-top: ${({ isshow }) => (isshow ? "7" : "0")}px;
  width: 100%;
  height: ${({ isshow }) => (isshow ? "fit-content" : "0")}px;
  transition: height 0.3s linear;
  overflow: hidden;
`;
const CartBodyRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 5px;
`;
const CartBodyRowName = styled.p`
  color: rgba(226, 232, 255, 0.7);
  font-size: 14px;
  font-weight: 600;
  line-height: 110%; /* 15.4px */
  /* width: 49%; */
`;
const CartBodyRowValue = styled.p`
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  line-height: 110%; /* 15.4px */
  /* width: 49%; */
  text-align: right;
`;
const Nodata = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  line-height: 110%; /* 15.4px */
  letter-spacing: 0.14px;
  img {
    max-width: 100px;
  }
`;
