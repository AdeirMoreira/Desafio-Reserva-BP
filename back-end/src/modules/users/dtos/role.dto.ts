import { IsIn,  } from "class-validator";
import { ValidationException } from "../../../middleware/error/custonErrors.error";
import { ErrorObject, validateDTO } from "../../../shared/utils/validator";

export class RoleDTO {
    @IsIn(["Broker", "Customer", "Adm"], {
        message: "User role must be 'Broker' or 'Customer or 'Adm'",
      })
      role: string;

  constructor(data: RoleDTO) {
    this.role = data.role;
  }

  static validate(data: unknown): RoleDTO {
    const dto = new this(data as any);

    const { validated, errors } = validateDTO(dto);

    if (!validated) {
      throw new ValidationException(errors as ErrorObject);
    }

    return dto;
  }
}
