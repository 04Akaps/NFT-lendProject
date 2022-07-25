import axios from "axios";

export const vereifyToken = async () => {
  await axios
    .post("http://localhost:8080/OAuth/checkToken", {
      token: window.localStorage.auth,
    })
    .then((result) => {
      if (result.data.message === "fail") {
        window.localStorage.removeItem("auth");
      }
    });
};
