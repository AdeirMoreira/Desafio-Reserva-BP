import { DeleteResult, UpdateResult } from "typeorm";
import { CreateUserDTO } from "../dtos/createUser.dto";
import { IdUserDTO } from "../dtos/idUser.dto";
import { UpdateUserDTO } from "../dtos/updateUser.dto";
import { User } from "../entity/user.entity";
import { CreatedUser } from "../../utils/types";

export interface IUsersService {
  getBrokers(): Promise<User[]>
  findBy(idUser: number): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  createUser(createUserDTO: CreateUserDTO): Promise<CreatedUser>;
  updateUser(idUserDTO: IdUserDTO, updateUserDTO: UpdateUserDTO): Promise<UpdateResult>;
  deleteUser(idUserDTO: IdUserDTO): Promise<DeleteResult>
}
