import { configureStore } from "@reduxjs/toolkit";
import userSlice from 'user/userSlice';
import contractSlice from './contract/contractSlice';
import productsSlice from './product/productSlice';
import groupsSlice from './group';
import householdSlice from './household';
const store = configureStore({
  reducer: {
    household: householdSlice,
    user: userSlice,
    contract: contractSlice,
    products: productsSlice,
    groups: groupsSlice
  },
});

export default store;