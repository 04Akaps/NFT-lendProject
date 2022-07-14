
import { Request, Response } from "express";
import { OAuth2Client, TokenPayload } from "google-auth-library";
import { User } from "../models/User";

import { getGoogleOAuth, getGoogleUser } from "../service/userService";
import { ACCESS_SECRET, AUTH_URL, GOOGLE_CLIENT_ID, HOME_URL } from "../utils/getEnv";
import getGoogleOAuthURL from "../utils/GetGoogleUrl"

const client = new OAuth2Client(GOOGLE_CLIENT_ID)



export const loginGoogle = async (req: Request ,res: Response) => {
    const uri = getGoogleOAuthURL();
    res.status(200).send({uri : uri});
}

export const getAuth = async (req: Request ,res: Response) => {
    const code = req.query.code as string

    try {
        const {id_token, access_token} = await getGoogleOAuth({code})

        const googleUser = await getGoogleUser({id_token, access_token})

        if(!googleUser.verified_email) {
            res.status(403).send("Google account is not Verified")
        }

        const googleId  = googleUser.id as string
        const googleEmail = googleUser.email as string
        
        const checkUser = await User.findOne({where : {googleId :googleId }})

        if(!checkUser){
            const object  = {
                googleId : googleId,
                googleEmail : googleEmail
            }

            await User.create(object)
        }
  
        res.cookie("Key", id_token)
        res.redirect(AUTH_URL)

    } catch (error) {
        console.log(error)
        res.redirect(HOME_URL)
    }
}

export const tokenVerify = async (req: Request ,res: Response) => {
    try {
        let authorization = req.headers['authorization'] as string

        let temp = authorization.split(' ')[1] as string
    
        let token = temp.split('accessToken=')[1] as string
    
        const ticket = await client.verifyIdToken({
            idToken : token,
            audience : GOOGLE_CLIENT_ID
        })

        const payload = ticket.getPayload() as TokenPayload
        
        if(!payload.email_verified){
            res.clearCookie("accessToken")
            res.status(200).send({message : "googleError"})
        }
    
        const time = new Date().getTime()
   
        if(payload.exp * 1000  <= time){
            res.clearCookie("accessToken")
            res.status(200).send({message : "googleError"})
        }else{
            res.status(200).send({message : "auth End"})
        }
    } catch (error) {
        res.clearCookie("accessToken")
        res.redirect(HOME_URL)
    }
    
}

export const check = async(req: Request ,res: Response) =>{
    let authorization = req.headers['authorization'] as string

    console.log(req.cookies)
    console.log("set")
    // res.clearCookie("Key")
    res.redirect(HOME_URL)
}
