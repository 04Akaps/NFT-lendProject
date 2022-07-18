import express from "express"
import { tokenVerify } from "../controllers/OAuth";

const router = express.Router();

router.post("/checkToken", tokenVerify)

export default router;
