import express from "express";
import { userController } from "../factory/users.factory";
import { authMiddleware } from "../../../middleware/auth/auth.middleware";
import { USER_ROLE } from "../../../constants/index.constant";

const userRoutes = express.Router();

userRoutes.get("/broker/:idUser", userController.getBrokers);
userRoutes.get("/costumer/:idUser", userController.getCostumers);
userRoutes.post("",  userController.createUser);
userRoutes.patch("/:idUser", authMiddleware(USER_ROLE.BROKER),  userController.updateUser);
userRoutes.delete("/:idUser",  userController.deleteUser);

export default userRoutes;
