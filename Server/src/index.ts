import express from 'express'
import bodyParser from 'body-parser';
import cors from "cors"
import cookieParser from 'cookie-parser';

import dotenv from "dotenv"
dotenv.config();

import {PORT} from "./utils/getEnv"

import { OAuth } from './routers/Total';
import connectionUser from './db/config';

const port = PORT || 8080
const app = express();

app.use(express.static("public"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(cors())
app.use((
    err : Error,
    req:express.Request,
    res :express.Response,
    next : express.NextFunction
) =>(
    res.status(500).json({message : err.message})
))




app.use("/OAuth", OAuth)

connectionUser.sync().then((result)=>{
    // need to change nvm Version to 16.0.0
    if(result){
        app.listen(port, () => {
            console.log("서버 시작 : ", port)
        })
    }
})

