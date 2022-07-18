import "./SideBar.scss";

import React, { useState } from "react";
import { Button } from "react-bootstrap";
import MenuBar from "components/utils/MenuBar";
import { imgLink } from "components/utils/utils";

function NavBar() {
  const [show, setShow] = useState(false);

  return (
    <>
      <div className="NavBar_Container">
        <div className="NavBar_App">
          <img
            src={imgLink.slumpOne}
            alt="goHome"
            style={{
              width: "100px",
              cursor: "pointer",
            }}
            onClick={() => window.location.replace("/Home/MainPage")}
          />

          <Button
            variant="secondary"
            className="SideBar_Toggle"
            onClick={() => {
              setShow(!show);
            }}
          >
            {show ? <MenuBar show={show} setShow={setShow} /> : "Menu"}
          </Button>
        </div>
      </div>
    </>
  );
}

export default NavBar;
