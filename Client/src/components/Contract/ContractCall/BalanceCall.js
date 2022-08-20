import { heroNFTInstance } from "../Contract";

export const getNFTBalanceOf = async () => {
  const balance = await heroNFTInstance
    .balanceOf(window.ethereum.selectedAddress)
    .call();
  console.log(balance);
  return balance;
};
