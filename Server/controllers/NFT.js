import path from "path";
import fs from "fs";
import nodeHtmlToImage from "node-html-to-image";

const __dirname = path.resolve();

export const makeNFT = async (req, res) => {
  const imgHtml = __dirname + "/NFT.html";

  const htmlData = await fs.readFileSync(imgHtml, "utf8", (err, data) => {
    return data;
  });

  await nodeHtmlToImage({
    output: "./newNFT.png",
    html: htmlData,
  });

  const newNFTImageLink = __dirname + "/newNFT.png";

  const newNFTImageData = await fs.readFileSync(
    newNFTImageLink,
    "base64",
    (err, data) => {
      return data;
    }
  );

  const imagePrefix = "data:image/png;base64,";

  const imgBase64 = imagePrefix + newNFTImageData;
  // Transaction 실행 후 DB값 생성 필요
};

export const getNFTMetaData = async (req, res) => {
  const tokenId = req.params.id;
};
