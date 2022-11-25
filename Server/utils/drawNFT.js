import { createCanvas, Image } from "canvas";
const width = 1200;
const height = 1200;

export const drawNFT = async (tokenId) => {
  // Instantiate the canvas object
  const canvas = createCanvas(width, height);
  const context = canvas.getContext("2d");

  // Fill the rectangle with purple
  context.fillStyle = "#fff";
  context.fillRect(0, 0, width, height);

  context.font = "54px Helvetica";
  const titlePosition = {
    x: canvas.width / 2,
    y: canvas.height / 7,
  };

  context.fillStyle = "black";
  context.textAlign = "center";
  context.fillText(
    `Your Token Id = ${tokenId}`,
    titlePosition.x,
    titlePosition.y
  );

  const color = Math.floor(Math.random() * (255 - 50) + 0);
  const rgbColor = `rgb(${color}, ${color}, ${color})`;

  // circle 그리기
  context.beginPath();
  context.lineWidth = 10;
  context.strokeStyle = rgbColor;
  context.arc(titlePosition.x, titlePosition.y * 2, 100, 0, 2 * Math.PI);
  context.stroke();

  // 몸통 그리기
  context.beginPath();
  context.moveTo(titlePosition.x, titlePosition.y * 2 + 100);
  context.lineTo(titlePosition.x, titlePosition.y * 2 + 100 + 400);
  context.stroke();

  // 왼팔 그리기
  const leftHand = Math.floor(Math.random() * 10);

  if (leftHand > 5) {
    context.beginPath();

    context.moveTo(titlePosition.x, titlePosition.y * 2 + 100 + 100);
    context.lineTo(titlePosition.x - 150, titlePosition.y * 2 + 100 + 250);
    context.stroke();
  }

  // 오른팔 그리기
  const rightHand = Math.floor(Math.random() * 10);

  if (rightHand > 5) {
    context.beginPath();
    context.moveTo(titlePosition.x, titlePosition.y * 2 + 100 + 100);
    context.lineTo(titlePosition.x + 150, titlePosition.y * 2 + 100 + 250);
    context.stroke();
  }

  // 왼 다리 그리기

  const leftFoot = Math.floor(Math.random() * 10);

  context.beginPath();
  context.moveTo(titlePosition.x, titlePosition.y * 2 + 100 + 400);
  context.lineTo(titlePosition.x - 150, titlePosition.y * 2 + 100 + 400 + 150);
  context.stroke();

  if (leftFoot > 5) {
    context.beginPath();
    context.moveTo(titlePosition.x, titlePosition.y * 2 + 100 + 400);
    context.lineTo(
      titlePosition.x - 150,
      titlePosition.y * 2 + 100 + 400 + 150
    );
    context.stroke();
  }

  // 오른 다리 그리기

  const rightFoot = Math.floor(Math.random() * 10);

  if (rightFoot > 5) {
    context.beginPath();
    context.moveTo(titlePosition.x, titlePosition.y * 2 + 100 + 400);
    context.lineTo(
      titlePosition.x + 150,
      titlePosition.y * 2 + 100 + 400 + 150
    );
    context.stroke();
  }

  // 왼손에는 검
  const isSword = Math.floor(Math.random() * 10);

  if (isSword < 3 && rightHand > 5) {
    let swardImg = new Image();

    swardImg.onload = () => {
      context.rotate((45 * Math.PI) / 180);
      context.drawImage(
        swardImg,
        titlePosition.x + 330,
        titlePosition.y - 350,
        150,
        150
      );
    };
    swardImg.src = "/utils/sward.png";
  }

  // 오른손 방패
  const isShield = Math.floor(Math.random() * 10);

  if (isShield < 3 && leftHand > 5) {
    let sheildImg = new Image();
    sheildImg.onload = () => {
      context.drawImage(
        sheildImg,
        titlePosition.x - 220,
        titlePosition.y * 2 + 100 + 200,
        150,
        150
      );
    };
    sheildImg.src = "/utils/sheild.png";
  }

  // Write the image to file
  const buffer = canvas.toBuffer("image/png");
  // data:image/png;base64
  return (
    "data:image/png;base64," + Buffer.from(buffer, "utf8").toString("base64")
  );
};
