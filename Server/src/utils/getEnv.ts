import dotenv from "dotenv"
dotenv.config();

export const PORT = process.env.PORT
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
export const CLIENT_SECRET_PASSWORD = process.env.CLIENT_SECRET_PASSWORD
export const GOOGLE_REDIRECT_URL = process.env.GOOGLE_REDIRECT_URL
