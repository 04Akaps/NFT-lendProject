import CardComponents from "components/utils/CardComponents";
import { imgLink } from "components/utils/utils";

import React from "react";
import { Fragment } from "react";
import { Col, Row, Button } from "react-bootstrap";
import "./MiningPage.scss";

const cardDummy = [
  {
    img: imgLink.slumpOne,
    tokenId: 1,
    power: 1,
    level: 1,
  },
  {
    img: imgLink.slumpTwo,
    tokenId: 1,
    power: 1,
    level: 1,
  },
  {
    img: imgLink.slumpThree,
    tokenId: 1,
    power: 1,
    level: 1,
  },
  {
    img: imgLink.slumpFour,
    tokenId: 1,
    power: 1,
    level: 1,
  },
  {
    img: imgLink.slumpFive,
    tokenId: 1,
    power: 1,
    level: 1,
  },
  {
    img: imgLink.slumpSix,
    tokenId: 1,
    power: 1,
    level: 1,
  },
  {
    img: imgLink.slumpSeven,
    tokenId: 1,
    power: 1,
    level: 1,
  },
];

function MiningPage() {
  return (
    <Fragment>
      <div
        style={{
          width: "90%",
          marginRight: "auto",
          marginLeft: "auto",
        }}
      >
        <Row
          xs={1}
          sm={1}
          lg={1}
          style={{
            backgroundColor: "#c8732f",
            margin: "30px",
            padding: "20px",
          }}
        >
          <Col>마이닝 중이라면 갈색</Col>
          <Col>아니라면 보라색으로 보입니다.</Col>
          <Col>클릭하면 상세 정보를 볼 수 있습니다.</Col>
        </Row>
      </div>

      <Row
        xs={1}
        sm={3}
        lg={6}
        style={{
          marginTop: "20px",
        }}
      >
        {cardDummy.map((result, i) => {
          return (
            <Col key={i} className="flex justify-center">
              <div
                style={{
                  background: "#c695fa",
                  margin: "5px",
                  padding: "10px",
                  borderRadius: "12px",
                }}
              >
                <span>Grade</span>

                <div
                  className="flex justify-center align-center"
                  style={{
                    background: "#fff",
                    border: "1px solid #0f4651",
                    borderRadius: "12px",
                    width: "200px",
                    height: "200px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={result.img}
                    style={{
                      width: "90%",
                      height: "90%",
                      borderRadius: "12px",
                      cursor: "pointer",
                    }}
                    onMouseOver={(e) => {
                      e.target.style.transform = "scale(1.3)";
                      e.target.style.transition = "all 0.5s";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = "scale(1)";
                      e.target.style.transition = "all 0.5s";
                    }}
                  />
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </Fragment>
  );
}

export default MiningPage;
