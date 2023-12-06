import express from "express"
import { authController } from "../factory/auth.factory"

const authRoutes = express.Router()


/**
 * @swagger
 * /login:
 *   post:
 *     summary: Autenticação do usuário.
 *     tags: [Autenticação]
 *     requestBody:
 *       description: Credenciais do usuário.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Autenticação bem sucedida.
 *         content:
 *           application/json:
 *             example:
 *               acessToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7Im5hbWUiOiJEYW0iLCJlbWFpbCI6ImRhcm1zdGFkaW9AZW1haWwuY29tIiwicm9sZSI6IkNvc3R1bWVyIn0sImlhdCI6MTcwMTgxNjkwMCwiZXhwIjoxNzAxODM0OTAwfQ.G3vMZz49-opVT8NqDuakhVacD3sme9lDFQIi6OmXvOk
 *               tokenType: Bearer
 *               expiresIn: 5h
 *               user:
 *                 name: Dam
 *                 email: darmstadio@email.com
 *                 role: Costumer
 *       401:
 *         description: Credenciais incorretas ou email não cadastrado
 *         content:
 *           application/json:
 *             example:
 *               status: 401
 *               errorMessage: Incorrect email or password.
 */

authRoutes.post('', authController.login)

export default authRoutes