import { createSlice } from "@reduxjs/toolkit";

export const householdSlice = createSlice({
  name: "household",
  initialState: [],
  reducers: {
    setHousehold: (state, action) => {
      // //console.log(action.payload);
      state.pop();
      state.push(action.payload);
      return
    },
  },
});

export const { setHousehold } = householdSlice.actions;

export const household = (state) => state.household;

export default householdSlice.reducer;