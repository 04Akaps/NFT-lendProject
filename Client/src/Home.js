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

import { connectWallet } from "components/utils/utils2";
import { vereifyToken } from "components/utils/VerifyToken";

function Home() {
  useEffect(() => {
    vereifyToken();
    connectWallet();
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
