import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "NFT_Lend",
      description: "Personal Project  : NFT Lend && do Exploration",
    },
    servers: [
      {
        url: "127.0.0.1", // 요청 URL
      },
    ],
  },
  apis: ["./router/*.js"], //Swagger 파일 연동
};

const swaggerSpec = swaggerJsdoc(options);

export const swagger = {
  serve: swaggerUi.serve,
  setup: swaggerUi.setup(swaggerSpec),
};
