const fs = require("fs");
const path = require("path");
const { ContractList } = require("../Deploy/model/model.js");

const basePath = __dirname;

const zolCore =
  require("../artifacts/contracts/Zol/NFT/ZolCore.sol/ZolCore.json").abi;

const zolNFT =
  require("../artifacts/contracts/Zol/NFT/ZolNFT.sol/ZolNFT.json").abi;

const zolMiningPool =
  require("../artifacts/contracts/Zol/NFT/ZolMiningPool.sol/ZolMiningPool.json").abi;

const zolToken =
  require("../artifacts/contracts/Zol/Token/ZolToken.sol/ZolToken.json").abi;

const zolWeapon =
  require("../artifacts/contracts/Zol/Weapon/ZolWeapon.sol/ZolWeapon.json").abi;

const makeZolCore = async (address) => {
  await ContractList.create({
    name: "zolCore",
    abi: JSON.stringify(zolCore),
    address: address,
  });

  fs.writeFileSync(
    path.join(basePath, "../../Client/src/contract/JSON/zolCore.json"),
    JSON.stringify({ abi: zolCore, address: address })
  );
};

const makeZolNFT = async (address) => {
  await ContractList.create({
    name: "zolNFT",
    abi: JSON.stringify(zolNFT),
    address: address,
  });

  fs.writeFileSync(
    path.join(basePath, "../../Client/src/contract/JSON/zolNFT.json"),
    JSON.stringify({ abi: zolNFT, address: address })
  );
};

const makeZolMiningPool = async (address) => {
  await ContractList.create({
    name: "zolCore",
    abi: JSON.stringify(zolMiningPool),
    address: address,
  });

  fs.writeFileSync(
    path.join(basePath, "../../Client/src/contract/JSON/zolMiningPool.json"),
    JSON.stringify({ abi: zolMiningPool, address: address })
  );
};

const makeZolToken = async (address) => {
  await ContractList.create({
    name: "zolCore",
    abi: JSON.stringify(zolToken),
    address: address,
  });
  fs.writeFileSync(
    path.join(basePath, "../../Client/src/contract/JSON/zolToken.json"),
    JSON.stringify({ abi: zolToken, address: address })
  );
};

const makeZolItem = async (address) => {
  await ContractList.create({
    name: "zolCore",
    abi: JSON.stringify(zolWeapon),
    address: address,
  });

  fs.writeFileSync(
    path.join(basePath, "../../Client/src/contract/JSON/zolItem.json"),
    JSON.stringify({ abi: zolWeapon, address: address })
  );
};

module.exports = {
  makeZolCore,
  makeZolNFT,
  makeZolMiningPool,
  makeZolToken,
  makeZolItem,
};
