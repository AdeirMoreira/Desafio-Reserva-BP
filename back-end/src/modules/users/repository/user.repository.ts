import { DeleteResult, UpdateResult } from "typeorm";
import { USER_ROLE } from "../../../constants/index.constant";
import { AppDataSource } from "../../../database/database";
import { CreateUserDTO } from "../dtos/createUser.dto";
import { IdUserDTO } from "../dtos/idUser.dto";
import { UpdateUserDTO } from "../dtos/updateUser.dto";
import { User } from "../entity/user.entity";
import { OptionalUser } from "../../../shared/utils/types";

export class UserRepository {
  private userRepository = AppDataSource.getRepository(User);

  getBroker({ idUser }: IdUserDTO): Promise<User[]> {
    return this.userRepository.find({
      select: ["idUser", "email", "name", "role"],
      where: { idUser, role: USER_ROLE.BROKER },
      relations: { brokerMeetings: true },
    });
  }

  getCustomer({ idUser }: IdUserDTO): Promise<User[]> {
    return this.userRepository.find({
      select: ["idUser", "email", "name", "role"],
      where: { idUser, role: USER_ROLE.CUSTOMER },
      relations: { customerMeetings: true },
    });
  }

  exists(idUser: number): Promise<boolean>{
    return this.userRepository.exist({ where: { idUser } });
  }

  save(createUserDTO: CreateUserDTO): Promise<User> {
    return this.userRepository.save(createUserDTO);
  }

  findBy(optionalUser: OptionalUser): Promise<User | null> {
    return this.userRepository.findOne({
      where: optionalUser,
      relations: { brokerMeetings: true, customerMeetings: true },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({ email });
  }

  async update({idUser}: IdUserDTO, updateUserDTO: UpdateUserDTO): Promise<UpdateResult> {
    return this.userRepository.update(idUser, updateUserDTO);
  }

  async delete({idUser}: IdUserDTO) : Promise<DeleteResult> {
    return this.userRepository.delete({ idUser });
  }
}
