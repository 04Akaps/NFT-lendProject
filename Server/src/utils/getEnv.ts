import dotenv from "dotenv"
dotenv.config();

export const PORT = process.env.PORT 
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string
export const CLIENT_SECRET_PASSWORD = process.env.CLIENT_SECRET_PASSWORD as string
export const GOOGLE_REDIRECT_URL = process.env.GOOGLE_REDIRECT_URL as string
export const HOME_URL = process.env.HOME_URL as string
export const AUTH_URL = process.env.AUTH_URL as string