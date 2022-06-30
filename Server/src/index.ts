import express from 'express'

import dotenv from "dotenv"
import bodyParser from 'body-parser';
dotenv.config();

const PORT = process.env.PORT || 8080
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))

app.listen(PORT, () => {
    console.log("서버 시작 : ", PORT)
})

