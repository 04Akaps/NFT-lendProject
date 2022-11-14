import Web3 from "web3";
export const web3 = new Web3(window.ethereum);

const zolCoreJson = require("./zolCore.json");
const zolItemJson = require("./zolItem.json");
const zolMiningPoolJson = require("./zolMiningPool.json");
const zolNFTJson = require("./zolNFT.json");
const zolTokenJson = require("./zolToken.json");

export const zolCoreABI = zolCoreJson.abi;
export const zolCoreAddress = zolCoreJson.address;

export const zolItemABI = zolItemJson.abi;
export const zolItemAddress = zolItemJson.address;

export const zolMiningPoolABI = zolMiningPoolJson.abi;
export const zolMiningPoolAddress = zolMiningPoolJson.address;

export const zolNFTABI = zolNFTJson.abi;
export const zolNFTAddress = zolNFTJson.address;

export const zolTokenABI = zolTokenJson.abi;
export const zolTokenAdress = zolTokenJson.address;

export const zolCoreInstance = new web3.eth.Contract(zolCoreABI, zolCoreAddress)
  .methods;

export const zolNFTInstance = new web3.eth.Contract(zolNFTABI, zolNFTAddress)
  .methods;

export const zolItemInstance = new web3.eth.Contract(zolItemABI, zolItemAddress)
  .methods;

export const zolTokenInstance = new web3.eth.Contract(
  zolTokenABI,
  zolTokenAdress
).methods;
