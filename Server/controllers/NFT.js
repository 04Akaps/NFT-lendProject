import path from "path";
import fs from "fs";
import nodeHtmlToImage from "node-html-to-image";
import { HeroMetaData, HeroMetaDataImage } from "../models/HeroMetaData.js";

const __dirname = path.resolve();

export const makeNFT = async (req, res) => {
  const imgHtml = __dirname + "/NFT.html";
  const newNFTImageLink = __dirname + "/newNFT.png";

  const htmlData = await fs.readFileSync(imgHtml, "utf8", (err, data) => {
    return data;
  });

  // await nodeHtmlToImage({
  //   output: "./newNFT.png",
  //   html: htmlData,
  // });

  // const newNFTImageData = await fs.readFileSync(
  //   newNFTImageLink,
  //   "base64",
  //   (err, data) => {
  //     return data;
  //   }
  // );

  // const imgBase64 = "data:image/png;base64," + newNFTImageData;

  const testobj = [
    {
      obj: "test",
      value: 3,
    },
    {
      obj: "dsgsdg",
      value: 4,
    },
  ];

  const tokenId = 1;

  try {
    await HeroMetaData.create({
      tokenId: tokenId,
      image: `http://localhost:8080/NFT/getNFTImage/${tokenId}`,
      name: "test",
      description: "test",
      birthTime: "test",
      attributes: JSON.stringify(testobj),
    });

    await HeroMetaDataImage.create({
      tokenId: tokenId,
      image: htmlData,
    });
  } catch (error) {
    console.log(error);
  }

  // Transaction 실행 후 DB값 생성 필요
};

export const getNFTMetaData = async (req, res) => {
  const tokenId = req.params.id;

  const tempData = await HeroMetaData.findOne({ where: { tokenId: tokenId } });

  if (tempData == null) {
    res.status(201).send({ message: "Not Existed" });
  } else {
    const data = tempData.toJSON();
    data.attributes = JSON.parse(data.attributes);
    res.status(200).json(data);
  }
};

export const getNFTImage = async (req, res) => {
  const tokenId = req.params.id;
  const tempImage = await HeroMetaDataImage.findOne({
    where: { tokenId: tokenId },
  });

  if (tempImage == null) {
    res.status(201).send({ message: "Not Existed" });
  } else {
    const data = tempImage.toJSON();
    const returnData = Buffer.from(data.image, "base64").toString("utf-8");

    res.status(200).send(returnData);
  }
};
