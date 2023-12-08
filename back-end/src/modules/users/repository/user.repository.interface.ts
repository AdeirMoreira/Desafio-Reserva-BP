import { DeleteResult, UpdateResult } from "typeorm";
import { UpdateUserDTO } from "../dtos/updateUser.dto";
import { User } from "../entity/user.entity";
import { IdUserDTO } from "../dtos/idUser.dto";
import { CreateUserDTO } from "../dtos/createUser.dto";
import { OptionalUser } from "../../../shared/utils/types";

export interface IUserRepository {
    getBroker({ idUser }: IdUserDTO): Promise<User[]>;
    getCustomer({ idUser }: IdUserDTO): Promise<User[]>;
    exists(idUser: number): Promise<boolean>;
    save(createUserDTO: CreateUserDTO): Promise<User>;
    findBy(optionalUser: OptionalUser): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    update({ idUser }: IdUserDTO, updateUserDTO: UpdateUserDTO): Promise<UpdateResult>;
    delete({ idUser }: IdUserDTO): Promise<DeleteResult>;
  }