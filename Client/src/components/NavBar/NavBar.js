import "./NavBar.scss";

import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import MenuBar from "components/utils/MenuBar";
import { imgLink } from "components/utils/utils";
import { useEffect } from "react";
import {
  borrowContractInstance,
  checkNetworkVersion,
} from "components/Contract/Contract";

function NavBar() {
  const [show, setShow] = useState(false);
  const [myTokenAmount, setMyTokenAmount] = useState(0);
  const [walletConnect, setWalletConnect] = useState("NotConnected");

  const init = async () => {
    if (window.ethereum === undefined) {
      window.localStorage.removeItem("auth");
    } else {
      await window.ethereum.enable().then(async () => {
        if (checkNetworkVersion()) {
          setWalletConnect("Connected");
          const data = document.querySelectorAll(".on")[0];
          data.style.backgroundColor = "green";
        } else {
          alert("BSC Test Net을 활용하세요");
        }
      });
    }
  };

  window.ethereum.on("chainChanged", (result) => {
    if (result !== "0x61") {
      alert("BSC 이용 하세요");
    }
  });

  useEffect(() => {
    init();
  }, []);
  return (
    <>
      <div className="NavBar_Container">
        <div className="NavBar_App">
          <Row
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={imgLink.slumpOne}
              alt="goHome"
              style={{
                width: "100px",
                cursor: "pointer",
              }}
              onClick={() => window.location.replace("/Home/MainPage")}
            />
            <Col
              className="button"
              style={{
                minWidth: "100px",
              }}
            >
              {myTokenAmount}
            </Col>
          </Row>

          <div className="NavBar_Right">
            <div className="on" title={walletConnect}></div>

            <Button
              className="button"
              variant="secondary"
              onClick={async () => {
                await window.ethereum.enable();
              }}
            >
              ConnectWallet
            </Button>

            <Button
              className="button"
              variant="secondary"
              onClick={() => {
                window.localStorage.removeItem("auth");
                window.location.reload("/");
              }}
            >
              LogOut
            </Button>
            <Button
              variant="secondary"
              className="SideBar_Toggle button"
              onClick={() => {
                setShow(!show);
              }}
            >
              {show ? <MenuBar show={show} setShow={setShow} /> : "Menu"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
