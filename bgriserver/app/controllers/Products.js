const { validationResult, check } = require("express-validator");
const { HouseHolds } = require("../commom/Constants");
const Constants = require("../commom/Constants");
const ContractDB = require("../database/contracts");
const UserDB = require("../database/users");
const HouseholdDB = require("../database/households");
const MsgActionDB = require("../database/msg_action");
const TransactionDB = require("../database/transaction");
const MsgDB = require("../database/msg");
const GroupDB = require("../database/groups");
const setBlockchain = require("../blockchain/Set");
const getBlockchain = require("../blockchain/Get");
const { getListHouseHold } = require("./User");
const { setDat } = require("../blockchain/Set");
const Get = require("../blockchain/Get");
const { get } = require("mongoose");
module.exports = {
  getListProduct: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let error = errors.errors;
        return res.status(200).send({ status: 500, error });
      }
      let userId = req.jwtDecoded;
      getInfodUserById = await UserDB.findById(userId);

      role = getInfodUserById.role;

      let items = [];
      if (role == Constants.LienGorup) {
        getContract = await ContractDB.find({ parent_id: userId });
        for (let i = 0; i < getContract.length; i++) {
          getContract[i].abi = "";
          items.push(getContract[i]);
        }
        return res.status(200).send({ status: 200, items });
      }
      if (role == Constants.Group) {
        getContract = await ContractDB.find({ user_id: userId });
        for (let i = 0; i < getContract.length; i++) {
          getContract[i].abi = "";
          items.push(getContract[i]);
        }
        return res.status(200).send({ status: 200, items });
      }
      if (role == Constants.HouseHolds) {
        getHouseHoldByID = await HouseholdDB.find({ user_id: userId });
        console.log(getHouseHoldByID);
        for (let i = 0; i < getHouseHoldByID.length; i++) {
          getContract = await ContractDB.findById(
            getHouseHoldByID[i].contract_id
          );

          if (getContract) {
            getContract.abi = "";
            items.push(getContract);
          }
        }

        return res.status(200).send({ status: 200, items });
      }
      return res.status(200).send({ status: 200, items });
    } catch (error) {
      return res.status(200).send({ status: 200, error });
    }
  },
  writeProduct: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let error = errors.errors;
        return res.status(200).send({ status: 500, error });
      }
      let userId = req.jwtDecoded;
      let addressContract = req.body.address_contract;
      getInfodUserById = await UserDB.findById(userId);

      dataDat = req.body.dataDat;
      dataNuoc = req.body.dataNuoc;
      dataGiong = req.body.dataGiong;
      dataInfo = req.body.dataInfo;

      if (dataDat == null && dataDat.length != Constants.LenghDat) {
        return res
          .status(200)
          .send({ status: 500, msg: "Trường data dat null hoặc thiếu" });
      }
      if (dataInfo == null && dataInfo.length != Constants.LenghInfo) {
        return res
          .status(200)
          .send({ status: 500, msg: "Trường data info null hoặc thiếu" });
      }
      if (dataNuoc == null && dataNuoc.length != Constants.LenghNuoc) {
        return res
          .status(200)
          .send({ status: 500, msg: "Trường data nuoc null hoặc thiếu" });
      }
      if (dataGiong == null && dataGiong.length != Constants.LenghGiong) {
        return res
          .status(200)
          .send({ status: 500, msg: "Trường data nuoc null hoặc thiếu" });
      }
      timeNow = await getDateTime();

      getAbiByAddressContract = await ContractDB.findOne({
        address_contract: addressContract,
      });

      resultSetDat = await setBlockchain.setDat(
        getInfodUserById.address,
        getInfodUserById.private_key,
        addressContract,
        dataDat,
        JSON.parse(getAbiByAddressContract.abi),
        timeNow
      );

      if (resultSetDat == null) {
        return res
          .status(200)
          .send({ status: 500, msg: "Không thể ghi thông tin đất" });
      }
      resultSetNuoc = await setBlockchain.setNuoc(
        getInfodUserById.address,
        getInfodUserById.private_key,
        addressContract,
        dataNuoc,
        JSON.parse(getAbiByAddressContract.abi),
        timeNow
      );
      if (resultSetNuoc == null) {
        return res
          .status(200)
          .send({ status: 500, msg: "Không thể ghi thông tin nước" });
      }
      resultSetGiong = await setBlockchain.setGiong(
        getInfodUserById.address,
        getInfodUserById.private_key,
        addressContract,
        dataGiong,
        JSON.parse(getAbiByAddressContract.abi),
        timeNow
      );
      if (resultSetGiong == null) {
        return res
          .status(200)
          .send({ status: 500, msg: "Không thể ghi thông tin giống" });
      }
      resultSetInfo = await setBlockchain.setInfo(
        getInfodUserById.address,
        getInfodUserById.private_key,
        addressContract,
        dataInfo,
        JSON.parse(getAbiByAddressContract.abi),
        timeNow
      );
      if (resultSetInfo == null) {
        return res
          .status(200)
          .send({ status: 500, msg: "Không thể ghi thông tin info" });
      }

      dataInfo[0] = timeNow;
      await ContractDB.updateOne(
        { address_contract: addressContract },
        {
          $set: {
            data_info: dataInfo,
          },
        }
      );
      return res
        .status(200)
        .send({ status: 200, msg: "Ghi thông tin thành công" });
    } catch (error) {
      return res.status(200).send({ status: 200, error });
    }
  },
  getProduct: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let error = errors.errors;
        return res.status(200).send({ status: 500, error });
      }
      let userId = req.jwtDecoded;
      let addressContract = req.params.address_contract;

      getInfodUserById = await UserDB.findById(userId);
      let getContractByAddressContract = await ContractDB.findOne({
        address_contract: addressContract,
      });
      data_info = JSON.parse(getContractByAddressContract.data_info);

      console.log(getContractByAddressContract.data_info);

      role = getInfodUserById.role;

      let resultGetDat = await getBlockchain.getDat(
        getInfodUserById.address,
        addressContract,
        JSON.parse(getContractByAddressContract.abi)
      );
      let resultGetNuoc = await getBlockchain.getNuoc(
        getInfodUserById.address,
        addressContract,
        JSON.parse(getContractByAddressContract.abi)
      );
      let resultGetGiong = await getBlockchain.getGiong(
        getInfodUserById.address,
        addressContract,
        JSON.parse(getContractByAddressContract.abi)
      );
      let resultGetInfo = await getBlockchain.getInfo(
        getInfodUserById.address,
        addressContract,
        JSON.parse(getContractByAddressContract.abi)
      );

      respInfo = {
        name: "Thông tin mùa vụ",
        data: [
          {
            name: "Thời gian",
            data: data_info[0],
          },
          {
            name: "Tên",
            data: data_info[1],
          },
          {
            name: "Địa điểm",
            data: data_info[2],
          },
          {
            name: "Diện tích",
            data: data_info[3],
          },
        ],
      };

      respDat = {
        name: "Thông tin về đất",
        data: [
          {
            name: "Thời gian",
            data: resultGetDat[0],
          },
          {
            name: "Loại đất",
            data: resultGetDat[1],
          },
          {
            name: "Độ Ph",
            data: resultGetDat[2],
          },
          {
            name: "Vị trí",
            data: resultGetDat[2],
          },
          {
            name: "Miêu tả",
            data: resultGetDat[3],
          },
        ],
      };
      respNuoc = {
        name: "Thông tin về nguồn nước",
        data: [
          {
            name: "Thời gian",
            data: resultGetNuoc[0],
          },
          {
            name: "Nguồn nước",
            data: resultGetNuoc[1],
          },
          {
            name: "Độ Ph",
            data: resultGetNuoc[2],
          },
          {
            name: "Vị trí",
            data: resultGetNuoc[2],
          },
          {
            name: "Miêu tả",
            data: resultGetNuoc[3],
          },
        ],
      };

      respGiong = {
        name: "Thông tin về giống cây",
        data: [
          {
            name: "Thời gian",
            data: resultGetGiong[0],
          },
          {
            name: "Tên giống",
            data: resultGetGiong[1],
          },
          {
            name: "Nguồn gốc",
            data: resultGetGiong[2],
          },
          {
            name: "Miêu tả",
            data: resultGetGiong[3],
          },
        ],
      };

      respHistory = {
        name: "Cấu hình ghi nhật kí",
        data: [
          {
            name: "Thời gian",
            data: null,
          },
          {
            name: "Hành động",
            data: null,
          },
          {
            name: "Miêu tả",
            data: null,
          },
        ],
      };
      respThem = {
        name: "Thông tin thêm",
        data: JSON.parse(getContractByAddressContract.data),
      };
      getVerifyContract = await Get.getVerifySmartcontract(
        getInfodUserById.address,
        addressContract,
        JSON.parse(getContractByAddressContract.abi)
      );

      getMsg = await MsgDB.findOne({ address_contract: addressContract });

      if (getMsg == null) {
        status_msg = null;
      } else {
        status_msg = getMsg.status;
      }

      return res.status(200).send({
        status: 200,
        resp_info: respInfo,
        resp_dat: respDat,
        resp_giong: respGiong,
        resp_nuoc: respNuoc,
        resp_them: respThem,
        resp_history: respHistory,
        verify_contract: getVerifyContract,
        status_msg: status_msg,
      });
    } catch (error) {
      return res.status(200).send({ status: 500, error });
    }
  },
  setQrCode: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let error = errors.errors;
        return res.status(200).send({ status: 500, error });
      }
      let userId = req.jwtDecoded;
      let addressContract = req.body.address_contract;
      let actionName = req.body.action_name;
      let description = req.body.description;
      let _keyQrcode = Math.floor(Math.random() * (1000000000 - 1) + 1);

      getInfodUserById = await UserDB.findById(userId);
      let getContractByAddressContract = await ContractDB.findOne({
        address_contract: addressContract,
      });

      role = getInfodUserById.role;
      timeNow = await getDateTime();
      if (role != Constants.Group) {
        return res
          .status(200)
          .send({ status: 500, msg: "Bạn không có quyền tạo qr code" });
      }

      getAllHousehold = await HouseholdDB.find({
        parent_group_id: userId,
        contract_id: getContractByAddressContract._id,
      });

      for (let i = 0; i < getAllHousehold.length; i++) {
        data_insert = {
          user_id: userId,
          user_id_household: getAllHousehold[i].user_id,
          status: 0,
          address_contract: addressContract,
          key_action: _keyQrcode,
          data: "",
        };

        new MsgActionDB(data_insert).save();
      }

      let setQrCode = await setBlockchain.setQrCode(
        getInfodUserById.address,
        getInfodUserById.private_key,
        addressContract,
        actionName,
        description,
        _keyQrcode,
        JSON.parse(getContractByAddressContract.abi),
        timeNow
      );

      return res
        .status(200)
        .send({ status: 200, msg: "Tạo qr code thành công", tx: setQrCode });
    } catch (error) {
      return res.status(200).send({ status: 500, error });
    }
  },
  getQrCode: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let error = errors.errors;
        return res.status(200).send({ status: 500, error });
      }
      let userId = req.jwtDecoded;
      let addressContract = req.params.address_contract;

      getInfodUserById = await UserDB.findById(userId);
      let getContractByAddressContract = await ContractDB.findOne({
        address_contract: addressContract,
      });

      role = getInfodUserById.role;

      if (role != Constants.Group) {
        return res
          .status(200)
          .send({ status: 500, msg: "Bạn không có quyền get qr code" });
      }
      let resultAllGetKeyQrCode = await getBlockchain.getKeyQrCode(
        getInfodUserById.address,
        addressContract,
        JSON.parse(getContractByAddressContract.abi)
      );

      if (resultAllGetKeyQrCode == "null") {
        return res.status(200).send({ status: 200, items: null });
      }
      items = [];
      for (let i = 0; i < resultAllGetKeyQrCode.length; i++) {
        let resultQrCode = await getBlockchain.getQrCode(
          getInfodUserById.address,
          addressContract,
          JSON.parse(getContractByAddressContract.abi),
          resultAllGetKeyQrCode[i]
        );
        data = {
          time: resultQrCode[0],
          action_name: resultQrCode[1],
          description: resultQrCode[2],
          key: resultAllGetKeyQrCode[i],
        };
        items.push(data);
      }
      return res.status(200).send({ status: 200, items: items });
    } catch (error) {
      return res.status(200).send({ status: 500, error });
    }
  },
  setHistory: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let error = errors.errors;
        return res.status(200).send({ status: 500, error });
      }
      let userId = req.jwtDecoded;
      let addressContract = req.body.address_contract;
      let key_qrcode = req.body.key_qrcode;
      let msg_action_id = req.body.msg_action_id;

      timeNow = await getDateTime();

      getInfodUserById = await UserDB.findById(userId);

      let getContractByAddressContract = await ContractDB.findOne({
        address_contract: addressContract,
      });

      get_msg_action = await MsgActionDB.findById(msg_action_id);
      data = get_msg_action.data;

      let resultQrCode = await getBlockchain.getQrCode(
        getInfodUserById.address,
        addressContract,
        JSON.parse(getContractByAddressContract.abi),
        key_qrcode
      );

      resultSetHistory = await setBlockchain.setHistory(
        getInfodUserById.address,
        getInfodUserById.private_key,
        addressContract,
        key_qrcode,
        resultQrCode[2],
        JSON.parse(getContractByAddressContract.abi),
        timeNow
      );
      if (resultSetHistory == null) {
        return res
          .status(200)
          .send({ status: 500, msg: "Ghi thông tin thất bại" });
      }

      resultDataCustom = await setBlockchain.setDataCustom(
        getInfodUserById.address,
        getInfodUserById.private_key,
        addressContract,
        data,
        JSON.parse(getContractByAddressContract.abi),
        timeNow
      );

      transaction = {
        contract_id: getContractByAddressContract._id,
        tx: resultSetHistory,
      };

      await MsgActionDB.updateOne(
        { _id: msg_action_id },
        {
          $set: {
            status: 2,
          },
        }
      );

      await new TransactionDB(transaction).save();
      return res.status(200).send({
        status: 200,
        msg: "Ghi thông tin thành công",
        tx: resultSetHistory,
      });
    } catch (error) {
      return res.status(200).send({ status: 500, error });
    }
  },
  setVerifyContract: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let error = errors.errors;
        return res.status(200).send({ status: 500, error });
      }
      let userId = req.jwtDecoded;
      let contract_id = req.body.contract_id;
      let msgId = req.body.msg_id;

      getInfodUserById = await UserDB.findById(userId);
      if (getInfodUserById.role != Constants.LienGorup) {
        return res.status(200).send({
          status: 500,
          msg: "Bạn không có quyền , chỉ liên nhóm mới có thể",
        });
      }
      let getContractById = await ContractDB.findById(contract_id);

      data = await setBlockchain.setVerifyContract(
        getInfodUserById.address,
        getInfodUserById.private_key,
        getContractById.address_contract,
        JSON.parse(getContractById.abi)
      );

      updateContract = await MsgDB.updateOne(
        { _id: msgId },
        {
          $set: {
            status: 2,
          },
        }
      );

      return res.status(200).send({
        status: 200,
        msg: "Thay đổi thành công",
      });
    } catch (error) {
      return res.status(200).send({ status: 500, error });
    }
  },
  getHistory: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let error = errors.errors;
        return res.status(200).send({ status: 500, error });
      }
      let userId = req.jwtDecoded;
      let addressContract = req.params.address_contract;

      getInfodUserById = await UserDB.findById(userId);
      let getContractByAddressContract = await ContractDB.findOne({
        address_contract: addressContract,
      });

      getCount = await Get.getCount(
        getInfodUserById.address,
        getContractByAddressContract.address_contract,
        JSON.parse(getContractByAddressContract.abi)
      );

      items = [];
      for (let i = 0; i < Number(getCount); i++) {
        getHistory = await getBlockchain.getHistory(
          getInfodUserById.address,
          getContractByAddressContract.address_contract,
          JSON.parse(getContractByAddressContract.abi),
          i
        );
        data = {
          time: getHistory[0],
          action_name: getHistory[1],
          key_qrcode: getHistory[2],
          description: getHistory[3],
        };
        items.push(data);
      }

      getCountCustom = await Get.getCountCustom(
        getInfodUserById.address,
        getContractByAddressContract.address_contract,
        JSON.parse(getContractByAddressContract.abi)
      );

      var itemsAdd = [];
      Name = [];
      var result;
      for (
        let i = 0;
        i < JSON.parse(getContractByAddressContract.data).length;
        i++
      ) {
        Name.push(JSON.parse(getContractByAddressContract.data)[i].name);
      }

      for (let i = 0; i < Number(getCountCustom); i++) {
        getDataCustom = await getBlockchain.getDataCustom(
          getInfodUserById.address,
          getContractByAddressContract.address_contract,
          JSON.parse(getContractByAddressContract.abi),
          i
        );
        dataAdd = [];
        for (let j = 0; j < Name.length; j++) {
          value = {
            name: Name[j],
            data: getDataCustom[j],
          };

          dataAdd.push(value);
        }
        itemsAdd.push(dataAdd);
      }

      return res.status(200).send({ status: 200, data: items, itemsAdd });
    } catch (error) {
      return res.status(200).send({ status: 500, error });
    }
  },
  setEndSmartContract: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let error = errors.errors;
        return res.status(200).send({ status: 500, error });
      }
      let userId = req.jwtDecoded;
      let contract_id = req.body.contract_id;
      let msgId = req.body.msg_id;

      getInfodUserById = await UserDB.findById(userId);
      if (getInfodUserById.role != Constants.LienGorup) {
        return res.status(200).send({
          status: 500,
          msg: "Bạn không có quyền , chỉ liên nhóm mới có thể",
        });
      }
      let getContractById = await ContractDB.findById(contract_id);

      data = await setBlockchain.setEndSmartContract(
        getInfodUserById.address,
        getInfodUserById.private_key,
        getContractById.address_contract,
        JSON.parse(getContractById.abi)
      );

      updateContract = await MsgDB.updateOne(
        { _id: msgId },
        {
          $set: {
            status: 2,
          },
        }
      );

      return res.status(200).send({
        status: 200,
        msg: "Kết thúc mùa vụ thành công rùi",
        tx: data,
      });
    } catch (error) {
      return res.status(200).send({ status: 500, error });
    }
  },
  getOneByQrCode: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let error = errors.errors;
        return res.status(200).send({ status: 500, error });
      }
      let userId = req.jwtDecoded;
      let addressContract = req.params.address_contract;
      let key = req.params.key;
      getInfodUserById = await UserDB.findById(userId);
      let getContractByAddressContract = await ContractDB.findOne({
        address_contract: addressContract,
      });

      role = getInfodUserById.role;

      let resultOneQrCode = await getBlockchain.getQrCode(
        getInfodUserById.address,
        addressContract,
        JSON.parse(getContractByAddressContract.abi),
        key
      );

      get_data_msg_action = await MsgActionDB.find({
        key_action: key,
        address_contract: addressContract,
      });

      for (let i = 0; i < get_data_msg_action.length; i++) {
        get_info_user_household = await UserDB.findById(
          get_data_msg_action[i].user_id_household
        );
        email_user = get_info_user_household.email;
        get_data_msg_action[i].user_id_household = email_user;
      }

      data = {
        time: resultOneQrCode[0],
        action_name: resultOneQrCode[1],
        description: resultOneQrCode[2],
        key: key,
        infoAdd: JSON.parse(getContractByAddressContract.data),
        msg_action: get_data_msg_action,
      };

      return res.status(200).send({ status: 200, data });
    } catch (error) {
      return res.status(200).send({ status: 500, error });
    }
  },

  sendRequestVerify: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let error = errors.errors;
        return res.status(200).send({ status: 500, error });
      }
      let userId = req.jwtDecoded;
      let addressContract = req.body.address_contract;
      let type = req.body.type;
      getInfodUserById = await UserDB.findById(userId);

      checkExistType = await MsgDB.findOne({
        address_contract: addressContract,
        type: type,
      });

      if (checkExistType && checkExistType.status != 3) {
        return res
          .status(200)
          .send({ status: 200, msg: "Yêu cầu đã được chấp nhận" });
      }

      getContract = await ContractDB.findOne({
        address_contract: addressContract,
        user_id: userId,
      });
      data = {
        user_id: userId,
        user_id_lien_group: getContract.parent_id,
        contract_id: getContract._id,
        type: type,
        address_contract: addressContract,
        status: 1,
      };
      result = await new MsgDB(data).save();

      return res.status(200).send({ status: 200, data: result });
    } catch (error) {
      return res.status(200).send({ status: 500, error });
    }
  },
  reject: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let error = errors.errors;
        return res.status(200).send({ status: 500, error });
      }
      let userId = req.jwtDecoded;
      let msgId = req.body.msg_id;

      updateMsg = await MsgDB.updateOne(
        { _id: msgId },
        {
          $set: {
            status: 3,
          },
        }
      );

      return res.status(200).send({ status: 200, data: updateMsg });
    } catch (error) {
      return res.status(200).send({ status: 500, error });
    }
  },
  getListMsg: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let error = errors.errors;
        return res.status(200).send({ status: 500, error });
      }
      let userId = req.jwtDecoded;
      getInfodUserById = await UserDB.findById(userId);
      if (getInfodUserById.role != Constants.LienGorup) {
        return res.status(200).send({
          status: 500,
          msg: "Bạn không có quyền , chỉ liên nhóm mới có thể get msg",
        });
      }
      items = [];

      getAllMsg = await MsgDB.find({ user_id_lien_group: userId });
      for (let i = 0; i < getAllMsg.length; i++) {
        get_user = await UserDB.findById(getAllMsg[i].user_id);
        getAllMsg[i].user_id = get_user.email;
        items.push(getAllMsg[i]);
      }
      console.log(items);

      return res.status(200).send({ status: 200, items });
    } catch (error) {
      return res.status(200).send({ status: 500, error });
    }
  },
  change: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let error = errors.errors;
        return res.status(200).send({ status: 500, error });
      }
      let userId = req.jwtDecoded;
      let msgId = req.body.msg_id;
      let status = req.body.status;

      getInfodUserById = await UserDB.findById(userId);
      if (getInfodUserById.role != Constants.LienGorup) {
        return res.status(200).send({
          status: 500,
          msg: "Bạn không có quyền , chỉ liên nhóm mới có thể get msg",
        });
      }

      updateContract = await MsgDB.updateOne(
        { _id: msgId },
        {
          $set: {
            status: status,
          },
        }
      );

      return res.status(200).send({ status: 200, msg: "update thành công" });
    } catch (error) {
      return res.status(200).send({ status: 500, error });
    }
  },
  thongKe: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let error = errors.errors;
        return res.status(200).send({ status: 500, error });
      }
      let userId = req.jwtDecoded;

      let addressContract = req.body.address_contract;

      getInfodUserById = await UserDB.findById(userId);
      let getContractByAddressContract = await ContractDB.findOne({
        address_contract: addressContract,
      });

      data_info = JSON.parse(getContractByAddressContract.data_info);

      role = getInfodUserById.role;

      let resultGetDat = await getBlockchain.getDat(
        getInfodUserById.address,
        addressContract,
        JSON.parse(getContractByAddressContract.abi)
      );
      let resultGetNuoc = await getBlockchain.getNuoc(
        getInfodUserById.address,
        addressContract,
        JSON.parse(getContractByAddressContract.abi)
      );
      let resultGetGiong = await getBlockchain.getGiong(
        getInfodUserById.address,
        addressContract,
        JSON.parse(getContractByAddressContract.abi)
      );

      let resultGetInfo = await getBlockchain.getInfo(
        getInfodUserById.address,
        addressContract,
        JSON.parse(getContractByAddressContract.abi)
      );

      respInfo = {
        name: "Thông tin mùa vụ",
        data: [
          {
            name: "Thời gian",
            data: data_info[0],
          },
          {
            name: "Tên",
            data: data_info[1],
          },
          {
            name: "Địa điểm",
            data: data_info[2],
          },
          {
            name: "Diện tích",
            data: data_info[3],
          },
        ],
      };

      respDat = {
        name: "Thông tin về đất",
        data: [
          {
            name: "Thời gian",
            data: resultGetDat[0],
          },
          {
            name: "Loại đất",
            data: resultGetDat[1],
          },
          {
            name: "Độ Ph",
            data: resultGetDat[2],
          },
          {
            name: "Vị trí",
            data: resultGetDat[2],
          },
          {
            name: "Miêu tả",
            data: resultGetDat[3],
          },
        ],
      };
      respNuoc = {
        name: "Thông tin về nguồn nước",
        data: [
          {
            name: "Thời gian",
            data: resultGetNuoc[0],
          },
          {
            name: "Nguồn nước",
            data: resultGetNuoc[1],
          },
          {
            name: "Độ Ph",
            data: resultGetNuoc[2],
          },
          {
            name: "Vị trí",
            data: resultGetNuoc[2],
          },
          {
            name: "Miêu tả",
            data: resultGetNuoc[3],
          },
        ],
      };

      respGiong = {
        name: "Thông tin về giống cây",
        data: [
          {
            name: "Thời gian",
            data: resultGetGiong[0],
          },
          {
            name: "Tên giống",
            data: resultGetGiong[1],
          },
          {
            name: "Nguồn gốc",
            data: resultGetGiong[2],
          },
          {
            name: "Miêu tả",
            data: resultGetGiong[3],
          },
        ],
      };

      getCount = await Get.getCount(
        getInfodUserById.address,
        getContractByAddressContract.address_contract,
        JSON.parse(getContractByAddressContract.abi)
      );

      respHistory = [];
      for (let i = 0; i < Number(getCount); i++) {
        getHistory = await getBlockchain.getHistory(
          getInfodUserById.address,
          getContractByAddressContract.address_contract,
          JSON.parse(getContractByAddressContract.abi),
          i
        );
        data = {
          time: getHistory[0],
          action_name: getHistory[1],
          key_qrcode: getHistory[2],
          description: getHistory[3],
        };
        respHistory.push(data);
      }

      getCountCustom = await Get.getCountCustom(
        getInfodUserById.address,
        getContractByAddressContract.address_contract,
        JSON.parse(getContractByAddressContract.abi)
      );

      var respCustom = [];
      Name = [];

      for (
        let i = 0;
        i < JSON.parse(getContractByAddressContract.data).length;
        i++
      ) {
        Name.push(JSON.parse(getContractByAddressContract.data)[i].name);
      }

      for (let i = 0; i < Number(getCountCustom); i++) {
        getDataCustom = await getBlockchain.getDataCustom(
          getInfodUserById.address,
          getContractByAddressContract.address_contract,
          JSON.parse(getContractByAddressContract.abi),
          i
        );
        dataAdd = [];
        for (let j = 0; j < Name.length; j++) {
          value = {
            name: Name[j],
            data: getDataCustom[j],
          };

          dataAdd.push(value);
        }
        respCustom.push(dataAdd);
      }

      getEndSmartContract = await Get.getEndSmartContract(
        getInfodUserById.address,
        addressContract,
        JSON.parse(getContractByAddressContract.abi)
      );

      respTx = [];
      getTransaction = await TransactionDB.find({
        contract_id: getContractByAddressContract._id,
      });

      for (let i = 0; i < getTransaction.length; i++) {
        respTx.push(getTransaction[i]);
      }
      getMsg = await MsgDB.findOne({
        address_contract: addressContract,
        type: 2,
      });

      if (getMsg == null) {
        status_msg = null;
      } else {
        status_msg = getMsg.status;
      }

      return res.status(200).send({
        status: 200,
        resp_info: respInfo,
        resp_dat: respDat,
        resp_giong: respGiong,
        resp_nuoc: respNuoc,
        resp_custom: respCustom,
        resp_custom: respCustom,
        resp_history: respHistory,
        resp_tx: respTx,
        end_smart_contract: getEndSmartContract,
        status_msg: status_msg,
      });
    } catch (error) {
      return res.status(200).send({ status: 500, error });
    }
  },
  setStatusMsgAaction: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let error = errors.errors;
        return res.status(200).send({ status: 500, error });
      }
      let userId = req.jwtDecoded;
      let msgActionId = req.body.msg_action_id;
      let status = req.body.status;
      let data = req.body.data;

      getInfodUserById = await UserDB.findById(userId);
      if (data) {
        await MsgActionDB.updateOne(
          { _id: msgActionId },
          {
            $set: {
              status: status,
              data: data,
            },
          }
        );
      } else {
        update = await MsgActionDB.updateOne(
          { _id: msgActionId },
          {
            $set: {
              status: status,
            },
          }
        );
      }

      return res.status(200).send({ status: 200, msg: "update thành công" });
    } catch (error) {
      return res.status(200).send({ status: 500, msg: error });
    }
  },
  getMsgActionForFarmer: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let error = errors.errors;
        return res.status(200).send({ status: 500, error });
      }
      let userId = req.jwtDecoded;
      let addressContract = req.params.address_contract;

      getInfodUserById = await UserDB.findById(userId);

      get_msg_action = await MsgActionDB.find({
        user_id_household: userId,
        address_contract: addressContract,
      });

      return res.status(200).send({ status: 200, items: get_msg_action });
    } catch (error) {
      return res.status(200).send({ status: 500, error });
    }
  },
  deleteProduct: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let error = errors.errors;
        return res.status(200).send({ status: 500, error });
      }
      let userId = req.jwtDecoded;
      let product_id = req.body.product_id;

      await ContractDB.deleteOne({ _id: product_id });
      return res.status(200).send({ status: 200, msg: "Xoa thanh cong" });
    } catch (error) {
      return res.status(200).send({ status: 500, msg: "Xoa that bai" });
    }
  },
  deleteHousehold: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let error = errors.errors;
        return res.status(200).send({ status: 500, error });
      }
      let userId = req.jwtDecoded;
      let household_id = req.body.household_id;

      await HouseholdDB.deleteOne({ user_id: household_id });
      return res.status(200).send({ status: 200, msg: "Xoa thanh cong" });
    } catch (error) {
      return res.status(200).send({ status: 500, msg: "Xoa that bai" });
    }
  },
  deleteMsg: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let error = errors.errors;
        return res.status(200).send({ status: 500, error });
      }
      let userId = req.jwtDecoded;
      let msg_id = req.body.msg_id;

      await MsgDB.deleteOne({ _id: msg_id });
      return res.status(200).send({ status: 200, msg: "Xoa thanh cong" });
    } catch (error) {
      return res.status(200).send({ status: 500, msg: "Xoa that bai" });
    }
  },
  deleteGroup: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let error = errors.errors;
        return res.status(200).send({ status: 500, error });
      }
      let userId = req.jwtDecoded;
      let group_id = req.body.group_id;

      await GroupDB.deleteOne({ user_id: group_id });
      return res.status(200).send({ status: 200, msg: "Xoa thanh cong" });
    } catch (error) {
      return res.status(200).send({ status: 500, msg: "Xoa that bai" });
    }
  },
};

async function getDateTime() {
  var date = new Date();

  var hour = date.getHours();
  hour = (hour < 10 ? "0" : "") + hour;

  var min = date.getMinutes();
  min = (min < 10 ? "0" : "") + min;

  var sec = date.getSeconds();
  sec = (sec < 10 ? "0" : "") + sec;

  var year = date.getFullYear();

  var month = date.getMonth() + 1;
  month = (month < 10 ? "0" : "") + month;

  var day = date.getDate();
  day = (day < 10 ? "0" : "") + day;

  data =
    day + "-" + month + "-" + year + "-" + hour + "h-" + min + "m-" + sec + "s";
  return data;
}
