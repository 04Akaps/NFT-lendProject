import { getNFTBalanceOf } from "components/Contract/ContractCall/BalanceCall";
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
  const [notStakedNFTBalance, setNotStakedNFTBalance] = useState(0);

  useEffect(() => {
    getNFTAmount();
  }, []);

  const getNFTAmount = async () => {
    await getNFTBalanceOf();
  };

  return (
    <div className="MyPageTotal">
      <div className="MyPageContainer">
        <div className="MyPageTitleContainer">
          <div className="MyPageTitle">
            <img
              src={imgLink.slumpFive}
              style={{
                width: "100%",
                maxHeight: "200px",
                opacity: "0.8",
              }}
            />
            <div
              className="MyPageTitle_Circle"
              style={{
                backgroundImage: `url(${imgLink.slumpSeven})`,
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
          </div>

          <Row xs={2} lg={4}>
            {dummy.map((result, index) => {
              return (
                <Col className="TagList">
                  <div
                    style={{
                      backgroundColor: "#323C73",
                      width: "100%",
                      borderRadius: "10px 10px 0px 0px",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                      color: "#fff",
                    }}
                  >
                    {result.tagName}
                  </div>
                </Col>
              );
            })}
          </Row>
          <div className="MyPageNFTListContainer">
            <Row xs={2} md={3} lg={4}>
              {cardDummy.map((result, index) => {
                return (
                  <Col
                    className="TagList"
                    style={{
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <div className="MyPageListDiv">
                      <img
                        id="listImg"
                        src={result.img}
                        style={{
                          width: "200px",
                          height: "100px",
                          cursor: "pointer",
                        }}
                        onMouseOver={(event) => {
                          event.target.style.opacity = 0;
                        }}
                        onMouseLeave={(event) => {
                          event.target.style.opacity = 1;
                        }}
                      />
                      <div
                        className="MyPageImgData"
                        onMouseOver={() => {
                          const data = document.querySelectorAll("#listImg");
                          data[index].style.opacity = 0;
                        }}
                        onMouseLeave={() => {
                          const data = document.querySelectorAll("#listImg");
                          data[index].style.opacity = 1;
                        }}
                      >
                        <div>
                          <span className="span">tokenId</span> : 1
                        </div>
                        <div>
                          <span className="span">level</span> : 1
                        </div>
                        <div>
                          <span className="span">grade</span> : hojin
                        </div>
                        <div>
                          <span className="span">reward</span> : 100
                        </div>
                      </div>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
