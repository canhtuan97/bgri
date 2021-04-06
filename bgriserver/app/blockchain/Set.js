const Web3 = require("web3");
const web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://ropsten.infura.io/v3/66092b83a4de4330b7cc5df887e3ae4b"
  )
);

module.exports = {
  setDat: async (address, privateKey, addressContract, data, abi, timeNow) => {
    const contract = new web3.eth.Contract(abi, addressContract);
    if (data.length == 4) {
      var myData = await contract.methods
        .setDat(timeNow, data[0], data[1], data[2], data[3])
        .encodeABI();
      var transactionHash = await signData(
        address,
        privateKey,
        addressContract,
        myData
      );
      return transactionHash;
    }
    return null;
  },
  setNuoc: async (address, privateKey, addressContract, data, abi, timeNow) => {
    const contract = new web3.eth.Contract(abi, addressContract);
    if (data.length == 4) {
      var myData = await contract.methods
        .setNuoc(timeNow, data[0], data[1], data[2], data[3])
        .encodeABI();
      var transactionHash = await signData(
        address,
        privateKey,
        addressContract,
        myData
      );
      return transactionHash;
    }
    return null;
  },
  setGiong: async (
    address,
    privateKey,
    addressContract,
    data,
    abi,
    timeNow
  ) => {
    const contract = new web3.eth.Contract(abi, addressContract);
    if (data.length == 3) {
      var myData = await contract.methods
        .setGiong(timeNow, data[0], data[1], data[2])
        .encodeABI();
      var transactionHash = await signData(
        address,
        privateKey,
        addressContract,
        myData
      );
      return transactionHash;
    }
    return null;
  },
  setInfo: async (address, privateKey, addressContract, data, abi, timeNow) => {
    const contract = new web3.eth.Contract(abi, addressContract);
    if (data.length == 3) {
      var myData = await contract.methods
        .setInfo(timeNow, data[1], data[2], data[3])
        .encodeABI();
      var transactionHash = await signData(
        address,
        privateKey,
        addressContract,
        myData
      );
      return transactionHash;
    }
    return null;
  },
  setQrCode: async (
    address,
    privateKey,
    addressContract,
    action_name,
    description,
    _keyQrcode,
    abi,
    timeNow
  ) => {
    const contract = new web3.eth.Contract(abi, addressContract);
    var myData = await contract.methods
      .setQrCode(timeNow, action_name, description, _keyQrcode)
      .encodeABI();
    var transactionHash = await signData(
      address,
      privateKey,
      addressContract,
      myData
    );
    return transactionHash;
  },
  setHistory: async (
    address,
    privateKey,
    addressContract,
    _keyQrcode,
    description,
    abi,
    timeNow
  ) => {
    const contract = new web3.eth.Contract(abi, addressContract);
    var myData = await contract.methods
      .setHistory(timeNow, _keyQrcode, description)
      .encodeABI();
    var transactionHash = await signData(
      address,
      privateKey,
      addressContract,
      myData
    );
    return transactionHash;
  },
  setVerifyContract: async (address, privateKey, addressContract, abi) => {
    const contract = new web3.eth.Contract(abi, addressContract);
    var myData = await contract.methods.setVerifySmartcontract().encodeABI();
    var transactionHash = await signData(
      address,
      privateKey,
      addressContract,
      myData
    );
    return transactionHash;
  },
  setEndSmartContract: async (address, privateKey, addressContract, abi) => {
    const contract = new web3.eth.Contract(abi, addressContract);
    var myData = await contract.methods.setEndSmartContract().encodeABI();
    var transactionHash = await signData(
      address,
      privateKey,
      addressContract,
      myData
    );
    return transactionHash;
  },
  setDataCustom: async (
    address,
    privateKey,
    addressContract,
    data,
    abi,
    timeNow
  ) => {
    console.log("set cusstome", data);
    const contract = new web3.eth.Contract(abi, addressContract);
    if (data.length == 1) {
      var myData = await contract.methods
        .setDataCustom(timeNow, data[0])
        .encodeABI();
      var transactionHash = await signData(
        address,
        privateKey,
        addressContract,
        myData
      );
      return transactionHash;
    }
    if (data.length == 2) {
      var myData = await contract.methods
        .setDataCustom(timeNow, data[0], data[1])
        .encodeABI();
      var transactionHash = await signData(
        address,
        privateKey,
        addressContract,
        myData
      );
      return transactionHash;
    }
    if (data.length == 2) {
      var myData = await contract.methods
        .setDataCustom(timeNow, data[0], data[3])
        .encodeABI();
      var transactionHash = await signData(
        address,
        privateKey,
        addressContract,
        myData
      );
      return transactionHash;
    }
  },
  setProduct: async (
    count,
    address,
    privateKey,
    addressContract,
    data,
    abi,
    timeNow
  ) => {
    console.log("chay vao day", data.length);
    const contract = new web3.eth.Contract(abi, addressContract);
    if (data.length == 1) {
      var myData = await contract.methods
        .setProduct(count, timeNow, data[1])
        .encodeABI();
      var transactionHash = await signData(
        address,
        privateKey,
        addressContract,
        myData
      );
      return transactionHash;
    }
    if (data.length == 2) {
      var myData = await contract.methods
        .setProduct(count, timeNow, data[1], data[2])
        .encodeABI();
      var transactionHash = await signData(
        address,
        privateKey,
        addressContract,
        myData
      );
      return transactionHash;
    }
    if (data.length == 3) {
      var myData = await contract.methods
        .setProduct(count, timeNow, data[1], data[2], data[3])
        .encodeABI();
      var transactionHash = await signData(
        address,
        privateKey,
        addressContract,
        myData
      );
      return transactionHash;
    }
    if (data.length == 4) {
      var myData = await contract.methods
        .setProduct(count, timeNow, data[1], data[2], data[3], data[4])
        .encodeABI();
      var transactionHash = await signData(
        address,
        privateKey,
        addressContract,
        myData
      );
      return transactionHash;
    }
    if (data.length == 5) {
      var myData = await contract.methods
        .setProduct(count, timeNow, data[1], data[2], data[3], data[4], data[5])
        .encodeABI();
      var transactionHash = await signData(
        address,
        privateKey,
        addressContract,
        myData
      );
      return transactionHash;
    }
    if (data.length == 6) {
      var myData = await contract.methods
        .setProduct(count, timeNow, data[1], data[2], data[3], data[4], data[5])
        .encodeABI();
      var transactionHash = await signData(
        address,
        privateKey,
        addressContract,
        myData
      );
      return transactionHash;
    }
    if (data.length == 7) {
      var myData = await contract.methods
        .setProduct(
          count,
          timeNow,
          data[1],
          data[2],
          data[3],
          data[4],
          data[5],
          data[6]
        )
        .encodeABI();
      var transactionHash = await signData(
        address,
        privateKey,
        addressContract,
        myData
      );
      return transactionHash;
    }
    if (data.length == 8) {
      var myData = await contract.methods
        .setProduct(
          count,
          timeNow,
          data[1],
          data[2],
          data[3],
          data[4],
          data[5],
          data[6],
          data[7]
        )
        .encodeABI();
      var transactionHash = await signData(
        address,
        privateKey,
        addressContract,
        myData
      );
      return transactionHash;
    }
    if (data.length == 9) {
      var myData = await contract.methods
        .setProduct(
          count,
          timeNow,
          data[1],
          data[2],
          data[3],
          data[4],
          data[5],
          data[6],
          data[7],
          data[8]
        )
        .encodeABI();
      var transactionHash = await signData(
        address,
        privateKey,
        addressContract,
        myData
      );
      return transactionHash;
    }
    if (data.length == 10) {
      var myData = await contract.methods
        .setProduct(
          count,
          timeNow,
          data[1],
          data[2],
          data[3],
          data[4],
          data[5],
          data[6],
          data[7],
          data[8],
          data[9],
          data[9]
        )
        .encodeABI();
      var transactionHash = await signData(
        address,
        privateKey,
        addressContract,
        myData
      );
      return transactionHash;
    }
  },
  setSubmit: async (address, privateKey, addressContract, abi) => {
    try {
      const contract = new web3.eth.Contract(abi, addressContract);
      var myData = await contract.methods.setSubmit().encodeABI();
      var transactionHash = await signData(
        address,
        privateKey,
        addressContract,
        myData
      );
      return transactionHash;
    } catch (error) {
      console.log(error);
      return;
    }
  },
};

async function signData(fromAddress, privateKeys, toAddress, myData) {
  const from = fromAddress;
  const privateKey = privateKeys;
  const to = toAddress;

  const tx = {
    from,
    to,
    value: "0",
    gasPrice: web3.utils.toHex(web3.utils.toWei("100", "gwei")),
    gas: web3.utils.toHex("1000000"),
    chainId: web3.utils.toHex(3),
    nonce: web3.utils.toHex(
      await web3.eth.getTransactionCount(from, "pending")
    ),
    data: web3.utils.toHex(myData),
  };

  const signed = await web3.eth.accounts.signTransaction(tx, privateKey);
  const rawTx = signed.rawTransaction;

  const sendRawTx = (rawTx) =>
    new Promise((resolve, reject) =>
      web3.eth
        .sendSignedTransaction(rawTx)
        .on("transactionHash", resolve)
        .on("error", reject)
    );

  txtHash = await sendRawTx(rawTx);
  return txtHash;
}
