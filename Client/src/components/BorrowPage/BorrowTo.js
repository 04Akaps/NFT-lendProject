import { imgLink } from "components/utils/utils";
import { Row, Col } from "react-bootstrap";

const dummy = [
  {
    tokenId: 1,
    image: imgLink.slumpOne,
  },

  {
    tokenId: 1,
    image: imgLink.slumpTwo,
  },
  {
    tokenId: 1,
    image: imgLink.slumpThree,
  },
  {
    tokenId: 1,
    image: imgLink.slumpFour,
  },
  {
    tokenId: 1,
    image: imgLink.slumpFour,
  },
  {
    tokenId: 1,
    image: imgLink.slumpFour,
  },
  {
    tokenId: 1,
    image: imgLink.slumpFour,
  },
];

function BorrowTo() {
  return (
    <Row xs={2} sm={3} lg={6}>
      {dummy.map((data, i) => {
        return (
          <Col key={i}>
            <div
              style={{
                padding: "10px",
                margin: "10px",
                background: "#fff",
                borderRadius: "12px",
                boxShadow: "0px 1px 1px 1px #faf7ff",
              }}
            >
              <Row lg={1} sm={1} xs={1}>
                <Col
                  className="flex justify-between"
                  style={{
                    background: "#fff",
                    padding: "10px",
                  }}
                >
                  <div
                    style={{
                      background: "#fff",
                    }}
                  >
                    {data.tokenId}
                  </div>
                  <div
                    style={{
                      background: "#fff",
                    }}
                  >
                    Common
                  </div>
                </Col>
                <Col
                  className="flex justify-center"
                  style={{
                    background: "#fff",
                  }}
                >
                  <div
                    className="flex justify-center align-center"
                    style={{
                      background: "#fff",
                      border: "1px solid black",
                      borderRadius: "12px",
                      width: "200px",
                      height: "200px",
                    }}
                  >
                    <img
                      src={data.image}
                      style={{
                        width: "90%",
                        height: "90%",
                        borderRadius: "12px",
                      }}
                    />
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        );
      })}
    </Row>
  );
}

export default BorrowTo;
