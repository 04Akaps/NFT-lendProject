const shell = require("shelljs");
const cliString = "npx hardhat run --network localhost ../scripts/deploy.js";
const settingString = "npm run local";

const init = async () => {
  await shell.exec(cliString);

  console.log("");
  console.log("배포 완료");
  console.log("");

  await shell.exec(settingString);
};

init();
