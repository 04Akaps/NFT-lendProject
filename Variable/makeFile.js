const fs = require("fs");
const path = require("path");
const basePath = __dirname;

const heroCoreABI = require("../Truffle/compile/HeroCore.json").abi;
const heroNFTABI = require("../Truffle/compile/HeroNFT.json").abi;
const levelDiagramABI = require("../Truffle/compile/LevelDiagram.json").abi;

const itemABI = require("../Truffle/compile/GXTItem.json").abi;
const tokenABI = require("../Truffle/compile/GXTToken.json").abi;

const miningABI = require("../Truffle/compile/MiningDeposit.json").abi;
const borrowABI = require("../Truffle/compile/borrowDeposit.json").abi;

const makeHeroCoreContract = async (address) => {
  await fs.writeFileSync(
    path.join(basePath, "../ContractFile/HeroCore.json"),
    makeData(heroCoreABI, address)
  );
};

const makeHeroNFTContract = async (address) => {
  await fs.writeFileSync(
    path.join(basePath, "../ContractFile/HeroNFT.json"),
    makeData(heroNFTABI, address)
  );
};

const makeLevelDiagramContract = async (address) => {
  await fs.writeFileSync(
    path.join(basePath, "../ContractFile/HeroLevelDiagram.json"),
    makeData(levelDiagramABI, address)
  );
};

const makeItemContract = async (address) => {
  await fs.writeFileSync(
    path.join(basePath, "../ContractFile/HeroItem.json"),
    makeData(itemABI, address)
  );
};

const makeTokenContract = async (address) => {
  await fs.writeFileSync(
    path.join(basePath, "../ContractFile/Token.json"),
    makeData(tokenABI, address)
  );
};

const makeDepositContract = async (address) => {
  await fs.writeFileSync(
    path.join(basePath, "../ContractFile/DepositContrat.json"),
    makeData(miningABI, address)
  );
};

const makeBorrowContract = async (address) => {
  await fs.writeFileSync(
    path.join(basePath, "../ContractFile/BorrowContract.json"),
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
