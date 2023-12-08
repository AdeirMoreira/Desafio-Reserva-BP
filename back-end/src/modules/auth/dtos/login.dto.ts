import { IsString, IsEmail, IsNotEmpty, Length,  } from "class-validator";
import { ValidationException } from "../../../middleware/error/custonErrors.error";
import { ErrorObject, validateDTO } from "../../../shared/utils/validator";

export class LoginDTO {
  @IsEmail({}, { message: "Invalid email." })
  email: string;

  @IsNotEmpty({ message: "Password is required." })
  @IsString({ message: "Password must be a srting." })
  @Length(8, undefined, {message: "The password must contain at least 8 characters."})
  password: string;

  constructor(data: LoginDTO) {
    this.email = data.email;
    this.password = data.password;
  }

  static  validate(data: unknown): LoginDTO {
    const dto = new this(data as any);

    const { validated, errors } =  validateDTO(dto);

    if (!validated) {
      throw new ValidationException(errors as ErrorObject);
    }

    return dto;
  }
}
