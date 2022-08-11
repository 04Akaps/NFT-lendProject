const {
  makeHeroCoreContract,
  makeHeroNFTContract,
  makeItemContract,
  makeTokenContract,
  makeDepositContract,
  makeBorrowContract,
  makeLevelDiagramContract,
} = require("../Variable/makeFile");

const hero = artifacts.require("HeroCore");
const heroNFT = artifacts.require("HeroNFT");
const levelDiagram = artifacts.require("LevelDiagram");

const item = artifacts.require("GXTItem");
const token = artifacts.require("GXTToken");

const miningDeposit = artifacts.require("MiningDeposit");
const borrowDeposit = artifacts.require("BorrowDeposit");

module.exports = async function (deployer) {
  await deployer.deploy(hero);
  await deployer.deploy(heroNFT);

  await deployer.deploy(item);
  await deployer.deploy(token);

  const heroCoreContract = await hero.deployed();
  const heroNFTContract = await heroNFT.deployed();
  const itemContract = await item.deployed();
  const tokenContract = await token.deployed();

  await deployer.deploy(levelDiagram, itemContract.address);

  await deployer.deploy(
    miningDeposit,
    tokenContract.address,
    heroCoreContract.address
  );

  await deployer.deploy(
    borrowDeposit,
    tokenContract.address,
    heroCoreContract.address
  );

  const levelDiagramContract = await levelDiagram.deployed();
  const miningDepositContract = await miningDeposit.deployed();
  const borrowDepositContract = await borrowDeposit.deployed();

  await heroCoreContract.initialize(
    heroNFTContract.address,
    tokenContract.address,
    itemContract.address,
    levelDiagramContract.address,
    borrowDepositContract.address,
    miningDepositContract.address,
    1,
    1
  );

  await heroCoreContract.changePaused();
  await heroCoreContract.changeMiningPaused();

  await heroCoreContract.setContract(heroCoreContract.address);

  makeHeroCoreContract(heroCoreContract.address);
  makeHeroNFTContract(heroNFTContract.address);
  makeLevelDiagramContract(levelDiagramContract.address);

  makeItemContract(itemContract.address);
  makeTokenContract(tokenContract.address);

  makeDepositContract(miningDepositContract.address);
  makeBorrowContract(borrowDepositContract.address);
};
