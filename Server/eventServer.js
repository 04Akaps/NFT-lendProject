import express from "express";
import Web3 from "web3";
import path from "path";
import fs from "fs";

import { ContractList, contractListSequelize } from "./models/ContractList.js";
import { heroSequelize, HeroMetaData } from "./models/HeroMetaData.js";
import { drawNFT } from "./utils/drawNFT.js";
import { metaDataLog } from "./loggers/logger.js";

const eventServer = express();
const web3Socket = new Web3(
  "wss://wandering-dry-feather.bsc-testnet.discover.quiknode.pro/d3840d60c3929a0e9a2dd7118f9355f53c6b8b3a/",
  { reconnect: true }
);

let zolCoreABI;
let zolCoreAddress;

const __dirname = path.resolve();
const imgHtml = __dirname + "/NFT.html";

const startEventListener = () => {
  const zolCoreSocketInstance = new web3Socket.eth.Contract(
    JSON.parse(zolCoreABI),
    zolCoreAddress
  );

  zolCoreSocketInstance.events.MintBuy(async (err, result) => {
    if (result) {
      const value = result.returnValues;
      const tokenId = value.tokenId;

      try {
        await HeroMetaData.create({
          tokenId: tokenId,
          level: value.level,
          grade: value.grade,
          birthTime: value.birthTime,
          image: `http://localhost:8080/NFT/getNFTImage/${tokenId}`,
          attributes: JSON.stringify([
            {
              trait_type: "Level",
              value: value.level,
            },
            {
              trait_type: "Grade",
              value: value.grade,
            },
          ]).then(async () => {
            await result.createHeroMetaDataImage({
              tokenId: tokenId,
              image: await drawNFT(tokenId),
            });

            metaDataLog.info(`created NFT Token Id : ${tokenId}`);
          }),
        });
      } catch (error) {
        metaDataLog.error(`meataData create Error : ${tokenId}`);
      }
    }
  });
};

heroSequelize.authenticate();

contractListSequelize
  .authenticate()
  .then(() => {
    contractListSequelize.sync().then(async () => {
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
