import { zolTokenInstance } from "./JSON/contract";

export const checkTokenAllowance = async (address) => {
  const sender = window.ethereum.selectedAddress;
  const allowanceAmount = await zolTokenInstance
    .allowance(sender, address)
    .call();

  return allowanceAmount;
};
