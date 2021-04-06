const Web3          =   require('web3');
const web3          = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/66092b83a4de4330b7cc5df887e3ae4b"))
const web3_socket   = new Web3(new Web3.providers.WebsocketProvider("wss://ropsten.infura.io/ws/v3/66092b83a4de4330b7cc5df887e3ae4b"))


// var abi = require("./build/contracts/abi.json")
var contractAddress = "0x4c318033f9eae2408a6a4b978430104c1d82176a"
var address = "0xe4680b5b373b9353af87de622a6e410e067a25c9"

async function getCount(){
    const contract = new web3.eth.Contract(abi, contractAddress)
    var count = await contract.methods.getCount().call({from: address})
    console.log(count)
    return count
}


async function signData(fromAddress, privateKeys, toAddress, myData){

    const from = fromAddress;
    const privateKey = privateKeys;
    const to = toAddress;

    const tx = {
        from,
        to,
        value: '0',
        gasPrice:  web3.utils.toHex(web3.utils.toWei("100", 'gwei')),
        gas: web3.utils.toHex("100000"),
        chainId: web3.utils.toHex(3),
        nonce: web3.utils.toHex(await web3.eth.getTransactionCount(from,'pending')),
        data: web3.utils.toHex(myData)
    }

    const signed = await web3.eth.accounts.signTransaction(tx, privateKey);
    const rawTx = signed.rawTransaction;

    const sendRawTx = rawTx =>
    new Promise((resolve, reject) =>
        web3.eth
        .sendSignedTransaction(rawTx)
        .on('transactionHash', resolve)
        .on('error', reject)
    )

    txtHash = await sendRawTx(rawTx);
    return txtHash;
}

async function callSetProduct(address, privateKeys, contractAddress){

    const contract = new web3.eth.Contract(abi, contractAddress)

    var a = `"1","28/10/2023","100kg","1l","thanhcong"`
    var myData = await contract.methods.setProduct(a).encodeABI()
    var transactionHash = await signData(address, privateKeys, contractAddress, myData)
    console.log(transactionHash)
    return transactionHash
 
}


// getCount()
// callSetProduct("0xe4680B5B373b9353AF87De622a6E410E067a25c9","0xef0be3ad9cf6ab09b1aaca99e1880546e4ca82e159a590291d0ec67e5929d0cf","0x4c318033f9eae2408a6a4b978430104c1d82176a")

async function getInfoTransaction (txtHash){
    try {
        var inforTransaction = await web3.eth.getTransaction(txtHash);
        var input = web3.utils.hexToString(inforTransaction.input)
        console.log(input)
        return inforTransaction;
        
    }catch(error){
        console.log(error)
        return error;
    }
}

getInfoTransaction("0x380a63cf22440d6c52c4d42d808575d632fbcb4994369a366fe525c05f84a9cd")

