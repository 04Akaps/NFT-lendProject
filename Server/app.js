import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { PORT } from "./utils/env.js";
import { sequelize } from "./models/HeroMetaData.js";
import { NFT } from "./router/Assemble.js";
import { swagger } from "./swagger/swagger.js";

const app = express();

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/swagger", swagger.serve, swagger.setup);

app.use("/NFT", NFT);

try {
  sequelize
    .authenticate()
    .then(() => {
      console.log("sequelize Auth Success");
      sequelize.sync({ force: true }).then(() => {
        // test 끝나면 force옵션 제거
        app.listen(PORT, () => {
          console.log(PORT);
        });
      });
    })
    .catch((err) => {
      console.log("HeroMetaData 생성 실패!");
    });
} catch (error) {
  console.log("DB연결 및 서버 시작 에러 발생");
}
