"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.groups = exports.setGroups = exports.groupsSlice = void 0;

var _toolkit = require("@reduxjs/toolkit");

var groupsSlice = (0, _toolkit.createSlice)({
  name: "groups",
  initialState: [],
  reducers: {
    setGroups: function setGroups(state, action) {
      // //console.log(action.payload);
      state.pop();
      state.push(action.payload);
      return;
    }
  }
});
exports.groupsSlice = groupsSlice;
var setGroups = groupsSlice.actions.setGroups;
exports.setGroups = setGroups;

var groups = function groups(state) {
  return state.groups;
};

exports.groups = groups;
var _default = groupsSlice.reducer;
exports["default"] = _default;