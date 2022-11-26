import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { PORT } from "./utils/env.js";

import { heroSequelize } from "./models/HeroMetaData.js";

import { NFT, Transaction } from "./router/Assemble.js";
import { swagger } from "./swagger/swagger.js";
import { checkCache } from "./redis/redis.js";

const app = express();

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    methods: ["GET", "POST"],
    origin: "*",
  })
);

app.use("/swagger", swagger.serve, swagger.setup);

app.use("/NFT", NFT);
app.use("/Transaction", Transaction);

try {
  heroSequelize
    .authenticate()
    .then(() => {
      console.log("heroSequelize Auth Success");
      heroSequelize.sync({ force: true });

      // transcationListSequelize.authenticate().then(() => {
      //   console.log("transcationListSequelize Auth Success");

      //   transcationListSequelize.sync({ force: true });

      //   // transcationListSequelize.query(
      //   //   "create transaction_index on TransactionList from"
      //   // );
      // });

      app.listen(PORT, () => {
        console.log(PORT);
      });
    })
    .catch((err) => {
      console.log("HeroMetaData 생성 실패!");
    });
} catch (error) {
  console.log("DB연결 및 서버 시작 에러 발생");
}
