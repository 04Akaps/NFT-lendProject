import React from "react";
import Card from "react-bootstrap/Card";

function CardComponents(props) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src={props.result.img}
        style={{
          objectFit: "contain",
          width: "100%",
          height: "200px",
        }}
      />
      <Card.Body>
        <Card.Title>TokenId : {props.result.tokenId}</Card.Title>
        <Card.Text>
          <p>Level : {props.result.level}</p>
          <p>Level : {props.result.power}</p>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default CardComponents;
