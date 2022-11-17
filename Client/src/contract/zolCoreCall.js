import { zolCoreAddress, zolCoreInstance } from "./JSON/contract";
import { sendNoValueTransaction } from "./sendTransaction";

export const mintNFT = async () => {
  const encodeABI = zolCoreInstance.mintZol().encodeABI();
  try {
    const gasPrice = await zolCoreInstance
      .mintZol()
      .estimateGas({ from: window.ethereum.selectedAddress });

    await sendNoValueTransaction(
      encodeABI,
      zolCoreAddress,
      gasPrice,
      "mint NFT!"
    );
  } catch (error) {
    console.log("mintNFT gasPrice 측정 실패", error);
  }
};
