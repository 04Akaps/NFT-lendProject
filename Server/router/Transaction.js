import express from "express";
import {
  getTrnascationList,
  transcationTest,
} from "../controllers/Transaction.js";

const router = express.Router();

router.get("/:address", getTrnascationList);

router.post("/test", transcationTest);

export default router;
