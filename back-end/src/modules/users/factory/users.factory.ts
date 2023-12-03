import { AppDataSource } from "../../../database/database";
import { HashService } from "../../auth/services/hash.service";
import { UsersController } from "../controllers/users.controller";
import { User } from "../entity/user.entity";
import { UsersService } from "../services/users.service";

function usersFactory() {
  const userRepository = AppDataSource.getRepository(User)
  const hashService = new HashService()
  const usersService = new UsersService(userRepository, hashService);
  const usersController = new UsersController(usersService);

  return { usersController, usersService };
}

export const { usersController, usersService } = usersFactory();
