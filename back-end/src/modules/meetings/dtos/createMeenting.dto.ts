import { IsDateString, IsNumber, Min } from "class-validator";

import { ValidationException } from "../../../middleware/error/custonErrors.error";
import { ErrorObject, validateDTO } from "../../../shared/utils/validator";

export class CreateMeetingDTO {
  @IsNumber({ allowNaN: false }, { message: "Invalid broker id." })
  @Min(1, { message: "Broker id must be greater than 0." })
  idBroker: number;

  @IsNumber({ allowNaN: false }, { message: "Invalid customer id." })
  @Min(1, { message: "Customer id must be greater than 0." })
  idCustomer: number;

  @IsDateString(
    { strict: true, strictSeparator: true },
    { message: "Invalid meeting start date or time." }
  )
  startAt: string;

  @IsDateString(
    { strict: true, strictSeparator: true },
    { message: "Invalid meeting end date or time." }
  )
  endAt: string;

  constructor(data: CreateMeetingDTO) {
    this.idBroker = data.idBroker;
    this.idCustomer = data.idCustomer;
    this.startAt = data.startAt;
    this.endAt = data.endAt;
  }

  static  validate(data: unknown): CreateMeetingDTO {
    const dto = new this(data as any);

    const { validated, errors } =  validateDTO(dto);

    if (!validated) {
      throw new ValidationException(errors as ErrorObject);
    }

    return dto;
  }
}
