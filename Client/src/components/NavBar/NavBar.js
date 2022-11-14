import "./NavBar.scss";

import React from "react";
import { Fragment } from "react";
import { Row, Col, Dropdown } from "react-bootstrap";
import { imgLink } from "components/utils/utils";
import { Link } from "react-router-dom";
import { TextIndentLeft } from "react-bootstrap-icons";

const dropdown = [
  {
    text: "MyPage",
    link: "/MyPage",
  },
  {
    text: "Transcation List",
    link: "/TransactionPage",
  },
  {
    text: "Logout",
  },
];

const navMenu = [
  {
    text: "Home",
    link: "/",
  },
  {
    text: "Mint",
    link: "/Mint",
  },
  {
    text: "Exploration",
    link: "/TravelPage",
  },
  {
    text: "Mining",
    link: "/MiningPage",
  },
  {
    text: "Lend",
    link: "/BorrowPage",
  },
];

function NavBar() {
  return (
    <Fragment>
      <Row className="App" lg={3} sm={1} xs={1}>
        <Col className="nav_media"> </Col>
        <Col className="nav_media">
          <Row
            className="h-100"
            style={{
              margin: "10px",
            }}
          >
            {navMenu.map((result, index) => {
              return (
                <Col
                  key={index}
                  className="flex justify-center align-center"
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: "900",
                    cursor: "pointer",
                  }}
                >
                  <Link
                    to={result.link}
                    style={{
                      textDecoration: "none",
                      color: "purple",
                    }}
                    onMouseOver={(e) => {
                      e.target.style.transform = "scale(1.2)";
                      e.target.style.transition = "0.2s ease-in-out 0s";
                      e.target.style.borderBottom = "1px solid red";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = "scale(1)";
                      e.target.style.transition = "0.2s ease-in-out 0s";
                      e.target.style.borderBottom = "none";
                    }}
                  >
                    {result.text}
                  </Link>
                </Col>
              );
            })}
          </Row>
        </Col>
        <Col className="nav_medie_on_box">
          <div
            className="nav_medie_on"
            style={{
              cursor: "pointer",
            }}
            onClick={() => {
              const slideBar = document.querySelectorAll(".side_bar");
              slideBar[0].style.display = "block";
              slideBar[0].style.animation = "slidebar 1s ease-out";
            }}
          >
            <TextIndentLeft size={30} />
          </div>
          <div
            style={{
              width: "50px",
              margin: "10px",
              marginRight: "20px",
            }}
          >
            <Dropdown>
              <Dropdown.Toggle
                style={{
                  background: "transparent",
                  border: "none",
                  width: "80px",
                }}
                onFocus={(e) => {
                  e.target.style.boxShadow = "none";
                }}
              >
                <img src={imgLink.avatar} alt="avatar" className="w-100" />
              </Dropdown.Toggle>

              <Dropdown.Menu
                style={{
                  background: "purple",
                }}
              >
                {dropdown.map((result, index) => {
                  return (
                    <div
                      key={index}
                      className="flex justify-start"
                      style={{
                        background: "transparent",
                        color: "#fff",
                        cursor: "pointer",
                        padding: "5px",
                        fontWeight: "900",
                      }}
                      onClick={() => {
                        if (result.text == "Logout") {
                          window.localStorage.removeItem("connect");
                          window.location.reload();
                        }
                      }}
                    >
                      <Link
                        to={result.text != "Logout" ? result.link : ""}
                        style={{
                          textDecoration: "none",
                          color: "#fff",
                          background: "transparent",
                        }}
                      >
                        {result.text}
                      </Link>
                    </div>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Col>
      </Row>
    </Fragment>
  );
}

export default NavBar;
