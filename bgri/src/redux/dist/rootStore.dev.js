"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _userSlice = _interopRequireDefault(require("user/userSlice"));

var _contractSlice = _interopRequireDefault(require("./contract/contractSlice"));

var _productSlice = _interopRequireDefault(require("./product/productSlice"));

var _group = _interopRequireDefault(require("./group"));

var _household = _interopRequireDefault(require("./household"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var store = (0, _toolkit.configureStore)({
  reducer: {
    household: _household["default"],
    user: _userSlice["default"],
    contract: _contractSlice["default"],
    products: _productSlice["default"],
    groups: _group["default"]
  }
});
var _default = store;
exports["default"] = _default;