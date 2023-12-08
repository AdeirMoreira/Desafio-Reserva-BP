import { IsString, IsEmail, IsNotEmpty, Length, IsIn } from "class-validator";

import { ValidationException } from "../../../middleware/error/custonErrors.error";
import { ErrorObject, validateDTO } from "../../../shared/utils/validator";

export class CreateUserDTO {
  @IsNotEmpty({message: 'The name of the user is required.'})
  @IsString({ message: "The name of the user must be a string." })
  name: string;

  @IsEmail({}, { message: "Invalid email." })
  email: string;

  @IsNotEmpty({ message: "The password is required." })
  @IsString({ message: "The password muste be a string." })
  @Length(8, undefined, {
    message: "The password must contain at least 8 characters.",
  })
  password: string;

  @IsIn(["Broker", "Customer", "Adm"], {
    message: "User role must be 'Broker' or 'Customer or 'Adm'",
  })
  role: string;

  constructor(data: CreateUserDTO) {
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
    this.role = data.role
  }

  static  validate(data: unknown): CreateUserDTO {
    const dto = new this(data as any);

    const { validated, errors } =  validateDTO(dto);

    if (!validated) {
      throw new ValidationException(errors as ErrorObject);
    }

    return dto;
  }
}


