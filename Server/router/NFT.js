import express from "express";
import { getNFTImage, getNFTMetaData, makeNFT } from "../controllers/NFT.js";

const router = express.Router();

router.post("/test", makeNFT);
// 위에 router는 후에 제거하여 eventListening으로 활용
router.get("/getNFT/:id", getNFTMetaData);
router.get("/getNFTImage/:id", getNFTImage);

export default router;
