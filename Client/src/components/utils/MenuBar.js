import React from "react";
import Offcanvas from "react-bootstrap/Offcanvas";

import "./utils.scss";

import { MenuList } from "./utils";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

function MenuBar(props) {
  const [query, setQuery] = useState("");
  const handleClose = () => props.setShow(false);
  const value = useLocation();

  useEffect(() => {
    const checkLocation = () => {
      const temp = value.pathname.split("/Home/");
      setQuery(temp[temp.length - 1]);
    };

    checkLocation();
  }, []);

  return (
    <>
      <Offcanvas
        show={props.show}
        onHide={handleClose}
        style={{
          width: "300px",
        }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="Menu_Body_Total">
          <div className="Menu_Body">
            {MenuList.map((result, index) => {
              return (
                <Link className="a" to={result.link} key={index}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      minHeight: "50px",
                      cursor: "pointer",
                    }}
                    className="Menu_Body_content"
                  >
                    <img
                      src={result.img}
                      style={{
                        width: "50px",
                        objectFit: "contain",
                        height: "100%",
                      }}
                    />
                    <div
                      style={{
                        margin: "0px 0px 0px 10px",
                      }}
                    >
                      {result.title}
                    </div>
                    <span
                      className={`Menu_Body_content_checkQuery ${
                        query !== result.title ? "none" : ""
                      }`}
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default MenuBar;
