import { IsDateString, IsNumber, IsOptional, Min } from "class-validator";
import { ValidationException } from "../../../middleware/error/custonErrors.error";
import { ErrorObject, validateDTO } from "../../../shared/utils/validator";

export class UpdatedMeetingDTO {
  @IsOptional()
  @IsNumber({ allowNaN: false }, { message: "Invalid broker id." })
  @Min(1, { message: "Broker id must be greater than 0." })
  idBroker?: number;

  @IsOptional()
  @IsNumber({ allowNaN: false }, { message: "Invalid customer id." })
  @Min(1, { message: "Customer id must be greater than 0." })
  idCustomer?: number;

  @IsOptional()
  @IsDateString(
    { strict: true, strictSeparator: true },
    { message: "Invalid meeting start date or time." }
  )
  startAt?: string;

  @IsOptional()
  @IsDateString(
    { strict: true, strictSeparator: true },
    { message: "Invalid meeting end date or time." }
  )
  endAt?: string;

  constructor(data: UpdatedMeetingDTO) {
    this.idBroker = data.idBroker;
    this.idCustomer = data.idCustomer;
    this.startAt = data.startAt;
    this.endAt = data.endAt;
  }

  static validate(data: unknown): UpdatedMeetingDTO {
    const dto = new this(data as any);

    const { validated, errors } =  validateDTO(dto);

    if (!validated) {
      throw new ValidationException(errors as ErrorObject);
    }

    return dto;
  }
}
