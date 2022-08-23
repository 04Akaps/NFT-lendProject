import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT;
export const googleClientId = process.env.GOOGLE_CLIENT_ID;
export const homeUrl = process.env.HOME_URL;
export const webSocket = process.env.WEB_SOCKET;
