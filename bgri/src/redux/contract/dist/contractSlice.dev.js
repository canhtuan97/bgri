"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.contract = exports.set = exports.contractSlice = void 0;

var _toolkit = require("@reduxjs/toolkit");

var contractSlice = (0, _toolkit.createSlice)({
  name: "contract",
  initialState: [],
  reducers: {
    set: function set(state, action) {
      // //console.log(action.payload);
      state.push(action.payload);
    }
  }
});
exports.contractSlice = contractSlice;
var set = contractSlice.actions.set;
exports.set = set;

var contract = function contract(state) {
  return state.contract;
};

exports.contract = contract;
var _default = contractSlice.reducer;
exports["default"] = _default;