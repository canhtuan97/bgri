"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.household = exports.setHousehold = exports.householdSlice = void 0;

var _toolkit = require("@reduxjs/toolkit");

var householdSlice = (0, _toolkit.createSlice)({
  name: "household",
  initialState: [],
  reducers: {
    setHousehold: function setHousehold(state, action) {
      // //console.log(action.payload);
      state.pop();
      state.push(action.payload);
      return;
    }
  }
});
exports.householdSlice = householdSlice;
var setHousehold = householdSlice.actions.setHousehold;
exports.setHousehold = setHousehold;

var household = function household(state) {
  return state.household;
};

exports.household = household;
var _default = householdSlice.reducer;
exports["default"] = _default;