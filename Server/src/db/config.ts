import  { Sequelize } from "sequelize-typescript"
import { User } from "../models/User"

const connectionUser = new Sequelize({
    dialect : "mysql",
    host :"localhost",
    username : "root",
    password : "root",
    database : "UserDataBase",
    logging : false,
    models : [User]
});

export default connectionUser