import { CreateUserDTO } from "../dtos/createUser.dto";
import { IdUserDTO } from "../dtos/idUser.dto";
import { UpdateUserDTO } from "../dtos/updateUser.dto";
import { User } from "../entity/user.entity";
import { CreatedUser, OptionalUser } from "../../../shared/utils/types";
import { RoleDTO } from "../dtos/role.dto";


export interface IUserService {
  getUsersByRole(roleDTO:RoleDTO): Promise<User[]>
  getBroker(optionalUser:IdUserDTO): Promise<User[]>
  getCustomer(optionalUser: OptionalUser): Promise<User[]>
  findBy(OptionalUser: OptionalUser): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  createUser(createUserDTO: CreateUserDTO): Promise<CreatedUser>;
  updateUser(idUserDTO: IdUserDTO, updateUserDTO: UpdateUserDTO): Promise<string>;
  deleteUser(idUserDTO: IdUserDTO): Promise<string>
}
