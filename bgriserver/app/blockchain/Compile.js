var fs = require("fs");
const solc = require("solc");
var Tx = require("ethereumjs-tx");
const async = require("async");
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

module.exports = {
  compile: async (data) => {
    try {
      const output = solc.compile(data, "1");
      const abi = JSON.parse(output.contracts[":Migrations"].interface);
      const bytecode = output.contracts[":Migrations"].bytecode;
      result = {
        abi: abi,
        bytecode: bytecode,
      };
      return result;
    } catch (error) {
      return error;
    }
  },
};
