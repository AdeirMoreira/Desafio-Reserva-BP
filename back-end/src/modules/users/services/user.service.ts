import { Repository } from "typeorm";
import { CreateUserDTO } from "../dtos/createUser.dto";
import { User } from "../entity/user.entity";
import { IUserService } from "./user.service.interface";
import { IdUserDTO } from "../dtos/idUser.dto";
import { UpdateUserDTO } from "../dtos/updateUser.dto";
import {
  CustonException,
  NotFoundException,
} from "../../../middleware/error/custonErrors.error";
import { USER_ROLE } from "../../../constants/index.constant";
import { IHashService } from "../../auth/services/hash.service";
import { CreatedUser, OptionalUser } from "../../../shared/utils/types";
import { affectedRecords } from "../../../shared/utils/functions.utils";
import { RoleDTO } from "../dtos/role.dto";

export class UserService implements IUserService {
  constructor(
    private readonly userRepository: Repository<User>,
    private readonly hashService: IHashService
  ) {}

  getUsersByRole({ role }: RoleDTO) {
    return this.userRepository.find({
      select: [
        "idUser",
        "name",
        "email",
        "role",
        "brokerMeetings",
        "customerMeetings",
      ],
      where: { role },
      relations: { brokerMeetings: true, customerMeetings: true },
    });
  }

  getBroker({ idUser }: IdUserDTO) {
    return this.userRepository.find({
      select: ["idUser", "email", "name", "role"],
      where: { idUser, role: USER_ROLE.BROKER },
      relations: { brokerMeetings: true },
    });
  }

  getCustomer({ idUser }: IdUserDTO) {
    return this.userRepository.find({
      select: ["idUser", "email", "name", "role"],
      where: { idUser, role: USER_ROLE.CUSTOMER },
      relations: { customerMeetings: true },
    });
  }

  async findBy(optionalUser: OptionalUser) {
    return this.userRepository.findOne({
      where: optionalUser,
      relations: { brokerMeetings: true, customerMeetings: true },
    });
  }

  async findByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  async createUser(createUserDTO: CreateUserDTO): Promise<CreatedUser> {
    const user = await this.userRepository.exist({
      where: { email: createUserDTO.email },
    });

    if (user) {
      throw new CustonException(
        `The email ${createUserDTO.email} is already registered.`,
        400
      );
    }

    const hashPassword = this.hashService.hash(createUserDTO.password);
    createUserDTO.password = hashPassword;

    const newUser = await this.userRepository.save(createUserDTO);

    return {
      idUser: newUser.idUser,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    };
  }

  async updateUser(idUserDTO: IdUserDTO, updateUserDTO: UpdateUserDTO) {
    const { idUser } = idUserDTO;
    const user = await this.userRepository.exist({ where: { idUser } });

    if (!user) {
      throw new NotFoundException();
    }

    if (updateUserDTO.password) {
      const hashPassword = this.hashService.hash(updateUserDTO.password);
      updateUserDTO.password = hashPassword;
    }

    return affectedRecords(
      await this.userRepository.update(idUser, updateUserDTO)
    );
  }

  async deleteUser(idUserDTO: IdUserDTO): Promise<string> {
    const { idUser } = idUserDTO;
    const user = await this.userRepository.exist({ where: { idUser } });

    if (!user) {
      throw new NotFoundException();
    }

    return affectedRecords(await this.userRepository.delete({ idUser }));
  }
}
