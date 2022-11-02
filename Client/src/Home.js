import React from "react";
import "./Home.scss";

import { Route, useLocation } from "react-router-dom";
import {
  NavBar,
  MainPage,
  MyPage,
  MiningPage,
  TravelPage,
  BorrowPage,
  TransactionPage,
  Error,
} from "components/main";
import { useState } from "react";
import { useEffect } from "react";

const routers = [
  {
    path: "/",
    component: MainPage,
  },
  {
    path: "/MyPage",
    component: MyPage,
  },
  {
    path: "/MiningPage",
    component: MiningPage,
  },
  {
    path: "/TravelPage",
    component: TravelPage,
  },
  {
    path: "/BorrowPage",
    component: BorrowPage,
  },
  {
    path: "/TransactionPage",
    component: TransactionPage,
  },
];

function Home() {
  const urlPath = useLocation();

  const [checkUrl, setCheckUrl] = useState(false);

  useEffect(() => {
    let pathName = urlPath.pathname;

    for (let i = 0; i < routers.length; i++) {
      const url = routers[i].path;
      if (url == pathName) {
        setCheckUrl(true);
        break;
      }
    }
  }, []);

  window.ethereum.on("accountsChanged", async function (account) {
    window.location.reload();
  });

  window.ethereum.on("networkChanged", async function (network) {
    window.localStorage.removeItem("connect");
    window.location.replace("/");
  });
  console.log(checkUrl);
  return (
    <>
      {checkUrl && <NavBar />}

      <div className={`${checkUrl ? "show-url" : "hide-url"}`}>
        {routers.map((data, i) => {
          return (
            <Route exact path={data.path} key={i} component={data.component} />
          );
        })}
      </div>

      {!checkUrl && <Error />}
    </>
  );
}

export default Home;
