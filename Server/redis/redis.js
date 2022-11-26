import redis from "redis";
import {
  redisHost,
  redisPassword,
  redisPort,
  redisUserName,
} from "../utils/env.js";

export const redisClient = redis.createClient({
  url: `redis://${redisUserName}:${redisPassword}@${redisHost}:${redisPort}/0`,
  legacyMode: true,
});

export const checkCache = async (req, res, next) => {
  console.log("여기 한번 타고 갑니다.");

  const address = req.params.address;

  if (address) {
    const redisData = await redisClient.get("test", (err, value) => {
      console.log(value);
    });
  }
  next();
  //     let value = await redisCli.get(req.key); // redis get key 를 한다.
  //    if (value) {
  //       // Redis에 저장된게 존재하면 바로 클라이언트에 응답
  //       res.send(data);
  //    } else {
  //       // Redis에 저장된게 없기 때문에 다음 미들웨어 실행
  //       next();
  //    }
};
