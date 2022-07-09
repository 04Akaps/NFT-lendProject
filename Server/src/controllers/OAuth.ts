import { Request, Response } from "express";
import { User } from "../models/User";

import { getGoogleOAuth, getGoogleUser } from "../service/userService";
import { AUTH_URL, HOME_URL } from "../utils/getEnv";
import getGoogleOAuthURL from "../utils/GetGoogleUrl"
import bcryptjs from 'bcryptjs';

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
        
        const checkUser = await User.findOne({where : {googleId :googleId }})

        const object  = {
            googleId : googleId,
            googleEmail : "strig"
        }

        if(!checkUser){
            await User.create(object)
        }

        


        res.cookie("test", "test")
        res.redirect(AUTH_URL)

    } catch (error) {

        res.redirect(HOME_URL)

    }

}




// import {  Model } from "sequelize";

// interface UserInterface{
//     id: Number,
//     google_id :string,
//     email : string,
//     wallet_Address : string,
// }

// module.exports = (sequelize: any, DataTypes :any) =>{
//     class UserInstance extends Model<UserInterface>

//     implements UserInterface {
//         id!: Number;
//         google_id!: string;
//         email!: string;
//         wallet_Address!: string;
//         static associate(models: any) {}
//     };

//     UserInstance.init(
//     {
//         id: {
//             type : DataTypes.INTEGER,
//             primaryKey : true,
//             allowNull: false,
//             autoIncrement : true
//         },
//         google_id : {
//             type : DataTypes.STRING,
//             allowNull : false,
//         },
//         email :{
//             type :DataTypes.STRING,
//             allowNull : false
//         },
//         wallet_Address :{
//             type : DataTypes.STRING,
//             allowNull : false,
//             defaultValue : "0x0"
//         }
//     },
//     {
//         sequelize,
//         tableName: 'UserInstance',
//         modelName : "UserInstance"
//     })

// return UserInstance;
// }

