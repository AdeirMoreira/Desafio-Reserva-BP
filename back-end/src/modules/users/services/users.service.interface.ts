import { DeleteResult, UpdateResult } from "typeorm";
import { CreateUserDTO } from "../dtos/createUser.dto";
import { IdUserDTO } from "../dtos/idUser.dto";
import { UpdateUserDTO } from "../dtos/updateUser.dto";
import { User } from "../entity/user.entity";

export interface IUsersService {
  getBrokers(): Promise<User[]>
  createUser(createUserDTO: CreateUserDTO): Promise<User>;
  updateUser(idUserDTO: IdUserDTO, updateUserDTO: UpdateUserDTO): Promise<UpdateResult>;
  deleteUser(idUserDTO: IdUserDTO): Promise<DeleteResult>
}
