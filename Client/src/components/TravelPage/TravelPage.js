import { imgLink } from "components/utils/utils";
import CardComponents from "components/utils/CardComponents";
import { Col, Row, Button, ListGroup, Tab } from "react-bootstrap";
import React from "react";

// import dugeonImage from "/img/dugeon.webp";

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
  return (
    <>
      <div
        className="Travelpage_container"
        style={{
          backgroundImage: `url(/img/dugeon.webp)`,
        }}
      >
        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
          <Row>
            <Col sm={4}>
              <ListGroup horizontal>
                <ListGroup.Item action href="#link1">
                  Traveling NFT
                </ListGroup.Item>
                <ListGroup.Item action href="#link2">
                  Do Travel
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col sm={8}>
              <Tab.Content>
                <Tab.Pane eventKey="#link1">
                  <div className="Travelpage_app">
                    {travelData.map((result, index) => {
                      return (
                        <>
                          <div className="TravelPage_map" key={index}>
                            <img
                              src={result.img}
                              style={{
                                width: "100%",
                                height: "100px",
                                objectFit: "contain",
                              }}
                            />
                            <p>tokenId : {result.tokenId}</p>
                            <p>remain Time : {result.remainTime}</p>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="#link2">
                  <div className="Travelpage_app">
                    {travelData.map((result, index) => {
                      return (
                        <>
                          <div className="TravelPage_map" key={index}>
                            <img
                              src={result.img}
                              style={{
                                width: "100%",
                                height: "100px",
                                objectFit: "contain",
                              }}
                            />
                            <p>tokenId : {result.tokenId}</p>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </>
  );
}

export default TravelPage;
