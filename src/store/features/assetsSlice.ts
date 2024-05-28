import { Dispatch, createSlice } from "@reduxjs/toolkit";

interface DriverState {
  allAssets: any;
}

const initialState: DriverState = {
  allAssets: [],
};

const assetsSlice = createSlice({
  name: "assetsSlice",
  initialState,
  reducers: {
    getAllAssets(state, action) {
      state.allAssets = action.payload;
    },
  },
});

export function getDataAllAssets(data: any) {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(assetsSlice.actions.getAllAssets(data));
    } catch (error) {
      console.log(error);
    }
  };
}

const assetsReducer = assetsSlice.reducer;

export default assetsReducer;
