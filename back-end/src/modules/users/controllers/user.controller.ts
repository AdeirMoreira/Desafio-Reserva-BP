import { NextFunction, Request, Response } from "express";
import { IUserService } from "../services/user.service.interface";
import { IUsersController } from "./user.controller.interface";
import { CreateUserDTO } from "../dtos/createUser.dto";
import { STATUS_CODE } from "../../../constants/statusCodes.constant";
import { IdUserDTO } from "../dtos/idUser.dto";
import { UpdateUserDTO } from "../dtos/updateUser.dto";

export class UserController implements IUsersController {
  constructor(private readonly userService: IUserService) {}
  getBrokers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
    } catch (error) {
      next(error);
    }
  };

  createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const body = req.body;

      const createUserDTO = await CreateUserDTO.validate(body);

      const result = await this.userService.createUser(createUserDTO);

      res.status(STATUS_CODE.CREATED).send(result);
    } catch (error) {
      next(error);
    }
  };

  updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const params = req.params;
      const body = req.body;

      const idUser = await IdUserDTO.validate(params);
      const updateUserDTO = await UpdateUserDTO.validate(body);

      const result = await this.userService.updateUser(idUser, updateUserDTO);

      res.status(STATUS_CODE.OK).send(result);
    } catch (error) {
      next(error);
    }
  };

  deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const params = req.params;
      
      const idUser = await IdUserDTO.validate(params);

      const result = await this.userService.deleteUser(idUser);

      res.status(STATUS_CODE.OK).send(result);
    } catch (error) {
      next(error);
    }
  };
}
