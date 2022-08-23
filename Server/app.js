import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { PORT } from "./utils/env.js";

import { NFT, OAuth } from "./router/Assemble.js";
import { sequelize } from "./models/HeroMetaData.js";
import { eventLintening } from "./utils/EventListening.js";

const app = express();

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/OAuth", OAuth);
app.use("/NFT", NFT);

try {
  sequelize
    .authenticate()
    .then(() => {
      console.log("sequelize Auth Success");
      sequelize.sync({ force: true }).then(() => {
        app.listen(PORT, () => {
          console.log(PORT);
          eventLintening();
        });
      });
    })
    .catch(() => {
      console.log("HeroMetaData 생성 실패!");
    });
} catch (error) {
  console.log("DB연결 및 서버 시작 에러 발생");
}
