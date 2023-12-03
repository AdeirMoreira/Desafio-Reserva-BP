import { IsString, IsEmail,  Length, IsOptional } from "class-validator";
import { ErrorObject, validateDTO } from "../../utils/validator";
import { ValidationException } from "../../../middleware/error/custonErrors.error";

export class UpdateUserDTO {
  @IsOptional()
  @IsString({ message: "O nome do corretor deve ser uma string" })
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: "Email inválido." })
  email?: string;

  @IsOptional()
  @IsString({ message: "A senha deve ser uma string." })
  @Length(8, undefined, {
    message: "A senha deve conter pelo menos 8 caracteres.",
  })
  password?: string;


  constructor(data: UpdateUserDTO) {
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
  }

  static async validate(data: unknown): Promise<UpdateUserDTO> {
    const dto = new this(data as any);

    const { validated, errors } = await validateDTO(dto);

    if (!validated) {
      throw new ValidationException(errors as ErrorObject);
    }

    return dto;
  }
}
