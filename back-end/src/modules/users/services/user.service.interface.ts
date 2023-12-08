import { CreateUserDTO } from "../dtos/createUser.dto";
import { IdUserDTO } from "../dtos/idUser.dto";
import { UpdateUserDTO } from "../dtos/updateUser.dto";
import { User } from "../entity/user.entity";
import { CreatedUser, OptionalUser } from "../../../shared/utils/types";


export interface IUserService {
  getBroker(optionalUser:IdUserDTO): Promise<User[]>
  getCustomer(optionalUser: OptionalUser): Promise<User[]>
  findBy(OptionalUser: OptionalUser): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  createUser(createUserDTO: CreateUserDTO): Promise<CreatedUser>;
  updateUser(idUserDTO: IdUserDTO, updateUserDTO: UpdateUserDTO): Promise<string>;
  deleteUser(idUserDTO: IdUserDTO): Promise<string>
}
