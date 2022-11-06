import React, { useEffect } from "react";
import "./LoginPage.scss";

import { imgLink } from "../utils/utils";
import { Fragment } from "react";
import { Col, Row, Button, Badge } from "react-bootstrap";
import { useState } from "react";
import { accessNetworkVersion, signmessage } from "components/utils/Variable";
import { web3 } from "components/Contract/Contract";

function LoginPage(props) {
  const [error, setError] = useState("");

  const loginUsingWallet = async () => {
    const wallet = window.ethereum;
    setError("");

    if (wallet) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
      } catch (error) {
        setError("연결을 진행해 주세요!");
        return;
      }

      const checkisUnLock = await wallet._metamask.isUnlocked();

      if (!checkisUnLock) {
        try {
          await wallet.enable();
        } catch (error) {
          setError("Wallet 잠금을 해제해 주세요");
          return;
        }
      }

      const currentNetwork = wallet.networkVersion;

      if (currentNetwork != accessNetworkVersion) {
        setError("networkVersion 바이낸스 테스트넷으로 진행해 주세요!");

        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: `0x${Number(97).toString(16)}`,
              chainName: "Smart Chain - Testnet",
              nativeCurrency: {
                name: "BNB",
                symbol: "BNB",
                decimals: 18,
              },
              rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
            },
          ],
        });
        return;
      }

      try {
        await web3.eth.personal.sign(
          web3.utils.utf8ToHex(signmessage),
          wallet.selectedAddress
        );
      } catch (error) {
        setError("Sign해 주세요!");
        return;
      }

      console.log("무사히 연결 완료 되었습니다.");

      localStorage.setItem("connect", JSON.stringify(wallet.selectedAddress));
      props.setAuth(wallet.selectedAddress);
    } else {
      setError("지갑을 설치해 주세요");
    }
  };
  return (
    <Fragment>
      <div className="login_App flex justify-center align-center column">
        <h3
          style={{
            color: "#ff926e",
            fontWeight: "800",
            marginBottom: "20px",
            background: "transparent",
          }}
        >
          Binance Network & My Simple Project
        </h3>
        <Row
          lg={1}
          xs={1}
          sm={1}
          style={{
            background: "transparent",
          }}
        >
          <Col
            className="flex justify-center"
            style={{
              background: "transparent",
            }}
          >
            <img src={imgLink.zolImg} alt="LoginImg" />
          </Col>
          <Col
            className="flex justify-center"
            style={{
              paddingTop: "20px",
              background: "transparent",
            }}
          >
            <div
              className="imghover flex justify-center"
              style={{
                width: "300px",
                height: "180px",
                padding: "10px",
                background: "#fff",
                borderRadius: "16px",
              }}
            >
              <img
                src={imgLink.wallet}
                alt="wallet"
                style={{
                  objectFit: "contain",
                  width: "90%",
                  height: "100%",
                  cursor: "pointer",
                }}
                onClick={async () => {
                  await loginUsingWallet();
                }}
              />
            </div>
          </Col>

          {error ? (
            <Col
              className="flex justify-center"
              style={{
                marginTop: "20px",
              }}
            >
              <Button
                style={{
                  background: "transparent",
                  border: "none",
                  color: "red",
                }}
              >
                {error}
              </Button>
            </Col>
          ) : (
            ""
          )}
        </Row>
      </div>
    </Fragment>
  );
}

export default LoginPage;
