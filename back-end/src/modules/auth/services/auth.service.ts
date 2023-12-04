import { ERROR_MESSAGES } from "../../../constants/errorMessages.constant";
import { UnauthorizedException } from "../../../middleware/error/custonErrors.error";
import { IUserService } from "../../users/services/user.service.interface";
import { TokenObject, TokenPayload, UserRoleType } from "../../utils/types";
import { LoginDTO } from "../dtos/login.dto";
import { IAuthService } from "./auth.service.interface";
import { IHashService } from "./hash.service";
import { ITokenService } from "./token.service";

export class AuthService implements IAuthService {
  constructor(
    private readonly userService: IUserService,
    private readonly hashService: IHashService,
    private readonly tokenService: ITokenService
  ) {}
  async login({ email, password }: LoginDTO) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException(ERROR_MESSAGES.INVALID_CREDENTIALS);
    }

    const correctPassword = this.hashService.compare(password, user.password);
    if (!correctPassword) {
      throw new UnauthorizedException(ERROR_MESSAGES.INVALID_CREDENTIALS);
    }

    const payload: TokenPayload = {
      name: user.name,
      email: user.email,
      role: user.role as UserRoleType,
    };

    const accessToken = this.tokenService.generateToken(payload);

    const tokenObject: TokenObject = {
      accessToken,
      tokenType: "Bearer",
      expiresIn: process.env.EXPIRESIN as string,
      user: payload,
    };

    return tokenObject;
  }
}
