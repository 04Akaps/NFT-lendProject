const fs = require("fs");
const path = require("path");
const basePath = __dirname;

const heroCoreABI = require("../compile/HeroCore.json").abi;
const heroNFTABI = require("../compile/HeroNFT.json").abi;
const levelDiagramABI = require("../compile/LevelDiagram.json").abi;

const itemABI = require("../compile/GXTItem.json").abi;
const tokenABI = require("../compile/GXTToken.json").abi;

const miningABI = require("../compile/MiningDeposit.json").abi;
const borrowABI = require("../compile/borrowDeposit.json").abi;

const makeHeroCoreContract = async (address) => {
  await fs.writeFileSync(
    path.join(basePath, "../../ContractFile/HeroCore.json"),
    makeData(heroCoreABI, address)
  );
};

const makeHeroNFTContract = async (address) => {
  await fs.writeFileSync(
    path.join(basePath, "../../ContractFile/HeroNFT.json"),
    makeData(heroNFTABI, address)
  );
};

const makeLevelDiagramContract = async (address) => {
  await fs.writeFileSync(
    path.join(basePath, "../../ContractFile/HeroLevelDiagram.json"),
    makeData(levelDiagramABI, address)
  );
};

const makeItemContract = async (address) => {
  await fs.writeFileSync(
    path.join(basePath, "../../ContractFile/HeroItem.json"),
    makeData(itemABI, address)
  );
};

const makeTokenContract = async (address) => {
  await fs.writeFileSync(
    path.join(basePath, "../../ContractFile/Token.json"),
    makeData(tokenABI, address)
  );
};

const makeDepositContract = async (address) => {
  await fs.writeFileSync(
    path.join(basePath, "../../ContractFile/DepositContract.json"),
    makeData(miningABI, address)
  );
};

const makeBorrowContract = async (address) => {
  await fs.writeFileSync(
    path.join(basePath, "../../ContractFile/BorrowContract.json"),
    makeData(borrowABI, address)
  );
};

const makeData = (ABI, address) => {
  return JSON.stringify({
    abi: ABI,
    address: address,
  });
};

module.exports = {
  makeHeroCoreContract,
  makeHeroNFTContract,
  makeLevelDiagramContract,
  makeItemContract,
  makeTokenContract,
  makeDepositContract,
  makeBorrowContract,
};
