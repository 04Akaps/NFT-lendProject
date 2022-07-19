import "./NavBar.scss";

import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import MenuBar from "components/utils/MenuBar";
import { imgLink } from "components/utils/utils";
import { useEffect } from "react";
import { getBalanceToken } from "components/utils/utils2";

function NavBar() {
  const [show, setShow] = useState(false);
  const [myTokenAmount, setMyTokenAmount] = useState(0);

  useEffect(() => {
    const init = async () => {
      const data = await getBalanceToken();
    };

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
