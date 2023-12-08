
import { TokenObject } from "../../../shared/utils/types";
import { LoginDTO } from "../dtos/login.dto";

export interface IAuthService {
  login(loginDTO: LoginDTO): Promise<TokenObject>;
}
