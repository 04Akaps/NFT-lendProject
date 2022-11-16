import express from "express";
import { getTrnascationList } from "../controllers/Transaction.js";

const router = express.Router();

router.get("/:address", getTrnascationList);

export default router;
