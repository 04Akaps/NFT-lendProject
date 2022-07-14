import React, { useEffect, useState } from "react";
import "./LoginPage.scss";

import { clienId } from "../utils/googleLogin";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";

import dotenv from "dotenv";
dotenv.config();

function LoginPage() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    function start() {
      gapi.client.init({
        clienId: clienId,
        scope: "email",
      });
    }
    gapi.load("client:auth2", start);
  });
  const onSuccess = (result) => {
    setAuth(true);
    localStorage.setItem("auth", result.accessToken);
  };

  const onFailure = () => {
    localStorage.removeItem("auth");
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
              <GoogleLogin
                clientId={clienId}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={"single_host_origin"}
              ></GoogleLogin>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
