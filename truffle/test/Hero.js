const heroCore = artifacts.require("HeroCore");
const heroNFT = artifacts.require("HeroNFT");
const item = artifacts.require("GXTItem");
const token = artifacts.require("GXTToken");
const deposit = artifacts.require("borrowDeposit");

contract("heroCore", (accounts) => {
  let heroCoreContract;
  let NFTContract;
  let itemContract;
  let tokenContract;
  let depositContract;

  const DECIMALS = 1000000000000000000;

  before("🔨 SetContract!", async () => {
    heroCoreContract = await heroCore.new();
    NFTContract = await heroNFT.new();
    itemContract = await item.new();
    tokenContract = await token.new();

    depositContract = await deposit.new(
      tokenContract.address,
      heroCoreContract.address
    );

    await heroCoreContract.initialize(
      NFTContract.address,
      tokenContract.address,
      itemContract.address,
      depositContract.address,
      1,
      1
    );

    await heroCoreContract.changePaused();
    await heroCoreContract.changeMiningPaused();
  });

  context(" 🔨 check Contract setting", async () => {
    it("🚀 check Contract setting", async () => {
      const corePaused = await heroCoreContract.getPaused();
      const coreMiningPaused = await heroCoreContract.getMiningPaused();
      const coreOwner = await heroCoreContract.getOwner();

      assert.equal(corePaused, false);
      assert.equal(coreMiningPaused, false);
      assert.equal(coreOwner, accounts[0]);
    });
  });
});
