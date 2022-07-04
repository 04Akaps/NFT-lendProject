import React from "react";
import "./LoginPage.scss";

import { Button } from "@mui/material";
import axios from "axios";

function LoginPage() {
  const googleOAuth = async () => {
    await axios.get("http://localhost:8080/Auth/google").then((result) => {
      console.log(result);
    });
  };
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

              <Button
                variant="contained"
                disableElevation
                onClick={googleOAuth}
              >
                Google
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
