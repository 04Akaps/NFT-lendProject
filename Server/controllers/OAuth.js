import { OAuth2Client } from "google-auth-library";
import { googleClientId, homeUrl } from "../utils/env.js";

const client = new OAuth2Client(googleClientId);

export const authVerify = async (req, res) => {
  try {
    let googleToken = req.body.token;

    const ticket = await client
      .verifyIdToken({
        idToken: googleToken,
        audience: googleClientId,
      })
      .then(() => {
        res.status(200).send({ message: "success" });
      })
      .catch(() => {
        res.status(200).send({ message: "fail" });
      });
  } catch (error) {
    console.log(error);
    res.redirect(homeUrl);
  }
};
