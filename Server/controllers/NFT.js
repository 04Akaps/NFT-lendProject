import path from "path";
const __dirname = path.resolve();

export const makeNFT = async (req, res) => {
  res.sendFile(__dirname + "/NFT.html");
};
