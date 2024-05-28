import { Coins } from "ton3-core";
import { Asset, Pool } from "../../../../store/api/dexApiTypes";
import {
  RAHeader,
  ReviewAccordionContainer,
  ReviewAccordionDetails,
  ReviewAccordionWrapper,
  ReviewwAccordionHeader,
} from "./styled";
import ReviewLiquidityRemove from "./RemoveModal";
import { useState } from "react";
import default_token_image from "../../../../assets/Dashboard/Common/default-token-image.png";
import { ButtonSubmit, ModalOverlay } from "@kibble-exchange/uikit";
import close from "../../../assets/Dashboard/Common/close.svg";

export interface LiquidityAccordeonProps {
  assets: { [key: string]: Asset };
  pool: Pool;
}

const ReviewAccordion = ({ assets, pool }: LiquidityAccordeonProps) => {
  const [modalConfirmRemove, setModalConfirmRemove] = useState(false);

  const sharePercent = ((pool.lp_balance ?? 0) / pool.lp_total_supply) * 100;

  const asset0 = assets[pool.token0_address];
  const asset1 = assets[pool.token1_address];

  const token0Position = Coins.fromNano(
    ((pool.reserve0 * sharePercent) / 100).toFixed(0),
    asset0?.decimals
  );
  const token1Position = Coins.fromNano(
    ((pool.reserve1 * sharePercent) / 100).toFixed(),
    asset1?.decimals
  );

  const token0Balance = Coins.fromNano(
    pool?.token0_balance || 0,
    asset0?.decimals || 9
  ).toString();
  const token1Balance = Coins.fromNano(
    pool?.token1_balance || 0,
    asset1?.decimals || 9
  ).toString();

  const hasPositions =
    pool.token0_balance > 0 ||
    pool.token1_balance > 0 ||
    (pool.lp_balance && pool.lp_balance > 0);

  return (
    <>
      <ReviewAccordionContainer>
        <ReviewAccordionWrapper>
          <ReviewwAccordionHeader
          >
            <RAHeader>
              <img
                src={asset0?.image_url}
                alt={asset0?.symbol}
                style={{ width: "40px", height: "40px" }}
                onError={(e) => (e.currentTarget.src = default_token_image)}
              />
              <img
                src={asset1?.image_url}
                alt={asset1?.symbol}
                style={{ width: "40px", height: "40px" }}
                onError={(e) => (e.currentTarget.src = default_token_image)}
              />
            </RAHeader>
            <div>
              <span>{`${asset0?.symbol} / ${asset1?.symbol}`}</span>
              <p>{`${asset0?.display_name} / ${asset1?.display_name}`}</p>
            </div>
          </ReviewwAccordionHeader>
          <ReviewAccordionDetails
          >
            <div>
              <div>
                <div>
                  <img
                    src={asset0?.image_url}
                    alt={asset0?.symbol}
                    style={{ width: "30px", height: "30px" }}
                    onError={(e) => (e.currentTarget.src = default_token_image)}
                  />
                  <span>{asset0?.symbol} position:</span>
                </div>
                <span>{`${token0Position} ${asset0?.symbol}`}</span>
              </div>
              <div>
                <div>
                  <img
                    src={asset1?.image_url}
                    alt={asset1?.symbol}
                    style={{ width: "30px", height: "30px" }}
                    onError={(e) => (e.currentTarget.src = default_token_image)}
                  />
                  <span>{asset1?.symbol} position:</span>
                </div>
                <span>{`${token1Position} ${asset1?.symbol}`}</span>
              </div>
              {token0Balance !== "0" && (
                <div>
                  <img
                    src={asset0?.image_url}
                    alt={asset0?.symbol}
                    style={{ width: "30px", height: "30px" }}
                    onError={(e) => (e.currentTarget.src = default_token_image)}
                  />
                  <span>{asset0?.symbol}</span>
                  <span>{`${token0Balance} ${asset0?.symbol}`}</span>
                </div>
              )}
              {token1Balance !== "0" && (
                <div>
                  <img
                    src={asset1?.image_url}
                    alt={asset1?.symbol}
                    style={{ width: "14px", height: "14px" }}
                    onError={(e) => (e.currentTarget.src = default_token_image)}
                  />
                  <span>{asset1?.symbol}</span>
                  <span>{`${token1Balance} ${asset1?.symbol}`}</span>
                </div>
              )}
              <div>
                <span className="share-pool">Share In The Pool</span>
                <span>{`${sharePercent.toFixed(2)}%`}</span>
              </div>
              {hasPositions && (
                <ButtonSubmit
                  onClick={() => {
                    setModalConfirmRemove(true);
                  }}
                  background={"#e22121"}
                  color={"#fff"}
                >
                  <p>Remove</p>
                </ButtonSubmit>
              )}
            </div>
          </ReviewAccordionDetails>
          <div>
            <div>
              {/* {needsCompletion && (
                <CompleteProvideLiquidityButton
                  token0Address={pool.token0_address}
                  token1Address={pool.token1_address}
                />
              )} */}
            </div>
          </div>
        </ReviewAccordionWrapper>
      </ReviewAccordionContainer>
      <ModalOverlay
        component={
          <ReviewLiquidityRemove
            pool={pool}
            setModalConfirmRemove={setModalConfirmRemove}
            modalConfirmRemove={modalConfirmRemove}
          />
        }
        open={modalConfirmRemove}
        setOpen={setModalConfirmRemove}
        title={"Confirm Remove"}
        width="500px"
        closeIcon={close}
      />
    </>
  );
};

export default ReviewAccordion;
