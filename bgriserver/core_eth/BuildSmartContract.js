var fs = require("fs");
const { exec } = require("child_process");
var consts = require("../app/consts");
const compile = require("./Compile");
const deploy = require("./Deploy");
const solc = require("solc");
var Tx = require("ethereumjs-tx");
const async = require("async");
var firebase = require("firebase");

const Web3 = require("web3");
const web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://ropsten.infura.io/v3/66092b83a4de4330b7cc5df887e3ae4b"
  )
);
const web3_socket = new Web3(
  new Web3.providers.WebsocketProvider(
    "wss://ropsten.infura.io/ws/v3/66092b83a4de4330b7cc5df887e3ae4b"
  )
);

async function createSmartContract(defaultInfo, historyData) {
  var title = "pragma solidity ^0.4.25;";
  var class_start = "contract Migrations {";
  var end_contraact = "}";

  var init =
    "Product product;" +
    "\n" +
    "History history;" +
    "\n" +
    "uint256 count = 0;" +
    "\n" +
    "uint256 status = 1;" +
    "\n" +
    "uint256 submit = 1;" +
    "\n" +
    "mapping(uint256 => Product) public products; " +
    "\n" +
    "mapping(uint256 => History) public historys;" +
    "\n" +
    "  function getCount() public view returns(uint256){ " +
    "\n" +
    "return count;" +
    "\n" +
    "}" +
    "\n" +
    "function getStatus() public view returns(uint256){ " +
    "\n" +
    "return status;" +
    "\n" +
    "}" +
    "\n" +
    "function setSubmit()public {" +
    "\n" +
    "submit++;" +
    "\n" +
    "}" +
    "\n" +
    "  function getSubmit() public view returns(uint256){ " +
    "\n" +
    "return submit;" +
    "\n" +
    "}";

  var struct_history = await BuildStructHistory(historyData);
  var struct_product = await BuildStructProduct(defaultInfo);
  var set_product = await CreateSetProduct(defaultInfo);
  var set_history = await CreateSetHistory(historyData);
  var get_product = await getProduct(defaultInfo);
  var get_history = await getHistory(historyData);

  data =
    title +
    "\n" +
    class_start +
    "\n" +
    struct_history +
    "\n" +
    struct_product +
    "\n" +
    init +
    "\n" +
    set_product +
    "\n" +
    set_history +
    "\n" +
    get_product +
    "\n" +
    get_history +
    "\n" +
    end_contraact;

  return data;
}

