const shell = require("shelljs");

const testScript = "truffle test ./test/Hero.js --network test";

const init = async () => {
  console.log("test Start Using Ganache");

  shell.exec(testScript);
};

init();
