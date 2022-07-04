import express from "express"
import { loginGoogle, getAuth } from "../controllers/OAuth";

const router = express.Router();

router.get("/loginGoogle",loginGoogle )
router.get("/google", getAuth)

export default router;
