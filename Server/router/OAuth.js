import express from "express";
import { authVerify } from "../controllers/OAuth.js";

const router = express.Router();

router.post("/checkToken", authVerify);

export default router;
