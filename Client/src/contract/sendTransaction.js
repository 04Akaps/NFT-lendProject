const { web3 } = require("./JSON/contract");

export const sendNoValueTransaction = async (data, to, gas, text) => {
  const currentGasprice = Math.round((await web3.eth.getGasPrice()) * 1.2); // to speed up 1.2
  const estimatedGas = Math.round(gas * 1.2);

  const sender = web3.utils.toChecksumAddress(window.ethereum.selectedAddress);

  await web3.eth
    .sendTransaction({
      from: sender,
      to: to,
      gas: web3.utils.toHex(estimatedGas),
      gasPrice: web3.utils.toHex(currentGasprice),
      data: data,
    })
    .then(() => {
      console.log(`성공 : ${text}`);
    })
    .catch((error) => console.log(error));
};

export const sendValueTranscation = async (data, to, value, text) => {
  const mintValue = web3.utils.toWei(value.toString(), "ether");

  const currentGasprice = Math.round((await web3.eth.getGasPrice()) * 1.2); // to speed up 1.2
  const estimatedGas = Math.round(gas * 1.2);

  const sender = web3.utils.toChecksumAddress(window.ethereum.selectedAddress);

  await web3.eth
    .sendTransaction({
      from: sender,
      to: to,
      gas: web3.utils.toHex(estimatedGas),
      gasPrice: web3.utils.toHex(currentGasprice),
      data: data,
      value: mintValue,
    })
    .then(() => {
      console.log(`성공 : ${text}`);
    })
    .catch((error) => console.log(error));
};
