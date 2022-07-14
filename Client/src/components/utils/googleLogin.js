// import React, { useEffect, useState } from "react";
// import { GoogleLogin, GoogleLogout } from "react-google-login";
// // import axios from "axios";

// import dotenv from "dotenv";
// dotenv.config();

export const clienId = process.env.REACT_APP_API_CLIENT;

// const onLogOut = () => {
//   localStorage.removeItem("googleLoginData");
// };

// function LoginToGoogle() {
//   return (
//     <div>
//       <GoogleLogin
//         clientId={clienId}
//         buttonText="Login"
//         onSuccess={onSuccess}
//         onFailure={onFailure}
//         cookiePolicy={"single_host_origin"}
//         isSignedIn={true}
//       />
//     </div>
//   );
// }

// function LogOutToGoogle() {
//   return (
//     <>
//       <GoogleLogout clientId={clienId} buttonText="Logout" />
//     </>
//   );
// }

// export default LoginToGoogle;
