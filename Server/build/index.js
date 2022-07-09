"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const getEnv_1 = require("./utils/getEnv");
const Total_1 = require("./routers/Total");
const config_1 = __importDefault(require("./db/config"));
const port = getEnv_1.PORT || 8080;
const app = (0, express_1.default)();
app.use(express_1.default.static("public"));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use((err, req, res, next) => (res.status(500).json({ message: err.message })));
app.use("/OAuth", Total_1.OAuth);
config_1.default.sync().then((result) => {
    // need to change nvm Version to 16.0.0
    if (result) {
        app.listen(port, () => {
            console.log("서버 시작 : ", port);
        });
    }
});
