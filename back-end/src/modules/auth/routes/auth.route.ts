import express from "express"
import { authController } from "../factory/auth.factory"

const authRoutes = express.Router()

authRoutes.use('', authController.login)

export default authRoutes