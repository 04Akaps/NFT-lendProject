import { imgLink } from "components/utils/utils";
import React from "react";
import { Col, Row, Card, ListGroup } from "react-bootstrap";
import "./BorrowPage.scss";

const dummyData = [
  {
    tokenId: 1,
    img: imgLink.slumpOne,
    price: 1,
  },
  {
    tokenId: 1,
    img: imgLink.slumpTwo,
    price: 1,
  },
  {
    tokenId: 1,
    img: imgLink.slumpThree,
    price: 1,
  },
  {
    tokenId: 1,
    img: imgLink.slumpFour,
    price: 1,
  },
  {
    tokenId: 1,
    img: imgLink.slumpFive,
    price: 1,
  },
  {
    tokenId: 1,
    img: imgLink.slumpSix,
    price: 1,
  },
  {
    tokenId: 1,
    img: imgLink.slumpSeven,
    price: 1,
  },
];

function BorrowPage() {
  return (
    <>
      <div className="Borrow_Page">
        <div className="Borrow_Container">
          <Row xs={2} sm={2} lg={4}>
            {dummyData.map((result) => {
              return (
                <Col>
                  <Card style={{ width: "18rem" }}>
                    <Card.Img variant="top" src={result.img} />
                    <ListGroup className="list-group-flush">
                      <ListGroup.Item>
                        TokenId : {result.tokenId}
                      </ListGroup.Item>
                      <ListGroup.Item>Level : {result.level}</ListGroup.Item>
                      <ListGroup.Item>Price : {result.price}</ListGroup.Item>
                    </ListGroup>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
    </>
  );
}

export default BorrowPage;
