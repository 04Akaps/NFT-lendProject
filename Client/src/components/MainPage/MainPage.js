import { imgLink } from "components/utils/utils";
import React from "react";
import { Row, Col, Button, Card } from "react-bootstrap";
import "./MainPage.scss";

const contentMap = [
  {
    image: imgLink.game,
    text: "게임을 즐기고 다른 사람들과 경쟁하세요!!",
    title: "Play Earn",
  },

  {
    image: imgLink.play,
    text: "Staking을 하여 코인을 투적하세요!",
    title: "NFT Mining",
  },

  {
    image: imgLink.lend,
    text: "서로 NFT를 빌려줘서 보상 및 탐험을 즐기세요!",
    title: "Lend NFT To Others",
  },

  {
    image: imgLink.exploration,
    text: "모험에 참여하여 또다른 NFT를 가져가세요!",
    title: "Exploration Using NFT",
  },
];

function MainPage() {
  const observer = new IntersectionObserver((e) => {
    console.log("sd");
  });

  return (
    <div>
      <Row lg={1} sm={1} xs={1}>
        <Col
          className="flex justify-center column align-center"
          style={{
            color: "purple",
            fontSize: "2rem",
            fontWeight: "1000",
            marginTop: "25%",
          }}
        >
          <Button
            style={{
              fontWeight: "1000",
              color: "#fff",
              background: "purple",
              border: "none",
              width: "200px",
            }}
          >
            MyPage
          </Button>
          Welcome To My WebSite
        </Col>

        <Col className="flex justify-center column align-center">
          <div
            style={{
              background: "transparent",
              color: "purple",
              maxWidth: "50%",
              whiteSpace: "normal",
              wordBreak: "break-all",
              textAlign: "center",
            }}
          >
            이곳은 MainPage 입니다. 대략적인 사이트에 대한 설명이 들어가
            있습니다. 감사합니다.
          </div>
        </Col>

        <div
          style={{
            marginTop: "1000px",
            marginBottom: "300px",
          }}
        >
          <div
            className="flex justify-center"
            style={{
              padding: "20px",
              fontWeight: "1000",
              fontSize: "3rem",
              color: "purple",
            }}
          >
            Our Content
          </div>

          <Row className="flex justify-around w-100" lg={4} sm={2} xs={1}>
            {contentMap.map((result, index) => {
              return (
                <Col className="flex justify-center">
                  <Card
                    style={{
                      margin: "20px",
                      padding: "20px",
                      borderRadius: "12px",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      src={result.image}
                      style={{
                        borderRadius: "12px",
                        width: "100%",
                        height: "90%",
                        objectFit: "cover",
                      }}
                      onMouseOver={(e) => {
                        e.target.style.opacity = 0;

                        const data = document.querySelectorAll(`#test${index}`);

                        data[0].style.opacity = 1;
                      }}
                      onMouseOut={(e) => {
                        e.target.style.opacity = 1;

                        const data = document.querySelectorAll(`#test${index}`);

                        data[0].style.opacity = 0;
                      }}
                    />
                    <div
                      id={`test${index}`}
                      style={{
                        position: "absolute",
                        opacity: "0",
                        top: "20%",
                        width: "90%",
                        marginRight: "auto",
                        marginLeft: "auto",
                        background: "transparent",
                      }}
                    >
                      {result.text}
                    </div>
                    <div
                      className="flex justify-center"
                      style={{
                        background: "transparent",
                        fontSize: "1rem",
                        color: "black",
                        fontWeight: "800",
                        marginTop: "15px",
                      }}
                    >
                      {result.title}
                    </div>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </div>
      </Row>
    </div>
  );
}

export default MainPage;
