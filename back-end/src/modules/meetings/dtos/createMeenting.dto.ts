import { IsDateString, IsNumber, Min } from "class-validator";
import { ErrorObject, validateDTO } from "../../utils/validator";
import { ValidationException } from "../../../middleware/error/custonErrors.error";

export class CreateMeetingDTO {
  @IsNumber({ allowNaN: false }, { message: "Id do corretor inválido." })
  @Min(1, { message: "Id do corretor dever ser maior que 0." })
  idBroker: number;

  @IsNumber({ allowNaN: false }, { message: "Id do cliente inválido." })
  @Min(1, { message: "Id do cliente dever ser maior que 0." })
  idCostumer: number;

  @IsDateString(
    { strict: true, strictSeparator: true },
    { message: "Data ou hora de inicio da reunião inválida." }
  )
  startAt: string;

  @IsDateString(
    { strict: true, strictSeparator: true },
    { message: "Data ou hora do fim da reunião inválida." }
  )
  endAt: string;

  constructor(data: CreateMeetingDTO) {
    this.idBroker = data.idBroker;
    this.idCostumer = data.idCostumer;
    this.startAt = data.startAt;
    this.endAt = data.endAt;
  }

  static async validate(data: unknown): Promise<CreateMeetingDTO> {
    const dto = new this(data as any);

    const { validated, errors } = await validateDTO(dto);

    if (!validated) {
      throw new ValidationException(errors as ErrorObject);
    }

    return dto;
  }
}
