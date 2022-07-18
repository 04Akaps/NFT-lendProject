import React, { useEffect } from "react";
import "./LoginPage.scss";

import { clienId, imgLink } from "../utils/utils";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";

function LoginPage(props) {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clienId: clienId,
        scope: "email",
      });
    }
    gapi.load("client:auth2", start);

    if (props.auth) {
      window.location.replace("/Home/MainPage");
    }
  });
  const onSuccess = (result) => {
    props.setAuth(true);
    window.localStorage.setItem("auth", result.tokenObj.id_token);
    window.location.replace("/Home/MainPage");
  };

  const onFailure = () => {
    localStorage.removeItem("auth");
  };

  return (
    <>
      <div className="login_App">
        <div className="login_Img">
          <img src={imgLink.zolImg} alt="LoginImg" className="Login_Img_img" />
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
