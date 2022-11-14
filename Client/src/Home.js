import React from "react";

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
  Mint,
} from "components/main";
import { useState } from "react";
import { useEffect } from "react";

const routers = [
  {
    path: "/",
    component: MainPage,
    title: "MainPage",
  },
  {
    path: "/MyPage",
    component: MyPage,
    title: "MyPage",
  },
  {
    path: "/MiningPage",
    component: MiningPage,
    title: "MiningPage",
  },
  {
    path: "/TravelPage",
    component: TravelPage,
    title: "TravelPage",
  },
  {
    path: "/BorrowPage",
    component: BorrowPage,
    title: "BorrowPage",
  },
  {
    path: "/TransactionPage",
    component: TransactionPage,
    title: "TransactionPage",
  },

  {
    path: "/Mint",
    component: Mint,
    title: "Mint",
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
        const titleName = routers[i].title;

        const htmlTitle = document.querySelector("title");
        htmlTitle.innerHTML = titleName;

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

  return (
    <di>
      {checkUrl && <NavBar />}

      <div className={`${checkUrl ? "show-url" : "hide-url"}`}>
        {routers.map((data, i) => {
          return (
            <Route exact path={data.path} key={i} component={data.component} />
          );
        })}
      </div>
      {!checkUrl && <Error />}
    </di>
  );
}

export default Home;
