
import { ExtractedTokenPayload, TokenPayload } from "../../../shared/utils/types";
import { ITokenService } from "../services/token.service";
import { HashServiceMock } from "./hash.service.mock";

export class TokenServiceMock implements ITokenService {
  generateToken(payload: TokenPayload): string {
    return new HashServiceMock().hashString
  }
  validateToken(token: string): ExtractedTokenPayload {
    return {
      payload: { name: "teste", email: "teste@email.com", role: "Customer" },
      iat: 1702031385,
      exp: 1702049385,
    };
  }
}
