import { Request, Response } from "express";
import getGoogleOAuthURL from "../utils/GetGoogleUrl"

export const loginGoogle =async (req: Request ,res: Response) => {
    const uri = getGoogleOAuthURL();

    res.status(200).send({uri : uri});
}

export const getAuth =async (req: Request ,res: Response) => {
    console.log("sdfsdfsf")
}

