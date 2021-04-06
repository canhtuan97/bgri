const fs = require("fs");
const solc = require("solc");
var Tx = require("ethereumjs-tx");
const async = require("async");

// const chainId = 4;
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

const address = "0xe4680B5B373b9353AF87De622a6E410E067a25c9";
const secret =
  "ef0be3ad9cf6ab09b1aaca99e1880546e4ca82e159a590291d0ec67e5929d0cf";

module.exports = {
  deploySmartContract: async (data) => {
    console.log("chay vao day", data);
    // const input = fs.readFileSync('s.sol').toString();
    const output = solc.compile(data, "1");

    const bytecode = output.contracts[":Migrations"].bytecode;
    // console.log(bytecode)

    const abi = JSON.parse(output.contracts[":Migrations"].interface);
    var contract = new web3.eth.Contract(abi);
    const hexData = contract
      .deploy({
        data: "0x" + bytecode,
      })
      .encodeABI();

    var privateKey2 = new Buffer(secret, "hex");
    
    const from = address;
    const privateKey = privateKey2;

    const tx = {
        from,
        value: '0',
        gasPrice: web3.utils.toHex(10000000000), //1000000000
        gasLimit: web3.utils.toHex(3600000),
        chainId: web3.utils.toHex(3),
        nonce: web3.utils.toHex(await web3.eth.getTransactionCount(from,'pending')),
        data: web3.utils.toHex(hexData)
    }

    const signed = await web3.eth.accounts.signTransaction(tx, privateKey);
    const rawTx = signed.rawTransaction;

    const sendRawTx = rawTx =>
    new Promise((resolve, reject) =>
        web3.eth
        .sendSignedTransaction(rawTx)
        .on('receipt', function(receipt){
            resolve(receipt.contractAddress)
        })
        .on('error', reject)
    )
    addressContract = await sendRawTx(rawTx);
    var result = {
        abi: abi,
        addressContract: addressContract,
      };
      return result;
  }
   
};

async function TEST() {
  const input = fs.readFileSync("s.sol").toString();
  const output = solc.compile(input, "1");

  const bytecode = output.contracts[":Migrations"].bytecode;
  // console.log(bytecode)

  const abi = JSON.parse(output.contracts[":Migrations"].interface);
  var contract = new web3.eth.Contract(abi);
  const hexData = contract
    .deploy({
      data: "0x" + bytecode,
    })
    .encodeABI();
  async.auto(
    {
      createRawAndSend: (next) => {
        var privateKey = new Buffer(secret, "hex");
        web3.eth.getTransactionCount(address).then(function (count) {
          var rawTx = {
            nonce: web3.utils.toHex(count),
            gasPrice: web3.utils.toHex(10000000000), //1000000000
            gasLimit: web3.utils.toHex(3600000),
            value: web3.utils.toHex(0),
            data: hexData,
            // chainId: chainId
          };
          try {
            var tx = new Tx(rawTx);
            tx.sign(privateKey);
          } catch (err) {
            return next(err);
          }
          var serializedTx = tx.serialize();
          web3.eth
            .sendSignedTransaction("0x" + serializedTx.toString("hex"))
            .on("receipt", function (receipt) {
              return next(null, receipt);
            })
            .on("error", function (error) {
              return next(error);
            });
        });
      },
    },
    (err, ret) => {
      if (err) {
        console.log(err.message);
      } else {
        const data = ret.createRawAndSend;
        console.log(data);
        console.log(data.contractAddress);
        var result = {
          abi: abi,
          contractAddress: data.contractAddress,
        };
        return result;
      }
    }
  );
}
// TEST()