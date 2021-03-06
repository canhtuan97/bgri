const { body, validationResult, param } = require("express-validator");
const middleWare = require("./middlewares/AuthMiddleware");
const express = require("express");
const router = express.Router();
const controller = require("./Controller");

const user = require("./controllers/User");
const blockchain = require("./controllers/Blockchains");
const product = require("./controllers/Products");

router.post("/v0/get_balance", middleWare.isAuth, user.getBalance);

// user---------------
router.post(
  "/v0/signup",
  [
    body("email")
      .isEmail()
      .notEmpty()
      .withMessage("Please enter a valid email."),
    body("password").notEmpty().withMessage("Please enter a valid password."),
    body("role").notEmpty().withMessage("Please enter a valid role."),
  ],
  user.signup
);
// login
router.post(
  "/v0/login",
  [
    body("email")
      .isEmail()
      .notEmpty()
      .withMessage("Please enter a valid email."),
    body("password").notEmpty().withMessage("Please enter a valid password."),
  ],
  user.login
);
// add group
router.post(
  "/v0/add_groups",
  [body("email").notEmpty().withMessage("Please enter a valid email.")],
  middleWare.isAuth,
  user.addGroup
);
// add_households
router.post(
  "/v0/add_households",
  [body("email").notEmpty().withMessage("Please enter a valid email.")],
  middleWare.isAuth,
  user.addHouseHold
);
// getListNhom
router.get("/v0/get_list_group", middleWare.isAuth, user.getListNhom);
// getListHouseHold
router.get(
  "/v0/:id/:contract_id/get_list_households",
  middleWare.isAuth,
  user.getListHouseHold
);
// --------------------------------------------------
// get_tieu_chuan_vietgap
router.get(
  "/v0/get_tieu_chuan_vietgap",
  middleWare.isAuth,
  blockchain.getVietGap
);
// deploy_contracts
router.post(
  "/v0/deploy_contracts_vietgap",
  [
    body("address").notEmpty().withMessage("Please enter a valid address."),
    body("private_key")
      .notEmpty()
      .withMessage("Please enter a valid private key."),
  ],
  middleWare.isAuth,
  blockchain.deployContract
);
// get_contract_vietgap
// router.get("v0/get_contract_vietgap", middleWare.isAuth);
// get list product
router.get("/v0/get_list_product", middleWare.isAuth, product.getListProduct);

router.post(
  "/v0/write_product",
  [
    body("address_contract")
      .notEmpty()
      .withMessage("Please enter a valid address contract."),
  ],
  middleWare.isAuth,
  product.writeProduct
);

router.get(
  "/v0/:address_contract/get_product",
  [
    param("address_contract")
      .notEmpty()
      .withMessage("address_contract kh??ng t???n t???i"),
  ],
  middleWare.isAuth,
  product.getProduct
);

router.get(
  "/v0/:address_contract/get_qr_code",
  [
    param("address_contract")
      .notEmpty()
      .withMessage("address_contract kh??ng t???n t???i"),
  ],
  middleWare.isAuth,
  product.getQrCode
);

router.get(
  "/v0/:address_contract/:key/get_one_qr_code",
  [
    param("address_contract")
      .notEmpty()
      .withMessage("address_contract kh??ng t???n t???i"),
    param("key").notEmpty().withMessage("key kh??ng t???n t???i"),
  ],
  middleWare.isAuth,
  product.getOneByQrCode
);

router.post(
  "/v0/set_qr_code",
  [
    body("address_contract")
      .notEmpty()
      .withMessage("address_contract kh??ng t???n t???i"),
    body("action_name").notEmpty().withMessage("action_name kh??ng t???n t???i"),
    body("description").notEmpty().withMessage("description kh??ng t???n t???i"),
  ],
  middleWare.isAuth,
  product.setQrCode
);

router.post(
  "/v0/set_status_msg_action",
  [
    body("address_contract")
      .notEmpty()
      .withMessage("address_contract kh??ng t???n t???i"),
    body("msg_action_id").notEmpty().withMessage("msg_action_id kh??ng t???n t???i"),
    body("status").notEmpty().withMessage("status kh??ng t???n t???i"),
  ],
  product.setStatusMsgAaction
);

router.post(
  "/v0/set_history",
  [
    body("address_contract")
      .notEmpty()
      .withMessage("address_contract kh??ng t???n t???i"),
    body("key_qrcode").notEmpty().withMessage("key_qrcode kh??ng t???n t???i"),
    body("msg_action_id").notEmpty().withMessage("msg_action_id kh??ng t???n t???i"),
  ],
  middleWare.isAuth,
  product.setHistory
);

router.get(
  "/v0/:address_contract/get_history",
  [
    param("address_contract")
      .notEmpty()
      .withMessage("address_contract kh??ng t???n t???i"),
  ],
  middleWare.isAuth,
  product.getHistory
);

router.post(
  "/v0/set_verify_contract",
  [
    body("contract_id").notEmpty().withMessage("contract_id kh??ng t???n t???i"),
    body("msg_id").notEmpty().withMessage("msg_id kh??ng t???n t???i"),
  ],
  middleWare.isAuth,
  product.setVerifyContract
);

router.post(
  "/v0/set_end_smartcontract",
  [
    body("contract_id").notEmpty().withMessage("contract_id kh??ng t???n t???i"),
    body("msg_id").notEmpty().withMessage("msg_id kh??ng t???n t???i"),
  ],
  middleWare.isAuth,
  product.setEndSmartContract
);

router.post(
  "/v0/send_yeu_cau_verify",
  [
    body("address_contract")
      .notEmpty()
      .withMessage("contract_id kh??ng t???n t???i"),
    body("type").notEmpty().withMessage("type kh??ng t???n t???i"),
  ],
  middleWare.isAuth,
  product.sendRequestVerify
);

router.post(
  "/v0/reject",
  [body("msg_id").notEmpty().withMessage("msg_id kh??ng t???n t???i")],
  middleWare.isAuth,
  product.reject
);

router.get("/v0/get_list_msg", middleWare.isAuth, product.getListMsg);
router.get(
  "/v0/:address_contract/get_msg_action_for_farmer",
  [
    param("address_contract")
      .notEmpty()
      .withMessage("address_contract kh??ng t???n t???i"),
  ],
  middleWare.isAuth,
  product.getMsgActionForFarmer
);

router.post(
  "/v0/change",
  [
    body("msg_id").notEmpty().withMessage("msg_id kh??ng t???n t???i"),
    body("status").notEmpty().withMessage("status kh??ng t???n t???i"),
  ],
  middleWare.isAuth,
  product.change
);

router.post(
  "/v0/thong_ke",
  [
    body("address_contract")
      .notEmpty()
      .withMessage("address_contract kh??ng t???n t???i"),
  ],
  middleWare.isAuth,
  product.thongKe
);

router.post(
  "/v0/product/delete",
  [body("product_id").notEmpty().withMessage("product_id kh??ng t???n t???i")],
  middleWare.isAuth,
  product.deleteProduct
);

router.post(
  "/v0/household/delete",
  [body("household_id").notEmpty().withMessage("household_id kh??ng t???n t???i")],
  middleWare.isAuth,
  product.deleteHousehold
);

router.post(
  "/v0/msg/delete",
  [body("msg_id").notEmpty().withMessage("msg_id kh??ng t???n t???i")],
  middleWare.isAuth,
  product.deleteMsg
);

router.post(
  "/v0/group/delete",
  [body("group_id").notEmpty().withMessage("group_id kh??ng t???n t???i")],
  middleWare.isAuth,
  product.deleteGroup
);

module.exports = router;
