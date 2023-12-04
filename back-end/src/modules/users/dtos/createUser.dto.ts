import { IsString, IsEmail, IsNotEmpty, Length, IsIn } from "class-validator";
import { ErrorObject, validateDTO } from "../../utils/validator";
import { ValidationException } from "../../../middleware/error/custonErrors.error";

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

  @IsIn(["Broker", "Costumer"], {
    message: "User role must be 'Broker' or 'Customer.'",
  })
  role: string;

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


