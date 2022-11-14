const { url, deployAccount } = require("./Deploy/utils/utils.js");

require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");

module.exports = {
  defaultnetwork: "localhost",

  networks: {
    bscTest: {
      url: url,
      // account Sample deployAccount.key로 변경 해야함
      accounts: [deployAccount.key],
      allowUnlimitedContractSize: true,
    },
  },

  solidity: {
    version: "0.8.0",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  mocha: {
    timeout: 40000,
  },
};
