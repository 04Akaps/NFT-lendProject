import {
  borrowContractABI,
  borrowContractAddress,
  depositContractABI,
  depositContractAddress,
  heroCoreABI,
  heroCoreAddress,
  heroItemABI,
  heroItemAddress,
  heroNFTABI,
  heroNFTAddress,
  tokenABI,
  tokenAddress,
} from "./ContractData";

const Web3 = require("web3");

export const web3 = new Web3(window.ethereum);

export const checkNetworkVersion = () => {
  const networkVersion = window.ethereum.networkVersion;
  if (networkVersion === "97") {
    return true;
  } else {
    return false;
  }
};

export const borrowContractInstance = new web3.eth.Contract(
  borrowContractABI,
  borrowContractAddress
).methods;

export const depositContractInstance = new web3.eth.Contract(
  depositContractABI,
  depositContractAddress
).methods;

export const heroCoreInstance = new web3.eth.Contract(
  heroCoreABI,
  heroCoreAddress
).methods;

export const heroNFTInstance = new web3.eth.Contract(heroNFTABI, heroNFTAddress)
  .methods;

export const tokenInstance = new web3.eth.Contract(tokenABI, tokenAddress)
  .methods;

export const itemInstance = new web3.eth.Contract(heroItemABI, heroItemAddress)
  .methods;
