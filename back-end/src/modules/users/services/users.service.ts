import { Repository } from "typeorm";
import { CreateUserDTO } from "../dtos/createUser.dto";
import { User } from "../entity/user.entity";
import { IUsersService } from "./users.service.interface";
import { IdUserDTO } from "../dtos/idUser.dto";
import { UpdateUserDTO } from "../dtos/updateUser.dto";
import {
  CustonException,
  NotFoundException,
} from "../../../middleware/error/custonErrors.error";
import { USER_ROLE, } from "../../../constants/index.constant";
import { IHashService } from "../../auth/services/hash.service";
import { CreatedUser } from "../../utils/types";

export class UsersService implements IUsersService {
  constructor(
    private readonly userRepository: Repository<User>,
    private readonly hashService: IHashService,
    ) {}

  getBrokers() {
    return this.userRepository.findBy({ role: USER_ROLE.BROKER });
  }

  async findBy(idUser: number) {
    return this.userRepository.findOneBy({ idUser });
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
        `Email ${createUserDTO.email} já cadastrado.`,
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
      role: newUser.role
    }
  }

  async updateUser(idUserDTO: IdUserDTO, updateUserDTO: UpdateUserDTO) {
    const { idUser } = idUserDTO;
    const user = await this.userRepository.exist({ where: { idUser } });

    if (!user) {
      throw new NotFoundException();
    }

    return this.userRepository.update(idUser, updateUserDTO);
  }

  async deleteUser(idUserDTO: IdUserDTO) {
    const { idUser } = idUserDTO;
    const user = await this.userRepository.exist({ where: { idUser } });

    if (!user) {
      throw new NotFoundException();
    }

    return this.userRepository.delete({ idUser });
  }
}
