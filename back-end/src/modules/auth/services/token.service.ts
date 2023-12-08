import { sign, Secret, verify } from "jsonwebtoken";
import { ExtractedTokenPayload, TokenPayload } from "../../../shared/utils/types";

export interface ITokenService {
  generateToken(payload: TokenPayload): string;
  validateToken(token: string): ExtractedTokenPayload
}

export class TokenService implements ITokenService {
  generateToken = (payload: TokenPayload): string => {
    const token = sign(
      {
       payload,
      },
      process.env.JWT_KEY as Secret,
      {
        expiresIn: process.env.EXPIRESIN,
      }
    );
    return token;
  };

  validateToken = (token: string): ExtractedTokenPayload => {
    return verify(token, process.env.JWT_KEY as Secret) as ExtractedTokenPayload
  };
}
