import React from "react";
import "./Home.scss";

import { Route } from "react-router-dom";
import {
  NavBar,
  MainPage,
  MyPage,
  MiningPage,
  TravelPage,
  BorrowPage,
  TransactionPage,
} from "components/main";
import { useEffect } from "react";
import axios from "axios";
import { connectWallet } from "components/utils/utils2";

function Home() {
  useEffect(() => {
    const vereifyToken = async () => {
      await axios
        .post("http://localhost:8080/OAuth/checkToken", {
          token: window.localStorage.auth,
        })
        .then((result) => {
          if (result.data.message === "fail") {
            window.localStorage.removeItem("auth");
          }
        });
    };

    const walletCheck = () => {
      connectWallet();
    };
    vereifyToken();
    walletCheck();
  }, []);
  return (
    <>
      <NavBar />

      <Route path="/Home/MainPage">
        <MainPage />
      </Route>
      <Route path="/Home/MyPage">
        <MyPage />
      </Route>
      <Route path="/Home/MiningPage">
        <MiningPage />
      </Route>
      <Route path="/Home/TravelPage">
        <TravelPage />
      </Route>
      <Route path="/Home/BorrowPage">
        <BorrowPage />
      </Route>
      <Route path="/Home/TransactionPage">
        <TransactionPage />
      </Route>
    </>
  );
}

export default Home;
