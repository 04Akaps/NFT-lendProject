import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";

import "swiper/swiper.scss";
import "swiper/modules/navigation/navigation.scss";
import "swiper/modules/pagination/pagination.scss";

import { imgLink } from "components/utils/utils";
import { Fragment } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useEffect } from "react";

SwiperCore.use([Navigation, Pagination]);

const siperExample = [
  {
    img: imgLink.zolOne,
  },
  {
    img: imgLink.zolTwo,
  },
  {
    img: imgLink.zolThree,
  },
  {
    img: imgLink.zolFour,
  },
  {
    img: imgLink.zolFive,
  },
];

function Mint() {
  useEffect(() => {
    const data = document.querySelectorAll(".swiper-pagination");

    if (data.length >= 1) {
      data[0].style.bottom = "0px";
    }
  }, []);

  return (
    <Fragment>
      <Row lg={1} xs={1} sm={1}>
        <Col className="flex justify-center">
          <div
            style={{
              padding: "20px",
              fontSize: "1.2rem",
              fontWeight: "800",
              color: "purple",
            }}
          >
            This is Example Of NFT
          </div>
        </Col>

        <Col>
          <Swiper
            className="banner"
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
          >
            {siperExample.map((data, index) => {
              return (
                <SwiperSlide className="flex justify-center">
                  <img
                    src={data.img}
                    style={{
                      objectFit: "cover",
                    }}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Col>
        <Col>
          <Row
            lg={1}
            xs={1}
            sm={1}
            style={{
              padding: "20px",
            }}
          >
            <Col
              className="flex justify-center"
              style={{
                padding: "20px 0px 0px 0px",
                fontSize: "1.2rem",
                fontWeight: "800",
                color: "purple",
              }}
            >
              Mint Your NFT
            </Col>
            <Col
              className="flex justify-center"
              style={{
                fontSize: "0.8rem",
                fontWeight: "300",
                color: "gray",
              }}
            >
              It Will Be Created Using P5js, Math.random
            </Col>
            <Col
              className="flex justify-center"
              style={{
                paddingTop: "20px",
              }}
            >
              <Button
                style={{
                  width: "100px",
                  background: "transparent",
                }}
                onClick={() => {
                  console.log("sdf");
                }}
              >
                <img src={imgLink.mintButtonImg} className="w-100" />
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Fragment>
  );
}

export default Mint;
