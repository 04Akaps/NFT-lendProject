import dotenv from "dotenv";
dotenv.config();

export const clienId = process.env.REACT_APP_API_CLIENT;

export const imgLink = {
  zolImg: "/img/LoginPage.png",
  slumpOne: "/img/닥터슬럼프1.jpeg",
  slumpTwo: "/img/닥터슬럼프2.jpeg",
  slumpThree: "/img/닥터슬럼프3.jpeg",
  slumpFour: "/img/닥터슬럼프4.JPG",
  slumpFive: "/img/닥터슬럼프5.jpeg",
  slumpSix: "/img/닥터슬럼프6.jpeg",
  slumpSeven: "/img/닥터슬럼프7.jpeg",
};

export const MenuList = [
  {
    title: "MainPage",
    img: imgLink.slumpOne,
    link: "/Home/MainPage",
  },
  {
    title: "MiningPage",
    img: imgLink.slumpFour,
    link: "/Home/MiningPage",
  },
  {
    title: "TravelPage",
    img: imgLink.slumpFive,
    link: "/Home/TravelPage",
  },
  {
    title: "BorrowPage",
    img: imgLink.slumpThree,
    link: "/Home/BorrowPage",
  },
  {
    title: "MyPage",
    img: imgLink.slumpTwo,
    link: "/Home/MyPage",
  },
  {
    title: "TransactionPage",
    img: imgLink.slumpSix,
    link: "/Home/TransactionPage",
  },
];
