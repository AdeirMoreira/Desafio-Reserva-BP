import { Request, Response, NextFunction } from "express";
import { IAuthController } from "./auth.controller.interface";
import { LoginDTO } from "../dtos/login.dto";
import { STATUS_CODE } from "../../../constants/statusCodes.constant";
import { IAuthService } from "../services/auth.service.interface";

export class AuthController implements IAuthController {
  constructor(private readonly authService: IAuthService) {}
  login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const body = req.body;
      const loginDTO = await LoginDTO.validate(body);

      const result = await this.authService.login(loginDTO);

      res.status(STATUS_CODE.CREATED).send(result);
    } catch (error) {
      next(error);
    }
  };
}
