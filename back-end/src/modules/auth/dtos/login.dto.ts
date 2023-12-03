import { IsString, IsEmail, IsNotEmpty, Length, IsIn } from "class-validator";
import { ErrorObject, validateDTO } from "../../utils/validator";
import { ValidationException } from "../../../middleware/error/custonErrors.error";

export class LoginDTO {
  @IsEmail({}, { message: "Email inválido." })
  email: string;

  @IsNotEmpty({ message: "A senha é obrigatoria." })
  @IsString({ message: "A senha deve ser uma string." })
  @Length(8, undefined, {
    message: "A senha deve conter pelo menos 8 caracteres.",
  })
  password: string;

  constructor(data: LoginDTO) {
    this.email = data.email;
    this.password = data.password;
  }

  static async validate(data: unknown): Promise<LoginDTO> {
    const dto = new this(data as any);

    const { validated, errors } = await validateDTO(dto);

    if (!validated) {
      throw new ValidationException(errors as ErrorObject);
    }

    return dto;
  }
}
