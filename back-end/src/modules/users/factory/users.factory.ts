import { AppDataSource } from "../../../database/database";
import { HashService } from "../../auth/services/hash.service";
import { UserController } from "../controllers/user.controller";
import { User } from "../entity/user.entity";
import { UserService } from "../services/user.service";

function userFactory() {
  const userRepository = AppDataSource.getRepository(User);
  const hashService = new HashService();
  const userService = new UserService(userRepository, hashService);
  const userController = new UserController(userService);

  return { userController, userService };
}
export const { userController, userService } = userFactory();
