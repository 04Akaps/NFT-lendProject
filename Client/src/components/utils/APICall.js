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

export const makeNFT = async () => {
  await axios.get("http://localhost:8080/NFT/makeNFT").then((result, err) => {
    if (!err) console.log(result.data);
  });
};
