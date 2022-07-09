import React from "react";
import "./Home.scss";

import { Route } from "react-router-dom";
import {
  SideBar,
  MainPage,
  MyPage,
  MiningPage,
  TravelPage,
  BorrowPage,
} from "./components/main";
function Home() {
  return (
    <>
      <SideBar />

      <Route path="/Auth/MainPage/:id">
        <MainPage />
      </Route>
      <Route path="/MyPage/id">
        <MyPage />
      </Route>
      <Route path="/MiningPage">
        <MiningPage />
      </Route>
      <Route path="/TravelPage">
        <TravelPage />
      </Route>
      <Route path="/BorrowPage">
        <BorrowPage />
      </Route>
    </>
  );
}

export default Home;
