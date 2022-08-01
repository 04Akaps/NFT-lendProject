module.exports = {
  networks: {
    ganache: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 7545, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
    },
  },

  contracts_build_directory: "./compile",

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  solc: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.0",
    },
  },
};
