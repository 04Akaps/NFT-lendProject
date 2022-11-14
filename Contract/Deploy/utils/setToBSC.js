const Web3 = require("web3");
const { url, deployAccount } = require("./utils");

const zolCoreJson = require("../../../Client/src/contract/JSON/zolCore.json");

const zolMiningPoolAddress =
  require("../../../Client/src/contract/JSON/zolMiningPool.json").address;

const web3 = new Web3(url);
const zolCoreInstance = new web3.eth.Contract(
  zolCoreJson.abi,
  zolCoreJson.address
).methods;

const sendTranscationToBSC = async () => {
  const encodeABI = zolCoreInstance
    .setMiningPool(zolMiningPoolAddress)
    .encodeABI();

  await web3.eth.accounts
    .signTransaction(
      {
        from: deployAccount.address,
        to: zolCoreJson.address,
        gas: 5000000,
        data: encodeABI,
      },
      deployAccount.key
    )
    .then(async (Tx) => {
      await web3.eth
        .sendSignedTransaction(Tx.rawTransaction)
        .then((hash, err) => {
          if (err) console.log(err);
          else {
            console.log("success To BSC");
          }
        });
    });
};

sendTranscationToBSC();
