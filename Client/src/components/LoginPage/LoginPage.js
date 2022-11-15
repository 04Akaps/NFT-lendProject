import React from "react";
import "./LoginPage.scss";

import { imgLink } from "../utils/utils";
import { Fragment } from "react";
import { Col, Row, Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { accessNetworkVersion, signmessage } from "components/utils/Variable";
import { web3, zolCoreAddress, zolTokenInstance } from "contract/JSON/contract";
import { useEffect } from "react";
import {
  checkTokenAllowance,
  sendApproveTransaction,
} from "contract/zolTokenCall";
import { checkSelectedAddress } from "contract/MetaMask/MetaMask";

function LoginPage(props) {
  const [error, setError] = useState("");
  const [loginModal, setLoginModal] = useState(false);
  const [zolTokenApprove, setZolTokenApprove] = useState(false);

  useEffect(() => {
    const htmlTitle = document.querySelector("title");
    htmlTitle.innerHTML = "LoginPage";
  }, []);

  useEffect(async () => {
    if (checkSelectedAddress()) {
      await approveCheck();
    }
  }, [loginModal]);

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

        await window.ethereum
          .request({
            method: "wallet_switchEthereumChain",
            params: [
              {
                chainId: `0x${Number(97).toString(16)}`,
              },
            ],
          })
          .catch(async (err) => {
            if (err.code == 4902) {
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
                    rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545"],
                  },
                ],
              });
            }

            if (err.code == 4001) {
              // switch를 실행하지 않고 취소 한 것
              setError("네트워크를 변경해 주세요");
            }

            if (err.code == -32002) {
              // 메타마스크에 이미 요청이 가 있는 것
              setError("MetaMask를 확인해 주세요");
            }

            return;
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

      setLoginModal(true);
    } else {
      setError("지갑을 설치해 주세요");
    }
  };

  const approveCheck = async () => {
    const allowanceAmount = await checkTokenAllowance(zolCoreAddress);
    console.log(allowanceAmount);

    return false;
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

      <Modal show={loginModal} centered backdrop="static">
        <Modal.Body>
          <Row>
            <Col
              className="flex justify-center"
              style={{
                cursor: "pointer",
              }}
              onClick={async () => {
                if (!zolTokenApprove) {
                  await sendApproveTransaction(
                    window.ethereum.selectedAddress,
                    zolCoreAddress
                  );
                }
              }}
            >
              {zolTokenApprove ? "✔" : "Need To Approve"}
            </Col>
            <Col
              className="flex justify-center"
              style={{
                cursor: "pointer",
              }}
            >
              Register ZolToken
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer
          style={{
            justifyContent: "space-between",
          }}
        >
          <Button
            onClick={() => {
              setLoginModal(false);
            }}
            style={{
              border: "none",
              background: "purple",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              console.log("approve를 체크 해야 한다.");

              localStorage.setItem(
                "connect",
                JSON.stringify(window.ethereum.selectedAddress)
              );
              props.setAuth(window.ethereum.selectedAddress);
            }}
          >
            Next
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
}

export default LoginPage;
