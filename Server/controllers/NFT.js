import { HeroMetaData, HeroMetaDataImage } from "../models/HeroMetaData.js";
import { metaDataLog } from "../loggers/logger.js";

export const getNFTMetaData = async (req, res) => {
  const tokenId = req.params.id;

  const tempData = await HeroMetaData.findOne({ where: { id: tokenId } });

  if (tempData == null) {
    res.status(201).send({ message: "Not Existed" });
  } else {
    const data = tempData.toJSON();
    data.attributes = JSON.parse(data.attributes);

    metaDataLog.info(`Get MetaData API ${tokenId}`);
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

    metaDataLog.info(`Get NFT Image API : ${tokenId}`);
    res.set("Cache-Control", "no-store");
    res.redirect(returnData);
  }
};
