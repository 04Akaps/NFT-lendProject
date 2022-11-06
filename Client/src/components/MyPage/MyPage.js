import { imgLink } from "components/utils/utils";
import React, { useState, useEffect } from "react";

import { Col, Row } from "react-bootstrap";
import "./MyPage.scss";

const dummy = [
  {
    tagName: "MyNFT",
  },
  {
    tagName: "Mining",
  },
  {
    tagName: "Traveling",
  },
  {
    tagName: "Borrow",
  },
];

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

function MyPage() {
  return <div>test</div>;
}

export default MyPage;
