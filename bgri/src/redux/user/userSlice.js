import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: [],
  reducers: {
    set: (state, action) => {
      // //console.log(action.payload);
      state[0]=action.payload;
    },
  },
});

export const { set } = userSlice.actions;

export const user = (state) => state.user;

export default userSlice.reducer;