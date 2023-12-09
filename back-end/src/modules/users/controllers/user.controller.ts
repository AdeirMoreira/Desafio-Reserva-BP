import { NextFunction, Request, Response } from "express";
import { IUserService } from "../services/user.service.interface";
import { IUsersController } from "./user.controller.interface";
import { CreateUserDTO } from "../dtos/createUser.dto";
import { STATUS_CODE } from "../../../constants/statusCodes.constant";
import { IdUserDTO } from "../dtos/idUser.dto";
import { UpdateUserDTO } from "../dtos/updateUser.dto";
import { RoleDTO } from "../dtos/role.dto";

export class UserController implements IUsersController {
  constructor(private readonly userService: IUserService) {}

  getUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const params = req.params;

      const roleDTO = RoleDTO.validate(params);

      const result = await this.userService.getUsersByRole(roleDTO)

      res.status(STATUS_CODE.OK).send(result);
    } catch (error) {
      next(error);
    }
  };

  getBroker = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const params = req.params;

      const idUserDTO = IdUserDTO.validate(params);

      const result = await this.userService.getBroker(idUserDTO)

      res.status(STATUS_CODE.OK).send(result);
    } catch (error) {
      next(error);
    }
  };

  getCustomer = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const params = req.params;

      const idUserDTO =  IdUserDTO.validate(params);

      const result = await this.userService.getCustomer(idUserDTO)

      res.status(STATUS_CODE.OK).send(result);
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

      const createUserDTO =  CreateUserDTO.validate(body);

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

      const idUser =  IdUserDTO.validate(params);
      const updateUserDTO =  UpdateUserDTO.validate(body);

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
      
      const idUser = IdUserDTO.validate(params);

      const result = await this.userService.deleteUser(idUser);

      res.status(STATUS_CODE.OK).send(result);
    } catch (error) {
      next(error);
    }
  };
}
