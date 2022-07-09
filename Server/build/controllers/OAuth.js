"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuth = exports.loginGoogle = void 0;
const userService_1 = require("../service/userService");
const getEnv_1 = require("../utils/getEnv");
const GetGoogleUrl_1 = __importDefault(require("../utils/GetGoogleUrl"));
const loginGoogle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uri = (0, GetGoogleUrl_1.default)();
    res.status(200).send({ uri: uri });
});
exports.loginGoogle = loginGoogle;
const getAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get code from url
    const code = req.query.code;
    try {
        // get the id and Token using code
        const { id_token, access_token } = yield (0, userService_1.getGoogleOAuth)({ code });
        // get user from token
        const googleUser = yield (0, userService_1.getGoogleUser)({ id_token, access_token });
        // jwt.decode(id_token);
        console.log({ googleUser });
        if (!googleUser.verified_email) {
            res.status(403).send("Google account is not Verified");
        }
        const googleId = googleUser.id;
        console.log(googleId);
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
        res.status(200).send();
        // DB에 저장하고 다른 경로로 이동 시켜 주어야 한다.
    }
    catch (error) {
        res.redirect(getEnv_1.HOME_URL);
    }
});
exports.getAuth = getAuth;
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
