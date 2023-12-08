import { IsString, IsEmail,  Length, IsOptional } from "class-validator";
import { ValidationException } from "../../../middleware/error/custonErrors.error";
import { ErrorObject, validateDTO } from "../../../shared/utils/validator";

export class UpdateUserDTO {
  @IsOptional()
  @IsString({ message: "The name of the user must be a string." })
  name: string;

  @IsOptional()
  @IsEmail({}, { message: "Invalid email." })
  email: string;

  @IsOptional()
  @IsString({ message: "The password muste be a string." })
  @Length(8, undefined, {
    message: "The password must contain at least 8 characters.",
  })
  password: string;


  constructor(data: UpdateUserDTO) {
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
  }

  static  validate(data: unknown): UpdateUserDTO {
    const dto = new this(data as any);

    const { validated, errors } =  validateDTO(dto);

    if (!validated) {
      throw new ValidationException(errors as ErrorObject);
    }

    return dto;
  }
}
