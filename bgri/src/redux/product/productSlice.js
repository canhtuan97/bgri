import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {
    setProducts: (state, action) => {
      state[0]= action.payload;
      return
    },
  },
});

export const { setProducts } = productsSlice.actions;

export const products = (state) => state.products;

export default productsSlice.reducer;