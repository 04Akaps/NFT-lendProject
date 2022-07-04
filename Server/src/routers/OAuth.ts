import express from "express"
import { googleAuth } from "../controllers/OAuth";

const router = express.Router();

router.get("/google",googleAuth )

export default router;