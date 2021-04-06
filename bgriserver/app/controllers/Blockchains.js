const { validationResult, check } = require("express-validator");
const fs = require("fs");
const path = require("path");
const Constants = require("../commom/Constants");
const Compile = require("../blockchain/Compile");
const Deploy = require("../blockchain/Deploy");
const UserDB = require("../database/users");
const GroupDb = require("../database/groups");
const ContractDB = require("../database/contracts");
const { compile } = require("solc");
module.exports = {
  getVietGap: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let error = errors.errors;
      return res.status(200).send({ status: 500, error });
    }
    return res.status(200).send({ status: 200, data: Constants.VietGap });
  },
  deployContract: async (req, res, next) => {
    try {
      timeNow = await getDateTime();
     
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let error = errors.errors;
        return res.status(200).send({ status: 500, error });
      }

      let userId = req.jwtDecoded;
      address = req.body.address;
      privateKey = req.body.private_key;
      dataCustom = req.body.data;
      dataInfo = req.body.dataInfo;
      dataInfo[0] = timeNow;

      checkRole = await UserDB.findById(userId);
      if (checkRole == null || checkRole.role != Constants.Group) {
        return res.status(200).send({
          status: 500,
          msg: "Chỉ user có quyền là liên nhóm mới có thể thêm mới sản phẩm",
        });
      }
      getAddressLienNhom = await GroupDb.findOne({ user_id: userId });
      if (getAddressLienNhom == null) {
        return res
          .status(200)
          .send({ status: 500, msg: "Bạn không thuộc liên group nào" });
      }
      getInfodUserById = await UserDB.findById(getAddressLienNhom.parent_id);
      if (getInfodUserById == null) {
        return res.status(200).send({
          status: 500,
          msg: "Không tìm address block chain của liên nhóm",
        });
      }

      vietGapData = fs.readFileSync(
        path.resolve(__dirname, "./", "Migrations.sol"),
        "utf8"
      );

      dataCustomStruct = await BuildStructDataCustom(dataCustom);
      dataCustomSet = await CreateSetDataCustom(dataCustom);
      dataCustomGet = await getDataCustom(dataCustom);

      data =
        vietGapData +
        "\n" +
        dataCustomStruct +
        "\n" +
        dataCustomSet +
        "\n" +
        dataCustomGet +
        "\n" +
        "}";

      fs.writeFile("Test.sol", data, "utf8", function (err) {
        //Kiểm tra nếu có lỗi thì xuất ra lỗi
        if (err) throw err;
        //nếu không thì hiển thị nội dung ghi file thành công
        else console.log("Ghi file thanh cong!");
      });

      let compile = await Compile.compile(data);

      data = {
        name: dataInfo[1],
        user_id: userId,
        parent_id: getAddressLienNhom.parent_id,
        address_contract: "",
        data: JSON.stringify(dataCustom),
        data_info: JSON.stringify(dataInfo),
        abi: JSON.stringify(compile.abi),
        status: "false",
        description: "",
      };

      result = await new ContractDB(data).save();
      Deploy.deploy(
        compile.abi,
        compile.bytecode,
        address,
        privateKey,
        getInfodUserById.address,
        result._id
      );

      result.abi = "";
      return res.status(200).send({ status: 200, result });
    } catch (error) {
      return res.status(200).send({ status: 500, error });
    }
  },
};

async function BuildStructDataCustom(data) {
  var struct_product_start = "struct DataCustom { \n";
  var struct_product_end = "}";
  var struct_product_between = "";
  for (let i = 0; i < data.length; i++) {
    struct_product_between =
      struct_product_between + "string " + " " + data[i].sku + ";" + "\n";
  }

  var result =
    struct_product_start + struct_product_between + struct_product_end;

  return result;
}

async function CreateSetDataCustom(data) {
  // Tạo cái này
  //  function setProduct(uint256 id, string memory TimeStart,string memory TimeEstimateEnd, string memory TimeHarvest,string memory Location ) public {
  var start = "function setDataCustom(";
  var between = "";
  var end = ")public  returns(bool) {" + "\n";

  for (let i = 0; i < data.length; i++) {
    between = between + "string memory " + data[i].sku + ",";
  }
  var subBetween = between.substring(",", between.length - 1);
  result = start + subBetween + end;

  var mid = "dataCustom = DataCustom(";
  for (let i = 0; i < data.length; i++) {
    mid = mid + data[i].sku + ",";
  }
  var end2 =
    "dataCustoms[countCustom] = dataCustom; " +
    "\n" +
    "countCustom++; " +
    "\n" +
    "return true;" +
    "}" +
    "\n";

  result2 = mid.substring(",", mid.length - 1) + ");" + "\n" + end2;
  var final = result + result2;

  return final;
}

async function getDataCustom(data) {
  // tạo cái này
  //  function getProductTimeStart(uint256 id) public view
  // returns (string memory,string memory, string memory, string memory)

  var start1 =
    "function getDataCustom(uint256 id) public view " + "\n" + "returns (";
  var between1 = "";
  var end1 = "{";
  for (let i = 0; i <= data.length; i++) {
    if (i < data.length) {
      between1 = between1 + " string memory ,";
    }
    if (i == data.length) {
      var subBetween = between1.substring(",", between1.length - 1);
      between1 = subBetween + ")" + "\n";
    }
  }
  var result1 = start1 + between1 + end1;

  // tạo khối giữa
  // return (_timeStart, _timeEstimateEnd, _timeHarcerst, _location);
  var start2 = "";
  var between2 = "return (";
  var end2 = "}";
  for (let i = 0; i < data.length; i++) {
    if (i < data.length) {
      start2 =
        start2 +
        "string memory " +
        "_" +
        data[i].sku +
        " = " +
        "dataCustoms[id]." +
        data[i].sku +
        ";" +
        "\n";
    }
  }

  for (let i = 0; i <= data.length; i++) {
    if (i < data.length) {
      between2 = between2 + "_" + data[i].sku + ",";
    }
    if (i == data.length) {
      var subBetween = between2.substring(",", between2.length - 1);
      between2 = subBetween + ");" + "\n";
    }
  }
  var result2 = start2 + between2 + "\n" + end2;

  var final = result1 + result2;

  return final;
}

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
