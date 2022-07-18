
import axios from "axios";
import { Request, Response } from "express";
import { OAuth2Client, TokenPayload } from "google-auth-library";

import {  GOOGLE_CLIENT_ID, HOME_URL } from "../utils/getEnv";


const client = new OAuth2Client(GOOGLE_CLIENT_ID)


export const tokenVerify = async (req: Request ,res: Response) => {
    try {
        let googleToken = req.body.token
       
        const ticket = await client.verifyIdToken({
            idToken: googleToken,
            audience: GOOGLE_CLIENT_ID,  
        }).then(() =>{
            res.status(200).send({message : "success"})
        }).catch(()=>{
            res.status(200).send({message : "fail"})
        });
        
    } catch (error) {
        console.log(error)
        res.redirect(HOME_URL)
    }
    
}

