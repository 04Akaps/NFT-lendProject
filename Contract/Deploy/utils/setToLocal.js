const Web3 = require("web3");

const zolCoreJson = require("../../../Client/src/contract/JSON/zolCore.json");

const zolMiningPoolAddress =
  require("../../../Client/src/contract/JSON/zolMiningPool.json").address;

const web3 = new Web3("http://127.0.0.1:8545");

const zolCoreInstance = new web3.eth.Contract(
  zolCoreJson.abi,
  zolCoreJson.address
).methods;

const sendTranscationToLocal = async () => {
  const setMiningPoolABI = zolCoreInstance
    .setMiningPool(zolMiningPool.address)
    .encodeABI();

  const miningGasPrice =
    (await zolCoreInstance
      .setMiningPool(zolMiningPool.address)
      .estimateGas({ from: deployAccount.address })) * 2;

  const setZolCoreCaABI = zolNFTInstance
    .setting(zolCoreJson.address)
    .encodeABI();

  const zolCoreCaGasPrice =
    (await zolNFTInstance
      .setting(zolCoreJson.address)
      .estimateGas({ from: deployAccount.address })) * 2;

  await sendTranscation(
    setZolCoreCaABI,
    zolNftJson.address,
    zolCoreCaGasPrice,
    "setZolCore"
  );

  await sendTranscation(
    setMiningPoolABI,
    zolCoreJson.address,
    miningGasPrice,
    "setMiningPool"
  );
};

sendTranscationToLocal();

const sendTranscation = async (abi, to, gas, text) => {
  await web3.eth.accounts
    .signTransaction(
      {
        from: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        to: to,
        gas: gas,
        data: abi,
      },
      "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
    )
    .then(async (Tx) => {
      await web3.eth
        .sendSignedTransaction(Tx.rawTransaction)
        .then((hash, err) => {
          if (err) console.log(err);
          else {
            console.log("success To Local", text);
          }
        });
    });
};
