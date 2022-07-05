import { Request, Response } from "express";
import { getGoogleOAuth } from "../service/userService";
import { HOME_URL } from "../utils/getEnv";
import getGoogleOAuthURL from "../utils/GetGoogleUrl"

export const loginGoogle =async (req: Request ,res: Response) => {
    const uri = getGoogleOAuthURL();
    res.status(200).send({uri : uri});
}

export const getAuth =async (req: Request ,res: Response) => {
    // get code from url
    const code = req.query.code as string
    
    try {
         // get the id and Token using code
        const {id_token, access_token} = await getGoogleOAuth({code})
        
    } catch (error) {
        res.redirect(HOME_URL)
    }

}

