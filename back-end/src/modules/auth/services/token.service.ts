import * as jwt from "jsonwebtoken";
import { TokenPayload } from "../../utils/types";

export interface ITokenService {
  generateToken(payload: TokenPayload): string;
  validateToken(token: string): string;
}

export class TokenService implements ITokenService {
  generateToken = (payload: TokenPayload): string => {
    const token = jwt.sign(
      {
        payload,
      },
      process.env.JWT_KEY as jwt.Secret,
      {
        expiresIn: process.env.EXPIRESIN,
      }
    );
    return token;
  };

  validateToken = (token: string): string => {
    return jwt.verify(token, process.env.JWT_KEY as jwt.Secret) as any;
  };
}
