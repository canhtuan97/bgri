"use strict";

var HOST = "192.168.43.176";
var PORT = 9000;
module.exports.URL_CREATE_ACCOUNT = 'http://' + HOST + ':' + PORT + '/v0/create_account';
module.exports.URL_BUILD_CONTRACT = 'http://' + HOST + ':' + PORT + '/v0/build_smart_contract';
module.exports.URL_WRITE_LOG_PRODUCT = 'http://' + HOST + ':' + PORT + '/v0/write_product';
module.exports.URL_GET_LIST_PRODUCT = 'http://' + HOST + ':' + PORT + '/v0/get_list_product';
module.exports.URL_WRITE_LOG_HISTORY = 'http://' + HOST + ':' + PORT + '/v0/write_history';
module.exports.URL_GET_BALANCE = 'http://' + HOST + ':' + PORT + '/v0/get_balance';
module.exports.URL_GET_STATUS = 'http://' + HOST + ':' + PORT + '/v0/get_status';
module.exports.URL_GET_SUBMIT = 'http://' + HOST + ':' + PORT + '/v0/get_submit';
module.exports.URL_SCAN_ADDRESS_ETH = "https://ropsten.etherscan.io/address/";
module.exports.URL_SCAN_TX_ETH = "https://ropsten.etherscan.io/tx/";
module.exports.URL_SET_SUBMIT = 'http://' + HOST + ':' + PORT + '/v0/write_submit';
module.exports.URL_DECODE_QR = 'http://' + HOST + ':' + PORT + '/v0/decode_qr';
module.exports.URL_SIGNUP = 'http://' + HOST + ':' + PORT + '/v0/signup';
module.exports.URL_LOGIN = 'http://' + HOST + ':' + PORT + '/v0/login';
module.exports.URL_GET_LIST_GROUP = 'http://' + HOST + ':' + PORT + '/v0/get_list_group';
module.exports.URL_ADD_GROUPS = 'http://' + HOST + ':' + PORT + '/v0/add_groups';

module.exports.URL_GET_LIST_HOUSEHOLDS = function (id, contact) {
  return "http://".concat(HOST, ":").concat(PORT, "/v0/").concat(id, "/").concat(contact, "/get_list_households");
};

module.exports.URL_GET_TC_VIET_GAP = 'http://' + HOST + ':' + PORT + '/v0/get_tieu_chuan_vietgap';
module.exports.URL_DEPLOY_VIETGAP = 'http://' + HOST + ':' + PORT + '/v0/deploy_contracts_vietgap';

module.exports.URL_GET_PRODUCT = function (address) {
  return "http://".concat(HOST, ":").concat(PORT, "/v0/").concat(address, "/get_product");
};

module.exports.URL_GET_QR_CODE = function (address) {
  return "http://".concat(HOST, ":").concat(PORT, "/v0/").concat(address, "/get_qr_code");
};

module.exports.URL_SET_QR = 'http://' + HOST + ':' + PORT + '/v0/set_qr_code';
module.exports.URL_SET_HISTORY = 'http://' + HOST + ':' + PORT + '/v0/set_history';

module.exports.URL_GET_ACTIONS = function (address, key) {
  return 'http://' + HOST + ':' + PORT + '/v0/' + address + '/' + key + '/get_one_qr_code';
};

module.exports.URL_GET_HISTORY = function (address) {
  return 'http://' + HOST + ':' + PORT + '/v0/' + address + '/get_history';
};

module.exports.URL_YEU_CAU_VERIFY = 'http://' + HOST + ':' + PORT + '/v0/send_yeu_cau_verify';
module.exports.URL_GET_LIST_MESSAGES = 'http://' + HOST + ':' + PORT + '/v0/get_list_msg';
module.exports.URL_CHANGE_STATUS = 'http://' + HOST + ':' + PORT + '/v0/change';
module.exports.URL_SET_VERIFY_CONTRACT = 'http://' + HOST + ':' + PORT + '/v0/set_verify_contract';
module.exports.URL_GET_ALL_INFO = 'http://' + HOST + ':' + PORT + '/v0/thong_ke';
module.exports.URL_SET_END_SMARTCONTRACT = 'http://' + HOST + ':' + PORT + '/v0/set_end_smartcontract';
module.exports.URL_REJECT = 'http://' + HOST + ':' + PORT + '/v0/reject';
module.exports.URL_MSG_ACTION = 'http://' + HOST + ':' + PORT + '/v0/set_status_msg_action';

module.exports.URL_GET_LIST_FARMER_MESS = function (address) {
  return 'http://' + HOST + ':' + PORT + '/v0/' + address + '/get_msg_action_for_farmer';
};

module.exports.URL_ADD_HOUSE_HOLD = 'http://' + HOST + ':' + PORT + '/v0/add_households';
module.exports.URL_DELETE_GROUP = 'http://' + HOST + ':' + PORT + '/v0/group/delete';
module.exports.URL_DELETE_MSG = 'http://' + HOST + ':' + PORT + '/v0/msg/delete';
module.exports.URL_DELETE_HOUSEHOLD = 'http://' + HOST + ':' + PORT + '/v0/household/delete';
module.exports.URL_DELETE_PRODUCT = 'http://' + HOST + ':' + PORT + '/v0/product/delete';