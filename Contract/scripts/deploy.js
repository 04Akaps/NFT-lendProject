const hre = require("hardhat");
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

  // deploy가 된 뒤에 zolcore의 setMiningPool을 실행시켜 주어야 한다.

  makeZolCore(zolCore.address);
  makeZolNFT(zolNFT.address);
  makeZolMiningPool(zolMiningPool.address);
  makeZolToken(zolToken.address);
  makeZolItem(zolWeapon.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
