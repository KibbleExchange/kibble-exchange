import { Dispatch, createSlice } from "@reduxjs/toolkit";

interface DriverState {
  allPools: any;
  poolsWallet: any;
}

const initialState: DriverState = {
  allPools: [],
  poolsWallet: []
};

const poolSlice = createSlice({
  name: "poolSlice",
  initialState,
  reducers: {
    getAllPools(state, action) {
      state.allPools = action.payload;
    },
    getPoolsWallet(state, action) {
      state.poolsWallet = action.payload;
    },
  },
});

export function getDataAllPools(data: any) {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(poolSlice.actions.getAllPools(data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function getDataPoolsWallet(data: any) {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(poolSlice.actions.getPoolsWallet(data));
    } catch (error) {
      console.log(error);
    }
  };
}

const poolReducer = poolSlice.reducer;

export default poolReducer;
