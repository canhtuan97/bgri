"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.user = exports.set = exports.userSlice = void 0;

var _toolkit = require("@reduxjs/toolkit");

var userSlice = (0, _toolkit.createSlice)({
  name: "user",
  initialState: [],
  reducers: {
    set: function set(state, action) {
      state[0] = action.payload;
    }
  }
});
exports.userSlice = userSlice;
var set = userSlice.actions.set;
exports.set = set;

var user = function user(state) {
  return state.user;
};

exports.user = user;
var _default = userSlice.reducer;
exports["default"] = _default;