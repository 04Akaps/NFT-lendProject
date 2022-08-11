import { web3 } from "../Contract";

export const sendNoValueTransction = async (data, to, gasPrice) => {
  await web3.eth
    .sendTransaction({
      from: window.ethereum.selectedAddress,
      to: to,
      gas: gasPrice,
      data: data,
    })
    .then((result, err) => {
      if (err) console.log(err);
      else console.log(result);
    });
};

export const sendValueTransaction = async (data, to, gasPrice, value) => {
  await web3.eth
    .sendTransaction({
      from: window.ethereum.selectedAddress,
      to: to,
      gas: gasPrice,
      data: data,
      value: await web3.utils.toWei(value.toString(), "ether"),
    })
    .then((result, err) => {
      if (err) console.log(err);
      else console.log(result);
    });
};
