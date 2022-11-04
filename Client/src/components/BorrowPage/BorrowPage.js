import { imgLink } from "components/utils/utils";
import React from "react";
import { Fragment } from "react";
import { Col, Row, Card, ListGroup, Tab, Nav } from "react-bootstrap";
import BorrowFrom from "./BorrowFrom";
import "./BorrowPage.scss";
import BorrowTo from "./BorrowTo";

const dummyData = [
  {
    components: <BorrowFrom />,
    filter: "빌린 NFT List",
  },
  {
    components: <BorrowTo />,
    filter: "빌려준 NFT List",
  },
];

const tabData = [
  {
    title: "빌려준 NFT List",
  },
  {
    title: "빌린 NFT List",
  },
];

function BorrowPage() {
  return (
    <Fragment>
      <Tab.Container defaultActiveKey={tabData[0].title.toLowerCase()}>
        <Nav className="flex justify-around">
          {tabData.map((data, i) => {
            return (
              <Nav.Item
                as="li"
                key={i}
                style={{
                  padding: "20px",
                  background: "#fff",
                  borderRadius: "12px",
                  boxShadow: "1px 1px 1px 1px",
                }}
              >
                <Nav.Link
                  eventKey={data.title.toLowerCase()}
                  style={{
                    background: "transparent",
                    color: "purple",
                    fontWeight: "800",
                    fontSize: "1.1rem",
                  }}
                >
                  {data.title}
                </Nav.Link>
              </Nav.Item>
            );
          })}
        </Nav>
        <Card
          style={{
            width: "90%",
            marginTop: "20px",
            marginRight: "auto",
            marginLeft: "auto",
            background: "#fff",
            borderRadius: "12px",
            boxShadow: "1px 1px 1px 1px black",
          }}
        >
          <Card.Body
            style={{
              borderRadius: "12px",
            }}
          >
            <Tab.Content>
              {dummyData.map((data, i) => {
                return (
                  <Tab.Pane eventKey={data.filter.toLowerCase()} key={i}>
                    {data.components}
                  </Tab.Pane>
                );
              })}
            </Tab.Content>
          </Card.Body>
        </Card>
      </Tab.Container>
    </Fragment>
  );
}

export default BorrowPage;
