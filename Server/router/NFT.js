import express from "express";
import { getNFTImage, getNFTMetaData } from "../controllers/NFT.js";

const router = express.Router();

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
