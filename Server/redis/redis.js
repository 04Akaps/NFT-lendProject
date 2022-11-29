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
  const address = req.params.address;

  if (address) {
    await redisClient.get("test", (err, value) => {
      console.log(value);
      if (err) {
        res.status(201).send({ message: "redis Error" });
      } else {
        res.status(200).send(value);
      }
    });
  } else {
    next();
  }
};
