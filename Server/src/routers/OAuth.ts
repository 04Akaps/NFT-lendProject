import express from "express"
import { loginGoogle, getAuth, tokenVerify, check } from "../controllers/OAuth";

const router = express.Router();

router.get("/loginGoogle",loginGoogle )
router.get("/google", getAuth)
router.get("/token", tokenVerify)
router.get("/check", check)

export default router;
