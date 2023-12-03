import express from "express";
import { usersController } from "../factory/users.factory";
import { authMiddleware } from "../../../middleware/auth/auth.middleware";
import { USER_ROLE } from "../../../constants/index.constant";

const usersRoutes = express.Router();

usersRoutes.get("", usersController.getBrokers);
usersRoutes.post("",  usersController.createUser);
usersRoutes.patch("/:idUser", authMiddleware(USER_ROLE.BROKER),  usersController.updateUser);
usersRoutes.delete("/:idUser",  usersController.deleteUser);

export default usersRoutes;
