import path from "path";
import fs from "fs";
const __dirname = path.resolve();

export const makeNFT = async (req, res) => {
  const imgHtml = __dirname + "/NFT.html";

  const imgData = fs.readFileSync(imgHtml, "base64", (err, data) => {
    return data;
  });

  console.log(imgData);
  // npm install node-html-to-image
  const imagePrefix = "data:image/png;base64,";

  console.log(imagePrefix + imgData);
};
