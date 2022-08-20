import express from "express";
import { makeNFT } from "../controllers/NFT.js";

const router = express.Router();

router.get("/makeNFT", makeNFT);

export default router;
