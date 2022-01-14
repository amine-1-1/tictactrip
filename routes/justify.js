const express = require('express');
const {
    justify
} = require('../controllers/justify');
const {
    protect
} = require('../middelware/auth');
const {
    checkWordCount
} = require('../middelware/wordCountChecker');

const router = express.Router();


/** 
 *  @swagger
 *  tags:
 *    name: Justify-Text
 *    description: Text Justification API.
*/
/**
 * @swagger
 *   /api/justify:
 *     post:
 *       summary: Justifies text.
 *       tags: [Justify-Text]
 *       requestBody:
 *         required: true
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: This is an exmaple string for justififcation. 
 *       responses:
 *         200:
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   data:
 *                     type: string
 *                     example: This is the example text after justification.
 *         401:
 *           description: Unauthorized
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   sucess:
 *                     type: string
 *                     example: false
 *                   error:
 *                     type: string
 *                     example: 'Not Authorized: No token'
*/

router.post('/', protect, checkWordCount, justify);

module.exports = router;