const hre = require("hardhat");
const { contractListSequelize } = require("../Deploy/model/model.js");

const {
  makeZolCore,
  makeZolNFT,
  makeZolMiningPool,
  makeZolToken,
  makeZolItem,
} = require("../Json/Json");

async function main() {
  const token = await hre.ethers.getContractFactory("ZolToken");
  const zolToken = await token.deploy();

  const weapon = await hre.ethers.getContractFactory("ZolWeapon");
  const zolWeapon = await weapon.deploy();

  const nft = await hre.ethers.getContractFactory("ZolNFT");
  const zolNFT = await nft.deploy();

  const core = await hre.ethers.getContractFactory("ZolCore");
  const zolCore = await core.deploy(
    0,
    zolWeapon.address,
    zolNFT.address,
    zolToken.address
  );

  const miningPool = await hre.ethers.getContractFactory("ZolMiningPool");
  const zolMiningPool = await miningPool.deploy(
    zolCore.address,
    zolToken.address
  );

  await contractListSequelize
    .authenticate()
    .then(async () => {
      await contractListSequelize.sync({ force: true });
    })
    .catch((err) => console.log("에러 있다...", err));

  await makeZolCore(zolCore.address);
  await makeZolNFT(zolNFT.address);
  await makeZolMiningPool(zolMiningPool.address);
  await makeZolToken(zolToken.address);
  await makeZolItem(zolWeapon.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
