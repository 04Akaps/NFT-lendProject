/* global BigInt */

import {
  zolCoreAddress,
  zolTokenAdress,
  zolTokenInstance,
} from "./JSON/contract";
import { sendNoValueTransaction } from "./sendTransaction";

export const checkTokenAllowance = async (address) => {
  const sender = window.ethereum.selectedAddress;
  const allowanceAmount = await zolTokenInstance
    .allowance(sender, address)
    .call();

  return allowanceAmount;
};

export const sendApproveTransaction = async (to, amount) => {
  const encodeABI = await zolTokenInstance
    .approve(to, BigInt(amount))
    .encodeABI();

  try {
    const gasPrice = await zolTokenInstance
      .approve(zolCoreAddress, BigInt(amount))
      .estimateGas({ from: window.ethereum.selectedAddress });

    await sendNoValueTransaction(
      encodeABI,
      zolTokenAdress,
      gasPrice,
      "Approve To zolToken Before Login"
    );
  } catch (error) {}
};
