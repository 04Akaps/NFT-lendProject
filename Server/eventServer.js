import express from "express";
import Web3 from "web3";
import { ContractList, sequelize } from "./models/ContractList.js";

const eventServer = express();
const web3Socket = new Web3(
  "wss://wandering-dry-feather.bsc-testnet.discover.quiknode.pro/d3840d60c3929a0e9a2dd7118f9355f53c6b8b3a/",
  { reconnect: true }
);

let zolCoreABI;
let zolCoreAddress;

const startEventListener = () => {
  const zolCoreSocketInstance = new web3Socket.eth.Contract(
    JSON.parse(zolCoreABI),
    zolCoreAddress
  );

  zolCoreSocketInstance.events.MintBuy((err, result) => {
    if (result) {
      console.log(result);
    }
  });
};

sequelize
  .authenticate()
  .then(() => {
    console.log("sequelize Auth Success");
    sequelize.sync().then(async () => {
      // test 끝나면 force옵션 제거
      eventServer.listen(5050, () => {
        console.log(5050);
      });

      const zolCore = await ContractList.findOne({
        where: { name: "zolCore" },
      });

      zolCoreABI = zolCore.abi;
      zolCoreAddress = zolCore.address;

      startEventListener();
    });
  })
  .catch((err) => {
    console.log("HeroMetaData 생성 실패!");
  });
