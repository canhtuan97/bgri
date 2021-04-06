const ContractDB = require("../database/contracts");
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
  deploy: async (abi, bytecode, address, secret, addressLienChiNhom, id) => {
    var contract = new web3.eth.Contract(abi);
    const myData = contract
      .deploy({
        data: "0x" + bytecode,
        arguments: [addressLienChiNhom],
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
      gasLimit: web3.utils.toHex(5616384),
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
    await ContractDB.updateOne(
      { _id: id },
      { $set: { address_contract: addressContract } }
    );
    return result;
  },
};
