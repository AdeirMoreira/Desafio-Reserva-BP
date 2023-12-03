import { usersService } from "../../users/factory/users.factory";
import { AuthController } from "../controllers/auth.controller";
import { AuthService } from "../services/auth.service";
import { HashService } from "../services/hash.service";
import { TokenService } from "../services/token.service";

function authFactory() {
  const hashService = new HashService();
  const tokenService = new TokenService();
  const authService = new AuthService(usersService, hashService, tokenService);
  const authController = new AuthController(authService);

  return { authController, hashService, tokenService };
}

export const { authController, hashService, tokenService } = authFactory();
