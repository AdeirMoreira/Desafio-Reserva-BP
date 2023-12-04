import { IsNumber,  Min } from "class-validator";
import { ErrorObject, validateDTO } from "../../utils/validator";
import { ValidationException } from "../../../middleware/error/custonErrors.error";

export class IdUserDTO {
  @IsNumber({ allowNaN: false }, { message: "Invalid user ID." })
  @Min(1, { message: "User ID must be greater than 0." })
  idUser: number;

  constructor(data: IdUserDTO) {
    this.idUser = Number(data.idUser);
  }

  static async validate(data: unknown): Promise<IdUserDTO> {
    const dto = new this(data as any);

    const { validated, errors } = await validateDTO(dto);

    if (!validated) {
      throw new ValidationException(errors as ErrorObject);
    }

    return dto;
  }
}
