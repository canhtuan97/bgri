import { createSlice } from "@reduxjs/toolkit";

export const contractSlice = createSlice({
  name: "contract",
  initialState: [],
  reducers: {
    set: (state, action) => {
      // //console.log(action.payload);
      state.push(action.payload);
    },
  },
});

export const { set } = contractSlice.actions;

export const contract = (state) => state.contract;

export default contractSlice.reducer;