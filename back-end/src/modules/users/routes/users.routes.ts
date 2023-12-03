import express from "express";
import { usersController } from "../factory/users.factory";

const usersRoutes = express.Router();

usersRoutes.get("", usersController.getBrokers);
usersRoutes.post("",  usersController.createUser);
usersRoutes.patch("/:idUser",  usersController.updateUser);
usersRoutes.delete("/:idUser",  usersController.deleteUser);

export default usersRoutes;
