"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const OAuth_1 = require("../controllers/OAuth");
const router = express_1.default.Router();
router.get("/loginGoogle", OAuth_1.loginGoogle);
router.get("/google", OAuth_1.getAuth);
exports.default = router;
