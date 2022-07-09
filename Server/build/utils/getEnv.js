"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HOME_URL = exports.GOOGLE_REDIRECT_URL = exports.CLIENT_SECRET_PASSWORD = exports.GOOGLE_CLIENT_ID = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.PORT = process.env.PORT;
exports.GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
exports.CLIENT_SECRET_PASSWORD = process.env.CLIENT_SECRET_PASSWORD;
exports.GOOGLE_REDIRECT_URL = process.env.GOOGLE_REDIRECT_URL;
exports.HOME_URL = process.env.HOME_URL;
