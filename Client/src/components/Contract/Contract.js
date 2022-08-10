import { borrowContractABI, borrowContractAddress } from "./ContractData";

const Web3 = require("web3");
const web3 = new Web3(window.ethereum);

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
