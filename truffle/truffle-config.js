const HDWalletProvider = require("@truffle/hdwallet-provider");
const { deployer } = require("../Variable/Variable");

module.exports = {
  networks: {
    ganache: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },
    testnet: {
      provider: new HDWalletProvider(
        deployer.privateKey,
        `https://data-seed-prebsc-1-s1.binance.org:8545`
      ),
      network_id: 97,
      confirmations: 2,
      skipDryRun: true,
    },
  },

  contracts_build_directory: "./compile",

  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.4",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
      },
    },
  },
};
