import { AppDataSource } from "../../../database/database";
import { UsersController } from "../controllers/users.controller";
import { User } from "../entity/user.entity";
import { UsersService } from "../services/users.service";

function usersFactory() {
  const userRepository = AppDataSource.getRepository(User)
  const usersService = new UsersService(userRepository);
  const usersController = new UsersController(usersService);

  return { usersController };
}

export const { usersController } = usersFactory();
