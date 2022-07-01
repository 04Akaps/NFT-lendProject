import express from 'express'
import bodyParser from 'body-parser';
import cors from "cors"

import dotenv from "dotenv"
dotenv.config();

// const storeData = async (data) => await Transactions.create(data);

// const user = await User.create({
//     username: 'alice123',
//     isAdmin: true
//   }, { fields: ['username'] });
//   // let's assume the default of isAdmin is false
//   console.log(user.username); // 'alice123'
//   console.log(user.isAdmin); // 


const PORT = process.env.PORT || 8080
const app = express();

app.use(express.static("public"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors())


app.listen(PORT, () => {
    console.log("서버 시작 : ", PORT)
})

