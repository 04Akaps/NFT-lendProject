export const commonDescription = "this is Basic NFT MetaData";

import { createRequire } from "module";
const require = createRequire(import.meta.url);

const heroCoreJson = require("../../ContractFile/HeroCore.json");
const heroNftJson = require("../../ContractFile/HeroNFT.json");
const heroItemJson = require("../../ContractFile/HeroItem.json");
const tokenJson = require("../../ContractFile/Token.json");
const borrowJson = require("../../ContractFile/BorrowContract.json");
const depositJson = require("../../ContractFile/DepositContract.json");

export const heroCoreABI = heroCoreJson.abi;
export const heroCoreAddress = heroCoreJson.address;

export const heroNftABI = heroNftJson.abi;
export const heroNftAddress = heroNftJson.address;

export const heroItemABI = heroItemJson.abi;
export const heroItemAddress = heroItemJson.address;

export const tokenABI = tokenJson.abi;
export const tokenAddress = tokenJson.addresss;

export const borrowABI = borrowJson.abi;
export const borrowAddress = borrowJson.address;

export const depositABI = depositJson.abi;
export const depostiAddress = depositJson.address;
