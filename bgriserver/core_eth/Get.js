const Web3 = require("web3");
const web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://ropsten.infura.io/v3/66092b83a4de4330b7cc5df887e3ae4b"
  )
);


module.exports = {
    getGasUsed : async (transactionHash) =>{
        try {
            var gas = await web3.eth.getTransactionReceipt(transactionHash);
            return gas.gasUsed;
        }
        catch(error){
            return error
        }

    }
}

async function Test(transactionHash){
    var gas = await web3.eth.getTransactionReceipt(transactionHash);
    console.log(gas)
    console.log(gas.gasUsed)
    return gas.gasUsed;
}

// console.log(Test("0xf27401b3c5d732ef49889a592e9595581709ec0985d173a54cd4d04c2267b00e"))