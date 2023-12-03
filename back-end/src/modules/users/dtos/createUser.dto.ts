import { IsString, IsEmail, IsNotEmpty, Length, IsIn } from "class-validator";
import { ErrorObject, validateDTO } from "../../utils/validator";
import { ValidationException } from "../../../middleware/error/custonErrors.error";

export class CreateUserDTO {
  @IsNotEmpty({ message: "O Nome do corretor é obrigatorio." })
  @IsString({ message: "O nome do corretor deve ser uma string" })
  name!: string;

  @IsEmail({}, { message: "Email inválido." })
  email!: string;

  @IsNotEmpty({ message: "A senha é obrigatoria." })
  @IsString({ message: "A senha deve ser uma string." })
  @Length(8, undefined, {
    message: "A senha deve conter pelo menos 8 caracteres.",
  })
  password!: string;

  @IsIn(["Broker", "Costumer"], {
    message: "O tipo do usuário deve ser 'Broker' ou 'Costumer'",
  })
  role!: string;

  constructor(data: CreateUserDTO) {
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
    this.role = data.role
  }

  static async validate(data: unknown): Promise<CreateUserDTO> {
    const dto = new this(data as any);

    const { validated, errors } = await validateDTO(dto);

    if (!validated) {
      throw new ValidationException(errors as ErrorObject);
    }

    return dto;
  }
}
