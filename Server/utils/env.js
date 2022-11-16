import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT;
export const homeUrl = process.env.HOME_URL;

export const redisPort = process.env.REDIS_PORT;
export const redisHost = process.env.REDIS_HOST;
export const redisUserName = process.env.REDIS_USERNAME;
export const redisPassword = process.env.REDIS_PASSWORD;
