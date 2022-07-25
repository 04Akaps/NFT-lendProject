import CardComponents from "components/utils/CardComponents";
import { imgLink } from "components/utils/utils";

import React from "react";
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
    <div>
      <div className="Mining_Total">
        <div className="Mining_Total_Container">
          <Row xs={1} lg={2} className="Mining_Totel_Row">
            <Col className="Mining_Total_Col1">
              <Row>
                <Col>
                  totalSupplyed
                  <Button variant="light">0</Button>
                </Col>
                <Col>
                  totalStaked <Button variant="light">0</Button>
                </Col>
              </Row>
            </Col>

            <Col className="Mining_Total_Col2">
              <Row>
                <Col>
                  totalMiningPower
                  <Button variant="light">0</Button>
                </Col>
                <Col>
                  myTotalPower <Button variant="light">0</Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>

        <div className="Mining_CardList">
          <Row xs={2} lg={4}>
            {cardDummy.map((result, index) => {
              return (
                <div key={index}>
                  <Col>
                    <CardComponents result={result} />
                  </Col>
                </div>
              );
            })}
          </Row>
        </div>
      </div>
    </div>
  );
}

export default MiningPage;
