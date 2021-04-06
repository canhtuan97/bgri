const Web3 = require("web3");
const web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://ropsten.infura.io/v3/66092b83a4de4330b7cc5df887e3ae4b"
  )
);

module.exports = {
  getGasUsed: async (transactionHash) => {
    try {
      var gas = await web3.eth.getTransactionReceipt(transactionHash);
      return gas.gasUsed;
    } catch (error) {
      return error;
    }
  },
  getDat: async (address, addressContract, abi) => {
    var contract = new web3.eth.Contract(abi, addressContract);
    var data = await contract.methods.getDat().call({ from: address });
    return data;
  },
  getNuoc: async (address, addressContract, abi) => {
    var contract = new web3.eth.Contract(abi, addressContract);
    var data = await contract.methods.getNuoc().call({ from: address });
    return data;
  },
  getGiong: async (address, addressContract, abi) => {
    var contract = new web3.eth.Contract(abi, addressContract);
    var data = await contract.methods.getGiong().call({ from: address });
    return data;
  },
  getInfo: async (address, addressContract, abi) => {
    var contract = new web3.eth.Contract(abi, addressContract);
    var data = await contract.methods.getInfo().call({ from: address });
    return data;
  },
  getVerifySmartcontract: async (address, addressContract, abi) => {
    var contract = new web3.eth.Contract(abi, addressContract);
    var data = await contract.methods
      .getVerifyContract()
      .call({ from: address });
    return data;
  },
  getKeyQrCode: async (address, addressContract, abi) => {
    var contract = new web3.eth.Contract(abi, addressContract);
    var data = await contract.methods.getKeyQrCode().call({ from: address });
    return data;
  },
  getQrCode: async (address, addressContract, abi, key) => {
    var contract = new web3.eth.Contract(abi, addressContract);
    var data = await contract.methods.getQrCode(key).call({ from: address });
    return data;
  },
  getCount: async (address, addressContract, abi) => {
    var contract = new web3.eth.Contract(abi, addressContract);
    var data = await contract.methods.getCount().call({ from: address });
    return data;
  },
  getCountCustom: async (address, addressContract, abi) => {
    var contract = new web3.eth.Contract(abi, addressContract);
    var data = await contract.methods.getCountCustom().call({ from: address });
    return data;
  },
  getHistory: async (address, addressContract, abi, id) => {
    var contract = new web3.eth.Contract(abi, addressContract);
    var data = await contract.methods.getHistory(id).call({ from: address });
    return data;
  },
  getHistory: async (address, addressContract, abi, id) => {
    var contract = new web3.eth.Contract(abi, addressContract);
    var data = await contract.methods.getHistory(id).call({ from: address });
    return data;
  },
  getDataCustom: async (address, addressContract, abi, id) => {
    var contract = new web3.eth.Contract(abi, addressContract);
    var data = await contract.methods.getDataCustom(id).call({ from: address });
    return data;
  },
  getEndSmartContract: async (address, addressContract, abi) => {
    var contract = new web3.eth.Contract(abi, addressContract);
    var data = await contract.methods
      .getEndSmartContract()
      .call({ from: address });
    return data;
  },
};

async function Test(transactionHash) {
  var gas = await web3.eth.getTransactionReceipt(transactionHash);
  console.log(gas);
  console.log(gas.gasUsed);
  return gas.gasUsed;
}

// console.log(Test("0xf27401b3c5d732ef49889a592e9595581709ec0985d173a54cd4d04c2267b00e"))