module.exports = {
  compileSmartContract: async (defaultInfo, historyData) => {
    try {
      let data = await createSmartContract(defaultInfo, historyData);
      const output = solc.compile(data, "1");
      const abi = JSON.parse(output.contracts[":Migrations"].interface);
      return abi;
    } catch (error) {
      return error
    }
  },
  mainBuildFileSol: async (address, secret, defaultInfo, historyData) => {
    try {
      let data = await createSmartContract(defaultInfo, historyData);

      fs.writeFile("demo2.txt", data, function (err) {
        if (err) throw err;
        console.log("Saved!");
      });

      const output = solc.compile(data, "1");
      const bytecode = output.contracts[":Migrations"].bytecode;
      const abi = JSON.parse(output.contracts[":Migrations"].interface);
      var contract = new web3.eth.Contract(abi);
      const myData = contract
        .deploy({
          data: "0x" + bytecode,
        })
        .encodeABI();

      const from = address;
      const privateKey = secret;

      const tx = {
        from,
        value: web3.utils.toHex(0),
        nonce: web3.utils.toHex(
          await web3.eth.getTransactionCount(from, "pending")
        ),
        gasPrice: web3.utils.toHex(10000000000), //1000000000
        gasLimit: web3.utils.toHex(3600000),
        value: web3.utils.toHex(0),
        data: web3.utils.toHex(myData),
      };

      const signed = await web3.eth.accounts.signTransaction(tx, privateKey);
      const rawTx = signed.rawTransaction;
      console.log("chay vai dat");
      const sendRawTx = (rawTx) =>
        new Promise((resolve, reject) =>
          web3.eth
            .sendSignedTransaction(rawTx)
            .on("receipt", function (receipt) {
              resolve(receipt.contractAddress);
            })
            .on("error", reject)
        );

      addressContract = await sendRawTx(rawTx);
      console.log(addressContract);
      var result = {
        abi: abi,
        addressContract: addressContract,
      };
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};

async function BuildStructHistory(data) {
  var struct_history_start = "struct History { \n";
  var struct_history_end = "}";
  var struct_history_between = "";
  for (let i = 0; i < data.length; i++) {
    struct_history_between =
      struct_history_between + "string " + " " + data[i] + ";" + "\n";
  }

  var result =
    struct_history_start + struct_history_between + struct_history_end;
  return result;
}

async function BuildStructProduct(data) {
  var struct_product_start = "struct Product { \n";
  var struct_product_end = "}";
  var struct_product_between = "";
  for (let i = 0; i < data.length; i++) {
    struct_product_between =
      struct_product_between + "string " + " " + data[i] + ";" + "\n";
  }

  var result =
    struct_product_start + struct_product_between + struct_product_end;

  return result;
}

async function CreateSetProduct(data) {
  // Tạo cái này
  //  function setProduct(uint256 id, string memory TimeStart,string memory TimeEstimateEnd, string memory TimeHarvest,string memory Location ) public {
  var start = "function setProduct(uint256 id ,";
  var between = "";
  var end = ")public {";

  for (let i = 0; i < data.length; i++) {
    between = between + "string memory " + data[i] + ",";
  }
  var subBetween = between.substring(",", between.length - 1);
  result = start + subBetween + end;

  // tạo cái khối này
  //  product = Product(TimeStart,TimeEstimateEnd,TimeHarvest,Location);
  //  products[id] = product;

  var start2 = " product = Product(";
  var between2 = "";
  var end2 =
    "if (status == 1){" +
    "\n" +
    "products[id] = product;" +
    "\n" +
    "status++ ;" +
    "}";

  for (let i = 0; i <= data.length; i++) {
    if (i < data.length) {
      between2 = between2 + data[i] + ",";
    }
    if (i == data.length) {
      var subBetween = between2.substring(",", between2.length - 1);
      between2 = subBetween + ");" + "\n";
    }
  }

  result2 = start2 + between2 + end2;
  var final = result + "\n" + result2 + "\n" + "}";

  return final;
}

async function CreateSetHistory(data) {
  // Tạo cái này
  //  function setProduct(uint256 id, string memory TimeStart,string memory TimeEstimateEnd, string memory TimeHarvest,string memory Location ) public {
  var start = "function setHistory(uint256 id ,";
  var between = "";
  var end = ")public {" + "\n" + "\n";

  for (let i = 0; i < data.length; i++) {
    between = between + "string memory " + data[i] + ",";
  }
  var subBetween = between.substring(",", between.length - 1);
  result = start + subBetween + end;

  // tạo cái khối này
  //  product = Product(TimeStart,TimeEstimateEnd,TimeHarvest,Location);
  //  products[id] = product;

  var start2 =
    " if(submit == 1){ " + "\n" + "count++ ;" + "\n" + "history = History(";
  var between2 = "";
  var end2 = "historys[id] = history;";
  for (let i = 0; i <= data.length; i++) {
    if (i < data.length) {
      between2 = between2 + data[i] + ",";
    }
    if (i == data.length) {
      var subBetween = between2.substring(",", between2.length - 1);
      between2 = subBetween + ");" + "\n";
    }
  }
  result2 = start2 + between2 + end2;
  var final = result + "\n" + result2 + "\n" + "}" + "\n" + "}";

  return final;
}

async function getProduct(data) {
  // tạo cái này
  //  function getProductTimeStart(uint256 id) public view
  // returns (string memory,string memory, string memory, string memory)

  var start1 =
    "function getProduct(uint256 id) public view " + "\n" + "returns (";
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
        data[i] +
        " = " +
        "products[id]." +
        data[i] +
        ";" +
        "\n";
    }
  }

  for (let i = 0; i <= data.length; i++) {
    if (i < data.length) {
      between2 = between2 + "_" + data[i] + ",";
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

async function getHistory(data) {
  // tạo cái này
  //  function getProductTimeStart(uint256 id) public view
  // returns (string memory,string memory, string memory, string memory)

  var start1 =
    "function getHistory(uint256 id) public view " + "\n" + "returns (";
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
        data[i] +
        " = " +
        "historys[id]." +
        data[i] +
        ";" +
        "\n";
    }
  }

  for (let i = 0; i <= data.length; i++) {
    if (i < data.length) {
      between2 = between2 + "_" + data[i] + ",";
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

async function test() {
  const address = "0xe4680B5B373b9353AF87De622a6E410E067a25c9";
  const secret =
    "ef0be3ad9cf6ab09b1aaca99e1880546e4ca82e159a590291d0ec67e5929d0cf";
  const input = fs.readFileSync("s.sol").toString();
  const output = solc.compile(input, "1");
  const bytecode = output.contracts[":Migrations"].bytecode;
  const abi = JSON.parse(output.contracts[":Migrations"].interface);
  var contract = new web3.eth.Contract(abi);
  const myData = contract
    .deploy({
      data: "0x" + bytecode,
    })
    .encodeABI();

  const from = address;
  const privateKey = secret;

  const tx = {
    from,
    value: web3.utils.toHex(0),
    nonce: web3.utils.toHex(
      await web3.eth.getTransactionCount(from, "pending")
    ),
    gasPrice: web3.utils.toHex(10000000000), //1000000000
    gasLimit: web3.utils.toHex(3600000),
    value: web3.utils.toHex(0),
    data: web3.utils.toHex(myData),
  };

  const signed = await web3.eth.accounts.signTransaction(tx, privateKey);
  const rawTx = signed.rawTransaction;

  const sendRawTx = (rawTx) =>
    new Promise((resolve, reject) =>
      web3.eth
        .sendSignedTransaction(rawTx)
        .on("receipt", function (receipt) {
          resolve(receipt.contractAddress);
        })
        .on("error", reject)
    );

  addressContract = await sendRawTx(rawTx);
  console.log(addressContract);

  return addressContract;
}

function worker(id, data) {
  var app = firebase.initializeApp(consts.firebaseConfig);
  console.log(app);
  var update = app.databaase().ref("Product/-MMfLr8VjfOJP7WSWegn").update({
    addressContract: "caay d m",
  });
}

// worker("dad","dad")
