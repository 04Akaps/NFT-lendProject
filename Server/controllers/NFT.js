import path from "path";
import fs from "fs";
import nodeHtmlToImage from "node-html-to-image";
import { HeroMetaData } from "../models/HeroMetaData.js";

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

  const testobj = {
    obj: "test",
  };

  await HeroMetaData.create({
    tokenId: 1,
    image: imgBase64,
    name: "test",
    description: "test",
    birthTime: "test",
    attributes: JSON.stringify("test"),
  });
  // Transaction 실행 후 DB값 생성 필요
};

export const getNFTMetaData = async (req, res) => {
  const tokenId = req.params.id;

  const tempData = await HeroMetaData.findOne({ where: { tokenId: tokenId } });
  const data = tempData.toJSON();

  data.image = Buffer.from(data.image, "base64").toString("utf-8");

  res.status(200).json(data);
};
