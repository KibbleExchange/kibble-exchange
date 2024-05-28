import styled from "styled-components";
// Image
import icnInfo from '../../../../assets/liquidity/InfoCircle.svg'

export const BlockInfo = styled.div`
  border-radius: 8px;
  background: #3A3A40;
  padding: 8px;
  margin-bottom: 24px;
  p {
    position: relative;
    color: #92929E;
    font-size: 15px;
    padding-left: 25px;
    &:before {
      position: absolute;
      content: '';
      background: url(${icnInfo}) no-repeat center / 100% auto;
      margin-right: 5px;
      width: 20px;
      height: 20px;
      top: 50%;
      margin-top: -10px;
      left: 0;
    }
  }
  &.light {
    background-color: #f3f4f8;
  }
`