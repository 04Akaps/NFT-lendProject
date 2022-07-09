import React, { useEffect } from "react";

function AuthPage({ setAuth }) {
  useEffect(() => {
    console.log(document.cookie);
  }, []);
  return <div>test</div>;
}

export default AuthPage;
