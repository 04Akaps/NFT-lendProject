const Web3 = require("web3");
const { url, deployAccount } = require("./utils");

const zolCoreJson = require("../../../Client/src/contract/JSON/zolCore.json");
const zolNftJson = require("../../../Client/src/contract/JSON/zolNFT.json");

const zolMiningPool = require("../../../Client/src/contract/JSON/zolMiningPool.json");

const web3 = new Web3(url);
const zolCoreInstance = new web3.eth.Contract(
  zolCoreJson.abi,
  zolCoreJson.address
).methods;

const zolNFTInstance = new web3.eth.Contract(zolNftJson.abi, zolNftJson.address)
  .methods;

const sendTranscationToBSC = async () => {
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

const sendTranscation = async (abi, to, gas, text) => {
  await web3.eth.accounts
    .signTransaction(
      {
        from: deployAccount.address,
        to: to,
        gas: gas,
        data: abi,
      },
      deployAccount.key
    )
    .then(async (Tx) => {
      await web3.eth
        .sendSignedTransaction(Tx.rawTransaction)
        .then((hash, err) => {
          if (err) console.log(err, text);
          else {
            console.log("success To BSC", text);
          }
        });
    });
};

sendTranscationToBSC();
