import { instance } from "../instance";

export const KIBBLE_API = {
  getInfoToken(contract: any) {
    return instance.get(`/token/get_token_info?address=${contract}`);
  },
  simulateCreatePool(params: any) {
    return instance.post(`/dex/pools/simulate_create_pool`, params);
  },
  confirmSimulateCreatePool(params: any) {
    return instance.post(`/dex/liquidity/provide`, params);
  },
  getAllPools(params: any) {
    return instance.post(
      `/dex/pools/balances?load_lp_accounts=${params.load_lp_accounts}`
    );
  },
  getAllAssets(params: any) {
    return instance.get(`/assets?is_conmunity=${params}`);
  },
  getPoolDetail(params: any, address: any) {
    if (address) {
      return instance.get(`/pools/detail?pool_address=${params}&wallet_address=${address}`);
    } else {
      return instance.get(`/pools/detail?pool_address=${params}`);
    }

    // return instance.get(`/pools/detail?pool_address=${params}`);
  },
  addNewAssetToken(params: any) {
    return instance.post(`/assets/create`, params);
  },
  checkTokenInPools(params: any) {
    return instance.get(
      `/pools/check?token0_address=${params.token0_address}&token1_address=${params.token1_address}`
    );
  },
  searchToken(params: any) {
    return instance.post(`/token/search`, params);
  },
  checkStatusSwap(params: any) {
    return instance.get(
      `/transactions/status?wallet_address=${params.wallet_address}&query_id=${params.query_id}`
    );
  },
  submitFavoriteToken(params: any) {
    return instance.post(`/assets/favorite`, params);
  },
};
