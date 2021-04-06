const { validationResult, check } = require("express-validator");
var md5 = require("md5");
const Constants = require("../commom/Constants");
const jwtHelper = require("../helpers/jwt_helper");
const UserDB = require("../database/users");
const GroupDb = require("../database/groups");
const HouseHoldDB = require("../database/households");
const ContractDB = require("../database/contracts");
const { use } = require("../routes");

const Web3 = require("web3");
const web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://ropsten.infura.io/v3/66092b83a4de4330b7cc5df887e3ae4b"
  )
);

module.exports = {
  signup: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let error = errors.errors;
        return res.status(200).send({ status: 500, error });
      }
      var name = req.body.name;
      var email = req.body.email;
      var password = req.body.password;
      var role = req.body.role;
      checkExistEmail = await UserDB.findOne({ email: email });
      if (checkExistEmail) {
        return res
          .status(200)
          .send({ status: 500, msg: "Email already exists " });
      }
      data = {
        name: name,
        email: email,
        password: md5(password),
        role: role,
        address: "0xe4680B5B373b9353AF87De622a6E410E067a25c9",
        private_key:
          "ef0be3ad9cf6ab09b1aaca99e1880546e4ca82e159a590291d0ec67e5929d0cf",
      };
      const result = await new UserDB(data).save();

      if (result.status == 500) {
        return res.status(200).send({ result });
      } else {
        return res.status(200).send({ status: 200, result });
      }
    } catch (error) {
      return res.status(200).send({ status: 200, error });
    }
  },
  login: async (req, res, next) => {
    try {
      console.log("vao day");
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let error = errors.errors;
        return res.status(200).send({ status: 500, error });
      }
      var email = req.body.email;
      var password = md5(req.body.password);

      result = await UserDB.findOne({ email: email, password: password });
      if (result != null) {
        let accessToken = await jwtHelper.generateToken(
          result._id,
          Constants.ACCESS_TOKEN_SECRET,
          Constants.ACCESS_TOKEN_LIFE_RESET_PASSWORD
        );
        let refreshToken = await jwtHelper.generateToken(
          result._id,
          Constants.REFRESH_TOKEN_SECRET,
          Constants.REFRESH_TOKEN_LIFE
        );
        return res.status(200).send({
          status: 200,
          msg: "login success",
          user: result,
          access_token: accessToken,
        });
      } else {
        return res.status(200).send({ status: 500, msg: "login fail" });
      }
    } catch (error) {
      return res.status(200).send({ status: 500, error });
    }
  },
  getListNhom: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let error = errors.errors;
        return res.status(200).send({ status: 500, error });
      }
      let userId = req.jwtDecoded;

      result = await GroupDb.find({ parent_id: userId });
      if (result == null) {
        return res.status(200).send({ status: 500, result });
      }
      items = [];
      for (let i = 0; i < result.length; i++) {
        getInfoUser = await UserDB.findById(result[i].user_id);
        getInfoUser.name = result[i].name_group;
        items.push(getInfoUser);
      }

      return res.status(200).send({ status: 200, items: items });
    } catch (error) {
      return res.status(200).send({ status: 500, error });
    }
  },
  addGroup: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let error = errors.errors;
        return res.status(200).send({ status: 500, error });
      }
      let email = req.body.email;
      let userId = req.jwtDecoded;
      let name_group = req.body.name;

      getUserById = await UserDB.findOne({ email: email });

      if (getUserById == null || getUserById.role != 2) {
        return res
          .status(200)
          .send({ status: 500, msg: "email not found or is not intergroup" });
      }

      checkExistGroups = await GroupDb.findOne({ user_id: getUserById._id });

      if (checkExistGroups != null) {
        return res
          .status(200)
          .send({ status: 500, msg: "Email already exists in the group" });
      }

      data = {
        user_id: getUserById._id,
        parent_id: userId,
        name_group: name_group,
      };
      result = await new GroupDb(data).save();
      return res.status(200).send({ status: 200, result });
    } catch (error) {
      return res.status(200).send({ status: 500, error });
    }
  },
  addHouseHold: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let error = errors.errors;
        return res.status(200).send({ status: 500, error });
      }
      let email = req.body.email;
      let user_id = req.jwtDecoded;
      let contract_id = req.body.contract_id;

      getUserById = await UserDB.findById(user_id);
      if (getUserById.role != 2) {
        return res
          .status(200)
          .send({ status: 500, msg: "you need permission" });
      }

      getContractByUserId = await ContractDB.findById(contract_id);
      if (getContractByUserId == null) {
        return res.status(200).send({
          status: 500,
          msg: "product không tìm thấy",
        });
      }
      getUserByEmail = await UserDB.findOne({ email: email });
      if (
        getUserByEmail == null ||
        getUserByEmail.role != Constants.HouseHolds
      ) {
        return res.status(200).send({
          status: 500,
          msg: "Email không tìm thấy hoặc không phải là hộ dân",
        });
      }

      checkExistGroups = await HouseHoldDB.findOne({
        user_id: getUserByEmail._id,
        contract_id: contract_id,
      });
      if (checkExistGroups != null) {
        return res
          .status(200)
          .send({ status: 500, msg: "Email already exists in the household" });
      }

      data = {
        user_id: getUserByEmail._id,
        parent_group_id: user_id,
        contract_id: contract_id,
      };
      result = await new HouseHoldDB(data).save();
      return res.status(200).send({ status: 200, result });
    } catch (error) {
      return res.status(200).send({ status: 500, error });
    }
  },
  getListHouseHold: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let error = errors.errors;
        return res.status(200).send({ status: 500, error });
      }
      // let userId = req.jwtDecoded;
      let userId = req.params.id;
      let contract_id = req.params.contract_id;
      result = await HouseHoldDB.find({
        parent_group_id: userId,
        contract_id: contract_id,
      });
      if (result == null) {
        return res.status(200).send({ status: 500, result });
      }
      items = [];
      for (let i = 0; i < result.length; i++) {
        getInfoUser = await UserDB.findById(result[i].user_id);
        items.push(getInfoUser);
      }

      return res.status(200).send({ status: 200, items: items });
    } catch (error) {
      return res.status(200).send({ status: 500, error });
    }
  },
  getBalance: async (req, res, next) => {
    try {
      console.log("vao day");
      let address = req.body.address;
      var balance = await web3.eth.getBalance(address);
      if (address == null) {
        result = {
          status: 500,
          mg: "address null",
        };
        return res.send(result);
      }
      result = {
        status: 200,
        msg: "success",
        address: address,
        balance: balance / 1000000000000000000,
      };
      console.log(result);
      return res.send(result);
    } catch (error) {
      return res.send(error);
    }
  },
};
