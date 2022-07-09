import { Request, Response } from "express";
import { User } from "../models/User";

import { getGoogleOAuth, getGoogleUser } from "../service/userService";
import { ACCESS_SECRET, AUTH_URL, HOME_URL } from "../utils/getEnv";
import getGoogleOAuthURL from "../utils/GetGoogleUrl"

import {sign} from "jsonwebtoken"


export const loginGoogle =async (req: Request ,res: Response) => {

    const uri = getGoogleOAuthURL();

    res.status(200).send({uri : uri});

}

export const getAuth =async (req: Request ,res: Response) => {
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

        const accessToken = sign({googleEmail, googleId}, ACCESS_SECRET, {expiresIn : "20m"} )

        res.cookie("accessToken", accessToken)
        res.redirect(AUTH_URL)

    } catch (error) {
        console.log(error)
        res.redirect(HOME_URL)

    }

}


