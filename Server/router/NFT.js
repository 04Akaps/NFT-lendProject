import express from "express";
import { getNFTMetaData, makeNFT } from "../controllers/NFT.js";

const router = express.Router();

router.get("/makeNFT", makeNFT);
router.get("/getNFTData/:id", getNFTMetaData);

export default router;
