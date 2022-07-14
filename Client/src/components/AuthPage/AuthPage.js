import React, { useEffect } from "react";
import axios from "axios";

function AuthPage({ setAuth }) {
  useEffect(() => {
    const veriftToken = async () => {
      if (document.cookie === "expire") {
        window.location.replace("/");
      } else {
        await axios
          .get("http://localhost:8080/OAuth/token", {
            headers: {
              authorization: `Bearer ${document.cookie}`,
            },
          })
          .then((result) => {
            const messgae = result.data.message;

            if (messgae === "auth End") {
              setAuth(messgae);
            } else {
              setAuth("");
            }
          });
      }
    };

    // veriftToken();
  }, []);

  const send = async () => {
    await axios.get("http://localhost:8080/OAuth/check", {
      headers: {
        authorization: `Bearer ${document.cookie}`,
      },
    });
  };

  return (
    <div>
      <button onClick={send}>check</button>
    </div>
  );
}

export default AuthPage;
