import { heroCoreInstance } from "../Contract";
import { heroCoreAddress } from "../ContractData";
import { sendValueTransaction } from "./SendTransactionCall";

export const mintNFT = async (vaule) => {
  const data = heroCoreInstance.mintBuy().encodeABI();
  //   const gasPrice =
  //     (await heroCoreInstance
  //       .mintBuy()
  //       .estimateGas({ from: window.ethereum.selectedAddress, vaule: 1 })) * 2;

  await sendValueTransaction(data, heroCoreAddress, 500000, 1);
};
