import express from 'express'
import bodyParser from 'body-parser';
import cors from "cors"

import dotenv from "dotenv"
dotenv.config();

import {PORT} from "./utils/getEnv"

import { OAuth } from './routers/Total';

const port = PORT || 8080
const app = express();

app.use(express.static("public"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors())

app.use("/Auth", OAuth)


app.listen(port, () => {
    console.log("서버 시작 : ", port)
})

