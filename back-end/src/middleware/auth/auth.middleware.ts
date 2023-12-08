import { NextFunction, Request, Response } from "express";
import { CustonException, UnauthorizedException } from "../error/custonErrors.error";
import { tokenService } from "../../modules/auth/factory/auth.factory";
import { ERROR_MESSAGES } from "../../constants/errorMessages.constant";

function extractTokenFromHeader(request: Request): string | undefined {
  const [type, token] = request.headers.authorization?.split(" ") ?? [];
  return type === "Bearer" ? token : undefined;
}

export const authMiddleware = (userRole?: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = extractTokenFromHeader(req);
      
      if (!token) {
        throw new UnauthorizedException(ERROR_MESSAGES.INVALID_TOKEN);
      }

      const {
        payload: { role },
      } = tokenService.validateToken(token);

      console.log(tokenService.validateToken(token));
      

      if (userRole &&  userRole !== role) {
        throw new UnauthorizedException();
      }

      next();
    } catch (error: any) {
      if(error instanceof CustonException) {
        throw error
      }
      
      throw new UnauthorizedException(ERROR_MESSAGES.INVALID_TOKEN, error);
    }
  };
};
