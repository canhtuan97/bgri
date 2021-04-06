"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.products = exports.setProducts = exports.productsSlice = void 0;

var _toolkit = require("@reduxjs/toolkit");

var productsSlice = (0, _toolkit.createSlice)({
  name: "products",
  initialState: [],
  reducers: {
    setProducts: function setProducts(state, action) {
      state.pop();
      state.push(action.payload);
      return;
    }
  }
});
exports.productsSlice = productsSlice;
var setProducts = productsSlice.actions.setProducts;
exports.setProducts = setProducts;

var products = function products(state) {
  return state.products;
};

exports.products = products;
var _default = productsSlice.reducer;
exports["default"] = _default;