import { TransactionList } from "../models/TranscationList.js";
import { redisClient } from "../redis/redis.js";

export const getTrnascationList = async (req, res) => {
  const address = req.params.address;

  const findData = await TransactionList.findAll({
    where: { from: address },
    raw: true,
  });

  // 이곳을 탔다는 의미는 redis를 한번 거쳐서 캐시된 데이터가 없기 떄문에 탓다는 의미
  // 그러기 떄문에 redis에 데이터를 다시 추가해 주어야 한다.

  await redisClient.set(address, findData);
  await redisClient.expire(address, 30);
  // ttl 은 딱히 고려하지 않음 단순히 30초후에 expire하게 구성

  res.status(200).send(findData);
};
