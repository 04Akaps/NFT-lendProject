import React, { useEffect } from "react";

function AuthPage({ setAuth }) {
  useEffect(() => {
    console.log("hojin");
    console.log(document.cookie);
  }, []);
  return <div>test</div>;
}

export default AuthPage;
