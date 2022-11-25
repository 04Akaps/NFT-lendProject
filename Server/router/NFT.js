import express from "express";
import {
  getNFTImage,
  getNFTMetaData,
  makeImg,
  makeNFT,
} from "../controllers/NFT.js";

const router = express.Router();

router.post("/test", makeNFT);
// 위에 router는 후에 제거하여 eventListening으로 활용

router.post("/makeImg", makeImg);

/**
 * @swagger
 * paths:
 *  /getNFT/{id}:
 *   get:
 *    summary : "get NFT Metadata"
 *    parameters:
 *       - in: query
 *         name: id
 *         type: integer
 *         required: true
 *    description : "NFT Metadata 조회"
 *    tags: [NFT]
 *    responses:
 *      "200":
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example:
 *                   "Metadata"
 *      "201":
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                message:
 *                  type: string
 *                  example:
 *                   "Not Existed"
 */
router.get("/getNFT/:id", getNFTMetaData);

/**
 * @swagger
 * paths:
 *  /getNFTImage/{id}:
 *   get:
 *    summary : "get NFT Image"
 *    description : "NFT Image 조회"
 *    parameters:
 *       - in: query
 *         name: id
 *         type: integer
 *         required: true
 *    tags: [NFT]
 *    responses:
 *      "200":
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example:
 *                   "img"
 *      "201":
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                message:
 *                  type: string
 *                  example:
 *                   "Not Existed"
 */
router.get("/getNFTImage/:id", getNFTImage);

export default router;
