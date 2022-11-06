import { imgLink } from "components/utils/utils";

import React from "react";
import { useState } from "react";
import { Fragment } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";

import "./TravelPage.scss";

const travelData = [
  {
    img: imgLink.slumpOne,
    tokenId: 1,
    remainTime: 100,
  },
  {
    img: imgLink.slumpTwo,
    tokenId: 1,
    remainTime: 100,
  },
  {
    img: imgLink.slumpThree,
    tokenId: 1,
    remainTime: 100,
  },
  {
    img: imgLink.slumpFour,
    tokenId: 1,
    remainTime: 100,
  },
  {
    img: imgLink.slumpFive,
    tokenId: 1,
    remainTime: 100,
  },
  {
    img: imgLink.slumpSix,
    tokenId: 1,
    remainTime: 100,
  },
  {
    img: imgLink.slumpSeven,
    tokenId: 1,
    remainTime: 100,
  },
];

function TravelPage() {
  const [checkButton, setCheckButton] = useState(false);

  return (
    <Fragment>
      <Card
        className="flex column align-center"
        style={{
          border: "none",
          margin: "40px 20px",
          minHeight: "500px",
          background: "transparent",
        }}
      >
        <Button
          style={{
            textAlign: "center",
            width: "max-content",
          }}
          onClick={() => {
            setCheckButton(!checkButton);
          }}
        >
          {checkButton ? "여행 가능한 NFT 보기" : "여행 진행중 인 NFT 보기"}
        </Button>
        <Card.Body className="flex justify-center">
          <img
            src={imgLink.questionMark}
            style={{
              width: "300px",
              height: "300px",
              borderRadius: "12px",
            }}
          />
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <Row xs={2} sm={3} lg={5}>
            {travelData.map((result, i) => {
              return (
                <Col key={i} className="flex justify-center">
                  <div
                    style={{
                      padding: "10px",
                      margin: "10px",
                    }}
                  >
                    <img
                      src={result.img}
                      style={{
                        width: "200px",
                        height: "200px",
                        borderRadius: "16px",
                      }}
                    />
                  </div>
                </Col>
              );
            })}
          </Row>
        </Card.Body>
      </Card>
    </Fragment>
  );
}

export default TravelPage;
