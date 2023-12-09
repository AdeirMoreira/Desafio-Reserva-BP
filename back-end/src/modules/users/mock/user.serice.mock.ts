import { CreateUserDTO } from "../dtos/createUser.dto";
import { IdUserDTO } from "../dtos/idUser.dto";
import { UpdateUserDTO } from "../dtos/updateUser.dto";
import { User } from "../entity/user.entity";
import { IUserService } from "../services/user.service.interface";
import {
  brokerFreeUserMock,
  brokerUserMock,
  customerFreeUserMock,
  customerUserMock,
  outerBrokerUserMock,
  outherCustomerUserMock
} from "./user.mock";
import { CreatedUser } from "../../../shared/utils/types";
import { RoleDTO } from "../dtos/role.dto";

export class UserServiceMock implements IUserService {
  private users: User[] =  [
    customerUserMock,
    brokerUserMock,
    outerBrokerUserMock,
    outherCustomerUserMock,
    customerFreeUserMock,
    brokerFreeUserMock,
  ];

  async getUsersByRole({role}: RoleDTO): Promise<User[]> {
    return this.users.filter(u => u.role === role)
  }

  async getBroker(optionalUser: IdUserDTO): Promise<User[]> {
    return [brokerUserMock];
  }
  async getCustomer(optionalUser: Partial<CreatedUser>): Promise<User[]> {
    throw [customerUserMock];
  }
  async findBy(optionalUser: Partial<CreatedUser>): Promise<User | null> {
    const { idUser } = optionalUser;

    

    const user = this.users.find((b) => b.idUser === idUser);

    if (user && user?.idUser === idUser && user?.role === optionalUser.role) {
      return user;
    }

    if (user && user?.idUser === idUser && user.role === optionalUser.role) {
      return user;
    }

    return null;
  }
  async findByEmail(email: string): Promise<User | null> {
    if (email === brokerUserMock.email) {
      return brokerUserMock;
    }

    if (email === customerUserMock.email) {
      return customerUserMock;
    }

    return null;
  }
  async createUser(createUserDTO: CreateUserDTO): Promise<CreatedUser> {
    return {
      idUser: outerBrokerUserMock.idUser,
      name: outerBrokerUserMock.email,
      email: outerBrokerUserMock.email,
      role: outerBrokerUserMock.role,
    };
  }
  async updateUser(
    idUserDTO: IdUserDTO,
    updateUserDTO: UpdateUserDTO
  ): Promise<string> {
    if (idUserDTO.idUser === outherCustomerUserMock.idUser) {
      return `Affected records: 1`;
    }

    return `Affected records: 0`;
  }
  async deleteUser(idUserDTO: IdUserDTO): Promise<string> {
    if (idUserDTO.idUser === outherCustomerUserMock.idUser) {
      return `Affected records: 1`;
    }

    return `Affected records: 0`;
  }
}
