const express = require('express');

const {
    register,

    token
} = require('../controllers/auth');

const router = express.Router();



/**
 * @swagger
 *   paths:
 *     /api/token:
 *       post:
 *         summary: Authenicate and recieve Token.
 *         tags: [Justify-Text]
 *         requestBody:
 *           required: true
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                     description: The user's email.
 *                     example: user2@email.com
 *         responses:
 *           200:
 *             description: Success
 *             content:
 *               application/json:
 *                 schema:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: true
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIyQGVtYWlsLmNvbSIsImlhdCI6MTY0MjE3NjA1OCwiZXhwIjoxNjQyMTc5NjU4fQ.A_I95tvzc2QIDFmNVFi6wvJJT4sI03E4hvA7PORlfzs   
 *           400:
 *             description: Bad Request
 *             content:
 *               application/json:
 *                 schema:
 *                   type: object
 *                   properties:
 *                     sucess:
 *                       type: string
 *                       example: false
 *                     error:
 *                       type: string
 *                       example: Invalid Credentials
 * 
 *     /api/register:
 *       post:
 *         summary: Register and recieve Token.
 *         tags: [Justify-Text]
 *         requestBody:
 *           required: true
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: The user's name.
 *                     example: amine
 *                   email:
 *                     type: string
 *                     description: The user's email.
 *                     example: amine@gmail.com
 *         responses:
 *           200:
 *             description: Success
 *             content:
 *               application/json:
 *                 schema:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: true
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIyQGVtYWlsLmNvbSIsImlhdCI6MTY0MjE3NjA1OCwiZXhwIjoxNjQyMTc5NjU4fQ.A_I95tvzc2QIDFmNVFi6wvJJT4sI03E4hvA7PORlfzs   
 */



router.post('/register', register);
router.post('/token', token);

module.exports = router;