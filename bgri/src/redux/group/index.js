import { createSlice } from "@reduxjs/toolkit";

export const groupsSlice = createSlice({
  name: "groups",
  initialState: [],
  reducers: {
    setGroups: (state, action) => {
      // //console.log(action.payload);
      state.pop();
      state.push(action.payload);
      return
    },
  },
});

export const { setGroups } = groupsSlice.actions;

export const groups = (state) => state.groups;

export default groupsSlice.reducer;