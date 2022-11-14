const { url, deployAccount } = require("./Deploy/utils/utils.js");

require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");

module.exports = {
  defaultnetwork: "localhost",

  networks: {
    bscTest: {
      url: url,
      // account Sample deployAccount.key로 변경 해야함
      accounts: [
        "8913731759aa5c3c772610b6f048c67d940331ef1f207bc318cb7cc95a7cea45",
      ],
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
