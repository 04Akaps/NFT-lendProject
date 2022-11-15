import { zolTokenAdress, zolTokenInstance } from "./JSON/contract";
import { sendNoValueTransaction } from "./sendTransaction";

export const checkTokenAllowance = async (address) => {
  const sender = window.ethereum.selectedAddress;
  const allowanceAmount = await zolTokenInstance
    .allowance(sender, address)
    .call();

  return allowanceAmount;
};

export const sendApproveTransaction = async (sender, to) => {
  const encodeABI = await zolTokenInstance.approve(sender, to).encodeABI();

  try {
    const gasPrice = await zolTokenInstance
      .approve(sender, to)
      .estimateGas({ from: sender });

    await sendNoValueTransaction(
      encodeABI,
      zolTokenAdress,
      gasPrice,
      "Approve To zolToken Before Login"
    );
  } catch (error) {}
};
