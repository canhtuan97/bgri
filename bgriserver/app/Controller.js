const core_eth = require("../core_eth/BuildSmartContract");
// const abi = require("../core_eth/build/abi.json");
// const bytecode = require("../build/contracts/bytecode.json");
const Set = require("../core_eth/Set");
const Get = require("../core_eth/Get");

const Web3 = require("web3");
const web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://ropsten.infura.io/v3/66092b83a4de4330b7cc5df887e3ae4b"
  )
);

module.exports = {
  test: async (req, res, next) => {
    console.log("canhtuan");
  },
  getBalance: async (req, res, next) => {
    try {
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
      console.log(result)
      return res.send(result);
    } catch (error) {
      return res.send(error);
    }
  },
  createAccount: async (req, res, next) => {
    console.log("vao day");
    result = {
      status: 200,
      msg: "success",
      address: "0xe4680B5B373b9353AF87De622a6E410E067a25c9",
      privateKey:
        "ef0be3ad9cf6ab09b1aaca99e1880546e4ca82e159a590291d0ec67e5929d0cf",
    };

    return res.send(result);
  },

  buildSmartContract: async (req, res, next) => {
    try {
      let address = req.body.address;
      let privateKey = req.body.privateKey;
      let defaultInfo = req.body.defaultInfo;
      let contractData = req.body.contractData;
      console.log("day la defaultInfo ", defaultInfo);
      console.log("day la contractData ", contractData);
      if (address == null) {
        result = {
          status: 500,
          mg: "address null",
        };
        return res.send(result);
      }
      if (privateKey == null) {
        result = {
          status: 500,
          mg: "privateKey null",
        };
        return res.send(result);
      }
      if (defaultInfo.lenght == 0) {
        result = {
          status: 500,
          mg: "defaultInfo null",
        };
        return res.send(result);
      }
      if (contractData.lenght == 0) {
        result = {
          status: 500,
          mg: "defaultInfo null",
        };
        return res.send(result);
      }
      var historyData = [];
      for (let i = 0; i < contractData.length; i++) {
        historyData.push(contractData[i].sku);
      }
      let create_smart_contract = await core_eth.mainBuildFileSol(
        address,
        privateKey,
        defaultInfo,
        historyData
      );
      console.log("dayt la smart contracts ", create_smart_contract);
      result = {
        status: 200,
        msg: "success",
        addressContract: create_smart_contract.addressContract,
        abi: JSON.stringify(create_smart_contract.abi),
      };
      return res.send(result);
    } catch (error) {
      return res.send(error);
    }
  },
  getCount: async (req, res, next) => {
    try {
      let address = req.body.address;
      let addressContract = req.body.addressContract;
      let privateKey = "0x" + req.body.privateKey;
      let abiData = req.body.abi;

      if (address == null) {
        result = {
          status: 500,
          mg: "address null",
        };
      }
      if (addressContract == null) {
        result = {
          status: 500,
          mg: "addressContract null",
        };
      }
      if (privateKey == null) {
        result = {
          status: 500,
          mg: "privateKey null",
        };
      }

      var contract = new web3.eth.Contract(
        JSON.parse(abiData),
        addressContract
      );
      var count = await contract.methods.getCount().call({ from: address });

      result = {
        status: 200,
        msg: "success",
        count: count,
      };

      return res.send(result);
    } catch (error) {
      return res.send(error);
    }
  },
  getStatus: async (req, res, next) => {
    try {
      let address = req.body.address;
      let addressContract = req.body.addressContract;
      let privateKey = "0x" + req.body.privateKey;
      let abiData = req.body.abi;
      if (address == null) {
        result = {
          status: 500,
          mg: "address null",
        };
      }
      if (addressContract == null) {
        result = {
          status: 500,
          mg: "addressContract null",
        };
      }
      if (privateKey == null) {
        result = {
          status: 500,
          mg: "privateKey null",
        };
      }
      if (abiData == null) {
        result = {
          status: 500,
          mg: "abi null",
        };
      }

      var contract = new web3.eth.Contract(
        JSON.parse(abiData),
        addressContract
      );
      var result = await contract.methods.getStatus().call({ from: address });

      result = {
        status: 200,
        msg: "success",
        statusData: result,
      };
      // result = {
      //   status: 200,
      //   msg: "success",
      //   statusData: "1",
      // };
      console.log(result);
      return res.send(result);
    } catch (error) {
      return res.send(error);
    }
  },
  getSubmit: async (req, res, next) => {
    try {
      let address = req.body.address;
      let addressContract = req.body.addressContract;
      let privateKey = "0x" + req.body.privateKey;
      let abiData = req.body.abi;
      if (address == null) {
        result = {
          status: 500,
          mg: "address null",
        };
      }
      if (addressContract == null) {
        result = {
          status: 500,
          mg: "addressContract null",
        };
      }
      if (privateKey == null) {
        result = {
          status: 500,
          mg: "privateKey null",
        };
      }
      if (abiData == null) {
        result = {
          status: 500,
          mg: "abi null",
        };
      }

      var contract = new web3.eth.Contract(
        JSON.parse(abiData),
        addressContract
      );
      var result = await contract.methods.getSubmit().call({ from: address });

      // result = {
      //   status: 200,
      //   msg: "success",
      //   statusData: result,
      // };
      result = {
        status: 200,
        msg: "success",
        statusData: result,
      };
      console.log(result);
      return res.send(result);
    } catch (error) {
      return res.send(error);
    }
  },
  getFee: async (req, res, next) => {
    try {
      let txId = req.body.txId;
      if (txId == null) {
        result = {
          status: 500,
          mg: "txId null",
        };
      }

      var fee = await Get.getGasUsed(txId);

      result = {
        status: 200,
        msg: "success",
        txId: txId,
        fee: fee,
      };
      console.log(result);
      return res.send(result);
    } catch (error) {
      return res.send(error);
    }
  },

  getProduct: async (req, res, next) => {
    try {
      let address = req.body.address;
      let addressContract = req.body.addressContract;
      let privateKey = "0x" + req.body.privateKey;
      let abiData = req.body.abi;

      if (address == null) {
        result = {
          status: 500,
          mg: "address null",
        };
      }
      if (addressContract == null) {
        result = {
          status: 500,
          mg: "addressContract null",
        };
      }
      if (privateKey == null) {
        result = {
          status: 500,
          mg: "privateKey null",
        };
      }

      var contract = new web3.eth.Contract(
        JSON.parse(abiData),
        addressContract
      );

      var result = [];
      var data = await contract.methods.getProduct(1).call({ from: address });
      result.push(data);

      resp = {
        status: 200,
        mg: "success",
        data: result,
      };

      return res.send(resp);
    } catch (error) {
      return res.send(error);
    }
  },
  getHistory: async (req, res, next) => {
    try {
      let address = req.body.address;
      let addressContract = req.body.addressContract;
      let privateKey = "0x" + req.body.privateKey;
      let abiData = req.body.abi;

      if (address == null) {
        result = {
          status: 500,
          mg: "address null",
        };
      }
      if (addressContract == null) {
        result = {
          status: 500,
          mg: "addressContract null",
        };
      }
      if (privateKey == null) {
        result = {
          status: 500,
          mg: "privateKey null",
        };
      }

      var contract = new web3.eth.Contract(
        JSON.parse(abiData),
        addressContract
      );
      var count = await contract.methods.getCount().call({ from: address });
      console.log("day la ", count);
      var result = [];
      var index = parseInt(count);
      for (let i = 1; i <= index; i++) {
        var data = await contract.methods.getHistory(i).call({ from: address });
        console.log("day la ", data);
        result.push(data);
      }

      resp = {
        status: 200,
        mg: "success",
        data: result,
      };
      console.log(resp);
      return res.send(resp);
    } catch (error) {
      return res.send(error);
    }
  },
  // ---------------
  setSubmit: async (req, res, next) => {
    try {
      let address = req.body.address;
      let addressContract = req.body.addressContract;
      let privateKey = "0x" + req.body.privateKey;
      let abiData = req.body.abi;
      if (address == null) {
        result = {
          status: 500,
          mg: "address null",
        };
      }
      if (addressContract == null) {
        result = {
          status: 500,
          mg: "addressContract null",
        };
      }
      if (privateKey == null) {
        result = {
          status: 500,
          mg: "privateKey null",
        };
      }
      if (abiData == null) {
        result = {
          status: 500,
          mg: "abi null",
        };
      }
      console.log(addressContract);
      txId = await Set.setSubmit(
        address,
        privateKey,
        addressContract,
        JSON.parse(abiData)
      );
      result = {
        status: 200,
        msg: "success",
        txId: txId,
      };
      console.log("day la history", result);
      return res.send(result);
    } catch (error) {
      return res.send(error);
    }
  },
  writeHistory: async (req, res, next) => {
    try {
      let address = req.body.address;
      let addressContract = req.body.addressContract;
      let privateKey = "0x" + req.body.privateKey;
      let data = req.body.data;
      let abiData = req.body.abi;
      console.log("da ", data);
      if (address == null) {
        result = {
          status: 500,
          mg: "address null",
        };
      }
      if (addressContract == null) {
        result = {
          status: 500,
          mg: "addressContract null",
        };
      }
      if (privateKey == null) {
        result = {
          status: 500,
          mg: "privateKey null",
        };
      }
      if (abiData == null) {
        result = {
          status: 500,
          mg: "abi null",
        };
      }

      timeNow = await getDateTime();
      var contract = new web3.eth.Contract(
        JSON.parse(abiData),
        addressContract
      );
      var count = await contract.methods.getCount().call({ from: address });
      index = parseInt(count) + 1;
      txId = await Set.setHistory(
        index,
        address,
        privateKey,
        addressContract,
        data,
        JSON.parse(abiData),
        timeNow
      );
      result = {
        status: 200,
        msg: "success",
        txId: txId,
        fee: "0.000295823",
        time: timeNow,
      };
      console.log("day la history", result);
      return res.send(result);
    } catch (error) {
      return res.send(error);
    }
  },
  // ----------------
  writeProduct: async (req, res, next) => {
    try {
      let address = req.body.address;
      let addressContract = req.body.addressContract;
      let privateKey = "0x" + req.body.privateKey;
      let data = req.body.data;
      let abiData = req.body.abi;
      console.log(data);
      if (address == null) {
        result = {
          status: 500,
          mg: "address null",
        };
      }
      if (addressContract == null) {
        result = {
          status: 500,
          mg: "addressContract null",
        };
      }
      if (privateKey == null) {
        result = {
          status: 500,
          mg: "privateKey null",
        };
      }
      if (abiData == null) {
        result = {
          status: 500,
          mg: "abi null",
        };
      }
      timeNow = await getDateTime();
      txId = await Set.setProduct(
        1,
        address,
        privateKey,
        addressContract,
        data,
        JSON.parse(abiData),
        timeNow
      );
      getFee = await Get.getGasUsed(txId);
      result = {
        status: 200,
        msg: "success",
        txId: txId,
        fee: "0.000295823",
        time: timeNow,
      };
      // result = {
      //   status: 200,
      //   msg: "success",
      //   txId: "0x2fba41eee7828e223f4d9b71e26f347a26c0458efee1bf0c39c2bf50ee261276",
      //   fee : "0.000295823",
      //   time: getDateTime()
      // };

      console.log(result);
      return res.send(result);
    } catch (error) {
      return res.send(error);
    }
  },
  decodeQr: async (req, res, next) => {
    console.log("chay vao day");
    try {
      let dataString = req.body.data
      let data = JSON.parse(dataString) 
      console.log(data.address)
      if (data.addressContract == null) {
        result = {
          status: 500,
          mg: "addressContract null",
        };
      }
      if (data.productSku == null) {
        result = {
          status: 500,
          mg: "productSku null",
        };
      }
      if (data.contractData == null) {
        result = {
          status: 500,
          mg: "contract null",
        };
      }
      if (data.address == null) {
        result = {
          status: 500,
          mg: "address null",
        };
      }

      let contractDataSku = []
      for (let i = 0; i < data.contractData.length; i++) {
        contractDataSku.push(data.contractData[i].sku)
      }
      JSON.parse
      abi = await core_eth.compileSmartContract(
        data.productSku,
        contractDataSku
      );
        console.log(contractDataSku)

      var contract = new web3.eth.Contract(abi, data.addressContract);

      var product = [];
      var getProduct = await contract.methods
        .getProduct(1)
        .call({ from: data.address });
      product.push(getProduct);

      var count = await contract.methods
        .getCount()
        .call({ from: data.address });
      var history = [];
      var index = parseInt(count);
      for (let i = 1; i <= index; i++) {
        var getHistory = await contract.methods
          .getHistory(i)
          .call({ from: data.address });
        history.push(getHistory);
      }

      resp = {
        product: product,
        history: history,
      };
      console.log(resp)
      return res.send(resp);
    } catch (error) {
      console.log(error);
      return res.send(error);
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

// console.log(getDateTime())
