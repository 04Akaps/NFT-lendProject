import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./LoginPage.scss";

import { Button } from "@mui/material";
import axios from "axios";

function LoginPage() {
  const [googleUri, setGoogleUri] = useState("");

  const googleOAuth = async () => {
    await axios
      .get("http://localhost:8080/OAuth/loginGoogle")
      .then((result) => {
        const oAuthLink = result.data.uri;
        setGoogleUri(oAuthLink);
      });
  };

  useEffect(() => {
    googleOAuth();
  }, []);

  return (
    <>
      <div className="login_App">
        <div className="login_Img">
          <img
            src="./img/LoginPage.png"
            alt="LoginImg"
            className="Login_Img_img"
          />
        </div>

        <div className="login_container">
          <div className="Login_Box">
            <div className="Login_Box_Method">
              <Button variant="contained" disableElevation>
                KaiKas
              </Button>

              <a href={googleUri.toString()}>
                <Button variant="contained" disableElevation>
                  Google
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
