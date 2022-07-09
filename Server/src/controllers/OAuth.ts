import { Request, Response } from "express";

import { getGoogleOAuth, getGoogleUser } from "../service/userService";
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
        
        // get user from token
        const googleUser = await getGoogleUser({id_token, access_token})
        // jwt.decode(id_token);
        console.log({googleUser})

        if(!googleUser.verified_email) {
            res.status(403).send("Google account is not Verified")
        }

        const googleId  = googleUser.id as string

        console.log(googleId)

        // interface UserAttributes{
        //     id: string,
        //     google_id :string,
        //     email : string,
        //     wallet_Address : string,
        // }

        // const checkUser = await UserInstance.findOne({where : {google_id : googleId}})
        // console.log(checkUser)

        // if(!checkUser){
        //    // 해당 googleUser는 없다는 소리
        //    // 데이터와 wallet를 만들어 주어야 한다.
        // }

        // update User
        // user정보가 DB에 없다면 새로 만들어 준다.
        

        res.status(200).send()
        // DB에 저장하고 다른 경로로 이동 시켜 주어야 한다.

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

