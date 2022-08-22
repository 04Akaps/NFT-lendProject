import express from "express";
import { getNFTMetaData, makeNFT, getNFTImage } from "../controllers/NFT.js";

const router = express.Router();

router.get("/makeNFT", makeNFT);
router.get("/getNFTData/:id", getNFTMetaData);
router.get("/getNFTImage/:id", getNFTImage);

export default router;
