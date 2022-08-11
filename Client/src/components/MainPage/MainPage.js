import { mintNFT } from "components/Contract/ContractCall/MintCall";
import { Feature, imgLink } from "components/utils/utils";
import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import "./MainPage.scss";

function MainPage() {
  return (
    <div className="MainPage_App">
      <Row className="MainPage_Container">
        <Col className="MapinPage_left" md={{ span: 4, offset: 1 }}>
          <h1>My Personal Project</h1>
          <p>Look's Not Good... But I Tryed My Best</p>
          <Button
            variant="outline-warning"
            onClick={() => {
              mintNFT();
            }}
          >
            Mint NFT
          </Button>
        </Col>

        <Col md={{ span: 4, offset: 1 }}>
          <img
            src={imgLink.slumpSeven}
            alt={imgLink.slumpSeven}
            className="MinPage_Right"
          />
        </Col>
      </Row>

      <div className="MainPage_Second_Container">
        <h1>The Goal Of The Project</h1>
        <span>It's a project that writed personally or in teams.</span>
        <p>
          Although css is immature, But I Tried My Best to Connet BlockChain
          naturally
        </p>
      </div>

      <div className="MainPage_Three_Container">
        <h1
          style={{
            padding: "0px 0px 50px 0px",
          }}
        >
          Feature
        </h1>
        <Row xs={2} lg={3} className="Feature_Row">
          {Feature.map((result, index) => {
            return (
              <Col className="Feature_Col" key={index}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={result.img}
                    style={{
                      objectFit: "contain",
                      width: "100%",
                    }}
                  />
                  <span
                    style={{
                      padding: "5px",
                      fontWeight: "800",
                    }}
                  >
                    {result.title}
                  </span>
                  <p>{result.span}</p>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>

      <div className="MainPage_Footer">Copyright © 2021 Personal project</div>
    </div>
  );
}

export default MainPage;
