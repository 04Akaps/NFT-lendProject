import express from "express";
import { getTrnascationList } from "../controllers/Transaction.js";
import { checkCache } from "../redis/redis.js";

const router = express.Router();

router.get("/:address", checkCache, getTrnascationList);

export default router;
